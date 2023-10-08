/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { TypeCategory } from "./entities/question.enum";
import {ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags} from "@nestjs/swagger";
import { Public } from "../auth/public.decorator";


@ApiTags("register-question")
@ApiBearerAuth()
@Controller("question")
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@Post()
	@ApiCreatedResponse({ description: "The record has been successfully created."})
	@ApiForbiddenResponse({ description: "Forbidden."})
	async create(@Body() createQuestionDto: CreateQuestionDto) {
		return await this.questionService.create(createQuestionDto);
	}
	
	@Public()
	@Get()
	findByCategory(@Query("category") category: TypeCategory) {
		return this.questionService.findByCategory(category);
	}

	@Get()
	findAll() {
		return this.questionService.findAll();
	}

}
