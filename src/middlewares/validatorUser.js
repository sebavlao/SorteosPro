const validator = require("express-validator");
const moment = require("moment");
// const captchaValidator = require("./captchaValidator");

const validatorUser = () => {
  const fechaMinima = moment("1907-01-01", "YYYY-MM-DD");
  const fechaMaxima = () => moment().subtract(18, "years");

  return [
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
      .check("telefono")
      .notEmpty()
      .bail()
      .isMobilePhone()
      .bail()
      .isLength({ min: 7, max: 15 })
      .escape(),
    validator
      .check("domicilio")
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/)
      .bail()
      .isLength({ min: 1, max: 100 })
      .escape(),
    validator
      .check("municipio")
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s0-9]+$/)
      .escape(),
    validator.check("tyc").equals("accept"),

    async (req, res, next) => {
      /*
      const captchaValidate = await captchaValidator(
        req.body["g-recaptcha-response"]
      );
      if (!captchaValidate.data.success) {
        return res.json({
          err: "No ha pasado o ha expirado el captcha. Por favor volver a intentar",
        });
      }
      */
      let errors = validator.validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
      }
      next();
    },
  ];
};

module.exports = validatorUser;
