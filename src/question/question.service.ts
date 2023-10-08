/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { Question } from "./entities/question.entity";
import { DeepPartial, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeCategory, TypeField } from "./entities/question.enum";

@Injectable()
export class QuestionService {

	constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>
	) {}

	async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
		const {text, type, category, options, placeholder, expandText, id_question, obligatory} = createQuestionDto;

		const question = new Question();
		question.text = text;
		question.type = type as TypeField;
		question.options = options || [];
		question.category = category as TypeCategory;
		question.placeholder = placeholder || "";
		question.expandText = expandText || "";
		question.id_question = id_question;
		question.obligatory = obligatory;

		return this.questionRepository.save(question);
	}

	async findByCategory(category: TypeCategory): Promise<Question[]> {
		return this.questionRepository.find({ where: { category } });
	}

	async findAll() {
		return await this.questionRepository.find();
	}

}
