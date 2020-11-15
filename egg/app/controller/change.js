'use strict';

const Controller = require('egg').Controller;

class ChangeController extends Controller {
    async  change() {
        const {ctx , app} = this;
        const data = ctx.request.body;
        const row={
            user : data.user,
            passworld : data.passworld,
            email : data.email
        }
        console.log(row);
        const result = {
            code:''
        }
        const options = {
            where: {
                email: data.email
            }
          };
        const pos = await this.app.mysql.get('users', { user: row.user });
        console.log(pos);
        if(!pos){           //没有找到用户
            result.code='-1';
        }
        else if(pos.email!=row.email){      //用户邮箱不对
            result.code='0';        
        }
        else{               //用户正确邮箱正确修改密码users
            const res = await this.app.mysql.update('users', row, options);
            result.code='1';
        }
        ctx.body=result;
        
    };
}
module.exports = ChangeController;
