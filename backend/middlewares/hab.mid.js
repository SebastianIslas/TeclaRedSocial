const { validarEvaluacion, validadTitulo } = require('../dto/hab.dto');
const Joi = require('joi');

const checkEvaluacion = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validarEvaluacion, 'Los datos enviados no son correctos');
        return next();
    } catch (err) {
        res.status(500).json(err);
    }
}
const checkTit = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validadTitulo, 'Los datos enviados no son correctos');
        return next();
    } catch (err) {
        res.status(500).json(err);
    }
}
module.exports = { 
    checkEvaluacion,
    checkTit
}