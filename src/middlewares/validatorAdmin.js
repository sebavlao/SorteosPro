const validator = require("express-validator");
// const captchaValidator = require("./captchaValidator");

const validatorAdmin = () => {
  return [
    validator
      .check("usuario")
      .notEmpty()
      .bail()
      .isString()
      .isLength({ min: 1, max: 255 })
      .escape(),
    validator
      .check("password")
      .notEmpty()
      .bail()
      .isString()
      .isLength({ min: 1, max: 255 })
      .escape(),

    async (req, res, next) => {
      /*
      const captchaValidate = await captchaValidator(
        req.body["g-recaptcha-response"]
      );
      if (!captchaValidate.data.success) {
        return res.json({ err: "No ha completado o ha expirado el captcha" });
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

module.exports = validatorAdmin;
