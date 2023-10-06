import { Injectable } from "@nestjs/common";
import { CreateInterviewQuestionDto } from "./dto/create-interview-question.dto";
import { Repository } from "typeorm";
import { InterviewQuestion } from "./entities/interview-question.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class InterviewQuestionService {
	constructor(
    @InjectRepository(InterviewQuestion)
    private interviewQuestionRepository: Repository<InterviewQuestion>,
	) {}

	async create(
		createInterviewQuestionDto: CreateInterviewQuestionDto,
	): Promise<InterviewQuestion> {
		const {
			text,
			type,
			category,
			options,
			placeholder,
			expandText,
			id_question,
			obligatory,
		} = createInterviewQuestionDto;

		const question = new InterviewQuestion();
		question.text = text;
		question.type = type;
		question.options = options || [];
		question.category = category;
		question.placeholder = placeholder || "";
		question.expandText = expandText || "";
		question.id_question = id_question;
		question.obligatory = obligatory;

		return await this.interviewQuestionRepository.save(question);
	}

	async findByCategory(category: string): Promise<InterviewQuestion[]> {
		return await this.interviewQuestionRepository.find({ where: { category } });
	}

	async findAll(): Promise<InterviewQuestion[]> {
		return await this.interviewQuestionRepository.find();
	}

	async findOne(id: number): Promise<InterviewQuestion> {
		return await this.interviewQuestionRepository.findOne({
			where: { id },
		});
	}

}
