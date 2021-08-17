const { exec } = require('child_process')
const chalk = require('chalk')
const ora = require('ora')
const config = require('./config')

const spinner = ora('JS obfuscating ...')

let sites = process.argv[2]
if (sites ==  'tg' || sites == 'cp') {
  task(config[sites])
} else if (sites == 'all') {
  task(config['sites'])
} else {
  console.log(`无法识别的操作类型: ${type}\n\n\n 请输入正确的指令`)
}

function task (sites) {
  obfuscating(0, sites.length)

  function obfuscating(curIdx, count){
    let site = sites[curIdx]
    let inputPath = `dist/${site}/static-${site}/js/pages/${site}/`
    let outputPath = `./`

    console.log(chalk.cyan(`[${site}] (${curIdx+1}/${count}):`))
    spinner.start()
    
    exec(`javascript-obfuscator ${inputPath} --output ${outputPath}`, function (err, stdout, stderr) {
      if (err) {
        console.log(err)
        console.log('若提示無 javascript-obfuscator 指令，請手動執行進行全域安裝--> sudo npm install --save-dev -g javascript-obfuscator')
        console.log('或確認 /dist/... 目標資料夾是否存在')
        spinner.stop()
        return
      }

      spinner.stop()
      console.log(chalk.cyan(`  ${inputPath}*.js obfuscate complete \n\n`))
      
      if (curIdx +1 == count) {
        console.log(chalk.cyan('  === Obfuscate complete ===\n'))
      } else {
        obfuscating(curIdx + 1, count)
      }
    })
  }
}