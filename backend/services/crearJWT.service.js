const jwt = require('jsonwebtoken')

const crearJWT = (id_usuario = '') => {
    return new Promise((resolve, reject) => {
        //verificar solo el id_usuario
        const payload = { id_usuario };
        jwt.sign(payload, 'secretkey', {
            expiresIn: '999h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    crearJWT
}