import { Module } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { ApplicantController } from './applicant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from './entities/applicant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Applicant])],
  controllers: [ApplicantController],
  providers: [ApplicantService],
})
export class ApplicantModule {}
