import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import databaseConfig from "./config/database.config";
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
=======
import { UserModule } from './user/user.module';
import { ApplicantModule } from './applicant/applicant.module';
>>>>>>> database

@Module({
	imports: [ConfigModule.forRoot({
		isGlobal: true,
		load: [databaseConfig],
	  }),
	  TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => configService.get('db'),
<<<<<<< HEAD
	  }),],
=======
	  }),
	  UserModule,
	  ApplicantModule,],
>>>>>>> database
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
