/* Validacion correspondiente a una entrada de texto (input) */
function validarTxt(data) {
    if(data === null || data == 0 || /^\s+$/.test(data)) {
        return true;
    } else {
        return false;
    }
}

/* Validacion correspondiente a un email */
function validarEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/.test(email)){
        return false;
    } else {
        return true;
    }
}

/* Validacion correspondiente a una contraseña */
function validarPassword(password) {
    if ( password.length < 8 ) {
        return true;
    } else {
        return false;
    }
}

/* Valida todos los campos */
function validarSignIn(data) {
    if (validarTxt(data.nombre)) {
        alert('Verificar el campo nombre');
        return false;
    }
    if (validarTxt(data.apellido)) {
        alert('Verificar el campo apellidos');
        return false;
    }
    if (validarEmail(data.email)) {
        alert('Verificar el campo email');
        return false;
    }
    if (validarPassword(data.password)) {
        alert('La contraseña debe tener una longitud mayor a 8');
        return false;
    } 
    if (validarTxt(data.ciudad)) {
        alert('Verificar el campo residencia');
        return false;
    }
    if (validarTxt(data.pais)) {
        alert('Verificar el campo residencia');
        return false;
    }
    if (data.categoria === 'categoria') {
        alert('Debes seleccionar una categoria');
        return false;
    }
    if (data.rol === 'rol') {
        alert('Debes seleccionar un rol');
        return false;
    }
    if (data.edad === 'edad') {
        alert('Debes seleccionar una edad');
        return false;
    }
    if (validarTxt(data.estudios)) {
        alert('Verificar el campo estudios');
        return false;
    }
    if (validarTxt(data.idiomas)) {
        alert('Verificar el campo idiomas');
        return false;
    }
    if (validarTxt(data.linkedin)) {
        alert('Verificar el campo linkedin');
        return false;
    }
    if (validarTxt(data.hobbies)) {
        alert('Verificar el campo hobbies');
        return false;
    }
    return true;
}

/* Validacion correspondiente a una entrada de texto (input) */
function validarOpinion(data) {
    if(data === null || data == 0 || /^\s+$/.test(data) || data.length <15) {
        alert('La opinion debe ser de al menos 15 caracteres');
        return false;
    } else{
        return true;
    }
}
