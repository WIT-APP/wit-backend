import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import databaseConfig from "./config/database.config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
	imports: [ConfigModule.forRoot({
		isGlobal: true,
		load: [databaseConfig],
	  }),
	  TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => configService.get('db'),
	  }),
	  UserModule,],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
