const moment = require("moment");
const customAlphabet = require("nanoid").customAlphabet;
const DataTypes = require("sequelize").DataTypes;
const Model = require("sequelize").Model;
const sequelize = require("./conection");

const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  40
);

const modelos = () => {
  class Admin extends Model {}
  Admin.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "admin" }
  );

  class Departamento extends Model {}
  Departamento.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "departamento" }
  );

  class Municipio extends Model {}
  Municipio.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departamentoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Departamento,
          key: "id",
        },
      },
    },
    { sequelize, modelName: "municipio" }
  );

  class Persona extends Model {}
  Persona.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [7, 8],
        },
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 90],
        },
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 90],
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          len: [1, 50],
        },
      },
      nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          len: [7, 12],
          isAfter: "1907-01-01",
          isBefore: (value) =>
            value <= moment().subtract(18, "years").format("YYYY-MM-DD"),
        },
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 15],
        },
      },
      domicilio: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100],
        },
      },
      verificado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      municipioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Municipio,
          key: "id",
        },
      },
      fecha_alta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    { sequelize, modelName: "persona" }
  );

  class Token_verificacion extends Model {}
  Token_verificacion.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
        defaultValue: () => nanoid(),
        unique: true,
      },
      expiracion: {
        type: DataTypes.DATE,
        defaultValue: () =>
          sequelize.literal("CURRENT_TIMESTAMP + INTERVAL 24 HOUR"),
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          len: [1, 50],
        },
      },
    },
    { sequelize, modelName: "Token_verificacion" }
  );

  Departamento.hasMany(Municipio, { foreignKey: "departamentoId" });
  Municipio.belongsTo(Departamento, { foreignKey: "departamentoId" });
  Municipio.hasMany(Persona, { foreignKey: "municipioId" });
  Persona.belongsTo(Municipio, { foreignKey: "municipioId" });

  return { Municipio, Persona, Admin, Token_verificacion, Departamento };
};

module.exports = modelos;
