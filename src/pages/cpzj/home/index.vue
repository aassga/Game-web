<template>
    <div class="main">
        <div class="content">
            <div class="notice clear-fix" @click="showTextModal()">
                <div class="notice-l">
                    <i class="fa fa-fw fa-bullhorn"></i>
                    最新通告
                </div>
                <div class="notice-content">
                    <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()" onmouseover="this.stop()"
                        style="color: #666666; font-size: 15px; line-height: 40px;overflow: hidden;height: 40px;">
                        <span v-html="lantern"></span>
                    </marquee>
                </div>
            </div>
            <div class="body">
                <!--左边-->
                <div class="left">
                    <!--左上菜单-->
                    <div class="up">
                        <ul>
                            <li @click.stop="$goPath('main',item)" v-for="(item, i) in navData1" :key="i">
                                <img class="icon" :src="item.icon" />
                                <span class="name"><a href="javascript: void(0)">{{item.name}}</a></span>
                                <span class="other"><a href="javascript: void(0)">{{item.doc}}</a></span>
                            </li>
                        </ul>
                    </div>
                    <!--左下tab-->
                    <div class="down">
                        <ol class="tab">
                            <li @click="goPath(item.path)" @mouseover="tabIndex = i" :class="{'tab-item': true, 'active': tabIndex === i}"
                                v-for="(item, i) in tabData" :key="i">
                                <span>{{item.name}}</span>
                                <ol class="list">
                                    <li @click.stop="$goPath('main',game)" class="list-item" v-for="(game, index) in item.list" :key="index">
                                        {{game.name}}
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </div>
                </div>
                <!--中间部分-->
                <div class="center">
                    <div class="up">
                        <Carousel autoplay loop style="height:220px">
                            <Carousel-item v-for="(item, i) in carouselData" :key="i" class="myItems">
                                <a :href="item.targets" target="_blank" v-if="item.targets !=='#'">
                                    <img :src="item.img" alt="" class="imgheight">
                                </a>
                                <img :src="item.img" alt="" class="imgheight" v-else>
                            </Carousel-item>
                        </Carousel>

                    </div>
                    <!--中间下面的tab-->
                    <div class="down">
                        <ol class="tab">
                            <li :class="{'tab-item': true, 'active': tabResultIndex === i}" v-for="(item, i) in tabResultData" @click="tabResultIndex = i"
                                :key="i">
                                <span class="name">{{item.name}}</span>
                                <div class="content" v-if="item.result">
                                    <p>第<span>{{item.result.lastissue}}</span>期</p>
                                    <div class="content-res clear-fix">
                                        <img class="content-icon" :src="item.icon" />
                                        <div class="content-main">
                                            <div class="result">
                                                <div class="info clear-fix" v-if="item.result.lastresultInfo">
                                                    <span class="item" v-for="(num, i) in item.result.lastresultInfo.split(',')" :key="num + i">{{num}}</span>
                                                </div>
                                                <div class="lu-zhu clear-fix" v-if="item.result.lastluzhu">
                                                    <span class="item" v-for="(info, i) in item.result.lastluzhu.split(',')" :key="info + i">
                                                        {{info}}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="action">
                                                <button class="action-button" @click="$goPath('main',item)">立即投注</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
                <div class="right">
                    <div class="up">
                        <h3 class="head">
                            中奖排行榜
                            <span class="fa fa-fw fa-trophy" style="color: red;"></span>
                        </h3>
                        <p class="title"><span>会员账号</span><span>游戏名称</span><span>中奖金额</span></p>
                        <div class="winning-box">
                          <ul class="winning-list" >
                            <li class="winning-item" v-for="(item, i) in winningInfo" :key="i">
                              <span class="order">{{item.name.padEnd(8, '*')}}</span>
                              <span class="name">{{item.uname}}</span>
                              <span class="num"><small>{{item.num}}</small>元</span>
                            </li>
                          </ul>
                        </div>
                    </div>
                    <div class="center">
                        <div class="text">
                            <p>手机APP 强势来势 隆重推出</p>
                        </div>
                        <div class="down-box">
                            <div class="down-title">彩票之家客户端</div>
                            <span class="android" @click="goDownLoad">
                                <span class="fa fa-fw fa-android"></span>
                                <span class="name">安卓版</span>
                            </span>
                            <span class="apple" @click="goDownLoad">
                                <span class="fa fa-fw fa-apple"></span>
                                <span class="name">IOS版</span>
                            </span>
                        </div>
                    </div>
                    <img class="down" src="/static/cpzj/img/mouse.png" />
                </div>
            </div>
        </div>
      
    </div>
</template>

<script>
import store from "@/vuex/store";

export default {
  data() {
    return {
      lantern: "",
      lanternWidth: "0",
      showPopout: false,
      popups: "",
      carouselData: [],
      downLoadurl: "/static/cpzj/html/download/index.html",
      navData1: [
        {
          name: "幸运赛车",
          doc: "高频彩 易中奖",
          icon: "/static/public/image/lottery/nico/png/3630.png",
          router: "#/plays/tradition/3630"
        },
        {
          name: "快乐飞艇",
          doc: "高频彩 易中奖",
          icon: "/static/public/image/lottery/nico/png/10045.png",
          router: "#/plays/tradition/10045"
        },
        {
          name: "北京赛车",
          doc: "高频彩 易中奖",
          icon: "/static/public/image/lottery/nico/png/2.png",
          router: "#/plays/tradition/2"
        },
        {
          name: "快速赛车",
          doc: "易操作,回单快",
          icon: "/static/public/image/lottery/nico/png/12.png",
          router: "#/plays/tradition/12"
        },
        {
          name: "香港六合彩",
          doc: "73%返奖率",
          icon: "/static/public/image/lottery/nico/png/1.png",
          router: "#/plays/tradition/1"
        }
      ],
      tabData: [
        {
          name: "传统彩票",
          path: "/plays/hall",
          list: [
            {
              name: "幸运飞艇",
              id:3,
              router: "#/plays/tradition/3"
            },
            {
              name: "快乐赛车",
              id:13,
              router: "#/plays/tradition/13"
            },
            {
              name: "北京赛车",id:2,
              router: "#/plays/tradition/2"
            },
            {
              name: "快速赛车",id:12,
              router: "#/plays/tradition/12"
            },
            {
              name: "快速时时彩",id:16,
              router: "#/plays/tradition/16"
            },
            {
              name: "三分时时彩",id:17,
              router: "#/plays/tradition/17"
            },
            {
              name: "欢乐生肖",id:4,
              router: "#/plays/tradition/4"
            },

            {
              name: "快速六合彩",id:18,
              router: "#/plays/tradition/18"
            },
            {
              name: "香港六合彩",id:1,
              router: "#/plays/tradition/1"
            },
            // {
            //   name: "广东快乐十分",id:5,
            //   router: "#/plays/tradition/5"
            // },
            {
              name: "香港赛马",id:10044,
              router: "#/plays/tradition/10044"
            },
            {
              name: "广东11选5",id:7,
              router: "#/plays/tradition/7"
            },
            {
              name: "江苏快三",id:9,
              router: "#/plays/tradition/9"
            }
          ]
        },
        {
          name: "真人视讯",
          path: "/home/live",
          list: [
            {
              name: "AG视讯厅",type:'live',
              platform: "live_casino",
              id: "31",
              icon: "/static/cpzj/img/live/icon/AG_LIVE.png"
            },
            {
              name: "BBIN视讯厅",type:'live',
              platform: "live_casino",
              id: "32",
              icon: "/static/cpzj/img/live/icon/BBIN_LIVE.png"
            },
            {
              name: "BG视讯厅",type:'live',
              platform: "live_casino",
              id: "3180",
              icon: "/static/cpzj/img/live/icon/BG_LIVE.png"
            },
            {
              name: "DG视讯厅",type:'live',
              platform: "live_casino",
              id: "42",
              icon: "/static/cpzj/img/live/icon/DG_LIVE.png"
            },
            {
              name: "DS视讯厅",type:'live',
              platform: "live_casino",
              id: "34",
              icon: "/static/cpzj/img/live/icon/DS_LIVE.png"
            },
            // {
            //   name: "OG视讯厅",type:'live',
            //   platform: "live_casino",
            //   id: "48",
            //   icon: "/static/cpzj/img/live/icon/OG_LIVE.png"
            // },
            {
              name: "eBET视讯厅",type:'live',
              platform: "live_casino",
              id: "43",
              icon: "/static/cpzj/img/live/icon/EBET_LIVE.png"
            }
          ]
        }
      ],
      tabIndex: 0,
      tabResultData: [
        {
          name: "北京赛车",
          icon: "/static/public/image/lottery/nico/png/2.png",
          id: 2,
          result: null,
          router: "#/plays/tradition/2",
        },
        {
          name: "快速赛车",
          icon: "/static/public/image/lottery/nico/png/12.png",
          id: 12,
          result: null,
          router: "#/plays/tradition/12",
        },
        {
          name: "欢乐生肖",
          icon: "/static/public/image/lottery/nico/png/4.png",
          id: 4,
          result: null,
          router: "#/plays/tradition/4",
        },
        {
          name: "幸运飞艇",
          icon: "/static/public/image/lottery/nico/png/3.png",
          id: 3,
          result: null,
          router: "#/plays/tradition/3",
        },
        {
          name: "香港六合彩",
          icon: "/static/public/image/lottery/nico/png/1.png",
          id: 1,
          result: null,
          router: "#/plays/tradition/1",
        }
      ],
      random: [{
          account: "",
          name: "江苏快3",
          ico: "/static/public/image/slide/slder1.jpg",
          out: 0
        },
        {
          account: "",
          name: "三分快3",
          ico: "/static/public/image/slide/slder.jpg",
          out: 0
        },
        {
          account: "",
          name: "5分六合彩",
          ico: "/static/public/image/slide/slder2.jpg",
          out: 0
        },
        {
          account: "",
          name: "快乐飞艇",
          ico: "/static/public/image/slide/slder3.jpg",
          out: 0
        },
        {
          account: "",
          name: "幸运赛车",
          ico: "/static/public/image/slide/slder4.jpg",
          out: 0
        },
        {
          account: "",
          name: "快乐赛车",
          ico: "/static/public/image/slide/slder5.jpg",
          out: 0
        },
        {
          account: "",
          name: "幸运飞艇",
          ico: "/static/public/image/slide/td1.jpg",
          out: 0
        },
        {
          account: "",
          name: "快速时时彩",
          ico: "/static/public/image/slide/slder6.jpg",
          out: 0
        },
        {
          account: "",
          name: "香港赛马",
          ico: "/static/public/image/slide/slder7.jpg",
          out: 0
        },
        {
          account: "",
          name: "三分时时彩",
          ico: "/static/public/image/slide/slder8.jpg",
          out: 0
        }
      ],
      tabResultIndex: 0,
      winningInfo: []
    };
  },
  watch: {
    tabResultIndex: "refreshResult"
  },
  methods: {
    
    refreshResult() {
      let item = this.tabResultData[this.tabResultIndex];
      if (item) {
        this.$http
          .get(`${this.$HOST_NAME}/lottery/getIssue/${item.id}`)
          .then(res => {
            item.result = {
              lastissue: res.data.lastissue,
              lastluzhu: res.data.lastluzhu,
              lastresultInfo: res.data.lastresultInfo
            };
          });
      }
    },
    goDownLoad() {
      window.open(this.downLoadurl);
    },
    fakeDatas() {
      let chars = ["-", ]
      for (var i = 0; i < 10; i++) {
        chars.push(i)
      }
      for (var i = 65; i < 91; i++) {
        chars.push(String.fromCharCode(i));
      }
      for (var i = 97; i < 123; i++) {
        chars.push(String.fromCharCode(i));
      }

      function generateMixed(n) {
        var res = "";
        for (var i = 0; i < n; i++) {
          var id = Math.ceil(Math.random() * 61);
          res += chars[id];
        }
        return res;
      }
      //50个模型demo
      let datas = [];
      for (let index = 0; index < 50; index++) {
        // debugger;
        let obj = {};
        Object.assign(obj, obj, this.random[Math.floor(Math.random() * 10)]);
        datas.push(obj);
      }
      // 求出随机数
      datas.forEach((item, v) => {
        let arr = [2, 3, 5, 4];
        item.out =
          Math.ceil(Math.random() * 10) *
          Math.pow(
            arr[Math.floor(Math.random() * arr.length)],
            arr[Math.floor(Math.random() * arr.length)]
          );
        item.account = generateMixed(3);
      });
      this.scrollDatas = datas;
    },
    initWinningInfo() {
      let length = 50;
      let arr = ['快乐赛车','北京赛车','快速时时彩','三分时时彩','快速赛车','快速六合彩','5分六合彩','江苏快3','幸运赛车','五分快3','3分快3','通比牛牛']
      let data = [];
      for (let i = 0; i < length; i++) {
        let num = parseInt(
          Math.random() * (Math.random() * (Math.random() * 360000))
        );
        num = num < 10 ? num * 234 : num;
        num = num < 100 ? num * 23 : num;
        num = num < 1000 ? num * 2 : num;
        let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
        name = name.substr(0, 3);
        let k = Math.floor(Math.random() * 12)
        data[i] = {name, 'uname':arr[k], num}
      }
      this.arraySort(data, (v1, v2) => v1.num < v2.num);
      this.winningInfo = data;
    },
    //轮播图
    async getBanner() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
        position: "banner",
        clientType: "pc"
      });
      if (res && res.code == 200) {
        this.carouselData = res.data[0] && res.data[0].body;
      }
    },
    //走马灯
    async getLantern () {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: 'lantern',
        client_type:"PC"
      })
      if (res && res.code == 200) {
        if(res.data.data.length){
          this.lantern = res.data.data[0] && res.data.data[0].description
        }else{  
          return false;
        }
      }
    },
    hotTag(item) {
      this.hotNow.img = item.img;
      this.hotNow.name = item.name;
      this.hotNow.class = item.class;
      this.hotNow.title = item.title;
      this.hotNow.text = item.text;
      this.hotNow.btn = item.btn;
    },
    // 获取公告列表接口，并缓存
    async getLanternList() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: "lantern",
        client_type: "PC",
        limit:1000,
        page:1
      });
      if (res && res.code == 200) {
          this.lanternData = res.data;
          if(res.data.total>0){
            sessionStorage.setItem('lanterndata', JSON.stringify( this.lanternData));
          }
      }else{
        return false
      }
    },
    //点击展示公告列表
    showTextModal(){
      if(this.lanternData.total>0){
        this.$store.commit('alert/showTextTip', true)
      }else{
        return false
      }  
    }
  },
  created() {
    this.$store.commit("hsyl/setNav", 0);
    setTimeout(() => {
      if(localStorage.register){
          this.$store.commit("alert/showLogin", true);
          this.$store.commit("alert/setChooseModel", "注册帐号");
          this.$store.commit("alert/setLoginTitle", "注册帐号");
          localStorage.removeItem('register')
      }
    }, 2000);
    
  },
  mounted() {
    this.getLantern();
    this.getBanner();
    this.refreshResult();
    this.initWinningInfo();
    this.getLanternList();
  },
  components: {},
  store
};
</script>

<style type="text/less" lang="less" scoped>
.clear-fix:after {
  content: "";
  display: table;
  clear: both;
  zoom: 1;
}

.img-box {
  width: 100%;
  height: 100%;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}
.imgheight {
  width: 100%;
  height: 220px;
}

.main {
  background: url(/static/cpzj/img/bg-article.png) #fff no-repeat center 96px;
  padding-bottom: 10px;

  .content {
    width: 1000px;
    margin: 0 auto;

    .notice {
      height: 40px;
      line-height: 40px;

      .notice-l {
        width: 100px;
        color: red;
        font-size: 14px;
        font-weight: 600;
        float: left;

        > i.fa {
          color: black;
          font-weight: 500;
          font-size: 20px;
        }
      }

      .notice-content {
        width: 900px;
        height: 40px;
        float: left;
      }
    }

    .body {
      &:after {
        content: "";
        display: table;
        clear: both;
        zoom: 1;
      }

      > .left,
      > .center,
      > .right {
        float: left;
      }

      .left {
        width: 250px;

        .up {
          border: 1px solid #ededed;
          background-color: #f8f8f8;

          ul {
            li {
              height: 55px;
              width: 100%;
              box-sizing: border-box;
              border-bottom: 1px dashed #d1d1d1;

              &:last-child {
                border-bottom-color: transparent;
              }

              .icon {
                width: 44px;
                height: 44px;
                margin: 5px 9px;
                display: inline-block;
                background-repeat: no-repeat;
              }

              .name,
              .other {
                display: inline-block;
                vertical-align: top;
                height: 54px;
                line-height: 54px;

                a:hover {
                  color: #f13131;
                }
              }

              .name {
                font-size: 14px;

                a {
                  color: #333333;
                }
              }

              .other {
                font-size: 12px;

                a {
                  color: #999999;
                }
              }
            }
          }
        }

        .down {
          .tab {
            position: relative;
            height: 243px;
            margin-top: 10px;
            overflow: hidden;
            font-size: 14px;
            border: 1px solid #ededed;
            background-color: #f8f8f8;

            &:after {
              content: "";
              display: table;
              clear: both;
              zoom: 1;
            }

            .tab-item {
              float: left;
              width: 50%;
              height: 40px;
              line-height: 40px;
              text-align: center;
              background-color: white;
              cursor: pointer;

              &.active {
                background-color: #f8f8f8;

                span {
                  color: #f13131;
                }

                .list {
                  display: block;
                }
              }

              .list {
                position: absolute;
                left: 0;
                top: 40px;
                width: 100%;
                display: none;
                background-color: #f8f8f8;
                font-size: 12px;
                padding: 5px;

                &:after {
                  content: "";
                  display: table;
                  clear: both;
                  zoom: 1;
                }

                .list-item {
                  float: left;
                  width: 33%;
                  box-sizing: border-box;
                  padding-left: 5px;
                  text-align: left;
                  cursor: pointer;

                  &:hover {
                    color: #f13131;
                  }
                }
              }
            }
          }
        }
      }

      .center {
        width: 516px;
        margin: 0 10px;

        .up {
          height: 220px;
        }

        .down {
          margin-top: 10px;
          height: 300px;
          border: 1px solid #ededed;
          box-sizing: border-box;

          .tab {
            position: relative;

            &:after {
              content: "";
              display: table;
              clear: both;
              zoom: 1;
            }

            .tab-item {
              float: left;
              width: 20%;
              height: 44px;
              line-height: 44px;
              text-align: center;
              color: #333333;
              cursor: pointer;
              background-color: #dbdbdb;
              box-sizing: border-box;
              border-right: 1px solid white;
              -webkit-transition: all 0.5s;
              transition: all 0.5s;

              &:last-child {
                border-right: none;
              }

              &.active,
              &:hover {
                color: white;
                background-color: #f13131;
              }

              &.active {
                .content {
                  display: block;
                }
              }

              .name {
                cursor: inherit !important;
              }

              .content {
                position: absolute;
                display: none;
                left: 0;
                top: 44px;
                height: 254px;
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
                color: #333333;

                p {
                  margin-left: 10px;
                  text-align: left;
                  color: #333333;

                  span {
                    color: #f13131;
                    padding: 0 5px;
                  }
                }
              }

              .content-res {
                .content-icon {
                  float: left;
                  width: 70px;
                  height: 70px;
                  margin: 10px;
                }

                .content-main {
                  float: left;
                  width: 404px;

                  .result {
                    width: 100%;

                    .info {
                      width: 100%;
                      display: block;

                      .item {
                        display: block;
                        float: left;
                        height: 40px;
                        line-height: 40px;
                        width: 40px;
                        border-radius: 50%;
                        color: white;
                        font-size: 20px;
                        font-weight: 700;
                        background-color: red;
                        margin: 5px;
                      }
                    }

                    .lu-zhu {
                      width: 100%;
                      display: block;

                      .item {
                        display: block;
                        float: left;
                        height: 30px;
                        line-height: 30px;
                        border-radius: 4px;
                        min-width: 30px;
                        padding: 0 6px;
                        border: 1px solid #555;
                        color: #555;
                        font-size: 16px;
                        font-weight: 500;
                        background-color: white;
                        margin: 5px;
                      }
                    }
                  }

                  .action {
                    width: 100%;
                    text-align: right;

                    &-button {
                      color: white;
                      background-color: #f13131;
                      line-height: 20px;
                      padding: 8px;
                      border: none;
                      cursor: pointer;
                      &:hover {
                        background-color: #d00000;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .right {
        width: 214px;

        .up {
          border: 1px solid #ededed;

          .head {
            text-align: center;
            line-height: 38px;
            background-color: #f8f8f8;
            border-bottom: 1px solid #ededed;
          }
            p.title{
              height: 25px;
              display: flex;
              padding: 0 10px;
              justify-content: space-between;
              align-items: center;
              border-bottom:1px solid #F1F1F1;
              span{
                display: inline-block;
                width: 30%;
                height: 25px;
                line-height: 25px;
                font-size: 14px;
                color: #666666;
              }
            }
            .winning-box {
              position: relative;
              height: 254px;
              overflow: hidden;
              font-size: 14px;
              line-height: 28px;

              .winning-list {
                position: absolute;
                width: 100%;
                bottom: -500%;
                left: 0;
                -webkit-animation: winning-list-animation 30s linear infinite;
                animation: winning-list-animation 30s linear infinite;

                .winning-item {
                  width: 100%;
                  padding: 0 5px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;

                  &:after {
                    content: '';
                    display: table;
                    clear: both;
                    zoom: 1;
                  }

                  span{
                    display: inline-block;
                    text-align: center;
                    font-size: 14px;
                  }
                  .order {
                    width: 30%;
                    color: #999999;
                  }

                  .name {
                    width: 36%;
                    color: #F46C0C;
                  }

                  .num {
                    width: 34%;
                    color: #696969;
                    small{
                      font-size: 14px;
                      color: #F13131;
                    }
                  }
                }
              }
            }
        }

        .center {
          border: 1px solid #ededed;
          margin-top: 10px;
          margin-left: 0;
          height: 100px;
          width: 100%;
          position: relative;
          font-size: 14px;

          &:after {
            content: "";
            display: table;
            clear: both;
            zoom: 1;
          }

          .text {
            float: left;
            height: 100px;
            width: 100px;
            box-sizing: border-box;
            padding: 20px;
            line-height: 20px;
          }

          .down-box {
            float: left;
            width: 112px;

            &:after {
              content: "";
              display: table;
              clear: both;
              zoom: 1;
            }

            .down-title {
              padding: 10px 0;
              width: 100%;
              float: left;
            }

            .android {
              cursor: pointer;
              width: 46px;
              float: left;
              font-size: 12px;

              .fa {
                width: 44px;
                height: 44px;
                font-size: 30px;
                line-height: 44px;
                color: white;
                background-color: #4dcb6a;
              }
            }

            .apple {
              cursor: pointer;
              padding-left: 10px;
              width: 46px;
              float: left;
              font-size: 12px;

              .fa {
                width: 44px;
                height: 44px;
                font-size: 30px;
                line-height: 44px;
                color: white;
                background-color: #999999;
              }
            }

            .name {
              display: block;
              width: 44px;
              height: 20px;
              line-height: 20px;
              text-align: center;
            }
          }
        }

        .down {
          margin-top: 10px;
          width: 100%;
          height: 88px;
        }
      }
    }
  }
}

@keyframes winning-list-animation {
  from {
    bottom: -500%;
  }
  to {
    bottom: 100%;
  }
}

@-webkit-keyframes winning-list-animation {
  from {
    bottom: -500%;
  }
  to {
    bottom: 100%;
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
    background-color: #ff0000;
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
</style>
