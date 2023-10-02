/* eslint-disable no-mixed-spaces-and-tabs */
import { IsNotEmpty, IsOptional } from "@nestjs/class-validator";

export class CreateApplicantDto {
  @IsNotEmpty()
  	nombre: string;

  @IsNotEmpty()
  	apellidos: string;

  @IsNotEmpty()
  	correo_electronico: string;

  @IsNotEmpty()
  	telefono: string;

  @IsNotEmpty()
  	genero: string;

  @IsNotEmpty()
  	fecha_de_nacimiento: Date;

  @IsNotEmpty()
  	pais_de_nacimiento: string;

  @IsNotEmpty()
  	documento_de_identidad: string;

  @IsOptional()
  	tipo_documento_identidad?: string;

  @IsNotEmpty()
  	numero_documento_id: string;

  @IsNotEmpty()
  	direccion: string;

  @IsNotEmpty()
  	ciudad: string;

  @IsNotEmpty()
  	provincia: string;

  @IsNotEmpty()
  	codigo_postal: string;

  @IsNotEmpty()
  	pais_de_residencia: string;

  @IsNotEmpty()
  	programa_cursar: string;

  @IsOptional()
  	permiso?: string;

  @IsNotEmpty()
  	colectivo: string[];

  @IsNotEmpty()
  	educacion: string;

  @IsOptional()
  	estudio_mas_alto?: string;

  @IsNotEmpty()
  	situacion_profesional: string;

  @IsNotEmpty()
  	intereses_actuales: string;

  @IsNotEmpty()
  	dedicacion_semanal: string;

  @IsNotEmpty()
  	acceso_internet_dispositivos: string;

  @IsNotEmpty()
  	formacion_online: string;

  @IsNotEmpty()
  	razones_para_unir: string;

  @IsNotEmpty()
  	encontrar_programa: string;

  @IsOptional()
  	mas_informacion?: string;

  @IsOptional()
  	observaciones?: string;

  @IsOptional()
  	invitaciones?: number;
}
