import { Test, TestingModule } from '@nestjs/testing';
import { InstanceBackupController } from './instance-backup.controller';

describe('InstanceBackupController', () => {
  let controller: InstanceBackupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstanceBackupController],
    }).compile();

    controller = module.get<InstanceBackupController>(InstanceBackupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
