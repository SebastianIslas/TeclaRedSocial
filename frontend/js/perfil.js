window.onload = async () =>{
    //Datos de "ver perfil" de usuarios en 'encontrar tecler'
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id');
    cargarDatos(id);
    /* Habilita la opción de valorar si esta logeado y no es el mismo usuario  */
    const cookie = document.cookie.split('=');
    if (cookie[0] === 'token') {
        const response = await fetch(`http://localhost:3000/usuario`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookie[1]}`, //Mandamos el token para que el server lo valide
                'Content-Type': 'application/json'
            },
        });
        response.json().then(data => {
            if(data.id == id){
                document.getElementById('botonValorar').style.display = 'none';
            } else{
                document.getElementById('botonValorar').setAttribute('onclick','habilidadesValorarRender('+id+')');
            }
        });    
    }
    revisarSolicitud(id);
    revisarAmistad(id);
}


/* Obtiene los datos del usuario seleccionado */
const cargarDatos = async (id) => {
    const response = await fetch(`http://localhost:3000/usuario/`+id);
    response.json().then(data => {
        renderDatos(data);
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
    const response = await fetch('http://localhost:3000/habilidades/'+id);
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
    const response = await fetch('http://localhost:3000/habilidades/'+id+'/validar',{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cookie[1]}`, //Mandamos el token del usuario que valorara
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

/* Accion cuando el usuario da click en 'seguir' */
const enviarSolicitud = async (event) => {
    event.preventDefault();
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id');
    const data = { id };
    try {
        const response = await fetch('http://localhost:3000/solicitud', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, //Mandamos el token para que el server lo valide
            'Content-Type': 'application/json'           
          },
          body: JSON.stringify(data)
        });
        if (response.status === 201) {
            response.json().then(json => {
                alert('Solicitud enviada');
                window.location.reload(true);
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

/* Verifica en el servidor si ya existe una solicitud de amistad */
const revisarSolicitud = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/solicitud/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, //Mandamos el token para que el server lo valide
            'Content-Type': 'application/json'           
          },
        });
        if (response.status === 200) {
            solicitudEnviada(id); //Si existe una solicitud, cambiamos el boton
        }
    } catch (err) {
        console.log(err);
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
    try {
        const response = await fetch(`http://localhost:3000/solicitud/cancelar/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`, //Mandamos el token para que el server lo valide
            'Content-Type': 'application/json'           
          },
        });
        if (response.status === 200) {
            response.json().then(json => {
                alert(json);
                window.location.reload(true);
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

/* Verifica en el servidor si ya existe una amistad de cierto perfil */
const revisarAmistad = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/amistad/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, //Mandamos el token para que el server lo valide
            'Content-Type': 'application/json'           
          },
        });
        if (response.status === 200) {
            amistadCreada(id);
        }
    } catch (err) {
        console.log(err);
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
    
        try {
            const response = await fetch(`http://localhost:3000/amistad/${id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`, //Mandamos el token para que el server lo valide
                'Content-Type': 'application/json'           
              },
            });
            if (response.status === 200) {
                response.json().then(json => {
                    alert(json);
                    window.location.reload(true);
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
}