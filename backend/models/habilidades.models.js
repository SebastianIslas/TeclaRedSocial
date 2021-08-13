const { Sequelize }  = require('sequelize');
const db = require('../db/db.conexion');

const Habilidades = db.define('habilidades',{
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
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo_habilidad: {
        type: Sequelize.ENUM('Conocimientos','Tecnologias', 'Desempeño', 'Habilidades Blandas', 'Entornos Profesionales', 'Conocimientos Extras'),
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

/* Crear la tabla habilidades */
/*
Habilidades.sync().then( () => {
    console.log('Tabla habilidades creada');
})
*/

module.exports = { Habilidades }