const Joi = require('joi');

module.exports.altaUsuarioDTO = Joi.object().keys({
    nombre: Joi.string().min(2).max(50).required(),
    apellido: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(20).required(),
    ciudad: Joi.string().min(2).max(50).required(),
    pais: Joi.string().min(2).max(50).required(),
    edad: Joi.number().integer().min(17).max(59).required(),
    estudios: Joi.string().min(2).max(255).required(),
    idiomas: Joi.string().min(4).max(255).required(),
    linkedin: Joi.string().min(6).required(),
    hobbies: Joi.string().min(4).required(), 
    categoria: Joi.string().alphanum().min(7).required(),
    rol: Joi.string().alphanum().min(7).required(),
})