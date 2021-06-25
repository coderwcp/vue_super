module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            viewportWidth: 375,
            viewportHeight: 667,
            unitPrecision: 5,
            viewportUnit: "vw",
            selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],
            minPixelValue: 1,
            mediaQuery: false,
            exclude: [/TabBar/, /(\/|\\)(node_modules)(\/|\\)/],//忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            fontViewportUnit: "vw",		//字体使用的视口单位
          })
        ]
      }
    }
  }
}