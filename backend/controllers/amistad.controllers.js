const { Amistad } = require ('../models/amistad.models');
const { Solicitud, obtenerSolicitudes } = require ('../models/solicitud.models');

/* Agrega a la base de datos una solicitud de amistad */
const crearSolicitud = async (req, res) => {
    const id_solicitante = req.id; //El id que pasa el middleware
    const id_solicitado = req.body.id; //El id que pasan en el body desde el front
    try {
        await Solicitud.create({ id_solicitante, id_solicitado });
        res.status(201).json('Solicitud enviada con exito');
    } catch (err) {
        res.status(500).json('No se pudo enviar');
    }
}

/* Obtiene  */
const obtenerSolicitud = async (req, res) => {
    const id_solicitante = req.id; //El id que pasa el middleware
    const id_solicitado = req.params.id; //El id que pasan en el body desde el front
    try {
        const solicitud = await Solicitud.findOne({ where: {
            id_solicitante,
            id_solicitado 
          }
        });
        if (solicitud) {
            res.status(200).json(solicitud);
        } 
    } catch (err) {
        res.status(500).json('No se encontro la solicitud');
    }
}

/* Obtenemos un conjunto de solicitudes de amistad para pasar "las notificaciones" al front */
const obtenerNotificacion = async (req, res) => {
    const id_solicitado = req.id;
    try {
        const solicitudes = await obtenerSolicitudes(id_solicitado);
        res.status(200).json(solicitudes[0]);
    } catch (err) {
        res.status(500).json('No se encontro la solicitud');
    }
}

/* En caso de que el usuario cancele la solicitud, la eliminamos */
const eliminarSolicitud = async (req, res) => {
    const id_solicitante = req.id;
    const id_solicitado = req.params.id;
    try {
        await Solicitud.destroy({ where: {
            id_solicitante,
            id_solicitado 
          }
        });
        res.status(200).json('Solicitud cancelada');
    } catch (err) {
        res.status(500).json('Error al cancelar la solicitud');
    } 
}

/* Si el usuario acepta la solicitud, se crea la amistad */
const crearAmistad = async (req, res) => {
    const id_amigo1 = req.body.id_solicitante;
    const id_amigo2 = req.id;
    try {
        await Amistad.create({ id_amigo1, id_amigo2 });  
        await Solicitud.destroy({ where: { id_solicitante: id_amigo1, id_solicitado: id_amigo2 } }); //Se elimina la solitud correspondiente
        res.status(200).json('Amistad creada');
    } catch (err) {
        res.status(500).json('Error al crear la amistad');
    }
}

/* Si se rechaza una solicitud, entonces, la eliminamos */
const rechazarAmistad = async (req, res) => {
    const id_solicitante = req.params.id;
    const id_solicitado = req.id;
    try {
        await Solicitud.destroy({ where: { id_solicitante, id_solicitado } });
        res.status(200).json('Amistad eliminada');
    } catch (err) {
        res.status(500).json('Error al eliminar la amistad');
    }
}

/* Verificamos si ya existe una amistad */
const obtenerAmistad = async (req, res) => {
    let id_amigo1 =  req.id; //El id que pasa el middleware
    let id_amigo2 =  req.params.id; //El id que se pasa en el la url desde el front
    try {
        let amistad = await Amistad.findOne({ where: { id_amigo1, id_amigo2 } });
        // Si existe la amistad, la enviamos al front
        if (amistad) {
            res.status(200).json(amistad);            
        } else {
            // si no exite, intercambiamos el orden de los id para hacer la busqueda
            id_amigo1 =  req.params.id;
            id_amigo2 =  req.id;
            amistad = await Amistad.findOne({ where: { id_amigo1, id_amigo2 } });
            // Si existe la amistad, la enviamos al front
            if (amistad) {
                res.status(200).json(amistad);
            } else {
                res.status(404).json('No son amigos');            
            }
        }
    } catch (err) {
        res.status(500).json('Error al solicitar la informacion');            
    }
    console.log('obtenerAmistad: ', id_amigo1, id_amigo2);
}



module.exports = { 
    crearSolicitud,
    obtenerSolicitud,
    obtenerNotificacion,
    eliminarSolicitud,
    
    crearAmistad,
    rechazarAmistad,
    obtenerAmistad
}