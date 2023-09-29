/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsEmail, Length } from "@nestjs/class-validator";
import Interview from "../../interview/entities/interview.entity";

@Entity()
export class Applicant {
@PrimaryGeneratedColumn()
  	id: number;

@Column({ default: () => "CURRENT_TIMESTAMP" })
  	fecha_de_applicacion: Date;

@Column()
  	nombre: string;

@Column()
  	apellidos: string;

@IsEmail()
@Column()
  	correo_electronico: string;

@Column()
  	telefono: number;

@Column({ default: "Aplicante" })
  	estado: string;

@Column()
  	genero: string;

@IsDate()
@Column({ type: "date" })
  	fecha_de_nacimiento: Date;

@Column()
  	pais_de_nacimiento: string;

@Column()
  	documento_de_identidad: string;

@Column({ nullable: true })
  	tipo_documento_identidad: string;

@Column()
  	numero_documento_id: string;

  @Column()
  	direccion: string;

  @Column()
  	ciudad: string;

  @Column()
  	provincia: string;

  @Length(5, 5)
  @Column()
  	codigo_postal: number;

  @Column()
  	pais_de_residencia: string;

  @Column()
  	programa_cursar: string;

  @Column({ nullable: true })
  	permiso: string;

  @Column("text", { array: true, default: {} })
  	colectivo: string[];

  @Column()
  	educacion: string;

  @Column({ type: "varchar", nullable: true })
  	estudio_mas_alto: string;

  @Column()
  	situacion_profesional: string;

  @Column()
  	intereses_actuales: string;

  @Column()
  	dedicacion_semanal: number;

  @Column()
  	acceso_internet_dispositivos: string;

  @Column({ type: "boolean" })
  	formacion_online: boolean;

  @Column({ type: "text" })
  	razones_para_unir: string;

  @Column()
  	encontrar_programa: string;

  @Column({ type: "text", nullable: true })
  	mas_informacion: string;

  @Column({ type: "text", nullable: true })
  	observaciones: string;

  @Column({ type: "text", nullable: true })
  	invitaciones: string;

  @OneToOne(() => Interview, (interview) => interview.applicant)
  	interview_id: number;
}
