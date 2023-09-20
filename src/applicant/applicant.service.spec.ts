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
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn(),
    })),
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

    
  });
  describe('getDuplicateEmails', () => {
    it('should return duplicate emails', async () => {
      const duplicateEmails = [applicants[1], applicants[2]]

      const mockQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(
          applicants.filter((applicant, index) =>
            applicants.some((a, i) => a.correo_electronico === applicant.correo_electronico && i !== index)
          )
        ),        };
  
      jest.spyOn(mockApplicantRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder as any);
      
      const result = await service.getDuplicateEmails();
    
      expect(result).toEqual(duplicateEmails);
      expect(mockQueryBuilder.getRawMany).toHaveBeenCalled();
    });

  
    it('should throw a ConflictException if there is an error', async () => {
      mockApplicantRepository.createQueryBuilder().getRawMany.mockRejectedValue(new Error());

      await expect(service.getDuplicateEmails()).rejects.toThrowError(
        'Error al recuperar los correos electrónicos duplicados.',
      );
      expect(mockApplicantRepository.createQueryBuilder().getRawMany).toHaveBeenCalled();
    });
  });
  //!! NEEDS REVISION !!
  describe('getUsersPreapproved', () => {
    it('should return preapproved users in Spain that do not have repeating emails', async () => {
      const expectedQueryResult = [applicants[0]]; 
      mockApplicantRepository.query.mockResolvedValueOnce(expectedQueryResult);
  
      const result = await service.getUsersPreapproved();

        //!!this is to mock the query that is written in the service function that has SQL style query
      expect(mockApplicantRepository.query).toHaveBeenCalledWith(expect.any(String));
      /* expect(result).toEqual(expectedQueryResult); */
    });
  

    it('should throw an error if there is an error', async () => {
      mockApplicantRepository.query.mockRejectedValueOnce(new Error());

      await expect(service.getUsersPreapproved()).rejects.toThrowError('Error al recuperar usuarios preaprobados.');
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
      );

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
