const config = require('./config')
const axios = require('axios')
const qs = require('qs')
const path = require('path')
const fs = require('fs')
const ora = require('ora')
const { exec, execSync, spawn, spawnSync } = require('child_process')
const dayJs = require('dayjs')

if (!fs.existsSync(config.distDir)) {
  fs.mkdirSync(config.distDir)
}

const $http = axios.create({
  baseURL: `http://${config.server}/api/v1`,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application.json',
    'Authorization': 'token ' + config.token
  }
})

const users = [
  'zs',
  'candice',
  'gt',
  'charli',
  'buxiao',
  'jiaolian',
  'unpack'
]

$http.defaults.timeout = 20000
// $http.defaults.transformRequest = [(data) => {
//   return qs.stringify(data)
// }]

$http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
$http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  response = response.data
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error.response.data)
})

/**
 * GOGS 接口
 * @type {{}}
 */
const api = {
  /**
   * 获取远端列表
   * @returns {AxiosPromise<any>}
   */
  getOriginRepos () {
    return $http.get(
      '/repos/search',
      {
        params: {
          q: config.base,
          uid: config.uid,
          limit: 1000,
          page: 1
        }
      }
    )
  },
  /**
   * 创建仓库
   * @param site
   * @returns {AxiosPromise<any>}
   */
  createRepo (site) {
    return $http.post(
      '/user/repos',
      {
        name: config.base + site,
        uid: config.uid,
        private: true,
        auto_init: true,
        readme: 'Default'
      }
    )
  },
  /**
   * 添加权限
   * @param site
   */
  addCollaborators (site) {
    users.forEach(user => {
      $http.put(`/repos/${config.user}/${config.base + site}/collaborators/${user}`, {
        permission: 'admin'
      })
    })
  }
}

/**
 * 检查远端仓库是否存在
 */
function onCheck () {
  // let spinner = ora('正在获取远端仓库列表...')
  // spinner.start()
  api.getOriginRepos().then(res => {
    // spinner.stop()
    if (res.ok) {
      const data = []
      sites.forEach(site => {
        const siteData = res.data.find(item => item.name === config.base + site)
        if (siteData) {
          data.push({
            'name': site,
            'origin': siteData.name,
            'http': siteData['html_url'],
            'ssh': siteData['ssh_url'],
          })
        } else {
          data.push({
            'name': site,
            'origin': 'null',
            'http': 'null',
            'ssh': 'null',
          })
        }
      })
      console.log(data)
    } else {
      console.error('获取站点列表失败!!!\n\n\n\n')
    }
  }).catch(error => {
    console.error('获取站点列表失败!!!\n\n\n\n')
    console.error(error)
  })
}

/**
 * 重置本地仓库与远程仓库同步
 */
function onReset (index) {
  index = index || 0
  if (sites[index]) {
    const site = sites[index]
    const dir = path.resolve(config.distDir, site)
    const origin = `http://${config.server}/${config.user}/${config.base}${site}.git`
    let out
    if (fs.existsSync(dir)) {
      try {
        console.log(`删除本地文件夹 ${dir}\t\t<<<<<<`)
        out = execSync(`rm -R ${dir}`)
        console.log(out.toString())
        console.log(`${site} 删除完成`)
      } catch (e) {
        console.log('\n\n')
      }
    }
    try {
      console.log(`克隆项目 ${origin}\t<<<<<<`)
      out = execSync(`cd dist && git clone ${origin} ${site}`)
      console.log(out.toString())
      console.log(`${site} 重置完成\n\n\n\n`)
    } catch (e) {
      console.log('\n\n')
    }
    onReset(index + 1)
  }
}

/**
 * 创建远程仓库
 */
function onCreate () {
  let spinner = ora('正在获取远端仓库列表...')
  spinner.start()
  api.getOriginRepos().then(res => {
    spinner.stop()
    if (res.ok) {
      sites.forEach(site => {
        const siteData = res.data.find(item => item.name === config.base + site)
        if (siteData) {
          console.error('远端仓库已存在!!!\n\n\n\n')
        } else {
          let spinner = ora(`开始创建仓库: ${config.base + site} ......`)
          spinner.start()
          api.createRepo(site).then(res => {
            spinner.stop()
            console.log(`创建仓库 (${config.base + site}) 成功 !!!\n\n\n\n`)
            console.log(res)
            api.addCollaborators(site)
          }).catch(error => {
            spinner.stop()
            console.error(`创建仓库 (${config.base + site}) 失败 !!!\n\n\n\n`)
            console.error(error)
          })
        }
      })
    } else {
      console.error('获取站点列表失败!!!\n\n\n\n')
    }
  }).catch(error => {
    spinner.stop()
    console.error('获取站点列表失败!!!\n\n\n\n')
    console.error(error)
  })
}

/**
 * 设置远程仓库权限
 */
function onPermission () {
  sites.forEach(site => {
    api.addCollaborators(site)
  })
  console.error('重新赋权成功!!!\n\n\n\n')
}

/**
 * 推送代码
 */
function onPush () {
  sites.forEach(site => {
    let out
    try {
      console.log('进入目录: dist/' + site)
      out = execSync(`cd dist/${site} && git add -A`)
      console.log(out.toString())
      out = execSync(`cd dist/${site} && git commit -m ${dayJs().format('YYYY-MM-DDTHH:mm:ss')}`)
      console.log(out.toString())
      out = execSync(`cd dist/${site} && git pull`)
      console.log(out.toString())
      out = execSync(`cd dist/${site} && git push`)
      console.log(out.toString())
    } catch (e) {
      console.error(e.toString())
    }
    console.log('\n\n\n\n')
  })
}

/**
 * 同步代码
 */
function onPull () {
  sites.forEach(site => {
    let out
    try {
      console.log('进入目录: dist/' + site)
      out = execSync(`cd dist/${site} && git pull`)
      console.log(out.toString())
    } catch (e) {
      console.error(e.toString())
    }
    console.log('\n\n\n\n')
  })
}

function addRemote(){
  sites.forEach(site => {
    let out
    try {
      console.log('添加远程仓库地址' + site)
      out = execSync(`git remote add ${site} http://${config.server}/${config.user}/${config.base}${site}.git`)
      console.log(out.toString())
      console.log('添加成功 git remote -v 查看')
    } catch (e) {
      console.error(e.toString())
    }
    console.log('\n\n\n\n')
  })
}

function updateRemote () {
  sites.forEach(site => {
    let out
    try {
      console.log('进入目录: dist/' + site)
      out = execSync(`cd dist/${site} && git remote set-url origin http://${config.server}/${config.user}/${config.base}${site}`)
      console.log(out.toString())
    } catch (e) {
      console.error(e.toString())
    }
    console.log('\n\n\n\n')
  })
}


let type, sites

const types = [
  'check',
  'reset',
  'create',
  'permission',
  'push',
  'pull',
  'remote',
  'update'
]

if (process.argv[2] && types.includes(process.argv[2])) {
  type = process.argv[2]
} else {
  if (process.argv[2]) {
    console.log(`无法识别的操作类型: ${process.argv[2]}\n`)
  }
  console.log('\tsites参数可以使用 "all" 或者 使用 "," 分割的字符串,比如: xpj,klk\n')
  console.log('\t使用示例1: npm run gogs pull all')
  console.log('\t使用示例2: npm run gogs pull klk')
  console.log('\t使用示例3: npm run gogs pull hqyl,xpj\n\n')
  console.log('\tcheck [sites]\t\t检查远端仓库是否存在')
  console.log('\treset [sites]\t\t重置本地仓库与远程仓库同步')
  console.log('\tcreate [sites]\t\t创建远程仓库')
  console.log('\tpermission [sites]\t设置远程仓库权限')
  console.log('\tpush [sites]\t\t推送代码到远端')
  console.log('\tpull [sites]\t\t同步远端代码\n\n\n')
  process.exit(0)
}

if (process.argv[3]) {
  if (process.argv[3] === 'all') {
    sites = config.sites
  }else if(process.argv[3] === 'tg'){
    sites = config.tg
  }else if(process.argv[3] === 'cp'){
    sites = config.cp
  } else if(process.argv[3].indexOf(',') != -1){
    sites = process.argv[3].split(',')
  }else{
    sites = [process.argv[3]]
  }
} else {
  console.log('请输入站点名称[site], 多个站点使用","分割, 或者使用"all"\n\n\n')
  process.exit(0)
}
console.log(sites)
switch (type) {
  case 'check':
    onCheck()
    break
  case 'reset':
    console.log(`开始重置仓库: ${sites}\n\n`)
    onReset()
    break
  case 'create':
    onCreate()
    break
  case 'permission':
    onPermission()
    break
  case 'push':
    onPush()
    break
  case 'pull':
    onPull()
    break
  case 'remote':
    addRemote()
    break
  case 'update':
    updateRemote()
    break
  default:
    console.log(`无法识别的操作类型: ${type}\n\n\n`)
    process.exit(0)
}
