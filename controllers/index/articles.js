var articles = require('../../models/articles');
var viewArticles = require('../../viewModels/viewArticles');

module.exports = {
    articles: function(req,res){
        articles.find({},function(err,articles){
            if(err){
                console.error(err.stack);
            }
            else {
                res.render('index/articles',{data:viewArticles(articles)});
            }
        });
    },
    articles_run: function(req,res){
        articles.find({ biblio: req.params.biblio.substring(1), },function(err,articles){
            if(err){
                console.error(err.stack);
            }
            else {
                console.log(req.params.biblio.substring(1));
                res.render('index/articles',{data:viewArticles(articles)});
            }
        })
    }
}
