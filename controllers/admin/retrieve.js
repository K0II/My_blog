var articles = require('../../models/articles');
var viewArticles = require('../../viewModels/viewArticles');

module.exports = {
    retrieve: function(req,res){
            res.render('admin/retrieve',{layout:'admin'});
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
                res.render('admin/retrieve',{layout:'admin',data:viewArticles(articles)});
            }
        })
    }
}
