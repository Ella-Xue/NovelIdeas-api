var createError = require('http-errors')
var express = require('express')
var cors = require('cors')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var port = (process.env.PORT || 3000);

const novels = require("./routes/novels")
const author = require("./routes/author")
const user = require("./routes/user")
var app = express()

app.listen(port);

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/user/:id', user.userInfo);
app.post('/user',user.register);
app.post('/user/login',user.login);
app.put('/user/:id', user.editPassword);
app.put('/user/:id/info',user.editInfo);
app.put('/user/:id/novels',user.putNovel);
app.put('/user/:id/authors',user.putAuthor);

app.get('/novels', novels.findAll);
app.get('/novels/:id', novels.findOne);
app.post('/novels',novels.addNovel);
app.put('/novels/:id', novels.giveGrade);
app.put('/novels/:id/comment', novels.comment);
app.delete('/novels/:id', novels.deleteNovel);


app.get('/author', author.findAll);
app.get('/author/:id', author.findOne);
app.post('/author', author.addAuthor);
app.put('/author/:id/collect', author.collectAuthor);
app.delete('/author/:id', author.removeCollection);

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
