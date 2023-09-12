import { Module } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { ApplicantController } from './applicant.controller';

@Module({
  controllers: [ApplicantController],
  providers: [ApplicantService],
})
export class ApplicantModule {}
