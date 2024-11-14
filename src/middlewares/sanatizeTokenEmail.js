const validator = require("express-validator");
const StatusCodes = require("http-status-codes").StatusCodes;

const sanatizeTokenEmail = () => {
  return [
    validator
      .check("token")
      .notEmpty()
      .bail()
      .isString()
      .bail()
      .matches(/^[A-Za-z0-9]+$/)
      .bail()
      .isLength({ min: 40, max: 40 })
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

module.exports = sanatizeTokenEmail;
