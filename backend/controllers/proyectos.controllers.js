/* Se importan  los modelos*/
const { Proyectos } = require('../models/proyectos.models')

/* Agrega un proyecto de un usuario a la bd */
const agregarProyecto = async (req, res) => {
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


module.exports = { 
    agregarProyecto,
    obtenerProyectos,
    obtenerProyectosUsuario,
    actualizarProyecto,
    eliminarProyecto
}