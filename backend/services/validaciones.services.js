const { Validaciones } = require('../models/validaciones.models')


class ValidacionesService{

    validarHab(id, id_usuario, id_evaluador){
        Validaciones.create({ 
            id, 
            id_usuario, 
            id_evaluador, 
        });
    }

}

let validacionesService = new ValidacionesService();


module.exports = { 
    validacionesService
}