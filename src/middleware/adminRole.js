
const roleAdminMiddleware = (req, res, next) => {
    const roll = req.user.rol

    if(rol === 'admin'){
        next()
    } else {
        res.status(401).json({status: 'error', message: 'User not authorized to make this request'})
    }
}



module.exports = {
    roleAdminMiddleware
}