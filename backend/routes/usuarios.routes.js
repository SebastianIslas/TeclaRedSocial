/* Se importan los middlewares */
const { checkDatosAlta, correoExistente, upload } = require('../middlewares/usuarios.mid');
const { setHabilidadesDefault } = require('../controllers/habilidades.controllers');
/* Se importan los controladores */
const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUnUsuario,
    actualizarUsuario,
    eliminarUsuario,
    loginUsuario,
    agregarFoto
} =require('../controllers/usuarios.controllers')


module.exports = (app) => {
    /* CRUD usuarios */
    app.post('/usuarios', checkDatosAlta, correoExistente, crearUsuario);
    app.get('/usuarios', obtenerUsuarios);
    app.get('/usuario', obtenerUnUsuario);
    app.put('/usuarios/:id', actualizarUsuario);
    app.delete('/usuarios/:id', eliminarUsuario);


    app.post('/images', upload, agregarFoto)
    
    /* Login Usuario */
    app.post('/login', loginUsuario)
}