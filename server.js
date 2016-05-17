var express = require('express');
var mongoose = require('mongoose');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var formidable = require('formidable');
var credentials = require('./credentials');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(credentials.cookieSecret));
app.use(session({
    secret: credentials.cookieSecret,
    resave: true,
    saveUninitialized: true
}));

//app.set('view cache', true);
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'index',
    extname: ".hbs",
    helpers: {
        section: function(name,options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('hbs',handlebars.engine);
app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
db.on('error', function(){
    console.error('MongoDB connection failed');
});
db.once('open', function(){
  console.log('MongoDB connected!')
});

require('./routes.js')(app);

//  ----------------- 添加错误处理程序 -----------------  //
app.use(function(err,req,res,next){
  res.status(404);
  res.render('404');
});
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
//  ----------------- 添加错误处理程序 -----------------  //

app.listen( app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + app.get('port') );
});
