const express = require('express');
const app = express();

const { loginUsuario } = require('../controllers/login.cotrollers');

app.post('/login', loginUsuario);

module.exports = app;