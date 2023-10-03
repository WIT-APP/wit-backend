import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./exception-filters/http-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new HttpExceptionFilter());
	app.enableCors({
		origin: "*",
	});
	await app.listen(process.env.PORT || 3000);
}
bootstrap();

