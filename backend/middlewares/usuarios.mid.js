const { altaUsuarioDTO } = require('../dto/usuarios/alta.dto');
const { validarOpinion } = require('../dto/usuarios/usuario.dto');
const { Usuarios } = require('../models/usuarios.models');
const Joi = require('joi');
const multer = require('multer');
const path = require('path');

/* Verifica que los campos recibidos sean correctos */
const checkDatosAlta = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, altaUsuarioDTO, 'Los datos enviados no son correctos');
        return next();
    } catch (err) {
        res.status(500).json(err);
    }  
}

/* Verifica que el email no exista en la bd */
const correoExistente = async (req, res, next) => {
    try {
        const usuario = await Usuarios.findOne({ where: { email: req.body.email } })
        if (!usuario) {
            return next();
        } else {
            console.log('Email ya existe')
            res.status(409).json('El email ya está registrado.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

/* Modifica el nombre de la foto que recibio */
const storage = multer.diskStorage({
    destination: "../frontend/assets/profile-img",
    filename:  (req, file, cb) => {
        cb(null, req.query.id + path.extname(file.originalname)) //Nombramos el nombre de la foto de acuerdo al id del usuario
    }
});

/* Guarda la foto recibida en el disco duro */
const upload = multer( {
    storage,
    dest: "../frontend/assets/profile-img"
}).single('image');


// Valdia que la opinion sea correcta
const checkOpinion = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validarOpinion, 'Los datos enviados no son correctos');
        return next();
    } catch (err) {
        res.status(500).json(err);
    }  
}
module.exports = { 
    checkDatosAlta,
    correoExistente,
    upload,
    checkOpinion
 }
