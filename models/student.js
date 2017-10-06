'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail: true,
        isUnique: (value, next)=>{
          Student.find({
              where: {email: value},
              attributes: ['id']
          })
          .done((error, Student)=>{
              if (error)
                  return next('Email address already in use!');
              if (Student)
                  return next(Student);
              next();
          });
        }
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
  return Student;
};
