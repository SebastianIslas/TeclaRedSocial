const { altaUsuarioDTO } = require('../dto/usuarios/alta.dto');
const { Usuarios } = require('../models/usuarios.models');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const multer = require('multer');
const path = require('path');

const checkDatosAlta = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, altaUsuarioDTO, 'Los datos enviados no son correctos');
        return next();
    } catch (err) {
        res.status(500).json(err);
    }  
}

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

const validarToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        req.id = jwt.verify(token, 'secretkey').id_usuario;
        next();
    } catch (err) {
        res.status(500).json(err);
    }
}

const storage = multer.diskStorage({
    destination: "../frontend/assets/profile-img",
    filename:  (req, file, cb) => {
        cb(null, req.query.id + path.extname(file.originalname)) //Appending extension
    }
});

const upload = multer( {
    storage,
    dest: "../frontend/assets/profile-img"
}).single('image');

module.exports = { checkDatosAlta, correoExistente, validarToken, upload }