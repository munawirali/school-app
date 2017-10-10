const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/',(req,res)=>{
  models.User.findAll()
  .then(rows=>{
    res.render('users',{data:rows,title:`School Applications : View Data Users`})
  })
  .catch(err=>{
    res.send(err);
  })
})

router.get('/add',(req,res)=>{
  let rowsRole=[{role:'teacher'},{role:'academic'},{role:'headmaster'}]
  res.render('users_add',{data:rowsRole,title:`School Applications : Add Data User`});
})

// ursers/add
router.post('/add',(req,res)=>{
  models.User.create({
    username:`${req.body.username}`,
    password:`${req.body.password}`,
    role:`${req.body.role}`
  })
  .then(()=>{
    res.redirect('/users');
  })
  .catch(err =>{
    res.send(err);
  })
});

router.get('/delete/:id',(req,res)=>{
  models.User.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/users');
  })
  .catch(err=>{
    res.send(err);
  })
})

router.get('/edit/:id',(req,res)=>{//res.send(req.params.id)
  models.User.findById(req.params.id)
  .then((rows)=>{
    let rowsRole=[{role:'teacher'},{role:'academic'},{role:'headmaster'}]
    res.render('users_edit',{data:rows,dataRole:rowsRole,title:'School Applications : Edit Data Users'});
    // res.send(rowsRole);
  })
  .catch(err=>{
    res.send(err);
  })
})

router.post('/edit/:id',(req,res)=>{
  models.User.update({
    username:`${req.body.username}`,
    password:`${req.body.password}`,
    role:`${req.body.role}`
  },{
    where:
    {
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/users')
  })
  .catch(err=>{
    res.send(err);
  })
})

module.exports = router;
