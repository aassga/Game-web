const { exec } = require('child_process')
const chalk = require('chalk')
const ora = require('ora')
const config = require('./config')

const files = config['obfuscator']
const filesCount = config['obfuscator'].length

function task (files) {
  restoreFile(0, filesCount)
}

function restoreFile(curIdx, count){
  let file = files[curIdx]
  console.log(`  Restore(${curIdx+1}/${count}):${file}`)
  exec(`rm ${file}`, function (err, stdout, stderr) {
    if (err) {
      console.log(err)
      return
    }
  })
  exec(`mv ${file}.temp ${file}`, function (err, stdout, stderr) {
    if (err) {
      console.log(err)
      return
    }
    if (curIdx < count-1) {
      restoreFile(curIdx + 1, count)
    } else {
      console.log('--Restore Files complete')
      console.log(chalk.cyan('\n  === Build + Obfuscate complete ===\n'))
    }
  })
}

task(files)