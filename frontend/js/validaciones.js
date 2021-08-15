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
        return;
    }
    if (validarTxt(data.apellido)) {
        alert('Verificar el campo apellidos');
        return;
    }
    if (validarEmail(data.email)) {
        alert('Verificar el campo email');
        return;
    }
    if ( data.password.length < 8 ) {
        alert('La contraseña debe tener una longitud mayor a 8');
        return;
    } 
    if (validarTxt(data.ciudad)) {
        alert('Verificar el campo residencia');
        return;
    }
    if (validarTxt(data.pais)) {
        alert('Verificar el campo residencia');
        return;
    }
    if (data.categoria === 'categoria') {
        alert('Debes seleccionar una categoria');
        return;
    }
    if (data.rol === 'rol') {
        alert('Debes seleccionar un rol');
        return;
    }
    if (data.edad === 'edad') {
        alert('Debes seleccionar una edad');
        return;
    }
    if (validarTxt(data.estudios)) {
        alert('Verificar el campo estudios');
        return;
    }
    if (validarTxt(data.idiomas)) {
        alert('Verificar el campo idiomas');
        return;
    }
    if (validarTxt(data.linkedin)) {
        alert('Verificar el campo linkedin');
        return;
    }
    if (validarTxt(data.hobbies)) {
        alert('Verificar el campo hobbies');
        return;
    }
}