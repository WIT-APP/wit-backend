import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Applicant } from '../../applicant/entities/applicant.entity';

@Entity()
class Interview {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => Applicant, (applicant) => applicant.id)
  @JoinColumn()
  public applicant_id: number;

  @Column()
  public motivacion_curso: string;

  @Column()
  public soporte_it: string;

  @Column()
  public desempeno_laboral: string;

  @Column()
  public situacion_actual: string;

  @Column()
  public otros_cursos: boolean;

  @Column()
  public cual_curso: string;

  @Column()
  public disponibilidad: string;

  @Column()
  public participar_zoom: string;

  @Column()
  public encontrar_trabajo: string;

  @Column()
  public ajuste_calendario: boolean;

  @Column()
  public conexion_semanal: string;

  @Column()
  public conocer_curso: string;

  @Column()
  public beca_otra: string;

  @Column()
  public completado_mydigiskills: string;

  @Column()
  public aplicante_apto: string;

  @Column()
  public mas_informacion: string;

  //   extra python
  @Column()
  public que_es_programacion: string;

  @Column()
  public nivel_entrevistado: string;

  @Column()
  public logica_caracol: string;

  @Column()
  public nivel_ingles: string;
}

export default Interview;
