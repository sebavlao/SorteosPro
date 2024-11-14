const axios = require("axios");
const config = require("../../config/config");

const captchaValidator = (token) => {
  return axios.post(config.CAPTCHA_URL, null, {
    params: {
      secret: config.CAPTCHA_SECRET,
      response: token,
    },
  });
};

module.exports = captchaValidator;
