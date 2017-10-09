const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session');
// const path = require('path');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
// app.use('/public', express.static(path.join(__dirname + '/public')));
app.use(session({
  secret:'school-apps',
  cookies:{},
  resave: false,
  proxy: true,
  saveUninitialized: true
}))

const login = require('./routes/login');
const user = require('./routes/user');
const index = require('./routes/index')
const teacher = require('./routes/teacher')
const subject = require('./routes/subject')
const student = require('./routes/student')

app.use('/login',login);
// app.use('/', index)
// app.use('/teachers', teacher)
// app.use('/subjects', subject)
// app.use('/students', student)
// app.use('/users', user)
app.use('/',(req,res,next)=>{
  if (req.session.hasLogin) {
    next();
  }else {
    res.redirect('/login');
  }
},index);

app.use('/users',(req,res,next)=>{
  if (req.session.hasLogin) {
    if (req.session.user.role=='headmaster') {
      next();
    } else {
      // req.flash("messages", "You dont have authority for this menu!" );
      res.redirect('/');
    }

  } else {
    res.redirect('/login');
  }
},user);

app.use('/teachers',(req,res,next)=>{
  if (req.session.hasLogin) {
    if (req.session.user.role=='headmaster' || req.session.user.role=='teacher') {
      next();
    } else {
      // req.flash("messages", { "success" : "You dont have authority for this menu!" });
      res.redirect('/');
    }
  }else {
    res.redirect('/login');
  }
},teacher);

app.use('/subjects',(req,res,next)=>{
  if (req.session.hasLogin) {
    if (req.session.user.role=='headmaster' || req.session.user.role=='academic') {
      next();
    } else {
      // req.flash("messages", { "success" : "You dont have authority for this menu!" });
      res.redirect('/');
    }
  }else {
    res.redirect('/login');
  }
},subject);

app.use('/students',(req,res,next)=>{
  if (req.session.hasLogin) {
    if (req.session.user.role=='headmaster' || req.session.user.role=='academic') {
      next();
    } else {
      // req.flash("messages", { "success" : "You dont have authority for this menu!" });
      res.redirect('/');
    }
  }else {
    res.redirect('/login');
  }
},student);

app.listen(process.env.PORT || 3000,()=>{
  console.log('Listen at 3000');
})
