//bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//aplicação
const app = require('../../app');
//MOCK - importar o transfer service
const transferService = require('../../service/transferService')

//testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando recebo remetente e destinatário inexistentes recebo 404 e a mensagem de erro', async () => {
            const resposta = await request(app)
                .post('/api/transfers')
                .send({
                      remetente: "julio",
                      destinatario: "priscila",
                      valor: 200
                    });
        
        expect(resposta.status).to.equal(404);
        expect(resposta.body).to.have.property('message', 'Usuário remetente ou destinatário não encontrado.')
    });
            it('Usando Mocks: Quando recebo remetente e destinatário inexistentes recebo 404 e a mensagem de erro', async () => {
            //mocar apenas a função transfers do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
                transferServiceMock.throws({ message: 'xxxxx' });

                const resposta = await request(app)
                .post('/api/transfers')
                .send({
                      remetente: "julio",
                      destinatario: "priscila",
                      valor: 200
                    });
        
        expect(resposta.status).to.equal(404);
        expect(resposta.body).to.have.property('message', 'Usuário remetente ou destinatário não encontrado.')

        //reseto o mock
        sinon.restore();
    });
});


//describe('GET /transfers', () => {
    //its ficam aqui
});
//});