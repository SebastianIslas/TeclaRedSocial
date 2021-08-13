const { Sequelize }  = require('sequelize');
const db = require('../db/db.conexion');

const Amigos = db.define('amigos',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    id_amigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
});

/* Crear la tabla amigos */
/*
Amigos.sync().then( () => {
    console.log('Tabla amigos creada');
})
*/
module.exports = { Amigos }
