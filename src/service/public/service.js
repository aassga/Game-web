//配置接口数据
import Vue from 'vue'
import axios from 'axios'
import store from '@/vuex/store'
import UserService from './UserService.js'
import CryptoJS from 'crypto-es'
import '../../lib/jsencrypt/jsencrypt.min.js'

const qs = require('qs')
export const HOST_NAME = ''

//公共请求
export let _SetPost = (url, params) => axios({
  url: HOST_NAME + url,
  method: 'post',
  data: {
    ...params
  }
})
//公共请求
export let _SetGet = (url, params) => axios({
  url: HOST_NAME + url,
  method: 'get',
  data: {
    ...params
  }
})

// 產生16位随机字符串，大小写英数字混合
function randomString(length = 16) {
  let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) 
      result += str[Math.floor(Math.random() * str.length)]
  return result
}

// 将原本要请求的参数转为json格式，并加上现在时间戳（秒，10位数字）
function changeToJson(body, timestamp) {
  let bodyText = JSON.stringify(body) + timestamp
  
  return bodyText
}

const dev_publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxdgoZOYfNp3LFNdvUfOjSfHhL
HzGTRy5lEIEZsAmNwkUDJ8+jvr1rOuoyZsCsS1Azs261hZfiHYf+6tc6AIeKP4vE
VtTuQZ/hxfsv0sgLBXy8b9E5vNadqZj7W44zCuI1gkJsZziHAwsb90u6SDypMaRk
ZPgUeK0z+HCDs5tdXwIDAQAB
-----END PUBLIC KEY-----`

const production_publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDf2lqx9TDDxarmXiCRZbecwQJa
nrYuDbC9DjVQM3di8pf8/uanA0EVNiLJU4gjp/MAJHMX0GQD4N/ToFLQXtvtWx/t
41RGNumWEToxKWpky6lk+D665Jfx0AFlhrZG4t23c78nPgb5VyMxkuBTKUPULIXC
CtJjtOVJ/wM2LMi44QIDAQAB
-----END PUBLIC KEY-----`

const publickey = process.env.PUBLICKEY === 'production' ? production_publicKey : dev_publicKey
const needEncrypt = process.env.ENCRYPT === 'yes'

//测试域名
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
if (needEncrypt) {
  axios.defaults.headers['encryptResponse'] = 1
}


// 配置formdata格式
// axios.defaults.withCredentials = true;
axios.defaults.timeout = 20000
axios.defaults.transformRequest = [(data) => {
  return needEncrypt ? data : qs.stringify(data)
}]

axios.defaults.transformResponse = [(data, headers) => {
  if (needEncrypt) {
    const decrypt = new JSEncrypt();
    decrypt.setPublicKey(publickey);
    // request-id 用 base64 decode 後再用 rsa 解密
    const aesKey = decrypt.decrypt(headers['request-id'], true)
    const text = CryptoJS.AES.decrypt(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Utf8.parse(data)), CryptoJS.enc.Utf8.parse(aesKey), {
      mode: CryptoJS.mode.ECB,
    })
    const result = JSON.parse(CryptoJS.enc.Utf8.stringify(text))
    return result
  }
  return JSON.parse(data)
}]

axios.interceptors.request.use((config) => {
  const aesKey = randomString()
  const timestamp = Math.floor(Date.now() / 1000).toString()

  // 設定 rsa publickey，以 publickey 對 aeskey 用 rsa 加密並 base64 encode
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publickey);
  const encryptKey = encryptor.encrypt(aesKey).toString()

  config.headers.Authorization = `${localStorage.token}`

  if (needEncrypt) {
    config.headers['request-id'] = encryptKey
    config.headers.timestamp = timestamp

    if (config.method === 'get') {
      if (!config.params) {
        config.params = {}
      }
      // 將 data 對 aeskey 用 aes 加密並 base64 encode
      const aesEncrypted = CryptoJS.AES.encrypt(changeToJson(config.params, timestamp), CryptoJS.enc.Utf8.parse(aesKey), {
        mode: CryptoJS.mode.ECB,
      })
      const encryptedBody = CryptoJS.enc.Base64.stringify(aesEncrypted.ciphertext)
      config.params['encryptedBody'] = encryptedBody
    } else {
      if (!config.data) {
        config.data = {}
      }
      // 將 data 對 aeskey 用 aes 加密並 base64 encode
      const aesEncrypted = CryptoJS.AES.encrypt(changeToJson(config.data, timestamp), CryptoJS.enc.Utf8.parse(aesKey), {
        mode: CryptoJS.mode.ECB,
      })
      const encryptedBody = CryptoJS.enc.Base64.stringify(aesEncrypted.ciphertext)
      config.data = {
        encryptedBody
      }
      config.data = qs.stringify(config.data)
    }
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

UserService.vpSetConfig()
axios.interceptors.response.use((response) => {
  if (response.data.sign > localStorage.getItem('configTime') && !response.config.url.includes('/config')) {
    UserService.vpReloadConfig()
  }
  if (response.data.code === 5003 || response.data.code === 5002) {
    localStorage.removeItem('userBank')
    UserService.removeCache()
    window.location.href = '/'
    store.commit('alert/showTipModel', {bool: true, title: '您未登录！', model: 'warn'})
    return false
  } else if(response.data.code === 5004){
    if(store.state.mainState.userinfo.payPassword =='set') {
      store.commit('alert/changeAttention', true)
    }
  }else if (response.data.code === 5000) {
    UserService.vpSetConfig()
    location.href = '/static/public/html/weihu/index.html'
  } else if (response.data.code === 5005) {
    if(window.history.length==1){
       store.commit('alert/showTipModel', {bool: true, title: response.data.message, model: 'warn'})
       setTimeout(() => {
          store.commit('alert/showTipModel', {bool: false, title: response.data.message, model: 'warn'})
          window.location.href = '/'
       }, 3000)
    }else{
      store.commit('alert/showTipModel', {bool: true, title: response.data.message, model: 'warn'})
       setTimeout(() => {
          store.commit('alert/showTipModel', {bool: false, title: response.data.message, model: 'warn'})
          location.href='#/plays/hall'
       }, 3000)
    }
    return false
  }else if(response.data.code === 4000){
    // 非法访问
    location.href = '/static/public/html/weihu/findex.html'
  }
  // 验证是否过期
  if (localStorage.token && !response.config.url.includes('/member/refresh')) {
    UserService.expired(localStorage.token)
  }

  if (response.data.code === 200) {
    return response.data
  } else if (response.data.code === 5006) { 
    return false
  } else {
    store.commit('alert/showTipModel', {bool: false, title: response.data.message, model: 'warn'})
  }

  return response.data
}, (err) => {
  // if(err.request.responseURL.indexOf('/member/balance') <= -1){
  //   store.commit('alert/showTipModel', {bool: true, title: '网络异常,请稍后重试。', model: 'warn'})
  // }
  return err;
})
//注册
// Vue.prototype.$http = axios //post
//新的api 借口访问
 export let postS = (url, params) => axios({
  headers: { 'Accept': 'application/x.tg.v2+json' },
  url: `/frontend/${Vue.prototype.$HOST_NAME?Vue.prototype.$HOST_NAME.substring(10):'v1'}/` + url,
  // url: '/frontend/v1/' + url,
  method: 'post',
  data: {
    ...params
  }
});
export let getS = (url, params) => axios({
  headers: { 'Accept': 'application/x.tg.v2+json' },
  url: `/frontend/${Vue.prototype.$HOST_NAME?Vue.prototype.$HOST_NAME.substring(10):'v1'}/` + url,
  // url: '/frontend/v1/' + url,
  method: 'get',
  params: {
    ...params
  }
}) 
Vue.prototype.$getS = getS;
Vue.prototype.$http = axios;  //post
Vue.prototype.$postS = postS;