const { altaUsuarioDTO } = require('../dto/usuarios/alta.dto');
const Joi = require('joi')

const checkDatosAlta = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, altaUsuarioDTO, 'Los datos enviados no son correctos');
        return next();
    } catch (err) {
        res.status(500).json(err);
    }  
}

module.exports = { checkDatosAlta }