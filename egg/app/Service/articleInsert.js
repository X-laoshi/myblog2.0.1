'use strict';

const Service = require('egg').Service;

class ArticleInsertService extends Service {
  async articleInsert(articles) {
    const result = await this.app.mysql.insert('article', {user:articles.user, title: articles.title, articl:articles.article, time:articles.time});
        return { result };
  }
}

module.exports = ArticleInsertService;
