const Joi = require('joi');

module.exports.validarOpinion = Joi.object().keys({
    opinion: Joi.string().min(15).max(1000).required(),
})