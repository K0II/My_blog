var articles = require('../../models/articles');

module.exports = {
    create: function(req,res){
        res.render('admin/create',{layout:'admin'});
    },
    create_post: function(req,res){
        articles.create({
            title : req.body.title,
            entity : req.body.entity.replace(/\n/g,'<br>'),
            biblio : req.body.biblio
        },function(err,doc){
            if(err) {
                console.error(err);
            } else {
                res.render('admin/create',{layout:'admin'});
            }
        });
    },
}
