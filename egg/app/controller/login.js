'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async find() {
    const {ctx, app} = this;
    const data = ctx.request.body;
    let row = {
        user : data.user,
        passworld : data.passworld,
    };
    const result = {
      code : ''
    };
    //console.log(row);

    const post = await this.app.mysql.get('users', { user: row.user }); 
    console.log(post);            //根据用户名来对密码比较
    if( post == null ){
      result.code='-1'
    }
    else if(post.passworld!=row.passworld){   //密码错误返回0
        result.code = '0';
    }
    else {
        result.code = '1';          //密码正确
    }
    ctx.body=result;
    // let message = '', data = {};
    // 判断数据库里面是否存在该用户
    
  }
}

module.exports = LoginController;
