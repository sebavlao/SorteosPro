# SorteosPro 🎉

![SorteosPro](https://img.shields.io/badge/status-active-brightgreen)  
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D%2020.x-339933?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Descripción 📝

**SorteosPro** facilita la administración de sorteos al automatizar el proceso de registro, verificación de usuarios, selección aleatoria de ganadores y generación de documentos. El sistema está pensado para un único administrador, y los usuarios pueden registrarse, verificar su cuenta por correo electrónico, y participar en los sorteos.

## Tecnologías 🚀
- Node.js: Servidor backend
- Sequelize: ORM para la base de datos
- EJS: Motor de plantillas
- Nodemailer: Envío de correos electrónicos
- JWT: Autenticación de usuarios
- Bcrypt: Seguridad de contraseñas
- Google reCAPTCHA: Protección contra bots
- Pdfkit: Generación de pdf dinámico
- Node-cron: Para tareas planificadas
- Express validator: Validar la petición POST de los usuarios

### Características 🔑:
- ✅ **Registro de usuarios** con verificación de correo electrónico a través de **Nodemailer**.
- 🎲 **Generación automática de sorteos** con selección aleatoria de ganadores.
- 📊 **Exportación de datos de usuarios** en archivos **CSV**.
- 🏆 **Generación de comprobantes de sorteos** en formato **PDF**.
- 🔐 Uso de **JSON Web Tokens (JWT)** para autenticación de usuarios y sesiones.
- 🔒 **Contraseña hasheada** con **bcrypt** para mayor seguridad.
- 👨‍💻 **MVC** para la estructuración del proyecto

## Instalación 🔧

### Pasos para configurar el proyecto
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/sebavlao/SorteosPro.git
   ```

2. **Instalar las dependencias:**
   ```bash
   cd SorteosPro
   npm install
   ```

3. **Configurar las variables de entorno:**

   Copia el archivo .env.example y renómbralo a .env. Luego, modifica las variables de entorno según sea necesario, como la configuración de Nodemailer, JWT, y otras credenciales.

4. **Configurar un administrador en la base de datos:**
   - Crea un usuario con los campos: username y password con un UUID en una tabla Admin.
   - La contraseña del admin en la base de datos debe estar hasheada utilizando bcrypt-generator o similares.
     (Ante dudas revisar /src/models/modelos.js)

5. **Correr la aplicación: Una vez configuradas las variables de entorno y el administrador, puedes iniciar la aplicación con:**
      ```bash
      npm run start
   ```

## Uso 👨‍💻
Acceder al sistema:

1. **Acceder al sistema:**
   - El administrador puede acceder a la aplicación a través de la ruta /adminsecret/login.
   - Una vez logueado, podrá ver los usuarios registrados, crear sorteos, generar el comprobante en PDF, y exportar usuarios en formato CSV.
2. **Registro de usuarios:** Los usuarios deben registrarse desde la página principal (/), donde se les pedirá su información y verificación por correo electrónico.

3. **Generación de Sorteos:** Desde la vista de administrador, puedes crear sorteos con los usuarios registrados y seleccionar al ganador aleatoriamente. El comprobante de los ganadores se genera en formato PDF.

4. **Exportación de usuarios:** Se pueden exportar los usuarios registrados en un archivo CSV a través del panel de administración.

## Configuración adicional ⚙️
- Verificación por correo electrónico: Configura las credenciales de tu servicio de correo en el archivo .env para usar Nodemailer.
- Google reCAPTCHA: Puedes habilitar Google reCAPTCHA descomentando las líneas correspondientes en el archivo .env y configurando las claves en el archivo correspondiente de la vista y los scripts. (Revisa los archivos src/views/home/register.ejs, src/views/admin/login.ejs, public/js/index.js, y index.js).

## Imagenes del proyecto en funcionamiento 📷
![main](https://github.com/user-attachments/assets/e0177913-214d-43cb-b225-d158f4c7b6d0)
![main](https://github.com/user-attachments/assets/70e11db6-b9fd-4428-bbff-017ef085d336)
![main mobile](https://github.com/user-attachments/assets/0e9439af-6ca4-4efe-9ea8-b64ca0937b0e)
![admin main](https://github.com/user-attachments/assets/0622c1ea-fd52-40cb-8536-1956f861ad3a)
![pdf 1](https://github.com/user-attachments/assets/3a315743-fff2-4977-9f1b-7a82261e67e4)
![pdf 2](https://github.com/user-attachments/assets/97572506-c424-41ca-919b-f5c197078bb6)
![admin registers](https://github.com/user-attachments/assets/d437ae5d-0579-4f1c-8de8-b95df844216b)
![admin login](https://github.com/user-attachments/assets/74c76dc5-2af3-475b-8286-74d5adc2398e)

## Licencia 📝

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
