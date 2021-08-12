/* Se importan  los modelos*/
const { Usuario } = require('../models/usuario.models')

/* Agrega un usuario a la bd */
const crearUsuario = async (req, res) => {
    const { nombre, apellido, email, password} = req.body;
    try {
        // Agregar el usuario a la bd
        Usuario.create({
            nombre,
            apellido,
            email,
            password,
        })
        res.status(200).json('Usuario creado con exito');
    } catch (err) {
        res.status(400).json('Problema al crear el usuario: ' + err.message);
    }
}

/* Obtiene un conjunto de usuarios de la bd */
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({});
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(400).json('Problema al leer los usuario: ' + err.message);
    }
}

/* Obtiene solo un usuario de la bd */
const obtenerUnUsuario = async (req, res) => {
    const id_usuario = req.params.id;
    try {
        const usuario = await Usuario.findOne({ where: { id_usuario } });
        res.status(200).json(usuario);
    } catch (err) {
        res.status(400).json('Problema al leer al usuario: ' + err.message);
    }
}

/* Actualiza la informacion de un usuario */
const actualizarUsuario = async (req, res) => {
    const id_usuario = req.params.id;
    const {  nombre, apellidos, email, password } = req.body;
    try {
        Usuario.update({
            nombre,
            apellidos,
            email,
            password
        },{ 
            where: { id_usuario } 
        });
        res.status(200).json('Usuario actualizado con exito.');
    } catch (err) {
        res.status(400).json('Problema al actualizar el usuario: ' + err.message);
    }
}

/* Borrado logico de un usuario */
const eliminarUsuario = async (req, res) => {
    const id_usuario = req.params.id;
    try {
        Usuario.update({ eliminado: 1 }, { where: { id_usuario } });
        res.send('Usuario eliminado con exito');
    } catch (err) {
        res.status(400).json('Problema al eliminar el usuario: ' + err.message);
    }
}


module.exports = { 
    crearUsuario,
    obtenerUsuarios,
    obtenerUnUsuario,
    actualizarUsuario,
    eliminarUsuario
}