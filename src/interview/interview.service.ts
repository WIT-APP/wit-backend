import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Interview from './entities/interview.entity';
import { Repository } from 'typeorm';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { Applicant } from 'src/applicant/entities/applicant.entity';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
  ) {}

  async findOneByApplicantId(id: number): Promise<Interview> {
    const interview = await this.interviewRepository.findOne({
      where: { id },
    });

    if (!interview) {
      throw new NotFoundException('Entrevista no encontrada');
    }

    return interview;
  }

  async create(
    id: number,
    createInterviewDto: CreateInterviewDto,
  ): Promise<Interview> {
    try {
      const interview = new Interview();
      interview.applicant = id;
      const {
        motivacion_curso,
        soporte_it,
        desempeno_laboral,
        situacion_actual,
        otros_cursos,
        cual_curso,
        disponibilidad,
        participar_zoom,
        encontrar_trabajo,
        ajuste_calendario,
        conexion_semanal,
        conocer_curso,
        beca_otra,
        completado_mydigiskills,
        aplicante_apto,
        mas_informacion,
        que_es_programacion,
        nivel_entrevistado,
        logica_caracol,
        nivel_ingles,
      } = createInterviewDto;
      interview.motivacion_curso = motivacion_curso;
      interview.soporte_it = soporte_it;
      interview.desempeno_laboral = desempeno_laboral;
      interview.situacion_actual = situacion_actual;
      interview.otros_cursos = otros_cursos;
      interview.cual_curso = cual_curso;
      interview.disponibilidad = disponibilidad;
      interview.participar_zoom = participar_zoom;
      interview.encontrar_trabajo = encontrar_trabajo;
      interview.ajuste_calendario = ajuste_calendario;
      interview.conexion_semanal = conexion_semanal;
      interview.conocer_curso = conocer_curso;
      interview.beca_otra = beca_otra;
      interview.completado_mydigiskills = completado_mydigiskills;
      interview.aplicante_apto = aplicante_apto;
      interview.mas_informacion = mas_informacion;
      interview.que_es_programacion = que_es_programacion;
      interview.nivel_entrevistado = nivel_entrevistado;
      interview.logica_caracol = logica_caracol;
      interview.nivel_ingles = nivel_ingles;

      return this.interviewRepository.save(interview);
    } catch (error) {
      throw new Error('Error al ingresar entrevista.');
    }
  }
}
