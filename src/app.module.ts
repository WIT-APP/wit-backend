import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import databaseConfig from "./config/database.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { ApplicantModule } from "./applicant/applicant.module";
import { QuestionModule } from "./question/question.module";
import { InterviewModule } from "./interview/interview.module";
import { InterviewQuestionModule } from "./interview-question/interview-question.module";
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => configService.get("db"),
		}),
		UserModule,
		ApplicantModule,
		QuestionModule,
		InterviewModule,
		InterviewQuestionModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
