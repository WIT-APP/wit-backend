import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
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
    const newApplicant = await this.applicantRepository.save(
      createApplicantDto,
    );

    if (!newApplicant) {
      throw new BadRequestException();
    }

    return newApplicant;
  }

  async getDuplicateEmails(): Promise<any[]> {
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

    if (!queryResult) {
      throw new BadRequestException(
        'Error al recuperar los correos electrónicos duplicados.',
      );
    }
    return queryResult;
  }

  async getUsersPreapproved(): Promise<Applicant[]> {
    const nonUniqueEmailsQuery = `
    SELECT correo_electronico
    FROM applicant
    GROUP BY correo_electronico
    HAVING COUNT(correo_electronico) > 1
  `;

    const nonUniqueEmailsResult = await this.applicantRepository.query(
      nonUniqueEmailsQuery,
    );
    const nonUniqueEmails = nonUniqueEmailsResult.map(
      (result) => result.correo_electronico,
    );

    const updateQuery = `
      UPDATE applicant
      SET estado = 'Preaprovado'
      WHERE correo_electronico NOT IN (${nonUniqueEmails
        .map((email) => `'${email}'`)
        .join(',')})
      AND pais_de_residencia = 'España'
      AND estado = 'Aplicante'
      RETURNING *;
    `;
    const updatedApplicants = await this.applicantRepository.query(updateQuery);

    const preaprovadoQuery = `
      SELECT *
      FROM applicant
      WHERE correo_electronico NOT IN (${nonUniqueEmails
        .map((email) => `'${email}'`)
        .join(',')})
      AND pais_de_residencia = 'España'
      AND estado = 'Preaprovado';
    `;
    const preaprovadoApplicants = await this.applicantRepository.query(
      preaprovadoQuery,
    );

    if (!preaprovadoApplicants) {
      throw new NotFoundException('No se encontraron personas en este estado.');
    }

    return preaprovadoApplicants;
  }

  async findAll(): Promise<Applicant[]> {
    const applicants = await this.applicantRepository.find();

    if (!applicants) {
      throw new NotFoundException();
    }
    return applicants;
  }

  async findOneById(id: number): Promise<Applicant> {
    const applicant = await this.applicantRepository.findOne({
      where: { id },
    });

    if (!applicant) {
      throw new NotFoundException('Aspirante no encontrado');
    }

    return applicant;
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
    let applicants: Applicant[];
    if (estado === 'Aplicante') {
        // Fetch all applicants
        applicants = await this.applicantRepository.find();
    
        // Group applicants by email
        const groupedApplicants: { [email: string]: Applicant[] } = {};
        applicants.forEach(applicant => {
          const email = applicant.correo_electronico;
          if (groupedApplicants[email]) {
            groupedApplicants[email].push(applicant);
          } else {
            groupedApplicants[email] = [applicant];
          }
        });
    
        applicants = Object.values(groupedApplicants).flat();
    } else {
      applicants = await this.applicantRepository.find({
        where: { estado },
      });
    }
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
        'No se encontraron aspirantes para el pais de residencia especificado.',
        HttpStatus.NOT_FOUND,
      );
    }

    return applicants;
  }

  async updateEstado(
    id: number,
    updateApplicantDto: UpdateApplicantDto,
  ): Promise<Applicant> {
    const applicant = await this.applicantRepository.findOne({ where: { id } });

    if (!applicant) {
      throw new NotFoundException('No se encontraron el aspirante.');
    }

    applicant.estado = updateApplicantDto.estado;

    const updatedApplicant = await this.applicantRepository.save(applicant);
    return updatedApplicant;
  }

  async updateApplicant(
    id: number,
    updateApplicantDto: UpdateApplicantDto,
  ): Promise<Applicant> {
    const applicant = await this.applicantRepository.findOne({ where: { id } });
    if (!applicant) {
      throw new NotFoundException('No se encontraron el aspirante.');
    }

    applicant.nombre = updateApplicantDto.nombre;
    applicant.apellidos = updateApplicantDto.apellidos;
    applicant.correo_electronico = updateApplicantDto.correo_electronico;
    applicant.telefono = updateApplicantDto.telefono;
    applicant.estado = updateApplicantDto.estado;
    applicant.genero = updateApplicantDto.genero;
    applicant.fecha_de_nacimiento = updateApplicantDto.fecha_de_nacimiento;
    applicant.pais_de_nacimiento = updateApplicantDto.pais_de_nacimiento;
    applicant.documento_de_identidad =
      updateApplicantDto.documento_de_identidad;
    applicant.tipo_documento_identidad =
      updateApplicantDto.tipo_documento_identidad;
    applicant.numero_documento_id = updateApplicantDto.numero_documento_id;
    applicant.direccion = updateApplicantDto.direccion;
    applicant.ciudad = updateApplicantDto.ciudad;
    applicant.provincia = updateApplicantDto.provincia;
    applicant.codigo_postal = updateApplicantDto.codigo_postal;
    applicant.pais_de_residencia = updateApplicantDto.pais_de_residencia;
    applicant.programa_cursar = updateApplicantDto.programa_cursar;
    applicant.permiso = updateApplicantDto.permiso;
    applicant.colectivo = updateApplicantDto.colectivo;
    applicant.educacion = updateApplicantDto.educacion;
    applicant.estudio_mas_alto = updateApplicantDto.estudio_mas_alto;
    applicant.situacion_profesional = updateApplicantDto.situacion_profesional;
    applicant.intereses_actuales = updateApplicantDto.intereses_actuales;
    applicant.dedicacion_semanal = updateApplicantDto.dedicacion_semanal;
    applicant.acceso_internet_dispositivos =
      updateApplicantDto.acceso_internet_dispositivos;
    applicant.formacion_online = updateApplicantDto.formacion_online;
    applicant.razones_para_unir = updateApplicantDto.razones_para_unir;
    applicant.encontrar_programa = updateApplicantDto.encontrar_programa;
    applicant.mas_informacion = updateApplicantDto.mas_informacion;
    applicant.observaciones = updateApplicantDto.observaciones;
    applicant.invitaciones = updateApplicantDto.invitaciones;

    const updatedApplicant = await this.applicantRepository.save(applicant);
    return updatedApplicant;
  }

  remove(id: number) {
    return `This action removes a #${id} applicant`;
  }
}

/* 
  async searchByKeyword(keyword: string): Promise<Applicant[]> {
    const applicants = await this.applicantRepository
      .createQueryBuilder('applicant')
      .where('applicant.nombre LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('applicant.apellidos LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
      .orWhere('applicant.correo_electronico LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
      .orWhere('applicant.telefono LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();

    return applicants;
  } */
