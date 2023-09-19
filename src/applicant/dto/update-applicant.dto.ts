import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicantDto } from './create-applicant.dto';


export class UpdateApplicantDto extends PartialType(CreateApplicantDto) {
  nombre?: string;
  apellidos?: string;
  correo_electronico?: string;
  telefono?: number;
  estado?: string;
  genero?: string;
  fecha_de_nacimiento?: Date;
  pais_de_nacimiento?: string;
  documento_de_identidad?: string;
  tipo_documento_identidad?: string;
  numero_documento_id?: string;
  direccion?: string;
  ciudad?: string;
  codigo_postal?: number;
  pais_de_residencia?: string;
  programa_cursar?: string;
  permiso?: string;
  colectivo?: string[];
  educacion?: string;
  estudio_mas_alto?: string;
  situacion_profesional?: string;
  intereses_actuales?: string;
  dedicacion_semanal?: number;
  acceso_internet_dispositivos?: string;
  formacion_online?: boolean;
  razones_para_unir?: string;
  encontrar_programa?: string;
  mas_informacion?: string;
}
