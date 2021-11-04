// vue.config.js
const path = require('path')
module.exports = {
  publicPath: './', // 文件加载设置为相对路径
  outputDir: 'dist',
  // lintOnSave: false, // 关闭eslint
  // productionSourceMap: true, // 生产环境下css 分离文件
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Github-commit提交数据可视化3D'
        return args
      })
  }
}
