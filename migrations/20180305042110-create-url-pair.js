
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('URLPairs', {
    longURL: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    shortURL: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('URLPairs'),
};
