window.onload = async () =>{
    //Datos de "ver perfil" de usuarios en 'encontrar tecler'
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id');
    cargarDatos(id);
}


/* Obtiene los datos del usuario seleccionado */
const cargarDatos = async (id) => {
    const response = await fetch(`http://localhost:3000/usuario/`+id);
    response.json().then(data => {
        console.log(data);
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
    document.getElementById('foto').src = "assets/profile-img/" +data.foto;
    //Datos generales
    document.getElementById('edad').textContent = data.edad;
    document.getElementById('ubicacion').textContent = data.pais + ", " + data.ciudad;
    document.getElementById('estudios').textContent = data.estudios;
    document.getElementById('idiomas').textContent = data.idiomas;
    document.getElementById('hobbies').textContent = data.hobbies;
    renderHabilidades(data.id); //En script habilidades.js
}
