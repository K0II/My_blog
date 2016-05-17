var articles = require('../../models/articles');
var viewArticles = require('../../viewModels/viewArticles');

module.exports = {
    delete: function(req,res){
        articles.find({},function(err,articles){
            if(err){
                console.error(err.stack);
            }
            res.render('admin/delete',{layout:'admin',data:viewArticles(articles)});
        });
    },
    delete_run: function(req,res){
        var x = req.params.title.substring(1);
        articles.remove({title: x},function(err,docs){
            if(err) {
                console.error(err.stack);
            }
            else{
                articles.find({},function(err,articles){
                    if(err){
                        console.error(err.stack);
                    }
                    res.render('admin/delete',{layout:'admin',data:viewArticles(articles)});
                });
            }
        });
    },
}
