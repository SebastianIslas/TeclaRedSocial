const { Validaciones } = require('../models/validaciones.models')
const { Habilidades } = require('../models/habilidades.models')


class ValidacionesService{
    //Evalua todas las habilidades del usuario que recibe
    async evaluarUsuario(id_evaluador, data){
        try {
            let datos = [];
            //Ordena los datos para el bulkCreate
            for (let key in data) {
                let habilidad = {
                    'id_evaluador' : id_evaluador,
                    'id_habilidad' : key,
                    'evaluacion' : data[key]
                }
                datos.push(habilidad)
            }
            //Habilidades a evaluar
            let res = await Validaciones.bulkCreate(datos)
            await this.actPromedioHabilidades(data);
            console.log("entro")
            return res;
        } catch (error) {
            return error
        }
    }
    //Recalcula la valoracion general de todas las habilidades del usuario
    async actPromedioHabilidades(habilidades){
        for (let id in habilidades) {
            let promedio = await Habilidades.findOne({
                attributes: ['evaluacion'],
                where: { id: id }
            }); //Obtiene el promedio actual de la habilidad

            let evaluaciones = await Validaciones.findAll({
                attributes: ['evaluacion'],
                where: { id_habilidad: id}
            })  //Obtiene todas las valoraciones que ha tenido la habilidad
            let i = 0; //Contador de cant de veces que ha sido evaluada la habilidad
            let promedio2 = 0;
            evaluaciones.forEach(evaluacion => {    //Calcula el nuevo promedio
                promedio2 = promedio2 + evaluacion.evaluacion
                console.log(evaluacion.evaluacion)
                i++;
            })
            promedio = promedio2/i;
            console.log(promedio)
            await Habilidades.update({
                evaluacion: promedio
            },{
                where: { id: id }
            })
        }
    }

}

let validacionesService = new ValidacionesService();


module.exports = { 
    validacionesService
}