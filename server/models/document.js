export default (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'onwerId must be a number'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Content cannot be empty'
        }
      }
    },
    access: {
      type: DataTypes.STRING,
      // allowNull: false,
      defaultValue: 'public',
      validate: {
        isIn: {
          args: [['public', 'private', 'role']],
          msg: 'access can only be public, private or role'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Document.belongsTo(models.User, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE',
        });
      },
    },
    freezeTableName: true
  });
  return Document;
};
