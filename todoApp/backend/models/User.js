const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/connection'); // Assume this is where the Sequelize connection is initialized

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Users', // Ensure this matches the table name in the SQL file
      timestamps: false, // Disable timestamps
    });
  }
}

const bcrypt = require('bcrypt');

// Password hashing before saving
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// Password validation method
User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;