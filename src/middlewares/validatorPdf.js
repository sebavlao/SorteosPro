const validator = require("express-validator");
const StatusCodes = require("http-status-codes").StatusCodes;
const moment = require("moment");

const validatorPdf = () => {
  const fechaMinima = moment("1907-01-01", "YYYY-MM-DD");
  const fechaMaxima = () => moment().subtract(18, "years");

  return [
    validator
      .check("id")
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .isLength({ min: 36, max: 36 })
      .escape(),
    validator
      .check("dni")
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .matches(/^[0-9]+$/)
      .isLength({ min: 7, max: 8 })
      .escape(),
    validator
      .check("nombre")
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)
      .bail()
      .isLength({ min: 1, max: 90 })
      .escape(),
    validator
      .check("apellido")
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)
      .bail()
      .isLength({ min: 1, max: 90 })
      .escape(),
    validator
      .check("email")
      .notEmpty()
      .bail()
      .isEmail()
      .bail()
      .isLength({ min: 1, max: 50 })
      .escape(),
    validator
      .check("nacimiento")
      .notEmpty()
      .bail()
      .isDate()
      .custom((value) => {
        if (!moment(value).isBetween(fechaMinima, fechaMaxima(), null, [])) {
          throw new Error(`Error en la validación`);
        }
        return true;
      })
      .escape(),
    validator
      .check("mount")
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .matches(/^\+?[0-9]+(?:\.[0-9]*)?$/)
      .bail()
      .isLength({ min: 3, max: 15 })
      .escape(),

    (req, res, next) => {
      let errors = validator.validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: errors.array() });
      }
      next();
    },
  ];
};

module.exports = validatorPdf;
