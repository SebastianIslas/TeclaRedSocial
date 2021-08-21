const { validarEvaluacion, validarTitulo, validarEvaluacionDatos} = require('../dto/hab.dto');
const Joi = require('joi');
const { Habilidades } = require('../models/habilidades.models');

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


const checkHabEvaluacionValidas = async (req, res, next) =>{
    try {            
        for (let key in req.body) {
            let hab = {
                id: key,
                valor : req.body[key],
            }
            Joi.attempt(hab , validarEvaluacionDatos, 'Los datos enviados no son correctos');    
            let habilidad = await Habilidades.findOne({
                attributes: ['id','id_usuario'],
                where : {id: key}
            });
            if(habilidad == null)
                throw new Error('No existe la habilidad '+key);
            if(habilidad.id_usuario == req.id) //Valida que no sea autoevaluacion
                throw new Error('No puedes evaluar tu misma habilidad')
        }
        next();
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = { 
    checkEvaluacion,
    checkTit,
    checkHabEvaluacionValidas
}