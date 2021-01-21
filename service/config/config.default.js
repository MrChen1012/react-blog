/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610334954120_9526';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '199710',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // 跨越配置
  config.security = {
    csrf: {
      enable: false,
    },
    // eslint-disable-next-line array-bracket-spacing
    domainWhiteList: ['*'],
  };
  config.cors = {
    origin: 'http://localhost:3000',
    credentials: true, // 允许cookie跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.session = {
    // 设置session cookie里面的key
    key: 'SESSION_ID',
    // 设置最大的过期时间
    maxAge: 30 * 1000 * 60,
    // 设置是否只服务端可以访问
    httpOnly: true,
    // 设置是否加密
    encrypt: true,
    // 设置为true每次刷新页面的时候session都会被延期
    renew: true,
  };


  return {
    ...config,
    ...userConfig,
  };
};
