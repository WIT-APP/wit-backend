import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import * as bcrypt from "bcrypt";

describe("UserService", () => {
	let service: UserService;
	const mockUserRepository = {
		save: jest.fn(),
		find: jest.fn(),
		findOne: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService,
				{
					provide: getRepositoryToken(User),
					useValue: mockUserRepository
				}],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
	describe("findAll", () => {
		it("should return all users", async () => {
			const mockUsers = [{ name: "User1" }, { name: "User2" }];
			mockUserRepository.find.mockResolvedValue(mockUsers);
	
			const result = await service.findAll();
	
			expect(result).toEqual(mockUsers);
			expect(mockUserRepository.find).toHaveBeenCalled();
		});
	});
	
	describe("create", () => {
		it("should create a user", async () => {
			const createUserDto = {
				name: "Test User",
				email: "test@example.com",
				password: "password123",
			};
			const hashedPassword = "hashedPassword";
	
			jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt");
			jest.spyOn(bcrypt, "hash").mockResolvedValue(hashedPassword);
	
			mockUserRepository.save.mockResolvedValue(createUserDto);
	
			const result = await service.create(createUserDto);
	
			expect(result).toEqual(createUserDto);
	
			expect(bcrypt.genSalt).toHaveBeenCalledWith();
			expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, "salt");
	
			const expectedUser = { ...createUserDto, password: hashedPassword };
			expect(mockUserRepository.save).toHaveBeenCalledWith(expectedUser);
		});
	});
	
	describe("findOneByEmail", () => {
		it("should find a user by email", async () => {
			const userEmail = "test@example.com";
			const mockUser = { name: "Test User", email: userEmail };
	
			mockUserRepository.findOne.mockResolvedValue(mockUser);
	
			const result = await service.findOneByEmail(userEmail);
	
			expect(result).toEqual(mockUser);
			expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email: userEmail } });
		});
	});
});


