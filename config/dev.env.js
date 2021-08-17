'use strict'
const merge = require('webpack-merge')
const stageEnv = require('./stage.env')
const prodEnv = require('./prod.env')

module.exports = merge(stageEnv, prodEnv, {
  NODE_ENV: '"development"',
  PUBLICKEY: '"development"',
  ENCRYPT: '"no"'
})
