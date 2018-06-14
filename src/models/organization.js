

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Parent: DataTypes.STRING,
    Logo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ContactPerson: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Position: DataTypes.STRING,
    Phone: DataTypes.STRING,
    Background: DataTypes.STRING,
    website: {
      type: DataTypes.STRING,
      allowNull: false
    },
    facebook: DataTypes.STRING,
    FundingPartner: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Languages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    Causes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
  Organization.associate = (models) => {
    Organization.hasMany(models.Project, {foreignKey: 'organizationId'});
    Organization.hasMany(models.Photos, {foreignKey: 'organizationId'});
  };

  Organization.beforeCreate((photographer, options) => bcrypt.hash(photographer.Password, 10)
    .then(hash => {
      photographer.Password = hash;
    })
    .catch(err => {
      throw new Error(err);
    }));

  Organization.prototype.isValidPassword = function (password) {
    return bcrypt.compare(password, this.Password);
  };
  return Organization;
};
