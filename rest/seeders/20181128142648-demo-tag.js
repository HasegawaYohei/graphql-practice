'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags', [{
      name: 'C',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'C++',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'C#',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'Objective-C',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'Swift',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'Java',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'Scala',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'Kotlin',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'Perl',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'Python',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'PHP',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'Ruby',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'JavaScript',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'TypeScript',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'Elm',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'Haskell',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'Ocaml',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'Lisp',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'Elixir',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    },{
      name: 'プログラミング',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', null, {});
  }
};
