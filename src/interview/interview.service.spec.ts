import { Test, TestingModule } from "@nestjs/testing";
import { InterviewService } from "./interview.service";
import { CreateInterviewDto } from "./dto/create-interview.dto";
import { getRepositoryToken } from "@nestjs/typeorm";
import Interview from "./entities/interview.entity";
import {
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";

describe("InterviewService", () => {
	let service: InterviewService;

	const mockInterviewRepository = {
		create: jest.fn(),
		findByApplicantId: jest.fn(),
	};

	const createInterviewDto: CreateInterviewDto = {
		applicant: 1,
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
			providers: [
				InterviewService,
				{
					provide: getRepositoryToken(Interview),
					useValue: mockInterviewRepository,
				},
			],
		}).compile();

		service = module.get<InterviewService>(InterviewService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("create", () => {
		it("should create an Interview", async () => {
			mockInterviewRepository.create.mockResolvedValue(createInterviewDto);

			const result = await service.create(createInterviewDto);

			expect(result).toBe(createdInterview);
		});

		it("should throw an error if create fails", async () => {
			mockInterviewRepository.create.mockRejectedValue(
				new Error("Error al ingresar entrevista."),
			);

			await expect(service.create(createInterviewDto)).rejects.toThrowError(
				"Error al ingresar entrevista.",
			);
		});
	});

	describe("findByApplicantId", () => {
		it("should return a single Interview", async () => {
			const applicant = 1;

			mockInterviewRepository.findByApplicantId.mockResolvedValue(
				createdInterview,
			);

			const result = await service.findByApplicantId(applicant);

			expect(result).toBe(createdInterview);
		});

		it("should throw a NotFoundException if Interview is not found", async () => {
			const applicant = 1;

			mockInterviewRepository.findByApplicantId.mockResolvedValue(null);

			try {
				await service.findByApplicantId(applicant);
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundException);
				expect(error.message).toBe("Entrevista no encontrada");
			}
		});

		it("should throw an InternalServerErrorException on error", async () => {
			const applicant = 1;

			mockInterviewRepository.findByApplicantId.mockRejectedValue(new Error());

			try {
				await service.findByApplicantId(applicant);
			} catch (error) {
				expect(error).toBeInstanceOf(InternalServerErrorException);
				expect(error.message).toBe("Error al recuperar la entrevista");
			}
		});
	});
});
