import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dtos";

@Injectable()
export class UserService {
	constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
	) {}
	async findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async create(createUserDto: CreateUserDto) {
		return this.userRepository.save(createUserDto);
	}
}
