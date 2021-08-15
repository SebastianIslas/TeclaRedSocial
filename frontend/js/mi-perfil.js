window.onload = async () =>{
    cargarDatos();
}

/* Interactua con el server para traer la informacion de un usuario */
const cargarDatos = async () => {
    const token = document.cookie.split('=')[1];
    const response = await fetch(`http://localhost:3000/usuario`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, //Mandamos el token para que el server lo valide
            'Content-Type': 'application/json'
        },
    });
    response.json().then(data => {
        renderDatos(data);
    });
}

/* Obtiene del DOM los que necesitamos */
const inputsDelDOM = () => {
    const idUsuario = document.getElementById('idUsuario');
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
    return inputs = { idUsuario, nombre, apellido, email, ciudad, pais, edad, estudios, idiomas, linkedin, hobbies};
}

/*  Poner por defecto los valores que se obtuvieron de la bd */
const renderDatos = (data) => {
    const inputs = inputsDelDOM();
    inputs.idUsuario.setAttribute('value', `${data.id}`);
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
}

/* Recibe los datos que fueron modificados */
const actualizarDatos = (event) => {
    event.preventDefault();
    const inputs = inputsDelDOM();
    const edad = document.getElementById('edad').value;
    let data = {
        id: inputs.idUsuario.value,
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
    fetchActualizar(data);
}

/* Interactua con el servidor para actualiza los datos de un usuario */
const fetchActualizar = async (data) => {
    const token = document.cookie.split('=')[1];
    try {
        const response = await fetch(`http://localhost:3000/usuario`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'           
          },
          body: JSON.stringify(data)
        });
        if (response.status === 200) {
            response.json().then(data => {
                alert('Usuario modificado con exito')
            });
        } else {
            response.json().then(json => {
                alert(json);
                return;
            });
        }
    } catch (err) {
        console.log(err);
    }
}

/* Deshabilita la cuenta de un usuario */
const eliminarCuenta = (event) => {
    event.preventDefault();
    const borrar = confirm('¿Estás seguro?');
    if (borrar) {
        const idUsuario = document.getElementById('idUsuario').value;
        fetchEliminar();
        document.cookie = "token=; max-age=0"; //Cierra la sesion correspondiente
        window.location.replace("./index.html");
        alert('Usuario dado de baja con exito');
    }
}

/* Interactua con el server para eliminar una cuenta */
const fetchEliminar = async () => {
    const token = document.cookie.split('=')[1];
    try {
        await fetch(`http://localhost:3000/usuario`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    } catch (err) {
        console.log(err);
    }
}