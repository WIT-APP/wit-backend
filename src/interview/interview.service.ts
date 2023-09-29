<<<<<<< HEAD
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Interview from './entities/interview.entity';
import { Equal, Repository } from 'typeorm';
import { CreateInterviewDto } from './dto/create-interview.dto';
=======
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Interview from "./entities/interview.entity";
import { Repository } from "typeorm";
import { CreateInterviewDto } from "./dto/create-interview.dto";
>>>>>>> c6ddd6fce29af7ed653ed17d6c176d1876d31a72

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
			throw new NotFoundException("Entrevista no encontrada");
		}

		return interview;
	}

<<<<<<< HEAD
  async create(createInterviewDto: CreateInterviewDto): Promise<Interview> {
    try {
      return await this.interviewRepository.save(createInterviewDto);
    } catch (error) {
      throw new Error('Error al ingresar entrevista.');
    }
  }

  async findByApplicantId(applicant: number): Promise<Interview> {
    try {
      const interviews = await this.interviewRepository.findOne({
        where: { applicant },
      });

      if (!interviews) {
        throw new NotFoundException(
          'No se encontraron entrevistas para este solicitante',
        );
      }

      return interviews;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al recuperar la entrevista',
      );
    }
  }
=======
	async create(createInterviewDto: CreateInterviewDto): Promise<Interview> {
		try {
			return this.interviewRepository.save(createInterviewDto);
		} catch (error) {
			throw new Error("Error al ingresar entrevista.");
		}
	}

	async findByApplicantId(applicant: number): Promise<Interview> {
		const interviews = await this.interviewRepository.findOne({
			where: { applicant },
		});

		if (!interviews) {
			throw new NotFoundException(
				"No se encontraron entrevistas para este solicitante",
			);
		}

		return interviews;
	}
>>>>>>> c6ddd6fce29af7ed653ed17d6c176d1876d31a72
}
