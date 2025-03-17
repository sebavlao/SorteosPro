const checkearEntradas = async (
  dni,
  email,
  municipio,
  errors,
  MunicipioModel,
  PersonaModel
) => {
  const municipioEncontrado = await MunicipioModel.findOne({
    where: { nombre: municipio },
  });

  if (municipioEncontrado == null) {
    throw new errors.credentialsError(
      "Municipio invalido. Elegir uno de los municipios en la lista."
    );
  }

  const personaConDni = await PersonaModel.findOne({ where: { dni: dni } });
  const personaConCorreo = await PersonaModel.findOne({
    where: { email: email },
  });

  if (personaConDni?.verificado) {
    throw new errors.credentialsError("Dni ya registrado.");
  }
  if (personaConCorreo?.verificado) {
    throw new errors.credentialsError("Email ya registrado.");
  }

  return { personaConDni, personaConCorreo, municipioEncontrado };
};

module.exports = { checkearEntradas };
