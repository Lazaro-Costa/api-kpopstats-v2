import { Test, TestingModule } from '@nestjs/testing';
import { PicsController } from './pics.controller';
import { PicsService } from './pics.service';

describe('PicsController', () => {
  let controller: PicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PicsController],
      providers: [PicsService],
    }).compile();

    controller = module.get<PicsController>(PicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
