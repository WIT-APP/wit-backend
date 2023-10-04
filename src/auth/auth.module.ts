import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./jwt.constants";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";

@Module({imports: [
	UserModule,
	JwtModule.register({
		global: true,
		secret: jwtConstants.secret,
		signOptions: { expiresIn: "24h" },
	}),
],
providers: [AuthService,
	{
		provide: APP_GUARD,
		useClass: AuthGuard,
	},
],
exports: [AuthService],
controllers: [AuthController],
})
export class AuthModule {}
