const token = document.cookie.split('=')[1];

/* Cambiara la barra de navegacion si el usuario está loggeado */
const cambiarNavBar = () => {
    const cookie = document.cookie.split('=');
    /* Diseño de la nav bar en funcion de que el usuario esté logeado */
    if (cookie[0] === 'token') {
        const ulNavbar = document.getElementById('ulNavbar');
        const liLog = document.getElementById('liLog');
        ulNavbar.removeChild(liLog); /* Se elimina la opcion login */
        /* Inserta opcion de mi perfil */
        const liPerfil = document.createElement('li');
        liPerfil.classList = 'nav-item mx-0 mx-lg-1';
        const linkPerfil = document.createElement('a');
        linkPerfil.classList = 'nav-link py-3 px-0 px-lg-3 rounded';
        linkPerfil.innerHTML = `Mi perfil`;
        linkPerfil.setAttribute('href', './mi-perfil.html');
        liPerfil.appendChild(linkPerfil);
        ulNavbar.appendChild(liPerfil);

        /* Insertamos la notificaciones */
        const liAlerta = document.createElement('li');
        liAlerta.classList = 'nav-item mx-0 mx-lg-1 liAlerta';
        const linkAlerta = document.createElement('a');
        linkAlerta.classList = 'nav-link py-3 px-0 px-lg-3 rounded';
        linkAlerta.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
        </svg>`;
        linkAlerta.setAttribute('href', './notificaciones.html');
        contadorNotificaciones(linkAlerta);
        liAlerta.appendChild(linkAlerta); 
        ulNavbar.appendChild(liAlerta);

        /* Inserta la opcion 'log out' a la barra de navegacion */
        const liLogout = document.createElement('li');
        liLogout.classList = 'nav-item mx-0 mx-lg-1';
        const linkLogout = document.createElement('a');
        linkLogout.classList = 'nav-link py-3 px-0 px-lg-3 rounded';
        linkLogout.innerHTML = `Logout <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
      </svg>`;
        linkLogout.setAttribute('href', './index.html');
        linkLogout.addEventListener('click', function() {
            document.cookie = "token=; max-age=0";
        })
        liLogout.appendChild(linkLogout);
        ulNavbar.appendChild(liLogout);
    }
}

/* Solicita al backend la cantidad de notificaciones que tiene un usuario y las muestra en la navbar */
const contadorNotificaciones = async (linkAlerta) => {
  const response = await api.fetchGet('solicitud')
  response.json().then(data => {
    if (data.length > 0) {
      linkAlerta.innerHTML += ` ${data.length}`;
    }
  });
}

cambiarNavBar();
