const Joi = require('joi');

module.exports.validarEvaluacion = Joi.object().keys({
    evaluacion: Joi.number().integer().min(1).max(5).required(),
})

module.exports.validadTitulo = Joi.object().keys({
    titulo: Joi.string().min(1).max(30).required(),
})
