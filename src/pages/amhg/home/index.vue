<template>
  <div class="new-index klk-home">
    <div class="content_bg">
      <div class="content content-main-bg" :class="{night:colorbool}">
          <heaerNav></heaerNav>
          <div class="wp">
            <div class="title_h">
              <div></div>
              <div>
                <span>热门推荐</span>
                <span>汇聚全球顶级娱乐平台</span>
              </div>
              <div></div>
            </div>
            <div class="content_h">
              <div @click="$router.push('/home/live')"></div>
              <div>
                <ul>
                  <li v-for="(item,index) in gameList" @click="$router.push(item.link)" :style="{backgroundImage:'url(' + item.img + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}" :key="index" ></li>
                </ul>
              </div>
            </div>
            <div class="title_h">
              <div></div>
              <div>
                <span>热门游戏</span>
                <span>多款游戏高额奖金</span>
              </div>
              <div></div>
            </div>
            <div class="content_j">
              <ul>
                <li v-for="(item,index) in gameList2" :key="index" @click="$loginGame(item)" :style="{backgroundImage:'url(' + item.img + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"></li>
              </ul>
            </div>
            <div class="title_h">
              <div></div>
              <div>
                <span>热门优惠</span>
                <span>各种优惠为您撑腰</span>
              </div>
              <div></div>
            </div>
            <div class="content_l">
              <div><img src="/static/amhg/img/l1.png" alt="" @click="$router.push('/home/youhui')"></div>
              <div><img src="/static/amhg/img/l2.png" alt="" @click="$router.push('/home/youhui')"></div>
              <div><img src="/static/amhg/img/l3.png" alt="" @click="$router.push('/home/youhui')"></div>
            </div>
          </div>
          
          <Modal :scrollable=true title="网站公告" ok-text="关闭" v-model="showPopout" width="657" class="vp-popout-box" >
              <div class="popout-box">
                <span v-html="popups"></span>
              </div>
          </Modal>
      </div>
      <float></float>
    </div>
  </div>
</template>

<script>
  import heaerNav from "./nav.vue"
  import store from '@/vuex/store'
  import UserService from '@/service/public/UserService.js'
  import float from './float'
  export default {
    data () {
      return {
        showimg:false,
        slideTrue:false,
        showPopout: false,
        nightColor:"#fff",
        popups: '',
        lantern: '',
        value3: 0,
        canvas:null,
        borderColor:'#c6e4fc',
        colors: { blue: '#0084ff', red: '#fe0000',green:'#49ea00'},
        // 轮播设置
        setting: {
          autoplay: false,
          autoplaySpeed: 2000,
          dots: 'none',
          trigger: 'click',
          arrow: 'hover',
          arrow2: 'never'
        },
        gameList:[
          {img:"/static/amhg/img/cq_g.png",link:"/home/slot?navid=9&id=10018"},
          {img:"/static/amhg/img/jdb_g.png",link:"/home/slot?navid=9&id=10021"},
          {img:"/static/amhg/img/bb_g.png",link:"/home/slot?navid=9&id=10016"},
          {img:"/static/amhg/img/hb_g.png",link:"/home/slot?navid=9&id=10022"},
        ],
        gameList2:[
          {img:"https://xpjstatic.7876111.com/images/style61/pc/245.png",id:245},
          {img:"https://xpjstatic.7876111.com/images/style61/pc/10688.png",id:10688},
          {img:"https://xpjstatic.7876111.com/images/style61/pc/251.png",id:251},
          {img:"https://xpjstatic.7876111.com/images/style61/pc/249.png",id:249},
          {img:"https://xpjstatic.7876111.com/images/style61/pc/248.png",id:248},
          {img:"https://xpjstatic.7876111.com/images/style61/pc/246.png",id:246},
          {img:"https://xpjstatic.7876111.com/images/style61/pc/11182.png",id:11182},
          {img:"https://xpjstatic.7876111.com/images/style61/pc/11180.png",id:11180},
          {img:"https://xpjstatic.7876111.com/images/style61/pc/10629.png",id:10629},
          {img:"https://xpjstatic.7876111.com/images/style61/pc/11179.png",id:11179},
        ]
      }
    },
    methods: {
      goHelp(index){
        if(index == 5){
          this.getUrl()
        }else{
          this.$router.push('/home/about/'+ index);
        }
      },
      getUrl(){
        let service = JSON.parse(localStorage.config).service;
        if (service) {
          let ser = service.find(item => item.status === 'on')
          if (ser) {
            window.open(ser.url)
          }
        }
      },
      golotteryStart(v){
        if(!localStorage.token || !localStorage.userinfo){
          this.$store.commit('alert/newshowtip',{
              bool:true,
              title:'请先登录！',
              model:'',
              leftspan:true
          })
        }else{
             this.$store.dispatch('lottery/getStopLotteryCheck',v).then(res=>{
               if(res&&res.length >0 ){
                     this.$store.commit('alert/newshowtip', {
                        bool: true,
                        title: res.replace(/，/g,'</br>'),
                        model: '',
                        type:'closeMaret',
                     });
               }else{
                   window.open(`#/plays/tradition/${v}`)
               }
            })
          
        }
      },
      golottery(){
          window.open(`#/plays/hall`)
      },
      sortBy(field){
          return function(a,b){
              var value1 = a[field];
              var value2 = b[field];
              return -(value1 - value2);
          }
      },
      close(){
          this.showimg=false;
      },
     
      async getPopout () {
        if (!this.$store.state.mainState.ifpourT || localStorage.token)
          return false
        let res = await this.$http.post(`${this.$HOST_NAME}/site/notice`, {
          type: 'popups',
          desc_client_type: 'html'
        })
        if (res && res.code == 200) {
          if (!res.data.data.length){
              this.showimg=true
              return false
          } 
          this.showPopout = true
          this.showimg=true
          this.popups = res.data.data[0] && res.data.data[0].description
          this.$store.commit('mainState/resetPour', false)
        }
      },
      
    },
    created () {
       setTimeout(() => {
         this.showimg=false
      }, 10000)
    },
    mounted () {
      
      if (localStorage.config) {
        let config = JSON.parse(localStorage.config)
        this.publicUrl = config.statics
      }
     },
     computed: {
        colorbool(){
         return this.$store.state.mainState.color
       },
        websocketdata(){
          return this.$store.state.mainState.websoc
       },
    },
     watch:{
       websocketdata(){
          this.websoc();
       },
     },
    components: {
      heaerNav,
      float
    },
    filters:{
      capitalize:function(value){
        try{
          return `/static/public/image/lottery/nico/png/${value}.png`
        }catch(err){
          return `/static/public/image/lottery/nico/png/438.png`
        }
      },
      formateNum:function(value){
        value = value.toString();
        if (!value) return '0.00';
        var intPart = Number(value).toFixed(0); // 获取整数部分
        var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
        var floatPart = '.00'; // 预定义小数部分
        var value2Array = value.split('.');
        if (value2Array.length === 2) { // =2表示数据有小数位
          floatPart = value2Array[1].toString(); // 拿到小数部分
          if (floatPart.length === 1) { // 补0,实际上用不着
            return intPartFormat + '.' + floatPart + '0';
          } else {
            return intPartFormat + '.' + floatPart;
          }
        } else {
          return intPartFormat + floatPart;
        }
      }
    },
    store
  }
</script>

<style lang="less">
  .new-index {
    position: relative;
    // max-width: 1920px;
    // min-width: 1200px;
    width:100%;
    margin: 0 auto;
    background: #f1f1f1;

    .content_bg{
      background-color: #f1f1f1;
      overflow: hidden;
      width: 100%;
      .content-main-bg{
        position: relative;
        padding-bottom:10px;
        background:url(/static/amhg/img/index-main-bg-1.jpg) no-repeat center top;
        background-size: 100% 100%;
        .wp{
          width: 1200px;
          margin: 140px auto;
          .title_h{
            display: flex;
            margin: 20px 0 20px 0;
            div{
              width: 35%;
              &:last-child{
                transform: rotateY(180deg);
              }
              &:first-child,&:last-child{
                background: url('/static/amhg/img/t_2.png') no-repeat;
                background-size: 100% 100%;
              }
              &:nth-child(2){
                width: 30%;
                span{
                  display: block;
                  &:first-child{
                    text-align: center;
                    font-size: 32px;
                    color: #444952;
                    font-weight: 700;
                    margin-bottom: 10px;
                  }
                  &:last-child{
                    text-align: center;
                    font-size: 18px;
                    color: #444952;
                  }
                }
              }
            }
          }
          .content_h{
            display: flex;
            margin: 40px 0 80px 0;
            div{
              width: 50%;
              &:first-child{
                width: 588px;
                height: 588px;
                background: url("/static/amhg/img/ag_g.png") no-repeat;
                background-size: 100% 100%;
                border-radius: 10px;
                cursor: pointer;
                &:hover{
                  box-shadow:0 0 10px #f7e7c9
                }
              }
              &:last-child{
                ul{
                  display: flex;
                  flex-wrap: wrap;
                  li{
                    height: 284px;
                    width:284px;
                    border-radius: 10px;
                    margin: 18px 15px 0 15px;
                    cursor: pointer;
                    &:first-child{
                      margin-top: 0;
                    }
                    &:nth-child(2){
                      margin-top: 0;
                      margin-left: 0;
                      margin-right: 0;
                    }
                    &:nth-child(4){
                      margin-left: 0;
                      margin-right: 0;
                    }
                    &:hover{
                      box-shadow:0 0 10px #f7e7c9
                    }
                  }
                }
              }
            }
          }
          .content_j{
            margin: 40px 0 80px 0;
            ul{
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
              li{
                width: 222px;
                height: 222px;
                border-radius: 10px;
                margin-bottom: 15px;
                cursor: pointer;
                &:hover{
                  box-shadow:0 0 10px #f7e7c9
                }
              }
            }
          }
          .content_l{
            display: flex;
            justify-content: space-around;
            margin: 40px 0 40px 0;
            cursor: pointer;
            div{
              margin-right: 12px;
              &:hover{
                box-shadow:0 0 10px #f7e7c9
              }
            }
            
          }
        }
        
      }
     .night{
        background:url(/static/amhg/img/index-main-bg-n.jpg) no-repeat center top;
        background-size:100% 100%; 
     }
    }
  }
    .vp-popout-box {
      /deep/ .ivu-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -328px;
        margin-top: -273px;
      }

      /deep/ .ivu-modal-close {
        z-index: 2;
        top: 6px;

        i {
          color: #fff;
        }
      }

      /deep/ .ivu-modal-header {
        width: 650px;
        height: 34px;
        margin-top: 5px;
        margin-left: 3px;
        padding: 0;
        border-radius: 10px;
        border: 1px solid #494437;
        background: #ff0000 url(/static/amhg/img/ui-bg_gloss-wave_45_817865_500x100.png) 50% 50% repeat-x;
        color: #ffffff;
        font-weight: bold;
        position: relative;
        top: 4px;

        .ivu-modal-header-inner {
          color: #fff;
          line-height: 34px;
          height: 34px;
          padding-left: 15px;
        }
      }

      /deep/ .ivu-modal-footer {
        border-top: 1px solid #cdd5da;

        .ivu-btn-text {
          display: none;
        }

        .ivu-btn-primary {
          background: #ff0000;
          border-color: #ff0000;
          padding: 3px 12px 3px 12px;
          border-radius: 6px;
        }
      }

      .popout-box {
        min-height: 427px;
        font-family: "Microsoft YaHei";
        font-size: 24px;
        line-height: 1.5;
        color: #383838;
      }

      // /deep/
    }
    .slideTop3{
      padding: 0 70px;
      background-color: white;
      border-radius: 20px;
      position: relative;
      bottom:-2000px;
    }


  .animationName(@name,@time){
      animation-delay:2s;
      animation: @name 0.5s @time 1;
      animation-timing-function: ease;
      animation-direction: normal;
      animation-fill-mode:forwards;
  }

  .keyFrames(@name,@value,@value1){
     @keyframes @name {
       0%{
        left:@value;opacity: 0;
       } 
       50%{
        left:@value;opacity:0;
       }
       100%{
        left:@value1;opacity:1;
       }
    }
  }
   .keyFrames2(@name,@value,@value1){
     @keyframes @name {
       0%{
        right:@value;opacity: 0;
       } 
       50%{
        right:@value;opacity:0;
       }
       100%{
        right:@value1;opacity:1;
       }
    }
  }
   .keyFrames3(@name,@value,@value1){
      @keyframes @name {
       0%{
        top:@value;opacity: 0;
       } 
       50%{
        top:@value;opacity:0;
       }
       100%{
        top:@value1;opacity:1;
       }
    }
   }
 
    .slideLeft{.animationName(slideLeft,.2s)}
    .keyFrames(slideLeft,-2000px,0);

    .slideRight1{.animationName(slideRight1,0.4s)}
    .keyFrames2(slideRight1,-2000px,0);
  
    .slideRight2{.animationName(slideRight2,1.0s)}
    .keyFrames2(slideRight2,-2000px,0);

    .slideLeft2{.animationName(slideLeft2,0.8s)}
    .keyFrames(slideLeft2,-2000px,0);
 
    .slideTop1{.animationName(slideTop1,0.6s)}
    .keyFrames3(slideTop1,2000px,0);

    .slideLeft3{.animationName(slideLeft3,1.2s)}
    .keyFrames(slideLeft3,-2000px,0);

    .slideTop2{.animationName(slideTop2,1.6s)}
    .keyFrames3(slideTop2,2000px,0);

    .slideRight3{.animationName(slideRight3,1.4s)} 
    .keyFrames2(slideRight3,-2000px,0);

    .slideTop3{.animationName(slideTop3,1.8s)} 
    .keyFrames3(slideTop3,2000px,0);


  //  @keyframes winning-list-animation {
  //   from {
  //     top: 0;
  //   }
  //   to {
  //     top: -760%;
  //   }
  // }

  // @-webkit-keyframes winning-list-animation {
  //   from {
  //     top: 0;
  //   }
  //   to {
  //     top: -760%;
  //   }
  // }
  
</style>
