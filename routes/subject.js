const express = require('express')
const router = express.Router()
const models = require('../models');

router.get('/',(req,res)=>{
  models.Subject.findAll({
    order:[['subject_name','asc']]
  })
  .then(rows=>{
     res.render('subject',{data:rows,title:`School Applications : Data Subjects`});
  })
  .catch(err=>{
    res.send(err);
  })
})

module.exports=router;
