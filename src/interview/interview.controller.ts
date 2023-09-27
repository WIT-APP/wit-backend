import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview.dto';

@Controller('interview')
export class InterviewController {
  constructor(private interviewService: InterviewService) {}

  @Get('id/:id')
  async findOneByApplicantId(@Param('id') id: number) {
    return await this.interviewService.findOneByApplicantId(id);
  }

  @Post('id/:id')
  async create(
    @Param('id') id: number,
    @Body() createInterviewDto: CreateInterviewDto,
  ) {
    return await this.interviewService.create(id, createInterviewDto);
  }
}
