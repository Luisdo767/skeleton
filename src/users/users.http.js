const userControllers = require('./users.controllers')



const getAll =  (req, res) => {
    userControllers.getAllUsers()
        .then((response) => {
            res.status(200).json({
            items: response.length,
            users: response,
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
}


const getById = (req, res) => {
    const id = req.params.id
    userControllers.getUserById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(404).json({message: `El usuario con el id ${id} no existe`, err})
        })
}


const register = (req, res) => {
    const data = req.body
    if(!data){
        return res.status(400).json({message: 'Miising Data'})
    }
    if(
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.password ||
        !data.birthday_date ||
        !data.country 
    ){
        return res.status(400).json({
            message: 'All fields must be completed', 
            fields: {
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                password: 'string',
                birthday_date: 'DD/MM/YYYY',
                country: 'string'
            }})
    } else {
        userControllers.createUser(data)
            .then(response => {
                res.status(201).json({message: `User created succesfully with id: ${response.id}`, user: response })
            })
            .catch(err => {
                res.status(400).json({message: err})
            })
    }
}


const edit = (req, res) => {
    const id = req.params.id 
    const data = req.body
    if(!Object.keys(data).length){
        return res.status(400).json({message: 'Missing Data'})
    } else if (
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.phone ||
        !data.rol ||
        !data.profile_image ||
        !data.birthday_date ||
        !data.country ||
        !data.is_active
    ){
        return res.status(400).json({
                message: 'All fields must be completed', 
                fields: {
                    first_name: 'string',
                    last_name: 'string',
                    email: 'example@example.com',
                    phone: '+52123123123',
                    rol: 'normal',
                    profile_image: 'example.com/img/example.png',
                    birthday_date: 'DD/MM/YYYY',
                    country: 'string',
                    is_active: true
            }})
    } else {
        const response = userControllers.editUser(id, data)
        return res.status(200).json({message: 'User Created Succesfully', user: response})
    }
}


const remove = (req, res) => {
    const id = req.params.id
    userControllers.deleteUser(id)
        .then(response => {
            if(response){
                res.status(204).json()
            } else {
                res.status(400).json({message: 'Invalid ID'})
            }
        })
        
}


const editMyUser = (req, res) => {
    const id = req.user.id
    const data = req.body
    if(!Object.keys(data).length){
        return res.status(400).json({message: 'Missing Data'})
    } else if (
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.phone ||
        !data.profile_image ||
        !data.birthday_date ||
        !data.country ||
        !data.is_active
    ){
        return res.status(400).json({
                message: 'All fields must be completed', 
                fields: {
                    first_name: 'string',
                    last_name: 'string',
                    email: 'example@example.com',
                    phone: '+52123123123',
                    rol: 'normal',
                    profile_image: 'example.com/img/example.png',
                    birthday_date: 'DD/MM/YYYY',
                    country: 'string',
                    is_active: true
            }})
    } else {
        const response = userControllers.editUser(id, data)
        return res.status(200).json({message: 'User Created Succesfully', user: response})
    }
}


const getMyUser = (req, res) => {
    const id = req.user.id
    const data = userControllers.getUserById(id)
    if(data){
        res.status(200).json(data)
    } else {
        res.status(404).json({message: `El usuario con el id ${id} no existe`})
    }
}


const removeMyUser = (req, res) => {
    const id = req.user.id;
    const data = userControllers.deleteUser(id)
    if(data){
      res.status(204).json()
    } else {
      res.status(400).json({message: 'invalid id'})
    }
  }


const postProfileImg = (req, res) => {
    const userId = req.user.id
    const imgPath = req.hostname + ':8000' + '/api/v1/uploads/' + req.file.filename
    const data = userControllers.editProfileImg( imgPath, userId)

    res.status(200).json(data)

}


module.exports = {
    getAll,
    getById,
    register,
    remove,
    edit,
    editMyUser,
    getMyUser,
    removeMyUser,
    postProfileImg
}