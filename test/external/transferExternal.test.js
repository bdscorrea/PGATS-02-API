//bibliotecas
const request = require('supertest');
const { expect } = require('chai');


//testes
describe('Transfer Controller External', () => {
    describe('POST /transfers', () => {
        it('Quando recebo remetente e destinatário inexistentes recebo 404 e a mensagem de erro', async () => {
            const resposta = await request('http://localhost:3000')
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
});
