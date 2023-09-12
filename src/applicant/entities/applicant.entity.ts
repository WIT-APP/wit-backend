import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TipoGenero, TipoId, TipoProgramaDeseado, TipoPermiso, TipoColectivo, TipoEducacion, TipoSituacionProfesional, TipoInteresesActuales, TipoAccessoInternetDispositivos, TipoEncontrarPrograma } from "./applicant.enums";
import { IsDate, IsEmail } from "@nestjs/class-validator";

@Entity()
export class Applicant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_apellidos: string;

    @IsEmail()
    @Column({unique: true})
    correo_electronico: string;

    @Column()
    telefono: number;

    @Column({type: "enum", enum: TipoGenero})
    genero: TipoGenero;

    @IsDate()
    @Column({type: "date"})
    fecha_de_nacimiento: Date;

    @Column()
    pais_de_nacimiento: string;

    @Column({type:"enum", enum: TipoId})
    documento_de_identidad: TipoId;

    @Column({nullable: true})
    numero_DNI: string;

    @Column({nullable: true})
    numero_NIE: string;

    @Column({nullable: true})
    otro_documento: string;

    @Column()
    direccion: string;

    @Column()
    ciudad: string;

    @Column()
    provincia: string;

    @Column()
    codigo_postal: number;

    @Column({type:"enum", enum: TipoProgramaDeseado})
    programa_cursar: TipoProgramaDeseado;
    
    @Column({type:"enum", enum:TipoPermiso, nullable: true})
    permiso: TipoPermiso;

    @Column({type:"enum", enum: TipoColectivo})
    colectivo: TipoColectivo;

    @Column({type:"enum", enum: TipoEducacion})
    educacion: TipoEducacion;

    @Column({type: "varchar", nullable: true})
    estudio_mas_alto: string;
    
    @Column({ type:"enum", enum: TipoSituacionProfesional})
    situacion_profesional: TipoSituacionProfesional;

    @Column({type:"enum", enum: TipoInteresesActuales})
    intereses_actuales: TipoInteresesActuales;

    @Column({type: "varchar"})
    dedicacion_semanal: string;

    @Column({type:"enum", enum: TipoAccessoInternetDispositivos})
    acceso_internet_dispositivos: TipoAccessoInternetDispositivos;

    @Column({type:"boolean"})
    formacion_online: boolean;

    @Column({type: "text"})
    razones_para_unir: string;

    @Column({type:"enum", enum: TipoEncontrarPrograma})
    encontrar_programa: TipoEncontrarPrograma;

    @Column({type:"text", nullable: true})
    mas_informacion: string;

}
