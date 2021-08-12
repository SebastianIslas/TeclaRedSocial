const Joi = require('joi');

module.exports.altaUsuarioDTO = Joi.object().keys({
    nombre: Joi.string().alphanum().min(6).max(50).required(),
    apellido: Joi.string().alphanum().min(6).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).max(12).required()
})