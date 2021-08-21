const express = require('express');
const app = express();


/* Se importan los middlewares */
const { checkDatosAlta, correoExistente, upload } = require('../middlewares/usuarios.mid');
const { validarToken } = require('../auth/middlewares/token.midd');

/* Se importan los controladores */
const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuariosCategoria,
    obtenerUnUsuario,
    actualizarUsuario,
    eliminarUsuario,

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