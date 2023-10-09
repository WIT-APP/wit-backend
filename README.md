![LOGOS WORK IN TECH, Google y Somos F5](https://github.com/WIT-APP/wit-frontend/blob/main/src/assets/footer-image.png?raw=true)
 <h1>Work in Tech (WIT) - Aplicación de Gestión de Becas</h1>

  <p align="center">
   <img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green">
   <img src="https://img.shields.io/github/license/WIT-APP/wit-backend">
   <img src="https://img.shields.io/github/issues/WIT-APP/wit-backend">
   <img src="https://img.shields.io/github/languages/count/WIT-APP/wit-backend">
   <img src="https://img.shields.io/github/contributors/WIT-APP/wit-backend">
  </p>

<h2>Índice</h2>

*[Descripción del proyecto](#descripción-del-proyecto)

*[Planteamiento del problema](#planteamiento-del-problema)

*[Propuesta solución](#propuesta-solucion)

*[Estado del proyecto](#Estado-del-proyecto)

*[Características de la aplicación y demostración](#Características-de-la-aplicación-y-demostración)

*[Acceso al proyecto](#acceso-proyecto)

*[Tecnologías utilizadas](#tecnologías-utilizadas)

*[Equipo de Desarrollo](#personas-contribuyentes)

*[Licencia](#licencia)

*[Agradecimientos especiales](#agradecimientos_especiales)



## Descripción del Proyecto

Bienvenido al repositorio Backend de la aplicación de gestión de becas para el programa Work in Tech (WIT) de la Fundación Somos F5. Este proyecto tiene como objetivo centralizar y automatizar el proceso de registro de interés, selección, matriculación y seguimiento de las personas que participan en el programa WIT.

## Planteamiento del problema

Actualmente, el equipo de WIT trabaja con una base de datos descentralizada gestionada de manera manual a través de archivos de Google Sheets. El proceso inicial recopila datos a través de un formulario de Google, y luego, en los pasos posteriores a la preinscripción, varias personas actualizan y manipulan estos datos, lo que ha afectado la integridad de la base de datos.

## Propuesta Solución

Nuestra solución es desarrollar una aplicación que simplifique y centralice la gestión de datos en todo el proceso de administración de becas de Work in Tech. Esto permitirá garantizar la integridad y precisión de los datos recopilados y actualizados. Además, nuestro objetivo es mejorar la experiencia del usuario, haciendo que el proceso sea más intuitivo y reduciendo la necesidad de pasos manuales.

## Estado del proyecto

Actualmente la aplicación para la gestión de Becas de google por parte de Work in Tech se encuentra funcional en una etapa inicial. Esta aplicación recolecta la información de pre-inscripción de todos los aspirantes, esta información es capturada por medio de un formulario que alimenta nuestra base de datos de Aplicantes.Posteriormente esta aplicación te permite gestionar la información de cada aspirante de acuerdo a su estado dentro del proceso de adquirir la beca y completar su curso.

Actualmente se administran dos cursos
*Soporte de Tecnologías de la Información <br>
*Automatización de Tecnologías de la Información con Python

Este proceso supone el siguiente flujo de vida de un aspirante que pasa los filtros y es asignado una licencia para estudiar uno de estos programas.


<img width="3248" alt="Flujo de estados" src="https://github.com/WIT-APP/wit-frontend/assets/144338411/6599f9d6-2f96-4320-af96-fdd858ef7857">

<p>Entonces, podemos inferir que una persona que aplica a una beca, incia su proceso llenando el formulario de registro. Una vez completado este paso, y por medio de un filtro automatico, una persona puede tomar uno de los siguientes estados, <strong>PRE-APROBADO</strong> ó <strong >APLICANTE</strong>; esto dependerá de un filtro automatizado en nuestra API, este filtro se encarga de verificar si la persona reside en España o sí ya ha estado previamente registrado en alguno de los pasos posteriores, es decir esta duplicado en la base de datos. Esto es posible, ya que hay casos excepcionales que se quieren evaluar anter de ser rechazados, y aquí introducimos un nuevo estado <strong >RECHAZADO</strong>.
Retomando el inicio del flujo, una persona que automaticamente fue aprobada o que en su defecto a pasado por revisión manual para ser aprobado pasa a ser <strong >INVITADO</strong> a una sesión informativa, para esta sesion informativa, una persona debería confirmar su asistencia y estara <strong >CONFIRMADO</strong>, además puede ser invitada un limite de veces, por lo general 6 veces; si la persona no asiste a la sesion informativa será RECHAZADA; si por el contrario avanza al proceso de Entrevista donde adquiere el atributo de <strong >ENTREVISTADO</strong>, donde esta persona puede ser RECHAZADA ó <strong >ADMITIDA</strong>. Allí inicia todo un proceso de matricula, y una vez completado su estado será <strong >MATRICULADO</strong>, una persona Matriculada durante el desarrollo y cumplimiento de sus modulos puede adquirir dos estados, <strong >CERTIFICADO</strong>, cuando ha culminado sus modulos con exito, ó <strong >BAJA </strong>cuando por el contrario los ha abandonado.</p>

<p>El proyecto ha alcanzado un 70% de su principal objetivo, hay un par de aspectos a mejorar que han quedado registrados en futuros Issues; por ejemplo, quisieramos añadir un modulo de seguimiento a las personas actualmente matriculadas que permita subir la información que se trae de la plataforma de estudios.</p>

## Características de la aplicación y demostración 

Este microservicio, es una API Rest, que cuenta con los siguientes modulos, y sus repectivos endpoints y métodos.

### Aplicant
![Applicant](https://github.com/WIT-APP/wit-backend/assets/144338411/eb271cd1-e663-4a4a-9900-2bd1a2e8ca7f)

### User
![User](https://github.com/WIT-APP/wit-backend/assets/144338411/9a2febfe-8f6c-4636-859c-2067d8b61c4d)

### Register Question
![register Question](https://github.com/WIT-APP/wit-backend/assets/144338411/1877b367-6638-4535-a898-a83640fc8c4f)

### Interview
![Interview](https://github.com/WIT-APP/wit-backend/assets/144338411/2da88224-b038-42fe-8e52-b22b1d212dce)

### Interview Question
![Interview Question](https://github.com/WIT-APP/wit-backend/assets/144338411/6e4eadda-e2aa-43ef-aab0-9dc6e38d9c94)

### Auth
![Auth](https://github.com/WIT-APP/wit-backend/assets/144338411/3b38d4a0-121d-4121-946e-792e488d81d7)

### Schemas
![Schemas](https://github.com/WIT-APP/wit-backend/assets/144338411/cd3a4046-bc52-435a-89c8-fa9403945e56)


### Esquema Relacional de la Base de Datos

A continuación podrás visualizar nuestra base de datos.
![ERD](https://github.com/WIT-APP/wit-backend/assets/144338411/4414f09c-006f-4595-94be-03150e3a0d30)

## Acceso al proyecto

### Accede a nuestra documentación

En el siguiente enlace podras acceder a nuestra documentación, conocer todos los endpoints y testearlos.
**[Click aquí para acceder a nuestra documentación](https://wit-backend-factoriaf5.up.railway.app/api)**

Usuario demo: admin@mail.com <br>
Password demo: 1234 

 
## Tecnologías Utilizadas

- **Typescript:** Lenguaje de desarrollo fuertemente tipado que se transpila a Javascript.
- **NestJS:** Framework de desarrollo de API Rest particularmente, inspirado en Angular.
- **PostgreSQL:** Sistema de gestión de bases de datos relacional (RDBMS) de código abierto.
- **ElephantSQL:** Servicio en la nube para bases de datos PostgreSQL.
- **Railway:** Plataforma de desarrollo para crear, implementar y administrar aplicaciones web y servicios en la nube.
- **ByCrypt y JWT:** Encriptar y proteger la información de acceso y registro.
- **TypeORM:** Interface para interactuar con la base de datos.



## Equipo de Desarrollo


  <div style="width:116px;">
    <a href="https://github.com/Alens678">
      <img src="https://avatars.githubusercontent.com/u/97367970?v=4" width="115" alt="Alejandra Naranjo">
    </a>
    <br>
    <sub>Alejandra Naranjo</sub>
  </div>
  <br>
  <div style="max-width:116px;">
    <a href="https://github.com/carlos-saiz">
      <img src="https://avatars.githubusercontent.com/u/126065490?v=4" width="115" alt="Carlos Saiz">
    </a>
    <br>
    <sub>Carlos Saiz</sub>
  </div>
  <br>
  <div style="display:flex flex-wrap:wrap justify-content:flex-start !important">
  <div style="width:116px;">
    <a href="https://github.com/Angela-GM">
      <img src="https://avatars.githubusercontent.com/u/116819605?s=400&u=bae5f7e88a358d3fbbd2f0e8521dda9a57739c70&v=4" width="115" alt="Angela Garcia">
    </a>
    <br>
    <sub>Angela Garcia</sub>
  </div>
  <br>
  <div style="width:116px;">
    <a href="https://github.com/JFCTito">
      <img img src="https://avatars.githubusercontent.com/u/125603610?v=4" width="115" alt="Jesús Fajardo">
    </a>
    <br>
    <sub>Jesús Fajardo</sub>
  </div>
  <br>
  <div style="width:116px;">
    <a href="https://github.com/denizozerdogan">
     <img src="https://ca.slack-edge.com/T052N58V0JG-U054J81JKUY-792817fcd7ed-512" width="115">
    </a>
    <br>
    <sub>Deniz Ozerdogan</sub>
  </div>
  <br>
  <div style="width:116px;">
    <a href="https://github.com/Federicojaviermartino">
     <img src="https://avatars.githubusercontent.com/u/122879094?v=4" width="115">
    </a>
    <br>
    <sub>Federico Martino</sub>
  </div>
</div>
</div>



## Licencia

 WIT-Frontend tiene licencia del MIT. <br>
 La documentación de  WIT-Frontend (p. ej., archivos .md en la carpeta ./docs) tiene licencia Creative Commons.

## Agradecimientos especiales

Agradecemos especialmente a Factoría F5 y todo su equipo, tambien a nuestro equipo de Formadores. Gracias por hacer posible nuestra formación. 

  <div style="width:116px;">
    <a href="https://github.com/Factoria-F5">
     <img src="https://avatars.githubusercontent.com/u/54581150?s=200&v=4" width="115">
    </a>
    <br>
    <sub>Factoría F5</sub>
  </div>
  <br>
  <div style="width:116px;">
    <a href="https://github.com/amrhefny87">
     <img src="https://media.licdn.com/dms/image/C4D03AQE0p0e5mTdPnQ/profile-displayphoto-shrink_800_800/0/1628093746145?e=1702512000&v=beta&t=IlQt_sO0x5YG2-mYj6Wfz7Q4HVASEH0B2zf2nCpdMDY" width="115">
    </a>
    <br>
    <sub>Amr Hefny</sub>
  </div>
  <br>
  <div style="width:116px;">
    <a href="https://github.com/raulf5">
     <img src="https://avatars.githubusercontent.com/u/102666302?v=4" width="115">
    </a>
    <br>
    <sub>Raúl García</sub>
  </div>



