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
        type: Sequelize.INTEGER,
        allowNull: false,
        //Si tabla validaciones no tiene registros con este id, este campo debe ser 0
        defaultValue: 0,    //0 = "Sin evaluacion" en front
        validate: {
            customValidator(value) {
              if (value < 0 || value > 5) {
                throw new Error("La evaluacion debe ser entre 1 y 5");
              }
            }
        },
    }
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