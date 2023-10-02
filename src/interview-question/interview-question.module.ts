import { Module } from "@nestjs/common";
import { InterviewQuestionService } from "./interview-question.service";
import { InterviewQuestionController } from "./interview-question.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InterviewQuestion } from "./entities/interview-question.entity";

@Module({
	imports: [TypeOrmModule.forFeature([InterviewQuestion])],
	controllers: [InterviewQuestionController],
	providers: [InterviewQuestionService],
})
export class InterviewQuestionModule {}
