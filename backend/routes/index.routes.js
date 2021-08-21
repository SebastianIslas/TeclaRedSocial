const express = require('express');
const app = express();

app.use(require('./amistad.routes'));
app.use(require('./habilidades.routes'));
app.use(require('./usuarios.routes'));
app.use(require('../auth/routes/login.routes'));

module.exports = app;