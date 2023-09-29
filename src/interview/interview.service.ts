import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Interview from "./entities/interview.entity";
import { Repository } from "typeorm";
import { CreateInterviewDto } from "./dto/create-interview.dto";
import { UpdateInterviewDto } from "./dto/update-interview.dto";

@Injectable()
export class InterviewService {
	constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
	) {}

	async findOneById(id: number): Promise<Interview> {
		const interview = await this.interviewRepository.findOne({
			where: { id },
		});

		if (!interview) {
			throw new NotFoundException("Entrevista no encontrada");
		}

		return interview;
	}

	async create(createInterviewDto: CreateInterviewDto): Promise<Interview> {
		try {
			return await this.interviewRepository.save(createInterviewDto);
		} catch (error) {
			throw new Error("Error al ingresar entrevista.");
		}
	}

	async findByApplicantId(applicant: number): Promise<Interview> {
		try {
			const interviews = await this.interviewRepository.findOne({
				where: { applicant },
			});

			if (!interviews) {
				throw new NotFoundException(
					"No se encontraron entrevistas para este solicitante",
				);
			}

			return interviews;
		} catch (error) {
			throw new InternalServerErrorException(
				"Error al recuperar la entrevista",
			);
		}
	}

	async updateInterview(
		applicant: number,
		updateInterviewDto: UpdateInterviewDto,
	): Promise<Interview> {
		const interview = await this.interviewRepository.findOne({ where: { applicant } });
		if (!interview) {
			throw new NotFoundException("No se encontró la entrevista.");
		}

		interview.motivacion_curso = updateInterviewDto.motivacion_curso;
		interview.soporte_it = updateInterviewDto.soporte_it;
		interview.desempeno_laboral = updateInterviewDto.desempeno_laboral;
		interview.situacion_actual = updateInterviewDto.situacion_actual;
		interview.otros_cursos = updateInterviewDto.otros_cursos;
		interview.cual_curso = updateInterviewDto.cual_curso;
		interview.disponibilidad = updateInterviewDto.disponibilidad;
		interview.participar_zoom = updateInterviewDto.participar_zoom;
		interview.encontrar_trabajo = updateInterviewDto.encontrar_trabajo;
		interview.ajuste_calendario = updateInterviewDto.ajuste_calendario;
		interview.conexion_semanal = updateInterviewDto.conexion_semanal;
		interview.conocer_curso = updateInterviewDto.conocer_curso;
		interview.beca_otra = updateInterviewDto.beca_otra;
		interview.completado_mydigiskills = updateInterviewDto.completado_mydigiskills;
		interview.aplicante_apto = updateInterviewDto.aplicante_apto;
		interview.mas_informacion = updateInterviewDto.mas_informacion;
		interview.que_es_programacion = updateInterviewDto.que_es_programacion;
		interview.nivel_entrevistado = updateInterviewDto.nivel_entrevistado;
		interview.logica_caracol = updateInterviewDto.logica_caracol;
		interview.nivel_ingles = updateInterviewDto.nivel_ingles;

		const updatedApplicant = await this.interviewRepository.save(interview);
		return updatedApplicant;
	}

}
