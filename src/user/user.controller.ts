import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dtos";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("user")
@Controller("user")
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}
}
