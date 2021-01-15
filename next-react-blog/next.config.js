const withCss = require('@zeit/next-css');

if (typeof require !== undefined) {
  // require.extensions['.css']=file=>{}写法被弃用，新写法未知是否存在问题
  require.extensions['.css'] = file => { }
}

module.exports = withCss({});