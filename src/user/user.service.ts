import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dtos";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
	constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
	) {}
	async findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const {name, email, password } = createUserDto;
	
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
	
		const user = new User();
		user.name = name;
		user.email = email;
		user.password = hashedPassword;
	
		return this.userRepository.save(user);
	}

	async findOneByEmail(email: string): Promise<User> {

		const user = await this.userRepository.findOne({
			where: { email },
		});
		return user;
	}
}


