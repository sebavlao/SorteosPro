const nodemailer = require("nodemailer");
const config = require("../../config/config");

const enviarEmail = async (token, datos, municipio) => {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: config.SMTP_USER,
      to: datos.email,
      subject: "Verificar Email | Proyecto de @sebavlao",
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verificar Email</title>
            </head>
            <body style="padding-left: 40px; padding-right: 120px; padding-top: 20px; font-family: Helvetica, sans-serif; display: grid; gap: 20px;">
                <h1>Confima tu dirección de correo electrónico</h1>
                <h3 style="color: red;">Al verificar tu correo das de alta los siguientes datos: </h3>
                <ul style="margin-top: -10px;">
                    <li>Apellido: ${datos.apellido}</li>
                    <li>Nombre: ${datos.nombre}</li>
                    <li>Dni: ${datos.dni}</li>
                    <li>Telefono: ${datos.telefono}</li>
                    <li>Fecha de nacimiento: ${datos.nacimiento}</li>
                    <li>Domicilio: ${datos.domicilio}</li>
                    <li>Correo: ${datos.email}</li>
                    <li>Municipio: ${municipio}</li>
                </ul>
                <a href="${config.API_PROJECT}/confirmar/${token}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: white; font-weight: 600; font-size: 16px; border-radius: 1000px; background-color: #214F5B; padding-left: 40px; padding-right: 40px; padding-top: 10px; padding-bottom: 10px; max-width: fit-content;">Verificar email</a>
                <section>
                    <p>Si no puedes hacer click en el bóton, copia y pega el siguiente enlace en tu navegador: ${config.API_PROJECT}/confirmar/${token}. </p>
                    <b>Si alguno de los datos proporcionados son erroneos, ignora este email y vuelve a completar el formulario: ${config.API_PROJECT}</b>
                    <br>
                    <br>
                    <b>Si no te inscribiste al sorteo, por favor ignora este email.</b>
                </section>
            </body>
            </html>`,
    });
  } catch (err) {
    throw Error(err);
  }
};

module.exports = enviarEmail;
