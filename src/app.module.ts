import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import databaseConfig from "./config/database.config";
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { UserModule } from './user/user.module';
import { ApplicantModule } from './applicant/applicant.module';
>>>>>>> database
=======
>>>>>>> 444a4852154455e1c2ae916c46ba06d2cc5f0cd1

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
<<<<<<< HEAD
	  }),],
=======
	  }),
	  UserModule,
	  ApplicantModule,],
>>>>>>> database
=======
	  }),],
>>>>>>> 444a4852154455e1c2ae916c46ba06d2cc5f0cd1
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
