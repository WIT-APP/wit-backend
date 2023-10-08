import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { UnauthorizedException } from "@nestjs/common";

describe("AuthService", () => {
	let service: AuthService;

	const mockJwtService = {
		signAsync: jest.fn(),
	};

	const mockUserService = {
		findOneByEmail: jest.fn(),
	};  

	class MockUser {
		validatePassword: jest.Mock;
	}
  
	const mockUser = new MockUser();
	mockUser.validatePassword = jest.fn();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService,
				{
					provide: JwtService,
					useValue: mockJwtService,
				},
				{
				
					provide: UserService,
					useValue: mockUserService,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
	describe("signIn", () => {
		it("should throw UnauthorizedException for incorrect credentials", async () => {
			mockUserService.findOneByEmail.mockResolvedValue(null);
			await expect(service.signIn("test@example.com", "wrongpassword")).rejects.toThrowError(
				UnauthorizedException,
			);
		});
	
		it("should return an access token for correct credentials", async () => {
			const email = "test@example.com";
			const password = "password123";
	
			mockUserService.findOneByEmail.mockResolvedValue(mockUser);
	
			mockUser.validatePassword.mockResolvedValue(true);
	
			mockJwtService.signAsync.mockReturnValue("mockAccessToken");
	
			const result = await service.signIn(email, password);
	
			expect(result.access_token).toBe("mockAccessToken");
		});
	});
});

