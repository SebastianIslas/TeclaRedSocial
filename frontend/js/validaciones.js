
function validarTxt(data) {
    if(data === null || data == 0 || /^\s+$/.test(data)) {
        return true;
    } else {
        return false;
    }
}

function validarEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/.test(email)){
        return false;
    } else {
        return true;
    }
}

function validarPassword(password) {
    if ( password.length < 8 ) {
        return true;
    } else {
        return false;
    }
}

function validarSignIn(nombre, apellido, email, password, residencia, edad, estudios, idiomas, linkedin, hobbies) {
    if (validarTxt(nombre)) {
        alert('Verificar el campo nombre');
        return;
    }
    if (validarTxt(apellido)) {
        alert('Verificar el campo apellidos');
        return;
    }
    if (validarEmail(email)) {
        alert('Verificar el campo email');
        return;
    }
    if ( password.length < 8 ) {
        alert('La contraseña debe tener una longitud mayor a 8');
        return;
    } 
    if (validarTxt(residencia)) {
        alert('Verificar el campo residencia');
        return;
    }
    if (edad === 'edad') {
        alert('Debes seleccionar una edad');
        return;
    }
    if (validarTxt(estudios)) {
        alert('Verificar el campo estudios');
        return;
    }
    if (validarTxt(idiomas)) {
        alert('Verificar el campo idiomas');
        return;
    }
    if (validarTxt(linkedin)) {
        alert('Verificar el campo linkedin');
        return;
    }
    if (validarTxt(hobbies)) {
        alert('Verificar el campo hobbies');
        return;
    }
}