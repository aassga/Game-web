<template>
  <div class="nav">
    <ul class="nav-main clear-fix">
      <li v-for="(item,i) in navlist1" @click="$store.state.hsyl.navActive = i" :class="{'nav-active': navActive === i}" :key="i">
        <em v-if="item.hot" class="hot"></em>
        <p @click="$goPath('one',item)">{{item.name}}</p>
        <ol class="nav-children clear-fix"  v-if="item.sub" :class="{navsport:item.link=='/home/tiyu'}">
          <li v-for="(child, index) in item.sub" :key="index" @click.stop="goGame(child,item.en)">
            <div>
              <img v-if="child.icon" :src="child.icon"/>
            </div> 
            <p>{{child.name}}</p>
            <img v-if="child.hot" class="hot" src="/static/cpzj/img/hot.gif">
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
  import store from '@/vuex/store'
  import wm from '../../../../static/500wcp/img/live/log_wm.png'
  import ag from '../../../../static/500wcp/img/live/log_ag.png'
  import bb from '../../../../static/500wcp/img/live/log_bbin.png'
  import bg from '../../../../static/500wcp/img/live/log_bg.png'
  import dg from '../../../../static/500wcp/img/live/log_dg.png'
  import ds from '../../../../static/500wcp/img/live/log_ds.png'
  import ebet from '../../../../static/500wcp/img/live/log_ebet.png'
  import eov from '../../../../static/500wcp/img/live/log_eov.png'
  import mg from '../../../../static/500wcp/img/live/log_mg.png'
  import og from '../../../../static/500wcp/img/live/log_og.png'
  import pt from '../../../../static/500wcp/img/live/log_pt.png'
  import vr from '../../../../static/500wcp/img/live/log_vr.png'
  export default {
    data () {
      return {
        navActive: 0,
        navlist1: [
          {name: '首页', link: '/home', en: 'HOME'},
          {
            name: '购彩大厅', link: '/plays/hall', en: 'LOTTERY', hot: true,type:'lottery' ,
            sub: [
              {
                name: '快速赛车',
                icon: '/static/public/image/lottery/nico/png/12.png',
                path: '/plays/tradition/12',
                hot: true
              },
              {
                name: '快乐赛车',
                icon: '/static/public/image/lottery/nico/png/13.png',
                path: '/plays/tradition/13',
                hot: true
              },
              {
                name: '北京赛车',
                icon: '/static/public/image/lottery/nico/png/2.png',
                path: '/plays/tradition/2'
              },
              {
                name: '快速时时彩',
                icon: '/static/public/image/lottery/nico/png/16.png',
                path: '/plays/tradition/16',
                hot: true
              },
              {
                name: '三分时时彩',
                icon: '/static/public/image/lottery/nico/png/17.png',
                path: '/plays/tradition/17',
                hot: true
              },
              {
                name: '欢乐生肖',
                icon: '/static/public/image/lottery/nico/png/4.png',
                path: '/plays/tradition/4'
              },
              {
                name: '幸运赛车',
                icon: '/static/public/image/lottery/nico/png/3630.png',
                path: '/plays/tradition/3630',
                hot: true
              },
              {
                name: '快速六合彩',
                icon: '/static/public/image/lottery/nico/png/18.png',
                path: '/plays/tradition/18'
              },
              {
                name: '香港六合彩',
                icon: '/static/public/image/lottery/nico/png/1.png',
                path: '/plays/tradition/1',
                hot: true
              },
              // {
              //   name: '广东快乐十分',
              //   icon: '/static/public/image/lottery/nico/png/5.png',
              //   path: '/plays/tradition/5'
              // },
              {
                name: '香港赛马',
                icon: '/static/public/image/lottery/nico/png/10044.png',
                path: '/plays/tradition/10044',
                hot: true
              },
              {
                name: '广东11选5',
                icon: '/static/public/image/lottery/nico/png/7.png',
                path: '/plays/tradition/7'
              },
              {
                name: '5分六合彩',
                icon: '/static/public/image/lottery/nico/png/19.png',
                path: '/plays/tradition/19',
                hot: true
              },
              {
                name: '三分快三',
                icon: '/static/public/image/lottery/nico/png/3631.png',
                path: '/plays/tradition/3631'
              },
              {
                name: '江苏快三',
                icon: '/static/public/image/lottery/nico/png/9.png',
                path: '/plays/tradition/9'
              }
            ]
          },
          {
            name: '真人视讯', link: '/home/live', hot: true, en: 'CASINO', sub: []
          },
          {name: '棋牌游戏', link: '/home/chess?navid=9&id=0', hot: true, en: 'CHESS'},
          {
            name: '体育赛事', link: '/home/tiyu', hot: true, en: 'SPORT',
          },
          {name: '电子游艺', link: '/home/slot?navid=9&id=0', hot: true, en: 'GAME'},
          {name: '捕鱼达人', link: '/home/fish?navid=9&id=0', en: 'FISHING'},
          {name: '优惠活动', link: '/home/youhui', en: 'ACTIVITY'},
          {name: '代理加盟', link: '/home/agent', hot: true , en: 'AGENT'}
        ],
      }
    },
    methods: {
      goHome () {
        this.$router.push('/home')
      },
      async getGameDatas() {
        await this.$gameSortV4();
      },
      goGame(a,b){
        if(b == 'LOTTERY'){
          if(localStorage.token){
            this.$store.dispatch('lottery/getStopLotteryCheck',a.lid).then(res=>{
                if(res&&res.length >0 ){
                    this.$store.commit('alert/showTipModel', {
                      bool: true,
                      title: res.replace(/，/g,'</br>'),
                      model: 'warn',
                      type:'closeMaret',
                    });
                }else{
                  window.open(this.$router.resolve(a.path).href)
                  return false
                }
            })
          }else{
            this.dNotify("请先登录", 'error')
          }
        }else{
          this.$loginGame(a)
        }
      }
    },
    computed: {
    },
    mounted(){
      this.getGameDatas();
      let allGame = this.$getObjByLocalStorage(`gameSortV4_live`).games;
      this.navlist1[2].sub = allGame;
      this.navlist1[2].sub.forEach(arr => {
        switch (arr.id) {
          case 31:
              arr.icon = ag;
              break;
            case 32:
              arr.icon = bb;
              break;
            case 3180:
              arr.icon = bg;
              break;
            case 42:
              arr.icon = dg;
              break;
            case 34:
              arr.icon = ds;
              break;
            case 48:
              arr.icon = og;
              break;
            case 43:
              arr.icon = ebet;
              break;
            case 30:
              arr.icon = vr;
              break;
            case 12033:
              arr.icon = mg;
              break;  
            case 11543:
              arr.icon = pt;
              break;  
            case 11758:
              arr.icon = eov;
              break;
            case 12035:
              arr.icon = wm;
              break;
        }
      
      });
    },
    watch: {
    "$route.path": function(newVal, oldVal) {
      switch (true) {
        case newVal == "/home":
          this.navActive = 0;
          break;
        case newVal == "/home/live":
          this.navActive = 2;
          break;
        case newVal == "/home/chess":
          this.navActive = 3;
          break;
        case newVal == "/home/tiyu":
          this.navActive = 4;
          break;
        case newVal.includes("/home/slot"):
          this.navActive = 5;
          break;
        case newVal == "/home/fish":
          this.navActive = 6;
          break;
        case newVal == "/home/youhui":
          this.navActive = 7;
          break;
        case newVal == "/home/agent":
          this.navActive = 8;
          break;  
      }
    }
  },
    store
  }
</script>

<style type="text/less" lang="less" scoped>
  .clear-fix {
    content: '';
    display: table;
    clear: both;
    zoom: 1;
  }

  .nav {
    background-color: #f13131;
    height: 46px;

    .nav-main {
      width: 1000px;
      margin: 0 auto;

      > li {
        width: 110px;
        height: 46px;
        float: left;
        color: white;
        position: relative;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;

        > p {
          text-align: center;
          line-height: 46px;
          cursor: pointer;
        }

        .hot {
          position: absolute;
          right: 0;
          top: 0;
          width: 20px;
          height: 14px;
          background: url("/static/cpzj/img/hot_new.gif") no-repeat;
        }

        &:hover {
          .nav-children {
            display: block;
          }
        }

        .nav-children {
          display: none;
          position: absolute;
          top: 52px;
          left: -110px;
          z-index: 1000;
          padding: 30px;
          width: 460px;
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.8);
          box-shadow: 0 -2px 20px 0 #3c3c3c;

          > li {
            margin: 5px;
            width: 90px;
            float: left;
            border-radius: 4px;
            position: relative;
            cursor: pointer;

            > div {
              width: 80px;
              height: 80px;
              margin: 0 auto;
              background-image: url("/static/cpzj/img/game-icon-bg.png");
              background-size: 100% 100%;

              > img {
                width: 60px;
                margin: 10px;
                border-radius:50%;
              }
            }

            > p {
              padding: 5px;
              font-size: 12px;
              text-align: center;
            }

            > .hot {
              position: absolute;
              top: 0;
              right: 0;
            }

            &:hover {
              background-color: rgba(255, 255, 255, 0.5);
            }
          }

          &:after {
            content: '';
            display: block;
            top: -20px;
            left: 155px;
            width: 0;
            height: 0;
            position: absolute;
            border: 10px solid transparent;
            border-bottom: 10px solid rgba(0, 0, 0, 0.8);
          }

          &:before {
            content: '';
            display: block;
            top: -6px;
            left: 110px;
            width: 110px;
            height: 6px;
            border-radius: 4px;
            position: absolute;
          }
        }
        .navsport{
           width: 360px;
           left: -54px;
        }
      }
      li:nth-child(5){
         .nav-children:after{
             left: 100px;
         }
      }
      .nav-active, li:hover {
        background-color: #bd2626;
      }
    }
  }
</style>
