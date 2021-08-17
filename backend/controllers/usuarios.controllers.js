const jwt = require('jsonwebtoken');
const { crearJWT } = require('../services/crearJWT.service');
const bcrypt = require('bcrypt');
const path = require('path');
const { Usuarios } = require('../models/usuarios.models');
const { Seguidores } = require ('../models/seguidores.models');
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
            elimiado: 0
        })
        if(resultado){  //Crea registros en tabla habilidades para el usuario creado
            await setHabilidadesDefault(resultado .id);
        }
        res.status(200).json('Usuario creado con exito');
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
            where: { categoria: categoria, elimiado: 0}
        });
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(400).json('Problema al leer los usuario: ' + err.message);
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
    try {
        const id = req.id;
        if(id != undefined) {   //Obtiene usuario en sesion
            const usuario = await Usuarios.findOne({ where: { id } });
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
            nombre,
            descripcion,
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
        Usuarios.update({ elimiado: 1 }, { where: { id } }); //Cambia el campo de eliminado a true.
        res.send('Usuario eliminado con exito');
    } catch (err) {
        res.status(400).json('Problema al eliminar el usuario: ' + err.message);
    }
}

/* Función que logea a un usuario retornando un token */
const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuarios.findOne({ where: { email } }); //Encuentra un usuario de acuerdo al email dado
        if (!usuario) {
            res.status(400).json('Datos incorrectos.') //Si el usuario no existe marca error.
        }
        const passwordDB = usuario.dataValues.password; 
        const passwordCorecto = bcrypt.compareSync(req.body.password, passwordDB); //Compueba si la contraseña es correcta.
        if (!passwordCorecto) {
            return res.status(400).json('Datos incorrectos.');
        }
        if (usuario.dataValues.elimiado == 1) {
            await Usuarios.update({ elimiado: 0 }, { where: { id: usuario.dataValues.id } }); //En caso que el usuario este deshabilidato, lo activa
        }
        const token = await crearJWT(usuario.dataValues.id); //Genera un token para el usuario
        return res.status(200).json(token);
    } catch (err) {
        res.status(400).json('Datos incorrectos.')
    }
}


/* Actualiza la columna foto de un usuario */
const agregarFoto = async (req, res) => {
    const id = req.query.id
    const foto = id + path.extname(req.file.originalname); //Concatena el id el usuario con la extension 
    Usuarios.update({ foto },{ where: { id } }); //Actualiza el campo foto
    res.redirect('http://127.0.0.1:5500/frontend/mi-perfil.html') //Redirige a la ventana "mi perfil"
}

const crearSeguidor = async (req, res) => {
    const id_seguidor = req.id;
    const id_seguido = req.body.id;
    try {
        await Seguidores.create({ id_seguidor, id_seguido })
        res.status(201).json('Seguido con exito');
    } catch (err) {
        res.status(500).json('No se pudo seguir');
    }
}

const obtenerSeguidor = async (req, res) => {
    const id_seguidor = req.id;
    const id_seguido = req.params.id;
    try {
        const seguido = await Seguidores.findOne({ where: {
            id_seguidor,
            id_seguido 
          }
        });
        res.status(200).json(seguido);
    } catch (err) {
        res.status(500).json('No se pudo seguir');
    }
}

const eliminarSeguidor = async (req, res) => {
    const id_seguidor = req.id;
    const id_seguido = req.params.id;
    try {
        const seguido = await Seguidores.destroy({ where: {
            id_seguidor,
            id_seguido 
          }
        });
        res.status(200).json('Un follow exitoso');
    } catch (err) {
        res.status(500).json('No se pudo dejar de seguir');
    }
}

module.exports = { 
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuariosCategoria,
    obtenerUnUsuario,
    actualizarUsuario,
    eliminarUsuario,
    loginUsuario,
    agregarFoto,
    crearSeguidor,
    obtenerSeguidor,
    eliminarSeguidor
}