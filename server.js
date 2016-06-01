var express = require('express');
var mongoose = require('mongoose');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var formidable = require('formidable');
var morgan = require('morgan');
var logger = require('express-logger');
var marked = require('marked');

// 证书，已添加到 .gitignore
var credentials = require('./credentials');

var app = express();

// 一些中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(credentials.cookieSecret));
app.use(session({
    secret: credentials.cookieSecret,
    resave: true,
    saveUninitialized: true
}));

// Handlebars模版引擎
app.set('view cache', true);
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

// 静态资源目录
app.use(express.static(__dirname + '/public'));

// 设置端口 可以用 PORT=3000 node server.js 覆盖
app.set('port', process.env.PORT || 8080);

// 开发日志和生产日志
switch( app.get('env') ) {
    case 'development' : app.use(morgan('dev')); break;
    case 'production' : app.use(logger({ path: __dirname + '/log/requests.log' })); break;
    // 在生产模式下运行程序  NODE_ENV=production node server
}

// 连接数据库
mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
db.on('error', function(){
    console.error('MongoDB connection failed');
});
db.once('open', function(){
  console.log('MongoDB connected!')
});

// 所有路由
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
