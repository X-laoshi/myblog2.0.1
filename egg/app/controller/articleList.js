
'use strict';

const Controller = require('egg').Controller;

class ArticleListController extends Controller {
  async echo() {
    const {ctx , app} = this;
    const data = ctx.request.body;
    ctx.body  = await ctx.service.articleFind.find();

  }
}

module.exports = ArticleListController;
