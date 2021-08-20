const { validarToken } = require('../middlewares/usuarios.mid');


const {
    crearSolicitud,
    obtenerSolicitud,
    obtenerNotificacion,
    eliminarSolicitud,
    crearAmistad,
    rechazarAmistad,
    obtenerAmistad
} =require('../controllers/amistad.controllers')


module.exports = (app) => {
    /* CRUD Solicitud*/
    app.post('/solicitud', validarToken, crearSolicitud);
    app.get('/solicitud', validarToken, obtenerNotificacion);
    app.get('/solicitud/:id', validarToken, obtenerSolicitud);
    app.delete('/solicitud/:id', validarToken, eliminarSolicitud);

    /* CRUD Amistad*/
    app.post('/amistad', validarToken, crearAmistad);
    app.delete('/amistad/:id', validarToken, rechazarAmistad);
    app.get('/amistad/:id', validarToken, obtenerAmistad);

}