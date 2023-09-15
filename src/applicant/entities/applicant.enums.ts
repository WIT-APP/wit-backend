export enum TipoGenero {
  hombre = 'Hombre',
  mujer = 'Mujer',
  otro = 'Otro',
  ninguno = 'Prefiero no identificarme',
}

export enum TipoId {
  DNI = 'DNI',
  NIE = 'NIE',
  otro = 'Otro',
}

export enum TipoProgramaDeseado {
  ITSupport = 'Soporte de Tecnologías de la Información',
  techAutomation = 'Automatización de Tecnologías de la Información con Python',
}

export enum TipoPermiso {
  trabajo = 'Permiso de residencia y trabajo',
  estudios = 'Permiso de residencia y estudios',
  ninguno = 'No tengo permiso aunque no es problema para acceder al curso',
  otro = 'Otro',
}

export enum TipoColectivo {
  mujer = 'Mujer en situación de vulnerabilidad',
  minorias = 'Minorías étnicas',
  inmigrante = 'Inmigrante o refugiada/o',
  joven = 'Joven sin titulación y sin empleo',
  desempleado = 'Desempleada/o de larga duración o debido a la crisis del Covid-19',
  edad50 = 'Grupo de edad > 50 años',
  monoparental = 'Cabeza de familia monoparental',
  ninguno = 'No me identifico con ninguna de las opciones anteriores',
}

export enum TipoEducacion {
  sinEstudio = 'Sin estudios o estudios primarios sin finalizar',
  primarios = 'Estudios primarios',
  secundarios = 'Estudios secundarios',
  profesional = 'Formación profesional',
  universitarios = 'Estudios universitarios',
  otro = 'Otro',
}

export enum TipoSituacionProfesional {
  sinIngresos = 'Desempleada/o sin ingresos',
  subsidio = 'Desempleada/o con subsidio por desempleo',
  tiempoCompleto = 'Empleada/o a tiempo completo',
  tiempoParcial = 'Empleada/o a tiempo parcial',
  autonomo = 'Autónoma/o',
  estudiante = 'Estudiante',
  otro = 'Otro',
}

export enum TipoInteresesActuales {
  competenciasTecnologicas = 'Estoy interesada/o en formarme en competencias tecnológicas',
  empleoTecnologico = 'Estoy interesada/o en obtener un empleo del sector tecnológico',
  empleoEstable = 'Necesito formarme para conseguir un empleo estable',
  cambiarSector = 'Quiero cambiar de sector profesional',
  otro = 'Otra',
}

export enum TipoAccessoInternetDispositivos {
  sinAcceso = 'Sin acceso (no tengo conexión a internet ni dispositivo)',
  muyLimitado = 'Acceso muy limitado (tengo dispositivo pero no tengo internet)',
  limitado = 'Acceso limitado (tengo dispositivo e internet limitado)',
  medio = 'Acesso medio (tengo dispositivo e internet de baja calidad)',
  buen = 'Buen acceso (tengo buena conexion a internet y dispositivo)',
}

export enum TipoEncontrarPrograma {
  redesSociales = 'Redes sociales',
  somosF5 = 'Somos F5',
  FactoriaF5 = 'Factoria F5',
  FundacionDonBosco = 'Fundación Don Bosco o sus redes sociales',
  buscadores = 'Buscadores de internet (Google)',
}
