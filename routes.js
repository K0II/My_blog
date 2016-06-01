var index_home = require('./controllers/index/home');
var index_articles = require('./controllers/index/articles');
var admin_home = require('./controllers/admin/home');
var admin_create = require('./controllers/admin/create');
var admin_update = require('./controllers/admin/update');

module.exports = function(app){
    app.get('/', index_home.home);

    app.get('/articles', index_articles.articles);
    app.get('/articles/:biblio',index_articles.articles_run);

    app.get('/admin', admin_home.home);

    app.get('/admin/create',admin_create.create);
    app.post('/admin/create',admin_create.create_post);

    app.get('/admin/home/:id',admin_home.delete_run);

    app.post('/admin/home',admin_home.retrieve_post);
}
