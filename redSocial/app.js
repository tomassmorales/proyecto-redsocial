var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var redRouter = require('./routes/red');
const usuario = require('./data/datos');
const db = require('./database/models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:"Mi palabra secreta de aplicación",
  resave: false,
  saveUnitialized: true
}))

//implementacion de cookies
app.use(function (req, res, next) {
  if(req.cookies.usuarioId != undefined && req.session.user == undefined){
    db.Usuario.findByPk(req.cookies.usuarioId)
    .then(user =>{
      req.session.user = user;
      // req.session.fotoPerfil = user.fotoPerfil;
      res.locals.user = req.session.user;
    })
  }  
  return next();
})
//implementacion de sesion
app.use(function (req, res, next) {
  res.locals.user = null
  if(req.session.user != undefined){
    res.locals.user = req.session.user;
    // res.locals.avatar = req.session.fotoPerfil;
  }
  return next()
})


app.use('/index', indexRouter);
app.use('/user', usersRouter);
app.use('/', redRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
