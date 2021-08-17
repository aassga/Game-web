'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const env = require('../config/stage.env')
let now = new Date()
let yy = now.getFullYear() //年
let mm = now.getMonth() + 1 //月
let dd = now.getDate() 
let hh = now.getHours()
let MM = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
let ss = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
const Timestamp = yy +'-'+ mm +'-'+ dd +'-'+ hh + ':' + MM + ':' + ss
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js?v='+Timestamp),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js?v='+Timestamp)
  },
  plugins: [
    new cleanWebpackPlugin([
      `dist/${config.build.buildDir}/index.html`,
      `dist/${config.build.buildDir}/static`,
      `dist/${config.build.buildDir}/m`,
      `dist/static-${config.build.buildDir}`,
      `dist/${config.build.buildDir}/static-${config.build.buildDir}`,
    ], {
      root: path.resolve(__dirname, '../'),
      exclude: ['.git']
    }),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new ParallelUglifyPlugin({ // 多进程并行处理压缩。
      cacheDir: '.cache/', // 缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结
      uglifyJS: {
        output: {
          comments: false, // 删除所有注释
          beautify: false // 最紧凑的输出，不保留空格和制表符
        },
        compress: {
          drop_console: true, // 删除所有console语句，可以兼容IE
          collapse_vars: true, // 内嵌已定义但只使用一次的变量
          reduce_vars: true, // 提取使用多次但没定义的静态值到变量
        }
      }
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: false,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap ?
        {
          safe: true,
          map: {
            inline: false
          }
        } :
        {
          safe: true
        }
    }),
    new HtmlWebpackPlugin({
      filename: `./${config.build.buildDir}/index.html`,
      template: `./src/pages/${config.build.buildDir}/index.html`,
      inject: true,
      chunks: [`pages/${config.build.buildDir}/index`, 'vendor', 'manifest']
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'index',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static/public'),
      to: path.resolve(__dirname, `../dist/${config.build.buildDir}/static/public`)
    }, {
      from: path.resolve(__dirname, `../static/${config.build.buildDir}`),
      to: path.resolve(__dirname, `../dist/${config.build.buildDir}/static/${config.build.buildDir}`)
    },{
      from: path.resolve(__dirname, `../check.html`),
      to: path.resolve(__dirname, `../dist/${config.build.buildDir}/check.html`)
    },{
      from: path.resolve(__dirname, `../888`),
      to: path.resolve(__dirname, `../dist/${config.build.buildDir}/888`)
    }])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
