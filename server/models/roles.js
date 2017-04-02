export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Role title already taken.'
      },
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Roles.hasMany(models.User, {
          foreignKey: 'rolesId',
        });
      }
    }
  });
  return Roles;
};
