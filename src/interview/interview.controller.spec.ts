import { Test, TestingModule } from '@nestjs/testing';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview.dto';

describe('InterviewController', () => {
  let controller: InterviewController;

  const mockInterviewService = {
    create: jest.fn(),
    findByApplicantId: jest.fn(),
  };

  const createInterviewDTO: CreateInterviewDto = {
    applicant: 1,
    motivacion_curso: 'buena motivacion',
    soporte_it: 'buen soporte',
    desempeno_laboral: 'buen desempeño laboral',
    situacion_actual: 'buena situacion actual',
    otros_cursos: true,
    cual_curso: 'buen curso',
    disponibilidad: 'inmediata',
    participar_zoom: 'buena participacion',
    encontrar_trabajo: 'si encuentra',
    ajuste_calendario: true,
    conexion_semanal: 'buena conexion',
    conocer_curso: 'buen conocimiento',
    beca_otra: 'si otra',
    completado_mydigiskills: 'si completado',
    aplicante_apto: 'aplicante apto',
    mas_informacion: 'mas informacion',
    que_es_programacion: 'la programacion es buena',
    nivel_entrevistado: 'buen nivel',
    logica_caracol: 'buena logica',
    nivel_ingles: 'buen nivel de ingles',
  };

  const createdInterview = {
    id: 1,
    aplicant: 1,
    motivacion_curso: 'buena motivacion',
    soporte_it: 'buen soporte',
    desempeno_laboral: 'buen desempeño laboral',
    situacion_actual: 'buena situacion actual',
    otros_cursos: true,
    cual_curso: 'buen curso',
    disponibilidad: 'inmediata',
    participar_zoom: 'buena participacion',
    encontrar_trabajo: 'si encuentra',
    ajuste_calendario: true,
    conexion_semanal: 'buena conexion',
    conocer_curso: 'buen conocimiento',
    beca_otra: 'si otra',
    completado_mydigiskills: 'si completado',
    aplicante_apto: 'aplicante apto',
    mas_informacion: 'mas informacion',
    que_es_programacion: 'la programacion es buena',
    nivel_entrevistado: 'buen nivel',
    logica_caracol: 'buena logica',
    nivel_ingles: 'buen nivel de ingles',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewController],
      providers: [InterviewService],
    })
      .overrideProvider(InterviewService)
      .useValue(mockInterviewService)
      .compile();

    controller = module.get<InterviewController>(InterviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an interview', async () => {
      mockInterviewService.create.mockResolvedValue(createdInterview);

      const result = await controller.create(createInterviewDTO);

      expect(result).toBe(createdInterview);
      expect(mockInterviewService.create).toHaveBeenCalledWith(
        createInterviewDTO,
      );
    });
  });

  describe('findOneByApplicantId', () => {
    it('should return a single interview by Applicant ID', async () => {
      const id = 1;
      mockInterviewService.findByApplicantId.mockResolvedValue(
        createdInterview,
      );

      const result = await controller.findByApplicantId(id);

      expect(mockInterviewService.findByApplicantId).toHaveBeenCalledWith(id);
    });
  });
});
