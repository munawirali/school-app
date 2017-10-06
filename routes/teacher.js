const express = require('express')
const router = express.Router()
const models = require('../models');

router.get('/',(req,res)=>{
  models.Teacher.findAll({
    order:[['first_name','asc']]
  })
  .then(rows=>{
     res.render('teacher',{data:rows,title:`School Applications : Data Teachers`});
  })
  .catch(err=>{
    res.send(err);
  })
})

module.exports=router;
