'use strict';
const genSalt=require('../helper/saltGen');
const createHash=require('../helper/hash');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks:{
      beforeCreate:(user)=>{
        let salt=genSalt();
        user.salt=salt;
        // console.log('beforeCreate cuy');
        // console.log(user.password);
        // console.log(createHash(user.password,salt));
        user.password=createHash(user.password,salt);
      },
      // beforeUpdate:(user)=>{console.log(user);
      //   let salt=genSalt();
      //   user.salt=salt;
      //   console.log('beforeUpdate cuy');
      //   // console.log(user.password);
      //   console.log(createHash(user.password,salt));
      //   user.password=createHash(user.password,salt);
      // }
    }
  });
  return User;
};
