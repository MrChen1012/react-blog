'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    // 首页文章列表数据
    this.ctx.body = 'hi api';
  }
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
      "' AND password = '" + password + "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: '登录成功', openId };

    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }
  // 后台文章分类信息
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }
  // 添加文章
  async addArticle() {
    const tmpArtcile = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tmpArtcile);
    const insertSuccess = result.affectedRows === 1;
    const insert = result.insertId;
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId: insert,
    };
  }
  // 更新文章
  async updateArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }
  // 获取文章列表
  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.view_count as view_count,' +
      "FROM_UNIXTIME(article.add_time,'%Y-%m-%d' ) as add_time," +
      'type.type_name as type_name ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'ORDER BY article.id DESC';
    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }
  // 删除文章
  async delArticle() {
    const id = this.ctx.query.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }
  // 根据文章id获取文章
  async getArticleById() {
    const id = this.ctx.query.id;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.add_time,'%Y-%m-%d' ) as add_time," +
      'article.view_count as view_count ,' +
      'type.type_name as type_name ,' +
      'type.id as type_id ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = MainController;
