const {
    agregarHabilidadExtra,
    getHabUsuario,
    getCatHabUsuario,
    actualizarTitulo,
    evaluarHabilidad,
    eliminarHabilidad,
    evaluarUsuario
} = require('../controllers/habilidades.controllers')
const { validarToken } = require('../middlewares/usuarios.mid');
const { checkEvaluacion, checkTit, checkDatosEvaluacion } = require('../middlewares/hab.mid');

module.exports = (app) => {
    app.post('/habilidades/extra', validarToken, checkTit, agregarHabilidadExtra);
    app.get('/habilidades/:id', getHabUsuario);
    app.get('/habilidades/:id/categorias', getCatHabUsuario);
    app.put('/habilidades/:id/titulo', validarToken, checkTit, actualizarTitulo);
    
    //Valua la habilidad de un usuario (el promedio)
    app.put('/habilidades/:id/validar', validarToken, checkEvaluacion, evaluarHabilidad);

    //Valua las habilidades de un usuario y la opinion del mismo
    app.post('/habilidades/:id/validar', validarToken, checkDatosEvaluacion, evaluarUsuario);
    
    app.delete('/habilidades/:id', validarToken, eliminarHabilidad);
}
