import { IsNotEmpty, IsOptional } from "@nestjs/class-validator";

export class CreateQuestionDto {
	
@IsNotEmpty()
	text: string;

@IsNotEmpty()
	type: string;
   
@IsNotEmpty()
	category: string;

@IsOptional()
	options?: string[];

@IsOptional()
	placeholder?: string;
	
@IsOptional()
	expandText?: string;

@IsNotEmpty()
	id_question: string;
	
@IsNotEmpty()
	obligatory: boolean;
}
