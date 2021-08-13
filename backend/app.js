const express = require('express');
const app = express();
const sequelize = require('./db/conexion');
require('dotenv').config()

/* Middlewares Globales */
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

/* Arranque del servidor. */
app.listen(process.env.PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('DB conectada correctamente');
        console.log('Server On Port: ' + process.env.PORT);
    } catch (error) {
        console.log('No se pudo iniciar. ');
    }
})

const proyectosRouter = require('./routes/proyectos.routes');


proyectosRouter(app);
