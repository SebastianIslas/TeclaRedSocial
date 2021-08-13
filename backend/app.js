const express = require('express');
const app = express();
const sequelize = require('./db/db.conexion');
const cors = require('cors');
require('dotenv').config()

const usuariosRoutes = require('./routes/usuarios.routes');

/* Middlewares Globales */
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

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

<<<<<<< HEAD
/* Rutas que usaremos */
usuariosRoutes(app);
=======
const proyectosRouter = require('./routes/proyectos.routes');


proyectosRouter(app);
>>>>>>> 7353b38d8547e73f74024e23cbd3656a5a9d2a3e
