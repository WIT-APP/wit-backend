import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./exception-filters/http-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new HttpExceptionFilter());
	app.enableCors({
		origin: "https://wit-frontend-1v1pqlfbf-wit-app.vercel.app",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		allowedHeaders: "Content-Type,Authorization",
	});
	await app.listen(process.env.PORT || 3000);
}
bootstrap();

