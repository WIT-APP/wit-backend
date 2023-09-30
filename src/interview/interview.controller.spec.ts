import { Test, TestingModule } from "@nestjs/testing";
import { InterviewController } from "./interview.controller";
import { InterviewService } from "./interview.service";
import { CreateInterviewDto } from "./dto/create-interview.dto";

describe("InterviewController", () => {
	let controller: InterviewController;

	const mockInterviewService = {
		findOneById: jest.fn(),
		create: jest.fn(),
		findByApplicantId: jest.fn(),
		updateInterview: jest.fn(),
	};

	const createInterviewDto: CreateInterviewDto = {
		motivacion_curso: "buena motivacion",
		soporte_it: "buen soporte",
		desempeno_laboral: "buen desempeño laboral",
		situacion_actual: "buena situacion actual",
		otros_cursos: true,
		cual_curso: "buen curso",
		disponibilidad: "inmediata",
		participar_zoom: "buena participacion",
		encontrar_trabajo: "si encuentra",
		ajuste_calendario: true,
		conexion_semanal: "buena conexion",
		conocer_curso: "buen conocimiento",
		beca_otra: "si otra",
		completado_mydigiskills: "si completado",
		aplicante_apto: "aplicante apto",
		mas_informacion: "mas informacion",
		que_es_programacion: "la programacion es buena",
		nivel_entrevistado: "buen nivel",
		logica_caracol: "buena logica",
		nivel_ingles: "buen nivel de ingles",
	};

	const createdInterview = {
		id: 1,
		aplicant: 1,
		motivacion_curso: "buena motivacion",
		soporte_it: "buen soporte",
		desempeno_laboral: "buen desempeño laboral",
		situacion_actual: "buena situacion actual",
		otros_cursos: true,
		cual_curso: "buen curso",
		disponibilidad: "inmediata",
		participar_zoom: "buena participacion",
		encontrar_trabajo: "si encuentra",
		ajuste_calendario: true,
		conexion_semanal: "buena conexion",
		conocer_curso: "buen conocimiento",
		beca_otra: "si otra",
		completado_mydigiskills: "si completado",
		aplicante_apto: "aplicante apto",
		mas_informacion: "mas informacion",
		que_es_programacion: "la programacion es buena",
		nivel_entrevistado: "buen nivel",
		logica_caracol: "buena logica",
		nivel_ingles: "buen nivel de ingles",
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

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	describe("findInterviewById", () => {
		it("should return a single Interview by the applicant ID", async () => {
			const id = 1;

			mockInterviewService.findOneById.mockResolvedValue(createdInterview);

			const result = await controller.findOneById(id);

			expect(result).toBe(createdInterview);
		});
	});

	describe("create", () => {
		it("should create an interview", async () => {
			mockInterviewService.create.mockResolvedValue(createdInterview);
			const applicant= 1;

			const result = await controller.create(applicant, createInterviewDto);

			expect(result).toBe(createdInterview);
		});
	});

	describe("findOneByApplicantId", () => {
		it("should return a single interview by Applicant ID", async () => {
			const id = 1;
			mockInterviewService.findByApplicantId.mockResolvedValue(
				createdInterview,
			);

			await controller.findByApplicantId(id);

			expect(mockInterviewService.findByApplicantId).toHaveBeenCalledWith(id);
		});
	});

	describe("Update", () => {
		it("should update an Interview", async () => {
			mockInterviewService.updateInterview.mockResolvedValue(createdInterview);
			const applicant = 1;

			const result = await controller.updateInterview(applicant, createInterviewDto);

			expect(result).toBe(createdInterview);
		});
	});
});
