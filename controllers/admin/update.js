var articles = require('../../models/articles');

module.exports = {
    update: function(req,res){
        res.render('admin/update',{layout:'admin'});
    },
}
