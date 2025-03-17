const codes = require("http-status-codes");
const modelos = require("../models/modelos");
const enviarEmail = require("../libs/nodemailer");
const errors = require("../utils/errors");
const sequelize = require("../models/conection");
const { checkearEntradas } = require("../utils/comprobations");

const { Municipio, Persona, Token_verificacion } = modelos();

let municipios = null;

async function cargarMunicipios() {
  const res = await Municipio.findAll({
    attributes: ["nombre"],
    order: [["nombre", "ASC"]],
  });

  municipios = res;
}

cargarMunicipios();

cargarMunicipios().then((res) => {
  const municipios = res;
});

const index = async (req, res) => {
  try {
    let responseAlert;
    res.render("home/register", { municipios, responseAlert });
  } catch (err) {
    errors.resErrorsJson(res, codes.StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const tyc = (req, res) => {
  try {
    res.render("home/tyc");
  } catch (err) {
    errors.resErrorsJson(res, codes.StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const register = async (req, res) => {
  let personaCreada;
  const { verificado, ...data } = req.body;

  let responseAlert = {
    status: codes.StatusCodes.ACCEPTED,
    message:
      "Se envio una validación al correo proporcionado. Verificar para completar el registro (* Revisar casilla de spam)",
    reason: codes.getReasonPhrase(codes.StatusCodes.ACCEPTED),
  };

  try {
    const checkeadoEntradas = await checkearEntradas(
      data.dni,
      data.email,
      data.municipio,
      errors,
      Municipio,
      Persona
    );

    if (checkeadoEntradas.personaConDni || checkeadoEntradas.personaConCorreo) {
      personaCreada =
        checkeadoEntradas.comprobarDni || checkeadoEntradas.comprobarCorreo;
      const findToken = await Token_verificacion.findOne({
        where: {
          email: personaCreada.email,
        },
      });

      if (findToken != null) {
        await findToken.destroy();
      }

      const personaCreada = {
        ...data,
        municipioId: checkeadoEntradas.municipioEncontrado.id,
      };

      await personaCreada.save();
    } else {
      personaCreada = await Persona.create({
        ...data,
        municipioId: checkeadoEntradas.municipioEncontrado.id,
      });
    }

    const tokenCreado = await Token_verificacion.create({
      email: personaCreada.email,
    });

    await enviarEmail(tokenCreado.token, personaCreada, valores.municipio);

    res
      .status(codes.StatusCodes.ACCEPTED)
      .render("home/register", { municipios, responseAlert });
  } catch (err) {
    let statusValue;
    let messageValue;
    let reasonValue;

    if (err instanceof errors.credentialsError) {
      statusValue = codes.StatusCodes.BAD_REQUEST;
      messageValue = err.message;
      reasonValue = codes.getReasonPhrase(codes.StatusCodes.BAD_REQUEST);
    } else {
      statusValue = codes.StatusCodes.INTERNAL_SERVER_ERROR;
      messageValue =
        "Error relacionado al servidor. Vuelva a intentarlo más tarde";
      reasonValue = codes.getReasonPhrase(
        codes.StatusCodes.INTERNAL_SERVER_ERROR
      );

      console.error(err);
    }

    responseAlert = {
      status: statusValue,
      message: messageValue,
      reason: reasonValue,
    };
    res
      .status(statusValue)
      .render("home/register", { municipios, responseAlert });
  }
};

const confirmarEmail = async (req, res) => {
  const token = req.params.token;

  try {
    const verificarToken = await Token_verificacion.findOne({
      where: {
        token: token,
      },
    });

    if (verificarToken === null) {
      throw new errors.credentialsError();
    }

    const persona = await Persona.findOne({
      where: {
        email: verificarToken.email,
      },
    });

    persona.verificado = true;

    await persona.save();
    await verificarToken.destroy();

    res.status(codes.StatusCodes.CREATED).render("home/confirmed");
  } catch (err) {
    if (err instanceof errors.credentialsError) {
      errors.resErrorsJson(res, codes.StatusCodes.FORBIDDEN);
    } else {
      errors.resErrorsJson(res, codes.StatusCodes.INTERNAL_SERVER_ERROR);
      console.error(err);
    }
  }
};

const participants = async (req, res) => {
  try {
    const personas = await Persona.findAll({
      limit: 5,
      attributes: [
        "nombre",
        [
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("fecha_alta"),
            "%Y-%m-%d %H:%i:%s"
          ),
          "fecha_alta",
        ],
      ],
      where: { verificado: true },
      order: [["fecha_alta", "DESC"]],
    });

    res
      .status(codes.StatusCodes.ACCEPTED)
      .render("home/participantes", { personas });
  } catch (err) {
    errors.resErrorsJson(res, codes.StatusCodes.INTERNAL_SERVER_ERROR);
    console.error(err);
  }
};

module.exports = {
  index,
  tyc,
  register,
  confirmarEmail,
  participants,
  Token_verificacion,
};
