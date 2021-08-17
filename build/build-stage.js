'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

require('shelljs/global')
const ora = require('ora')
const shell = require('shelljs')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.stage.conf')
const fs = require('fs')
const gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);

const spinner = ora('building for stage...')
spinner.start()

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)//等于../dist/static

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  shell.cp('-R', path.resolve(__dirname, '../dist/static-' + config.build.buildDir), path.resolve(__dirname, `../dist/${config.build.buildDir}/static-${config.build.buildDir}`))
  shell.rm('-R', path.resolve(__dirname, '../dist/static-' + config.build.buildDir))

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
