const { assert } = require("chai");
const { describe, it } = require("mocha");

const sum = (a,b) => {
    const newA = Number(a)
    const newB = Number(b)
    if(newA !== a || newB !== b){
        return 'error'
    } else {

        return a + b
    }
}


describe('Test unitario de mis usuarios', () => {
    it('Deberia retornar 8', (done) => {
        const miFuncionEjecutada = sum(6, 2)
        assert.equal(miFuncionEjecutada, 8)
    })
    it('Deberia retornar 25', (done) => {
        const miFuncionEjecutada = sum(10, 15)
        assert.equal(miFuncionEjecutada, 25)
    })
    it('Deberia retornar error cuando se manda un string', (done) => {
        const miFuncionEjecutada = sum(6,'hola')
        assert.equal(miFuncionEjecutada, 'error')
    })
})
