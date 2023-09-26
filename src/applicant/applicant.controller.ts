/* eslint-disable no-mixed-spaces-and-tabs */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Applicant } from './entities/applicant.entity';

@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post()
  async create(@Body() createApplicantDto: CreateApplicantDto) {
    return await this.applicantService.create(createApplicantDto);
  }

  @Get()
  async findAll() {
    return await this.applicantService.findAll();
  }

  @Get('duplicate-emails')
  async getByDuplicateEmails() {
    return this.applicantService.getDuplicateEmails();
  }

  @Get('preapproved-applicants')
  async getByUsersPreapproved(): Promise<Applicant[]> {
    return this.applicantService.getUsersPreapproved();
  }

  // !! GET methods BY ONE

  @Get('id/:id')
  async findOne(@Param('id') id: number) {
    return await this.applicantService.findOneById(id);
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string) {
    return this.applicantService.findByEmail(email);
  }

  // !! GET methods w/ FILTER

  @Get('filter-by-estado/:estado')
  async filterByEstado(@Param('estado') estado: string): Promise<Applicant[]> {
    return this.applicantService.findByEstado(estado);
  }

  @Get('residence/espana')
  async getByResidenceSpain() {
    return this.applicantService.findByResidence('España');
  }

  @Get('residence/:pais_de_residencia')
  async getByResidence(
    @Param('pais_de_residencia') pais_de_residencia: string,
  ) {
    return this.applicantService.findByResidence(pais_de_residencia);
  }

  @Patch(':id')
  async updateApplicant(
    @Param('id') id: number,
    @Body() updateApplicantDto: UpdateApplicantDto,
  ) {
    return this.applicantService.updateApplicant(id, updateApplicantDto);
  }

  @Patch('update-estado/:id')
  async updateEstado(
    @Param('id') id: number,
    @Body() updateApplicantDto: UpdateApplicantDto,
  ): Promise<Applicant> {
    return this.applicantService.updateEstado(id, updateApplicantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicantService.remove(+id);
  }
}

/*  @Get('search')
  async searchByKeyword(
    @Query('keyword') keyword: string,
  ): Promise<Applicant[]> {
    const applicants = await this.applicantService.searchByKeyword(keyword);
    return applicants;
  } */