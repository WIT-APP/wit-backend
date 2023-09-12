
export enum TipoGenero {
    Hombre = "Hombre",
    Mujer = "Mujer",
    Otro = "Otro",
    Ninguno = "Prefiero no identificarme"
}

export enum TipoId{
    DNI ="DNI",
    NIE ="NIE",
    Otro = "Otro"
}

export enum TipoProgramaDeseado {
    ITSupport = "Soporte de Tecnologías de la Información",
    TechAutomation = "Automatización de Tecnologías de la Información con Python"
}

export enum TipoPermiso {
    Trabajo = "Permiso de residencia y trabajo",
    Estudios = "Permiso de residencia y estudios",
    Ninguno = "No dispongo de permiso (No es un problema para tener acceso al curso)",
    Otro = "Otro"
}

export enum TipoColectivo {
    Mujer = "Mujer en situación de vulnerabilidad",
    MinoriasEtnicas = "Minorías étnicas",
    Inmigrante = "Inmigrante o refugiada/o",
    Joven = "Joven sin titulación y sin empleo",
    Desempleado = "Desempleada/o de larga duración o debido a la crisis del Covid-19",
    Edad50 = "Grupo de edad > 50 años",
    Monoparental = "Cabeza de familia monoparental",
    Ninguno = "No me identifico con ninguna de las opciones anteriores"
}

export enum TipoEducacion {
    SinEstudio = "Sin estudios o estudios primarios sin finalizar",
    Primarios = "Estudios primarios",
    Secundarios = "Estudios secundarios",
    Profesional = "Formación profesional",
    Universitarios = "Estudios universitarios",
    Otro = "Otro"
}

export enum TipoSituacionProfesional {
    SinIngresos = "Desempleada/o sin ingresos",
    Subsidio = "Desempleada/o con subsidio por desempleo",
    TiempoCompleto = "Empleada/o a tiempo completo",
    TiempoParcial = "Empleada/o a tiempo parcial",
    Autonomo = "Autónoma/o",
    Estudiante = "Estudiante",
    Otro = "Otro"
}

export enum TipoInteresesActuales {
    CompetenciasTecnologicas = "Estoy interesada/o en formarme en competencias tecnológicas",
    EmpleoTecnologico = "Estoy interesada/o en obtener un empleo en el sector tecnológico",
    EmpleoEstable = "Necesito formarme para conseguir un empleo estable",
    CambiarSector = "Quiero cambiar de sector profesional",
    Otro = "Otra"
}

export enum TipoAccessoInternetDispositivos {
    SinAcceso = "Sin acceso (no tengo conexión a internet ni dispositivo)",
    MuyLimitado = "Acceso muy limitado (tengo dispositivo pero no tengo conexión a internet)",
    Limitado = "Acceso limitado (tengo dispositivo y conexión a internet limitada)",
    Medio = "Acesso medio (tengo dispositivo y conexión a internet, a pesar de no ser de buena calidad)",
    Buen = "Buen acceso (tengo buena conexión a internet y dispositivo)"
}

export enum TipoEncontrarPrograma {
    RedesSociales = "Redes sociales",
    SomosF5 = "Somos F5",
    FactoriaF5 = "Factoría F5",
    FundacionDonBosco = "Fundación Don Bosco o sus redes sociales",
    Buscadores = "Buscadores de internet (Google)"
}