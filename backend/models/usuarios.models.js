const { Sequelize }  = require('sequelize');
const db = require('../db/db.conexion');

const Usuarios = db.define('usuarios',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    apellido: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ciudad: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pais: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    edad: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    estudios: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    idiomas: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    linkedin: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    hobbies: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    foto: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
        default: "Tu descripcion"
    },
    categoria: {
        type: Sequelize.ENUM('Backend', 'Frontend','Reclutador'),
        allowNull: false,
    },
    rol: {
        type: Sequelize.ENUM('Developer', 'Empresa'),
        allowNull: false,
    },
    eliminado: {
        type: Sequelize.INTEGER,
        default: 0
    }
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
});

module.exports = { Usuarios }