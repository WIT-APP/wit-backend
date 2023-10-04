import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "src/user/dto/create-user.dtos";
import { SignInDto } from "./dto/sign-in.dto";
import { Public } from "./public.decorator";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService,
	private readonly userService: UserService,
	) { }
	
	@Public()
	@Post("sign-up")
	async signUp(@Body() createUserDto: CreateUserDto) {
		const { name, email, password } = createUserDto;
		return this.userService.create({ name, email, password });
	}
	
	@Public()
	@Post("login")
	signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto.email, signInDto.password);
	}

}
