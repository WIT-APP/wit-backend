import { IsOptional } from "@nestjs/class-validator";

export class CreateInterviewDto {
@IsOptional()
	motivacion_curso?: string;

@IsOptional()
	soporte_it: string;

@IsOptional()
	desempeno_laboral: string;

@IsOptional()
	situacion_actual: string;

@IsOptional()
	otros_cursos: string;

@IsOptional()
	cual_curso?: string;

@IsOptional()
	disponibilidad: string;

@IsOptional()
	participar_zoom: string;

@IsOptional()
	encontrar_trabajo: string;

@IsOptional()
	ajuste_calendario: string;

@IsOptional()
	conexion_semanal: string;

@IsOptional()
	conocer_curso: string;

@IsOptional()
	beca_otra: string;

@IsOptional()
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
