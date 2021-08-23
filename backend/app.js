const express = require('express');
const app = express();
const sequelize = require('./db/db.conexion');
const { corsOption, limiter } = require('./middlewares/index.mid');
require('dotenv').config()

/* Cors */
const cors = require('cors');

const proyectosRouter = require('./routes/proyectos.routes');

/* Middlewares Globales */
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(limiter);


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

app.use( cors(corsOption), require('./routes/index.routes'));
proyectosRouter(app);