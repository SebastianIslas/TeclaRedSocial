window.onload = async function () {
    cambiarNavBar();
    cargarDatos();
}

/* Cambiara la barra de navegacion si el usuario está loggeado */
const cambiarNavBar = () => {
    const cookie = document.cookie.split('=');
    /* Diseño de la nav bar en funcion de que el usuario esté logeado */
    if (cookie[0] === 'token') {
        const ulNavbar = document.getElementById('ulNavbar');
        const liLog = document.getElementById('liLog');
        ulNavbar.removeChild(liLog); /* Se elimina la opcion login */

        /* Inserta la opcion 'log out' a la barra de navegacion */
        const liLogout = document.createElement('li');
        liLogout.classList = 'nav-item mx-0 mx-lg-1';
        const linkLogout = document.createElement('a');
        linkLogout.classList = 'nav-link py-3 px-0 px-lg-3 rounded';
        linkLogout.innerHTML = `Logout <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M10.604 1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.75.75 0 01-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1zM3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z"></path></svg>`;
        linkLogout.setAttribute('href', './index.html');
        linkLogout.addEventListener('click', function() {
            document.cookie = "token=; max-age=0";
        })
        liLogout.appendChild(linkLogout);
        ulNavbar.appendChild(liLogout);
    } 
}

const cargarDatos = async () => {
    const token = document.cookie.split('=')[1];
    const response = await fetch(`http://localhost:3000/usuario`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
    response.json().then(data => {
        renderDatos(data);
    });
}

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
    formImg.setAttribute('action', `http://localhost:3000/images?id=${data.id}`);
    if (data.foto) {
        const fotoDePerfil = document.getElementById('fotoDePerfil');
        fotoDePerfil.setAttribute('src', `./assets/profile-img/${data.foto}`);
    }
}

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

const eliminarCuenta = (event) => {
    event.preventDefault();
    const borrar = confirm('¿Estás seguro?');
    if (borrar) {
        const idUsuario = document.getElementById('idUsuario').value;
        fetchEliminar(idUsuario);
        document.cookie = "token=; max-age=0";
        window.location.replace("./index.html");
        alert('Usuario dado de baja con exito');
    }
}

const fetchEliminar = async (idUsuario) => {
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