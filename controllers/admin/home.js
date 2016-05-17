var articles = require('../../models/articles');
var viewArticles = require('../../viewModels/viewArticles');

module.exports = {
    home: function(req,res){
        articles.find({},function(err,articles){
            if(err){
                console.error(err.stack);
            }
            res.render('admin/home',{layout:'admin',data:viewArticles(articles)});
        });
    }
}
