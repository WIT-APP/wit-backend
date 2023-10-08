import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("UserController", () => {
	let controller: UserController;
	const mockUserService = {
		findAll: jest.fn(),
		create: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [UserService],
		}).overrideProvider(UserService).useValue(mockUserService).compile();

		controller = module.get<UserController>(UserController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	describe("findAll", () => {
		it("should return all users", async () => {
			const mockUsers = [{ name: "User1" }, { name: "User2" }];
			mockUserService.findAll.mockResolvedValue(mockUsers);
	
			const result = await controller.findAll();
	
			expect(result).toEqual(mockUsers);
			expect(mockUserService.findAll).toHaveBeenCalled();
		});
	});
	
	describe("create", () => {
		it("should create a user", async () => {
			const createUserDto = {
				name: "Test User",
				email: "test@example.com",
				password: "password123",
			};
			const createdUser = { ...createUserDto, id: "123" };
			mockUserService.create.mockResolvedValue(createdUser);
	
			const result = await controller.create(createUserDto);
	
			expect(result).toEqual(createdUser);
			expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
		});
	});
});

