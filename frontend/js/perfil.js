window.onload = async () =>{
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
    renderHabilidades(data.id);
}

const renderHabilidades = async (id) => {
    renderCategorias(id);
}


const renderCategorias = async (id) => {
    const response = await fetch('http://localhost:3000/habilidades/'+id+'/categorias');

    let templateBody = document.getElementById('tempalte-hab-cat').content;
    let habilidades_div = document.getElementById('habilidades');
    const fragment = document.createDocumentFragment();
    response.json().then(categorias => {
        console.log(categorias)
        categorias.forEach(categoria => {
            templateBody.querySelector('div').setAttribute('id',categoria.categoria);
            templateBody.querySelector('h3').textContent = categoria.categoria;
            templateBody.querySelector('ul').setAttribute('id','ul_'+categoria.categoria);
            const clone = templateBody.cloneNode(true);
            fragment.appendChild(clone);
            renderHabilidadesLi(id, categoria.categoria);
        })
        habilidades_div.appendChild(fragment);
    });
}

const renderHabilidadesLi = async (id, categoria) => {
    const response = await fetch('http://localhost:3000/habilidades/'+id);

    let li_template = document.getElementById('hab-cat-li').content;
    let categoria_div = document.getElementById("ul_"+categoria);
    const fragment = document.createDocumentFragment();
    response.json().then(habilidades => {
        console.log(habilidades)
        habilidades.forEach(habilidad => {
            if(habilidad.categoria == categoria){
                li_template.querySelector('.lead').textContent = habilidad.titulo;
                li_template.querySelector('.ev').textContent = habilidad.evaluacion;
                const clone = li_template.cloneNode(true);
                fragment.appendChild(clone);
            }
        })
        categoria_div.appendChild(fragment);
    });
}
