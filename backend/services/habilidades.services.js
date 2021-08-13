class habilidadesService{
    constructor(){
        this.habilidades = {
            'Conocimientos' : [],
            'Tecnologias' : [],
            'Desempeño' : [],
            'Habilidades Blandas' : [],
            'Entornos Profesionales' : []
        }
    }
}

let hab = new habilidadesService();
console.log(hab.habilidades)
console.log(hab.habilidades['Desempeño'].push('sebas'))
console.log(hab.habilidades['Desempeño'])
