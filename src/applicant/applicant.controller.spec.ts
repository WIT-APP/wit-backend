import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantController } from './applicant.controller';
import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { TipoAccessoInternetDispositivos, TipoColectivo, TipoEducacion, TipoEncontrarPrograma, TipoGenero, TipoId, TipoInteresesActuales, TipoProgramaDeseado, TipoSituacionProfesional } from './entities/applicant.enums';
import { Applicant } from './entities/applicant.entity';
import { ConflictException } from '@nestjs/common';

describe('ApplicantController', () => {
  let controller: ApplicantController;

  const mockApplicantService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByEstado: jest.fn(),
    findByResidence: jest.fn(),
    findOneByEmail: jest.fn(),
    getDuplicateEmails: jest.fn(),
  }

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
      encontrar_programa: TipoEncontrarPrograma.RedesSociales
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
      estado: 'Aplicante'
    }; 

   const applicants = [{
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
      estado: 'Aplicante'
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
      estado: 'Invitado'
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
      estado: 'Rechazado'
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
      estado: 'Matriculado'
    },
  ]; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicantController],
      providers: [ApplicantService],
    }).overrideProvider(ApplicantService).useValue(mockApplicantService).compile();

    controller = module.get<ApplicantController>(ApplicantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an applicant', async () => {

      mockApplicantService.create.mockResolvedValue(createdApplicant);

      const result = await controller.create(createApplicantDto);

      expect(result).toBe(createdApplicant);
      expect(mockApplicantService.create).toHaveBeenCalledWith(createApplicantDto);
    });
  });

  describe('findAll', () => {
    it('should return a list of applicants', async () => {
      
      mockApplicantService.findAll.mockResolvedValue(applicants);

      const result = await controller.findAll();
      //console.log(result);
      expect(result).toBe(applicants);
      expect(mockApplicantService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOneById', () => {
    it('should return a single applicant by ID', async () => {
      const id = '1'; 
      mockApplicantService.findOneById.mockResolvedValue(createdApplicant);

      const result = await controller.findOne(id);

      expect(result).toBe(createdApplicant);
      expect(mockApplicantService.findOneById).toHaveBeenCalledWith(+id); 
    });
  });

  describe('findOneByEmail', () => {
    it('should return a single applicant by email', async () => {
      const email = 'bob@example.com'; 
      mockApplicantService.findOneByEmail.mockResolvedValue(createdApplicant);

      const result = await controller.findByEmail(email);

      expect(result).toBe(createdApplicant);
      expect(mockApplicantService.findOneByEmail).toHaveBeenCalledWith(email); 
    });
  });
  
  
  describe('filterByEstado', () => {

    it('should return applicants for the specified estado - Aplicante', async () => {
      const estado = 'Aplicante';
  
      mockApplicantService.findByEstado.mockResolvedValue(
        applicants.filter(applicant => applicant.estado === estado)
      );
  
      const result = await controller.filterByEstado(estado);
      //console.log(result);
      expect(result).toEqual([applicants[0]]);
    });


    it('should return applicants for the specified estado - Invitado', async () => {
      const estado = 'Invitado';

      mockApplicantService.findByEstado.mockResolvedValue(
        applicants.filter(applicant => applicant.estado === estado)
      );

      const result = await controller.filterByEstado(estado);
      //console.log(result);
      expect(result).toEqual([applicants[1]]);
    });


  it('should return applicants for the specified estado - Rechazado', async () => {
    const estado = 'Rechazado';

    mockApplicantService.findByEstado.mockResolvedValue(
      applicants.filter(applicant => applicant.estado === estado)
    );

    const result = await controller.filterByEstado(estado);
    //console.log(result);
    expect(result).toEqual([applicants[2]]);
  });

  it('should return applicants for the specified estado - Matriculado', async () => {
    const estado = 'Matriculado';

    mockApplicantService.findByEstado.mockResolvedValue(
      applicants.filter(applicant => applicant.estado === estado)
    );

    const result = await controller.filterByEstado(estado);
    //console.log(result);
    expect(result).toEqual([applicants[3]]);
  });

});

describe('getByResidenceSpain', () => {
  it('should return applicants for residence Spain', async () => {
    const spainApplicants = applicants.filter(applicant => applicant.pais_de_residencia === 'España');

    mockApplicantService.findByResidence.mockResolvedValue(spainApplicants);

    const result = await controller.getByResidenceSpain();

    expect(result).toEqual(spainApplicants);
    expect(mockApplicantService.findByResidence).toHaveBeenCalledWith('España');
  });
});

describe('getByResidence', () => {
  it('should return applicants for specified rcountry of esidence', async () => {
    const residence = 'USA';

    mockApplicantService.findByResidence.mockResolvedValue  
    (applicants.filter(applicant => applicant.pais_de_residencia === residence)
    );

    const result = await controller.getByResidence(residence);
    console.log(result);
    expect(result).toEqual([applicants[3]]);
    expect(mockApplicantService.findByResidence).toHaveBeenCalledWith(residence);
  });
});
/* describe('getDuplicateEmails', () => {
  it('should return duplicate emails from the service', async () => {
    const duplicateEmails = [{ email: 'duplicate1@example.com' }, { email: 'duplicate2@example.com' }];
    mockApplicantService.getDuplicateEmails.mockResolvedValue(duplicateEmails);

    const result = await controller.getDuplicateEmails();

    expect(result).toEqual(duplicateEmails);
    expect(mockApplicantService.getDuplicateEmails).toHaveBeenCalled();
  });

  it('should throw a ConflictException if the service throws an error', async () => {
    mockApplicantService.getDuplicateEmails.mockRejectedValue(new Error('Some error'));

    await expect(controller.getDuplicateEmails()).rejects.toThrowError(ConflictException);
    expect(mockApplicantService.getDuplicateEmails).toHaveBeenCalled();
  });
}); */

});

