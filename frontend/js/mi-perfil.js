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
    const cookie = document.cookie.split('=');
    const token = cookie[1];
    const response = await fetch(`http://localhost:3000/usuario?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
    });
    response.json().then(data => {
        renderDatos(data);
    });
}

const renderDatos = (data) => {
    const idUsuario = document.getElementById('idUsuario');
    idUsuario.setAttribute('value', data.id);
    const nombre = document.getElementById('nombre');
    nombre.setAttribute('value', `${data.nombre}`);
    const apellido = document.getElementById('apellido');
    apellido.setAttribute('value', `${data.apellido}`);
    const email = document.getElementById('email');
    email.setAttribute('value', `${data.email}`);
    const ciudad = document.getElementById('ciudad');
    ciudad.setAttribute('value', `${data.ciudad}`);
    const pais = document.getElementById('pais');
    pais.setAttribute('value', `${data.pais}`);
    const estudios = document.getElementById('estudios');
    estudios.setAttribute('value', `${data.estudios}`);
    const idiomas = document.getElementById('idiomas');
    idiomas.setAttribute('value', `${data.idiomas}`);
    const linkedin = document.getElementById('linkedin');
    linkedin.setAttribute('value', `${data.linkedin}`);
    const hobbies = document.getElementById('hobbies');
    hobbies.setAttribute('value', `${data.hobbies}`);
    const edad = document.getElementById('edad');
    edad.setAttribute('value', `${data.edad}`);
    edad.options[data.edad - 17].setAttribute('selected', 'true'); 
    const formImg = document.getElementById('formImg');
    formImg.setAttribute('action', `http://localhost:3000/images?id=${data.id}`);
    if (data.foto) {
        const fotoDePerfil = document.getElementById('fotoDePerfil');
        fotoDePerfil.setAttribute('src', `./assets/profile-img/${data.foto}`);
    }
}

const actualizarDatos = (event) => {
    event.preventDefault();
    const id = document.getElementById('idUsuario').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const ciudad = document.getElementById('ciudad').value;
    const pais = document.getElementById('pais').value;
    const estudios = document.getElementById('estudios').value;
    const idiomas = document.getElementById('idiomas').value;
    const linkedin = document.getElementById('linkedin').value;
    const hobbies = document.getElementById('hobbies').value;
    const edad = document.getElementById('edad').value;
    let data = {
        id,
        nombre,
        apellido,
        email,
        ciudad,
        pais,
        estudios,
        idiomas,
        linkedin,
        hobbies,
        edad
    }
    fetchActualizar(data)
}

const fetchActualizar = async (data) => {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${data.id}`, {
          method: 'PUT',
          headers: {
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