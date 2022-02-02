module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      password:{
        allowNull:false,
        type:Sequelize.STRING
      },
      name:{
        allowNull:false,
        type:Sequelize.STRING
      },
      email: {
        allowNull:false,
        unique: true,
        type: Sequelize.STRING,
        validate: {
          isUnique(value, next) {
            user.find({
              where: { email: value },
              attributes: ['id']
            }).done((user) => {
              if (user)
                return next('errors.email.unique');
  
              next();
            });
          }
        }
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("Users"),
}