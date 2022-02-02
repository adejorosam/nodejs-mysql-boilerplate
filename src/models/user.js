//User Schema
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define("User", {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password:DataTypes.STRING
    })
    
    User.associate = function(models) {
      User.hasMany(models.Product, {
        onDelete: "CASCADE",
        foreignKey: "userId",
      })
    }

    User.associate = function(models) {
      User.hasMany(models.Cart, {as: 'carts'})
    };

    return User
  }