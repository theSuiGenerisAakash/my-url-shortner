
module.exports = (sequelize, DataTypes) => {
  const URLStore = sequelize.define('URLPairs', {
    longURL: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    shortURL: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        isAlphanumeric: true,
        len: [6, 6],
      },
    },
  }, {});
  URLStore.associate = function (models) {
    // associations can be defined here
  };
  return URLStore;
};
