import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstanceBackupRepository } from './instance-backup.repository';

@Injectable()
export class InstanceBackupService {
  constructor(
    @InjectRepository(InstanceBackupRepository)
    private readonly instanceBackupRepository: InstanceBackupRepository,
  ) {}

  /**
   * Delete a backup
   *
   * @param {string} userId
   * @param {string} backupId
   * @returns {Promise<any>}
   */
  public async deleteBackup(userId: string, backupId: string): Promise<any> {
    const backup = await this.instanceBackupRepository.findOne({
      where: { backupId },
      relations: ['instance', 'instance.user'],
    });

    if (!backup) {
      throw new NotFoundException();
    }

    if (backup.instance.user.id !== userId) {
      throw new ForbiddenException();
    }

    // Delete the file from s3
    const s3 = new S3Client({ region: 'eu-west-2' });
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${backupId}.zip`,
    });

    const results = await s3.send(command);

    return this.instanceBackupRepository.delete({ backupId });
  }

  /**
   * Request a signed url for a backup file
   *
   * @param {string} userId
   * @param {string} backupId
   * @returns {Promise<string>}
   */
  public async downloadBackup(
    userId: string,
    backupId: string,
  ): Promise<string> {
    const backup = await this.instanceBackupRepository.findOne({
      where: { backupId },
      relations: ['instance', 'instance.user'],
    });

    if (!backup) {
      throw new NotFoundException();
    }

    if (backup.instance.user.id !== userId) {
      throw new ForbiddenException();
    }

    // Create a download link for the file
    const s3 = new S3Client({ region: 'eu-west-2' });
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${backupId}.zip`,
    });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return signedUrl;
  }
}
