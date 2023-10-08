import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dtos";
import { SignInDto } from "./dto/sign-in.dto";

describe("AuthController", () => {
	let controller: AuthController;
	
	const mockAuthService = {
		signIn: jest.fn(),
	};

	const mockUserService = {
		create: jest.fn(),
	};
	

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [{
				provide: AuthService,
				useValue: mockAuthService,
			},
			{
				provide: UserService,
				useValue: mockUserService,
			}],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("should create a new user calling the user service", async () => {
		const user = new CreateUserDto();
		user.email = "new@mail.com";
		user.password = "1234";
		user.name = "John Smith";

		const expectedUser = {
			email: "new@mail.com",
			password: "1234",
			name: "John Smith",
		};
		mockUserService.create.mockReturnValue(expectedUser);

		const result = await controller.signUp(user);

		expect(mockUserService.create).toBeCalledWith(user);
		expect(result).toEqual(expectedUser);
	});

	it("should sign in a user calling the auth service", async () => {
		const user = new SignInDto();
		user.email = "new@mail.com";
		user.password = "1234";

		controller.signIn(user);
		expect(mockAuthService.signIn).toBeCalledWith(user.email, user.password);
	});
});


