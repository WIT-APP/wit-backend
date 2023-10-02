import { Test, TestingModule } from "@nestjs/testing";
import { ApplicantController } from "./applicant.controller";
import { ApplicantService } from "./applicant.service";
import { CreateApplicantDto } from "./dto/create-applicant.dto";
import { TipoAccessoInternetDispositivos, TipoColectivo, TipoEducacion, TipoEncontrarPrograma, TipoGenero, TipoId, TipoInteresesActuales, TipoProgramaDeseado, TipoSituacionProfesional } from "./entities/applicant.enums";
import { Applicant } from "./entities/applicant.entity";
import { UpdateApplicantDto } from "./dto/update-applicant.dto";

describe("ApplicantController", () => {
	let controller: ApplicantController;

	const mockApplicantService = {
		create: jest.fn(),
		findAll: jest.fn(),
		findOneById: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
		findByEstado: jest.fn(),
		findByResidence: jest.fn(),
		findByEmail: jest.fn(),
		getDuplicateEmails: jest.fn(),
		getUsersPreapproved: jest.fn(),
		updateEstado: jest.fn(),
		updateApplicant: jest.fn(),
	};

	const createApplicantDto: CreateApplicantDto = {
		nombre: "John",
		apellidos: "Smith",
		correo_electronico: "john@example.com",
		telefono: 64829471,
		genero: TipoGenero.Hombre,
		fecha_de_nacimiento: new Date(2000, 12, 16),
		pais_de_nacimiento: "France",
		documento_de_identidad: TipoId.DNI,
		numero_documento_id: "Y2939789",
		direccion: "c/Barcelona 1234",
		ciudad: "Barcelona",
		provincia: "Barcelona",
		codigo_postal: 78953,
		pais_de_residencia: "España",
		programa_cursar: TipoProgramaDeseado.ITSupport,
		colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
		educacion: TipoEducacion.SinEstudio,
		situacion_profesional: TipoSituacionProfesional.SinIngresos,
		intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
		dedicacion_semanal: 0,
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
		telefono: 64829471,
		genero: TipoGenero.Hombre,
		fecha_de_nacimiento: new Date(2000, 12, 16),
		pais_de_nacimiento: "France",
		documento_de_identidad: TipoId.DNI,
		numero_documento_id: "Y2939789",
		direccion: "c/Barcelona 1234",
		ciudad: "Barcelona",
		provincia: "Barcelona",
		codigo_postal: 78953,
		pais_de_residencia: "España",
		programa_cursar: TipoProgramaDeseado.ITSupport,
		colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
		educacion: TipoEducacion.SinEstudio,
		situacion_profesional: TipoSituacionProfesional.SinIngresos,
		intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
		dedicacion_semanal: 0,
		acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
		formacion_online: "Si",
		razones_para_unir: "Lorem Ipsum",
		encontrar_programa: TipoEncontrarPrograma.RedesSociales,
		estado: "Aplicante",
		observaciones: ""
	}; 

	const applicants = [{
		id: 1,
		nombre: "John",
		apellidos: "Smith",
		correo_electronico: "john@example.com",
		telefono: 64829471,
		genero: TipoGenero.Hombre,
		fecha_de_nacimiento: new Date(2000, 12, 16),
		pais_de_nacimiento: "France",
		documento_de_identidad: TipoId.DNI,
		numero_documento_id: "Y2939789",
		direccion: "c/Barcelona 1234",
		ciudad: "Barcelona",
		provincia: "Barcelona",
		codigo_postal: 78953,
		pais_de_residencia: "España",
		programa_cursar: TipoProgramaDeseado.ITSupport,
		colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
		educacion: TipoEducacion.SinEstudio,
		situacion_profesional: TipoSituacionProfesional.SinIngresos,
		intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
		dedicacion_semanal: 0,
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
		telefono: 64829471,
		genero: TipoGenero.Hombre,
		fecha_de_nacimiento: new Date(2000, 12, 16),
		pais_de_nacimiento: "France",
		documento_de_identidad: TipoId.DNI,
		numero_documento_id: "Y2939789",
		direccion: "c/Barcelona 1234",
		ciudad: "Barcelona",
		provincia: "Barcelona",
		codigo_postal: 78953,
		pais_de_residencia: "España",
		programa_cursar: TipoProgramaDeseado.ITSupport,
		colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
		educacion: TipoEducacion.SinEstudio,
		situacion_profesional: TipoSituacionProfesional.SinIngresos,
		intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
		dedicacion_semanal: 0,
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
		telefono: 64829471,
		genero: TipoGenero.Hombre,
		fecha_de_nacimiento: new Date(2000, 12, 16),
		pais_de_nacimiento: "France",
		documento_de_identidad: TipoId.DNI,
		numero_documento_id: "Y2939789",
		direccion: "c/Barcelona 1234",
		ciudad: "Barcelona",
		provincia: "Barcelona",
		codigo_postal: 78953,
		pais_de_residencia: "España",
		programa_cursar: TipoProgramaDeseado.ITSupport,
		colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
		educacion: TipoEducacion.SinEstudio,
		situacion_profesional: TipoSituacionProfesional.SinIngresos,
		intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
		dedicacion_semanal: 0,
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
		telefono: 64829471,
		genero: TipoGenero.Hombre,
		fecha_de_nacimiento: new Date(2000, 12, 16),
		pais_de_nacimiento: "France",
		documento_de_identidad: TipoId.DNI,
		numero_documento_id: "Y2939789",
		direccion: "c/Barcelona 1234",
		ciudad: "Barcelona",
		provincia: "Barcelona",
		codigo_postal: 78953,
		pais_de_residencia: "USA",
		programa_cursar: TipoProgramaDeseado.ITSupport,
		colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
		educacion: TipoEducacion.SinEstudio,
		situacion_profesional: TipoSituacionProfesional.SinIngresos,
		intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
		dedicacion_semanal: 0,
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
			controllers: [ApplicantController],
			providers: [ApplicantService],
		}).overrideProvider(ApplicantService).useValue(mockApplicantService).compile();

		controller = module.get<ApplicantController>(ApplicantController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	describe("create", () => {
		it("should create an applicant", async () => {

			mockApplicantService.create.mockResolvedValue(createdApplicant);

			const result = await controller.create(createApplicantDto);

			expect(result).toBe(createdApplicant);
			expect(mockApplicantService.create).toHaveBeenCalledWith(createApplicantDto);
		});
	});

	describe("findAll", () => {
		it("should return a list of applicants", async () => {
      
			mockApplicantService.findAll.mockResolvedValue(applicants);

			const result = await controller.findAll();
			//console.log(result);
			expect(result).toBe(applicants);
			expect(mockApplicantService.findAll).toHaveBeenCalled();
		});
	});

	describe("findOneById", () => {
		it("should return a single applicant by ID", async () => {
			const id = 1; 
			mockApplicantService.findOneById.mockResolvedValue(createdApplicant);

			const result = await controller.findOne(id);

			expect(result).toBe(createdApplicant);
			expect(mockApplicantService.findOneById).toHaveBeenCalledWith(id); 
		});
	});

	
	describe("findOneByEmail", () => {
		it("should return a single applicant by email", async () => {
			const email = "bob@example.com"; 
			mockApplicantService.findByEmail.mockResolvedValue(createdApplicant);

			const result = await controller.findOneByEmail(email);

			expect(result).toBe(createdApplicant);
			expect(mockApplicantService.findByEmail).toHaveBeenCalledWith(email); 
		});
	});
  
  
	describe("filterByEstado", () => {

		it("should return applicants for the specified estado - Aplicante", async () => {
			const estado = "Aplicante";
  
			mockApplicantService.findByEstado.mockResolvedValue(
				applicants.filter(applicant => applicant.estado === estado)
			);
  
			const result = await controller.filterByEstado(estado);
			expect(mockApplicantService.findByEstado).toHaveBeenCalledWith(estado);
			//console.log(result);
			expect(result).toEqual([applicants[0]]);
			
		});


		it("should return applicants for the specified estado - Invitado", async () => {
			const estado = "Invitado";

			mockApplicantService.findByEstado.mockResolvedValue(
				applicants.filter(applicant => applicant.estado === estado)
			);

			const result = await controller.filterByEstado(estado);
			expect(mockApplicantService.findByEstado).toHaveBeenCalledWith(estado);
			//console.log(result);
			expect(result).toEqual([applicants[1]]);
		});


		it("should return applicants for the specified estado - Rechazado", async () => {
			const estado = "Rechazado";

			mockApplicantService.findByEstado.mockResolvedValue(
				applicants.filter(applicant => applicant.estado === estado)
			);

			const result = await controller.filterByEstado(estado);
			expect(mockApplicantService.findByEstado).toHaveBeenCalledWith(estado);

			//console.log(result);
			expect(result).toEqual([applicants[2]]);
		});

		it("should return applicants for the specified estado - Matriculado", async () => {
			const estado = "Matriculado";

			mockApplicantService.findByEstado.mockResolvedValue(
				applicants.filter(applicant => applicant.estado === estado)
			);

			const result = await controller.filterByEstado(estado);
			expect(mockApplicantService.findByEstado).toHaveBeenCalledWith(estado);
			//console.log(result);
			expect(result).toEqual([applicants[3]]);
		});

	});

	describe("getByResidenceSpain", () => {
		it("should return applicants for residence Spain", async () => {
			const spainApplicants = applicants.filter(applicant => applicant.pais_de_residencia === "España");

			mockApplicantService.findByResidence.mockResolvedValue(spainApplicants);

			const result = await controller.getByResidenceSpain();

			expect(result).toEqual(spainApplicants);
			expect(mockApplicantService.findByResidence).toHaveBeenCalledWith("España");
		});
	});

	describe("getByResidence", () => {
		it("should return applicants for specified rcountry of esidence", async () => {
			const residence = "USA";

			mockApplicantService.findByResidence.mockResolvedValue  (applicants.filter(applicant => applicant.pais_de_residencia === residence));

			const result = await controller.getByResidence(residence);
			//console.log(result);
			expect(result).toEqual([applicants[3]]);
			expect(mockApplicantService.findByResidence).toHaveBeenCalledWith(residence);
		});
	});
	describe("getByDuplicateEmails", () => {
		it("should call getDuplicateEmails from service and return the result", async () => {
			const expectedResult = ["duplicate1@example.com", "duplicate2@example.com"];
			mockApplicantService.getDuplicateEmails.mockResolvedValue(expectedResult);
		
			const result = await controller.getByDuplicateEmails();
		
			expect(result).toEqual(expectedResult);
			expect(mockApplicantService.getDuplicateEmails).toHaveBeenCalled();
		});
	});
	describe("getByUsersPreapproved", () => {
		it("should call getUsersPreapproved from service and return the result", async () => {
			const expectedResult= [applicants[0]]; 
			mockApplicantService.getUsersPreapproved.mockResolvedValue(expectedResult);
		
			const result = await controller.getByUsersPreapproved();
		
			expect(result).toEqual(expectedResult);
			expect(mockApplicantService.getUsersPreapproved).toHaveBeenCalled();
		});
	});
	describe("updateApplicant", () => {
		it("should update an applicant - any one field", async () => {
			const id = 1;
			const updateApplicantDto: UpdateApplicantDto = {}; 
			const updatedApplicant: Applicant = {
				id: 1,
				nombre: "John",
				apellidos: "Smith",
				correo_electronico: "john@example.com",
				telefono: 64829471,
				genero: TipoGenero.Hombre,
				fecha_de_nacimiento: new Date(2000, 12, 16),
				pais_de_nacimiento: "France",
				documento_de_identidad: TipoId.DNI,
				numero_documento_id: "Y2939789",
				direccion: "c/Barcelona 1234",
				ciudad: "Barcelona",
				provincia: "Barcelona",
				codigo_postal: 78953,
				pais_de_residencia: "España",
				programa_cursar: TipoProgramaDeseado.ITSupport,
				colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
				educacion: TipoEducacion.SinEstudio,
				situacion_profesional: TipoSituacionProfesional.SinIngresos,
				intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
				dedicacion_semanal: 0,
				acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
				formacion_online: "Si",
				razones_para_unir: "Lorem Ipsum",
				encontrar_programa: TipoEncontrarPrograma.RedesSociales,
				estado: "Matriculado",
				fecha_de_applicacion: undefined,
				tipo_documento_identidad: "",
				permiso: "",
				estudio_mas_alto: "",
				mas_informacion: "",
				observaciones: "",
				invitaciones: 0,
				interview_id: 0
			};
	
			mockApplicantService.updateApplicant.mockResolvedValue(updatedApplicant);	
			await controller.updateApplicant(id, updateApplicantDto);
	
			expect(mockApplicantService.updateApplicant).toHaveBeenCalledWith(id, updateApplicantDto);
		});
		it("should update an applicant - some fields", async () => {
			const id = 1;
			const updateApplicantDto: UpdateApplicantDto = {
				nombre: "Adam",
				telefono: 738321987
			}; 
			const updatedApplicant: Applicant = {
				id: 1,
				nombre: "John",
				apellidos: "Smith",
				correo_electronico: "john@example.com",
				telefono: 64829471,
				genero: TipoGenero.Hombre,
				fecha_de_nacimiento: new Date(2000, 12, 16),
				pais_de_nacimiento: "France",
				documento_de_identidad: TipoId.DNI,
				numero_documento_id: "Y2939789",
				direccion: "c/Barcelona 1234",
				ciudad: "Barcelona",
				provincia: "Barcelona",
				codigo_postal: 78953,
				pais_de_residencia: "España",
				programa_cursar: TipoProgramaDeseado.ITSupport,
				colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
				educacion: TipoEducacion.SinEstudio,
				situacion_profesional: TipoSituacionProfesional.SinIngresos,
				intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
				dedicacion_semanal: 0,
				acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
				formacion_online: "Si",
				razones_para_unir: "Lorem Ipsum",
				encontrar_programa: TipoEncontrarPrograma.RedesSociales,
				estado: "Matriculado",
				fecha_de_applicacion: undefined,
				tipo_documento_identidad: "",
				permiso: "",
				estudio_mas_alto: "",
				mas_informacion: "",
				observaciones: "",
				invitaciones: 0,
				interview_id: 0
			};	  
			mockApplicantService.updateApplicant.mockResolvedValue(updatedApplicant);	
			await controller.updateApplicant(id, updateApplicantDto);	  
			expect(mockApplicantService.updateApplicant).toHaveBeenCalledWith(id, updateApplicantDto);
		});
	});
	
	describe("updateEstado", () => {
		it("should update an applicant estado", async () => {
			const id = 1;
			const updateApplicantDto: UpdateApplicantDto = {
				estado: "Matriculado"
			}; 
		
			const updatedApplicant: Applicant = {
				id: 1,
				nombre: "John",
				apellidos: "Smith",
				correo_electronico: "john@example.com",
				telefono: 64829471,
				genero: TipoGenero.Hombre,
				fecha_de_nacimiento: new Date(2000, 12, 16),
				pais_de_nacimiento: "France",
				documento_de_identidad: TipoId.DNI,
				numero_documento_id: "Y2939789",
				direccion: "c/Barcelona 1234",
				ciudad: "Barcelona",
				provincia: "Barcelona",
				codigo_postal: 78953,
				pais_de_residencia: "España",
				programa_cursar: TipoProgramaDeseado.ITSupport,
				colectivo: ["Mujer en situación de vulnerabilidad", "Minorías étnicas"],
				educacion: TipoEducacion.SinEstudio,
				situacion_profesional: TipoSituacionProfesional.SinIngresos,
				intereses_actuales: TipoInteresesActuales.CompetenciasTecnologicas,
				dedicacion_semanal: 0,
				acceso_internet_dispositivos: TipoAccessoInternetDispositivos.SinAcceso,
				formacion_online: "Si",
				razones_para_unir: "Lorem Ipsum",
				encontrar_programa: TipoEncontrarPrograma.RedesSociales,
				estado: "Matriculado",
				fecha_de_applicacion: undefined,
				tipo_documento_identidad: "",
				permiso: "",
				estudio_mas_alto: "",
				mas_informacion: "",
				observaciones: "",
				invitaciones: 0,
				interview_id: 0
			};
	
			mockApplicantService.updateEstado.mockResolvedValue(updatedApplicant);
			const result = await controller.updateEstado(id, updateApplicantDto);
	
			expect(mockApplicantService.updateEstado).toHaveBeenCalledWith(id, updateApplicantDto);
			expect(result).toBeDefined(); 
		});
	});
});
	


