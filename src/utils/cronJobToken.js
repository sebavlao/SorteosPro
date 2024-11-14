const cron = require("node-cron");
const moment = require("moment");
const Token_verificacion =
  require("../controller/registerController").Token_verificacion;

const cronJob = () => {
  console.log("empezando...");
  cron.schedule("0 0 * * *", async () => {
    try {
      const tokens = await Token_verificacion.findAll();
      if (tokens.length > 0) {
        for (const token of tokens) {
          const tokenDateExpiration = moment(token.expiracion);
          const now = moment();
          if (now.isAfter(tokenDateExpiration)) {
            await token.destroy();
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  });
};

module.exports = cronJob;
