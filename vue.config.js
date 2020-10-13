const { resolve } = require('path')

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('~', resolve(__dirname, 'src/'))
  },
  transpileDependencies: [
    'element-ui',
    'el-table-wrapper',
    'vue-content-loading',
    'vue-count-to'
  ]
}
