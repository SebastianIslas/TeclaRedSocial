const jwt = require('jsonwebtoken');
const { crearJWT } = require('../services/crearJWT.service');
const bcrypt = require('bcrypt');
const path = require('path');
/* Se importan  los modelos*/
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
            rol
        })
        if(resultado){  //Crea registros en tabla habilidades para el usuario creado
            await setHabilidadesDefault(resultado .id);
        }
        res.status(200).json('Usuario creado con exito');
    } catch (err) {
        res.status(400).json('Problema al crear el usuario: ' + err.message);
    }
}

/* Obtiene un conjunto de usuarios de la bd */
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll({});
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(400).json('Problema al leer los usuario: ' + err.message);
    }
}

/* Obtiene solo un usuario de la bd */
const obtenerUnUsuario = async (req, res) => {
    const token = req.query.token;
    let id;
    jwt.verify(token, 'secretkey', (err, user) => {
        id = user.id_usuario;
    });
    const usuario = await Usuarios.findOne({ where: { id } });
    res.status(200).json(usuario);
    try {
    } catch (err) {
        res.status(400).json('Problema al leer al usuario: ' + err.message);
    }
}

/* Actualiza la informacion de un usuario */
const actualizarUsuario = async (req, res) => {
    const id = req.params.id;
    const { nombre, email, password, ciudad, pais, edad, estudios, idiomas, linkedin, hobbies, categoria, rol} = req.body;
    try {
        Usuarios.update({
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
    const id = req.params.id;
    console.log(id);
    try {
        Usuarios.update({ elimiado: 1 }, { where: { id } });
        res.send('Usuario eliminado con exito');
    } catch (err) {
        res.status(400).json('Problema al eliminar el usuario: ' + err.message);
    }
}

/* Función que logea a un usuario retornando un token */
const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuarios.findOne({ where: { email } });
        if (!usuario) {
            res.status(400).json('Datos incorrectos.')
        }
        const passwordDB = usuario.dataValues.password;
        const passwordCorecto = bcrypt.compareSync(req.body.password, passwordDB);
        if (!passwordCorecto) {
            return res.status(400).json('Datos incorrectos.');
        }
        const token = await crearJWT(usuario.dataValues.id);
        return res.status(200).json(token);
    } catch (err) {
        res.status(400).json('Datos incorrectos.')
    }
}


/* Post foto */
const agregarFoto = async (req, res) => {
    const id = req.query.id
    const foto = id + path.extname(req.file.originalname);
    Usuarios.update({ foto },{ where: { id } });
    res.redirect('http://127.0.0.1:5500/frontend/mi-perfil.html')
}

module.exports = { 
    crearUsuario,
    obtenerUsuarios,
    obtenerUnUsuario,
    actualizarUsuario,
    eliminarUsuario,
    loginUsuario,
    agregarFoto
}