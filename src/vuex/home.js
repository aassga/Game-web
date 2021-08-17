import { _SetGet, _SetPost, postS, getS } from "@/service/public/service.js";
export default function(Vue) {
  const gameStore = {
    namespaced: true,
    state: {
      showLogin:false,
      isRedLop: false,
      redLopeMoney: null,
      hongbaoyuMoney:null,
      redLopeId: null,
      redLopeType: 0,
      safeCheck:0,
      safeStatus:false,
      safeName:"",
      safeLogin:"",
      isLoginorRegister:"",
      isImgortg:'',
      loadedImg:false,
      reloadeKefu:false,
      advice:false,
      usdtWithdrawalsRate:'0',
      showLoginLog:false,
      hongbaoyuShow:false,
      showLoginIndex:1,
      registerShow:false,
      wyToken:"",
    },
    getters: {},
    mutations: {
      getShowLogin(state,data){
        state.showLogin=data
      },
      hongbaoyuShow(state,data){
        state.hongbaoyuShow = data
      },
      reloadeKefu(state,data){
        state.reloadeKefu = data;
      },
      changeIoadedImg(state,data){
        state.loadedImg = data;
      },
      getisRedLop(state, data) {
        state.isRedLop = data
      },
      getRedLopeMoney(state, data) {
        state.redLopeMoney = data
      },
      getHongbaoyuMoney(state, data){
        state.hongbaoyuMoney = data
      },
      getRedLopeId(state, data) {
        state.redLopeId = data
      },
      getRedLopeType(state, data) {
        state.redLopeType = data
      },
      safeCheck(state,data){
        state.safeCheck=data
      },
      safeStatus(state,data){
        state.safeStatus=data
      },
      wyToken(state,data){
        state.wyToken = data;
      },
      safeName(state,data){
        state.safeName = data
      },
      safeLogin(state,data){
        state.safeLogin = data
      },
      isLoginorRegister(state,data){
        state.isLoginorRegister=data
      },
      isImgortg(state,data){
        state.isImgortg = data
      },
      usdtWithdrawalsRate(state,data){
        state.usdtWithdrawalsRate=data
      }
    },
    actions: {
      getHongboayuLinqu({state, commit},params){
        return new Promise((resolve, reject) => {
          getS('activityApply',params)
           .then(res => {
             if(res.code==200){
               resolve(res)
             }else{
              res = res;
              resolve(res)
             }
           })
           .catch(err => {
             reject(err)
           })
       })
      },
      getActivityApplyList({state, commit},params){
        return new Promise((resolve, reject) => {
          postS('activityApplyList',params)
           .then(res => {
            resolve(res)
           })
           .catch(err => {
             reject(err)
           })
       })
      },
      getSignin({ state, commit }, params){
        return new Promise((resolve, reject) => {
          postS('activityChessDailySignIn',params)
           .then(res => {
             if(res.code==200){
               res = res.data
               resolve(res)
             }
           })
           .catch(err => {
             reject(err)
           })
       })
      },
      onsignIn({ state, commit },params){
        return new Promise((resolve, reject) => {
          postS('activityChessDailySignIn',params)
           .then(res => {
              resolve(res)
           })
           .catch(err => {
             reject(err)
           })
       })
      },
      gameSortNew({ state, commit }, params) {
        return new Promise((resolve, reject) => {
          postS(`gameSortNew`, params)
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      // 获取走马灯
      newNotice({ state, commit }, params) {
        return new Promise((resolve, reject) => {
          postS(`site/newNotice`, params)
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      // 获取轮播图
      position({ state, commit }, params) {
        return new Promise((resolve, reject) => {
          postS(`site/position`, params)
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      logoList({ state, commit }, params) {
        return new Promise((resolve, reject) => {
          postS(`site/logoList`, params)
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      getQipaiShouyeHongbao(){
        return new Promise((resolve, reject) => {
           postS('qipaiShouyeHongbao')
            .then(res => {
              if(res.code === 200){
                resolve(res)
              }
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      getQipaiShouyeHongbaoLingqu({state},id){
        return new Promise((resolve, reject) => {
          postS('qipaiShouyeHongbaoLingqu?id='+ id)
            .then(res => {
              if(res.code === 200){
                resolve(res)
              }
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      getSmsCode({state, commit},params){
        return new Promise((resolve, reject) => {
          getS('getSmsCode',params)
           .then(res => {
             if(res.code==200){
               resolve(res)
             }else{
              res = res;
              resolve(res)
             }
           })
           .catch(err => {
             reject(err)
           })
       })
      },
      validateSmsPhone({ state, commit }, params) {
        return new Promise((resolve, reject) => {
          postS(`validateSmsPhone`, params)
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
    }
  };
  return gameStore;
}
