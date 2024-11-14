const Sequelize = require("sequelize").Sequelize;
const config = require("../../config/config");

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: "mariadb",
    timezone: "-03:00",
    dialectOptions: {
      useUTC: true,
    },
    define: {
      timestamps: false,
    },
  }
);

module.exports = sequelize;
