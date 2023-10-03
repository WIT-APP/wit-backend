import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { HttpExceptionFilter } from "./exception-filters/http-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: [
			"https://wit-frontend-1v1pqlfbf-wit-app.vercel.app",
			"https://wit-frontend-git-main-wit-app.vercel.app",
			"https://wit-frontend-green.vercel.app",
			// Agrega aquí todas las URL que deseas permitir
		],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true, // Si necesitas admitir credenciales
		allowedHeaders: "Content-Type,Authorization",
	});
	await app.listen(process.env.PORT || 3000);
}
bootstrap();
