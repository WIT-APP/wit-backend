import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dtos";
import {ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("user")
@ApiBearerAuth()
@Controller("user")
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@ApiCreatedResponse({ description: "The record has been successfully created."})
	@ApiForbiddenResponse({ description: "Forbidden."})
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}
}
