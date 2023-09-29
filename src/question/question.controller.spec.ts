import { Test, TestingModule } from "@nestjs/testing";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { TypeCategory } from "./entities/question.enum";

describe("QuestionController", () => {
	let controller: QuestionController;

	const mockQuestionService = {
		create: jest.fn(),
		findByCategory: jest.fn(),
		findAll: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	};

	const createQuestionDto: CreateQuestionDto = {
		text: "",
		type: "",
		category: "",
		options: [],
		placeholder: null,
		expandText: "",
		id_question: "",
		obligatory: true,
	};

	const createdQuestion = {
		text: "Question 1",
		type: "text",
		category: "Academica",
		options: ["Option 1", "Option 2"],
		placeholder: null,
		expandText: "Lorem ipsum dolor sit am",
		id_question: "Question 1",
		obligatory: true,
	};

	const questions = [
		{
			text: "Question 1",
			type: "text",
			category: "Personal",
			options: ["Option 1", "Option 2"],
			placeholder: null,
			expandText: "Lorem ipsum dolor sit am",
			id_question: "Question 1",
			obligatory: true,
		},
	];

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [QuestionController],
			providers: [QuestionService],
		})
			.overrideProvider(QuestionService)
			.useValue(mockQuestionService)
			.compile();

		controller = module.get<QuestionController>(QuestionController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	describe("create", () => {
		it("should create an applicant", async () => {
			mockQuestionService.create.mockResolvedValue(createdQuestion);

			const result = await controller.create(createQuestionDto);

			expect(result).toBe(createdQuestion);
			expect(mockQuestionService.create).toHaveBeenCalledWith(createdQuestion);
		});
	});
	describe("findAll", () => {
		it("should return a list of applicants", async () => {
			mockQuestionService.findAll.mockResolvedValue(questions);

			const result = await controller.findAll();
			expect(result).toBe(questions);
			expect(mockQuestionService.findAll).toHaveBeenCalled();
		});
	});
	describe("findByCategory", () => {
		it("should call findByCategory and return the correct question with the provided category", async () => {
			const category = TypeCategory.Personal;

			const expectedQuestion = questions[0];

			mockQuestionService.findByCategory.mockResolvedValue(expectedQuestion);

			const result = await controller.findByCategory(category);

			expect(result).toEqual(expectedQuestion);
			expect(mockQuestionService.findByCategory).toHaveBeenCalledWith(category);
		});
	});
});
