const User = require('./user.model')
const Posts = require('./post.model')

const initModels = () => {
    User.hasMany(Posts)
    Posts.belongsTo(User)
}


module.exports = initModels