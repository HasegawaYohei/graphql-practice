'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags', [{
      name: 'javascript',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', null, {});
  }
};
