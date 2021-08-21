const express = require('express');
const app = express();

app.use(require('./amistad.routes'));
app.use(require('./habilidades.routes'));
app.use(require('./usuarios.routes'));

module.exports = app;