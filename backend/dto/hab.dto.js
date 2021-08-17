const Joi = require('joi');

module.exports.validarEvaluacion = Joi.object().keys({
    evaluacion: Joi.number().integer().min(1).max(5).required(),
})

module.exports.validarTitulo = Joi.object().keys({
    titulo: Joi.string().min(1).max(30).required(),
})
/*
module.exports.validarEvaluacionDatos = Joi.object().keys({
    a: Joi.number().integer().min(1).max(5).required()
}).unknown(true);
*/

//Valida que el value sea entre 1 y 5
module.exports.validarEvaluacionDatos = Joi.object().pattern(/^([0-9])*[a-zA-Z]*/, 
    [Joi.number().integer().min(1).max(5).required()]
)


/*
function validarEvaluacionDatos(data) {
    const Schema = {
        categories: Joi.array().items(Joi.string()),
        variables: Joi.array().items(Joi.object().keys().min(1))
    }
    return Joi.validate(data, Schema)
}
module.exports = { validarEvaluacionDatos }

*/