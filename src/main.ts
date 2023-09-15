import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
	app.enableCors({
		origin: 'http://localhost:5173',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true, 
	  });
=======
>>>>>>> 444a4852154455e1c2ae916c46ba06d2cc5f0cd1
	await app.listen(3000);
}
bootstrap();
