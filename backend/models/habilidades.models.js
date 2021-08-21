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
    categoria: {
        type: Sequelize.ENUM('Conocimientos','Tecnologias', 'Desempeño', 'Habilidades Blandas', 'Entornos Profesionales', 'Conocimientos Extras'),
        allowNull: false,
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    evaluacion: {
        type: Sequelize.FLOAT,
        allowNull: false,
        //Si tabla validaciones no tiene registros con este id, este campo debe ser 0
        defaultValue: 0    //0 = "Sin evaluacion" en front
    }
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
});

module.exports = { Habilidades }