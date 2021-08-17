import {
    _SetGet,
    _SetPost,
    postS,
    getS
} from '@/service/public/service.js';
export default function(Vue){
    const gameStore={
       namespaced:true,
       state:{
         jieBeiData:{},
         jiebeiQuota:{},
       },
       getters: {},
       mutations: {
        setJieBeiData(state, data) {
          state.jieBeiData = data
        },
        setjiebeiQuota(state, data) {
          state.jiebeiQuota = data
        }
       },
       actions:{
            gameSortV4Note({state,commit},params){
              return new Promise((resolve, reject) => {
                postS(`gameSortV4Note`,params).then(res=>{
                    if(typeof callback === 'function') callback(res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
              })
            },
            gameSortV4({state,commit},params){
              return new Promise((resolve, reject) => {
                postS(`gameSortV4`,params).then(res=>{
                    if(typeof callback === 'function') callback(res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
              })
            },
            deleteCollectGame({state,commit},params){
            return new Promise((resolve, reject) => {
                postS(`deleteCollectGame`,params).then(res=>{
                    if(typeof callback === 'function') callback(res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
           },
           collectGame({state,commit},params){
            return new Promise((resolve, reject) => {
                postS(`collectGame`,params).then(res=>{
                    if(typeof callback === 'function') callback(res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
           },
           deleteCollectGameV4({state,commit},params){
            return new Promise((resolve, reject) => {
                postS(`deleteCollectGameV4`,params).then(res=>{
                    if(typeof callback === 'function') callback(res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
           },
           collectGameV4({state,commit},params){
            return new Promise((resolve, reject) => {
                postS(`collectGameV4`,params).then(res=>{
                    if(typeof callback === 'function') callback(res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
           },
           gameSortSlot({state,commit},params){
            return new Promise((resolve, reject) => {
                postS(`gameSortSlot`,params).then(res=>{
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
           },
           ChessFishSort({state,commit},params){
            return new Promise((resolve, reject) => {
                postS(`ChessFishSort`,params).then(res=>{
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
           },
           gameSortNew({state,commit},params){
            return new Promise((resolve,reject)=>{
                postS(`gameSortNew`,params).then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
           },
           myloveGame({state,commit},params){
            return new Promise((resolve,reject)=>{
                postS(`myloveGame`,params).then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
           },
           memberCollectGamesV4({state,commit},params){
            return new Promise((resolve, reject) => {
                postS(`memberCollectGamesV4`,params).then(res=>{
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
           },
            // 优惠检查
            payActivityCheck ({state,commit}, data) {
            return new Promise((resolve, reject) => {
                postS(
                '/payActivityCheck',
                data
                ).then(res => {
                resolve(res)
                }).catch(err => {
                reject(err)
                })
            })
            },
            // 优惠领取
            payActivityGet ({state,commit}, data) {
            return new Promise((resolve, reject) => {
                postS(
                '/payActivityGet',
                data
                ).then(res => {
                resolve(res)
                }).catch(err => {
                reject(err)
                })
            })
          },
           // 借呗记录
      activityJiebeiJieHuanList(store, {page,limit}) {
        return new Promise((resolve, reject) => {
         postS(
            '/activityJiebeiJieHuanList', { devices: 'pc', page,limit }
          ).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      },
           // 借呗详情
        activityJiebeiJieHuanInfo({store}) {
        return new Promise((resolve, reject) => {
            postS(
            '/activityJiebeiJieHuanInfo', { devices: 'pc' }
            ).then(res => {
               resolve(res)
            resolve(res)
            }).catch(err => {
              reject(err)
            })
          })
        },
         // 借呗借款
      activityJiebeiJie(store, {amount}) {
        return new Promise((resolve, reject) => {
          postS(
            '/activityJiebeiJie', { devices: 'pc', amount }
          ).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      },
      // 借呗还款
      activityJiebeiHuan(store, {amount}) {
        return new Promise((resolve, reject) => {
         postS(
            '/activityJiebeiHuan', { devices: 'pc', amount }
          ).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
        },
         // 借呗额度
      activityJiebeiEdu(store) {
        return new Promise((resolve, reject) => {
          postS(
            '/activityJiebeiEdu', { devices: 'pc' }
          ).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      },
       },
    }
    return gameStore
}
