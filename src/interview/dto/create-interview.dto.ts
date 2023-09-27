import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateInterviewDto {
  @IsNotEmpty()
  applicant_id: number;

  motivacion_curso?: string;

  @IsNotEmpty()
  soporte_it: string;

  @IsNotEmpty()
  desempeno_laboral: string;

  @IsNotEmpty()
  situacion_actual: string;

  @IsNotEmpty()
  otros_cursos: boolean;

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

  aplicante_apto?: string;

  mas_informacion?: string;

  //   extra python
  @IsNotEmpty()
  que_es_programacion: string;

  @IsNotEmpty()
  nivel_entrevistado: string;

  @IsNotEmpty()
  logica_caracol: string;

  @IsNotEmpty()
  nivel_ingles: string;
}
