/* Se importan los middlewares */
const { 
    checkDatosAlta, 
    correoExistente,
    validarToken,
    upload,
    checkOpinion
 } = require('../middlewares/usuarios.mid');
/* Se importan los controladores */
const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuariosCategoria,
    obtenerUnUsuario,
    actualizarUsuario,
    eliminarUsuario,
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