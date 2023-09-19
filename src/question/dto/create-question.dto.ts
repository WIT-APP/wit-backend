import { IsNotEmpty } from "@nestjs/class-validator";

export class CreateQuestionDto {
    
    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    type: string;
   
    @IsNotEmpty()
    category: string;

    options?: string[];

    placeholder?: string;
    
    expandText?: string;

    id_question: string;
    
    @IsNotEmpty()
    obligatory: boolean;
}
