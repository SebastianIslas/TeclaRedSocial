const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const sequelize = new Sequelize(process.env.DB_NAME, null, null, {
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