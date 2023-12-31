/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from "@nestjs/testing";
import { ApplicantService } from "./applicant.service";
import { Applicant } from "./entities/applicant.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateApplicantDto } from "./dto/create-applicant.dto";
import {
	TipoGenero,
	TipoId,
	TipoProgramaDeseado,
	TipoEducacion,
	TipoSituacionProfesional,
	TipoInteresesActuales,
	TipoAccessoInternetDispositivos,
	TipoEncontrarPrograma,
} from "./entities/applicant.enums";
import {
	BadRequestException,
	HttpException,
	HttpStatus,
	NotFoundException,
} from "@nestjs/common";
import { UpdateApplicantDto } from "./dto/update-applicant.dto";

describe("ApplicantService", () => {
	let service: ApplicantService;

	const mockApplicantRepository = {
		save: jest.fn(),
		find: jest.fn(),
		findOne: jest.fn(),
		query: jest.fn(),
		createQueryBuilder: jest.fn(() => ({
			select: jest.fn().mockReturnThis(),
			addSelect: jest.fn().mockReturnThis(),
			innerJoin: jest.fn().mockReturnThis(),
			groupBy: jest.fn().mockReturnThis(),
			orderBy: jest.fn().mockReturnThis(),
			getRawMany: jest.fn().mockResolvedValue([]),
		})),
	};
	const createApplicantDto: CreateApplicantDto = {
		nombre: "John",
		apellidos: "Smith",
		correo_electronico: "john@example.com",
		telefono: "64829471",
		genero: TipoGenero.Hombre,
		fecha_de_nacimiento: new Date(2000, 12, 16),
		pais_de_nacimiento: "France",
		documento_de_identidad: TipoId.DNI,
		numero_documento_id: "Y2939789",
		direccion: "c/Barcelona 1234",
		ciudad: "Barcelona",
		provincia: "Barcelona",
		codigo_postal: "78953",
		pais_de_residencia: "España",
		programa_cursar: TipoProgramaDeseado.ITSupport,
		colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
		educacion: TipoEducacion.SinEstudio,
		situacion_profesional: TipoSituacionProfesional.SinIngresos,
		intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
		dedicacion_semanal: "0",
		acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
		formacion_online: "Si",
		razones_para_unir: "Lorem Ipsum",
		encontrar_programa: TipoEncontrarPrograma.RedesSociales,
		observaciones: ""
	};
	const createdApplicant = {
		id: 1,
		nombre: "John",
		apellidos: "Smith",
		correo_electronico: "john@example.com",
		telefono: "64829471",
		genero: TipoGenero.Hombre,
		fecha_de_nacimiento: new Date(2000, 12, 16),
		pais_de_nacimiento: "France",
		documento_de_identidad: TipoId.DNI,
		numero_documento_id: "Y2939789",
		direccion: "c/Barcelona 1234",
		ciudad: "Barcelona",
		provincia: "Barcelona",
		codigo_postal: "78953",
		pais_de_residencia: "España",
		programa_cursar: TipoProgramaDeseado.ITSupport,
		colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
		educacion: TipoEducacion.SinEstudio,
		situacion_profesional: TipoSituacionProfesional.SinIngresos,
		intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
		dedicacion_semanal: "0",
		acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
		formacion_online: "Si",
		razones_para_unir: "Lorem Ipsum",
		encontrar_programa: TipoEncontrarPrograma.RedesSociales,
		estado: "Aplicante",
		observaciones: ""
	};

	const applicants = [
		{
			id: 1,
			nombre: "John",
			apellidos: "Smith",
			correo_electronico: "john@example.com",
			telefono: "64829471",
			genero: TipoGenero.Hombre,
			fecha_de_nacimiento: new Date(2000, 12, 16),
			pais_de_nacimiento: "France",
			documento_de_identidad: TipoId.DNI,
			numero_documento_id: "Y2939789",
			direccion: "c/Barcelona 1234",
			ciudad: "Barcelona",
			provincia: "Barcelona",
			codigo_postal: "78953",
			pais_de_residencia: "España",
			programa_cursar: TipoProgramaDeseado.ITSupport,
			colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
			educacion: TipoEducacion.SinEstudio,
			situacion_profesional: TipoSituacionProfesional.SinIngresos,
			intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
			dedicacion_semanal: "0",
			acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
			formacion_online: "Si",
			razones_para_unir: "Lorem Ipsum",
			encontrar_programa: TipoEncontrarPrograma.RedesSociales,
			estado: "Aplicante",
			observaciones: ""
		},
		{
			id: 2,
			nombre: "John",
			apellidos: "Smith",
			correo_electronico: "bob@example.com",
			telefono: "64829471",
			genero: TipoGenero.Hombre,
			fecha_de_nacimiento: new Date(2000, 12, 16),
			pais_de_nacimiento: "France",
			documento_de_identidad: TipoId.DNI,
			numero_documento_id: "Y2939789",
			direccion: "c/Barcelona 1234",
			ciudad: "Barcelona",
			provincia: "Barcelona",
			codigo_postal: "78953",
			pais_de_residencia: "España",
			programa_cursar: TipoProgramaDeseado.ITSupport,
			colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
			educacion: TipoEducacion.SinEstudio,
			situacion_profesional: TipoSituacionProfesional.SinIngresos,
			intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
			dedicacion_semanal: "0",
			acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
			formacion_online: "Si",
			razones_para_unir: "Lorem Ipsum",
			encontrar_programa: TipoEncontrarPrograma.RedesSociales,
			estado: "Invitado",
			observaciones: ""
		},
		{
			id: 3,
			nombre: "John",
			apellidos: "Smith",
			correo_electronico: "bob@example.com",
			telefono: "64829471",
			genero: TipoGenero.Hombre,
			fecha_de_nacimiento: new Date(2000, 12, 16),
			pais_de_nacimiento: "France",
			documento_de_identidad: TipoId.DNI,
			numero_documento_id: "Y2939789",
			direccion: "c/Barcelona 1234",
			ciudad: "Barcelona",
			provincia: "Barcelona",
			codigo_postal: "78953",
			pais_de_residencia: "España",
			programa_cursar: TipoProgramaDeseado.ITSupport,
			colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
			educacion: TipoEducacion.SinEstudio,
			situacion_profesional: TipoSituacionProfesional.SinIngresos,
			intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
			dedicacion_semanal: "0",
			acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
			formacion_online: "Si",
			razones_para_unir: "Lorem Ipsum",
			encontrar_programa: TipoEncontrarPrograma.RedesSociales,
			estado: "Rechazado",
			observaciones: ""
		},
		{
			id: 4,
			nombre: "John",
			apellidos: "Smith",
			correo_electronico: "sam@example.com",
			telefono: "64829471",
			genero: TipoGenero.Hombre,
			fecha_de_nacimiento: new Date(2000, 12, 16),
			pais_de_nacimiento: "France",
			documento_de_identidad: TipoId.DNI,
			numero_documento_id: "Y2939789",
			direccion: "c/Barcelona 1234",
			ciudad: "Barcelona",
			provincia: "Barcelona",
			codigo_postal: "78953",
			pais_de_residencia: "USA",
			programa_cursar: TipoProgramaDeseado.ITSupport,
			colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
			educacion: TipoEducacion.SinEstudio,
			situacion_profesional: TipoSituacionProfesional.SinIngresos,
			intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
			dedicacion_semanal: "0",
			acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
			formacion_online: "Si",
			razones_para_unir: "Lorem Ipsum",
			encontrar_programa: TipoEncontrarPrograma.RedesSociales,
			estado: "Matriculado",
			observaciones: ""
		},
	];

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ApplicantService,
				{
					provide: getRepositoryToken(Applicant),
					useValue: mockApplicantRepository,
				},
			],
		}).compile();

		service = module.get<ApplicantService>(ApplicantService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("create", () => {
		it("should create an applicant", async () => {
			mockApplicantRepository.save.mockResolvedValue(createdApplicant);

			const result = await service.create(createApplicantDto);

			expect(result).toBe(createdApplicant);
		});

		it("should throw an error if create fails", async () => {
			mockApplicantRepository.save.mockResolvedValue(null);

			await expect(service.create(createApplicantDto)).rejects.toThrowError(
				BadRequestException,
			);
		});
	});

	describe("findAll", () => {
		it("should return a list of applicants", async () => {
			mockApplicantRepository.find.mockResolvedValue(applicants);

			const result = await service.findAll();

			expect(result).toBe(applicants);
		});

		it("should throw a NotFoundException if find fails", async () => {
			mockApplicantRepository.find.mockResolvedValue(null);

			await expect(service.findAll()).rejects.toThrowError(NotFoundException);
		});
	});

	describe("findOneById", () => {
		it("should return a single applicant", async () => {
			const id = 1;

			mockApplicantRepository.findOne.mockResolvedValue(createdApplicant);

			const result = await service.findOneById(id);

			expect(result).toBe(createdApplicant);
		});

		it("should throw a NotFoundException if applicant is not found", async () => {
			const id = 1;

			mockApplicantRepository.findOne.mockResolvedValue(null);

			try {
				await service.findOneById(id);
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundException);
				expect(error.message).toBe("Aspirante no encontrado");
			}
		});
	});

	describe("findOneByEmail", () => {
		it("should return an applicant if found", async () => {
			const email = "bob@example.com";

			mockApplicantRepository.findOne.mockResolvedValue(createdApplicant);

			const result = await service.findByEmail(email);
			expect(result).toEqual(createdApplicant);
		});

		it("should throw HttpException if applicant not found", async () => {
			const email = "nonexistent@example.com";

			mockApplicantRepository.findOne.mockResolvedValue(null);

			await expect(service.findByEmail(email)).rejects.toThrowError(
				new HttpException(
					"No se encontró candidato con este correo electrónico.",
					HttpStatus.NOT_FOUND,
				),
			);
		});

    
	});
	describe("getDuplicateEmails", () => {
		it("should return duplicate emails", async () => {
			const duplicateEmails = [applicants[1], applicants[2]];

			const mockQueryBuilder = {
				select: jest.fn().mockReturnThis(),
				addSelect: jest.fn().mockReturnThis(),
				innerJoin: jest.fn().mockReturnThis(),
				groupBy: jest.fn().mockReturnThis(),
				orderBy: jest.fn().mockReturnThis(),
				getRawMany: jest.fn().mockResolvedValue(
					applicants.filter((applicant, index) =>
						applicants.some((a, i) => a.correo_electronico === applicant.correo_electronico && i !== index)
					)
				),        };
  
			jest.spyOn(mockApplicantRepository, "createQueryBuilder").mockReturnValue(mockQueryBuilder as any);
      
			const result = await service.getDuplicateEmails();
    
			expect(result).toEqual(duplicateEmails);
			expect(mockQueryBuilder.getRawMany).toHaveBeenCalled();
		});

  
		it("should throw a BadRequest Exception if there is an error", async () => {
			mockApplicantRepository.createQueryBuilder().getRawMany.mockResolvedValue(null);

			await expect(service.getDuplicateEmails()).rejects.toThrowError(BadRequestException,
			);
			expect(mockApplicantRepository.createQueryBuilder().getRawMany).toHaveBeenCalled();
		});
	});

	describe("getUsersPreapproved", () => {
		it("should return pre-approved applicants", async () => {
			const mockResult = [
				{ correo_electronico: "email1@example.com", estado: "Aplicante", pais_de_residencia: "España" },
				{ correo_electronico: "email2@example.com", estado: "Aplicante", pais_de_residencia: "España" },
			];
	
			const mockUpdateQueryResult = { raw: [] }; 
			mockApplicantRepository.query
				.mockReturnValueOnce(mockResult)  
				.mockReturnValueOnce(mockUpdateQueryResult); 

			mockApplicantRepository.query.mockReturnValueOnce([
				{ correo_electronico: "email1@example.com", estado: "Preaprobado", pais_de_residencia: "España" },
				{ correo_electronico: "email2@example.com", estado: "Preaprobado", pais_de_residencia: "España" },
			]);
	
			const result = await service.getUsersPreapproved();
	
			// Verify that the estado is updated to 'Preaprobado' for each applicant
			expect(result).toEqual([
				{ correo_electronico: "email1@example.com", estado: "Preaprobado", pais_de_residencia: "España" },
				{ correo_electronico: "email2@example.com", estado: "Preaprobado", pais_de_residencia: "España" },
			]);
			expect(mockApplicantRepository.query).toHaveBeenCalledTimes(3); // Ensure the correct number of queries is made
		});

		it("should throw a NotFoundException if no preapproved applicants are found", async () => {
			mockApplicantRepository.query.mockReturnValueOnce([]);
 
			await expect(service.getUsersPreapproved()).rejects.toThrow(NotFoundException);
		});
	


		it("should throw an error if there is an error", async () => {
			mockApplicantRepository.query.mockRejectedValueOnce(new Error());

			await expect(service.getUsersPreapproved()).rejects.toThrowError();
		});
	});

	describe("findByEstado", () => {
		it("should find applicants by estado - Invitado", async () => {
			const estado = "Invitado";
			const invitadoApplicants = applicants.filter(
				(applicant) => applicant.estado === estado,
			);

			mockApplicantRepository.find.mockResolvedValue(invitadoApplicants);

			const result = await service.findByEstado(estado);
			expect(result).toEqual(invitadoApplicants);
			expect(mockApplicantRepository.find).toHaveBeenCalledWith({
				where: { estado },
			});
		});

		it("should find applicants by estado - Matriculado", async () => {
			const estado = "Matriculado";
			const MatriculadoApplicants = applicants.filter(
				(applicant) => applicant.estado === estado,
			);

			mockApplicantRepository.find.mockResolvedValue(MatriculadoApplicants);

			const result = await service.findByEstado(estado);
			expect(result).toEqual(MatriculadoApplicants);
			expect(mockApplicantRepository.find).toHaveBeenCalledWith({
				where: { estado },
			});
		});

		it("should find applicants by estado - Rechazado", async () => {
			const estado = "Rechazado";
			const RechazadoApplicants = applicants.filter(
				(applicant) => applicant.estado === estado,
			);

			mockApplicantRepository.find.mockResolvedValue(RechazadoApplicants);

			const result = await service.findByEstado(estado);
			expect(result).toEqual(RechazadoApplicants);
			expect(mockApplicantRepository.find).toHaveBeenCalledWith({
				where: { estado },
			});
		});

		it("should find applicants by estado - Aplicante", async () => {
			const estado = "Aplicante";
			const AplicanteApplicants = applicants.filter(
				(applicant) => applicant.estado === estado,
			);

			mockApplicantRepository.find.mockResolvedValue(AplicanteApplicants);

			const result = await service.findByEstado(estado);
			expect(result).toEqual(AplicanteApplicants);
			expect(mockApplicantRepository.find).toHaveBeenCalledWith({
				where: { estado },
			});
		});

		it("should throw an exception when no applicants are found", async () => {
			const estado = "NonExistentEstado";
			mockApplicantRepository.find.mockResolvedValue([]);

			try {
				await service.findByEstado(estado);
			} catch (error) {
				expect(error).toBeInstanceOf(HttpException);
				expect(error.response).toEqual(
					"No se encontraron personas en este estado.",
				);
				expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
			}
		});
	});

	describe("findByResidence", () => {
		it("should return applicants for the specified residence", async () => {
			const residence = "USA";

			const residenceApplicants = applicants.filter(
				(applicant) => applicant.pais_de_residencia === residence,
			);

			mockApplicantRepository.find.mockResolvedValue(residenceApplicants);

			const result = await service.findByResidence(residence);
			expect(result).toEqual(residenceApplicants);
			expect(mockApplicantRepository.find).toHaveBeenCalledWith({
				where: { pais_de_residencia: residence },
			});
		});

		it("should throw HttpException if no applicants found", async () => {
			const residence = "NonExistentResidence";

			mockApplicantRepository.find.mockResolvedValue([]);

			await expect(service.findByResidence(residence)).rejects.toThrowError(
				new HttpException(
					"No se encontraron aspirantes para el pais de residencia especificado.",
					HttpStatus.NOT_FOUND,
				),
			);
		});
   
	});
    
	describe("updateEstado", () => {
		it("should update an applicant estado", async () => {
			const id = 1;
			const updateApplicantDto: UpdateApplicantDto = {
				estado: "Matriculado",
			};
  
			const existingApplicant: Applicant = {
				id: 1,
				nombre: "Sam",
				apellidos: "Boe",
				correo_electronico: "john@example.com",
				telefono: "44884193",
				genero: TipoGenero.Hombre,
				fecha_de_nacimiento: new Date(2000, 12, 16),
				pais_de_nacimiento: "France",
				documento_de_identidad: TipoId.DNI,
				numero_documento_id: "Y2939789",
				direccion: "c/Barcelona 1234",
				ciudad: "Barcelona",
				provincia: "Barcelona",
				codigo_postal: "78953",
				pais_de_residencia: "España",
				programa_cursar: TipoProgramaDeseado.ITSupport,
				colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
				educacion: TipoEducacion.SinEstudio,
				situacion_profesional: TipoSituacionProfesional.SinIngresos,
				intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
				dedicacion_semanal: "0",
				acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
				formacion_online: "Si",
				razones_para_unir: "Lorem Ipsum",
				encontrar_programa: TipoEncontrarPrograma.RedesSociales,
				estado: "Aplicante",
				fecha_de_applicacion: undefined,
				tipo_documento_identidad: "",
				permiso: "",
				estudio_mas_alto: "",
				mas_informacion: "",
				observaciones: "",
				invitaciones: 0,
				interview_id: 0
			};
      
			const updatedApplicant: Applicant = {
				id,
				...existingApplicant,
				...updateApplicantDto,
			};
			mockApplicantRepository.findOne.mockResolvedValue(existingApplicant);
			mockApplicantRepository.save.mockResolvedValue(updatedApplicant);

			const result = await service.updateApplicant(id, updateApplicantDto);

			expect(result).toEqual(updatedApplicant);
		});
  
		it("should throw NotFoundException if applicant is not found", async () => {
			const id = 1;
			const updateApplicantDto: UpdateApplicantDto = {
				estado: "Matriculado",
			};
  
			mockApplicantRepository.findOne.mockResolvedValue(null);
  
			await expect(service.updateEstado(id, updateApplicantDto)).rejects.toThrow(NotFoundException);
		});
  
		it("should throw on save error", async () => {
			const id = 1;
			const updateApplicantDto: UpdateApplicantDto = {
				estado: "Matriculado",
			};
  
			const mockApplicant = new Applicant();
			mockApplicantRepository.findOne.mockResolvedValue(mockApplicant);
			mockApplicantRepository.save.mockRejectedValue(new Error());
  
			await expect(service.updateEstado(id, updateApplicantDto)).rejects.toThrowError();
		});
	});
	describe("updateApplicant", () => {
		it("should update an applicant", async () => {
			const id = 1;
			const updateApplicantDto: UpdateApplicantDto = {
				nombre: "John",
				apellidos: "Doe",
				telefono: "123456789",
				estado: "Matriculado",
			};

			const existingApplicant: Applicant = {
				id: 1,
				nombre: "Sam",
				apellidos: "Boe",
				correo_electronico: "john@example.com",
				telefono: "44884193",
				genero: TipoGenero.Hombre,
				fecha_de_nacimiento: new Date(2000, 12, 16),
				pais_de_nacimiento: "France",
				documento_de_identidad: TipoId.DNI,
				numero_documento_id: "Y2939789",
				direccion: "c/Barcelona 1234",
				ciudad: "Barcelona",
				provincia: "Barcelona",
				codigo_postal: "78953",
				pais_de_residencia: "España",
				programa_cursar: TipoProgramaDeseado.ITSupport,
				colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
				educacion: TipoEducacion.SinEstudio,
				situacion_profesional: TipoSituacionProfesional.SinIngresos,
				intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
				dedicacion_semanal: "0",
				acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
				formacion_online: "Si",
				razones_para_unir: "Lorem Ipsum",
				encontrar_programa: TipoEncontrarPrograma.RedesSociales,
				estado: "Aplicante",
				fecha_de_applicacion: undefined,
				tipo_documento_identidad: "",
				permiso: "",
				estudio_mas_alto: "",
				mas_informacion: "",
				observaciones: "",
				invitaciones: 0,
				interview_id: 0
			};
      
			const updatedApplicant: Applicant = {
				id,
				...existingApplicant,
				...updateApplicantDto,
			};
			mockApplicantRepository.findOne.mockResolvedValue(existingApplicant);
			mockApplicantRepository.save.mockResolvedValue(updatedApplicant);

			const result = await service.updateApplicant(id, updateApplicantDto);
      
			expect(result).toEqual(updatedApplicant);
		});

		it("should throw NotFoundException if applicant is not found", async () => {
			const id = 1;
			const updateApplicantDto: UpdateApplicantDto = {
				nombre: "John",
				apellidos: "Doe",
				telefono: "123456789",
				estado: "Matriculado",
			};

			mockApplicantRepository.findOne.mockResolvedValue(null);

			await expect(service.updateApplicant(id, updateApplicantDto)).rejects.toThrow(NotFoundException);
		});

		it("should throw InternalServerErrorException on save error", async () => {
			const id = 1;
			const updateApplicantDto: UpdateApplicantDto = {
				nombre: "John",
				apellidos: "Doe",
				telefono: "123456789",
				estado: "Matriculado",
			};
			const updatedApplicant: Applicant = {
				id: 1,
				nombre: "John",
				apellidos: "Doe",
				correo_electronico: "john@example.com",
				telefono: "123456789",
				genero: TipoGenero.Hombre,
				fecha_de_nacimiento: new Date(2000, 12, 16),
				pais_de_nacimiento: "France",
				documento_de_identidad: TipoId.DNI,
				numero_documento_id: "Y2939789",
				direccion: "c/Barcelona 1234",
				ciudad: "Barcelona",
				provincia: "Barcelona",
				codigo_postal: "78953",
				pais_de_residencia: "España",
				programa_cursar: TipoProgramaDeseado.ITSupport,
				colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
				educacion: TipoEducacion.SinEstudio,
				situacion_profesional: TipoSituacionProfesional.SinIngresos,
				intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
				dedicacion_semanal: "0",
				acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
				formacion_online: "Si",
				razones_para_unir: "Lorem Ipsum",
				encontrar_programa: TipoEncontrarPrograma.RedesSociales,
				estado: "Aplicante",
				fecha_de_applicacion: undefined,
				tipo_documento_identidad: "",
				permiso: "",
				estudio_mas_alto: "",
				mas_informacion: "",
				observaciones: "",
				invitaciones: 0,
				interview_id: 0
			};
			mockApplicantRepository.findOne.mockResolvedValue(updatedApplicant);
			mockApplicantRepository.save.mockRejectedValue(new Error());

			await expect(service.updateApplicant(id, updateApplicantDto)).rejects.toThrow(Error);
		});
	});
	describe("getCountByEstado", () => {
		it("should return the count by estado", async () => {
			const mockRawResult = [
				{ estado: "Pending", count: 5 },
				{ estado: "Approved", count: 10 },
			];
	
			mockApplicantRepository.createQueryBuilder().select().addSelect().groupBy().getRawMany.mockResolvedValue(mockRawResult);
	
			const result = await service.getCountByEstado();
	
			expect(result).toEqual([
				{ estado: "Pending", count: 5 },
				{ estado: "Approved", count: 10 },
			]);
		});
	});
	describe("getCountByCurso", () => {
		it("should return the count without estado", async () => {
			const mockRawResult = [
				{ programa_cursar: "Program A", count: 5 },
				{ programa_cursar: "Program B", count: 10 },
			];
	
			mockApplicantRepository.createQueryBuilder().select().addSelect().groupBy().getRawMany.mockResolvedValue(mockRawResult);
	
			const resultWithoutEstado = await service.getCountByCurso();
	
			expect(resultWithoutEstado).toEqual([
				{ programa_cursar: "Program A", count: 5 },
				{ programa_cursar: "Program B", count: 10 },
			]);
		});
	
		it("should return the count with estado", async () => {
			const mockRawResult = [
				{ programa_cursar: "Program A", count: 2 },
				{ programa_cursar: "Program B", count: 5 },
			];
			const mockQueryBuilder = {
				select: jest.fn().mockReturnThis(),
				addSelect: jest.fn().mockReturnThis(),
				innerJoin: jest.fn().mockReturnThis(),
				groupBy: jest.fn().mockReturnThis(),
				orderBy: jest.fn().mockReturnThis(),
				where: jest.fn().mockReturnThis(),
				getRawMany: jest.fn().mockResolvedValue(mockRawResult),
			};
			
			mockApplicantRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
			
			const resultWithEstado = await service.getCountByCurso("SomeEstado");
			
			expect(resultWithEstado).toEqual([
				{ programa_cursar: "Program A", count: 2 },
				{ programa_cursar: "Program B", count: 5 },
			]);
		});
			
	});
});

