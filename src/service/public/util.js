// 创建vue插件挂在到vue原型上
export default {
  install (Vue) {
    // 全局请求成功提示
    Vue.prototype.dNotify = function (msg, type) {
      this.$store.commit('alert/showTipModel', {bool: true, title: msg, model: type})
      setTimeout(() => {
        this.$store.commit('alert/showTipModel', {bool: false, title: msg, model: type})
      }, 100000)
    }
    // 彩票无效金额
    Vue.prototype.dInvalidMoney = function (money) {
      return /^[0-9]+[.]?[0-9]*$/.test(money)//判断字符串是否为数字
    }
    Vue.prototype.getRandom =function (start,end) {
       return Math.round(Math.random() * (end - start) + start)
    }
    //判断彩票金额无效  不能输入0.5
    // Vue.prototype.dInvalidMoneynew = function (money) {
    //   return /^(([1-9]\d+)|[1-9])(\.\d{0,2})?$/.test(money)//判断字符串是否为数字
    // }
    //判断彩票金额无效  不能输入小数

     Vue.prototype.dInvalidMoneynew = function (money) {
      return /^(([1-9]\d+)|[1-9])?$/.test(money)//判断字符串是否为数字
    }
    //系统类型判断
    Vue.prototype.dPcOrMobile = function () {
      let sUserAgent = navigator.userAgent.toLowerCase()
      let bIsIpad = sUserAgent.match(/ipad/i).toString() === 'ipad'
      let bIsIphoneOs = sUserAgent.match(/iphone os/i).toString() === 'iphone os'
      let bIsMidp = sUserAgent.match(/midp/i).toString() === 'midp'
      let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i).toString() === 'rv:1.2.3.4'
      let bIsUc = sUserAgent.match(/ucweb/i).toString() === 'ucweb'
      let bIsAndroid = sUserAgent.match(/android/i).toString() === 'android'
      let bIsCE = sUserAgent.match(/windows ce/i).toString() === 'windows ce'
      let bIsWM = sUserAgent.match(/windows mobile/i).toString() === 'windows mobile'
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        //跳转移动端页面
        if (bIsIphoneOs) {
          return 'iphone'
        } else {
          return 'android'
        }
      } else {
        //跳转pc端页面
        return 'pc'
      }
    }

    //年月日
    Vue.prototype.dGetTodayDate = function () {
      let d = new Date()
      let nowTime = d.toLocaleString()
      let f = nowTime.split(' ')[0].replace(/\//g, '-')
      let dateArr = f.split('-')
      let year = dateArr[0]
      let month = dateArr[1] > 9 ? dateArr[1] : '0' + dateArr[1]
      let day = dateArr[2] > 9 ? dateArr[2] : '0' + dateArr[2]
      return year + '-' + month + '-' + day
    }

    Vue.prototype.validateAccountLogin = function (str){
      return /^[0-9A-z_]{5,20}$/i.test(str)
    }
    Vue.prototype.validateProof = function (str){
      return /^[0-9A-z·\u4E00-\u9FFF]{2,15}$/i.test(str)
    }
    Vue.prototype.validatePoof= function (str){
      return /^[0-9A-z\u4E00-\u9FFF:]{2,15}$/i.test(str)
    }
    //用户名验证
    Vue.prototype.validateAccountUserName = function (str) {
      return /^[0-9A-z]{6,20}$/i.test(str)
    }
    // 密码验证
    Vue.prototype.validateAccount = function (str) {
      return /^[0-9A-z]{6,20}$/i.test(str)

    }
     //用户名验证
     Vue.prototype.validateAccountUserNamenew = function (str) {
      return /^[0-9A-z]{6,10}$/i.test(str)
    }
    //密码验证
    Vue.prototype.validateLoginPwd = function (pwd) {
      return pwd.length >= 5 && pwd.length <= 20
    }
    //验证支付密码 长度
    Vue.prototype.validatePwdAccount = function (pwd) {
      return pwd.length >= 6
    }

    // 电话验证
    Vue.prototype.testPhone = function (text) {
      return /^(0|86|17951)?(13[0-9]|14[56789]|15[012356789]|16[67]|17[01235678]|18[0-9]|19[1389])[0-9]{8}$/.test(text)
    }
   
    // 邮箱验证
    Vue.prototype.testEmail = function (email) {
      return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)
    }
    Vue.prototype.getHMS = function (time) {
      let now = new Date(time - 0)
      let hh = now.getHours()
      let MM = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
      let ss = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
      return hh + ':' + MM + ':' + ss
    }
    // 年月日时分秒
    Vue.prototype.getTime = function (time) {

      let now = new Date(time - 0)
      let yy = now.getFullYear() //年
      let mm = now.getMonth() + 1 //月
      let dd = now.getDate() //日
      let hh = now.getHours()
      let MM = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
      let ss = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
      let clock = yy + '-'
      if (mm < 10) clock += '0'
      clock += mm + '-'
      if (dd < 10) clock += '0'
      clock += dd
      return clock + ' ' + hh + ':' + MM + ':' + ss
    }

    // 精准日期
    Vue.prototype.getTimes = function (time) {

      let now = new Date(time - 0)
      let yy = now.getFullYear() //年
      let mm = now.getMonth() + 1 //月
      let dd = now.getDate() //日
      let hh = now.getHours()
      let MM = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
      let ss = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
      let clock = yy + '年'
      if (mm < 10) clock += '0'
      clock += mm + '月'
      if (dd < 10) clock += '0'
      clock += dd
      return clock + '日' + hh + '时' + MM + '分' + ss + '秒'
    }
    Vue.prototype.getTimesYMD = function (time) {

      let now = new Date(time - 0)
      let yy = now.getFullYear() //年
      let mm = now.getMonth() + 1 //月
      let dd = now.getDate() //日
      let clock = yy + '年'
      if (mm < 10) clock += '0'
      clock += mm + '月'
      if (dd < 10) clock += '0'
      clock += dd
      return clock + '日'
    }
    Vue.prototype.getYMD = function (time) {
      let now = new Date(+time)
      let yy = now.getFullYear() //年
      let mm = now.getMonth() + 1 //月
      let dd = now.getDate() //日
      let clock = yy + '-'
      if (mm < 10) clock += '0'
      clock += mm + '-'
      if (dd < 10) clock += '0'
      clock += dd
      return clock
    }
    Vue.prototype.getymd = function (time) {
      let now = new Date(+time - 1000 * 60 * 60 * 184)
      let yy = now.getFullYear() //年
      let mm = now.getMonth() + 1 //月
      let dd = now.getDate() //日
      let clock = yy + '-'
      if (mm < 10) clock += '0'
      clock += mm + '-'
      if (dd < 10) clock += '0'
      clock += dd
      return clock
    }

    // 获取url后面参数
    Vue.prototype.GetQueryString = function (name) {
      return localStorage[name]
    }

    /**
     * 数组排序
     * @param arr
     * @param fn
     */
    Vue.prototype.arraySort = function (arr, fn) {
      for (let i = 0, len = arr.length; i < len - 1; i = i + 1) {
        for (let j = 0; j < len - i - 1; i = i + 1) {
          if (fn(arr[j], arr[j + 1])) {
            let temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
          }
        }
      }
    }
    Vue.prototype.$goUserCen =function(name, num){
      //name的类型有 ：  recharge （充值）  personage （个人资料）
      //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）
      this.$store.commit("showPersonal", {
        bool: true
      });
      this.$store.commit("showContent", {
        parent: name
      });
      this.$store.commit("showNav", {
        child: num
      });
    }
    Vue.prototype.$showModal = function(modalType,modalText){
      switch (modalType) {
        case 'new':
          break;
        case 'old':
           this.$store.commit("alert/showTipModel", modalText);
          break
      }
    }
    Vue.prototype.$getObjByLocalStorage =function(key){
      const val = localStorage[key]
      let obj = null
      if (val) {
        try {
          obj = JSON.parse(val)
        } catch (e) {
          localStorage[key] = ''
          obj = null
        }
      }
      return obj
    }
    Vue.prototype.$setObjByLocalStorage =function(key,val){
      if (val) {
        if (typeof val === 'object') {
          localStorage[key] = JSON.stringify(val)
        }
      } else {
        localStorage[key] = ''
      }
    }
    Vue.prototype.copyObj = function (obj, def) {
      try {
        return JSON.parse(JSON.stringify(obj))
      } catch (e) {
        return def || null
      }
    }
    Vue.prototype.$getObjBySessionStorage =function(key){
      const val = sessionStorage[key]
      let obj = null
      if (val) {
        try {
          obj = JSON.parse(val)
        } catch (e) {
          sessionStorage[key] = ''
          obj = null
        }
      }
      return obj
    }
    Vue.prototype.$setObjBySessionStorage =function(key,val){
      if (val) {
        if (typeof val === 'object') {
          sessionStorage[key] = JSON.stringify(val)
        }
      } else {
         sessionStorage[key] = ''
      }
    }
  }
}
