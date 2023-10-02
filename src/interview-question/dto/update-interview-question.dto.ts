import { PartialType } from "@nestjs/mapped-types";
import { CreateInterviewQuestionDto } from "./create-interview-question.dto";

export class UpdateInterviewQuestionDto extends PartialType(CreateInterviewQuestionDto) {
	text?: string;
	type?: string;
	options?: string[];
	category?: string;
	placeholder?: string;
	expandText?: string;
	id_question?: string;
	obligatory?: boolean;
}
