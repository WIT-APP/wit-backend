import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicantDto } from './create-applicant.dto';
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

export class UpdateApplicantDto extends PartialType(CreateApplicantDto) {
  nombre_apellidos?: string;
  correo_electronico?: string;
  telefono?: number;
  estado?: string;
  genero?: TipoGenero;
  fecha_de_nacimiento?: Date;
  pais_de_nacimiento?: string;
  documento_de_identidad?: TipoId;
  numero_documento_id?: string;
  direccion?: string;
  ciudad?: string;
  codigo_postal?: number;
  pais_de_residencia?: string;
  programa_cursar?: TipoProgramaDeseado;
  permiso?: TipoPermiso;
  colectivo?: string[];
  educacion?: TipoEducacion;
  estudio_mas_alto?: string;
  situacion_profesional?: TipoSituacionProfesional;
  intereses_actuales?: TipoInteresesActuales;
  dedicacion_semanal?: number;
  acceso_internet_dispositivos?: TipoAccessoInternetDispositivos;
  formacion_online?: boolean;
  razones_para_unir?: string;
  encontrar_programa?: TipoEncontrarPrograma;
  mas_informacion?: string;
}
