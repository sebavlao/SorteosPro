const cron = require("node-cron");
const moment = require("moment");
const Token_verificacion =
  require("../controller/registerController").Token_verificacion;
const modelos = require("../models/modelos");

const cronJob = () => {
  const { Persona } = modelos();
  cron.schedule("0 0 * * *", async () => {
    try {
      const tokens = await Token_verificacion.findAll();
      if (tokens.length > 0) {
        for (const token of tokens) {
          const tokenDateExpiration = moment(token.expiracion);
          const now = moment();
          if (now.isAfter(tokenDateExpiration)) {
            const user = await Persona.findOne({
              where: {
                email: token.email,
              },
            });
            await token.destroy();
            if (user) {
              await user.destroy();
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  });
};

module.exports = cronJob;
