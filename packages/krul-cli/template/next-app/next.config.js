/* eslint-disable */
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV == 'development'; // 本地开发环境
const isBeta = process.env.NODE_ENV == 'beta'; // 测试环境
const isPro = process.env.NODE_ENV == 'production'; // 线上环境
let assetPrefix = ''
if (isBeta) {
  assetPrefix = '//xxx/beta/{{name}}'
}
if (isPro) {
  assetPrefix = '//xxx/release/{{name}}'
}

// antd
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './config/antd-custom.less'), 'utf8')
)

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
  assetPrefix: assetPrefix,
  // generateEtags: false, // 禁止 etag 生成
  distDir: 'dist', // 构建目录
  pageExtensions: ['jsx', 'js', 'ts', 'tsx'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    console.log(buildId, dev, isServer); // development, true, false
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    if (!dev) {
      config.plugins.push(
        ...[
          new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
            generateStatsFile: true,
            // Will be available at `.next/stats.json`
            statsFilename: 'stats.json'
          }),
          // 代替uglyJsPlugin
          new TerserPlugin({
            terserOptions: {
              ecma: 6,
              warnings: false,
              extractComments: false, // remove comment
              compress: {
                drop_console: true // remove console
              },
              ie8: false
            }
          }),
      ]);
      config.devtool = 'source-map';
    } else {

      config.devtool = 'cheap-module-inline-source-map';
    }
    Object.assign(config.resolve.alias, {
      components: path.resolve(__dirname, './components'),
      pages: path.resolve(__dirname, './pages'),
      utils: path.resolve(__dirname, './utils'),
      config: path.resolve(__dirname, './config'),
      service: path.resolve(__dirname, './service')
    })

    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // console.log(config, '@@')
    // Important: return the modified config
    return config;
  },
  serverRuntimeConfig: { // Will only be available on the server side
    rootDir: path.join(__dirname, './'),
    PORT: isDev ? 80 : (process.env.PORT || 6789),
    isServer: true,
  },
  publicRuntimeConfig: { // Will be available on both server and client
    staticFolder: '/static',
    isDev, // Pass through env variables
    isBeta,
  },
  // 接口代理
  devProxy: {
    '/api': {
      target: 'http://www.xxx.com',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    },
    '/user': {
      target: 'http://xxx.com',
      // pathRewrite: { '^/api': '/' },
      changeOrigin: true
    }

  }

})
