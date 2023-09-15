import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantController } from './applicant.controller';
import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { TipoAccessoInternetDispositivos, TipoColectivo, TipoEducacion, TipoEncontrarPrograma, TipoGenero, TipoId, TipoInteresesActuales, TipoProgramaDeseado, TipoSituacionProfesional } from './entities/applicant.enums';

describe('ApplicantController', () => {
  let controller: ApplicantController;

  const mockApplicantService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
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
      const applicants = [{
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

      mockApplicantService.findAll.mockResolvedValue(applicants);

      const result = await controller.findAll();

      expect(result).toBe(applicants);
      expect(mockApplicantService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single applicant', async () => {
      const id = '1'; 
      mockApplicantService.findOneById.mockResolvedValue(createdApplicant);

      const result = await controller.findOne(id);

      expect(result).toBe(createdApplicant);
      expect(mockApplicantService.findOneById).toHaveBeenCalledWith(+id); // Ensure the ID is converted to a number
    });
  });
});
