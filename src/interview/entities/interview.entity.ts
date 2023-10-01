/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Applicant } from "../../applicant/entities/applicant.entity";

@Entity()
class Interview {
  @PrimaryGeneratedColumn()
  	id: number;

  @OneToOne(() => Applicant, (applicant) => applicant.id)
  @JoinColumn({ name: "applicant", referencedColumnName: "id" })
  @Column()
  	applicant: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  	fecha_de_applicacion: Date;

  @Column()
  	motivacion_curso: string;

  @Column()
  	soporte_it: string;

  @Column()
  	desempeno_laboral: string;

  @Column()
  	situacion_actual: string;

  @Column()
  	otros_cursos: string;

  @Column()
  	cual_curso: string;

  @Column()
  	disponibilidad: string;

  @Column()
  	participar_zoom: string;

  @Column()
  	encontrar_trabajo: string;

  @Column()
  	ajuste_calendario: string;

  @Column()
  	conexion_semanal: string;

  @Column()
  	conocer_curso: string;

  @Column()
  	beca_otra: string;

  @Column()
  	completado_mydigiskills: string;

  @Column()
  	aplicante_apto: string;

  @Column()
  	mas_informacion: string;

  //   extra python
  @Column()
  	que_es_programacion: string;

  @Column()
  	nivel_entrevistado: string;

  @Column()
  	logica_caracol: string;

  @Column()
  	nivel_ingles: string;
}

export default Interview;
