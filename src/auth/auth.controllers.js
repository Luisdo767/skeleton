const {comparePassword} = require('../utils/crypt')
const {getUserByEmail} = require('../users/users.controllers')


const loginUser = (email, password) => {
    const user = getUserByEmail(email)
    //? user.password contraseña hasheada
    //* password contraseña en texto plano
    if(user){
        const verify_password = comparePassword(password, user.password)
        if(verify_password){
            return user
        }
    }
    return false
}


module.exports = {
    loginUser
}


