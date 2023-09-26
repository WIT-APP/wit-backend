/* eslint-disable no-mixed-spaces-and-tabs */
import { IsNotEmpty } from "@nestjs/class-validator";

export class CreateApplicantDto {
  @IsNotEmpty()
  	nombre: string;

  @IsNotEmpty()
  	apellidos: string;

  @IsNotEmpty()
  	correo_electronico: string;

  @IsNotEmpty()
  	telefono: number;

  @IsNotEmpty()
  	genero: string;

  @IsNotEmpty()
  	fecha_de_nacimiento: Date;

  @IsNotEmpty()
  	pais_de_nacimiento: string;

  @IsNotEmpty()
  	documento_de_identidad: string;

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
  	codigo_postal: number;

  @IsNotEmpty()
  	pais_de_residencia: string;

  @IsNotEmpty()
  	programa_cursar: string;

  permiso?: string;

  @IsNotEmpty()
  	colectivo: string[];

  @IsNotEmpty()
  	educacion: string;

  estudio_mas_alto?: string;

  @IsNotEmpty()
  	situacion_profesional: string;

  @IsNotEmpty()
  	intereses_actuales: string;

  @IsNotEmpty()
  	dedicacion_semanal: number;

  @IsNotEmpty()
  	acceso_internet_dispositivos: string;

  @IsNotEmpty()
  	formacion_online: boolean;

  @IsNotEmpty()
  	razones_para_unir: string;

  @IsNotEmpty()
  	encontrar_programa: string;

  mas_informacion?: string;

  observaciones?: string;

}
