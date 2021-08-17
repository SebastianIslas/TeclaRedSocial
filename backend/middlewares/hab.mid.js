const { validarEvaluacion, validarTitulo, validarEvaluacionDatos} = require('../dto/hab.dto');
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
        await Joi.attempt(req.body, validarTitulo, 'Los datos enviados no son correctos');
        return next();
    } catch (err) {
        res.status(500).json(err);
    }
}

const checkDatosEvaluacion = async (req, res, next) => {
    try{
        console.log('datos')
        
        //Valida para cada key que su value sea entre 1 y 5,
        //Puedo recibir las key's que quiera
        for (let key in req.body) {
            console.log('key' + key)
            item = req.body[key];
            console.log('value' + item)
            let hab = {key : req.body[key]}
            Joi.attempt(hab , validarEvaluacionDatos, 'Los datos enviados no son correctos');
        }


 //       await Joi.attempt(req.body, validarEvaluacionDatos, 'Los datos enviados no son correctos');
        return next();
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = { 
    checkEvaluacion,
    checkTit,
    checkDatosEvaluacion
}