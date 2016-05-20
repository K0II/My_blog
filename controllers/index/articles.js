var arts = require('../../models/articles');
var viewArticles = require('../../viewModels/viewArticles');

module.exports = {
    articles: function(req,res){
        arts.find({},function(err,doc){
            if(err){
                console.error(err.stack);
            }
            else {
                res.render('index/articles',{data:viewArticles(doc)});
            }
        });
    },
    articles_run: function(req,res){
        arts.find({ biblio: req.params.biblio },function(err,doc){
            if(err){
                console.error(err.stack);
            }
            else {
                res.render('index/articles',{data:viewArticles(doc)});
            }
        })
    }
}
