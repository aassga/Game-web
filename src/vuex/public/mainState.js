import {
  _SetGet,
  _SetPost,
  postS,
  getS
} from '@/service/public/service.js';

function getUserInfo() {
  if (!localStorage.getItem('userinfo')) return null
  try {
    return JSON.parse(localStorage.getItem('userinfo'))
  } catch (e) {
    localStorage.setItem('userinfo', '')
    return null
  }
}
function isLogin() {
  if (!localStorage.getItem('userinfo')) return false
  try {
    if(localStorage.isDiffPlace){
       return false
    }else{
      return true
    }
  } catch (e) {
    localStorage.setItem('userinfo', '')
    return false
  }
}

const state = {
  userinfo: getUserInfo(),
  flag: true,
  aid: '',
  ifpourT: true,
  websoc: {},
  prizePool: {},
  color: false,
  isbannerce: false,
  routeSrc: "",
  navIndex: 0,
  nightCheck: false,
  gameList: null,
  downloadUrl: {},
  lotteryiuss: "",
  newShowDialog:true,
  showDialog: {
    home: {
      login: true,
      noLogin: true
    },
    game: {
      login: true,
      noLogin: true
    }
  },
  showMessage: {
    allUnReadCount: 0,
    replyUnReadCount: 0,
    systemUnReadCount: 0,
  },
  prizeArray: [],
  prizePoolList: [],
  visibStatus: true,
  isNotice: false,
  LotteryLongDragon: [],
  isShowSignin:"",
  isDialog:false,
  signData:{},
  isOpen:false,
  signMoney:"",
  isGet:false,
  loginOrout:isLogin(),
  hongbaoyuShow:false,
}

const datas = {
  namespaced: true,
  state,
  actions: {
    chamgPrizeArray({
      commit,
      state
    }, msg) {
      if (msg.lotteryId && msg.prizePool) {
        let prizeList = state.prizeArray
        prizeList.length > 0 && prizeList.forEach((prize) => {
          if (msg.lotteryId == prize.lotteryId) {
            prize.prizePool = msg.prizePool
          }
        })
        commit('prizeArray', prizeList)
      }
    },
    // 刷新余额
    reloadBalance({commit}, modalType) {
      return new Promise((resolve, reject) => {
        getS(`member/balance`).then(res => {
          if (res.code == 200) {
            let userinfo = JSON.parse(localStorage.userinfo);
            userinfo.balance = res.data.member;
            userinfo.agent = res.data.agency;
            commit("reloadUserinfo", userinfo);
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  mutations: {
    hongbaoyuShow(state,data){
      state.hongbaoyuShow = data
    },
    loginOrout(state,data){
      state.loginOrout=data
    },
    // 重置用户个人信息
    resetUserinfo(state, bool) {
      state.userinfo = bool
    },
    // 下载链接
    getDownLoad(state, datas) {
      state.downloadUrl = datas
    },
    // 刷新个人信息余额使用
    reloadUserinfo(state, userinfo) {
      localStorage.setItem('userinfo', JSON.stringify(userinfo))
      state.userinfo = localStorage.userinfo && JSON.parse(localStorage.userinfo)
    },
    //期数 
    lotteryiuss(state, datas) {
      state.lotteryiuss = datas
    },
    getGameList(state, datas) {
      state.gameList = datas
    },
    getNigth(state, data) {
      state.nightCheck = data
    },
    resetFlag(state, bool) {
      state.flag = bool
    },
    getNavIndex(state, data) {
      state.navIndex = data
    },
    getRoute(state, data) {
      state.routeSrc = data
    },
    resetPour(state, bool) {
      state.ifpourT = bool
    },
    websoc(state, data) {
      state.websoc = data;
    },
    changcolor(state, data) {
      state.color = data
    },
    getDialog(state, data) {
      state.showDialog = data
    },
    changbalance(state, data) {
      state.isbannerce = data
    },
    getMessage(state, data) {
      state.showMessage = data
    },
    prizePool(state, data) {
      state.prizePool = data
    },
    prizeArray(state, data) {
      state.prizeArray = data
      localStorage.setItem('prizeArray', JSON.stringify(data))
    },
    prizePoolList(state, data) {
      state.prizePoolList = data
    },
    changvisibStatus(state, data) {
      state.visibStatus = data
    },
    changeNotice(state, data) {
      state.isNotice = data
    },
    LotteryLongDragon(state, data) {
      state.LotteryLongDragon = data
    },
    changShowSignin(state,data) {
      state.isShowSignin = data
    },
    showDialog(state,data) {
      state.isDialog = data
    },
    newShowDialog(state,data){
      state.newShowDialog=data 
    },
    signData(state,data) {
      state.signData = data
    },
    isOpen(state,data) {
      state.isOpen = data
    },
    signMoney(state,data){
      state.signMoney = data
    },
    isGet(state,data){
      state.isGet = data
    }
  }
}

export default datas
