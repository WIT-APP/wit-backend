import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Interview from './entities/interview.entity';
import { Equal, Repository } from 'typeorm';
import { CreateInterviewDto } from './dto/create-interview.dto';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
  ) {}

  async findOneById(id: number): Promise<Interview> {
    const interview = await this.interviewRepository.findOne({
      where: { id },
    });

    if (!interview) {
      throw new NotFoundException('Entrevista no encontrada');
    }

    return interview;
  }

  async create(createInterviewDto: CreateInterviewDto): Promise<Interview> {
    try {
      return this.interviewRepository.save(createInterviewDto);
    } catch (error) {
      throw new Error('Error al ingresar entrevista.');
    }
  }

  async findByApplicantId(applicant: number): Promise<Interview> {
    const interviews = await this.interviewRepository.findOne({
      where: { applicant },
    });

    if (!interviews) {
      throw new NotFoundException(
        'No se encontraron entrevistas para este solicitante',
      );
    }

    return interviews;
  }
}
