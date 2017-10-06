const express = require('express')
const router = express.Router()
const models = require('../models');

router.get('/',(req,res)=>{
  models.Student.findAll({
    order:[['first_name','asc']]
  })
  .then(rows=>{
    // res.send(rows)
     res.render('student',{data:rows,title:`School Applications : Data Students`});
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
   res.render('student_add',{title:`School Applications : Add Data Student`,data:temp,pesan_error:''});
})
router.post('/add',(req,res)=>{
  models.Student.create({
    first_name:`${req.body.first_name}`,
    last_name:`${req.body.last_name}`,
    email:`${req.body.email}`
  })
  .then(()=>{
    res.redirect('/students');
  })
  .catch(err =>{
    // res.send(err);
    let temp={
      first_name:`${req.body.first_name}`,
      last_name:`${req.body.last_name}`,
      email:`${req.body.email}`
      }
    if (err.errors[0].message=='Validation isEmail on email failed') {
      res.render('student_add',{title:`School Applications : Edit Data Students`,data:temp,pesan_error:'Your Email is not valid!'});
      res.send(err)
    }else {
      res.render('student_add',{title:`School Applications : Edit Data Students`,data:temp,pesan_error:err.errors[0].message});
    }
  })
})
router.get('/edit/:id',(req,res)=>{
  models.Student.findById(req.params.id)
  .then(rows=>{
    // res.send(rows);
    res.render('student_edit',{data:rows,title:`School Applications : Edit Data Students`,pesan_error:''});
  })
  .catch(err=>{
    res.send(err);
  })
})
router.post('/edit/:id',(req,res,next)=>{
  models.Student.update({
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
    // res.render('students',{data:rows,title:`Halaman Students`});
    res.redirect('/students');
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
      res.render('student_edit',{title:`School Applications : Edit Data Students`,data:temp,pesan_error:'Your Email is not valid!'});
      res.send(err)
    }else {
      res.render('student_edit',{title:`School Applications : Edit Data Students`,data:temp,pesan_error:err.errors[0].message});
    }
  })
})
router.get('/delete/:id',(req,res)=>{
  models.Student.destroy({
    where: {
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/students');
  })
  .catch(err=>{
    res.send(err);
  })
})
module.exports=router;
