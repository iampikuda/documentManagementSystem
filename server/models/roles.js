module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Roles.hasMany(models.User, {
          foreignKey: 'rolesId',
          as: 'user',
        });
      }
    }
  });
  return Roles;
};
