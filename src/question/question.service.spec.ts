import { Test, TestingModule } from "@nestjs/testing";
import { QuestionService } from "./question.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Question } from "./entities/question.entity";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { TypeCategory } from "./entities/question.enum";

describe("QuestionService", () => {
	let service: QuestionService;

	const mockQuestionRepository = {
		save: jest.fn(),
		find: jest.fn(),
		findOne: jest.fn(),
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
			providers: [
				QuestionService,
				{
					provide: getRepositoryToken(Question),
					useValue: mockQuestionRepository,
				},
			],
		}).compile();

		service = module.get<QuestionService>(QuestionService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("create", () => {
		it("should create the form questions", async () => {
			mockQuestionRepository.save.mockResolvedValue(createdQuestion);

			const result = await service.create(createQuestionDto);

			expect(result).toBe(createdQuestion);
		});
	});
	describe("findAll", () => {
		it("should return all the form questions", async () => {
			mockQuestionRepository.find.mockResolvedValue(questions);

			const result = await service.findAll();

			expect(result).toBe(questions);
		});
	});
	describe("findByCategory", () => {
		it("should get the form questions by their category", async () => {
			const category = TypeCategory.Personal;
      
			mockQuestionRepository.find.mockResolvedValue(questions);

			const result = await service.findByCategory(category);

			expect(result).toEqual(questions);
			expect(mockQuestionRepository.find).toHaveBeenCalledWith({
				where: { category },
			});
		});
	});
});
