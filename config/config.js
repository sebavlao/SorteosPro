require("dotenv/config");
const PORT = process.env.PORT || 5506;
const API_PROJECT = process.env.API_PROJECT;

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// const CAPTCHA_URL = process.env.CAPTCHA_URL;
// const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET;

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_PORT = process.env.SMTP_PORT;

module.exports = {
  PORT,
  DB_HOST,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  // CAPTCHA_URL,
  // CAPTCHA_SECRET,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_USER,
  SMTP_PORT,
  API_PROJECT,
};
