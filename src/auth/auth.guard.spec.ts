/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from "@nestjs/testing";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
	let guard: AuthGuard;

	const jwtServiceMock = {
		verifyAsync: jest.fn(),
	};
      
	const reflectorMock = {
		getAllAndOverride: jest.fn(),
	};

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				AuthGuard,
				{
					provide: JwtService,
					useValue: jwtServiceMock,
				},
			]
		}).compile();
  
		guard = moduleRef.get<AuthGuard>(AuthGuard);
	});
	describe("canActivate", () => {
		it("should return true for a public route", async () => {
			// Mock a public route
			reflectorMock.getAllAndOverride.mockReturnValue(true);
    
			const mockExecutionContext = {
				switchToHttp: jest.fn().mockReturnThis(),
				getHandler: jest.fn().mockReturnValue({}),
				getClass: jest.fn().mockReturnValue({}),
				getRequest: jest.fn().mockReturnValue({
					headers: { authorization: "Bearer some-token" },
				}),
			};
    
			const result = await guard.canActivate(mockExecutionContext as any);
    
			expect(result).toBe(true);
		});
    
		it("should throw an UnauthorizedException for missing token", async () => {
			// Mock a non-public route
			reflectorMock.getAllAndOverride.mockReturnValue(false);
    
			const mockExecutionContext = {
				switchToHttp: jest.fn().mockReturnThis(),
				getHandler: jest.fn().mockReturnValue({}),
				getClass: jest.fn().mockReturnValue({}),
				getRequest: jest.fn().mockReturnValue({
					headers: {},
				}),
			};
    
			await expect(guard.canActivate(mockExecutionContext as any)).rejects.toThrow(UnauthorizedException);
		});
	});
});
