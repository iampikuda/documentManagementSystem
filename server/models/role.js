export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Role already taken.'
      },
      validate: {
        notEmpty: { msg: 'Title cannot be empty' },
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: {
            name: 'roleId'
          }
        });
      }
    },
    freezeTableName: true
  });
  return Role;
};
