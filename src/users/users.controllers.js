const uuid = require('uuid')
const crypt = require('../utils/crypt')
const Users = require('../models/user.model')

const userDB = [{
    "id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    "first_name": "Sahid",
    "last_name": "Kick",
    "email": "sahid.kick@academlo.com",
    "password": "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
    "phone": "1234567890",
    "birthday_date": "22/10/2000",
    "rol": "admin",
    "profile_image": "",
    "country": "mexico",
    "is_active": true,
    "verified": false
}]


const getAllUsers = async() => {
    const data = await Users.findAll({

        attributes: {
            exclude: ['password']
        }
    })

    return data
    //? select * from users;
}


const getUserById = async (id) => {

    const data = await Users.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['password']
        }
    })
    return data
    //? select * from users where id = ${id};
}


const createUser = async (data) => {
    
    const newUser = await Users.create({
        ...data,
        id: uuid.v4(), 
        password: crypt.hashPassword(data.password), 
        rol: 'normal', 
        is_active: true, 
        verified: false
    })

    return newUser
}


const editUser = async(userId, data, userRol) => {

    if(userRol === 'admin'){
        const {id, password, verified, ...newData} = data
        const response = await Users.update({
            ...newData
        }, {
            where: {
                id: userId
            }
        })
        return response 
    } else {

    }
    

    /**
     * 
     if(index !== -1){
         userDB[index] = {
             id: id,
             first_name: data.first_name,
             last_name: data.last_name, 
             email: data.email,
             password: userDB[index].password,
             phone: data.phone, 
             birthday_date: data.birthday_date, 
             rol: data.rol, 
             profile_image: data.profile_image,
             country: data.country, 
             is_active: data.is_active, 
             verified: false 
         }
         return userDB[index]
     } else {
         return createUser(data)
     }
     */
}


const deleteUser = async(id) => {
    const data = await Users.destroy({
        where: {
            id
        }
    })
    return data
}


const getUserByEmail = (email) => {
    const data = userDB.filter(item => item.email == email)
    return data.length ? data[0] : false
    //? select * from users where email = ${email};
}


const editProfileImg = (imgUrl, userId) => {
    const index = userDB.findIndex(item => item.id === userId)
    if(index !== -1){
        userDB[index].profile_image = imgUrl
        return userDB[index]
    } else {
        return false
    }

}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
    getUserByEmail,
    editProfileImg
}