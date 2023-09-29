import { Test, TestingModule } from "@nestjs/testing";
import { InterviewQuestionController } from "./interview-question.controller";
import { InterviewQuestionService } from "./interview-question.service";
import { CreateInterviewQuestionDto } from "./dto/create-interview-question.dto";

describe("InterviewQuestionController", () => {
	let controller: InterviewQuestionController;

	const mockInterviewQuestionService = {
		create: jest.fn(),
		findByCategory: jest.fn(),
		findAll: jest.fn(),
		findOne: jest.fn(),
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
			controllers: [InterviewQuestionController],
			providers: [InterviewQuestionService,
				{
					provide: InterviewQuestionService,
					useValue: mockInterviewQuestionService
				}],
		}).compile();

		controller = module.get<InterviewQuestionController>(InterviewQuestionController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
   
	});
	describe("create", () => {
		it("should create an applicant", async () => {

			mockInterviewQuestionService.create.mockResolvedValue(createdQuestion);

			const result = await controller.create(createInterviewQuestionDto);

			expect(result).toBe(createdQuestion);
			expect(mockInterviewQuestionService.create).toHaveBeenCalledWith(createdQuestion);
		});
   
	});
	describe("findAll", () => {
		it("should return a list of applicants", async () => {
      
			mockInterviewQuestionService.findAll.mockResolvedValue(questions);

			const result = await controller.findAll();
			expect(result).toBe(questions);
			expect(mockInterviewQuestionService.findAll).toHaveBeenCalled();
		});
	});
	describe("findByCategory", () => {
  
		it("should call findByCategory and return the correct question with the provided category", async () => {
			const category = "Phython";
      
			const expectedQuestion = questions[0];
    
			mockInterviewQuestionService.findByCategory.mockResolvedValue(expectedQuestion);
    
			const result = await controller.findByCategory(category);
    
			expect(result).toEqual(expectedQuestion);
			expect(mockInterviewQuestionService.findByCategory).toHaveBeenCalledWith(category);
		});
	});
    
	describe("findOneById", () => {
		it("should return a single applicant by ID", async () => {
			const id = 1;
			mockInterviewQuestionService.findOne.mockResolvedValue(createdQuestion);

			const result = await controller.findOne(id);

			expect(result).toBe(createdQuestion);
			expect(mockInterviewQuestionService.findOne).toHaveBeenCalledWith(id);
		});
	});
});
