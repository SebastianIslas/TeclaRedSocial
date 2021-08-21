const { altaUsuarioDTO } = require('../dto/usuarios/alta.dto');
const { Usuarios } = require('../models/usuarios.models');
const jwt = require('jsonwebtoken');
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

/* Valida que exista un token */
const validarToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        req.id = jwt.verify(token, 'secretkey').id_usuario; //VErifica que sea un token valido y asigna el id a una variable
        next();
    } catch (err) {
        res.status(401).json(err);
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

module.exports = { checkDatosAlta, correoExistente, validarToken, upload }