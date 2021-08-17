const { exec } = require('child_process')
const chalk = require('chalk')
const ora = require('ora')

const spinner = ora('JS obfuscating ...')

function task (site) {
  let inputPath = `dist/${site}/static-${site}/js/pages/${site}/`
  let outputPath = `./`
  spinner.start()
  
  exec(`javascript-obfuscator ${inputPath} --output ${outputPath}`, function (err, stdout, stderr) {
    if (err) {
      console.log(err)
      console.log('若提示無 javascript-obfuscator 指令，請手動執行進行全域安裝 \n\n sudo npm install --save-dev -g javascript-obfuscator')
      console.log('或確認 /dist/... 目標資料夾是否存在')
      spinner.stop()
      return
    }

    spinner.stop()
    console.log(chalk.cyan(`  ${inputPath}*.js obfuscate complete \n\n`))
    console.log(chalk.cyan('  === Build complete ===\n'))
    
  })
}

let site = process.env.npm_config_site || [process.argv[2]]
task(site)