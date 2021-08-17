'use strict'
const path = require('path')

let buildDir = process.env.npm_config_site || 'tyc86'
// let buildDir = process.env.npm_config_site || 'betnew'

buildDir = buildDir.toLowerCase()

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/frontend': {
        // 目标服务器地址
        // target: 'http://2094.cc/',
        // target: 'http://tg-frontend.lx861.com/',
        //  target:'http://hg78.3335525.com',
          // target:'http://ybcp.3335525.com', // 839qp
          // target: 'http://tg.n9963.com',
        // target: 'http://tg5.7900005.com/',
        //  target: 'http://dqr.9161252.com', // dqr
        //  target: 'http://xtyc.3337708.com', // xtyc
        // target: 'http://csdf.9161252.com', // csdf
        // target: 'http://jlcp.9161252.com', // jlcp
        // target: 'http://ly88.9161252.com', // ly88
        // target: 'http://szc.9161252.com', // szc
        // target: 'http://zyyl.9161252.com', // zyyl
        // target: 'http://pjyl.9161252.com', // pjyl 海洋xpj
        // target: 'http://qmcp.9161252.com', // qmcp
        // target: 'http://500w.9161252.com', // h500
        // target: 'http://ddcp.9161252.com', // nn500
        // target: 'http://t500w.9161252.com', // 555y
        // target: 'http://jhcp.9161252.com', //  9hcp
        // target: 'http://fczx.9161252.com', // fczx
        // target: 'http://t111.9161252.com', // t111
        // target: 'http://cfgj.9161252.com', // cfgj
        // target: 'http://cjw.9161252.com', // cjw
        // target: 'http://ybcp.9161252.com', // ybcp
        // target: 'http://dalao.9161252.com', // dalao
        // target: 'http://cpzj.9161252.com', // cpzj
        // target: 'http://fhcp.9161252.com', // fhcp
        // target: 'http://500wcp.9161252.com', // 500wcp
        // target: 'http://ecp.9161252.com', // ecp
        // target: 'http://eyc.9161252.com', // eyc
        // target: 'http://sjcp.9161252.com', // sjcp
        // target: 'http://wycp.9161252.com', // wycp
        // target: 'http://hsyl.9161252.com', // hsyl
        // target: 'http://qygj.9161252.com/', //qygj
        // target: 'http://478qp.9161252.com/', //永利皇宫
        // target: 'https://h373.com/',
        // target: 'http://jltx650.com/',
        // target: 'http://xpj.9161252.com/',
        // target: 'http://ce.pj975888.com:801',
        // target: 'https://f0023.com/',
        // target: 'http://7777201.com/',
        // target: 'http://klk.9161252.com/',
        // target: 'http://jsyl.9161252.com', // jsyl
        // target: 'http://newbet365.9161252.com', // betsb
        // target: 'http://bet365.9161252.com', // bet365
        // target: 'http://vnst.9161252.com', // vns
        // target: 'http://amxpj.9161252.com', // amxpj
        // target: 'http://blr.9161252.com', // blr
        // target: 'http://mgm.9161252.com', // mgm
        // target: 'http://vnso.9161252.com', // vnso
        // target: 'http://tycjt.9161252.com', // tyc
        // target: 'http://vnst.9161252.com', // vnst
        // target: 'http://pjdc.9161252.com', // pjdc
        // target: 'http://tczj.9161252.com', // tczj
        // target: 'http://amvnsr.9161252.com', // amvnsr
        // target: 'http://aqvns.3335525.com', // aqvns
        // target: 'http://hqyl.9161252.com', // hqyl
        // target: 'http://jlcp.9161252.com', // kyqp
        //   target: 'http://935qp.9161252.com', // kyqp
        // target: 'http://xpj80.3335525.com',
        // target: 'http://js84.3335525.com',//js84
        target: 'http://tyc86.3335525.com/',//tyc86

        // 轮播图测试用接口
        // target:'http://18.136.194.63/',
        changeOrigin: true
      },
      '/api': {
        target: 'http://xpj80.3335525.com',
        changeOrigin: true
      },
      '/json': {
        target: 'http://xpj80.3335525.com',
        changeOrigin: true
      }
    },
    host: '0.0.0.0',
    port: 4200,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static-' + buildDir,
    assetsPublicPath: '/',
    buildDir: buildDir,
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: true,
    productionGzipExtensions: ['js', 'css', 'html'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
