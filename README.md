# Prog.-III-Grupo-E
-------------------------------------------------------------------------------------------------------------------------------------------
Repositorio de Programación III para plantear el desarrollo del Trabajo Final Integrador de la carrera Tecnicatura en Desarrollo Web de la UNER
--------------------------------------------------------------------------------------------------------------------------------------------
INTEGRANTES DEL GRUPO: 
- Ariel Alejandro Aragón
- Elian Perez
- Flavio Rivero
- Luis Gutiérrez
- Natalia Pellegrineschi
- Silvio Jorge Giles
--------------------------------------------------------------------------------------------------------------------------------------------
DESARROLLO DEL TRABAJO: 
🏥 PROYECTO - Sistema de Gestión Clínica
Trabajo Final Integrador – Programación III
Tecnicatura Universitaria en Desarrollo Web – UNER

📌 DESCRIPCIÓN
Aplicación web cliente-servidor para la gestión de una clínica médica.

El sistema permite:
• Gestión de usuarios (médicos, pacientes, administradores)
• Gestión de especialidades y obras sociales
• Reserva y administración de turnos
• Control de acceso por roles
• Generación de reportes y estadísticas

🛠️ TECNOLOGÍAS UTILIZADAS
• Node.js + Express
• MySQL
• phpMyAdmin
• JavaScript (Frontend)
• JWT (Autenticación)
• Swagger (Documentación API)

⚙️ INSTALACIÓN DEL PROYECTO
1. Clonar repositorio
git clone <URL_DEL_REPO>
2. cd PROG-III-GRUPO-E
3. Configurar Base de Datos
4. Ir a la carpeta “database” y ejecutar el archivo:
script_creación.bd.sql (Ver instrucciones en database/README.md)
5. Configurar Backend
6. cd backend
7. npm install

8. Crear archivo .env con los siguientes datos:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=IDW_Pro3
PORT=3000
JWT_SECRET=secreto

9. Ejecutar servidor
npm start
Servidor disponible en:
http://localhost:3000

Frontend
1. Abrir en navegador:
/frontend/index.html

🔐 AUTENTICACIÓN Y ROLES
El sistema utiliza autenticación mediante JWT.

Roles definidos:
• 1 → Médico
• 2 → Paciente
• 3 → Administrador

Cada endpoint está protegido según el rol correspondiente.

📡 API REST
La API sigue principios REST:
• GET → obtener datos
• POST → crear
• PUT → actualizar
• DELETE → eliminación lógica (soft delete)

📊 REGLAS DE NEGOCIO
• No se eliminan registros físicamente
→ Se utiliza activo = 0 (soft delete)

• Cálculo del valor del turno:
Si la obra social NO es particular:
valor_total = valor_consulta - (porcentaje_descuento * valor_consulta)

Si es particular:
valor_total = valor_consulta

• Las estadísticas se generan mediante Stored Procedures en MySQL

📄 DOCUMENTACIÓN DE LA API
Disponible mediante Swagger en:
/api/docs

📂 ESTRUCTURA DEL PROYECTO
backend → API REST (Node + Express)
frontend → Cliente web
database → Script SQL

🧩 ARQUITECTURA BACKEND
controllers → lógica de endpoints
models → acceso a base de datos
routes → definición de rutas
middlewares → autenticación, validaciones, logs
validators → validación de datos
services → lógica de negocio
config → configuración (DB, entorno)
utils → helpers (JWT, PDF, respuestas)

🛡️ SEGURIDAD
• Autenticación con JWT
• Autorización por roles
• Uso de variables de entorno
• Validaciones en cada endpoint

🔧 FUNCIONALIDADES TÉCNICAS
• Manejo de errores con respuestas HTTP adecuadas
• Uso de transacciones en MySQL
• Middleware de logging
• Subida de archivos
• Generación de reportes en PDF
• CORS habilitado

👥 TRABAJO EN EQUIPO
Flujo de trabajo:

1. Crear una rama: git checkout -b feature/nombre

2. Subir cambios:
git add .
git commit -m "descripcion del cambio"
git push

!!!! IMPORTANTE: !!!! 
* No trabajar directamente en la rama main

📌 REQUISITOS DEL SISTEMA
• Node.js instalado
• MySQL activo
• phpMyAdmin (opcional)

🚧 ESTADO DEL PROYECTO
En desarrollo (Trabajo Final Integrador)

🎥 ENTREGA FINAL
El proyecto incluye:
• Repositorio en GitHub
• Código fuente completo
• Video explicativo del funcionamiento
• Aplicación en ejecución

