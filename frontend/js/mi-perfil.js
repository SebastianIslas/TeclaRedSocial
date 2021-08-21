window.onload = async () =>{
    const response = await api.fetchGet(`usuario`);
    response.json().then(data => {
        renderDatos(data);
    });
}


/* Obtiene del elementos del DOM los que necesitamos */
const inputsDelDOM = () => {
    const idUsuario = document.getElementById('idUsuario');
    const descripcion = document.getElementById('descripcion');
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const email = document.getElementById('email');
    const ciudad = document.getElementById('ciudad');
    const pais = document.getElementById('pais');
    const estudios = document.getElementById('estudios');
    const idiomas = document.getElementById('idiomas');
    const linkedin = document.getElementById('linkedin');
    const hobbies = document.getElementById('hobbies');
    const edad = document.getElementById('edad');
    return inputs = { idUsuario, descripcion, nombre, apellido, email, ciudad, pais, edad, estudios, idiomas, linkedin, hobbies};
}

/*  Llena los inputs con los valores que por defecto los se obtuvieron de la bd */
const renderDatos = (data) => {
    const inputs = inputsDelDOM();
    inputs.idUsuario.setAttribute('value', `${data.id}`);
    if (data.descripcion) {
        inputs.descripcion.setAttribute('value', `${data.descripcion}`);
    }
    inputs.nombre.setAttribute('value', `${data.nombre}`);
    inputs.apellido.setAttribute('value', `${data.apellido}`);
    inputs.email.setAttribute('value', `${data.email}`);
    inputs.ciudad.setAttribute('value', `${data.ciudad}`);
    inputs.pais.setAttribute('value', `${data.pais}`);
    inputs.estudios.setAttribute('value', `${data.estudios}`);
    inputs.idiomas.setAttribute('value', `${data.idiomas}`);
    inputs.linkedin.setAttribute('value', `${data.linkedin}`);
    inputs.hobbies.setAttribute('value', `${data.hobbies}`);
    inputs.edad.setAttribute('value', `${data.edad}`);
    inputs.edad.options[data.edad - 17].setAttribute('selected', 'true'); 
    const formImg = document.getElementById('formImg');
    formImg.setAttribute('action', `http://localhost:3000/images?id=${data.id}`); //Agrega el id para que el servidor lo reciba
    if (data.foto) { //Si el usuario ya agrego una foto, la muestra 
        const fotoDePerfil = document.getElementById('fotoDePerfil');
        fotoDePerfil.setAttribute('src', `./assets/profile-img/${data.foto}`);
    }
    renderHabilidades(data.id); //En script habilidades.js
}

/* Recibe los datos que seran actualizados modificados */
const modificarCuenta = (event) => {
    event.preventDefault();
    const inputs = inputsDelDOM();
    const edad = document.getElementById('edad').value;
    let data = {
        id: inputs.idUsuario.value,
        descripcion: inputs.descripcion.value,
        nombre: inputs.nombre.value,
        apellido: inputs.apellido.value,
        email: inputs.email.value,
        ciudad: inputs.ciudad.value,
        pais: inputs.pais.value,
        estudios: inputs.estudios.value,
        idiomas: inputs.idiomas.value,
        linkedin: inputs.linkedin.value,
        hobbies: inputs.hobbies.value,
        edad
    }
    api.fetchPut(window.location.reload, data, 'usuario');
}

/* Deshabilita la cuenta de un usuario */
const eliminarCuenta = (event) => {
    event.preventDefault();
    const borrar = confirm('¿Estás seguro?');
    if (borrar) {
        api.fetchDelete('usuario');
        document.cookie = "token=; max-age=0"; //Cierra la sesion correspondiente
        window.location.replace("./index.html");
        alert('Usuario dado de baja con exito');
    }
}