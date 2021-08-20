const { Sequelize }  = require('sequelize');
const db = require('../db/db.conexion');

const Solicitud = db.define('solicitud',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_solicitante: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    id_solicitado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    aceptado: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
});

const obtenerSolicitudes = (id_solicitado) => {
    const solicitudes = db.query(`SELECT dbo.usuarios.id, dbo.usuarios.nombre, dbo.usuarios.apellido, dbo.usuarios.foto FROM  dbo.usuarios
    JOIN dbo.solicituds ON dbo.usuarios.id = dbo.solicituds.id_solicitante
    WHERE dbo.solicituds.id_solicitado = ${id_solicitado};`)
    return solicitudes;
}



module.exports = { Solicitud, obtenerSolicitudes }
