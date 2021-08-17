<template>
    <div class="hty-new-index">
        <div class="banner-wrap">
            <div class="carouse">
                <Carousel v-model="curIndex" :autoplay="setting.autoplay" :loop="setting.loop" :autoplay-speed="setting.autoplaySpeed"
                    :radius-dot="setting.radiusDot" :arrow="setting.arrow" :trigger="setting.trigger"
                    :style="{height:carheight +'px',overflow:'hidden'}">
                    <CarouselItem v-for="(item, i) in carouselData" :key="i" class="myItems">
                        <a v-if="item.targets !=='#'">
                            <div
                                :style="{background: 'url(' + item.img + ') no-repeat center top',backgroundSize:'cover',height: carheight +'px'}">
                            </div>
                        </a>
                        <div :style="{background: 'url(' + item.img + ') no-repeat center top',backgroundSize:'cover',height: carheight +'px'}"
                            v-else></div>
                    </CarouselItem>
                </Carousel>
            </div>
        </div>
        <div class="notice index-notice" :style="{top: 424 +'px'}">
            <div class="w1000" @click="showTextModal()">
                <span>最新公告</span>
                <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()"
                    onmouseover="this.stop()">
                    <a href="javascript:;" v-html="lantern"></a>
                </marquee>
                
            </div>
        </div>
        <div class="wp">
            <div class="gameContainer wow fadeInUp" data-wow-delay="0">
              <ul>
                <li v-for="(item,i) in topList" :key="i" @click="goLink(item)">
                  <div class="bg"></div>
                  <div class="nr">
                    <div class="icon"><img :src="item.picImg" alt="icon"></div>
                    <div class="text"><h2>{{item.name}}</h2><p>{{item.text}}</p></div>
                  </div>
                  <div class="pic"></div>
                </li>
              </ul>
            </div>
            <div class="bg1">
              <div class="gameContainer1 wow fadeInUp" data-wow-delay="0">
                <div class="title1">
                  <h2>火爆游戏推荐</h2>
                  <p>Hot game recommendations</p>
                </div>
                <ul class="wow fadeInUp" data-wow-delay="0">
                  <li v-for="(item,i) in hotGamgeList" :key="i" @click="loginGame(item)">
                    <div class="text">
                      <h2>{{item.name}}</h2><p>{{item.text}}</p>
                    </div>
                    <div class="icon">
                      <img :src="item.img" alt="icon" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
        </div>
        <div class="cont">
            <div class="inner">
                <div class="game top">
                    <!-- 棋牌 -->
                    <div class="ga chess">
                        <div class="hoverShow">
                            <div @click="$router.push('/home/slot?navid=9&id=10022')">进入游戏</div>
                        </div>
                    </div>
                    <!-- 真人 -->
                    <div class="ga casino">
                        <div class="super_award">
                            <i class="txt_icon"></i>
                            <ul class="award_num">
                                <li :key="i" v-for="(item,i) in superAward">{{item}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="ga lastPic">
                        <div class="hoverShow">
                            <div @click="$router.push('/home/slot?navid=9&id=10024')">进入游戏</div>
                        </div>
                    </div>
                </div>
                <div class="game bottom">
                    <div class="ga lottery">
                        <div class="hoverShow">
                            <div @click="$router.push('/home/slot?navid=9&id=10016')">进入游戏</div>
                        </div>
                    </div>
                    <div class="ga fishing">
                        <div class="hoverShow">
                            <div @click="$router.push('/home/slot?navid=9&id=0')">进入游戏</div>
                        </div>
                    </div>
                    <div class="ga sport">
                        <div class="hoverShow">
                            <div @click="$router.push('/home/slot?navid=9&id=0')">进入游戏</div>
                        </div>
                    </div>
                    <div class="ga lastPic1">
                        <a href="javascript:void(0)" @click="goView('/home/slot?navid=9&id=0')" class="enterzh"><i /></a>
                        <div class="gogamae">进入游戏</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="loadCont">
            <ul>
                <li @click="$router.push('/home/live')">
                    <div>
                        <span>百家乐</span>
                        <span>三公</span>
                        <span>德州扑克</span>
                    </div>
                </li>
                <li>
                    <span @click="$router.push('/home/tiyu?id=0')"></span>
                    <span @click="goHall"></span>
                </li>
                <li @click="godown"></li>
            </ul>
        </div>
        <!-- <div class="helpArr">
            <div></div>
            <div></div>
        </div> -->
        <div class="foot-lx">
            <div class="foot-lx-width">
                <a class="foot-lx-convction" href="tencent://message/?Menu=yes&uin=199899099"></a>
                <a class="foot-lx-convction" href="tencent://message/?Menu=yes&uin=199899099"></a>
                <a class="foot-lx-convction-lxyx"></a>
                <a class="foot-lx-convction-zxkf" @click="$openKefu"></a>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import store from '@/vuex/store';
// import data from '../../public/games/public.js';

export default {
    // mixins: [data],
    data() {
        return {
            superAward: '24687936.18',
            carheight: 460,
            clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            showimg: false,
            popups: '',
            lantern: '',
            curIndex: 0,
            setting: {
                autoplay: true,
                loop: true,
                autoplaySpeed: 3000,
                radiusDot: true,
                arrow: 'never',
                trigger: 'click'
            },
            publicUrl: 'http://static.1356111.com/',
            showPopout: false,
            noticePosition: 0,
            gameList: [
                { name: '真人娱乐', className: 'live', path: '/home/live' },
                { name: '彩票游戏', className: 'lottery', path: '/plays/hall' },
                {
                    name: '电子游艺',
                    className: 'slot',
                    path: '/home/games?id=26&name=MG老虎机'
                },
                { name: '体育赛事', className: 'sport', path: '/home/tiyu' }
            ],
            idlist: [],
            topList: [
                {
                name: "免费注册",
                text: "REGISTRATION",
                picImg: "/static/hty/img/pic1.png",
                link: "/home/register2"
                },
                {
                name: "快速充值",
                text: "FAST RECHARGE",
                picImg: "/static/hty/img/pic2.png",
                },
                {
                name: "优惠大厅",
                text: "PROMOTION HALL",
                picImg: "/static/hty/img/pic3.png",
                link: "/home/youhui"
                },
                {
                name: "APP下载",
                text: "APP DOWNLOAD",
                picImg: "/static/hty/img/pic4.png",
                dowblink: "/static/hty/html/download/index.html"
                }
            ],
            hotGamgeList: [
                {
                name: "抢庄牛牛",
                text: "KY",
                img: "/static/hty/img/245.png",
                link: "",
                id:245
                },
                {
                name: "彩票游戏",
                text: "LOTTERY",
                img: "/static/hty/img/lottery.png",
                link: "",
                id:10688,
                type:"lot"
                },
                {
                name: "森林舞会",
                text: "KY",
                img: "/static/hty/img/3604.png",
                link: "",
                id:3604
                },
                {
                name: "百家乐",
                text: "KY",
                img: "/static/hty/img/3603.png",
                link: "",
                id:3603
                },
                {
                name: "21点",
                text: "KY",
                img: "/static/hty/img/251.png",
                link: "",
                id:251
                },
                {
                name: "押庄龙虎",
                text: "KY",
                img: "/static/hty/img/250.png",
                link: "",
                id:250
                },
                {
                name: "奔驰宝马",
                text: "KY",
                img: "/static/hty/img/10692.png",
                link: "",
                id:10692
                },
                {
                name: "二八杠",
                text: "KY",
                img: "/static/hty/img/248.png",
                link: "",
                id:248
                },
                {
                name: "二人麻将",
                text: "LY",
                img: "/static/hty/img/10629.png",
                link: "",
                id:10629
                },
                {
                name: "炸金花",
                text: "LY",
                img: "/static/hty/img/10617.png",
                link: "",
                id:10617
                },
                {
                name: "癞子牛牛",
                text: "LY",
                img: "/static/hty/img/11179.png",
                link: "",
                id:11179
                },
                {
                name: "百人牛牛",
                text: "KY",
                img: "/static/hty/img/3605.png",
                link: "",
                id:3605
                }
            ],
            currenttype: '',
            iptVal: '',
            currentline: '',
            currentTag: '',
            pageDatas: {
                page: 1
            },
            gameId: 26,
            gameData: [],
            gameDataLeft: [],
            gameDataRight: [],
            winningInfo: [],
            // 轮播名单
            carouselData: [],
            superAward: '24687936.18',
            setInter: null,
            lanternData: "",
        };
    },
    methods: {
        godown(){
            window.open('/static/hty/html/download/index.html')
        },
        loginGame(item){
            if(item.type)  window.open("#/plays/hall");
            else this.$loginGame(item)
        },
        goHall(){
            window.open('#/plays/hall')
        },
        goLink(item){
            if(item.link){this.$router.push(item.link);} 
            else if(item.dowblink){window.open(item.dowblink);} 
            else{
                if(localStorage.token) {this.$goUserCen('recharge',0)}
                else{ this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '请先登录',
                    model: '',
                })} 
            } 
        },
        jackpotFc() {
            var _this = this;
            clearInterval(this.setInter);

            this.setInter = setInterval(function() {
                if (typeof _this.superAward == 'number') {
                    _this.superAward = _this.superAward.toString();
                } else if (_this.superAward instanceof Array) {
                    _this.superAward = _this.superAward.join(''); //数组->字符串
                }

                var num, index;
                num = parseFloat(parseFloat(_this.superAward.substr(0, 5), 2) + 1); //截取前5位
                index = num.toString().indexOf('.');
                num =
                    num.toString() +
                    parseInt(Math.random() * 9) +
                    parseInt(Math.random() * 9) +
                    parseInt(Math.random() * 9) +
                    '.' +
                    parseInt(Math.random() * 9) +
                    parseInt(Math.random() * 9);
                _this.superAward = num.split(''); //字符串->数组
            }, 1000);
        },
        goService() {
            let service = JSON.parse(localStorage.config).service;
            if (service) {
              let ser = service.find(item => item.status === 'on')
              if (ser) {
                window.open(ser.url);
              }
            }
        },
        goLive(item) {
            if (item) {
                if (!localStorage.token || !localStorage.userinfo) {
                    this.$router.push('/home/live');
                } else {
                    this.getItemId(item);
                }
            }
        },
         // 点击导航栏
        changeGame(item) {
            //左右布局,右边是超级赢家榜
            if (item) {
                this.gameId = item.id;

                var len = this.rollList;
                len.forEach((ele)=>{
                     if(ele.id==item.id){
                           this.gameData = ele.list
                     }
                })
                 this.gameData.forEach(item=>{
                        item.popular = Math.floor(Math.random() * 1000000);
                  })
                setTimeout(()=>{
                })
                this.clear()
            }
        },

        //获取banner
        async getBanner() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
                position: 'banner',
                clientType: 'pc'
            });
            if (res && res.code == 200) {
                this.carouselData = res.data[0] && res.data[0].body; // img 图片
            }
        },

        close() {
            this.showimg = false;
        },


        goView(item) {
            if (item == '/plays/hall') {
                var i = window.location.href.indexOf('#');
                var href = window.location.href.slice(0, i + 1);
                window.open(href + item);
            } else {
                this.$router.push(item);
            }
        },


        // 新文字走马灯接口
        async getLantern() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
                type: 'lantern',
                client_type: 'PC'
            });
            if (res && res.code == 200) {
                if (res.data.data.length) {
                    this.lantern = res.data.data[0] && res.data.data[0].description;
                } else {
                    return false;
                }
            }
            // 参数： type: lantern 走马灯
            // 参数： type: popups 弹窗
            // 参数： type: notice 提示
        },

        kefu() {
            let service = JSON.parse(localStorage.config).service;
            if (service) {
                let ser = service.find(item => item.status === 'on');
                if (ser) {
                    window.open(ser.url);
                }
            }
        },
        //导航动画
        async slider() {
            let ul = document.getElementById('game-list');
            let prev = document.getElementsByClassName('prev')[0];
            let next = document.getElementsByClassName('next')[0];
            let main = document.getElementsByClassName('game_nav')[0];
            let n = -104;

            function left() {
                let oLi = ul.children[0];
                ul.className = 'move';
                setTimeout(function() {
                    ul.removeChild(oLi);
                    ul.appendChild(oLi);
                    ul.className = '';
                }, 500);
            }

            function right() {
                let last = ul.lastElementChild;
                ul.removeChild(last);
                ul.insertBefore(last, ul.childNodes[0]);
                ul.style.left = n + 'px';
                ul.className = 'back';
                setTimeout(function() {
                    ul.className = '';
                    ul.style.left = '';
                }, 500);
            }
            prev.onclick = right;
            next.onclick = left;
            let timer = null;
            timer = setInterval(left, 1000 * 4);
            main.onmouseover = function() {
                clearInterval(timer);
            };
            main.onmouseout = function() {
                timer = setInterval(left, 1000 * 4);
            };
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
        // this.changeGame(this.rollList[0]);
        // this.getnewDatas();
        // this.getqipai(); //获取棋牌游戏的数据
        // this.getPopout();
        this.getLanternList();
        setTimeout(() => {
            this.showimg = false;
        }, 7000);
        // this.$nextTick(() => {
        //     this.slider();
        // });
        setTimeout(() => {
            if(localStorage.register){
                this.$store.commit('alert/showMgmRegister', true);
                localStorage.removeItem('register')
            }
        }, 2000);
        
        if (this.clientwidth > 1920) {
            this.carheight = 460 * (this.clientwidth / 1920) * 0.9;
        }
    },
    mounted() {
        if(this.$route.query.main){
            this.$store.commit('alert/showMgmRegister', true);
        }
        if (localStorage.config) {
            let config = JSON.parse(localStorage.config);
            this.publicUrl = config.statics;
        }
        this.jackpotFc();
        this.getLantern();
        setTimeout(() => {
            if (!!this.$root && !!this.$root.config && !!this.$root.config.service) {
                this.serviceUrl = this.$root.config.service[0] && this.$root.config.service[0].url;
            }
        }, 200);
        this.getBanner();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    watch:{
        $route(){
            if(this.$route.query.main){
                this.$store.commit('alert/showMgmRegister', true);
            }
        }
    },
    components: {},
    store
};
</script>

<style lang="less" scoped>
/deep/ .ivu-carousel-dots {
    z-index: 1000;
}
.alert-img {
    /deep/ .ivu-modal-content {
        background-color: transparent;
    }
    /deep/ .ivu-modal-footer {
        display: none;
    }
    /deep/ .ivu-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -325px;
        margin-top: -275px;
    }
    /deep/ .ivu-modal-body {
        padding: 0;
        height: 550px;
    }
}
.youhuiActive {
    top: 100px !important;
}
.guanbi img {
    position: relative;
}
.guanbi .ivu-modal-content .ivu-modal-footer {
    display: none !important;
}
.guanbi .ivu-modal-body {
    padding: 0 !important;
    height: 550px;
}
.guanbi .ivu-modal-close {
    display: none;
}
.guanbi .ivu-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -328px;
    margin-top: -273px;
}
.guanbi .close {
    position: absolute;
    display: block;
    width: 70px;
    height: 70px;
    right: 0;
    top: 0;
    cursor: pointer;
}
body {
    background: #272727;
}
.hty-new-index {

    position: relative;
    min-width: 1200px;
    margin: 0 auto;
    background: #080808;
    font-size: 16px;
    .banner-wrap{
        background: #1b1a1a;
    }
    .notice {
        position: absolute;
        height: 36px;
        line-height: 36px;
        width: 100%;
        margin-top: 0;
        background-color: rgba(0, 0, 0, 0.6);
        // background: url(/static/hty/img/noticebg.png) repeat-x;
    }
    .index-notice {
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .notice span {
        font-size: 12px;
        background: url(/static/hty/img/notice.png) left center no-repeat;
        padding-left: 30px;
        width: 90px;
        float: left;
        display: block;
        height: 36px;
        line-height: 37px;
        color: #e0bf55;
    }
    .notice span i {
        font-style: normal;
    }
    .notice marquee {
        float: right;
        width: 1090px;
        margin-right: 10px;
        color: #fff;
        height: 36px;
        line-height: 36px;
    }
    .wp {
        width: 100%;
        margin: 0 auto;
        padding-top: 35px;
        >div{
          width: 1200px;
          margin:0 auto;
        }
        .gameContainer {
          ul {
            display: flex;
            justify-content: space-between;
            li {
              width: 290px;
              height: 80px;
              border-radius: 0 40px 40px 0;
              position: relative;
              overflow: hidden;
              margin-right: 13px;
              background: #2D2D2D;
              border: 1px solid #FFD053;
              cursor: pointer;
              .bg {
                width: 10px;
                height: 100%;
                float: left;
                -webkit-transition: 0.5s;
                -o-transition: 0.5s;
                transition: 0.5s;
              }
              &:first-child .bg {
                background: #664535;
              }
              &:nth-child(2) .bg {
                background: #3ea8ff;
              }
              &:nth-child(3) .bg {
                background: #fedb41;
              }
              &:nth-child(4) .bg {
                background: #ff523e;
              }
              .nr {
                position: absolute;
                top: 50%;
                -webkit-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);
                width: 100%;
                .icon {
                  margin-left: 35px;
                  float: left;
                  width: 52px;
                  height: 52px;
                  border-radius: 50%;
                  img {
                    display: block;
                    width: 100%;
                    height: 100%;
                  }
                }
                .text {
                  float: left;
                  padding-left: 15px;
                  h2 {
                    line-height: 38px;
                    font-size: 22px;
                    color: #FFD053;
                    -webkit-transition: 0.5s;
                    -o-transition: 0.5s;
                    transition: 0.5s;
                  }
                  p {
                    color: #d2d1d1;
                    font-size: 12px;
                    -webkit-transition: 0.5s;
                    -o-transition: 0.5s;
                    transition: 0.5s;
                  }
                }
              }
              .pic {
                position: absolute;
                right: 10px;
                top: 50%;
                -webkit-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);
                background: url("/static/hty/img/pic5.png");
                width: 64px;
                height: 64px;
                -webkit-transition: 0.8s;
                -o-transition: 0.8s;
                transition: 0.8s;
              }
              &:hover .nr .text h2 {
                color: #fff;
              }
              &:hover .nr .text p {
                color: #fff;
              }
              &:hover .pic {
                -webkit-transform: translateY(-50%) rotate(360deg);
                -ms-transform: translateY(-50%) rotate(360deg);
                transform: translateY(-50%) rotate(360deg);
                background: url("/static/hty/img/pic6.png");
              }
              &:hover .bg {
                width: 100%;
              }
            }
          }
        }
        .bg1{
          width: 1920px;
          max-width: 1920px;
          background: url('/static/hty/img/bg_2.png')no-repeat;
          background-size: auto;
          background-position-y: -152px;
          margin:0 auto;
        }
        .gameContainer1 {
          width: 1200px;
          margin: 0 auto;
          .title1 {
            padding: 35px 0;
            h2 {
              text-align: center;
              font-size: 34px;
              color: #FFD053;
              line-height: 34px;
              padding-bottom: 10px;
            }
            p {
              text-align: center;
              color: #707574;
              font-size: 10px;
              line-height: 12px;
              // background: url("/static/hty/img/bg6.png") 50% no-repeat;
            }
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 0;
            li {
              display: flex;
              -ms-flex-pack: justify;
              justify-content: space-between;
              width: 286px;
              height: 125px;
              border-radius: 15px;
              margin: 0 13px 20px 0;
              background: #2D2D2D;
              border: 1px solid #FFD053;
              -webkit-transition: 0.5s;
              -o-transition: 0.5s;
              transition: 0.5s;
              cursor: pointer;
              .text {
                display: flex;
                -ms-flex-direction: column;
                flex-direction: column;
                -ms-flex-align: center;
                align-items: center;
                padding-left: 30px;
                padding-top: 30px;
                h2 {
                  line-height: 40px;
                  font-size: 21px;
                  color: #fff;
                }
                p {
                  font-size: 12px;
                  color: #898989;
                }
              }
              .icon {
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                width: 110px;
                height: 110px;
                padding: 7px 10px 0 0;
                img {
                  width: 100%;
                  max-height: 100%;
                }
              }
              &:hover {
                -webkit-transform: scale(1.05);
                -ms-transform: scale(1.05);
                transform: scale(1.05);
              }
            }
          }
        }
        .bg2{
          width: 100%;
          background: url('/static/hty/img/bg_3.png')no-repeat;
          background-size: auto;
        }
        .gameContainer2 {
          width: 1200px;
          margin: 0 auto;
          .title {
            padding: 35px 0;
            h2 {
              text-align: center;
              font-size: 34px;
              color: #FFD053;
              line-height: 34px;
              padding-bottom: 10px;
            }
            p {
              text-align: center;
              color: #707574;
              font-size: 10px;
              line-height: 12px;
              // background: url(/static/hty/img/bg6.png) 50% no-repeat;
            }
          }
          .index_layer3{
            display: flex;
            justify-content: space-between;
            .layer3_box{
              width: 590px;
              border-radius: 24px;
              .icon{
                width: 100%;
                height: 200px;
                position: relative;
                .bg{
                  width: 100%;
                  height: 100%;
                }
                .pic{
                  position: absolute;
                  bottom: 0;
                  right: 44px;
                  -webkit-transition: .5s;
                  -o-transition: .5s;
                  transition: .5s;
                  
                }
              }
              &:hover .icon .pic {
                  -webkit-animation: ab infinite linear 1.5s;
                  animation: ab infinite linear 1.5s;
              }
              .text {
                width: 100%;
                height: 215px;
                background: #2C2C2C;
                border-radius: 0 0 25px 25px;
                position: relative;
                z-index: 1;
                .text_box {
                  width: 560px;
                  margin: 0 auto;
                  .text_Top {
                    width: 100%;
                    padding: 20px 0;
                    border-bottom: 1px solid #414141;
                    overflow: hidden;
                    p{
                      float: left;
                      line-height: 25px;
                      color: #fff;
                      width: 385px;
                      font-size:12px;
                    }
                    a{
                      width: 155px;
                      height: 56px;
                      border-color: #664535;
                      float: right;
                      &.playBtn {
                        display: -ms-flexbox;
                        display: flex;
                        -ms-flex-align: center;
                        align-items: center;
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        border-radius: 28px;
                        border-width: 3px;
                        border-style: solid;
                        font-size: 20px;
                        color:#FFD053;
                        background: url(/static/hty/img/play.png) 100px no-repeat;
                        text-indent: 40px;
                        font-weight: 700;
                        border: 1px solid #FFD053;
                      }
                    }
                  }
                  
                  .text_Bottom {
                    width: 100%;
                    ul {
                      display: flex;
                      justify-content:space-between;
                      li {
                        display: -ms-flexbox;
                        display: flex;
                        -ms-flex-pack: center;
                        justify-content: center;
                        -ms-flex-direction: column;
                        flex-direction: column;
                        height: 100px;
                        cursor: pointer;
                        a{
                          color: #5c5c5c;
                          text-decoration: none;
                        }
                        &:hover{
                          .bt{
                            color:  #FFD053;
                          }
                          
                        }
                        img{
                          width: 45px;
                          height: 45px;
                          margin: 12px 0;
                          // -webkit-filter: grayscale(100%);
                          // filter: grayscale(100%);
                          // opacity: .4;
                        }
                        .bt {
                          font-size:12px;
                          color: #fff;
                          text-align: center;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          .index_layer4{
            margin: 35px auto;
            height: 200px;
            ul {
              display:flex;
              justify-content: space-between;
              height: 200px;
              li {
                position: relative;
                width: 385px;
                height: 200px;
                cursor: pointer;
                .bg {
                  width: 100%;
                  height: 100%;
                }
                .pic {
                  position: absolute;
                  right: 10px;
                  bottom: 10px;
                  -webkit-transition: .5s;
                  -o-transition: .5s;
                  transition: .5s;
                }
                .pic1 {
                  width: 190px;
                  height: 206px;
                }
                .pic2 {
                  width: 182px;
                  height: 204px;
                }
                .pic3 {
                  width: 222px;
                  height: 200px;
                }
                &:hover .pic {
                  -webkit-animation: ab infinite linear 1.5s;
                          animation: ab infinite linear 1.5s;
                }
              }
            }
          }
          
        }
      }
    .just-bg {
        width: 90%;
        height: 500px;
        background: url('/static/hty/img/cbg2.jpg');
        position: absolute;
        top: 0px;
        z-index: -10;
    }

    .list li a:hover {
        background: #e1bd53;
    }
    .list li a:hover .ren {
        color: #2d1e17;
    }

    a {
        text-decoration: none;
        color: #fff;
        font-size: 12px;
    }
    .pt60 {
        padding-top: 60px;
    }
    .tac {
        text-align: center;
        width: 123px;
        height: 30px;
    }

    .zhenren {
        background: #1b1b1b;
        height: 231px;
        border: 0px solid #e1bd53;
        li {
            float: left;
            width: 123px;
            height: 76px;
            border-right: 1px solid #2a2a2a;
            border-bottom: 1px solid #2a2a2a;

            a {
                display: block;
                text-align: center;
                color: #fff;
                padding-top: 12px;

                p {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 24px;
                    &:hover {
                        color: #ffd053;
                    }
                }
            }

            &.rimr {
                border-right: none;
                width: 124px;
            }
        }
    }

    .pt20 {
        padding-top: 20px;
    }

    .lunti div {
        float: left;
        font-size: 12px;
        width: 33.3%;
        text-align: center;
        line-height: 26px;
        color: #f4dc77;
    }
    .luntop2 li .red {
        color: #ff0000;
    }
    .hoverShow{
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        width:288px;
        height: 200px;
        border:1px solid #f4dc77;
        background-color: rgba(0,0,0,.6);
        div{
            width: 180px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            background:radial-gradient(42px circle at 85px -12px, #fff, #f7d95e);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #000;
            font-weight: bold;
            font-size: 18px;
            cursor: pointer;
        }
    }
    .cont {
        height: 618px;
        position: relative;
        background: #0C0C0C;
        border-top: 1px solid #484848;
        margin-bottom: 30px;
        .inner {
            width: 1200px;
            margin: 0 auto;
            height: 100%;
            padding: 40px 0 48px;
            .game {
                &.top {
                    width: 100%;
                    height: 277px;
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: space-between;
                    .ga {
                        width: 590px;
                        height: 100%;
                        position: relative;
                        &.chess {
                            background: url(/static/hty/img/home/bottom_nav/chess.png) no-repeat 0 0/100%;
                            background-size: cover;
                            width: 288px;
                        }
                        &.casino {
                            background: url(/static/hty/img/home/bottom_nav/casino.png) no-repeat 0 0/100%;
                            background-size: cover;
                            width: 590px;
                            margin: 0 15px;
                            .super_award{
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, 10%);
                            }
                            .award_num {
                                flex: 1;
                                height: 61px;
                                font-size: 28px;
                                color: #FEEF00;
                                font-weight: bold;
                                display: flex;
                                li {
                                    margin-right: 5px;
                                    box-sizing: border-box;
                                    &:nth-child(9) {
                                        background: none;
                                        margin:0 0px 0 -4px;
                                    }
                                }
                            }
                        }
                        &.lastPic{
                            background: url(/static/hty/img/home/bottom_nav/lastPic.png) no-repeat 0 0/100%;
                            background-size: cover;
                            width: 288px;
                        }
                        &:hover{
                            .hoverShow{
                                display: block;
                            }
                        }
                        .enterzh {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            top: 0;
                            left: 0;
                            z-index: 99;
                            opacity: 0;
                            background: rgba(0, 0, 0, 0.7);
                        }
                    }
                }
                &.bottom {
                    width: 100%;
                    height: 276px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .ga {
                        width: 288px;
                        height: 100%;
                        position: relative;
                        &.lottery {
                            background: url(/static/hty/img/home/bottom_nav/lottery.png) no-repeat 0 0/100%;
                            background-size: cover;
                        }
                        &.fishing {
                            background: url(/static/hty/img/home/bottom_nav/fishing.png) no-repeat 0 0/100%;
                            background-size: cover;
                        }
                        &.sport {
                            background: url(/static/hty/img/home/bottom_nav/sport.png) no-repeat 0 0/100%;
                            background-size: cover;
                        }
                        &.lastPic1 {
                            background: url(/static/hty/img/home/bottom_nav/lastPic1.png) no-repeat 0 0/100%;
                            background-size: cover;
                            .gogamae{
                                width: 85px;
                                height: 30px;
                                text-align: center;
                                line-height: 30px;
                                position: absolute;
                                font-size: 14px;
                                bottom: 25px;
                                left: 93px;
                                border: 1px solid #2e2c2b;
                                color: #fff;
                            }
                            &:hover{
                                .gogamae{
                                    background: #FEEF00;
                                    color:#000;
                                }
                            }
                        }
                        &:hover{
                            .hoverShow{
                                display: block;
                            }
                        }
                        .enterzh {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            top: 0;
                            left: 0;
                            z-index: 99;
                            opacity: 0;
                            background: rgba(0, 0, 0, 0.7);
                        }
                    }
                }
            }
        }
    }
    .loadCont{
        background: url('/static/hty/img/list_bg.png')no-repeat;
        height: 449px;
        background-size: 100% 100%;
        ul{
            display: flex;
            width: 1200px;
            margin: 0 auto;
            li{
                height: 431px;
                width: 414px;
                cursor: pointer;
                &:first-child{
                    width: 434px;
                    background: url('/static/hty/img/home/bottom_nav/liveBg.png')no-repeat;
                    background-size: 100% 100%;
                    div{
                        position: relative;
                        top: 292px;
                        text-align: center;
                        span{
                            display: inline-block;
                            height: 30px;
                            width: 75px;
                            text-align: center;
                            line-height: 30px;
                            cursor: pointer;
                            font-size: 12px;
                            margin-left: 5px;
                            border-radius: 5px;
                            border: 1px solid #2e2c2b;
                            color: #71706f;
                            &:hover{
                                color:#FEEF00;
                                border: 1px solid #FEEF00;
                            }
                        }
                    }
                    
                }
                &:nth-child(2){
                    span{
                        display: block;
                        // width: 422px;
                        &:first-child{
                            height: 201px;
                            background: url('/static/hty/img/home/bottom_nav/sp.png')no-repeat;
                            background-size: 100% 100%;
                            &:hover{
                                background: url('/static/hty/img/home/bottom_nav/sp_1.png')no-repeat;
                                background-size: 100% 100%;
                            }
                        }
                        &:last-child{
                            height: 230px;
                            background: url('/static/hty/img/home/bottom_nav/cp.png')no-repeat;
                            background-size: 100% 100%;
                            &:hover{
                                background: url('/static/hty/img/home/bottom_nav/cp_1.png')no-repeat;
                                background-size: 100% 100%;
                            }
                        }
                    }
                }
                &:last-child{
                    width: 350px;
                    background: url('/static/hty/img/home/bottom_nav/load.png')no-repeat;
                    background-size: 100% 100%;
                    &:hover{
                        background: url('/static/hty/img/home/bottom_nav/load_1.png')no-repeat;
                        background-size: 100% 100%;
                    }
                }
                
            }
        }
    }
    .helpArr{
        display: flex;
        width: 1200px;
        margin: 0 auto;
        padding: 30px 0;
        div{
            &:first-child{
                width: 1035px;
                height: 54px;
                margin: 0 auto;
                background: url('/static/hty/img/helpArr.png')no-repeat;
                background-size: cover;
            }
            &:last-child{
                width: 154px;
                height: 54px;
                margin: 0 auto;
                background: url('/static/hty/img/helpArr2.png')no-repeat;
                background-size: cover;
            }
        }
        
    }
    @keyframes animateSub {
        0% {
            top: 0;
        }

        to {
            top: -700px;
        }
    }

    .home-container #slot-box:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        margin-left: -805px;
        bottom: -20px;
        width: 355px;
        height: 518px;
        z-index: 1;
    }

    /deep/ .carouse {
        min-width: 1200px;
        max-width: 100%;
        margin: 0 auto;

        .carousel_wrapper {
            overflow: hidden;
            width: 100%;

            .ivu-carousel-list {
                height: 100%;
                .ivu-carousel-track {
                    height: 100%;
                    width: 100%;
                    .myItems {
                        width: 100%;
                        height: 100% !important;
                        img {
                            height: 100%;
                            width: 100%;
                        }
                    }
                }
            }
        }
        .ivu-carousel-dots-inside {
            bottom: 42px;
            li {
                .radius {
                    width: 12px;
                    height: 12px;
                    background: #fff;
                }
                &.ivu-carousel-active {
                    .radius {
                        background: #de3a3a;
                    }
                }
            }
        }
    }

    .el-carousel {
        width: 100%;
    }

    .w1000 {
        width: 1200px;
        height: 36px;
        margin: 0 auto;
        cursor: pointer;
    }
    .index-banner {
        height: 465px;
        position: relative;
    }
    .index-bannercon {
        position: relative;
        height: 464px;
        overflow: hidden;
    }
    .index-bannercon {
        position: absolute;
        left: 50%;
        top: 0px;
        margin-left: -500px;
        z-index: 20;
    }

    .index-slots {
        height: 453px;
        overflow: hidden;
    }
}
</style>
