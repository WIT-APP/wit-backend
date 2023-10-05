/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { TypeCategory } from "./entities/question.enum";
import {ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags} from "@nestjs/swagger";
import { Public } from "src/auth/public.decorator";


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

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.questionService.findOne(+id);
	}

 

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
		return this.questionService.update(+id, updateQuestionDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.questionService.remove(+id);
	}
}
