

const { Contactos } = require('../models/contactos.models');
const { Habilidades } = require('../models/habilidades.models');
//const habilidades_det = require('../models/habilidades_det.models');
const { Opiniones } = require('../models/opiniones.models');
const { Proyectos } = require('../models/proyectos.models');
const { Usuarios } = require('../models/usuarios.models');
const { Validaciones } = require('../models/validaciones.models');

Contactos.sync().then(() => {
    console.log('Tabla amigos creada');
})

Habilidades.sync().then( () => {
    console.log("Tabla habilidades creada");
})

Opiniones.sync().then( () => {
    console.log("Tabla opiniones creada");
})

Proyectos.sync().then( () => {
    console.log("Tabla proyectos creada");
})

Usuarios.sync().then( () => {
    console.log("Tabla usuarios creada");
})

Validaciones.sync().then( () => {
    console.log("Tabla validaciones creada");
})
