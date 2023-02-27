import { Test, TestingModule } from '@nestjs/testing';
import { ImageGateway } from './image.gateway';

describe('ImageGateway', () => {
  let gateway: ImageGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageGateway],
    }).compile();

    gateway = module.get<ImageGateway>(ImageGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
