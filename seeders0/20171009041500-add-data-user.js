'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
        username: 'johndoe',
        // password: 'foobar',
        password: 'b69d87d9f5577f604b0af8bd8ded03616c9b918e7d8635a23bad30008656ee78',
        salt: '8EltaEsd0',
        role: 'teacher',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        username: 'pakdengklek',
        // password: 'gogetgold',
        password: 'beff405a1a7a30039b623aa7316c15997fa896b1845dbc67a71c7cde5da6a624',
        salt: '0yAFbfKm2',
        role: 'academic',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        username: 'charlesxavier',
        // password: 'magnetowhy',
        password: '338f498706f420ce200b11feadbbbebae9ba15aefce4cb31e294d642fdc2bf31',
        salt: 'bLR8wPoO5',
        role: 'headmaster',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        username: 'admin',
        // password: 'adminjos01',
        password: 'a927b8e73933d78a68ce49a57dc839ba2dfc8280639e9682f9cfeac6a0f40487',
        salt: 'AlsANB8Nm',
        role: 'headmaster',
        createdAt : new Date(),
        updatedAt : new Date()
      }],
    {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
