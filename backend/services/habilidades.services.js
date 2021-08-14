class habilidadesService{
    constructor(){
        this.habilidades = {
            'Conocimientos' : [],
            'Tecnologias' : [],
            'Desempeño' : [],
            'Habilidades Blandas' : [],
            'Entornos Profesionales' : []
        }
        this.habilidadesDefault();
    }
    habilidadesDefault(){
        this.setHabilidad('Conocimientos','Base de datos');
        this.setHabilidad('Conocimientos','APIS');
        this.setHabilidad('Conocimientos','Testings');
        this.setHabilidad('Conocimientos','Seguridad');
        this.setHabilidad('Conocimientos','Teoria de objetos');
        this.setHabilidad('Tecnologias','NodeJs');
        this.setHabilidad('Tecnologias','Frontend');
        this.setHabilidad('Tecnologias','Swagger');
        this.setHabilidad('Tecnologias','Javascript');
        this.setHabilidad('Desempeño','Calidad de código');
        this.setHabilidad('Desempeño','Velocidad de entrega');
        this.setHabilidad('Desempeño','Perfomance del código');
        this.setHabilidad('Habilidades Blandas','Enfocado');
        this.setHabilidad('Habilidades Blandas','Trabajo en equipo');
        this.setHabilidad('Habilidades Blandas','Comprometido');
        this.setHabilidad('Habilidades Blandas','Comunicación');
        this.setHabilidad('Habilidades Blandas','Capacidad de aprendizaje');
        this.setHabilidad('Habilidades Blandas','Resolución de problemas');
        this.setHabilidad('Entornos Profesionales','Versionado - Github');
        this.setHabilidad('Entornos Profesionales','Trello - Jira');
        this.setHabilidad('Entornos Profesionales','Slack');
        this.setHabilidad('Entornos Profesionales','Metodologias Agiles');
    };
    setHabilidad(categoria, titulo) {
        this.habilidades[categoria].push(titulo);
    }

    getHabilidades(){
        return this.habilidades
    }

}

let habService = new habilidadesService();

/*
Object.entries(habService.getHabilidades()).forEach(categoria => {
    categoria[1].forEach(habilidad =>{
        console.log(categoria[0] +" , "+ habilidad)
    })
})
*/
module.exports = { habService }
