import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { HttpExceptionFilter } from "./exception-filters/http-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		allowedHeaders: ["content-type"],
		origin: [
			process.env.FRONTEND_URL,
			"http://localhost:3000",
			"http://localhost:5173",
		],
		credentials: true,
	});
	await app.listen(process.env.PORT || 3000);
}
bootstrap();
