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
import { EntityManager, In, Repository, getManager } from 'typeorm';
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

  async getDuplicateEmails(): Promise<any[]> {
    try {
      const queryResult = await this.applicantRepository
        .createQueryBuilder('a1')
        .select(['a1.*'])
        .addSelect('a1.correo_electronico')
        .innerJoin(
          'applicant',
          'a2',
          'a1.id <> a2.id AND a1.correo_electronico = a2.correo_electronico',
        )
        .groupBy('a1.correo_electronico, a1.id')
         .orderBy('a1.fecha_de_applicacion', 'DESC') 
        .getRawMany();

      return queryResult;
    } catch (error) {
      throw new ConflictException('Error al recuperar los correos electrónicos duplicados.');
    }
  }


  async getUsersPreapproved(): Promise<Applicant[]> {
    const nonUniqueEmailsQuery = `
    SELECT correo_electronico
    FROM applicant
    GROUP BY correo_electronico
    HAVING COUNT(correo_electronico) > 1
  `;

  try {
    const nonUniqueEmailsResult = await this.applicantRepository.query(nonUniqueEmailsQuery);
    const nonUniqueEmails = nonUniqueEmailsResult.map((result) => result.correo_electronico);

    const query = `
      SELECT *
      FROM applicant
      WHERE correo_electronico NOT IN (${nonUniqueEmails.map(email => `'${email}'`).join(',')})
      AND pais_de_residencia = 'España';
    `;

    const result = await this.applicantRepository.query(query);
    return result;
  } catch (error) {
    throw new Error('Error al recuperar usuarios preaprobados.');
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
 
  async findByEmail(email: string): Promise<Applicant> {
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

  async updateEstado(id: number, updateApplicantDto: UpdateApplicantDto): Promise<Applicant> {
    const applicant = await this.applicantRepository.findOne({ where: { id } })

    if (!applicant) {
      throw new NotFoundException('No se encontraron el aspirante.');
    }

    try {
      applicant.estado = updateApplicantDto.estado;
        
      const updatedCourse = await this.applicantRepository.save(applicant)
      return updatedCourse
    } catch (error) {
      throw new InternalServerErrorException('Occurrió un error actualizando el aspirante.')
    }
  }

 /*    updateApplicant(id: number, updateApplicantDto: UpdateApplicantDto) {
      const applicant = await this.applicantRepository.findOne({ where: { id } })

    const updatedEstado = new UpdateApplicantDto
  } */

  remove(id: number) {
    return `This action removes a #${id} applicant`;
  }
}
