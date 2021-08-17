import store from "@/vuex/store";
import {
  postS,
  getS
} from "@/service/public/service.js";
import Vue from "vue";
import { resolve } from "url";
let timer
const mixin = {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    recalc() {
      this.init()
    },
    init() {
      // 手机适配
      if (this.dPcOrMobile() == 'iphone') {
        document.querySelector('body').style.minHeight = 2420 + 'px'
      } else {
        document.querySelector('body').style.minHeight = 'auto'
      }
    },
    getBalance() {
      if (localStorage.token && window.vis) {
        this.$getS(`member/balance`).then(res => {
          if (res.code == 200) {
            let userinfo = JSON.parse(localStorage.userinfo)
            userinfo.balance = res.data.member
            userinfo.agent = res.data.agency
            this.$store.commit('mainState/reloadUserinfo', userinfo)
          }
        })
      }
    },
    async getUserMsg(){
      let res = await getS(`/member/messageNoticeCount`);
      if(res && res.data && res.code==200){
          this.$store.commit('mainState/getMessage',res.data)
      }
     },
    async getDigitroll(){
      getS(`prizePool`).then((res)=>{
        if(res&&res.code==200){
           this.$store.commit('mainState/prizeArray', res.data)
         }
      })
     },
     getRedLope(){
      this.$store.dispatch('home/getQipaiShouyeHongbao').then(res=>{
           if(res.code === 200){
               try{
                  this.$store.commit('home/getRedLopeMoney',res.data.gift_money)
                  this.$store.commit('home/getRedLopeId',res.data.id)
                  this.$store.commit('home/getRedLopeType',res.data.send_type)
               }catch(error){
                  this.$store.commit('home/getRedLopeMoney', 0)
               }
               this.$store.commit('home/getisRedLop',true)
           }
      })
    },
    JiebeiInfo() {
      if (JSON.stringify(this.$store.state.game.jieBeiData) === '{}') {
          this.$store.dispatch('game/activityJiebeiJieHuanInfo').then(res => {
          if (res.code === 200) this.$store.commit("game/setJieBeiData", res.data);
          }).catch(() => {
          })
       }
    },
  },
  created() {
    this.$store.commit('home/isImgortg',JSON.parse(localStorage.config).VerificationCode.pc[0])
    this.$store.commit('home/usdtWithdrawalsRate',JSON.parse(localStorage.config).limit.usdtWithdrawalsRate)
    this.getDigitroll()
    if (!window.balanceTask) window.balanceTask = this.getBalance.bind(this)
    this.$http.get(`${this.$HOST_NAME}/games/list`).then(res => {
      if (res.code == 200) {
        localStorage.setItem('gameList', JSON.stringify(res.data))
      }
    })
    if(localStorage.token){
      this.getUserMsg()
      this.JiebeiInfo()
      setTimeout(()=>{
         this.getRedLope()
      },3000)
    }
    clearInterval(timer)
    timer = setInterval(this.getBalance, 15000)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState == 'hidden') {
        this.$store.commit('mainState/changvisibStatus',false) 
        clearInterval(timer)
      } else if (document.visibilityState == 'visible') {
        this.$store.commit('mainState/changvisibStatus',true) 
        timer = setInterval(this.getBalance, 15000)
        if(this.userinfo!==null && !(localStorage.token)){
            window.location.href="/"
        }
      }
    })
  },
  computed: {
    userinfo() {
       return this.$store.state.mainState.userinfo;
    },
    ifPersonal () {
       return this.$store.state.personal.isPersonal
    },
   },
   watch: {
     ifPersonal:function(newVal,oldVal){
          if(localStorage.token){
            this.getUserMsg()
            if(newVal){ 
              setTimeout(()=>{
                  this.getRedLope()
              },2000)
            }
          }   
     },
     $route:function(val,oldVal){
       if(val.path.includes("/home")||val.path=='/plays/hall'){
         if(localStorage.token){
           setTimeout(()=>{
             this.getRedLope()
           },3000)
         }
       }
     }
   },
   
  store
 };

export default mixin;
