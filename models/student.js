'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail: true,
        // ,isUnique: function(value, next){
        //   let oldId = this._modelOptions.whereCollection.id;
        //   console.log('oldId====',oldId);
        //   Student.find({where: {email: value}})
        //   .then(function (student) {
        //     console.log('new id',student.id);
        //     console.log('old id',oldId);
        //       // reject if a different student wants to use the same email
        //       if (parseInt(oldId) !== student.id) {
        //           return next('Email already in use!');
        //       }
        //       return next();
        //   })
        //   .catch(function (err) {
        //       return next(err);
        //   });
        // }
      },
      unique:{
        unique:true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  // Instance Method
  Student.prototype.getFullName = function () {
    return `${this.first_name} ${this.last_name}`
  }
  Student.associate=function (models){
    // Student.hasMany(models.StudentSubject);
    Student.belongsToMany(models.Subject, {through:'StudentSubject'});
  }
  return Student;
};
