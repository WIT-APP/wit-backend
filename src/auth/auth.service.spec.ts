import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";

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
			providers: [AuthService],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
