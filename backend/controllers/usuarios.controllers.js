const bcrypt = require('bcrypt');
const path = require('path');
const { Usuarios } = require('../models/usuarios.models');
const { setHabilidadesDefault } = require('../controllers/habilidades.controllers');

/* Agrega un usuario a la bd */
const crearUsuario = async (req, res) => {
    const { nombre, apellido, email, password, ciudad, pais, edad, estudios, idiomas, linkedin, hobbies, categoria, rol} = req.body;
    const passHas = await bcrypt.hash(password, 10);
    try {
        // Agregar el usuario a la bd
        let resultado = await Usuarios.create({
            nombre,
            apellido,
            email,
            password: passHas,
            ciudad,
            pais,
            edad,
            estudios,
            idiomas,
            linkedin,
            hobbies,
            categoria,
            rol,
            eliminado: 0
        })
        if(resultado){  //Crea registros en tabla habilidades para el usuario creado
            await setHabilidadesDefault(resultado .id);
        }
        res.status(201).json('Usuario creado con exito');
    } catch (err) {
        res.status(400).json('Problema al crear el usuario: ' + err.message);
    }
}

/* Obtiene un conjunto de usuarios de una categoria de la bd */
const obtenerUsuariosCategoria = async (req, res) => {
    try {
        const categoria = req.params.categoria;
        const usuarios = await Usuarios.findAll({
            attributes: {
                exclude: ['password']
              },
            where: { categoria: categoria, eliminado: 0}
        });
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(400).json('Problema al leer los usuario: ' + err.message);
    }
}

/* Obtiene un conjunto de usuarios de la bd */
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll({
            attributes: {
                exclude: ['password']
            },
        });
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(400).json('Problema al leer los usuario: ' + err.message);
    }
}

/* Obtiene solo un usuario de la bd */
const obtenerUnUsuario = async (req, res) => {
    try {
        const id = req.id;
        if(id != undefined) {   //Obtiene usuario en sesion
            const usuario = await Usuarios.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: { id } });
            res.status(200).json(usuario);
        } else{ //Obtiene datos de cualquier usuario
            const id = req.params.id;
            const usuario = await Usuarios.findOne({ 
                attributes: {
                    exclude: ['password', 'rol','eliminado']
                  },
                  where: { id } });
            res.status(200).json(usuario);
        }    
    } catch (err) {
        res.status(400).json('Problema al leer al usuario: ' + err.message);
    }
}

/* Actualiza la informacion de un usuario */
const actualizarUsuario = async (req, res) => {
    const id = req.id;
    const { nombre, descripcion, email, password, ciudad, pais, edad, estudios, idiomas, linkedin, hobbies, categoria, rol} = req.body;
    try {
        Usuarios.update({
            descripcion,
            nombre,
            email,
            password,
            ciudad,
            pais,
            edad,
            estudios,
            idiomas,
            linkedin,
            hobbies,
            categoria,
            rol
        },{ 
            where: { id } 
        });
        res.status(200).json('Usuario actualizado con exito.');
    } catch (err) {
        res.status(400).json('Problema al actualizar el usuario: ' + err.message);
    }
}

/* Borrado logico de un usuario */
const eliminarUsuario = async (req, res) => {
    const id = req.id;
    try {
        Usuarios.update({ eliminado: 1 }, { where: { id } }); //Cambia el campo de eliminado a true.
        res.send('Usuario eliminado con exito');
    } catch (err) {
        res.status(400).json('Problema al eliminar el usuario: ' + err.message);
    }
}

/* Actualiza la columna foto de un usuario */
const agregarFoto = async (req, res) => {
    const id = req.query.id
    const foto = id + path.extname(req.file.originalname); //Concatena el id el usuario con la extension 
    Usuarios.update({ foto },{ where: { id } }); //Actualiza el campo foto
    res.redirect('http://127.0.0.1:5500/frontend/mi-perfil.html') //Redirige a la ventana "mi perfil"
}

module.exports = { 
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuariosCategoria,
    obtenerUnUsuario,
    actualizarUsuario,
    eliminarUsuario,
    agregarFoto
}