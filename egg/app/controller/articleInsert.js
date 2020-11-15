
'use strict';

const Controller = require('egg').Controller;

class ArticleInsertController extends Controller {
  async echo() {
    const {ctx , app} = this;
    const data = ctx.request.body;
    let row = {          //用户数据
        user : data.user,
        title : data.title,
        article: data.article,
        time : data.time,
    };
    var result = await ctx.service.articleInsert.articleInsert(row);
    ctx.body=result;
  }
}

module.exports = ArticleInsertController;
