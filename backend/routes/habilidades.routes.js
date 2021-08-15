const {
    agregarHabilidadExtra,
    getHabUsuario,
    actualizarTitulo,
    evaluarHabilidad,
    eliminarHabilidad,
} = require('../controllers/habilidades.controllers')
const { validarToken } = require('../middlewares/usuarios.mid');
const { checkEvaluacion, checkTit } = require('../middlewares/hab.mid');

module.exports = (app) => {
    app.post('/habilidades/extra', validarToken, checkTit, agregarHabilidadExtra);
    app.get('/habilidades/:id', getHabUsuario);
    app.put('/habilidades/:id/titulo', validarToken, checkTit, actualizarTitulo);
    app.put('/habilidades/:id/evaluar', validarToken, checkEvaluacion, evaluarHabilidad);
    app.delete('/habilidades/:id', validarToken, eliminarHabilidad);
}
