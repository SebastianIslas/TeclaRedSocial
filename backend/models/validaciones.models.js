const { Sequelize }  = require('sequelize');
const db = require('../db/db.conexion');

const Validaciones = db.define('validaciones',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_habilidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'habilidades',
            key: 'id'
        }
    },
    id_evaluador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    Calificacion: {
        type: Sequelize.INTEGER,    //Validar que solo sea de 1 a 5 en back y front
        allowNull: false,
    },
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
});

/* Crear la tabla usuarios */

Validaciones.sync().then( () => {
    console.log('Tabla validaciones creada');
})


module.exports = { Validaciones }