import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Repository } from 'typeorm';
import { Applicant } from './entities/applicant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private applicantRepository: Repository<Applicant>,
  ) {}

  async create(createApplicantDto: CreateApplicantDto): Promise<Applicant> {
    try {
      return await this.applicantRepository.save(createApplicantDto);
    } catch (error) {
      throw new Error('Failed to submit form.');
    }
  }

  async findAll(): Promise<Applicant[]> {
    try {
      return await this.applicantRepository.find();
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async findOneById(id: number): Promise<Applicant> {
    try {
      return await this.applicantRepository.findOne({ where: { id } });

    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  update(id: number, updateApplicantDto: UpdateApplicantDto) {
    return `This action updates a #${id} applicant`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicant`;
  }
}
