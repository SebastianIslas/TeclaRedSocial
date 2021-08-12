/* Se importan los middlewares */
const { checkDatosAlta } = require('../middlewares/usuarios.mid');

/* Se importan los controladores */
const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUnUsuario,
    actualizarUsuario,
    eliminarUsuario
} =require('../controllers/usuarios.controllers')

module.exports = (app) => {
    /* CRUD usuarios */
    app.post('/usuarios', checkDatosAlta, crearUsuario);
    app.get('/usuarios', obtenerUsuarios);
    app.get('/usuarios/:id', obtenerUnUsuario);
    app.put('/usuarios/:id', checkDatosAlta, actualizarUsuario);
    app.delete('/usuarios/:id', eliminarUsuario);
}