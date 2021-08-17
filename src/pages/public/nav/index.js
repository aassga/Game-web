import UserService from '@/service/public/UserService.js'
import store from '@/vuex/store'
import {postS,getS} from '@/service/public/service.js'
import Vue from 'vue'
import data from "../../public/alertMsg/index"
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

const mixin={
    mixins:[data],
    data(){
        return {
          classifyList:[
            // 暂定这些，后面有了可以再加
            {name:'首页',text:'HOME',link:'/home',baseNum:1,hotShow:false},
            {name:'购彩大厅',text:'LOTTERY',link:'/plays/hall',baseNum:200,hotShow:true},
            {name:'真人视讯',text:'CASINO',link:'/home/live',baseNum:3,listShow:false,hotShow:true,
              list: [
                {name: 'AG视讯',id: '31',img: "/static/public/image/header/agty.png", icon: '/static/public/image/header/icon/live/AG_LIVE.png'},
                {name: 'BBIN视讯',id: '32',img: "/static/public/image/header/bb.png", icon: '/static/public/image/header/icon/live/BBIN_LIVE.png'},
                {name: 'BG视讯',id: '3180',img: "/static/public/image/header/bg.png", icon: '/static/public/image/header/icon/live/BG_LIVE.png'},
                {name: 'DG视讯',id: '42',img: "/static/public/image/header/gpi.png", icon: '/static/public/image/header/icon/live/DG_LIVE.png'},
                {name: 'DS视讯',id: '34',img: "/static/public/image/header/DS.png", icon: '/static/public/image/header/icon/live/DS_LIVE.png'},
                {name: 'LEBO视讯',id: '44',img: "/static/public/image/header/lebo.png", icon: '/static/public/image/header/icon/live/LEBO_LIVE.png'},
                {name: 'OG视讯',id: '48',img: "/static/public/image/header/evo.png", icon: '/static/public/image/header/icon/live/OG_LIVE.png'},
                {name: 'eBET视讯',id: '43',img: "/static/public/image/header/ebet.png", icon: '/static/public/image/header/icon/live/EBET_LIVE.png'},
                {name: 'LMG视讯',id: '45',img: "/static/public/image/header/LMG.png", icon: '/static/public/image/header/icon/live/LMG_LIVE.png'},
                {name: '欧博视讯',id: '46',img: "/static/public/image/header/ab.png", icon: '/static/public/image/header/icon/live/AB_LIVE.png'},
                {name: 'SA视讯',id: '49',img: "/static/public/image/header/sa.png", icon: '/static/public/image/header/icon/live/SA_LIVE.png'}
              ]
            },
            {name:'电子游艺',text:'GAMES',link:'/home/games?id=10022&name=MW老虎机',baseNum:4,hotShow:true},
            {name:'体育投注',text:'SPORTS',link:'/home/tiyu',baseNum:5,listShow:false,hotShow:false,
              list:[
                {name:"皇冠体育",id:39,img:'/static/public/image/header/hg.png',icon: '/static/public/image/header/icon/tiyu/SX_SPORT.png'},
                {name:"沙巴体育",id:38,img:'/static/public/image/header/saba.png',icon: '/static/public/image/header/icon/tiyu/SB_SPORT.png'},
                {name:"BB体育",id:40,img:'/static/public/image/header/bb.png',icon: '/static/public/image/header/icon/tiyu/BBIN_SPORT.png'},
                {name:"AG体育",id:41,img:'/static/public/image/header/agty.png',icon: '/static/public/image/header/icon/tiyu/AG_SPORT.png'},
              ]
            },
            {name:'捕鱼游戏',text:'FISHING',link:'/home/buyu',baseNum:6,hotShow:true},
            {name:'棋牌游戏',text:'CHESS',link:'/home/qipai',baseNum:7,listShow:false,hotShow:false,
              list:[
                // {name:'KY棋牌',id:243},
                // {name:'VG棋牌',id:10091},
              ]
            },
            {name:'优惠活动',text:'ACTIVITY',link:'/home/youhui',baseNum:1001,hotShow:false},
            {name:'在线客服',text:'SERVICE',link:'service',baseNum:1002,hotShow:false},
            // {name: '代理加盟', link: '/home/agent', text: 'AGENT',baseNum:1003,hotShow:false}
          ]


        }
    },
    mounted () {

    },
    methods: {
        // 导航栏，跳转
        goLink(item){
            if (item.link) {
              if (item.link == 'service') {
                //   客服
                let service = JSON.parse(localStorage.config).service;
                if (service) {
                  let ser = service.find(item => item.status === 'on')
                  if (ser) {
                    window.open(ser.url);
                  }
                }
              } else if (item.link == '/plays/hall') {
                //   购彩大厅
                window.open('#/plays/hall')
              }else if(item.link=="/home/youhui"){
                //   优惠活动，有时候会关闭
                if(this.gbyouhui){
                    // 此时会关闭优惠活动页面
                    this.alertBox("敬请期待！","warn")
                    return false;
                }
                // 正常跳转
                this.$router.push(item.link)
              } else {
                //   其他常规链接跳转
                this.$router.push(item.link)
              }
            }
        },
        // 二级菜单跳转
        thirdParty(item){
            // 有链接，但是需要判断是直接登录游戏，还是跳转页面
          if(item.link){
              // 除了彩票游戏外，所有的链接，应该都可以直接跳转
              if(item.link.includes("/plays/tradition")){
                  // 彩票游戏
                if(localStorage.token){
                  if(localStorage.Public_User=='test'){
                    this.alertBox("彩票暂无试玩,立即注册",'warn');
                    return false;
                  }
                }else{
                  this.alertBox("请先登录","warn");
                  return false;
                }
              }
              // 彩票问题排除，可以直接跳转
              this.$router.push(item.link)
          }else if(item.id&&!item.link&&!item.router){
            // 没有链接，有游戏id
            // 第三方游戏跳转，包括体育，视讯，电子游戏
              this.getItemId(item)
              return false
          }else if(item.router){
            // 后台传过来的彩票游戏，热门彩票游戏类（cjw等网站）
            if(localStorage.token){

              if(localStorage.Public_User=='test' ){
                      this.alertBox('彩票暂无试玩,立即注册','warn')
                  }else{
                    var newitem=item.router.split("#")[1]
                      this.$router.push({
                        path: newitem
                      })
                  }
            }else{
                    this.alertBox('请先登录','warn')
            }
          }

        },
        goThirdParty(item){
          // 有链接，但是需要判断是直接登录游戏，还是跳转页面
          if(item.link){
              // 除了彩票游戏外，所有的链接，应该都可以直接跳转
              if(item.link.includes("/plays/tradition")){
                  // 彩票游戏
                if(localStorage.token){
                  if(localStorage.Public_User=='test'){
                    this.alertBox("彩票暂无试玩,立即注册",'warn');
                    return false;
                  }
                }else{
                  this.alertBox("请先登录","warn");
                  return false;
                }
              }
              // 彩票问题排除，可以直接跳转
              this.$router.push(item.link)
          }else if(item.id&&!item.link&&!item.router){
            // 没有链接，有游戏id
            // 第三方游戏跳转，包括体育，视讯，电子游戏
              this.getItemId(item)
              return false
          }else if(item.router){
            // 后台传过来的彩票游戏，热门彩票游戏类（cjw等网站）
            if(localStorage.token){
              if(localStorage.Public_User=='test' ){
                      this.alertBox('彩票暂无试玩,立即注册','warn')
                  }else{
                    var newitem=item.router.split("#")[1]
                      this.$router.push({
                        path: newitem
                      })
                  }
            }else{
                    this.alertBox('请先登录','warn')
            }
          }

      },
    },

    created () {
    },
    watch:{},
    store
}


export default mixin
