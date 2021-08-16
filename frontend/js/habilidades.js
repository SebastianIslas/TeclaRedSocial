
//Renderiza las categorias asociadas al usuario
const renderHabilidades = async (id) => {
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

//Carga habilidades en vista Perfil (el perfil del mismo usuario en sesion)
const renderHabilidadesLi = async (id, categoria) => {
    //Obtiene habilidades del usuario
    const response = await fetch('http://localhost:3000/habilidades/'+id);

    let li_template = document.getElementById('hab-cat-li').content;
    let categoria_div = document.getElementById("ul_"+categoria);
    const fragment = document.createDocumentFragment();
    response.json().then(habilidades => {
        habilidades.forEach(habilidad => {
            if(habilidad.categoria == categoria){
                li_template.querySelector('.lead').textContent = habilidad.titulo;
                if(habilidad.evaluacion == 0){
                    li_template.querySelector('.ev').textContent = 'Sin evaluar';
                } else{
                    li_template.querySelector('.ev').textContent = habilidad.evaluacion;
                }
                const clone = li_template.cloneNode(true);
                fragment.appendChild(clone);
            }
        })
        categoria_div.appendChild(fragment);
    });
}
