import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Interview from './entities/interview.entity';
import { Repository } from 'typeorm';
import { CreateInterviewDto } from './dto/create-interview.dto';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
  ) {}

  async findOneByApplicantId(applicant_id: number): Promise<Interview> {
    try {
      const interview = await this.interviewRepository.findOne({
        where: { applicant_id },
      });

      if (!interview) {
        throw new NotFoundException('Entrevista no encontrada');
      }

      return interview;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Entrevista no encontrada');
      } else {
        throw new InternalServerErrorException(
          'Error al recuperar la entrevista',
        );
      }
    }
  }

  async create(createInterviewDto: CreateInterviewDto): Promise<Interview> {
    try {
      return this.interviewRepository.create(createInterviewDto);
    } catch (error) {
      throw new Error('Error al ingresar entrevista.');
    }
  }
}
