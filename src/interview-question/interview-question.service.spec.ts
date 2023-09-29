import { Test, TestingModule } from "@nestjs/testing";
import { InterviewQuestionService } from "./interview-question.service";
import { CreateInterviewQuestionDto } from "./dto/create-interview-question.dto";
import { getRepositoryToken } from "@nestjs/typeorm";
import { InterviewQuestion } from "./entities/interview-question.entity";

describe("InterviewQuestionService", () => {
	let service: InterviewQuestionService;
	
	const mockQuestionInterviewRepository = {
		create: jest.fn(),
		findOne: jest.fn(),
		save: jest.fn(),
		find: jest.fn(),
	};

	const createInterviewQuestionDto: CreateInterviewQuestionDto = {
		text: "",
		type: "",
		category: "",
		options: [],
		placeholder: null,
		expandText: "",
		id_question: "",
		obligatory: true
	};
  
	const createdQuestion = {
		id:1,
		text: "Question 1",
		type: "text",
		category: "Academica",
		options: ["Option 1", "Option 2"],
		placeholder: null,
		expandText: "Lorem ipsum dolor sit am",
		id_question: "Question 1",
		obligatory: true
	};

	const questions = [{
		text: "Question 1",
		type: "text",
		category: "Phython",
		options: ["Option 1", "Option 2"],
		placeholder: null,
		expandText: "Lorem ipsum dolor sit am",
		id_question: "Question 1",
		obligatory: true
	}
	];

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [InterviewQuestionService,
				{
					provide: getRepositoryToken(InterviewQuestion),
					useValue: mockQuestionInterviewRepository,
				}],
		}).compile();

		service = module.get<InterviewQuestionService>(InterviewQuestionService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
	describe("create", () => {
		it("should create an applicant", async () => {
			mockQuestionInterviewRepository.save.mockResolvedValue(createdQuestion);

			const result = await service.create(createInterviewQuestionDto);

			expect(result).toBe(createdQuestion);
		});
	});
	describe("findAll", () => {
		it("should return a list of applicants", async () => {
			mockQuestionInterviewRepository.find.mockResolvedValue(questions);

			const result = await service.findAll();

			expect(result).toBe(questions);
		});
	});
	describe("findByCategory", () => {
		it("should get questions by their category", async () => {
			const category = "Phython";
      
			mockQuestionInterviewRepository.find.mockResolvedValue(questions);

			const result = await service.findByCategory(category);

			expect(result).toEqual(questions);
			expect(mockQuestionInterviewRepository.find).toHaveBeenCalledWith({
				where: { category },
			});
		});
	});
	describe("findByCategory", () => {
		it("should get questions by their category", async () => {
			const id = 1;
      
			mockQuestionInterviewRepository.findOne.mockResolvedValue(createdQuestion);

			const result = await service.findOne(id);

			expect(result).toEqual(createdQuestion);

		});
	});
});

