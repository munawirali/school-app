const express = require('express')
const router = express.Router()
const models = require('../models');
const scoreLeter=require('../helper/scoreLeter');

router.get('/',(req,res)=>{
  models.Subject.findAll({
    order:[['subject_name','asc']]
  })
  .then(rowsSubjects=>{
    let promiseSubject=rowsSubjects.map(dataSubjects=>{
      return new Promise(function(resolve,reject){
        dataSubjects.getTeachers()
        .then(teachers=>{
          // console.log(teachers);
          if (teachers) {
            let newTeachers=teachers.map(x=>{return x.getFullName()})
            // console.log('arr teachers',newTeachers);
            dataSubjects["teachers"]=newTeachers
          } else {
            dataSubjects["teachers"]='Unassign';
          }
          resolve(dataSubjects);
        })
        .catch(err=>{
          reject(err);
        })
      })
    })
    Promise.all(promiseSubject)
    .then(newDataSubject=>{
      console.log(promiseSubject);
      // res.send(newDatateacher)
      res.render('subject',{data:newDataSubject,title:`School Applications : Data Subjects`});
    })

  })
  .catch(err=>{
    res.send(err);
  })
})
// models.Subject.findAll({
//   where:{
//     id:req.params.id
//   },
//   include:[{
//     model:models.Student}]
//   // order:[[model.ConjStudentSubject,model.Students,'first_name','ASC']]
// })
router.get('/:id/enrolledstudents',(req,res)=>{
  models.Subject.findAll({
    where:{
      id:req.params.id
    },
    include:[{
      model:models.Student}],
      order:[[models.Student,'first_name','ASC']]
  })
  .then(rows=>{
    // res.send(rows);
    if (rows[0].Students.length>0) {
      for (var i = 0; i < rows[0].Students.length; i++) {
        rows[0].Students[i].setDataValue('score_leter',scoreLeter(rows[0].Students[i].StudentSubject.score));
      }
      // res.send(rows)
      res.render('subject_enrolled_student',{data:rows,title:`School Applications : Enrolled Students to Subjects`})
    } else {res.redirect('/subjects')}
  })
  .catch(err=>{
    res.send(err);
  })
})

router.get('/:StudentId/:SubjectId/givescore',(req,res)=>{
  // console.log('StudentId='+req.params.StudentId+'SubjectId='+req.params.SubjectId);
  models.StudentSubject.findAll({
    where:{
      StudentId:req.params.StudentId,
      SubjectId:req.params.SubjectId
  },
    include:[{model:models.Student},{model:models.Subject}],
  })
  .then(rows=>{
    // console.log(rows);
    // res.send(rows);
    res.render('subject_give_score',{data:rows,title:`School Applications : Give Score`})
  })
})
router.post('/:StudentId/:SubjectId/givescore',(req,res)=>{
  // res.send(req.params.id);
  models.StudentSubject.update({
    score:req.body.score
  },{
    where:{
      StudentId:req.params.StudentId,
      SubjectId:req.params.SubjectId
    }
  })
  .then(()=>{
    res.redirect(`/subjects/${req.params.SubjectId}/enrolledstudents`);
  })
  .catch(err=>{
    res.send(err);
  })
})
module.exports=router;
