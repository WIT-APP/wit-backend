import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantService } from './applicant.service';
import { Applicant } from './entities/applicant.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { TipoGenero, TipoId, TipoProgramaDeseado, TipoColectivo, TipoEducacion, TipoSituacionProfesional, TipoInteresesActuales, TipoAccessoInternetDispositivos, TipoEncontrarPrograma } from './entities/applicant.enums';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('ApplicantService', () => {
  let service: ApplicantService;

  const mockApplicantRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn()
  }
  const createApplicantDto: CreateApplicantDto = {
    nombre_apellidos: 'John Smith',
    correo_electronico: 'john@example.com',
    telefono: 64829471,
    genero: TipoGenero.hombre,
    fecha_de_nacimiento: new Date(2000, 12, 16),
    pais_de_nacimiento: 'France',
    documento_de_identidad: TipoId.DNI,
    numero_documento_id: 'Y2939789',
    direccion: 'c/Barcelona 1234',
    ciudad: 'Barcelona',
    provincia: 'Barcelona',
    codigo_postal: 78953,
    programa_cursar: TipoProgramaDeseado.ITSupport,
    colectivo: ['Mujer en situación de vulnerabilidad', 'Minorías étnicas'],
    educacion: TipoEducacion.sinEstudio,
    situacion_profesional: TipoSituacionProfesional.sinIngresos,
    intereses_actuales: TipoInteresesActuales.competenciasTecnologicas,
    dedicacion_semanal: 0,
    acceso_internet_dispositivos: TipoAccessoInternetDispositivos.sinAcceso,
    formacion_online: false,
    razones_para_unir: 'Lorem Ipsum',
    encontrar_programa: TipoEncontrarPrograma.redesSociales
  };
  const createdApplicant = {
    id: 1,
    nombre_apellidos: 'John Smith',
    correo_electronico: 'john@example.com',
    telefono: 64829471,
    genero: TipoGenero.hombre,
    fecha_de_nacimiento: new Date(2000, 12, 16),
    pais_de_nacimiento: 'France',
    documento_de_identidad: TipoId.DNI,
    numero_documento_id: 'Y2939789',
    direccion: 'c/Barcelona 1234',
    ciudad: 'Barcelona',
    provincia: 'Barcelona',
    codigo_postal: 78953,
    programa_cursar: TipoProgramaDeseado.ITSupport,
    colectivo: ['Mujer en situación de vulnerabilidad', 'Minorías étnicas'],
    educacion: TipoEducacion.sinEstudio,
    situacion_profesional: TipoSituacionProfesional.sinIngresos,
    intereses_actuales: TipoInteresesActuales.competenciasTecnologicas,
    dedicacion_semanal: 0,
    acceso_internet_dispositivos: TipoAccessoInternetDispositivos.sinAcceso,
    formacion_online: false,
    razones_para_unir: 'Lorem Ipsum',
    encontrar_programa: TipoEncontrarPrograma.redesSociales
  }; 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicantService,
      {
        provide: getRepositoryToken(Applicant),
        useValue: mockApplicantRepository,
      }],
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
      mockApplicantRepository.save.mockRejectedValue(new Error('Failed to submit form.'));

      await expect(service.create(createApplicantDto)).rejects.toThrowError('Failed to submit form.');
    });
  });

  describe('findAll', () => {
    it('should return a list of applicants', async () => {
      const expectedApplicants = [{
        id: 1,
        nombre_apellidos: 'John Smith',
        correo_electronico: 'john@example.com',
        telefono: 64829471,
        genero: TipoGenero.hombre,
        fecha_de_nacimiento: new Date(2000, 12, 16),
        pais_de_nacimiento: 'France',
        documento_de_identidad: TipoId.DNI,
        numero_documento_id: 'Y2939789',
        direccion: 'c/Barcelona 1234',
        ciudad: 'Barcelona',
        provincia: 'Barcelona',
        codigo_postal: 78953,
        programa_cursar: TipoProgramaDeseado.ITSupport,
        colectivo: ['Mujer en situación de vulnerabilidad', 'Minorías étnicas'],
        educacion: TipoEducacion.sinEstudio,
        situacion_profesional: TipoSituacionProfesional.sinIngresos,
        intereses_actuales: TipoInteresesActuales.competenciasTecnologicas,
        dedicacion_semanal: 0,
        acceso_internet_dispositivos: TipoAccessoInternetDispositivos.sinAcceso,
        formacion_online: false,
        razones_para_unir: 'Lorem Ipsum',
        encontrar_programa: TipoEncontrarPrograma.redesSociales
      },
      {
        id: 2,
        nombre_apellidos: 'John Smith',
        correo_electronico: 'bob@example.com',
        telefono: 64829471,
        genero: TipoGenero.hombre,
        fecha_de_nacimiento: new Date(2000, 12, 16),
        pais_de_nacimiento: 'France',
        documento_de_identidad: TipoId.DNI,
        numero_documento_id: 'Y2939789',
        direccion: 'c/Barcelona 1234',
        ciudad: 'Barcelona',
        provincia: 'Barcelona',
        codigo_postal: 78953,
        programa_cursar: TipoProgramaDeseado.ITSupport,
        colectivo: ['Mujer en situación de vulnerabilidad', 'Minorías étnicas'],
        educacion: TipoEducacion.sinEstudio,
        situacion_profesional: TipoSituacionProfesional.sinIngresos,
        intereses_actuales: TipoInteresesActuales.competenciasTecnologicas,
        dedicacion_semanal: 0,
        acceso_internet_dispositivos: TipoAccessoInternetDispositivos.sinAcceso,
        formacion_online: false,
        razones_para_unir: 'Lorem Ipsum',
        encontrar_programa: TipoEncontrarPrograma.redesSociales
      },
    ];
      mockApplicantRepository.find.mockResolvedValue(expectedApplicants);

      const result = await service.findAll();

      expect(result).toBe(expectedApplicants);
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

    it('should throw a NotFoundException if findOne fails', async () => {
      const id = 1; 

      mockApplicantRepository.findOne.mockRejectedValue(new Error());

      await expect(service.findOneById(id)).rejects.toThrowError(NotFoundException);
    });
  });
});

