const getReasonPhrase = require("http-status-codes").getReasonPhrase;

const errors = {
  400: "La solicitud realizada no puede ser procesada",
  403: "Verificación de correo caducada o jamas creada",
  429: "Ha realizado demasiadas peticiones, intente nuevamente más tarde",
  500: "Error realacionado con el servidor",
};

class credentialsError extends Error {
  constructor(message) {
    super(message);
  }
}

const resErrorsJson = (res, status) => {
  return res.status(
    res.status(status).json({
      status: status,
      message: errors.status,
      reason: getReasonPhrase(status),
    })
  );
};

module.exports = { resErrorsJson, credentialsError };
