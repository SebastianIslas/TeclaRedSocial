const {
    agregarHabilidadExtra,
    obtenerHabilidadesUsuario,
    actualizarHabilidad,
    eliminarHabilidad,
} = require('../controllers/habilidades.controllers')

module.exports = (app) => {
    app.post('/habilidades/extra', agregarHabilidadExtra);
//    app.get('/habilidades/:id', obtenerHabilidadesUsuario);
//    app.put('/habilidades/extra:id', actualizarHabilidad);
//    app.delete('/habilidades/extra:id', eliminarHabilidadExtra);
}