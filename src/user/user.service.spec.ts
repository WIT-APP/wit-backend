import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";

describe("UserService", () => {
	let service: UserService;
	const mockUserRepository = {
		save: jest.fn(),
		find: jest.fn(),
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

});
