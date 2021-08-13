const {
    agregarHabilidadExtra,
    obtenerHabilidadesUsuario,
    actualizarHabilidad,
    eliminarHabilidad,
} = require('../controllers/habilidades.controllers')

module.exports = (app) => {
    app.post('/habilidades', agregarHabilidadExtra);
    app.get('/habilidades/:id', obtenerHabilidadesUsuario);
    app.put('/habilidades/:id', actualizarHabilidad);
    app.delete('/habilidades/:id', eliminarHabilidad);
}