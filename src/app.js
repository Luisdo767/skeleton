//* Dependencias 
const express = require('express')
const passport = require('passport')
require('./middleware/auth.middleware')(passport)
const path = require('path')

//* Archivos de rutas 
const userRouter = require('./users/users.routes').router
const authRouter = require('./auth/auth.routes').router
const {db} = require('./utils/database')

//* Configuraciones iniciales
const app = express()

db.authenticate()
    .then(() => console.log('Database autenticated'))
    .catch((err) => console.log(err))

db.sync()
    .then(() => console.log("Database synced"))
    .catch(err => console.log(err))

//? Esta configuracion es para habilitar el req.body
app.use(express.json())


app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)


app.get('/api/v1/uploads/:imgName', (req, res) => {
    const imgName = req.params.imgName
    res.status(200).sendFile(path.resolve('uploads/') + '/' + imgName)
})



app.listen(8000, () => {
    console.log('Server started at port: 8000');
})



module.exports = app