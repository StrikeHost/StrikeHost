import { Test, TestingModule } from '@nestjs/testing';
import { InstanceBackupService } from './instance-backup.service';

describe('InstanceBackupService', () => {
  let service: InstanceBackupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstanceBackupService],
    }).compile();

    service = module.get<InstanceBackupService>(InstanceBackupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
