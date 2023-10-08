import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";
import { InterviewQuestionService } from "./interview-question.service";
import { CreateInterviewQuestionDto } from "./dto/create-interview-question.dto";
import {ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("interview-question")
@ApiBearerAuth()
@Controller("interview-question")
export class InterviewQuestionController {
	constructor(private readonly interviewQuestionService: InterviewQuestionService) {}

	@ApiCreatedResponse({ description: "The record has been successfully created."})
	@ApiForbiddenResponse({ description: "Forbidden."})
	@Post()
	create(@Body() createInterviewQuestionDto: CreateInterviewQuestionDto) {
		return this.interviewQuestionService.create(createInterviewQuestionDto);
	}

	@Get()
	findAll() {
		return this.interviewQuestionService.findAll();
	}

	@Get()
	findByCategory(@Query("category") category: string) {
		return this.interviewQuestionService.findByCategory(category);
	}

	@Get(":id")
	findOne(@Param("id") id: number) {
		return this.interviewQuestionService.findOne(id);
	}
}
