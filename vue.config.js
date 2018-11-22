const vuxLoader = require('vux-loader')
const proxyUrl = 'http://www.honke.club:13975';
const localPath = '/';

const serviceList = [
  `${localPath}repair`
]

let proxy = {};

serviceList.forEach(service => {
  proxy[service] = {
    target: proxyUrl,
    changeOrigin: true,
    pathRewrite: {
      [`^/api${service}`] : service
    }
  }
});

module.exports = {
  configureWebpack: config => {
    vuxLoader.merge(config, {
      plugins: ['vux-ui', {
        name: 'less-theme',
        path: 'src/styles/theme.less' 
      }, 'duplicate-style']
    })
  },
  devServer: {
    proxy 
  }
}
