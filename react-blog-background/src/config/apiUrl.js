let ipUrl = 'http://127.0.0.1:7001/'

const defaultDomain = 'default/';
const adminDomain = 'admin/';
let servicePath = {
  getArticleList: ipUrl + defaultDomain + 'getArticleList',  //  首页文章列表接口
  getArticleById: ipUrl + defaultDomain + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
  getTypeInfo: ipUrl + defaultDomain + 'getTypeInfo/',  //  获取类别接口
  getArticleListById: ipUrl + defaultDomain + 'getArticleListById/',  //  获取类别列表
  checkLogin: ipUrl + adminDomain + 'checkOpenId/',  //  获取类别列表
}
export default servicePath;