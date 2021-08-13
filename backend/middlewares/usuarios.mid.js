const { altaUsuarioDTO } = require('../dto/usuarios/alta.dto');
const { Usuarios } = require('../models/usuarios.model');
const Joi = require('joi')

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
            res.status(500).json('El email ya está registrado.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { checkDatosAlta, correoExistente }