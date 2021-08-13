const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize('teclas', null, null, {
  dialect: 'mssql',
  server: process.env.DB_HOST,
  dialectOptions: {
    authentication: {
      type: 'default',
      options: {
        encrypt: false,
        userName: 'sam',
        password: '1234',
        trustServerCertificate: true,
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1'
        }
      }
    },
  }
})

module.exports = sequelize;