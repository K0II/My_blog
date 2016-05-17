var index_home = require('./controllers/index/home');
var index_articles = require('./controllers/index/articles');
var admin_home = require('./controllers/admin/home');
var admin_create = require('./controllers/admin/create');
var admin_retrieve = require('./controllers/admin/retrieve');
var admin_update = require('./controllers/admin/update');
var admin_delete = require('./controllers/admin/delete');

module.exports = function(app){
    app.get('/', index_home.home);
    app.get('/articles', index_articles.articles);
    app.get('/articles/:biblio',index_articles.articles_run);

    app.get('/admin', admin_home.home);

    app.get('/admin/create',admin_create.create);
    app.post('/admin/create',admin_create.create_post);

    app.get('/admin/delete',admin_delete.delete);
    app.get('/admin/delete/:title',admin_delete.delete_run);

    app.get('/admin/update',admin_update.update);

    app.get('/admin/retrieve',admin_retrieve.retrieve);
    app.post('/admin/retrieve',admin_retrieve.retrieve_post);
}
