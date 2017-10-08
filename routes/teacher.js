const express = require('express')
const router = express.Router()
const models = require('../models');

router.get('/',(req,res)=>{
  models.Teacher.findAll({
    order:[['first_name','asc']]
  })
  .then(rows=>{
    let promiseTeachers=rows.map(dataTeachers=>{
      return new Promise(function(resolve,reject){
        dataTeachers.getSubject()
        .then(subject=>{
          // console.log(subject);
          if (subject) {
            dataTeachers.subject_name=subject.subject_name
          } else {
            dataTeachers.subject_name='Unassign';
          }
          resolve(dataTeachers);
        })
        .catch(err=>{
          reject(err);
        })
      })
    })
    Promise.all(promiseTeachers)
    .then(newDatateacher=>{
      // console.log(newDatateacher);
      // res.send(newDatateacher)
      res.render('teacher',{data:newDatateacher,title:`School Applications : Data Teachers`});
    })

  })
  .catch(err=>{
    res.send(err);
  })
})
router.get('/add',(req,res)=>{
  let temp={
    first_name:``,
    last_name:``,
    email:``
    }
   res.render('teacher_add',{title:`School Applications : Add Data Teacher`,data:temp,pesan_error:''});
})
router.post('/add',(req,res)=>{//console.log('masuk');
  models.Teacher.create({
    first_name:`${req.body.first_name}`,
    last_name:`${req.body.last_name}`,
    email:`${req.body.email}`
  })
  .then(()=>{
    res.redirect('/teachers');
  })
  .catch(err =>{
    // res.send(err);
    let temp={
      first_name:`${req.body.first_name}`,
      last_name:`${req.body.last_name}`,
      email:`${req.body.email}`
      }
    if (err.errors[0].message=='Validation isEmail on email failed') {
      res.render('teacher_add',{title:`School Applications : Edit Data Teachers`,data:temp,pesan_error:'Your Email is not valid!'});
      res.send(err)
    }else {
      res.render('teacher_add',{title:`School Applications : Edit Data Teachers`,data:temp,pesan_error:err.errors[0].message});
    }
  })
})
router.get('/edit/:id',(req,res)=>{
  models.Teacher.findById(req.params.id)
  .then(rows=>{
    // res.send(rows);
    res.render('teacher_edit',{data:rows,title:`School Applications : Edit Data Teachers`,pesan_error:''});
  })
  .catch(err=>{
    res.send(err);
  })
})
router.post('/edit/:id',(req,res,next)=>{
  models.Teacher.update({
    first_name:`${req.body.first_name}`,
    last_name:`${req.body.last_name}`,
    email:`${req.body.email}`
  },{
    where:{
      id:req.params.id
    }
  })
  .then(rows=>{
    // res.send(rows);
    // res.render('Teachers',{data:rows,title:`Halaman Teachers`});
    res.redirect('/teachers');
  })
  .catch(err=>{
    // res.send(err);
    let temp={
      id:req.params.id,
      first_name:`${req.body.first_name}`,
      last_name:`${req.body.last_name}`,
      email:`${req.body.email}`
      }
    if (err.errors[0].message=='Validation isEmail on email failed') {
      res.render('teacher_edit',{title:`School Applications : Edit Data Seachers`,data:temp,pesan_error:'Your Email is not valid!'});
      res.send(err)
    }else {
      res.render('teacher_edit',{title:`School Applications : Edit Data Seachers`,data:temp,pesan_error:err.errors[0].message});
    }
  })
})
router.get('/delete/:id',(req,res)=>{
  models.Teacher.destroy({
    where: {
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/teachers');
  })
  .catch(err=>{
    res.send(err);
  })
})
router.get('/:id/assign_subject',(req,res)=>{
  models.Teacher.findById(req.params.id)
  .then(rowsTeacher=>{
    models.Subject.findAll()
    .then(rowsSubject=>{
      // res.send(rowsSubject);
      res.render('teacher_assign_subject',{dataTeachers:rowsTeacher,dataSubjects:rowsSubject,title:`School Applications : Assign Data Subject`,pesan_error:''});
    })
  })
  .catch(err=>{
    res.send(err);
  })
})
router.post('/:id/assign_subject',(req,res)=>{
  models.Teacher.update({
    SubjectId:`${req.body.SubjectId}`
  },{
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/teachers');
  })
  .catch(err=>{
    res.send(err)
  })
})
module.exports=router;
