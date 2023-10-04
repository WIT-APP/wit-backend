import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";


async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		// origin: [
		// 	"https://wit-frontend-1v1pqlfbf-wit-app.vercel.app",
		// 	"https://wit-frontend-git-main-wit-app.vercel.app",
		// 	"https://wit-frontend-green.vercel.app",
		// 	"https://wit-frontend-1v1pqlfbf-wit-app.vercel.app/newapplicant/register",
		// 	"https://wit-frontend-git-main-wit-app.vercel.app7newapplicant/register",
		// 	"https://wit-frontend-green.vercel.app/newapplicant/register",
		// ],
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
		allowedHeaders: "Content-Type,Authorization",
	});

	const config =new DocumentBuilder()
		.setTitle("Work in Tech API")
		.setDescription("API para la gestion de BECAS Google")
		.setVersion("1.0")
		.addBearerAuth()
		.addTag("aplicantes")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
	
	await app.listen(process.env.PORT || 3000);
}
bootstrap();


