const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const StatusCodes = require("http-status-codes").StatusCodes;
const modelos = require("../models/modelos");
const sequelize = require("../models/conection");
const generatePdf = require("../libs/pdfkit");
const csvStringifyGenerate = require("../libs/csvStringify");
const config = require("../../config/config");
const errors = require("../utils/errors");

const { Admin, Persona, Municipio, Departamento } = modelos();

const login = async (req, res) => {
  try {
    res.render("admin/login");
  } catch (err) {
    errors.resErrorsJson(res, StatusCodes.INTERNAL_SERVER_ERROR);
    console.error(err);
  }
};

const tryLogin = async (req, res) => {
  const valores = req.body;

  try {
    const usuario = await Admin.findOne({
      where: { username: valores.usuario },
    });

    if (usuario != null) {
      const match = await bcrypt.compare(valores.password, usuario.password);

      if (match) {
        const userForToken = {
          id: usuario.id,
          username: usuario.username,
        };

        const token = jwt.sign(userForToken, config.JWT_SECRET, {
          expiresIn: config.JWT_EXPIRES_IN,
        });

        res.cookie("authorization", token, { httpOnly: true });

        return res.status(StatusCodes.OK).redirect("/adminsecret/panel");
      }
    }

    throw new errors.credentialsError("Usuario o contraseña incorrectos");
  } catch (err) {
    if (err instanceof errors.credentialsError) {
      errors.resErrorsJson(res, StatusCodes.UNAUTHORIZED);
    } else {
      errors.resErrorsJson(res, StatusCodes.INTERNAL_SERVER_ERROR);
      console.error(err);
    }
  }
};

const drawPanel = async (req, res) => {
  try {
    let personaSorteada;
    if (req.method === "POST") {
      personaSorteada = await Persona.findOne({
        order: [sequelize.random()],
        where: {
          verificado: true,
        },
      });

      return res.render("admin/index", { personaSorteada });
    }

    return res.render("admin/index", { personaSorteada });
  } catch (err) {
    errors.resErrorsJson(res, StatusCodes.INTERNAL_SERVER_ERROR);
    console.error(err);
  }
};

const createPdf = (req, res) => {
  try {
    const stream = res.writeHead(StatusCodes.ACCEPTED, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=preview.pdf",
    });

    generatePdf(
      (data) => stream.write(data),
      () => stream.end(),
      req.body
    );
  } catch (err) {
    errors.resErrorsJson(res, StatusCodes.INTERNAL_SERVER_ERROR);
    console.error(err);
  }
};

const peoplePage = (req, res) => {
  let registros;
  try {
    res.render("admin/registros", { registros });
  } catch (err) {
    errors.resErrorsJson(res, StatusCodes.INTERNAL_SERVER_ERROR);
    console.error(err);
  }
};

const getPeople = async (req, res) => {
  try {
    const registros = await Persona.findAll({
      attributes: [
        "id",
        "dni",
        "nombre",
        "apellido",
        "email",
        "nacimiento",
        "telefono",
        "domicilio",
        [sequelize.col("municipio.nombre"), "nombre_municipio"],
        [sequelize.col("municipio.departamento.nombre"), "nombre_departamento"],
        [
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("fecha_alta"),
            "%Y-%m-%d %H:%i:%s"
          ),
          "fecha_alta",
        ],
      ],
      include: [
        {
          model: Municipio,
          attributes: [],
          include: [
            {
              model: Departamento,
              attributes: [],
            },
          ],
        },
      ],
      where: {
        verificado: true,
      },
      raw: true,
    });

    if (!registros) {
      throw new Error();
    }

    res.status(StatusCodes.ACCEPTED).render("admin/registros", { registros });
  } catch (err) {
    errors.resErrorsJson(res, StatusCodes.INTERNAL_SERVER_ERROR);
    console.error(err);
  }
};

const dwnPeople = async (req, res) => {
  try {
    const registros = await Persona.findAll({
      attributes: [
        "id",
        "dni",
        "nombre",
        "apellido",
        "email",
        "nacimiento",
        "telefono",
        "domicilio",
        [sequelize.col("municipio.nombre"), "nombre_municipio"],
        [sequelize.col("municipio.departamento.nombre"), "nombre_departamento"],
        [
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("fecha_alta"),
            "%Y-%m-%d %H:%i:%s"
          ),
          "fecha_alta",
        ],
      ],
      include: [
        {
          model: Municipio,
          attributes: [],
          include: [
            {
              model: Departamento,
              attributes: [],
            },
          ],
        },
      ],
      where: {
        verificado: true,
      },
      raw: true,
    });

    if (!registros) {
      throw new Error();
    }

    const fileCSV = fs.createWriteStream("registros.csv");

    csvStringifyGenerate(registros)
      .pipe(fileCSV)
      .on("finish", () => {
        res
          .status(StatusCodes.ACCEPTED)
          .download("registros.csv", "registros.csv");
      });
  } catch (err) {
    errors.resErrorsJson(res, StatusCodes.INTERNAL_SERVER_ERROR);
    console.error(err);
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("authorization");

    res.status(StatusCodes.ACCEPTED).redirect("/");
  } catch (err) {
    errors.resErrorsJson(res, StatusCodes.INTERNAL_SERVER_ERROR);
    console.error(err);
  }
};

module.exports = {
  login,
  tryLogin,
  drawPanel,
  createPdf,
  peoplePage,
  getPeople,
  dwnPeople,
  logout,
};
