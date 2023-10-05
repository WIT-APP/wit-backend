import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
	constructor(
        private userService: UserService,
        private jwtService: JwtService
	) { }
    
    
	async signIn(email, pass) {
		const user = await this.userService.findOneByEmail(email);
		/* 	if (user?.password !== pass) {
			throw new UnauthorizedException();
        } */
		if (!user || !(await user.validatePassword(pass))) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const payload = { sub: user.id, email: user.email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
