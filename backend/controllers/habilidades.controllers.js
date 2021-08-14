/* Se importan  los modelos*/
const { Habilidades } = require('../models/habilidades.models')
const { habService } = require('../services/habilidades.services')
const jwt = require('jsonwebtoken');

/* Habilidades por default de un usuario*/
const setHabilidadesDefault = async (id_usuario) => {
    try {
        Object.entries(habService.getHabilidades()).forEach(categoria => {
            categoria[1].forEach(habilidad =>{
                Habilidades.create({
                    id_usuario: id_usuario,
                    categoria: categoria[0],
                    titulo: habilidad
                })
            })
        })
        return "Habilidades por default creadas correctamente"
    } catch (err) {
        throw new Error ('Problema al agregar las habilidades por default' + err.message);
    }
}


/* Agrega una habilidad a un usuario de un usuario a la bd */
const agregarHabilidadExtra = async (req, res) => {
    try {
        const token = req.query.token;
        let id;
        console.log(token)
        jwt.verify(token, 'secretkey', (err, user) => {
            id = user.id_usuario;
        });
        const titulo = req.body.titulo;
        console.log(titulo)
        let resultado = await Habilidades.create({
            id_usuario: id,
            categoria: 'Conocimientos Extras',
            titulo: titulo
        })
        res.status(200).json(resultado);
    } catch (err) {
        res.status(400).json('Problema al agregar la habilidad ' + err.message);
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
    setHabilidadesDefault,
    agregarHabilidadExtra
/*    obtenerHabilidadesUsuario,
    actualizarHabilidad,
    eliminarHabilidad,
    */
}
