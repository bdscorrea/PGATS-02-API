//bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//aplicação
const app = require('../../app');

//testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando recebo remetente e destinatário inexistentes recebo 404 e a mensagem', async () => {
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
});


describe('GET /transfers', () => {
    //its ficam aqui
});
});