'use strict';

const Controller = require('egg').Controller;

class RegistController extends Controller {
  async echo() {
    const {ctx , app} = this;
    const data = ctx.request.body;
    let row = {          //用户数据
        user : data.user,
        passworld : data.passworld,
        email : data.email,
    };
    const result = {
        code:''
    }
    console.log(data);
    console.log(row);

    const post = await this.app.mysql.get('users', { user: row.user });
    console.log(post);           //用户名是否已经存在，存在返回-1，否则创建一个user返回1
    if(post){
      result.code='-1';
    }
    else{ 
    await app.mysql.insert('users', {user:row.user, passworld:row.passworld, email:row.email});
    result.code= '1' ;
   }
   ctx.body=result;
}
}

module.exports = RegistController;