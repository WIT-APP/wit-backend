/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TypeCategory } from "./question.enum";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    	id: number;

    @Column()
    	text: string;

    @Column()
    	type: string;

    @Column("text",{ array: true, default: {} })
    	options: string[];
    
    @Column({ type: "enum", enum: TypeCategory})
    	category: TypeCategory;
    
    @Column({nullable: true})
    	placeholder: string;
    
    @Column({nullable: true})
    	expandText: string;

    @Column()
    	id_question: string;

    @Column()
    	obligatory: boolean;
    
    

}
