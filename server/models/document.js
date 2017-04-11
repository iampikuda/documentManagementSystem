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
        },
        is: {
          args: /^[A-Za-z](\w|\s|-){2,254}$/i,
          msg:
          `The document title must start with a letter and be
          3 - 255 characters long can also contain spaces or hyphens.`
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Content cannot be empty'
        },
        is: {
          args: /^\w+/i,
          msg: 'The content should only contain alpha-numeric characters.'
        }
      }
    },
    access: {
      type: DataTypes.STRING,
      // allowNull: false,
      default: 'public',
      validate: {
        isIn: [['public', 'private', 'role']],
        msg: 'access can only be public, private or role'
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // Document.belongsTo(models.User, {
        //   foreignKey: { allowNull: true },
        //   onDelete: 'CASCADE',
        // });
      },
    },
    freezeTableName: true
  });
  return Document;
};
