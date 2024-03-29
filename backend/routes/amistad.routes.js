const express = require('express');
const app = express();

const { validarToken } = require('../auth/middlewares/token.midd');

const {
    crearSolicitud,
    obtenerSolicitud,
    obtenerNotificacion,
    cancelarSolicitud,
    rechazarSolicitud,
    
    crearAmistad,
    obtenerAmistad,
    eliminarAmistad
} =require('../controllers/amistad.controllers')

/* CRUD Solicitud*/
app.post('/solicitud', validarToken, crearSolicitud);
app.get('/solicitud', validarToken, obtenerNotificacion);
app.get('/solicitud/:id', validarToken, obtenerSolicitud);
app.delete('/solicitud/cancelar/:id', validarToken, cancelarSolicitud);
app.delete('/solicitud/rechazar/:id', validarToken, rechazarSolicitud);

/* CRUD Amistad*/
app.post('/amistad', validarToken, crearAmistad);
app.get('/amistad/:id', validarToken, obtenerAmistad);
app.delete('/amistad/:id', validarToken, eliminarAmistad);

module.exports = app;