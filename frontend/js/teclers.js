window.onload = async function () {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let categoria = urlParams.get('categoria');
    document.getElementById('categoria').textContent = categoria;
    cargarTeclers(categoria);
}

const cargarTeclers = async (categoria) => {
    const response = await fetch(`http://localhost:3000/usuarios/`+categoria);

    let templateBody = document.getElementById('template').content;
    let teclers_gallery = document.getElementById('teclers');
    const fragment = document.createDocumentFragment();
    response.json().then(data => {
        console.log(data)
        data.forEach(tecler => {
            console.log(tecler)
            templateBody.querySelector('#tecler').setAttribute('onclick','verTecler('+tecler.id+')');
            templateBody.querySelector('h5').setAttribute('id',tecler.id);
            templateBody.querySelector('h5').textContent = tecler.nombre + " " + tecler.apellido;
            templateBody.querySelector('#foto').src = "assets/profile-img/" +tecler.foto;
            templateBody.querySelector('#descripcion').textContent = tecler.descripcion;
            const clone = templateBody.cloneNode(true);
            fragment.appendChild(clone);
            console.log(tecler.email);
        })
        teclers_gallery.appendChild(fragment);
    });
}

const verTecler = (id) => {
    window.location.href = "./perfil.html?id="+id;

}

