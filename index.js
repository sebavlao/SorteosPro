const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const crypto = require("crypto");
const rateLimit = require("express-rate-limit");
const sequelize = require("./src/models/conection");
const adminPanelRouter = require("./src/routes/adminPanelRoutes");
const routerRegister = require("./src/routes/registerRoutes");
const config = require("./config/config");
const cronJob = require("./src/utils/cronJobToken.js");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.",
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(limiter);
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString("base64");
  next();
});
app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": [
          "'self'",
          // "https://www.google.com/recaptcha/",
          // "https://www.gstatic.com/recaptcha/",
          "https://cdn.jsdelivr.net/",

          (req, res) => `'nonce-${res.locals.nonce}'`,
        ],
        "frame-src": [
          "'self'",
          // "https://www.google.com/recaptcha/",
          // "https://recaptcha.google.com/recaptcha/",
          "https://cdn.jsdelivr.net/",
        ],
      },
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/adminsecret", adminPanelRouter);
app.use(routerRegister);

const authDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a la db");
    app.listen(config.PORT);
  } catch (err) {
    console.error(`Unable to connect: ${err}`);
  }
};

cronJob();
authDB();
