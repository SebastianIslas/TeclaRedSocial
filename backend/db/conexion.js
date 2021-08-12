const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize('presupuestos', null, null, {
  dialect: 'mssql',
  server: process.env.DB_HOST,
  dialectOptions: {
    authentication: {
      type: 'default',
      options: {
        encrypt: false,
        userName: process.env.DB_USR,
        password: process.env.DB_PASS,
        trustServerCertificate: true,
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1'
        }
      }
    },
  }
})

module.exports = sequelize;