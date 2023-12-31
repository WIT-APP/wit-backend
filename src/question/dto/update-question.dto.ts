import { PartialType } from "@nestjs/mapped-types";
import { CreateQuestionDto } from "./create-question.dto";

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
	text?: string;
	type?: string;
	options?: string[];
	category?: string;
	placeholder?: string;
	expandText?: string;
	id_question?: string;
	obligatory?: boolean;
}
