export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      defaultValue: 'regular',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Title cannot be empty' },
        isIn: [['admin', 'regular']]
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Role.hasMany(models.User);
      }
    }
  });
  return Role;
};
