window.onload = async () =>{
    //Datos de "ver perfil" de usuarios en 'encontrar tecler'
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id');
    cargarDatos(id);
    /* Habilita la opción de valorar y opinion si esta logeado y no es el mismo usuario  */
    const cookie = document.cookie.split('=');
    if (cookie[0] === 'token') {
        const response = await api.fetchGet(`usuario`);
        response.json().then(data => {
            if(data.id == id){
                document.getElementById('botonValorar').style.display = 'none';
            } else{
                document.getElementById('botonValorar').setAttribute('onclick','habilidadesValorarRender('+id+')');
                document.getElementById('formOpinar').style.display = 'block';
                document.getElementById('botonOpinion').setAttribute('onclick','opinarSobreTecler('+id+')');

            }
        });
        revisarSolicitud(id);
        revisarAmistad(id);
    }
}


/* Obtiene los datos del usuario seleccionado */
const cargarDatos = async (id) => {
    const response = await api.fetchGet(`usuario/${id}`);
    response.json().then(data => {
        renderDatos(data);
    });
    const opiniones = await api.fetchGet(`usuario/opiniones/${id}`);
    opiniones.json().then(data => {
        renderOpiniones(data);
    });
}

const renderDatos = (data) =>{
    //Presentacion
    document.getElementById('nombre').textContent = data.nombre + " " + data.apellido;
    document.getElementById('categoria').textContent = data.categoria;
    document.getElementById('descripcion').textContent = data.descripcion;
    document.getElementById('email').textContent = data.email;
    document.getElementById('linkedin').textContent = data.linkedin;
    if (data.foto) { //Si el usuario ya agrego una foto, la muestra 
        document.getElementById('foto').src = "assets/profile-img/" +data.foto;
    }
    //Datos generales
    document.getElementById('edad').textContent = data.edad;
    document.getElementById('ubicacion').textContent = data.pais + ", " + data.ciudad;
    document.getElementById('estudios').textContent = data.estudios;
    document.getElementById('idiomas').textContent = data.idiomas;
    document.getElementById('hobbies').textContent = data.hobbies;
    renderHabilidades(data.id); //En script habilidades.js
}


//Crea form para valorar las habilidades
const habilidadesValorarRender = async (id) =>{
    //Obtiene habilidades de usuario a valorar
    const response = await api.fetchGet(`habilidades/${id}`);
    let templateLi = document.querySelector('#form-hab-li').content;
    let ul_hab = document.getElementById('ul-form-habilidad');
    const fragment = document.createDocumentFragment();
    
    response.json().then(habilidades => {
        habilidades.forEach(habilidad => {
            templateLi.querySelector('span').textContent = habilidad.titulo;
            templateLi.querySelector('select').setAttribute('name',habilidad.id);
            const clone = templateLi.cloneNode(true);
            fragment.appendChild(clone);
        })
        ul_hab.appendChild(fragment);
    });
    document.getElementById('valorar').setAttribute('onclick','valorar('+id+')');
}


//Recibe id de usuario a valorar
const valorar = async (id) => {
    const cookie = document.cookie.split('=');
    let formulario = document.getElementById('formularioValorar');
    let formData = new FormData(formulario);
    let data = {}
    for (p of formData) {
        data[p[0]] = p[1];
    }
    const response = await api.fetchPost( function(){
        alert('Usuario vevaluado con exito')
    }, data, `habilidades/${id}/validar` )
    window.location.reload();
}

//Recibe id de usuario a valorar
const opinarSobreTecler = async (id) => {
    let opinion = document.getElementById('opinion').value;
    if(validarOpinion(opinion)){
        console.log("entro")
        let data = {
            opinion: opinion
        }
        api.fetchPost(function(){
            alert('Tu opinion ha sido recibida con exito')
        }, data, `usuario/opinar/${id}`);
    }
}

const renderOpiniones = async (data) => {
    console.log(data)
    let templateLi = document.querySelector('#opinones-li').content;
    let ul_opiniones = document.getElementById('opiniones-recibidas');
    const fragment = document.createDocumentFragment();
    data.forEach(opinion => {
        templateLi.querySelector('h3').textContent = opinion.id_evaluador;
        templateLi.querySelector('textarea').textContent = opinion.opinion;
        const clone = templateLi.cloneNode(true);
        fragment.appendChild(clone);
    })
    ul_opiniones.appendChild(fragment);
}

/* Accion cuando el usuario da click en 'agregar' */
const enviarSolicitud = async (event) => {
    event.preventDefault();
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id');
    const data = { id };
    api.fetchPost(window.location.reload(true), data, 'solicitud');
}

/* Verifica en el servidor si ya existe una solicitud de amistad */
const revisarSolicitud = async (id) => {
    const response = await api.fetchGet(`solicitud/${id}`);
    if (response.status === 200) {
        solicitudEnviada(id); //Si existe una solicitud, cambiamos el boton
    }
}

/* Cambiamos el boton en funcion de si ya se envio una solicitud de amistad*/
const solicitudEnviada = (id) => {
    const botonAgregar = document.getElementById('botonAgregar');
    botonAgregar.innerHTML = " Cancelar Solicitud";
    botonAgregar.className = 'enviada';
    botonAgregar.removeAttribute('onclick');
    botonAgregar.setAttribute('onclick', `cancelarSolicitud(${id})`);
}

/* Funcion para cancelar una solicitud de amistad*/
const cancelarSolicitud = async (id) => {
    await api.fetchDelete(`solicitud/cancelar/${id}`);
    window.location.reload(true);
}

/* Verifica en el servidor si ya existe una amistad de cierto perfil */
const revisarAmistad = async (id) => {
    const response = await api.fetchGet(`amistad/${id}`);
    if (response.status === 200) {
        amistadCreada(id); //Si existe una solicitud, cambiamos el boton
    }
}

/* Cambiamos el boton en funcion de si ya son amigos*/
const amistadCreada = (id) => {
    const botonAgregar = document.getElementById('botonAgregar');
    botonAgregar.innerHTML = " Amigos";
    botonAgregar.className = 'amigos';
    botonAgregar.removeAttribute('onclick');
    botonAgregar.setAttribute('onclick', `eliminarAmistad(${id})`);
}

const eliminarAmistad = async (id) => {
    
    if (window.confirm("¿Eliminar de tus amigos?")) {
        await api.fetchDelete(`amistad/${id}`);
    }
    window.location.reload(true);
}

