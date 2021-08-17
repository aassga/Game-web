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

const isDevPublickey = false // true: 測試機公鑰，false: 正式機公鑰
const needEncrypt = true // true: 加密，false: 不加密

if (needEncrypt) {
  axios.defaults.headers['encryptResponse'] = 1
}
// formdata格式
axios.defaults.transformRequest = [(data) => {
  return needEncrypt ? data : Qs.stringify(data)
}]
axios.defaults.transformResponse = [(data, headers) => {
  if (needEncrypt) {
    const decrypt = new JSEncrypt();
    decrypt.setPublicKey(isDevPublickey ? dev_publicKey : production_publicKey);
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
    encryptor.setPublicKey(isDevPublickey ? dev_publicKey : production_publicKey)
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
        config.data['encryptedBody'] = encryptedBody  
        config.data = Qs.stringify(config.data)
      }
    }
    
    return config
  })