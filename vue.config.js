module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-test/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @use "sass:math";
          @import "@/styles/globals/index.scss";
        `
      }
    }
  },
  pluginOptions: {
    svgSprite: {
      /*
       * The directory containing your SVG files.
       */
      dir: 'src/assets/icons',
      /*
       * The reqex that will be used for the Webpack rule.
       */
      test: /\.(svg)(\?.*)?$/,
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      loaderOptions: {
        extract: true,
        spriteFilename: 'img/icons.svg' // or 'img/icons.svg' if filenameHashing == false
      },
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      pluginOptions: {
        plainSprite: true
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Blog'
        return args
      })
  }
}
