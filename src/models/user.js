//User Schema
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define("User", {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password:DataTypes.STRING
    })
    

    return User
  }