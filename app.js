const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const index = require('./routes/index')
const teacher = require('./routes/teacher')
const subject = require('./routes/subject')
const student = require('./routes/student')
app.use('/', index)
app.use('/teachers', teacher)
app.use('/subjects', subject)
app.use('/students', student)

app.listen(3000,()=>{
  console.log('Listen at 3000');
})
