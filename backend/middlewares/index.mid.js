require('dotenv').config();
const rateLimit = require('express-rate-limit');

const corsOption = {
    origin: function (origin, callback) {
        if (process.env.LISTA_BLANCA.indexOf(origin) !== -1){
            callback(null, true);
        } else {
            callback(new Error('No autorizado por CORS'))
        }
    }
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 10000,
    max: 10,
    message: 'Exceso de peticiones. '
});

module.exports = { corsOption, limiter }