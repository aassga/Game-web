const { exec } = require('child_process')
const chalk = require('chalk')
const ora = require('ora')
const config = require('./config')

const files = config['obfuscator']
const filesCount = config['obfuscator'].length

function task (files) {
  copy(0, filesCount)

  function copy(curIdx, count){
    let file = files[curIdx]

    console.log(`      Copy(${curIdx+1}/${count}):${file}`)
    exec(`cp ${file} ${file}.temp`, function (err, stdout, stderr) {
      if (err) {
        console.log(err)
        return
      }
      if (curIdx < count-1) {
        copy(curIdx + 1, count)
      } else {
        obfuscator(0, filesCount)
      }
    })
  }
  function obfuscator(curIdx, count){
    let file = files[curIdx]
    console.log(`Obfuscator(${curIdx+1}/${count}):${file}`)
    exec(`javascript-obfuscator ${file} --output ${file}`, function (err, stdout, stderr) {
      if (err) {
        console.log(err)
        console.log('若提示無 javascript-obfuscator 指令，請手動執行進行全域安裝--> sudo npm install --save-dev -g javascript-obfuscator')
        console.log('或確認 /dist/... 目標資料夾是否存在')
        return
      }
      if (curIdx < count-1) {
        obfuscator(curIdx + 1, count)
      } else {
        console.log('--Obfuscate JS complete \n')
      }
    })
  }
}

task(files)