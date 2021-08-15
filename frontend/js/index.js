window.onload = function() {
    const cookie = document.cookie.split('=');
    /* Diseño de la nav bar en funcion de que el usuario esté logeado */
    if (cookie[0] === 'token') {
        const ulNavbar = document.getElementById('ulNavbar'); //Elemento encargado de listar los elementos de la navbar
        const liLog = document.getElementById('liLog'); //Elemento de la lista con la opcion "login"
        ulNavbar.removeChild(liLog); /* Se elimina la opcion login */
        
        /* Inserta la opcion 'mi perfil' a la barra de navegacion */
        const liPerfil = document.createElement('li'); //Crea un elemento de lista para la opcion "mi perfil"
        liPerfil.classList = 'nav-item mx-0 mx-lg-1';
        const linkPerfil = document.createElement('a'); //Crea un link para insertar en "mi perfil"
        linkPerfil.classList = 'nav-link py-3 px-0 px-lg-3 rounded';
        linkPerfil.innerHTML = `Mi perfil <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg>`;
        linkPerfil.setAttribute('href', './mi-perfil.html');
        liPerfil.appendChild(linkPerfil); 
        ulNavbar.appendChild(liPerfil);

        /* Inserta la opcion 'log our' a la barra de navegacion */
        const liLogout = document.createElement('li'); //Crea un elemento de lista para la opcion "log out"
        liLogout.classList = 'nav-item mx-0 mx-lg-1'; 
        const linkLogout = document.createElement('a'); //Crea un link para insertar en "log out"
        linkLogout.classList = 'nav-link py-3 px-0 px-lg-3 rounded';
        linkLogout.innerHTML = `Logout <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M10.604 1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.75.75 0 01-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1zM3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z"></path></svg>`;
        linkLogout.setAttribute('href', './index.html');
        linkLogout.addEventListener('click', function() {
            document.cookie = "token=; max-age=0"; //Si el usuario cerro sesion, se elimina la cookie correspondiente
        })
        liLogout.appendChild(linkLogout);
        ulNavbar.appendChild(liLogout);
    }
};