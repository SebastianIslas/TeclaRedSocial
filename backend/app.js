const express = require('express');
const app = express();
require('dotenv').config()

/* Middlewares Globales */
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

/* Arranque del servidor. */
app.listen(process.env.PORT, async () => {
    try {
        console.log('Server On Port: ' + process.env.PORT);
    } catch (error) {
        console.log('No se pudo iniciar. ');
    }
})