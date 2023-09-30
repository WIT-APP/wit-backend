import { Test, TestingModule } from "@nestjs/testing";
import { InterviewService } from "./interview.service";
import { CreateInterviewDto } from "./dto/create-interview.dto";
import { getRepositoryToken } from "@nestjs/typeorm";
import Interview from "./entities/interview.entity";
import {
	InternalServerErrorException
} from "@nestjs/common";

describe("InterviewService", () => {
	let service: InterviewService;

	const mockInterviewRepository = {
		save: jest.fn(),
		findOne: jest.fn(),
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

	describe("findInterviewById", () => {
		it("should return a single Interview by the applicant ID", async () => {
			const id = 1;

			mockInterviewRepository.findOne.mockResolvedValue(createdInterview);

			const result = await service.findOneById(id);

			expect(result).toBe(createdInterview);
		});

		it("should throw an InternalServerErrorException on error", async () => {
			const id = 1;

			mockInterviewRepository.findOne.mockRejectedValue(new Error());

			try {
				await service.findOneById(id);
			} catch (error) {
				expect(error).toBeInstanceOf(InternalServerErrorException);
				expect(error.message).toBe("Error al recuperar la entrevista");
			}
		});
	});

	describe("create", () => {
		it("should create an Interview", async () => {
			mockInterviewRepository.save.mockResolvedValue(createdInterview);
			const applicant = 1;

			const result = await service.create(applicant, createInterviewDto);

			expect(result).toBe(createdInterview);
		});

		it("should throw an error if create fails", async () => {
			mockInterviewRepository.save.mockRejectedValue(
				new Error("Error al ingresar entrevista."),
			);
			const applicant = 1;
			await expect(service.create(applicant, createInterviewDto)).rejects.toThrowError(
				"Error al ingresar entrevista.",
			);
		});
	});

	describe("findByApplicantId", () => {
		it("should return a single Interview by the applicant ID", async () => {
			const applicant = 1;

			mockInterviewRepository.findOne.mockResolvedValue(createdInterview);

			const result = await service.findByApplicantId(applicant);

			expect(result).toBe(createdInterview);
		});

		it("should throw an InternalServerErrorException on error", async () => {
			const applicant = 1;

			mockInterviewRepository.findOne.mockRejectedValue(new Error());

			try {
				await service.findByApplicantId(applicant);
			} catch (error) {
				expect(error).toBeInstanceOf(InternalServerErrorException);
				expect(error.message).toBe("Error al recuperar la entrevista");
			}
		});
	});

	describe("Update", () => {
		it("should update an Interview", async () => {
			mockInterviewRepository.findOne.mockResolvedValue(createdInterview);
			mockInterviewRepository.save.mockResolvedValue(createdInterview);
			const applicant = 1;

			const result = await service.updateInterview(applicant, createInterviewDto);

			expect(result).toBe(createdInterview);
		});

		it("should throw an error if update fails", async () => {
			mockInterviewRepository.save.mockRejectedValue(
				new Error("Error al ingresar entrevista."),
			);
			const applicant = 1;
			await expect(service.updateInterview(applicant, createInterviewDto)).rejects.toThrowError(
				"Error al ingresar entrevista.",
			);
		});
	});
});
