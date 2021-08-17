const {
  exec,
  execSync,
  spawn,
  spawnSync
} = require('child_process')
const config = require('./config')

let range = process.argv[2]
let sites
if (range) {
  if (range == 'tg' || range == 'cp') {
    sites = config[range]
  } else if(range == 'all'){
    sites = config.sites
  } else if (range.indexOf(',') != -1) {
    sites = range.split(',')
  }
} else {
  console.log(`无法识别的操作类型: ${type}\n\n\n 请输入正确的指令`)
}
console.log(sites)

function build(i, c) {
  console.log('index: ', i)
  if (sites[i]) {
    console.log('\n\n开始打包: ' + sites[i])
    exec('npm run build -site=' + sites[i], {
      encoding: 'utf8',
      maxBuffer: 8 * 1024 * 1024
    }, function (err, stdout, stderr) {
      if (err) {
        console.log(err)
        return
      }
      console.log(`stderr: ` + stderr.toString())
      console.log(sites[i], '打包完成\n\n')

      build(i + c, c)
    })
  }
}

build(0, 8)
build(1, 8)
build(2, 8)
build(3, 8)
build(4, 8)
build(5, 8)
build(6, 8)
build(7, 8)
