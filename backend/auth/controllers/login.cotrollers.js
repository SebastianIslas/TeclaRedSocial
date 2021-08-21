const bcrypt = require('bcrypt');
const { Usuarios } = require('../../models/usuarios.models');
const { crearJWT } = require('../services/crearJWT.service');

/* Función que logea a un usuario retornando un token */
const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuarios.findOne({ where: { email } }); //Encuentra un usuario de acuerdo al email dado
        if (!usuario) {
            res.status(400).json('Datos incorrectos.') //Si el usuario no existe marca error.
        }
        const passwordDB = usuario.dataValues.password; 
        const passwordCorecto = bcrypt.compareSync(req.body.password, passwordDB); //Compueba si la contraseña es correcta.
        if (!passwordCorecto) {
            return res.status(400).json('Datos incorrectos.');
        }
        if (usuario.dataValues.eliminado == 1) {
            await Usuarios.update({ eliminado: 0 }, { where: { id: usuario.dataValues.id } }); //En caso que el usuario este deshabilidato, lo activa
        }
        const token = await crearJWT(usuario.dataValues.id); //Genera un token para el usuario
        return res.status(200).json({ token: token});
    } catch (err) {
        res.status(400).json({ message: 'Datos incorrectos.' })
    }
}

module.exports = { loginUsuario }