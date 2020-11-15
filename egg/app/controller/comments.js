'use strict';

const Controller = require('egg').Controller;

class CommentsController extends Controller {
  async echo() {
    const {ctx , app} = this;
    const data = ctx.request.body;
    let row = {          //用户数据
        user : data.user,
        comment: data.comment,
        Beuser : data.Beuser,
        time : data.time,
        Beuser : data.Beuser,
        title : data.title,
    };
    const result = {
        code:''
    }
    const post = await this.app.mysql.insert('comments',row);
    if(post){
        result.code='1';
    }
    else{
        result.comment = '-1';
    }
    
    ctx.body = result;
  }
}

module.exports = CommentsController;
