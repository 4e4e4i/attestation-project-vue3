module.exports = {
  devServer: {
    port: 4200,
    watchOptions: {
      poll: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        ws: true,
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/resources/index.scss";'
      }
    }
  },

  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = {
          ...options,
          transpileOnly: true
        }
        return options
      })
  }
}
