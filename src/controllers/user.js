//user.js
const User = require("../models").User;
const bcrypt = require("bcryptjs");
const {authSchema} = require("../validators/auth")
const securePassword = require('../utils/securePassword');
const getSignedToken = require('../utils/getSignedToken');
const SuccessResponse = require("../utils/success")
const ErrorResponse = require("../utils/error")

module.exports = {

    
    async login(req, res, next){
        try{
            const result = await authSchema.validateAsync(req.body)
            const user = await User.findOne({ where:{email: req.body.email}});
            if(!user){
                return next(new ErrorResponse("An account for this email does not exist", 404));
 
            }
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if(!validPass){
                return next(new ErrorResponse("E-mail or password is wrong", 400));
            }
            const token = await getSignedToken(user);
            return SuccessResponse(res, "Login successfull", token,  200)
 
          }catch(e){
            return next(new ErrorResponse(e.message, 500));

          }
    },
    
  async getAllUsers(req, res, next) {
    try {
      const userCollection = await User.find({})
      return SuccessResponse(res, "Users retrieved successfully", userCollection,  200)
    } catch (e) {
      console.log(e)
      return next(new ErrorResponse(e.message, 500));
    }
  },
  async createUser(req, res, next) {
    try {
 
      const userExists = await User.findOne({ where:{email: req.body.email}});
      if(userExists != null){
            // return res.status(400).json({error_msg: "Email already exists"});
            return ErrorResponse("E-mail already exists",  400)
        }
        const userCollection = await User.create({
            email: req.body.email,
            name: req.body.name,
            password: await securePassword(req.body.password),
        })
        const token = await getSignedToken(userCollection);
        return SuccessResponse(res, "User created successfully", token,  201)
  
    } catch (e) {
      console.log(e)
      return ErrorResponse(e.message,  500)
    }
  },

}