'use strict';

const Controller = require('egg').Controller;

// 进度12-16
class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api...';
  }
  async getArticleList() {
    // 巨恶心的踩坑，from前面需要加空格
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as add_time," +
      'article.view_count as view_count,' +
      'type.type_name as type_name' +
      ' FROM article left join type ON article.type_id = type.id';

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }
  // 根据文章id获取文章
  async getArticleById() {
    const id = this.ctx.query.id;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as add_time," +
      'article.view_count as view_count,' +
      'type.type_name as type_name,' +
      'type.id as type_id ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'WHERE article.id =' + id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
  // 根据类别id获取文章列表
  async getArticleListById() {
    const id = this.ctx.query.id;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.add_time, '%Y-%m-%d %H:%i:%s') as add_time," +
      'article.view_count as view_count,' +
      'type.type_name as type_name ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'WHERE article.type_id =' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
  // 获取所有类别
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
