//user.js
const User = require("../models").User;
const bcrypt = require("bcryptjs");
const {authSchema} = require("../validators/auth")
const securePassword = require('../utils/securePassword');
const getSignedToken = require('../utils/getSignedToken');

module.exports = {

    
    async login(req, res, next){
        try{
            const result = await authSchema.validateAsync(req.body)
            const user = await User.findOne({ where:{email: req.body.email}});
            if(!user){
                return res.status(400).json({error_msg: "An account for this email does not exist"});
            }
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if(!validPass){
                return res.status(400).json({error_msg: "E-mail or password is wrong"});
            }
            const token = await getSignedToken(user);
            return res.status(200).json({token: token});
            
          }catch(e){
            return next(new ErrorResponse(e.message, 500));

          }
    },
    
  async getAllUsers(req, res, next) {
    try {
      const userCollection = await User.find({})
      return res.status(201).send(userCollection)
    } catch (e) {
      console.log(e)
      return next(new ErrorResponse(e.message, 500));

    }
  },
  async createUser(req, res, next) {
    try {
 
      const userExists = await User.findOne({ where:{email: req.body.email}});
      if(userExists != null){
            return res.status(400).json({error_msg: "Email already exists"});
        }
        const userCollection = await User.create({
            email: req.body.email,
            name: req.body.name,
            password: await securePassword(req.body.password),
        })
        const token = await getSignedToken(userCollection);
        return res.status(201).json({
            success:true, 
            msg: "User created successfully",
            data: token
        });    
    } catch (e) {
      console.log(e)
      return res.status(500).send(e.message)
    }
  },

}