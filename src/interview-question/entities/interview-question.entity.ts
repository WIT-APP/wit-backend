import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InterviewQuestion {
@PrimaryGeneratedColumn()
	id: number;

@Column()
	text: string;

@Column()
	type: string;

@Column("text",{ array: true, default: {} })
	options: string[];
    
@Column()
	category: string;
    
@Column({nullable: true})
	placeholder: string;
    
@Column({nullable: true})
	expandText: string;

@Column()
	id_question: string;

@Column()
	obligatory: boolean;
    
    

}
