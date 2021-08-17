<template>
  <div class="new-header">
    <!-- 头部上面 -->
    <div class="header-top" :class="{night:colorbool}" >

    <!-- <div class="header-top" :class="{night:colorbool}" :style="{backgroundColor:headerbgColor}"> -->
      <!-- 登录 -->
      <div class="login">
        
        <!-- 登录前 -->
        <div class="before_login">
          <div class="l_top">
            <div>
              <div><img src="/static/amhg/img/logo.png" width="200px"></div>
              <div>最佳博彩认证推荐品牌</div>
            </div>
            <div>
              <div class="userInfo" v-if="userinfo">
                <p><span>欢迎您，</span><span>{{userinfo.userName}}</span><span><img src="/static/amhg/img/level.png" alt=""></span></p>
                <p><span>中心钱包:</span><span>{{userinfo&&userinfo.balance}}</span></p>
              </div>
              <ul>
                <li @click="$bindPhoneOrbank()"><a href="javascript:0">
                  <i class="cun"></i>
                  <i>存款</i>
                  
                  </a> </li>
                <li @click="personal('qu')"><a href="javascript:0">
                  <i class="qu"></i>
                  <i>取款</i>
                  </a> </li>
                <li @click="personal('cun')"><a href="javascript:0">
                  <i class="zhuan"></i>
                  <i>转账</i>
                  </a> </li>
                <li v-show="!userinfo" @click="showLoginLogs(1)"><a href="javascript:0">
                  <i class="deng"></i>
                  <i>登录</i>
                  </a> </li>
                <li v-show="!userinfo" @click="showLoginLogs(2)"><a href="javascript:0">急速注册</a> </li>
                <li v-show="userinfo" @click="logout"><a href="#">
                  <i class="tui"></i>
                  <i>退出</i>
                  </a> </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="nav-content">
          <ul class="nav-bar fl">
              <li class="tpT" v-for="(item,i) in classifyList" :key="i">
                  <img src="/static/amhg/img/thirdparty/hot.gif" class="x-dh-i" alt v-if="item.hotShow">
                  <!-- <a  @click="goLink(item,i)"  :class="[{navActive:i==gameIndex}, 'x-dh-t']"  > -->
                  <a @click="$goPath('one',item)" :class="[{navActive:i==gameIndex,fontColor:colorbool}, 'x-dh-t']">
                      <span class="navName">{{item.name}}</span>
                      <!-- <span class="navText">{{item.text}}</span> -->
                      <!-- <i :class="{triangle:navChecked==i}"></i>
                      <i class="triangle1"></i> -->
                  </a>
                  <!-- <div class="girl dropdown" v-if="item.list">
                      <ol>
                          <li v-for="(v,i) in item.list" :key="i" @click="$goPath('nav',v)">
                              <a href="javascript:void(0)">
                                  <img :src="v.img" width="37" height="21" alt v-if="v.img">
                                  <span>{{v.name}}</span>
                                  <br>
                              </a>
                          </li>
                      </ol>
                  </div> -->
              </li>
          </ul>
        </div>
      </div>
       <Modal
              :visible.sync="modal6"
               class="model"
               width="306"
               height="146"
              v-model="showmodle"
              title="信息"
              :loading="loading"
              @on-ok="asyncOK">
              <p>开始进行缓存清除，完毕后将会刷新网站！</p>
       </Modal>
        <qyLogin ref="qylogin" :logiinTishi="logiinTishi"></qyLogin>
    </div>
  </div>
</template>

<script>
  import UserService from '@/service/public/UserService.js'
  import store from '@/vuex/store'
  import {postS,getS} from '@/service/public/service.js'
  import inForMation from "../../public/home/information.vue" 
  import qyLogin from '../../public/home/qy-login.vue'
  // import data from "../../public/user/login"
  export default {
    // mixins:[data],
    data () {
      return {
        systemmessage:{
                width:' 18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#ff0000',
                position: 'absolute',
                left: '58px',
                top: '-9px',
                color:'#fff',
                lineHeight:' 18px',
                textAlign: 'center',
                display: 'block',
            },
        logiinTishi:{
             title:"来自澳门皇冠的消息",
             bgcolor:{
               background: 'linear-gradient(to right, #65e0f4, #4fade6)'
             }
        },
        time:"",
        colorbool:false,
        modal6: false,
        loading: true,
        headerColorBool:false,
        headerbgColor:"#697dac",
        headerbgColor:"#d0d9e5",
        showmodle:false,
        codeImg: '/static/amhg/img/new_games/lo.png',
        left: 5,
        top: -193,
        gameIndex: 0,
        navChecked: 0,
        showReload: false,
        classifyList: [
            {
                name: "首页",
                text: "HOME",
                platform: "home",
                link: "/home"
            },
            {
                name: "真人视讯",
                text: "CASINO",
                link: "/home/live",
                platform: "live_casino",
                type:'live'
            },
            {
                name: "棋牌游戏",
                text: "CHESS",
                platform: "KY_CHESS",
                // link: "/home/qipai?id=10042&name=开元棋牌",
                link: "/home/chess?navid=9&id=0",
                gameName: "0",
                list: [],
                type:'chess'
            },
            {
                name: "彩票游戏",
                text: "LOTTERY",
                platform: "CT_LOTTERY",
                type:"lottery",
                link: "/plays/hall",
                gameName: "0"
            },
            {
                name: "电子游戏",
                text: "GAME",
                platform: "AG_GAME",
                link: "/home/slot?navid=9&id=0",
                type:'live'
            },
            {
                name: "捕鱼游戏",
                text: "FISHING",
                link: "/home/fish?navid=9&id=0",
                type:'fish'
            },
            {
                name: "体育电竞",
                text: "SPORTS",
                platform: "sport",
                link: "/home/tiyu?id=0",
                list: []
            },
            {
                name: "优惠活动",
                text: "ACTIVETY",
                link: "/home/youhui"
            },
            {
                name: "在线客服",
                text: "SERVICE",
                link: "service",
                type:'service'
            }
        ],
      }
    },
    methods: {
       logout() {
            UserService.logout.call(this);
        },
      showLoginLogs(i){
        this.$store.state.home.showLoginIndex = i;
        this.$store.state.home.showLoginLog = true;
      },
      
      personal(a){
        if(!this.userinfo){
          this.$errorAlert("请先登录", "warn");
          return false;
        }else{
          if (a == 'cun') {
            this.$bindPhoneOrbank();
            // if(!this.userinfo.phone) this.$store.commit('alert/changbindPhone', true)
            // else this.$goUserCen('recharge',0);
            // this.$goUserCen('recharge',0);
          }else{
            this.$goUserCen('withdraw',0);
          }
        }
        
      },
      goHeader(typeNum){
        if(typeNum==0){
          // 线路检测
          // alert("暂未开放，敬请期待")
          return false;
        }else if(typeNum==1){
          // 借呗
           this.$store.commit('alert/newshowtip',{
               bool:true,
               title:'暂未开放，敬请期待',
               model:'',
               leftspan:true
            })
        }else if(typeNum==2){
          // 金管家
          window.open("/static/amhg/html/active/sxjgj/index.html","_blank");
        }
      },
            //获取时间
      ee(num) {
        if (num < 10) {
          num = "0" + num;
        }
        return num;
      },
      we(num){
        switch (num) {
          case 1: num = "一"; break;
          case 2: num = "二"; break;
          case 3: num = "三"; break;
          case 4: num = "四"; break;
          case 5: num = "五"; break;
          case 6: num = "六"; break;
          case 7: num = "七"; break;
        }
        return num;
      },
      goLink(item, i) {
        this.gameIndex = i;
        this.navChecked = i;
        localStorage.setItem("navIndex", i);
        if (item.link) {
            if (item.link == "service") {
                let service = JSON.parse(localStorage.config).service;
                if (service) {
                    let ser = service.find(item => item.status === "on");
                    if (ser) {
                        window.open(ser.url);
                    }
                }
            } else if (item.link == "/plays/hall") {
                window.open("#/plays/hall");
                return false;
            } else if (item.link == "/home/youhui") {
                this.$router.push(item.link);
            } else {
                this.$router.push(item.link);
            }
        } else if (item.gameName) {
            this.trustLogin(item);
        }
      },
      getTimes() {
      var that = this;
      let timestam = new Date().getTime();
      let time = timestam;
      let T = '';
      let dateObj = new Date(time),
        p0 = this.ee,
        Y = dateObj.getFullYear(),
        Mh = dateObj.getMonth() + 1,
        D = p0(dateObj.getDate()),
        X = this.we(dateObj.getDay()),
        H = p0(dateObj.getHours()),
        M = p0(dateObj.getMinutes()),
        S = p0(dateObj.getSeconds());
        // if(H>=12){
        //   T = 'PM'
        //   H = H-12
        // }else{
        //   T = 'AM'
        // }

      if (Mh > 12) {
        Mh = "01";
      } else if (Mh < 10) {
        Mh = "0" + Mh;
      }
      let str = `${Y}-${Mh}-${D} ${H}:${M}:${S}`;
      this.time = str;
    },


      focusname(){

      },
      changcolor(){
        this.colorbool=!this.colorbool
         this.$store.commit('mainState/changcolor',this.colorbool)
      },
      
      cleanUp(){
            this.showmodle=true

      },
      asyncOK(){
           window.location.reload()
      },
      // logout () {
      //   UserService.logout.call(this)
      // },
      getBalance () {
        this.showReload = true
        getS(`member/balance`).then(res => {
            if (res.code == 200) {
              let userinfo = JSON.parse(localStorage.userinfo)
              userinfo.balance = res.data.member
              userinfo.agent=res.data.agency
              this.$store.commit('mainState/reloadUserinfo', userinfo)
              // this.showReload = false
              this.$store.commit('alert/newshowtip',{
                bool:true,
                title:'刷新余额成功！',
                model:'',
                leftspan:false
              })
            }else{
              this.$store.commit('alert/newshowtip',{
                bool:true,
                title:'服务器报错',
                model:'',
                leftspan:false
              })
            }
          })
          setTimeout(()=>{
              this.showReload = false
          },5000)

      },
      // 打开个人中心
      goUserCen (name, num) {
        //name的类型有 ：  recharge （充值）  personage （个人资料）
        //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）
        this.$store.commit('showPersonal', {
          bool: true
        })
        this.$store.commit('showContent', {
          parent: name
        })
        this.$store.commit('showNav', {
          child: num
        })
      },
      async tryPlay () {
        // let res = await this.$http.post('/api/test/registerTest', {})
        let res = await this.$http.get("/frontend/test/demo", { headers: { 'Accept': 'application/x.tg.v2+json' },params:{}});
        if (res && res.code == 200) {
          UserService.setCache(res, 'test')

          this.$http.post(`${this.$HOST_NAME}/member/refundInfo`).then(res => {
            let platform = res.data.platform
            let alias = res.data.alias
            let keys = Object.keys(platform)
            let refund = []
            keys.forEach((v, i) => {
              refund[i] = {}
              refund[i].title = v
              refund[i].list = []
              platform[v].forEach((a, j) => {
                refund[i].list[j] = {}
                refund[i].list[j].key = Object.keys(a)[0]
                refund[i].list[j].refund = Object.values(a)[0]
                refund[i].list[j].name = alias[refund[i].list[j].key]
              })
            })

            // this.refundData = refund;
            localStorage.setItem('refund', JSON.stringify(refund))
          })
          setTimeout(() => {
            window.location.reload()
          }, 500)
        }
      },
      forget () {
        this.$store.commit('alert/newshowtip',{
               bool:true,
               title:'忘记帐号密码,请联系在线客服人员取回！',
               model:'',
               leftspan:false
            })
      },
      // is_code_show(){
      //    getS(`is-show-captcha-with-type`, { device: 'pc' }).then(res => {
      //   if (res && res.code === 200) {
      //     this.code_show = res.data.isShowCaptcha;
      //   }
      // });
    // }
    },
    computed: {
      userinfo () {
        return this.$store.state.mainState.userinfo
      }
    },
    watch:{
      "$route.path": function (newVal, oldVal) {
            switch (true) {
                case newVal == "/home":
                    this.gameIndex = 0;
                    this.navChecked = 0;
                    break;
                case newVal.includes("/home/chess"):
                    this.gameIndex = 2;
                    this.navChecked = 2;
                    break;
                case newVal == "/home/live":
                    this.gameIndex = 1;
                    this.navChecked = 1;
                    break;
                case newVal.includes("/home/slot"):
                    this.gameIndex = 4;
                    this.navChecked = 4;
                    break;
                case newVal == "/home/fish":
                    this.gameIndex = 5;
                    this.navChecked = 5;
                    break;
                case newVal == "/home/tiyu":
                    this.gameIndex = 6;
                    this.navChecked = 6;
                    break;
                case newVal == "/home/youhui":
                    this.gameIndex = 7;
                    this.navChecked = 7;
                    break;
            }
            this.$store.commit("mainState/getRoute", newVal);
        },
    },
    mounted () {
      // 夜间模式
      // let date = new Date()
      // let newHour = date.getHours()
      // if(newHour>=18 || newHour<=5){
      //   this.changcolor()
        // }
      //获取时间
      let routerSrc = this.$store.state.mainState.routeSrc;
      this.navChecked = this.gameIndex = localStorage.getItem("navIndex");
      if (routerSrc === "/home") {
          this.navChecked = 0;
          this.gameIndex = 0;
      }
      let time = setInterval( this.getTimes, 1000);
      if(localStorage.qyLogin){
           this.$refs.qylogin.qyLogin=true
      }
      if(localStorage.register){
        this.showLoginLogs(2)
        localStorage.removeItem('register')
      }
    },
    created () {
      // this.is_code_show();
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState == 'hidden') {
          if (!localStorage.userinfo) {
            let timer = setInterval(() => {
              if (localStorage.userinfo) {
                clearInterval(timer)
                window.location.reload()
              }
            }, 1000)
          }
        }
      })
      if (!this.userinfo) return false
      switch (this.userinfo.levelId) {
        case 2:
          this.top = 1
          break
        case 3:
          this.top = -31
          break
        case 4:
          this.top = -64
          break
        case 5:
          this.top = -96
          break
      }
    },
    components:{
        qyLogin,
        inForMation
    },
    store
  }
</script>

<style lang="less" scoped>
  .headerLinkBox{
    width:350px;
    display:inline-block;
    overflow:hidden;
    height:100%;
    li{
      float: left;
      // width:60px;
      margin:0 15px;
      position:relative;
      a{
            color: #697dac;
            font-size: 15px;
            margin-left: 30px;
      }
      img{
        position:absolute;
        top:50%;
        transform:translateY(-50%)
      }
    }
    li:nth-child(1){
        margin-left:0;
    }
  }




  .new-header {
    background: #fff;
    // max-width: 1920px;
    // min-width: 1200px;
    width:100%;
    margin: 0 auto;
    height: 139px;
    .header-top {
      background: #fff;
      height: 139px;
      width: 100%;
      position: fixed;
      z-index: 1000;
      left: 50%;
      transform: translate(-50%, 0);
      .login {
        margin: 0 auto;
        width: 1200px;
        .sj{
          // width:100px;
          height:100%;
          // background-color: red;
          display:inline-block;
          font-size:15px;
          // margin-left:64px;
        }
        input{
          width: 150px;
          height: 34px;
          padding: 0 0 0 5px;
          background: #aab7ca;
          line-height: 34px;
          color:#fff;
          border: none;
          font-size: 14px;
          outline: none;
          text-indent: 4px;
          border-radius:5px;
        }
        input:focus{
           background: #fff;
           color: #697dac;
        }
        input::-webkit-input-placeholder{
          color: #fff;
        }

        input[type="button"] {
          width: 80px;
          height: 34px;
          line-height: 34px;
          border-radius:5px;
          color: #fff;
          cursor:pointer;
        }
        .nav-content {
          width: 100%;
          height: 58px;
          margin: 0 auto;
          background: #fff;
          .logo {
            float: left;
            text-align: center;
            width: 334px;
            height: 30px;
            margin-top: 26px;
          }
          .nav-bar {
            height: 60px;
            width: 1200px;
            margin: 0 auto;
            float: initial;
            // margin-right:10px;
            li {
                float: left;
                position: relative;
                height: 60px;
                line-height: 60px;
                margin: 0 32px;
                font-size: 16px;
                color: #54689a;
                list-style: none;
                cursor: pointer;
                transition: all 0.3s;
                &:first-child{
                    margin-left: 0;
                }
                &.tpT {
                    line-height: 60px;
                }
                a {
                    width: 100%;
                    height: 100%;
                    display: block;
                    text-align: center;
                    text-decoration: none;
                    color: inherit;
                    position: relative;
                    font-size: 20px;
                    color:#444952;
                    .navName {
                        display: block;
                    }
                    .navText {
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        font-size: 12px;
                        margin: 0 auto;
                        top: 22px;
                        white-space: nowrap;
                        text-align: center;
                    }
                    .bg-home {
                        width: 25px;
                        height: 23px;
                        display: block;
                        position: relative;
                        top: 50%;
                        transform: translateY(-50%);
                        background: url('/static/public/image/userImg/header_nav_sprites.png') -10px -10px;
                    }
                    .bg-home:hover {
                        background: url('/static/public/image/userImg/header_nav_sprites.png') -55px -10px;
                    }
                }
                .x-dh-i {
                    position: absolute;
                    top: 12px;
                    right: 0px;
                }
                .x-dh-t {
                    display: block;
                    &:hover {
                        border-bottom: 3px solid #BF9D6e;
                        color:#BF9D6e;
                    }
                    &:hover .triangle1 {
                        display: block;
                    }
                }
                .navActive {
                    border-bottom: 3px #BF9D6e solid;
                    color: #BF9D6e;
                }
                .fontColor {
                    color: #d7d7e2;
                }
                .triangle {
                    font-size: 22px;
                    content: '';
                    position: absolute;
                    bottom: 0px;
                    left: 50%;
                    margin-left: -5px;
                    border: 5px solid transparent;
                    border-bottom: 5px solid #579ae5;
                    transition: all 0.2s;
                }
                .triangle1 {
                    display: none;
                    font-size: 22px;
                    content: '';
                    position: absolute;
                    bottom: 0px;
                    left: 50%;
                    margin-left: -5px;
                    border: 5px solid transparent;
                    border-bottom: 5px solid #579ae5;
                    transition: all 0.2s;
                }

                .x-dh-b {
                    white-space: nowrap;
                }
                
            }
            li:last-child {
                margin-right: 0;
                padding-right: 0;
            }
            li::after {
                content: '';
                position: absolute;
                bottom: 0;
                width: 0;
                height: 2px;
                color: #5caaea;
                background-color: #5caaea;
                transition: 0.5s all linear;
            }
            li:hover {
                .x-dh-t {
                    color: #BF9D6e;
                }
                .x-dh-b {
                    color:#BF9D6e;
                }
                
            }
          }
        }
        .before_login{
          width: 100%;
          background: #fff;
          .l_top{
            display: flex;
            margin: 0 auto;
            >div{
              width: 50%;
              height: 80px;
              &:first-child{
                display: flex;
                div{
                  width: 40%;
                  color: #aeaebc;
                  font-size: 18px;
                  line-height: 80px;
                }
              }
              &:last-child{
                .userInfo{
                  width: 235px;
                  float: left;
                  margin-left: 30px;
                  p{
                    &:first-child{
                      margin-top: 10px;
                      padding-left: 7px;
                      span{
                        &:first-child{
                          color: #000;
                          font-size: 16px;
                        }
                        &:nth-child(2){
                          font-size: 18px;
                          color: #ceb07a;
                        }
                        &:last-child{
                          width: 61px;
                          position: relative;
                          left: 10px;
                          top: 5px;
                          img{
                            width: 60px;
                          }
                        }
                      }
                    }
                    &:last-child{
                      margin-top: 14px;
                      height: 24px;
                      font-size: 14px;
                      background: #fcf5e5;
                      border-radius: 20px;
                      padding: 2px;
                      padding-left: 10px;
                      line-height: 21px;
                      span{
                        &:first-child{
                          color: #000;
                          font-size: 14px;
                        }
                        &:last-child{
                          color: #bba06f;
                          padding-left: 10px;
                          font-weight: 600;
                          font-size: 14px;
                        }
                      }
                    }
                  }
                }
                ul{
                  display: flex;
                  margin-top: 11px;
                  float: right;
                  li{
                    background-color: #f2f2f2;
                    width: 80px;
                    height: 60px;
                    text-align: center;
                    position: relative;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    &:hover{
                      background: #bf9d61;
                      i{
                        color: #fff;
                      }
                      .cun{
                        background: url('/static/amhg/img/b_save.svg') no-repeat;
                        background-size: 100% 100%;
                      }
                      .qu{
                        background: url('/static/amhg/img/b_qu.svg') no-repeat;
                        background-size: 100% 100%;
                      }
                      .zhuan{
                        background: url('/static/amhg/img/b_zhuan.svg') no-repeat;
                        background-size: 100% 100%;
                      }
                      .deng{
                        background: url('/static/amhg/img/b_logi.svg') no-repeat;
                        background-size: 100% 100%;
                      }
                    }
                    &:first-child{
                      border-bottom-left-radius: 10px;
                      border-top-left-radius: 10px;
                      a{
                        border-left: none;
                      }
                      
                    }
                    &:nth-child(3){
                      border-top-right-radius: 10px;
                      border-bottom-right-radius: 10px;
                    }
                    &:nth-child(4){
                      margin-left: 10px;
                      border-radius: 10px;
                      a{
                        border-left: none;
                      }
                    }
                    &:nth-child(5){
                      margin-left: 10px;
                      border-radius: 10px;
                      width: 180px;
                      background: url("/static/amhg/img/reg_icon.png") no-repeat;
                      background-size: 100% 100%;
                      a{
                        color: #fff;
                        border: none;
                        line-height: 78px;
                      }
                      
                    }
                    &:last-child{
                      background: none;
                      &:hover{
                        background: none;
                        color: #DADBDC;
                      }
                      a{
                        border: none;
                      }
                    }
                    a{
                      display: inline-block;
                      height: 50px;
                      line-height: 23px;
                      width: 100%;
                      color: #454a53;
                      font-size: 14px;
                      border-left: 1px solid #e6e6e6 ;
                      .cun{
                        background: url('/static/amhg/img/save.svg') no-repeat;
                        background-size: 100% 100%;
                      }
                      .qu{
                        background: url('/static/amhg/img/qu.svg') no-repeat;
                        background-size: 100% 100%;
                      }
                      .zhuan{
                        background: url('/static/amhg/img/zhuan.svg') no-repeat;
                        background-size: 100% 100%;
                      }
                      .deng{
                        background: url('/static/amhg/img/logi.svg') no-repeat;
                        background-size: 100% 100%;
                      }
                      .tui{
                        background: url('/static/amhg/img/tui.svg') no-repeat;
                        background-size: 100% 100%;
                      }
                      i{
                        img{
                          width: 28px;
                        }
                        display: block;
                        width: 28px;
                        height: 28px;
                        margin-left: 24px;
                      }
                    }
                  }
                }
              }
            }
          }
          
        }
        .login_after{
          width: 100px;
          float: left;
          height: 40px;
           li{
            height: 40px;
            line-height: 40px;
            margin-left:10px;

            a{
              color: #697dac;
              font-size:14px;
            }
           }

        }
        .headerColor{
          color:white!important;
          a{
            color:white!important;
          }
          li{
            a{
              color:white;
            }
          }
        }
        .login-before {
          float: right;
          // margin-right:12px;
          div {
            float: left;
            position: relative;
            margin: 0 6px 0;
            text-align: left;

            #loginBtn {
              background: #df3e7b; /* Safari 5.1 - 6.0 */
            }

            #resetBtn {
              background: #697dac;
            }
          }

          .code {
            input {
              width: 160px;
            }

            span {
              display: inline-block;
              cursor: pointer;
              width: 80px;
              height: 35px;
              position: absolute;
              right: 0;
              top: 13px;
              border-bottom-right-radius: 5px;
              border-top-right-radius: 5px;
            }
          }

          .last_item {
            margin: 0 0 0 6px;

            a {
              line-height: 34px;
              color: #697dac;
              cursor: pointer;
              font-size: 14px;
            }
          }
        }

        .login-after {
          float: right;
          font-size: 13px;
          // margin-right: 6px;
          a {
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: #697dac;
            min-width: 60px;
            display: inline-block;
          }
          .part3{
            a{
              height: 30px;
              text-align: center;
              line-height: 30px;
              color: #697dac;
              min-width: 60px;
              display: inline-block;
              label{
                display: inline-block;
                height: 30px;
                line-height: 30px;
                text-align: center;
              }
            }
          }

          div {
            height: 60px;
            margin-right: 10px;
            float: left;
            line-height: 60px;
            color: #697dac;
            font-size: 15px;

            i {
              vertical-align: middle;
            }

            a {
              vertical-align: middle;
            }
          }

          .part1 {
            .vip-sprite {
              width: 38px;
              height: 30px;
              display: inline-block;
              vertical-align: middle;
              margin-right: 4px;
            }
          }

          .part5 {
            position: relative;

            .login-dropdown {
              display: none;
              position: absolute;
              top: 50px;
              left: -30px;
              z-index: 9999666;
              height:68px;
              line-height: 68px;
              border-radius: 0 0 10px 10px;
              box-shadow: 3px 3px 6px rgba(0, 0, 0, .5);
              background-color: #fff;

              ul {
                li {
                  display: block;
                  width: 100%;
                  text-align: center;
                  height: 34px;
                  line-height: 34px;
                  cursor: pointer;
                }
                li:last-child:hover{
                      border-radius:0 0 10px 10px;
                }
                li:hover {
                    background: #d0d9e5;
                }
              }
            }
          }

          .part5:hover {
            .login-dropdown {
              display: block;
            }
          }

          .last_item {
            a {
             background: #697dac;
             border-radius: 5px;
             color:#fff;
            }
          }
        }
      }
    }
    .night{
       background: rgb(16, 17, 35)
    }
  }
 .model /deep/.ivu-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -153px;
        margin-top: -73px;
  }
  .model /deep/.ivu-modal-close{
    display: none;
  }
  .model /deep/.ivu-btn-text{
    display: none
  }
  .model /deep/.ivu-modal-body p{
     font-size: 14px;
  }


  input:-webkit-autofill{
    -webkit-text-fill-color: #fff !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
    background-color:transparent!important;
    // background-image: none!important;
    transition: background-color 50000s ease-in-out 0s!important;
  }
</style>
