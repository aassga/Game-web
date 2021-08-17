axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
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
// 响应拦截器 返回数据去掉data层
axios.interceptors.response.use((response) => {
  return response.data
}, (err) => {
  console.log(err)
  return err
})
let sites = [
  {
    siteInt: 'qxcp',
    siteId: 67,
    siteName: '新葡京棋牌' },
  {
    siteInt: 'tyc86',
    siteId:86,
    siteName:'太阳城集團' },    
  {
    siteInt: 'amxpj',
    siteId: 74,
    siteName: '澳门新葡京' },
  {
    siteInt: '737qp',
    siteId: 16,
    siteName: '新葡京棋牌' },
  {
    siteInt: 'hty',
    siteId: 50,
    siteName: '金沙娱乐场' },
  {
    siteInt: 'dqr',
    siteId: 8,
    siteName: '澳门威尼斯人' },
  {
    siteInt: 'jltx',
    siteId: 31,
    siteName: '澳门永利皇宫'
  },
  {
    siteInt: 'newbet',
    siteId: 73,
    siteName: 'bet365' },
  {
      siteInt: 'betnew',
      siteId: 77,
      siteName: 'bet365' },
  {
    siteInt: 'newsjs',
    siteId: 72,
    siteName: '澳门金沙娱乐场' },
  {
    siteInt: '99qp',
    siteId: 71,
    siteName: '澳门威尼斯人'
  },
  {
    siteInt: '478qp',
    siteId: 55,
    siteName: '澳门巴黎人'
  },
  {
    siteInt: 'fhcp',
    siteId: 14,
    siteName: '澳门新葡京'
  },
  {
    siteInt: 'xpj83',
    siteId: 83,
    siteName: '澳门新葡京'
  },
  {
    siteInt: 'amvnsr',
    siteId: 60, // amvnsr
    siteName: '澳门威尼斯人'
  },
  {
    siteInt: 'aqvns',
    siteId: 61, // aqvns
    siteName: '澳门威尼斯'
  },
  {
    siteInt: 'bet365', // bet365
    siteId: 54,
    siteName: 'bet365'
  },
  {
    siteInt: 'betsb',
    siteId: 52, // betsb
    siteName: 'bet365'
  },
  {
    siteInt: 'cpxpj',
    siteId: 79,
    siteName: '澳门新葡京'
  },
  {
    siteInt: 'js85',
    siteId: 85,
    siteName: '澳门金沙赌场'
  },
  {
    siteInt: 'blr',
    siteId: 58,
    siteName: 'bet365'
  },
  {
    siteInt: 'hqyl',
    siteId: 6,
    siteName: '环球娱乐'
  },
  {
    siteInt: 'jsyl',
    siteId: 46,
    siteName: '金沙娱乐场'
  },
  {
    siteInt: 'klk',
    siteId: 3,
    siteName: '客拉客'
  },
  {
    siteInt: 'kyqp',
    siteId: 25,
    siteName: '开元棋牌'
  },
  {
    siteInt: 'mgm',
    siteId: 57, // mgm
    siteName: '澳门美高美'
  },
  {
    siteInt: 'cmgm',
    siteId: 45, // cmgm
    siteName: '澳门美高梅'
  },
  {
    siteInt: 'pjdc',
    siteId: 47,
    siteName: '葡京赌场'
  },
  {
    siteInt: 'qygj',
    siteId: 13,
    siteName: '澳门新葡京'
  },
  {
    siteInt: 'xpj80',
    siteId: 80,
    siteName: '澳门新葡京'
  },
  {
    siteInt: 'tycjt',
    siteId: 56,
    siteName: '澳门太阳城'
  },
  {
    siteInt: 'tyc82',
    siteId: 82,
    siteName: '澳门太阳城'
  },
  {
    siteInt: 'tccp',
    siteId: 68, // tccp
    siteName: '澳门太阳城'
  },
  {
    siteInt: 'vnso',
    siteId: 75, // vnso
    siteName: '太阳城集团'
  },
  {
    siteInt: 'vnst',
    siteId: 48, // vnst
    siteName: '澳门威尼斯人'
  },
  {
    siteInt: 'vns81',
    siteId: 81, // vns81
    siteName: '澳门威尼斯人'
  },
  {
    siteInt: 'xpj',
    siteId: 15,
    siteName: '新葡京赌场'
  },
  {
    siteInt: '839qp',
    siteId: 42,
    siteName: '开元棋牌'
  },
  {
    siteInt: '103qp',
    siteId: 22,
    siteName: '开元棋牌'
  },
  {
    siteInt: 'dalao',
    siteId: 10,
    siteName: '彩票网'
  },
  {
    siteInt: 'amvns',
    siteId: 49,
    siteName: '金星国际'
  },
  {
    siteInt: 'ybcp',
    siteId: 44,
    siteName: '亚博'
  },
  {
    siteInt: 'qmcp',
    siteId: 9,
    siteName: '全民彩票'
  },
  {
    siteInt: 'dalao',
    siteId: 10,
    siteName: '彩票网'
  },
  {
    siteInt: 'wycp',
    siteId: 24,
    siteName: '彩票网'
  },
  {
    siteInt: 'test',
    siteId: 1,
    siteName: '本站'
  }
]
