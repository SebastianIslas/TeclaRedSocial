const express = require('express');
const app = express();


/* Se importan los middlewares */
<<<<<<< HEAD
const { 
    checkDatosAlta, 
    correoExistente,
    validarToken,
    upload,
    checkOpinion
 } = require('../middlewares/usuarios.mid');
=======
const { checkDatosAlta, correoExistente, upload } = require('../middlewares/usuarios.mid');
const { validarToken } = require('../auth/middlewares/token.midd');

>>>>>>> eee71337b0d489ea26bcc39e45975717d2d3e30e
/* Se importan los controladores */
const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuariosCategoria,
    obtenerUnUsuario,
    actualizarUsuario,
    eliminarUsuario,
<<<<<<< HEAD
    loginUsuario,
    agregarFoto,
    opinarUsuario,
    obtenerOpinionesUsuario
} =require('../controllers/usuarios.controllers')


module.exports = (app) => {
    /* CRUD usuarios */
    app.post('/usuarios', checkDatosAlta, correoExistente, crearUsuario);
    app.get('/usuario', validarToken, obtenerUnUsuario); // Obtener solo un usuario.
    app.get('/usuario/:id', obtenerUnUsuario); // Obtener datos publicos de un usuario
    app.put('/usuario',validarToken, actualizarUsuario);
    app.delete('/usuario', validarToken, eliminarUsuario);
    
    app.get('/usuarios', obtenerUsuarios); //Obtener un conjunto de usuarios
    app.get('/usuarios/:categoria', obtenerUsuariosCategoria); //Obtener un conjunto de usuarios de una categoria
    

    app.post('/images', upload, agregarFoto); //Recibe el form para subir una foto
    app.post('/usuario/opinar/:id',validarToken, checkOpinion, opinarUsuario); //Recibe el form para opinar sobre un usuario
    app.get('/usuario/opiniones/:id', obtenerOpinionesUsuario); //Obtiene las opiniones que ha tenido el usuario
    
    /* Login Usuario */
    app.post('/login', loginUsuario);
}
=======

    agregarFoto
} =require('../controllers/usuarios.controllers');

/* CRUD usuarios */
app.post('/usuario', checkDatosAlta, correoExistente, crearUsuario); //crea un nuevo usuario
app.get('/usuario', validarToken, obtenerUnUsuario); // Obtener solo un usuario.
app.put('/usuario',validarToken, actualizarUsuario);
app.delete('/usuario', validarToken, eliminarUsuario);
app.get('/usuario/:id', obtenerUnUsuario); // Obtener datos publicos de un usuario

app.get('/usuarios', obtenerUsuarios); //Obtener un conjunto de usuarios
app.get('/usuarios/:categoria', obtenerUsuariosCategoria); //Obtener un conjunto de usuarios de una categoria

app.post('/images', upload, agregarFoto); //Recibe el form para subir una foto

module.exports = app;
>>>>>>> eee71337b0d489ea26bcc39e45975717d2d3e30e
