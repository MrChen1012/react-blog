// let ipUrl = 'http://127.0.0.1:7001/admin/'
let ipUrl = 'http://localhost:7001/admin/'

let servicePath = {
  //  获取文章类别信息
  getTypeInfo: ipUrl + 'getTypeInfo',
  //  获取类别列表
  checkLogin: ipUrl + 'checkOpenId',
  //  添加文章
  addArticle: ipUrl + 'addArticle',
  //  添加文章
  updateArticle: ipUrl + 'updateArticle',
  //  获取文章列表
  getArticleList: ipUrl + 'getArticleList',
  //  删除文章
  delArticle: ipUrl + 'delArticle',
  //  根据文章列表获取文章详情
  getArticleById: ipUrl + 'getArticleById',
}
export default servicePath;