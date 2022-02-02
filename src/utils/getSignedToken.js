require("dotenv").config();
const jwt = require('jsonwebtoken');
const getSignedToken = async(user) => {
    const token = jwt.sign({ 
        id: user.id, 
        name: user.name, 
        email: user.email,
        password: user.password  }, 
        process.env.TOKEN_SECRET, { expiresIn: '3h' });
        return token;
}

module.exports = getSignedToken;