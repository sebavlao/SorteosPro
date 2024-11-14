import {
  validateDni,
  validateEmail,
  validateFecha,
  validateMunicipio,
  validateNombre,
  validateApellido,
  validateTelefono,
  validateDomicilio,
} from "./registerValidation.js";
import "./header.js";

const form = document.getElementById("form");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputDni = document.getElementById("dni");
const inputFecha = document.getElementById("nacimiento");
const inputTelefono = document.getElementById("telefono");
const inputEmail = document.getElementById("email");
const inputMunicipio = document.getElementById("municipio");
const inputDomicilio = document.getElementById("domicilio");
// const inputRecaptcha = document.getElementById("recaptcha");

const spanNombre = document.getElementById("span_nombre");
const spanApellido = document.getElementById("span_apellido");
const spanDni = document.getElementById("span_dni");
const spanFecha = document.getElementById("span_nacimiento");
const spanTelefono = document.getElementById("span_telefono");
const spanMunicipio = document.getElementById("span_municipio");
const spanEmail = document.getElementById("span_email");
const spanDomicilio = document.getElementById("span_domicilio");

const arrayInputs = [
  inputApellido,
  inputDni,
  inputNombre,
  inputEmail,
  inputMunicipio,
  inputTelefono,
  inputFecha,
  inputDomicilio,
];

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const errors = arrayInputs.some((input) => {
    return (
      input.classList.contains("border-[#E30231]") || input.value.trim() == ""
    );
  });

  if (errors) {
    return;
  }

  /* const token = await grecaptcha.execute(
    "{PUBLIC_KEY}",
    { action: "submit" }
  );
  if (token) {
    inputRecaptcha.value = token;
  } */

  form.submit();
});

const addEventError = (input, span, validate) => {
  input.addEventListener("blur", () => {
    const error = validate(input.value.trim());
    if (error != null) {
      span.textContent = error;
      input.classList.add("border-[#E30231]");
    } else {
      span.textContent = "";
      input.classList.remove("border-[#E30231]");
    }
  });
};

addEventError(inputNombre, spanNombre, validateNombre);
addEventError(inputApellido, spanApellido, validateApellido);
addEventError(inputDni, spanDni, validateDni);
addEventError(inputFecha, spanFecha, validateFecha);
addEventError(inputTelefono, spanTelefono, validateTelefono);
addEventError(inputEmail, spanEmail, validateEmail);
addEventError(inputMunicipio, spanMunicipio, validateMunicipio);
addEventError(inputDomicilio, spanDomicilio, validateDomicilio);

inputDni.addEventListener("keypress", (event) => {
  if (!/^[0-9]+$/.test(event.key)) {
    event.preventDefault();
  }
});

inputTelefono.addEventListener("keypress", (event) => {
  if (!/^[0-9]+$/.test(event.key)) {
    event.preventDefault();
  }
});
