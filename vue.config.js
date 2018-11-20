const vuxLoader = require('vux-loader')

module.exports = {
  configureWebpack: config => {
    vuxLoader.merge(config, {
      plugins: ['vux-ui', {
        name: 'less-theme',
        path: 'src/styles/theme.less' 
      }, 'duplicate-style']
    })
  }
}
