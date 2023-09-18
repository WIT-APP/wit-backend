import { IsNotEmpty } from '@nestjs/class-validator';
import {
  TipoAccessoInternetDispositivos,
  TipoColectivo,
  TipoEducacion,
  TipoEncontrarPrograma,
  TipoGenero,
  TipoId,
  TipoInteresesActuales,
  TipoPermiso,
  TipoProgramaDeseado,
  TipoSituacionProfesional,
} from '../entities/applicant.enums';

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
  genero: TipoGenero;

  @IsNotEmpty()
  fecha_de_nacimiento: Date;

  @IsNotEmpty()
  pais_de_nacimiento: string;

  @IsNotEmpty()
  documento_de_identidad: TipoId;

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
  programa_cursar: TipoProgramaDeseado;

  permiso?: TipoPermiso;

  @IsNotEmpty()
  colectivo: string[];

  @IsNotEmpty()
  educacion: TipoEducacion;

  estudio_mas_alto?: string;

  @IsNotEmpty()
  situacion_profesional: TipoSituacionProfesional;

  @IsNotEmpty()
  intereses_actuales: TipoInteresesActuales;

  @IsNotEmpty()
  dedicacion_semanal: number;

  @IsNotEmpty()
  acceso_internet_dispositivos: TipoAccessoInternetDispositivos;

  @IsNotEmpty()
  formacion_online: boolean;

  @IsNotEmpty()
  razones_para_unir: string;

  @IsNotEmpty()
  encontrar_programa: TipoEncontrarPrograma;

  mas_informacion?: string;
}
