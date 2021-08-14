  
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const url = 'http://localhost:3000';
chai.use(chaiHttp);

describe('Test a la ruta "usuarios" de la api, usando EXPECT ', () => {
    it('Nos deberia regresar el listado de usuarios', (done) => {
        chai.request(url)
            .get('/usuarios')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body).not.be.undefined;
                done();
            })
    })
});