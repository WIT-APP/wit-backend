import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      const applicant = await this.applicantRepository.findOne({
        where: { id },
      });

      if (!applicant) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return applicant;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Usuario no encontrado');
      } else {
        throw new InternalServerErrorException(
          'Error al recuperar el solicitante',
        );
      }
    }
  }

  async findOneByEmail(email: string): Promise<Applicant> {
    const applicant = await this.applicantRepository.findOne({ where: { correo_electronico: email } });
    if (!applicant) {
      throw new HttpException(
        'No se encontraron candidato con este correo electrónico.',
        HttpStatus.NOT_FOUND,
      );
    }
    
    return applicant
  }

  async findByEstado(estado: string): Promise<Applicant[]> {
    const applicants = await this.applicantRepository.find({
      where: { estado },
    });

    if (!applicants || applicants.length === 0) {
      throw new HttpException(
        'No se encontraron candidatos para el estado dado.',
        HttpStatus.NOT_FOUND,
      );
    }

    return applicants;
  }

  async findByResidence(residencia: string): Promise<Applicant[]> {
    const applicants = await this.applicantRepository.find({
      where: { pais_de_residencia: residencia },
    });

    if (!applicants || applicants.length === 0) {
      throw new HttpException(
        'No se encontraron solicitantes para el pais de residencia especificada.',
        HttpStatus.NOT_FOUND,
      );
    }

    return applicants;
  }

  update(id: number, updateApplicantDto: UpdateApplicantDto) {
    return `This action updates a #${id} applicant`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicant`;
  }
}
