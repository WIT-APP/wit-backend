import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantController } from './applicant.controller';
import { ApplicantService } from './applicant.service';

describe('ApplicantController', () => {
  let controller: ApplicantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicantController],
      providers: [ApplicantService],
    }).compile();

    controller = module.get<ApplicantController>(ApplicantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
