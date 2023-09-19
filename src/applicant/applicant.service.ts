import {
  ConflictException,
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
    const applicant = await this.applicantRepository.findOne({
      where: { correo_electronico: email },
    });
    if (!applicant) {
      throw new HttpException(
        'No se encontró candidato con este correo electrónico.',
        HttpStatus.NOT_FOUND,
      );
    }

    return applicant;
  }

  async findByEstado(estado: string): Promise<Applicant[]> {
    const applicants = await this.applicantRepository.find({
      where: { estado },
    });

    if (applicants.length === 0) {
      throw new HttpException(
        'No se encontraron personas en este estado.',
        HttpStatus.NOT_FOUND,
      );
    }

    return applicants;
  }

  async findByResidence(pais_de_residencia: string): Promise<Applicant[]> {
    const applicants = await this.applicantRepository.find({
      where: { pais_de_residencia },
    });

    if (!applicants || applicants.length === 0) {
      throw new HttpException(
        'No se encontraron solicitantes para el pais de residencia especificado.',
        HttpStatus.NOT_FOUND,
      );
    }

    return applicants;
  }

  async getDuplicateEmails(): Promise<any[]> {
    try {
      const duplicateEmails = await this.applicantRepository.query(`
      SELECT correo_electronico
      FROM applicant
      GROUP BY correo_electronico
      HAVING COUNT(correo_electronico) > 1
      `);

      console.log(duplicateEmails)
      const duplicateApplicants: any[] = [];
      for (const email of duplicateEmails) {
        const applicants = await this.applicantRepository.find({
          where: { correo_electronico: email.correo_electronico },
          order: { fecha_de_applicacion: 'DESC' },
        });
        duplicateApplicants.push({ email: email.correo_electronico, applicants });
      }

      return duplicateApplicants;
    } catch (error) {
      throw new ConflictException('Error al recuperar los correos electrónicos duplicados.');
    }
  }

  update(id: number, updateApplicantDto: UpdateApplicantDto) {
    return `This action updates a #${id} applicant`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicant`;
  }
}
