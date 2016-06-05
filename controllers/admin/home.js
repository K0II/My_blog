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
    },
    retrieve_post: function(req,res){
        var reg_title =  eval("/.*" + req.body.title + ".*/");
        var reg_entity = eval("/.*" + req.body.entity + ".*/");
        var reg_biblio = eval("/.*" + req.body.biblio + ".*/");
        articles.find({
            title: reg_title,
            entity: reg_entity,
            biblio: reg_biblio,
        },function(err,articles){
            if(err){
                console.error(err.stack);
            }
            else {
                res.render('admin/home',{layout:'admin',data:viewArticles(articles)});
            }
        })
    },
    delete_run: function(req,res){
        articles.remove({_id: req.params.id},function(err,docs){
            if(err) {
                console.error(err.stack);
            }
            else{
                articles.find({},function(err,articles){
                    if(err){
                        console.error(err.stack);
                    }
                    res.render('admin/home',{layout:'admin',data:viewArticles(articles)});
                });
            }
        });
    }
}
