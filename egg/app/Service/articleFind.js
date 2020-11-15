
const Service = require('egg').Service;

class ArticleFindService extends Service {
  async find() {
    const result = await this.app.mysql.select('article');
    return { result };  
  }
}

module.exports = ArticleFindService;
