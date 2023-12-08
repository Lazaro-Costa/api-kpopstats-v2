import { Test, TestingModule } from '@nestjs/testing';
import { PicsService } from './pics.service';

describe('PicsService', () => {
  let service: PicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PicsService],
    }).compile();

    service = module.get<PicsService>(PicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
