window.onload = async function () {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var categoria = urlParams.get('categoria');    
    console.log(categoria);
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
            templateBody.querySelector('h5').setAttribute('id',tecler.id);
            templateBody.querySelector('h5').textContent = tecler.nombre;
            templateBody.querySelector('#foto').src = "assets/profile-img/" +tecler.foto;
            templateBody.querySelector('#descripcion').textContent = tecler.descripcion;
            const clone = templateBody.cloneNode(true);
            fragment.appendChild(clone);
            console.log(tecler.email);
        })
        teclers_gallery.appendChild(fragment);
    });
}

