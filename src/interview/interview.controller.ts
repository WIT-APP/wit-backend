import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview.dto';

@Controller('interview')
export class InterviewController {
  constructor(private interviewService: InterviewService) {}

  @Get('id/:id')
  async findOneById(@Param('id') id: number) {
    return await this.interviewService.findOneById(id);
  }

  @Post()
  async create(@Body() createInterviewDto: CreateInterviewDto) {
    return await this.interviewService.create(createInterviewDto);
  }

  @Get('applicant/:applicant')
  async findByApplicantId(@Param('applicant') applicant: number) {
    return await this.interviewService.findByApplicantId(applicant);
  }
}
