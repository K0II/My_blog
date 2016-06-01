var articles = require('../models/articles');

function getArticlesEle(articles){
    return  {
        articles: articles.map(function(article){
            return {
                id: article._id,
                title: article.title,
                entity: article.entity.replace(/(<br>)/g,'\n\r'),
                biblio: article.biblio,
                time: article.time.toLocaleString().substr(0,10)
            };
        }),
    };
}
module.exports = getArticlesEle;
