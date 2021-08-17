# mobile

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
# 热键"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
# build for production with minification
npm run build --site=amhg     #  one site (eg.amhg)
npm run build-obf--site=amhg  #  build + obfuscator
# build for production with minification - group sites
npm run build-all all      # group sites  (tg / cp / all)
npm run build-all-obf all  # build + obfuscator
#  JS obfuscate 須手動全域安裝套件  sudo npm install --save-dev -g javascript-obfuscator）

# build for production and view the bundle analyzer report
npm run build --report
```
## ENV 設定

`請依照環境使用下列檔案`

- 本地 dev.env.js
- 測試機 stage.env.js
- 正式機 prod.env.js

```bash
# 請不要更改
NODE_ENV

# 使用測試機/正式機公鑰
PUBLICKEY: 
  - development
  - production

# 使用明文/密文發送
ENCRYPT:
  - no
  - yes
```