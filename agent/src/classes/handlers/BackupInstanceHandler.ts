import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { BackupInstanceEvent } from "../../interfaces/ServerEvents";
import { Handler } from "./Handler";
import { v4 as uuid4 } from "uuid";
import { createReadStream, rmdirSync, statSync, unlinkSync } from "fs";
import {
  BackupDoneEvent,
  ClientEventName,
} from "../../interfaces/ClientEvents";
import { Agent } from "../../classes/Agent";

export class BackupInstanceHandler extends Handler {
  public async dispatch(event: BackupInstanceEvent) {
    console.log("backup requested for instance", event.instanceId);
    const instance = this.agent.getInstance(event.instanceId);
    const id = await instance.backup();
    console.log("backup complete for instance", event.instanceId);

    const uuid = uuid4();
    const localFilename = `${id}.zip`;
    const remoteFilename = `${uuid}.zip`;
    const fileStream = createReadStream(localFilename);

    // open local file and upload to S3
    const s3 = new S3Client({ region: "eu-west-2" });
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: remoteFilename,
      Body: fileStream,
    });

    const results = await s3.send(command);
    console.log("backup uploaded to S3", event.instanceId);

    fileStream.close();

    const details = statSync(localFilename);
    const size = details.size;

    // delete local file
    unlinkSync(localFilename);
    rmdirSync(id, { recursive: true });

    // send event to server
    const sendEvent: BackupDoneEvent = {
      size,
      backupId: uuid,
      instanceId: event.instanceId,
      event: ClientEventName.BACKUP_DONE,
    };
    await Agent.sendEvent(sendEvent);
    console.log("backup done event sent", event.instanceId);
  }
}
