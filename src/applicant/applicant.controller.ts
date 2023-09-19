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
} from "@nestjs/common";
import { ApplicantService } from "./applicant.service";
import { CreateApplicantDto } from "./dto/create-applicant.dto";
import { UpdateApplicantDto } from "./dto/update-applicant.dto";
import { Applicant } from "./entities/applicant.entity";

@Controller("applicant")
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

  // !! GET methods BY ONE

  @Get(":id")
  async findOne(@Param("id") id: string) {
  	return await this.applicantService.findOneById(+id);
  }

  @Get(":email")
  async findByEmail(@Param("email") email: string) {
  	return this.applicantService.findOneByEmail(email);
  }

  // !! GET methods w/ FILTER

  @Get("filter-by-estado/:estado")
  async filterByEstado(@Param("estado") estado: string): Promise<Applicant[]> {
  	return this.applicantService.findByEstado(estado);
  }


  @Get("residence/espana")
  async getByResidenceSpain() {
  	return this.applicantService.findByResidence("España");
  }

  @Get("residence/:pais_de_residencia")
  async getByResidence(@Param("pais_de_residencia") pais_de_residencia: string) {
  	return this.applicantService.findByResidence(pais_de_residencia);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateApplicantDto: UpdateApplicantDto,
  ) {
  	return this.applicantService.update(+id, updateApplicantDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
  	return this.applicantService.remove(+id);
  }
}
