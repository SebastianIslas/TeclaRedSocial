/* Se importan  los modelos*/
const { Habilidades } = require('../models/proyectos.models')

/* Habilidades por default de un usuario*/
const setHabilidadesDefault = async (id_usuario) => {
    try {
        let categorias = {
            'Conocimientos' : [
                'Base de datos', 'APIS', 'Testings', 'Seguridad', 'Teoria de objetos'
            ],
            'Tecnologias' : [
                'NodeJs', 'Frontend', 'Swagger', 'Javascript'
            ],
            'Desempeño' : [
                'Calidad de código', 'Velocidad de entrega', 'Perfomance del codigo'
            ],
            'Habilidades Blandas' : [
                'Enfocado', 'Trabajo en equipo', 'Comprometido', 'Comunicación', 'Capacidad de aprendizaje', 'Resolución de problemas',
            ],
            'Entornos Profesionales' : [
                'Versionado - Github', 'Trello - Jira', 'Slack', 'Metodologías Águiles'
            ]
        }
        console.log(categorias['']);
        categorias.forEach((categoria) =>{
            insertHabilidadDefault(categoria)
        })
//        res.status(200).json(resultado);
    } catch (err) {
//        res.status(400).json('Problema al agregar el proyecto' + err.message);
    }
}

const insertHabilidadDefault = (categoria) =>{
    try {
        console.log(categoria);
        categoria.forEach((categoria) =>{
            insertHabilidadDefault(categoria)
        })

/*        Proyectos.create({
            id_usuario,
            titulo,
            descripcion
        })
        res.status(200).json(resultado);
        */
    } catch (err) {
  //      res.status(400).json('Problema al agregar el proyecto' + err.message);
    }
}

setHabilidadesDefault(5);

/* Agrega una habilidad a un usuario de un usuario a la bd */
const agregarHabilidadExtra = async (req, res) => {
    try {
        const { id_usuario, titulo, descripcion } = req.body;
        let resultado = await Proyectos.create({
            id_usuario,
            titulo,
            descripcion
        })
        res.status(200).json(resultado);
    } catch (err) {
        res.status(400).json('Problema al agregar el proyecto' + err.message);
    }
}

/* Obtiene todos los proyectos */
const obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyectos.findAll({});
        res.status(200).json(proyectos);
    } catch (err) {
        res.status(400).json('Problema al obtener los proyectos ' + err.message);
    }
}

/* Obtiene los proyectos de un usuario*/
const obtenerProyectosUsuario = async (req, res) => {
    try {
        const id_usuario = req.params.id;
        const proyectos = await Proyectos.findAll({ where: { id_usuario: id_usuario } });
        res.status(200).json(proyectos);
    } catch (err) {
        res.status(400).json('Error al obtener los proyectos del usuario' + err.message);
    }
}

/* Actualiza informacion de un proyecto */
const actualizarProyecto = async (req, res) => {
    try {
        const id_proyecto = req.params.id;
        const {  titulo, descripcion } = req.body;
        let resultado = await Proyectos.update({
            titulo: titulo,
            descripcion: descripcion
        },{ 
            where: { id: id_proyecto }
        });
        if(resultado == 1){
            res.status(200).json('Proyecto actualizado con exito');
        } else{
            throw new Error ('Datos invalidos')
        }
    } catch (err) {
        res.status(400).json('Error al actualizar el proyecto: ' + err.message);
    }
}

/* Eliminar un proyecto*/
const eliminarProyecto = async (req, res) => {
    try {
        const id_proyecto = req.params.id;
        let resultado = await Proyectos.destroy( {where: { id: id_proyecto }});
        if(resultado == 1){
            res.status(200).json('Proyecto eliminado con exito');
        } else{
            throw new Error ('Datos invalidos')
        }
    } catch (err) {
        res.status(400).json('Problema al eliminar el proyecto: ' + err.message);
    }
}


/*
module.exports = { 
    setHabilidadesDefault,
    obtenerHabilidadesUsuario,
    actualizarHabilidad,
    eliminarHabilidad,
}
*/