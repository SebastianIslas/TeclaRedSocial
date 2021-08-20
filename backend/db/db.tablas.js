
const { Amistad } = require('../models/amistad.models');
const { Habilidades } = require('../models/habilidades.models');
//const habilidades_det = require('../models/habilidades_det.models');
const { Opiniones } = require('../models/opiniones.models');
const { Proyectos } = require('../models/proyectos.models');
const { Solicitud } = require('../models/solicitud.models');
const { Usuarios } = require('../models/usuarios.models');
const { Validaciones } = require('../models/validaciones.models');


Usuarios.sync().then( () => {
    console.log("Tabla usuarios creada");
})

Amistad.sync().then(() => {
    console.log('Tabla Amistad creada');
})

Solicitud.sync().then(() => {
    console.log('Tabla Solicitud creada');
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

Validaciones.sync().then( () => {
    console.log("Tabla validaciones creada");
})
