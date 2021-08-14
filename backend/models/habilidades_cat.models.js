const { Sequelize }  = require('sequelize');
const db = require('../db/db.conexion');

const HabilidadesCat = db.define('habilidades_cat',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
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

Habilidades.sync().then( () => {
    console.log('Tabla habilidades creada');
})


module.exports = { HabilidadesCat }