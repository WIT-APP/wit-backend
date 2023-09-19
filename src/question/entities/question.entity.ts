/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TypeCategory, TypeField } from "./question.enum";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    	id: number;

    @Column()
    	text: string;

    @Column({type: "enum", enum: TypeField})
    	type: TypeField;

    @Column("text",{ array: true, default: {} })
    	options: string[];
    
    @Column({ type: "enum", enum: TypeCategory})
    	category: TypeCategory;
    
    @Column()
    	placeholder: string;
    
    @Column()
    	expandText: string;

    @Column()
    	id_question: string;

    @Column()
    	obligatory: boolean;

}
