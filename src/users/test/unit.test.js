const { assert } = require("chai");
const { describe, it } = require("mocha");

const userControllers = require('../users.controllers')

describe('Test unitario de mis usuarios', () => {
    it('Should return new user when I send correct data', (done) => {
        const body = {
            first_name: "Usuario de test",
            last_name: "Tester",
            email: "test@academlo.com",
            password: "1234",
            phone: "1234567890",
            birthday_date: "22/10/2000",
            country: "mexico",
        }
        const data = userControllers.createUser(body)
        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, '')
        done()
    })
    it('Should return new user when I send correct data', (done) => {
        const body = {
            first_name: "Usuario de test",
            last_name: "Tester",
            email: "test@academlo.com",
            password: "1234",
            phone: "1234567890",
            birthday_date: "22/10/2000",
            country: "mexico",
            profile_image: 'asd'
        }
        const data = userControllers.createUser(body)
        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, 'asd')
        assert.typeOf(data.id, 'string')
        assert.property(data, 'is_active')
        done()
    })

    it('Should return the user when I sent a correct ID', (done) => {
        const data = userControllers.getUserById('74cd6011-7e76-4d6d-b25b-1d6e4182ec2f')

        assert.property(data, 'id')
        assert.property(data, 'email')
        assert.property(data, 'rol')
        assert.property(data, 'first_name')
        assert.property(data, 'last_name')
        assert.equal(data.rol, 'admin')
        assert.equal(data.email, 'sahid.kick@academlo.com')
        assert.equal(data.first_name, 'Sahid')
        assert.property(data, 'is_active')
        assert.equal(data.is_active, true)
        assert.typeOf(data.is_active, 'boolean')

        done()
    })

    it('Should return an error when I sent an invalid ID', (done) => {
        const data = userControllers.getUserById(1)

        assert.typeOf(data, 'boolean')
        assert.equal(data, false)

        done()
    })
})


