import { IsNotEmpty, IsOptional } from '@nestjs/class-validator';
import { Applicant } from 'src/applicant/entities/applicant.entity';

export class CreateInterviewDto {
  @IsNotEmpty()
  applicant_id: Applicant;

  @IsOptional()
  motivacion_curso?: string;

  @IsNotEmpty()
  soporte_it: string;

  @IsNotEmpty()
  desempeno_laboral: string;

  @IsNotEmpty()
  situacion_actual: string;

  @IsNotEmpty()
  otros_cursos: boolean;

  @IsOptional()
  cual_curso?: string;

  @IsNotEmpty()
  disponibilidad: string;

  @IsNotEmpty()
  participar_zoom: string;

  @IsNotEmpty()
  encontrar_trabajo: string;

  @IsNotEmpty()
  ajuste_calendario: boolean;

  @IsNotEmpty()
  conexion_semanal: string;

  @IsNotEmpty()
  conocer_curso: string;

  @IsNotEmpty()
  beca_otra: string;

  @IsNotEmpty()
  completado_mydigiskills: string;

  @IsOptional()
  aplicante_apto?: string;

  @IsOptional()
  mas_informacion?: string;

  //   extra python
  @IsOptional()
  que_es_programacion?: string;

  @IsOptional()
  nivel_entrevistado?: string;

  @IsOptional()
  logica_caracol?: string;

  @IsOptional()
  nivel_ingles?: string;
}
