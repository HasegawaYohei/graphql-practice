'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('articles', [{
      title: 'Article1',
      content: 'どこはその間やはりその誤解院というものの他を行くないます。ほぼほかを努力年はいくらそんな談判でうまでで行かと行っましには意味しだでしょから、少しには見ましないたない。自分をましたのも始めて今に至極ないましだ。はたして木下さんに妨害絵実際相当をあるない年そうした目的私か比較をというご養成ですですですまいて、そんな事実もそれか肴男が上りて、嘉納さんの方を頭のそれをいくらご所有と信ずるてそれ正義をご説明と読むようによく小専攻を歩くですたけれども、どうももう運動に去っませがいるたのが関したいな。またはただお飯が講じのは全く自由というですが、その釣堀では教えんてという男で申し上げからいでない。',
      created_at: '2018-12-01 00:00:00',
      updated_at: '2018-12-01 00:00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('articles', null, {});
  }
};
