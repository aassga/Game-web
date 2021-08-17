<template>
  <div class="new-index klk-home">
    
    <div class="content_bg">
      <div class="content content-main-bg" :class="{night:colorbool}">
          <div class="wp">
            <div class="gameContainer">
              <div v-for="(item,index) in sildeArr" :key="index">
                <p><img :src="item.img" ></p>
                <p>{{item.name}}</p>
                <p>{{item.mark}}</p>
                <p @click="gotoGame(item)">进入游戏</p>
              </div>
            </div>
            <div class="gameContainer2">
              <div class="list"><img src="/static/99qp/img/icon_list.png" alt=""></div>
              <div class="winner_list">
                  <p class="title"><span>会员账号</span><span>游戏名称</span><span>中奖金额</span></p>
                  <div class="winningBox">
                      <ul class="winningList" :style="[{transform: 'translateY(-'+noticePosition+'px) translateZ(0px)'}]">
                          <li class="winningItem" v-for="(item, i) in winningInfoLeft" :key="i">
                              <i class="user_id">{{item.name.padEnd(8, '*')}}</i>
                              <i class="game_name">{{item.game_name}}</i>
                              <i class="money_num">{{item.num}} 元</i>
                          </li>
                      </ul>
                  </div>
              </div>
              <div class="list2"><img src="/static/99qp/img/list.png" alt=""></div>
              <div class="font">千万奖池一触即发</div>
              <div class="super_award">{{superAward.toLocaleString()}}.{{randomFloat.toLocaleString().padEnd(2,'0')}}</div>
            </div>
            <div class="gameContainer3">
              <div class="gameMenu">
                <p><img src="/static/99qp/img/hotGame.png" alt=""></p>
                <ul>
                  <li v-for="(item,index) in gameList" :key="index" @mouseover="changGame(item.id)" @click="goMore(item.id)">
                      <span><img :class="item.id" :src="item.img" alt=""></span>
                      <span v-if="item.id == 'more'"><i>+</i>{{item.name}}</span>
                      <span v-else>{{item.name}}</span>
                  </li>
                </ul>
              </div>
              <div class="gameArr">
                <ul>
                  <li class="li-list" v-for="(v,k) in kindGame" :key="k" >
                      <span><img :src="v.img" alt=""></span>
                      <span>
                        <img src="/static/99qp/img/heart.png" alt="">
                        <img src="/static/99qp/img/heart.png" alt="">
                        <img src="/static/99qp/img/heart.png" alt="">
                        <img src="/static/99qp/img/heart.png" alt="">
                        <img src="/static/99qp/img/heart.png" alt="">
                        <!-- <img v-if="k != 0" src="/static/99qp/img/heart.png" alt="">
                        <img v-if="k == 0" src="/static/99qp/img/heart2.png" alt=""> -->
                      </span>
                      <span>{{v.name}}</span>
                      <span @click="loginGame(v)">立即游戏</span>
                  </li>
                  <!-- <li class="li-mw" v-for="(v,k) in kindGame" :key="k" v-if="v.idName==='mg1'">
                    <p  @click="$loginGame(v)">
                      <img :src="v.img" alt="">
                    </p>
                  </li> -->
                </ul>
              </div>
              <div class="gameImg " v-show="gameIds == 'mg'"><img src="/static/99qp/img/gameImg1.png" alt=""></div>
              <div class="gameImg-mw" v-show="gameIds == 'mw'"><img src="/static/99qp/img/gameImg2.png" alt=""></div>
              <div class="gameImg" v-show="gameIds == 'ag'"><img src="/static/99qp/img/gameImg3.png" alt=""></div>
              <div class="gameImg" v-show="gameIds == 'bb'"><img src="/static/99qp/img/gameImg4.png" alt=""></div>
              <div class="gameImg" v-show="gameIds == 'more'"><img src="/static/99qp/img/gameImg5.png" alt=""></div>
            </div>
            
          </div>
          <div class="gameContainer4">
            <div class="box4">
               <div class="game4">
              <div class="box1">
                <p class="title1">享受优质投注快感</p>
                <p class="title2">
                  <span>扫码APP下载</span> 
                  <span>www.8846.com</span> 
                  <span>支持 iOS & Android 全方位功能
                  </span>
                </p>
                <div class="title3" ref="qr-code"></div>
                <p  class="title4">
                  <span><img src="/static/99qp/img/app.png"></span>
                  <span><img src="/static/99qp/img/google.png"></span>
                </p>
              </div>
              <div class="box2">
                <img src="/static/99qp/img/mobile.png">
              </div>
              <div class="box3">
                <p class="title5">随时随地赢钱利器</p>
                <p class="title6">
                  <span><img src="/static/99qp/img/h5.png"></span>
                  <span>H5手机界面<br/> www.8846.com<br/> 手动输入网址 立即投注</span>
                </p>
              </div>
            </div>
            </div>
           
          </div>
          <div class="gameContainer5">
            <div class="serContainer">
              <p><img src="/static/99qp/img/ser_title.png"></p>
              <div class="serList">
                <ul>
                  <li style="padding-left:0" class="ck">
                    <p >
                      <span class="cksz"  @mouseover="selectStyle('ckdz')"  @mouseleave="leaveStyle('ckdz')" >60<i>秒</i></span>
                      <span>
                        <img src="/static/99qp/img/jt.png" alt="">
                      </span>
                      <span>存款到账<br/><i>平均时间</i></span>
                    </p>
                    <p>
                      <img v-if="showT" src="/static/99qp/img/zhi_1.png" alt="">
                      <img v-if="showGif" src="/static/99qp/img/copyzh1.gif" alt="">
                    </p>
                  </li>
                  <li>
                    <p>
                      <span  @mouseover="selectStyle('qkdz')" @mouseleave="leaveStyle('qkdz')">2.57<i>分</i></span>
                      <span><img src="/static/99qp/img/jt.png" alt=""></span>
                      <span>取款到账<br/><i>平均时间</i></span>
                    </p>
                    <p>
                      <img  v-if="showT2" src="/static/99qp/img/zhi_2.png" alt="">
                      <img v-if="showGif2" src="/static/99qp/img/copyzh3.gif" alt="">
                      </p>
                  </li>
                  <li style="padding-left:60px">
                    <p>
                      <span  @mouseover="selectStyle('mqzc')" @mouseleave="leaveStyle('mqzc')" >34<i>家</i></span>
                      <span> <img src="/static/99qp/img/jt.png" alt=""></span>
                      <span>目前支持<br/><i>已有银行</i></span>
                    </p>
                    <p>
                      <img  v-if="showT3" src="/static/99qp/img/zhi_3.png" alt="">
                      <img v-if="showGif3"  src="/static/99qp/img/copyzh2.gif" alt="">
                      </p>
                  </li>
                </ul>
              </div>
              <p><img src="/static/99qp/img/thing_bg.png"></p>
              <div class="serList2">
                <ul>
                  <li>
                    <p>
                      <span>电子游艺</span>
                      <span>8000多款老虎机、电动扑克、大型电玩、桌上游戏、以丰富的视觉、声光效果提供您一级的娱乐。</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>真人娱乐</span>
                      <span>提供真人娱乐、百家乐、骰宝、二八杠、龙虎斗、轮盘、金臂......精彩内容面向全玩家。</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>棋牌游戏</span>
                      <span>棋牌游戏多种花样，绚丽多彩，奖金丰厚，经典和地方玩法的集合，独有竞技模式，支持好友约战、破残局旁观对战！是一款老少皆宜的益智游戏！</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span>体育赛事</span>
                      <span>为您提供最全面赛前及滚球投注服务,眼下最为热门的体育投注类型，总能为您营造最好的赔率，创造最大价值。</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>
          <Modal :scrollable=true title="网站公告" ok-text="关闭" v-model="showPopout" width="657" class="vp-popout-box" >
            <div class="popout-box">
              <span v-html="popups"></span>
            </div>
          </Modal>
          <new-modal :newmodal="newmodal"></new-modal>
         <!-- <Modal width="657" height="546.67" :scrollable=true :mask-closable=false v-model="showimg" class='guanbi'><img width="100%" height="100%" :src="imgsrc"/><span class="close" @click="close"></span></Modal>  -->
         <!-- <vp-mc :imgsrc="imgsrc"></vp-mc> -->
        </div>
      </div>
    </div>
</template>

<script>
  import store from '@/vuex/store'
  import UserService from '@/service/public/UserService.js'
  import '@/assets/iconfont/klk/iconfont.css'
  import '@/assets/iconfont/public/iconfont.css'
  import newModal from "../../public/home/newmodal.vue";
  let indextime
  export default {
    data () {
      return {
        showT:true,
        showT2:true,
        showT3:true,
        showGif:false,
        showGif2:false,
        showGif3:false,
        count:0,
        swich:false,
        lantern: "",
        timerDatas:"",
        showimg:false,
        showPopout: false,
        winningInfoLeft: [],
        winningInfoRight: [],
        superAward: 24687936,
        noticePosition: 0,
        randomFloat: 18,
        imgsrc:'/static/99qp/img/pcAlert.png',
        popups: '',
        lanternData: "",
        sameData:[
          {
            title:"最专业",
            content:'全球最齐全的游戏平台，专业团队为您护驾保航，万款电子随您畅玩，棋牌，捕鱼等多种娱乐方式选择，让您拥有完美游戏体验。'
          },
          {
            title:"最安全",
            content:'独家开发，采用128位加密技术和严格的安全管理体系，客户资金得到最完善的保障，让您全情尽享娱乐、赛事投注，无后顾之忧！'
          },
          {
            title:"最快捷",
            content:'自主研发了全套终端应用，让您畅享 Web、H5，更有 iOS、Android原生App，让您随时随地，娱乐投注随心所欲！'
          },
          {
            title:"最快速",
            content:'最新技术自主研发的财务处理系统，真正做到极速存、取、转。独家网络优化技术，为您提供一流的游戏体验，最大优化网络延迟。'
          }
        ],
        newmodal: {
        title: "来自澳门威尼斯人的消息",
        bgcolor: {
          background: "linear-gradient(90deg,#65e0f4,#4fade6)"
        }
      },
        gameId: 26,
        gameIds:'ag',
        liveList: [],
        qipaiList:[],
        sildeArr:[
          {name:"棋牌游戏",mark:"BOARD GAME",img:"/static/99qp/img/qp.png",link:"/home/chess?navid=9&id=0"},
          {name:"电子游艺",mark:"ELECTRONIC GAME",img:"/static/99qp/img/dz.png",link:'/home/slot?navid=9&id=0'},
          {name:"捕鱼游戏",mark:"FISHING GAME",img:"/static/99qp/img/by.png",link:'/home/fish?navid=9&id=0'},
          {name:"真人游戏",mark:"CASINO",img:"/static/99qp/img/zr.png",link:'/home/live'},
          {name:"体育赛事",mark:"SPOPRTS EVENTS",img:"/static/99qp/img/ty.png",link:"/home/tiyu?id=0"},
          
        ],
        heartArr:[
          {heart:'/static/99qp/img/heart.png'},
          {heart:'/static/99qp/img/heart.png'},
          {heart:'/static/99qp/img/heart.png'},
          {heart:'/static/99qp/img/heart.png'},
          {heart:'/static/99qp/img/heart.png'},
          {heart:'/static/99qp/img/heart2.png'},
          {heart:'/static/99qp/img/heart2.png'},
          {heart:'/static/99qp/img/heart2.png'},
          {heart:'/static/99qp/img/heart2.png'},
          {heart:'/static/99qp/img/heart2.png'},
        ],
        kindGame:[],
        mgList:[
          {idName:'mg',name:"看牌抢庄牛牛",img:'/static/99qp/img/k1.png',id:'10688'},
          {idName:'mg',name:"21点",img:'/static/99qp/img/k2.png',id:'251'},
          {idName:'mg',name:"三公",img:'/static/99qp/img/k3.png',id:'249'},
          {idName:'mg',name:"奔驰宝马",img:'/static/99qp/img/k4.png',id:'10692'},
        ],
        mwList:[
          {idName:'mw',name:"跑得快",img:'/static/99qp/img/l1.png',id:'11180'},
          {idName:'mw',name:"红黑大战",img:'/static/99qp/img/l2.png',id:'10628'},
          {idName:'mw',name:"二人麻将",img:'/static/99qp/img/l3.png',id:'10629'},
          {idName:'mw',name:"森林舞会",img:'/static/99qp/img/l4.png',id:'10633'},
        ],
        agList:[
         {idName:'ag',name:"抢庄斗牛",img:'/static/99qp/img/t1.png',id:'10696'},
          {idName:'ag',name:"炸金花",img:'/static/99qp/img/t2.png',id:'10703'},
          {idName:'ag',name:"通比牛牛",img:'/static/99qp/img/t3.png',id:'10701'},
          {idName:'ag',name:"财神到",img:'/static/99qp/img/t4.png',id:'10727'},
        ],
        bbList:[
          {idName:'bb',name:"五人牛牛",img:'/static/99qp/img/m1.png',id:'11791'},
          {idName:'bb',name:"红包扫雷",img:'/static/99qp/img/m2.png',id:'11815'},
          {idName:'bb',name:"黑杰克",img:'/static/99qp/img/m3.png',id:'11787'},
          {idName:'bb',name:"飞禽走兽",img:'/static/99qp/img/m4.png',id:'11778'},
        ],
        moreList:[
          {idName:'mg',name:"VG棋牌",img:'/static/99qp/img/vgqp.png',link:"/home/chess?navid=9&id=10041"},
          {idName:'mg',name:"FG棋牌",img:'/static/99qp/img/fgqp.png',link:'/home/chess?navid=9&id=10732'},
          {idName:'mg',name:"大富翁",img:'/static/99qp/img/dfw.png',link:'/home/chess?navid=9&id=11759'},
          {idName:'mg',name:"凯旋棋牌",img:'/static/99qp/img/lcqp.png',link:'/home/chess?navid=9&id=11857'},
          
        ],
        gameList:[
          {name:"天游棋牌",img:'/static/99qp/img/icon_th.png',id:"ag"},
          {name:"乐游棋牌",img:'/static/99qp/img/icon_ly.png',id:"mw"},
          {name:"开元棋牌",img:'/static/99qp/img/icon_ky.png',id:"mg"},
          {name:"MT棋牌",img:'/static/99qp/img/icon_mt.png',id:"bb"},
          {name:"更多游戏",img:'',id:'more'},
        ]
      }
    },
    components:{newModal},
    methods: {
      loginGame(v){
          if(v.link) this.$router.push(v.link)
          else this.$loginGame(v)
      },
      selectStyle(type){
        if(type=='ckdz'){
           this.showGif=true;
             this.showT=false;
        }
        if(type=='qkdz'){
          this.showGif2=true;
           this.showT2=false;
        }
        if(type=='mqzc'){
          this.showGif3=true;
           this.showT3=false;
        }
      },
      leaveStyle(type){
          if(type=='ckdz'){
           this.showGif=false;
            this.showT=true;
         }
          if(type=='qkdz'){
          this.showGif2=false;
           this.showT2=true;
         }
         if(type=='mqzc'){
          this.showGif3=false;
           this.showT3=true;
        }
      },
      goMore(id){
        if(id == 'more'){
          this.$router.push('/home/slot?navid=9&id=0')
        }
      },
      changGame(id){
        this.gameIds = id;
        switch (id) {
          case 'mg':
            this.kindGame = this.mgList;
            break;
          case 'mw':
            this.kindGame = this.mwList;
            break;
          case 'ag':
            this.kindGame = this.agList;
            break;
          case 'bb':
            this.kindGame = this.bbList;
            break;
          case 'more':
            this.kindGame = this.moreList;
            break;
        }
      },
      gotoGame(i){
        if(i.link){
          this.$router.push(i.link)
        }
        
      },
      //超级奖池
      jackpotFc() {
          clearInterval(this.setInter);
          this.setInter = setInterval(() => {
              var num = Math.floor(Math.random() * 100);

              this.superAward = this.superAward + 18;
              this.randomFloat = num;
          }, 600);
      },
      initWinningInfo() {
        let data = [];
        let games = [
            '跳高高',
            '篮球巨星',
            '水果拉霸',
            '湛蓝深海',
            '冰上曲棍球',
            '金钱蛙',
            '飞天',
            '发财神',
            '空手道猪',
            '雷霆风暴',
            '熊之舞',
            '不朽的爱情',
            '嗨爆大马戏',
            '银行劫匪',
            '雷霆风暴',
            '不朽的爱情',
            '侠盗猎车手',
            '水果拉霸',
            '空手道猪',
            '冰上曲棍球',
            '飞天',
            '抢庄牛牛',
            '十三水',
            '斗地主',
            '押庄龙虎',
            '德州扑克',
            '不朽的浪漫',
            '银行劫匪2',
            '108好汉',
            '逐鹿三国',
            '跳高高',
            '篮球巨星',
            '水果拉霸',
            '湛蓝深海',
            '冰上曲棍球',
            '金钱蛙',
            '飞天',
            '发财神',
            '空手道猪',
            '雷霆风暴',
            '嗨爆大马戏',
            '银行劫匪',
            '雷霆风暴',
            '不朽的浪漫',
            '银行劫匪2',
            '108好汉',
            '逐鹿三国',
            '冒险丛林',
            '城市猎人',
            '大航海时代'
        ];
        for (let i = 0; i < games.length; i++) {
            let num = parseInt(Math.random() * (Math.random() * (Math.random() * 360000)));
            num = num < 10 ? num * 1234 : num;
            num = num < 100 ? num * 123 : num;
            num = num < 1000 ? num * 12 : num;
            let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
            name = name.substr(0, 3);

            data[i] = { name, num, game_name: games[i] };
        }

        this.arraySort(data, (v1, v2) => v1.num < v2.num);
        this.winningInfo = data;
        this.winningInfoLeft = data.slice(0, 25);
        this.winningInfoRight = data.slice(25, 50);
      },
    },
    
    created () {
      
    },
    mounted () {
      this.initWinningInfo();
      this.jackpotFc();
      this.changGame('ag');
      this.createDownloadQRCode({
          el: this.$refs['qr-code'],
          url: window.location.origin + '/m#/download',
          size: 131
      })
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
      
    },
    components: {
      newModal
    },
    
    filters:{},
    store
  }
</script>

<style lang="less">
  @keyframes animateSub {
        0% {
            top: 0;
        }

        to {
            top: -700px;
        }
    }
  .new-index {
    position: relative;
    width:100%;
    margin: 0 auto;
    .content_bg{
      overflow: hidden;
      background: url('/static/99qp/img/c_bg.png') no-repeat;
      background-size: 100% 1131px;
      .content-main-bg{
        position: relative;
        
        .wp{
          width: 100%;
          margin: 0 auto;
          
          .gameContainer{
            display: flex;
            flex-wrap: nowrap;
            margin:0 auto;
            height: 445px;
            width: 1200px;
            div{
              width: 220px;
              height: 302px;
              margin-right: 20px;
              margin-top: 90px;
              background: #fff;
              cursor: pointer;
              border-radius: 20px 20px 20px 20px;
              box-shadow: 1px 7px 35px 0px rgba(0, 0, 0, 0.11);
              transition:height .5s;
              transition:transform 0.4s;
              z-index: 99;
              p{
                width: 100%;
                text-align: center;
                color: #4B62D6;
                &:first-child{
                  height: 197px;
                  width: 100%;
                  background: linear-gradient(91deg, #4672ED, #90C4FA);
                  border-radius: 20px 20px 0 0;
                  position: relative;
                  img{
                    position: absolute;
                    left: 0;
                    top: -67px;
                  }
                }
                &:nth-child(2){
                  font-size: 31px;
                  margin-top: 20px;
                }
                &:nth-child(3){
                  font-size: 13px;
                  margin-top: 8px;
                  margin-bottom: 10px;
                }
                &:last-child{
                  width: 157px;
                  height: 33px;
                  text-align: left;
                  padding-left:20px;
                  margin-left: 32px;
                  line-height: 33px;
                  display: none;
                  opacity: 0;
                  font-size: 20px;
                  border-radius: 30px;                  
                  border: 1px solid #4C62D6;
                  background: url("/static/99qp/img/go.png") no-repeat center center;
                  background-position: 110px 7px;
                }
              }
              &:hover{
                height: 340px;
                transform:translate3d(0,-26px,0);
                p{
                  &:last-child{
                    display: block;
                    opacity: 1;
                    transition: all 1s;
                    background-color: #4C62D6;
                     color:#fff;
                  }
                }
              }
            }
          }
          .gameContainer2{
            display: flex;
            width: 1200px;
            margin: 0 auto;
            .list{
              width: 67px;
              height: 117px;
            }
            .list2{
              width: 80px;
              height: 117px;
              line-height: 30px;
              margin-top:13px;
            }
            .font{
              width: 138px;
              height: 117px;
              font-size: 32px;
              font-weight: bold;
              color: #137AD9;
              margin-top: 33px;
              margin-left: 20px;
            }
            .super_award{
              font-size: 68px;
              color: #FE2C52;
              line-height: 125px;
              margin-left: 20px;
            }
            .winner_list {
                width: 355px;
                height: 93px;
                margin: 12px 0 0 0;
                padding: 6px 0 6px 0;
                text-align: left;
                vertical-align: top;
                overflow: hidden;
                background-size: contain;
                p.title{
                    height: 25px;
                    span{
                        display: inline-block;
                        width: 115px;
                        height: 25px;
                        line-height: 25px;
                        font-size: 15px;
                        // text-align: center;
                        color: #4E4E4E;
                    }
                    span:first-child{
                      font-weight: bold;
                    }
                }
                .winningBox {
                    overflow: hidden;
                    position: relative;
                    height: 68PX;
                    display: flex;

                    &:hover {
                        .winningList {
                            animation-play-state: paused;
                        }
                    }

                    .winningList {
                        width: 100%;
                        position: relative;
                        left: 0;
                        top: 0;
                        animation: animateSub 40s linear infinite;

                        .winningItem {
                            width: 100%;
                            padding: 0 10px 0 4px;
                            line-height: 28px;
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                            align-items: center;

                            i {
                                font-size: 13px;
                                font-weight: 400;
                                flex: 1;
                                // text-align: center;
                                color: #000;

                                &.user_id {
                                    color: #000;
                                }
                                &.money_num {
                                    color: #000;
                                }

                                &.game_name {
                                    color: #000;
                                }
                            }
                            i:last-child{
                              color: #FF3C3C;
                            }
                        }
                    }

                    .separateLine {
                        width: 1px;
                        background: #fefda3;
                    }
                }
            }
          }
          .gameContainer3{
            width: 1200px;
            margin: 0 auto;
            cursor: pointer;
            .gameMenu{
              width:370px;
              height: 570px;
              background: url('/static/99qp/img/gameMenu.png') no-repeat center center;
              background-position:-31px 35px;
              float: left;
              ul{
                li{
                    width: 189px;
                    height: 39px;
                    line-height: 39px;
                    color:#39404d;
                    text-align: center;
                    position: relative;
                    transition:transform 1s;
                     &:hover{
                      color: #fff;
                      font-size: 22px;
                      font-weight: bold;
                      transform:translate3d(40px,0,0);
                      background: url('/static/99qp/img/sq.png') no-repeat center center;
                      span{
                        img{
                          position: relative;
                          top: -3px;
                        }
                        .ag,.mg{
                          position: relative;
                          left: 7px;
                        }
                        .bb,.mw,.bg{
                          position: relative;
                          left: 2px;
                        }
                      }
                    }
                    &:first-child{
                      left: 20px;
                      top: 60px;
                    }
                    &:nth-child(2){
                      left: 62px;
                      top: 110px;
                    }
                    &:nth-child(3){
                      left: 100px;
                      top: 170px;
                    }
                    &:nth-child(4){
                      left: 62px;
                      top: 225px;
                    }
                    &:nth-child(5){
                      font-size: 20px;
                      left: 20px;
                      top: 280px;
                    }
                    span{
                      &:first-child{
                        position: relative;
                        top: 9px;
                      }
                      .ag,.mw,.mg{
                        position: relative;
                        left: 3px;
                      }
                      img{
                          position: relative;
                          top: -3px;
                        }
                      i{
                        font-size: 28px;
                        position: relative;
                        top: 3px;
                        left: -4px;
                      }
                    }
                  }
              }
            }
            .gameArr{
              width: 400px;
              height: 553px;
              margin-left: -55px;
              float: left;
              // background: url('/static/99qp/img/gameImg.png') no-repeat center center;
              ul{
                display: flex;
                flex-wrap: wrap;
                margin-top: 60px;
                li{
                  img{
                    transition: all 1s ease 0s; 
                  }
                  &:hover{
                    span{
                      &:first-child{
                        img{
                          transform: scale(1.2);  
                          transition: all 1s ease 0s;  
                        }
                      }
                      &:last-child{
                        border: 1px solid #4b62d6;
                        background: #4b62d6;
                        color:#fff;
                      }
                    }
                  }
                }
                .li-list{
                  span{
                    display: block;
                    font-size: 17px;
                    text-align: center;
                    color: #39404D;
                    margin-bottom: 10px;
                    &:last-child{
                      width: 113px;
                      height:29px;
                      
                      line-height: 29px;
                      margin: 0 auto;
                      border: 1px solid #535965;
                      border-radius: 30px;
                    }
                  }
                  &:first-child,&:nth-child(2){
                    margin-bottom: 20px;
                  }
                  &:first-child,&:nth-child(3){
                    margin-right: 25px;
                  }
                  &:hover{
                    span{
                      &:nth-child(3){
                        color: #4B62D6;
                      }
                    }
                     
                  }
                }
                // .li-mw{
                //     margin-left:-20px;
                //     &:first-child{
                //       margin-top:20px;
                //     }
                //     &:nth-child(2){
                //       margin-top:-70px;
                //     }
                //     img{
                //       transition: all 1s ease 0s; 
                //     }
                //     &:hover{
                //       img{
                //         transform: scale(1.1);  
                //         transition: all 1s ease 0s;  
                //       }
                //     }
                // }
              }
            }
          
            .gameImg{
              width: 653px;
              height: 553px;
              position: relative;
              top: -600px;
              left: 643px;         
            }
         
            .gameImg-mw{
              width: 653px;
              height: 553px;
              position: relative;
              top: -600px;
              left: 680px;
            }  
          
          
          }
          
        }
        .gameContainer4{
          width: 100%;
          height: 550px;
          background: url('/static/99qp/img/s_bg.png') no-repeat center center;
          .box4{
            width: 1200px;
            margin: 0 auto;
               .game4{
            display: flex;
            width: 100%;
            margin: 0 auto;
            flex-wrap: nowrap;
           
            .box1{
              padding-top: 90px;
              width: 386px;
              height: 514px;
              .title1{
                color: #4B62D6;
                font-size: 41px;
                margin-bottom: 15px;
              }
              .title2{
                line-height: 31px;
                margin-bottom: 20px;
                span{
                  display: block;
                  color: #4B62D6;
                  font-size: 18px;
                }
              }
              .title3{
                height: 146px;
                width: 146px;
                margin-bottom: 30px;
                padding: 8px;
                background: url('/static/99qp/img/qr_bg.png') no-repeat center center;
                
              }
              .title4{
                span{
                  display: inline-block;
                  height: 52px;
                  width: 184px;
                  &:last-child{
                    margin-left:5px;
                  }
                }
              }
            }
            .box2{
               width: 428px;
              height: 514px;
              padding-top: 80px;
            }
            .box3{ 
             width: 386px;
              height: 514px;
              padding-top: 90px;
              .title5{
                color: #4B62D6;
                font-size: 41px;
                margin-bottom: 20px;
              }
              .title6{
                span{
                  display: inline-block;
                  color: #4B62D6;
                  font-size: 18px;
                  &:first-child{
                    width: 118px;
                    height: 133px;
                  }
                  &:last-child{
                    position: relative;
                    top: -25px;
                    left:10px;
                    line-height: 31px;
                  }
                }
              }
            }
          }
          }
       
        }
        .gameContainer5{
          width: 100%;
          height: 520px;
          background: #fff;
          .serContainer{
            width: 1200px;
            margin: 0 auto;
            padding-top: 45px;
            .serList{
              padding-top: 30px;
              padding-bottom: 30px;
              ul{
                display: flex;
                li{
                  padding-left: 25px;
                  width: 400px;
                 p{
                    .ckzs{
                    // &:hover{
                    //   background:url(/static/99qp/img/copyzh1.gif) no-repeat center top;
                    // } 

                  }
                 }
                  span{
                    &:first-child{
                      color: #A9B6F6;
                      font-size: 98px;
                      i{
                        color: #5E5E5E;
                        font-size: 32px;
                        
                      }
                    }
                    &:last-child{
                      color: #5E5E5E;
                      font-size: 23px;
                      position: relative;
                      top: -23px;
                      left: 110px;
                      i{
                        font-size: 17px;
                        position: relative;
                        left: 168px;
                        top: -10px;
                      }
                    }
                  }
                  &:nth-child(2){
                    span{
                      &:last-child{
                        position: relative;
                        top: -23px;
                        left: 34px;
                        i{
                          &:last-child{
                            position: relative;
                            left: 252px;
                            top: -10px;
                          }
                        }
                      }
                      
                    }
                  }
                }
                li:first-child{
                  span{
                    &:nth-child(2){
                       position: relative;
                        left: 65px;
                        top: -7px;
                    }
                  }
                }
                li:nth-child(2){
                  span{
                    &:nth-child(2){
                       position: relative;
                        left: 20px;
                        top: -7px;
                    }
                  }
                }
                li:last-child{
                  span{
                    &:nth-child(2){
                       position: relative;
                        left: 60px;
                        top: -7px;
                    }
                  }
                }
              }
            }
            .serList2{
              padding-top: 30px;
              ul{
                display: flex;
                li{
                  width: 251px;
                  margin-right: 50px;
                  p{
                    span{
                      display: block;
                      &:first-child{
                        color: #2E384D;
                        font-size: 23px;
                        font-weight: bold;
                      }
                      &:last-child{
                        color: #2E384D;
                        font-size: 16px;line-height: 25px;
                        margin-top:13px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
     .night{
        background:url(/static/99qp/img/index-main-bg-n.jpg) no-repeat center top;
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
        background: #ff0000 url(/static/99qp/img/ui-bg_gloss-wave_45_817865_500x100.png) 50% 50% repeat-x;
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
  

// @-webkit-keyframes righteaseinAnimate{
//     0%{ -webkit-transform: translateX(2000px); opacity: 0;}
//     100%{ -webkit-transform: translateX(0px); opacity: 1;}
// }
// .gameImg-mw{
//     animation: righteaseinAnimate 1s ease 1;    /*调用已定义好的动画righteaseinAnimate，全程运行时间1S，进入的速度曲线为ease，只播放一次*/
//     /*规定动画的最后状态为结束状态*/
//     animation-fill-mode:forwards;
// }
.gameImg{
 animation: bounceInLeft 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0s 1 alternate forwards;
}
.gameImg-mw{
  // animation: bounceInLeft 1.1s 0.85s linear forwards;
  //  animation: bounceInLeft 1s infinite cubic-bezier(0.215, 0.610, 0.355, 1.000)
  animation: bounceInLeft 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0s 1 alternate forwards;
}
// .gameImg:hover{
//        animation: bounceInLeft 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0s 1 alternate forwards;        
//    }
@keyframes bounceInLeft {
  0% {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }
  75% {
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    transform: translate3d(5px, 0, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
</style>
