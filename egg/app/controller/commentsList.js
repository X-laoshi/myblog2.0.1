'use strict';

const Controller = require('egg').Controller;

class CommentsListController extends Controller {
  async echo() {
    const {ctx , app} = this;
    const data = ctx.request.body.title;
    const results = await this.app.mysql.select('comments',{where:{title : data}});
    ctx.body = results;
  }
}

module.exports = CommentsListController;
