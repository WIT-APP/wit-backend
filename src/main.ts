import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

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
	await app.listen(process.env.PORT || 3000);
}
bootstrap();
