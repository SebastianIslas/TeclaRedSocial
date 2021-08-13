const {
    agregarProyecto,
    obtenerProyectos,
    obtenerProyectosUsuario,
    actualizarProyecto,
    eliminarProyecto,
} = require('../controllers/proyectos.controllers')

module.exports = (app) => {
    app.post('/proyectos', agregarProyecto);
    app.get('/proyectos', obtenerProyectos);
    app.get('/proyectos/:id', obtenerProyectosUsuario);
    app.put('/proyectos/:id', actualizarProyecto);
    app.delete('/proyectos/:id', eliminarProyecto);
}