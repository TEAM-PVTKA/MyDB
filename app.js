var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { default: mongoose } = require('mongoose');

const cors = require('cors');

var app = express();
var mongo = require('mongoose');
const bodyParser = require('body-parser');

app.use(cors());

port = 4300;
app.listen(port,()=>{
  console.log(`Server running at ${port}`)
})


mongo.connect('mongodb+srv://codemavericks2024:codemavericks2024@cluster0.cqo8oa3.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('Connect to DB'))
.catch((err)=>console.log(err))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use('/register', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
// app.use('/login', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });


app.use(bodyParser.json())



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
