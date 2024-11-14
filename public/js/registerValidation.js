export const validateDni = (dni) => {
    const regex = /^[0-9]+$/;

    if (dni == "") { 
        return "El dni no puede estar vacío" 
    }

    if (!regex.test(dni)) { 
        return "Solo se aceptan números" 
    }

    if (dni.length > 8 || dni.length < 7) { 
        return "Solo se acepta un formato de dni valido" 
    }

    return null
}

export const validateNombre = (nombre) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/

    if (nombre == "") { 
        return "El nombre no puede estar vacío" 
    }

    if (!regex.test(nombre)) { 
        return "Hay carácteres invalidos"
    }

    if (nombre.length > 50) {
        return "No se pueden superar los 50 caracteres"
    }

    return null
}

export const validateApellido = (apellido) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/

    if (apellido == "") { 
        return "El apellido no puede estar vacio" 
    }

    if (!regex.test(apellido)) { 
        return "Hay carácteres invalidos"
    }

    if (apellido.length > 50) {
        return "No se pueden superar los 50 caracteres" 
    }

    return null
}

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email == "") { 
        return "El email no puede estar vacio" 
    }

    if (!regex.test(email)) { 
        return "Formato de email invalido"
    }

    if (email.length > 50 || email.length < 1) {
        return "Demasiados caracteres, Intentar con otro email"
    }

    return null
}

export const validateFecha = (fecha) => {
    const regex = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
    const fechaMinima = new Date(1907, 1, 1);

    if (fecha == "") { 
        return "La fecha no puede estar vacia"
    }

    if (!regex.test(fecha)) { 
        return "Formato de fecha invalida"
    }

    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaIngresada = new Date(anio, mes - 1, dia);

    if (isNaN(fechaIngresada.getTime())) {
        return "Fecha inválida";
    }

    const fechaHace18Anios = new Date();
    fechaHace18Anios.setFullYear(fechaHace18Anios.getFullYear() - 18);

    if (fechaIngresada.getMonth() === 1 && fechaIngresada.getDate() === 29) {
        const year = fechaHace18Anios.getFullYear();
        if (!((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))) {
            fechaHace18Anios.setMonth(1);
            fechaHace18Anios.setDate(28);
        }
    }

    if (fechaIngresada > fechaHace18Anios || fechaIngresada < fechaMinima) {
        return "Tienes que ser mayor a 18 años y no ser menor a la fecha 01/01/1907";
    }

    return null
}

export const validateTelefono = (telefono) => {
    const regex = /^[0-9]+$/;

    if (telefono == "") {
        return "El telefono no puede estar vacio"
    }

    if (!regex.test(telefono)) {
        return "Proporcione un número de telefono valido"
    }

    if (telefono.length > 15 || telefono.length < 7) {
        return "Proporcione un telefono valido"
    }

    return null
}

export const validateDomicilio = (domicilio) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s]+$/

    if (domicilio == "") { 
        return "El domicilio no puede estar vacio" 
    }

    if (!regex.test(domicilio)) { 
        return "Hay carácteres invalidos"
    }

    if (domicilio.length > 100) {
        return "No se pueden superar los 100 caracteres" 
    }

    return null
}

export const validateMunicipio = (municipio) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s0-9]+$/

    if (municipio == "") { 
        return "El municipio no puede estar vacio"
    }

    if (!regex.test(municipio)) { 
        return "Provea un municipio valido"
    }

    return null
}