const md5 = require('md5');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const longURLtemplate = 'http://aakashverma.com/';
    const shortURLSet = new Set();
    const longURLArr = [];
    let longURLInstance = '';
    let shortURLInstance = '';
    let urlObj = {};
    let md5Instance = '';
    for (let i = 0; i < 1000000; i += 1) {
      longURLInstance = `${longURLtemplate}${i}`;
      md5Instance = md5(longURLInstance);
      shortURLInstance = md5Instance.substr(0, 6);
      let incrSubs = 1;
      while (shortURLSet.has(shortURLInstance)) {
        shortURLInstance = md5Instance.substr(incrSubs, 6);
        incrSubs += 1;
      }
      shortURLSet.add(shortURLInstance);
      const time = new Date();
      urlObj = {
        longURL: longURLInstance,
        shortURL: shortURLInstance,
        createdAt: time,
        updatedAt: time,
      };
      longURLArr.push(urlObj);
    }
    return queryInterface.bulkInsert('URLPairs', longURLArr);
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('URLPairs', {}),
};
