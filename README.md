Sistema de Alertas en Node.js
Este proyecto es un sistema de alertas desarrollado en Node.js que permite gestionar usuarios, temas y alertas. El sistema se basa en el patrón MVC y utiliza estructuras en memoria sin persistencia de datos, oritentado a objectos, sin polimorfisco y utilizando patrones de diseño como: Singleton y otros patrones como Strategy, Observer, Factory que aunque no
estan de manera explicita en sistema se pueden implementar.

Funcionalidades
Registro de Usuarios: Permite crear nuevos usuarios.
Registro de temas : Permite crear nuevos temas
Suscripción a Temas: Los usuarios pueden suscribirse a temas específicos.
Desuscripción de Temas: Los usuarios pueden desuscribirse de temas.
Gestión de Alertas:
Creación de Alertas: Se pueden crear alertas para usuarios o temas con fecha y hora de expiración.
Envío de Alertas: Las alertas se envían a los usuarios suscritos al tema o al usuario específico.
Marcar Alertas como Leídas: Los usuarios pueden marcar alertas como leídas.
Obtener Alertas: Los usuarios pueden obtener alertas no expiradas que aún no han leído, ordenadas por tipo (urgentes primero, luego informativas).

Estructura del Proyecto

Prueba WoowUp/
│
├── controllers/
│   ├── alertController.js
│   ├── topicController.js
│   └── userController.js
│
├── models/
│   ├── alertModel.js
│   ├── topicModel.js
│   └── userModel.js
│
├── services/
│   ├── alertService.js
│   ├── topicService.js
│   └── userService.js
│
├── tests/
│   ├── alertController.test.js
│   ├── topicController.test.js
│   └── userController.test.js
│   ├── alertService.test.js
│   ├── topicService.test.js
│   └── userService.test.js
│
├── app.js
├── package.json

Instalación

Clona el repositorio:

bash
git clone <https://github.com/Estradasoto9/Prueba-WoowUp.git>

Navega al directorio del proyecto:

bash

cd <Prueba WoowUp>

Instala las dependencias:

bash
npm install

Uso
Inicia el servidor:

bash
npm start

API Endpoints:

Usuarios:

POST /users/register - Crear un nuevo usuario.
POST /users/subscribe - Suscribirse a un tema.
POST /users/unsubscribe - Desuscribirse de un tema.
POST /users/markAlertAsRead'- Marcar una alerta como leída.
GET /users/alerts/userId - Obtener todas las alertas no leídas de un usuario.

Temas:

POST /topics/create - Crear un nuevo tema.
GET /topics/:id - Obtener un tema por ID.

Alertas:

POST /alerts/createAlert - Crear una nueva alerta.
GET /alerts/users/:userId - Obtener alertas para un usuario.
GET /alerts/topics/:topicId - Obtener alertas para un tema.
Pruebas
Para ejecutar las pruebas unitarias del proyecto:

Ejecuta las pruebas:

bash
npm test

Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para contribuir al proyecto.


