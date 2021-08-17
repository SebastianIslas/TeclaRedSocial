/* Se importan  los modelos*/
const { Habilidades } = require('../models/habilidades.models')
const { habService } = require('../services/habilidades.services')
const { validacionesService } = require('../services/validaciones.services')
const { Validaciones } = require('../models/validaciones.models')

/* Habilidades por default de un usuario*/
const setHabilidadesDefault = async (id_usuario) => {
    try {
        Object.entries(habService.getHabilidades()).forEach(categoria => {
            categoria[1].forEach(habilidad =>{
                Habilidades.create({
                    id_usuario: id_usuario,
                    categoria: categoria[0],
                    titulo: habilidad
                })
            })
        })
        return "Habilidades por default creadas correctamente"
    } catch (err) {
        throw new Error ('Problema al agregar las habilidades por default' + err.message);
    }
}


/* Agrega una habilidad extra a un usuario a la bd */
const agregarHabilidadExtra = async (req, res) => {
    try {
        id = req.id;
        const titulo = req.body.titulo;
        console.log(titulo)
        let resultado = await Habilidades.create({
            id_usuario: id,
            categoria: 'Conocimientos Extras',
            titulo: titulo
        })
        res.status(200).json(resultado);
    } catch (err) {
        res.status(400).json('Problema al agregar la habilidad ' + err.message);
    }
}

/* Obtiener todas las habilidades del usuario */
const getHabUsuario = async (req, res) => {
    try {
        const id_usuario = req.params.id;
        console.log(id_usuario)
        const habilidades = await Habilidades.findAll({
            where : {id_usuario: id_usuario} 
        });
        res.status(200).json(habilidades);
    } catch (err) {
        res.status(400).json('Problema al obtener las habilidades del usuario ' + err.message);
    }
    /*
            const categorias = await Habilidades.findAll({ 
                attributes: ['categoria'],
                group: ['categoria'],
                where: { id_usuario },
             });
    */
}
/* Obtiener todas las categorias de habilidades distintas que tenga el usuario */
const getCatHabUsuario = async (req, res) => {
    try {
        const id_usuario = req.params.id;
        console.log(id_usuario)
        const categorias = await Habilidades.findAll({ 
            attributes: ['categoria'],
            group: ['categoria'],
            where: { id_usuario },
         });
    res.status(200).json(categorias);
    } catch (err) {
        res.status(400).json('Problema al obtener las habilidades del usuario ' + err.message);
    }
}


/* Actualiza una habilidad extra de un usuario */
/*Habilidades dadas en el paper no se pueden modificar del titulo */
const actualizarTitulo = async (req, res) => {
    try {
        const { titulo } = req.body;
        const id = req.params.id;
        const id_usuario = req.id;
        let resultado = await Habilidades.update({
            titulo: titulo,
        },{
            //Hab existe, es del usuario que actualiza y solo esta categoria se puede 
            //modificar una habilidad por el usuario
            where: { id: id, id_usuario: id_usuario, categoria: 'Conocimientos Extras'}
        });
        if (resultado == 1){
            res.status(200).json('Habilidad modificada con exito');
        } else{
            throw new Error ('Solo puedes actualizar habilidades de tu usuario y de conocimientos extras')
        }
    } catch (err) {
        res.status(400).json( err.message);
    }
}


//Evalua las habilidades de un usuario y la opinion del mismo
const evaluarUsuario = async (req, res) =>{
    try {
        console.log('entro');
/*
        for (let key in req.body) {
            console.log(key);
            if (req.body.hasOwnProperty(key)) {
                console.log('key')
                item = req.body[key];
                console.log('value')
              console.log(item);
            }
          }
*/
          res.status(200).json('BIEN')
        } catch (error) {
        res.status(500).json(error.message)
    }
}


//Evalua una habilidad que no sea propia del usuario en sesion
const evaluarHabilidad = async (req, res) =>{
    try {        
        const id_hab = req.params.id;
        const id_evaluador = req.id;
        const { evaluacion } = req.body;
        //Obtiene el usuario asociado a la habilidad que se desea evaluar
        let usuario = await Habilidades.findOne({
            attributes: ['id_usuario'],
            where : {id: id_hab} 
        });
        let resultado
        //Si es el mismo usuario que el evaluador no se permite evaluar
        if(usuario.id_usuario == id_evaluador){
            throw new Error ('No puedes evaluar tus habilidades')
        } else{
            resultado = await Validaciones.create({ 
                id_habilidad: id_hab,
                id_evaluador: id_evaluador,
                evaluacion: evaluacion
            });
            
        }
        if (resultado) {
            res.status(200).json('Habilidad evaluada con exito');
        }else {
            throw new Error ('Datos invalidos');
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

/* Eliminar una habilidad del usuario en sesion*/
const eliminarHabilidad = async (req, res) => {
    try {
        let id_usuario = req.id;
        const id_habilidad = req.params.id;
        //Obtiene el usuario asociado a la habilidad a eliminar
        let validar = await Habilidades.findOne({ where: { id: id_habilidad }})
        //Si es el mismo que esta logeado se le permite borrar su habilidad
        if(validar.id_usuario == id_usuario){
            Validaciones.destroy({ where: { id_habilidad: id_habilidad}})
            let resultado = await Habilidades.destroy( {where: { id: id_habilidad }});
    
            if(resultado == 1){
                res.status(200).json('Habilidad eliminada con exito');
            } else{
                throw new Error ('Datos invalidos')
            }
        } else{
            throw new Error ('Esta habilidad no pertenece a tu usuario')
        }
    } catch (err) {
        res.status(400).json('Problema al eliminar la habilidad: ' + err.message);
    }
}



module.exports = { 
    setHabilidadesDefault,
    agregarHabilidadExtra,
    getHabUsuario,
    getCatHabUsuario,
    actualizarTitulo,
    evaluarHabilidad,
    evaluarUsuario,
    eliminarHabilidad,
}
