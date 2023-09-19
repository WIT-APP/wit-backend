import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantService } from './applicant.service';
import { Applicant } from './entities/applicant.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import {
  TipoGenero,
  TipoId,
  TipoProgramaDeseado,
  TipoColectivo,
  TipoEducacion,
  TipoSituacionProfesional,
  TipoInteresesActuales,
  TipoAccessoInternetDispositivos,
  TipoEncontrarPrograma,
} from './entities/applicant.enums';
import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('ApplicantService', () => {
  let service: ApplicantService;

  const mockApplicantRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    query: jest.fn(),
  };
  const createApplicantDto: CreateApplicantDto = {
    nombre: 'John',
    apellidos: 'Smith',
    correo_electronico: 'john@example.com',
    telefono: 64829471,
    genero: TipoGenero.Hombre,
    fecha_de_nacimiento: new Date(2000, 12, 16),
    pais_de_nacimiento: 'France',
    documento_de_identidad: TipoId.DNI,
    numero_documento_id: 'Y2939789',
    direccion: 'c/Barcelona 1234',
    ciudad: 'Barcelona',
    provincia: 'Barcelona',
    codigo_postal: 78953,
    pais_de_residencia: 'España',
    programa_cursar: TipoProgramaDeseado.ITSupport,
    colectivo: ['Mujer en situación de vulnerabilidad', 'Minorías étnicas'],
    educacion: TipoEducacion.SinEstudio,
    situacion_profesional: TipoSituacionProfesional.SinIngresos,
    intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
    dedicacion_semanal: 0,
    acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
    formacion_online: false,
    razones_para_unir: 'Lorem Ipsum',
    encontrar_programa: TipoEncontrarPrograma.RedesSociales,
  };
  const createdApplicant = {
    id: 1,
    nombre: 'John',
    apellidos: 'Smith',
    correo_electronico: 'john@example.com',
    telefono: 64829471,
    genero: TipoGenero.Hombre,
    fecha_de_nacimiento: new Date(2000, 12, 16),
    pais_de_nacimiento: 'France',
    documento_de_identidad: TipoId.DNI,
    numero_documento_id: 'Y2939789',
    direccion: 'c/Barcelona 1234',
    ciudad: 'Barcelona',
    provincia: 'Barcelona',
    codigo_postal: 78953,
    pais_de_residencia: 'España',
    programa_cursar: TipoProgramaDeseado.ITSupport,
    colectivo: ['Mujer en situación de vulnerabilidad', 'Minorías étnicas'],
    educacion: TipoEducacion.SinEstudio,
    situacion_profesional: TipoSituacionProfesional.SinIngresos,
    intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
    dedicacion_semanal: 0,
    acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
    formacion_online: false,
    razones_para_unir: 'Lorem Ipsum',
    encontrar_programa: TipoEncontrarPrograma.RedesSociales,
    estado: 'Aplicante',
  };

  const applicants = [
    {
      id: 1,
      nombre: 'John',
      apellidos: 'Smith',
      correo_electronico: 'john@example.com',
      telefono: 64829471,
      genero: TipoGenero.Hombre,
      fecha_de_nacimiento: new Date(2000, 12, 16),
      pais_de_nacimiento: 'France',
      documento_de_identidad: TipoId.DNI,
      numero_documento_id: 'Y2939789',
      direccion: 'c/Barcelona 1234',
      ciudad: 'Barcelona',
      provincia: 'Barcelona',
      codigo_postal: 78953,
      pais_de_residencia: 'España',
      programa_cursar: TipoProgramaDeseado.ITSupport,
      colectivo: ['Mujer en situación de vulnerabilidad', 'Minorías étnicas'],
      educacion: TipoEducacion.SinEstudio,
      situacion_profesional: TipoSituacionProfesional.SinIngresos,
      intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
      dedicacion_semanal: 0,
      acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
      formacion_online: false,
      razones_para_unir: 'Lorem Ipsum',
      encontrar_programa: TipoEncontrarPrograma.RedesSociales,
      estado: 'Aplicante',
    },
    {
      id: 2,
      nombre: 'John',
      apellidos: 'Smith',
      correo_electronico: 'bob@example.com',
      telefono: 64829471,
      genero: TipoGenero.Hombre,
      fecha_de_nacimiento: new Date(2000, 12, 16),
      pais_de_nacimiento: 'France',
      documento_de_identidad: TipoId.DNI,
      numero_documento_id: 'Y2939789',
      direccion: 'c/Barcelona 1234',
      ciudad: 'Barcelona',
      provincia: 'Barcelona',
      codigo_postal: 78953,
      pais_de_residencia: 'España',
      programa_cursar: TipoProgramaDeseado.ITSupport,
      colectivo: ['Mujer en situación de vulnerabilidad', 'Minorías étnicas'],
      educacion: TipoEducacion.SinEstudio,
      situacion_profesional: TipoSituacionProfesional.SinIngresos,
      intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
      dedicacion_semanal: 0,
      acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
      formacion_online: false,
      razones_para_unir: 'Lorem Ipsum',
      encontrar_programa: TipoEncontrarPrograma.RedesSociales,
      estado: 'Invitado',
    },
    {
      id: 3,
      nombre: 'John',
      apellidos: 'Smith',
      correo_electronico: 'bob@example.com',
      telefono: 64829471,
      genero: TipoGenero.Hombre,
      fecha_de_nacimiento: new Date(2000, 12, 16),
      pais_de_nacimiento: 'France',
      documento_de_identidad: TipoId.DNI,
      numero_documento_id: 'Y2939789',
      direccion: 'c/Barcelona 1234',
      ciudad: 'Barcelona',
      provincia: 'Barcelona',
      codigo_postal: 78953,
      pais_de_residencia: 'España',
      programa_cursar: TipoProgramaDeseado.ITSupport,
      colectivo: ['Mujer en situación de vulnerabilidad', 'Minorías étnicas'],
      educacion: TipoEducacion.SinEstudio,
      situacion_profesional: TipoSituacionProfesional.SinIngresos,
      intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
      dedicacion_semanal: 0,
      acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
      formacion_online: false,
      razones_para_unir: 'Lorem Ipsum',
      encontrar_programa: TipoEncontrarPrograma.RedesSociales,
      estado: 'Rechazado',
    },
    {
      id: 4,
      nombre: 'John',
      apellidos: 'Smith',
      correo_electronico: 'sam@example.com',
      telefono: 64829471,
      genero: TipoGenero.Hombre,
      fecha_de_nacimiento: new Date(2000, 12, 16),
      pais_de_nacimiento: 'France',
      documento_de_identidad: TipoId.DNI,
      numero_documento_id: 'Y2939789',
      direccion: 'c/Barcelona 1234',
      ciudad: 'Barcelona',
      provincia: 'Barcelona',
      codigo_postal: 78953,
      pais_de_residencia: 'USA',
      programa_cursar: TipoProgramaDeseado.ITSupport,
      colectivo: ['Mujer en situación de vulnerabilidad', 'Minorías étnicas'],
      educacion: TipoEducacion.SinEstudio,
      situacion_profesional: TipoSituacionProfesional.SinIngresos,
      intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
      dedicacion_semanal: 0,
      acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
      formacion_online: false,
      razones_para_unir: 'Lorem Ipsum',
      encontrar_programa: TipoEncontrarPrograma.RedesSociales,
      estado: 'Matriculado',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicantService,
        {
          provide: getRepositoryToken(Applicant),
          useValue: mockApplicantRepository,
        },
      ],
    }).compile();

    service = module.get<ApplicantService>(ApplicantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an applicant', async () => {
      mockApplicantRepository.save.mockResolvedValue(createdApplicant);

      const result = await service.create(createApplicantDto);

      expect(result).toBe(createdApplicant);
    });

    it('should throw an error if create fails', async () => {
      mockApplicantRepository.save.mockRejectedValue(
        new Error('Failed to submit form.'),
      );

      await expect(service.create(createApplicantDto)).rejects.toThrowError(
        'Failed to submit form.',
      );
    });
  });

  describe('findAll', () => {
    it('should return a list of applicants', async () => {
      mockApplicantRepository.find.mockResolvedValue(applicants);

      const result = await service.findAll();

      expect(result).toBe(applicants);
    });

    it('should throw a ForbiddenException if find fails', async () => {
      mockApplicantRepository.find.mockRejectedValue(new Error());

      await expect(service.findAll()).rejects.toThrowError(ForbiddenException);
    });
  });

  describe('findOneById', () => {
    it('should return a single applicant', async () => {
      const id = 1;

      mockApplicantRepository.findOne.mockResolvedValue(createdApplicant);

      const result = await service.findOneById(id);

      expect(result).toBe(createdApplicant);
    });

    it('should throw a NotFoundException if applicant is not found', async () => {
      const id = 1;

      mockApplicantRepository.findOne.mockResolvedValue(null);

      try {
        await service.findOneById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Usuario no encontrado');
      }
    });

    it('should throw an InternalServerErrorException on error', async () => {
      const id = 1;

      mockApplicantRepository.findOne.mockRejectedValue(new Error());

      try {
        await service.findOneById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Error al recuperar el solicitante');
      }
    });
  });

  describe('findOneByEmail', () => {
    it('should return an applicant if found', async () => {
      const email = 'bob@example.com';

      mockApplicantRepository.findOne.mockResolvedValue(createdApplicant);

      const result = await service.findByEmail(email);
      expect(result).toEqual(createdApplicant);
    });

    it('should throw HttpException if applicant not found', async () => {
      const email = 'nonexistent@example.com';

      mockApplicantRepository.findOne.mockResolvedValue(null);

      await expect(service.findByEmail(email)).rejects.toThrowError(
        new HttpException(
          'No se encontró candidato con este correo electrónico.',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
/* 
    it('should return duplicate emails with associated applicants', async () => {
      // Mock data for duplicate emails
      const duplicateEmailsMock = [
        { correo_electronico: 'duplicate1@example.com' },
        { correo_electronico: 'duplicate2@example.com' },
      ];
  
      // Mock data for applicants associated with duplicate emails
      const applicantsMock = [
        { id: 1, correo_electronico: 'duplicate1@example.com', fecha_de_applicacion: new Date() },
        { id: 2, correo_electronico: 'duplicate1@example.com', fecha_de_applicacion: new Date() },
        { id: 3, correo_electronico: 'duplicate2@example.com', fecha_de_applicacion: new Date() },
        { id: 4, correo_electronico: 'duplicate2@example.com', fecha_de_applicacion: new Date() },
        { id: 5, correo_electronico: 'duplicate2@example.com', fecha_de_applicacion: new Date() },
        { id: 6, correo_electronico: 'duplicate3@example.com', fecha_de_applicacion: new Date() },

      ];
  
      mockApplicantRepository.query.mockResolvedValue(duplicateEmailsMock);
      mockApplicantRepository.find.mockImplementation(({ where }) => {
        const email = where.correo_electronico;
        return applicantsMock.filter(applicant => applicant.correo_electronico === email);
      });
  
      const result = await service.getDuplicateEmails();
  
      console.log(result)
      expect(result).toHaveLength(duplicateEmailsMock.length);
      console.log(result[0].applicants);
      expect(result[0].email).toEqual(duplicateEmailsMock[0].correo_electronico);
      expect(result[0].applicants).toHaveLength(2); 
      expect(result[1].email).toEqual(duplicateEmailsMock[1].correo_electronico);
      expect(result[1].applicants).toHaveLength(3); 
    }); */

    it('should throw HttpException if applicant not found', async () => {

        mockApplicantRepository.query.mockRejectedValue(new Error());

        try {
          await service.getDuplicateEmails();
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
          expect(error.message).toBe('Error al recuperar los correos electrónicos duplicados.');
        }        
      });
    });


  describe('findByEstado', () => {
    it('should find applicants by estado - Invitado', async () => {
      const estado = 'Invitado';
      const invitadoApplicants = applicants.filter(
        (applicant) => applicant.estado === estado,
      );

      mockApplicantRepository.find.mockResolvedValue(invitadoApplicants);

      const result = await service.findByEstado(estado);
      //console.log(result);
      expect(result).toEqual(invitadoApplicants);
      expect(mockApplicantRepository.find).toHaveBeenCalledWith({
        where: { estado },
      });
    });

    it('should find applicants by estado - Matriculado', async () => {
      const estado = 'Matriculado';
      const MatriculadoApplicants = applicants.filter(
        (applicant) => applicant.estado === estado,
      );

      mockApplicantRepository.find.mockResolvedValue(MatriculadoApplicants);

      const result = await service.findByEstado(estado);
      //console.log(result);
      expect(result).toEqual(MatriculadoApplicants);
      expect(mockApplicantRepository.find).toHaveBeenCalledWith({
        where: { estado },
      });
    });

    it('should find applicants by estado - Rechazado', async () => {
      const estado = 'Rechazado';
      const RechazadoApplicants = applicants.filter(
        (applicant) => applicant.estado === estado,
      );

      mockApplicantRepository.find.mockResolvedValue(RechazadoApplicants);

      const result = await service.findByEstado(estado);
      //console.log(result);
      expect(result).toEqual(RechazadoApplicants);
      expect(mockApplicantRepository.find).toHaveBeenCalledWith({
        where: { estado },
      });
    });

    it('should find applicants by estado - Aplicante', async () => {
      const estado = 'Aplicante';
      const AplicanteApplicants = applicants.filter(
        (applicant) => applicant.estado === estado,
      );

      mockApplicantRepository.find.mockResolvedValue(AplicanteApplicants);

      const result = await service.findByEstado(estado);
      //console.log(result);
      expect(result).toEqual(AplicanteApplicants);
      expect(mockApplicantRepository.find).toHaveBeenCalledWith({
        where: { estado },
      });
    });

    it('should throw an exception when no applicants are found', async () => {
      const estado = 'NonExistentEstado';
      mockApplicantRepository.find.mockResolvedValue([]);

      try {
        await service.findByEstado(estado);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toEqual(
          'No se encontraron personas en este estado.',
        );
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('findByResidence', () => {
    it('should return applicants for the specified residence', async () => {
      const residence = 'USA';

      const residenceApplicants = applicants.filter(
        (applicant) => applicant.pais_de_residencia === residence,
      )

      mockApplicantRepository.find.mockResolvedValue(residenceApplicants);

      const result = await service.findByResidence(residence);

      //console.log(result);
      expect(result).toEqual(residenceApplicants);
      expect(mockApplicantRepository.find).toHaveBeenCalledWith({
        where: { pais_de_residencia: residence },
      });
    });

    it('should throw HttpException if no applicants found', async () => {
      const residence = 'NonExistentResidence';

      mockApplicantRepository.find.mockResolvedValue([]);

      await expect(service.findByResidence(residence)).rejects.toThrowError(
        new HttpException(
          'No se encontraron solicitantes para el pais de residencia especificado.',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
