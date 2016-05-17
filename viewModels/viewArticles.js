var articles = require('../models/articles');

function getArticlesEle(articles){
    return  {
        articles: articles.map(function(article){
            return {
                title: article.title,
                entity: article.entity,
                biblio: article.biblio,
                time: article.time.toLocaleString()
            };
        }),
    };
}
module.exports = getArticlesEle;
