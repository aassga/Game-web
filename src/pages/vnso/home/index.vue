<template>
  <div class="new-index klk-home">
    
    <div class="content_bg">
      <div class="content content-main-bg" :class="{night:colorbool}">
          
          <div class="wp">
            <div class="gameContainer">
              <div class="container_1">
                <img src="/static/vnso/img/shixunBg.png">
                <div class="jieshao">
                  <p>全球最佳真人视讯平台，真人荷官在线发牌，画面真实高清，给您亲临赌场的真实爽快感受！</p>
                  <p><span @click="$router.push('/home/live')"></span></p>
                </div>
                <div class="line"><span></span></div>
                <!-- 导航栏 -->
                <div class="game_nav" carousel-slider super-vis="6" super-play="true" super-effect="leftLoop">
                    <span class="arrow prev"><span></span></span>
                    <span class="arrow next"><span></span></span>

                    <div class="mainCell">
                        <div class="tempWarp">
                            <ul id="game_list">
                                <li @click="$loginGame(item)" :key="index" v-for="(item,index) in liveList" :class="[{'active':gameId===item.id},item.class]">
                                    <div class="gameListText">
                                        <span class="game_name">{{item.name}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
              </div>
              <div class="container_2">
                <img style="margin-top: -2px;" src="/static/vnso/img/qipaiBg.png">
                <!-- <div class="qipaiBg">
                  <span>棋牌游戏</span><br/>
                  <span>POKEP GAME</span>
                </div> -->
                <div class="jieshao">
                  <p>汇聚全球顶级竞技棋牌中心，抢庄牛牛，抢庄牌九，炸金花，万人在线，火热pk！天天送豪礼！</p>
                  <p><span @click="$router.push('/home/chess?navid=9&id=0')"></span></p>
                </div>
                <div class="line"><span></span></div>
                <!-- 导航栏 -->
                <div class="game_nav_1" carousel-slider super-vis="6" super-play='true' super-effect="leftLoop">
                    <span class="arrow prev_1"><span></span></span>
                    <span class="arrow next_1"><span></span></span>
                    <div class="mainCell">
                        <div class="tempWarp">
                            <ul id="game_list_1">
                                <li @click="$goPath('nav',item)" :key="index" v-for="(item,index) in qipaiList" :class="[{'active':gameId===item.id},item.class]">
                                    <div class="gameListText">
                                        <span class="game_name">{{item.name}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div class="gameContainer2">
              <div @click="$router.push('/home/fish?navid=9&id=0')">
                <img src="/static/vnso/img/fishGame.png" alt="">
              </div>
              <div @click="$router.push('/home/slot?navid=9&id=0')">
                <img src="/static/vnso/img/slotGame.png" alt="">
              </div>
            </div>
            <div class="gameContainer3">
              <div @click="gotoCaipiao">
                <img src="/static/vnso/img/caipiaoGame.png" alt="">
              </div>
              <div @click="$router.push('/home/tiyu?navid=9&id=0')">
                <img src="/static/vnso/img/tiyuGame.png" alt="">
              </div>
              <div @click="$router.push('/home/youhui')">
                <img src="/static/vnso/img/youhuiGame.png" alt="">
              </div>
            </div>
            
          </div>
          <div class="gameContainer4">
            <div class="mobileDetail">
              <div class="mobileDetail1">
                <div><img src="/static/vnso/img/mobilePic.png" width="700px"></div>
                <div>
                  <h1>方寸之间 从容尽显</h1>
                  <h2>业内最顶尖的手机投注APP</h2>
                  <p>最顶尖的手机投注APP希望您始终能感受到太阳城集团品牌对专业的执着！在这里，有全网最丰富的视讯、棋牌、捕鱼、电子、彩票、电竞游戏，最贴心的优惠，最卓越的用户体验，全年无休的技术支持，稳定陪伴您畅快游戏，方寸之间，从容尽显，娱乐真的可以信手拈来，财富一键在手。</p>
                  <div class="someOne">
                    <div>
                      <div class="loadCode" ref="qr-code"></div><br>
                      <!-- <img src="/static/vnso/img/b_title.png" style="width:210px;margin-top:20px"> -->
                      <div class="btn_code">安卓&iOS全部移动设备</div>
                    </div>
                    <div>
                      <img src="/static/vnso/img/h5Pic.png" style="width:104px;height:150px;margin-top:18px" ><br>
                      <span>手机无需下载<br> <i>浏览器输入网址即可访问</i> </span>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div class="someDe">
              <ul>
                <li v-for="(item,index) in sameData" :key="index">
                  <span>{{item.title}}</span><br>
                  <span>{{item.content}}</span>
                </li>
                
              </ul>
            </div>
          </div>
          <Modal :scrollable=true title="网站公告" ok-text="关闭" v-model="showPopout" width="657" class="vp-popout-box" >
            <div class="popout-box">
              <span v-html="popups"></span>
            </div>
          </Modal>
         <!-- <Modal width="657" height="546.67" :scrollable=true :mask-closable=false v-model="showimg" class='guanbi'><img width="100%" height="100%" :src="imgsrc"/><span class="close" @click="close"></span></Modal>  -->
         <!-- <vp-mc :imgsrc="imgsrc"></vp-mc> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/vuex/store'
  import UserService from '@/service/public/UserService.js'
  import '@/assets/iconfont/klk/iconfont.css'
  import '@/assets/iconfont/public/iconfont.css'
  let indextime
  export default {
    data () {
      return {
        count:0,
        swich:false,
        lantern: "",
        timerDatas:"",
        showimg:false,
        showPopout: false,
        imgsrc:'/static/vnso/img/pcAlert.png',
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
        gameId: 26,
        liveList: [],
        qipaiList:[],
        
      }
    },
    methods: {
      toQipqi(id){
        this.$router.push('/home/chess?navid=9&id='+ id)
      },
      gotoCaipiao(){
        window.open("#/plays/hall");
      },
      //导航动画
      async slider() {
          let ul = document.getElementById('game_list');
          let ul1 = document.getElementById('game_list_1');
          let prev = document.getElementsByClassName('prev')[0];
          let next = document.getElementsByClassName('next')[0];
          let prev1 = document.getElementsByClassName('prev_1')[0];
          let next1 = document.getElementsByClassName('next_1')[0];
          let main = document.getElementsByClassName('game_nav')[0];
          let main1 = document.getElementsByClassName('game_nav_1')[0];
          let n = -70;
          function left(num) {
            if(num == 1){
              let oLi = ul.children[0];
              ul.className = 'move';
              setTimeout(function() {
                  ul.removeChild(oLi);
                  ul.appendChild(oLi);
                  ul.className = '';
              }, 500);
            }else{
              let oLi1 = ul1.children[0];
              ul1.className = 'move';
              setTimeout(function() {
                  ul1.removeChild(oLi1);
                  ul1.appendChild(oLi1);
                  ul1.className = '';
              }, 500);
            }
              
              
          }

          function right(num) {
            if (num == 1) {
              let last = ul.lastElementChild;
              ul.removeChild(last);
              ul.insertBefore(last, ul.childNodes[0]);
              ul.style.left = n + 'px';
              ul.className = 'back';
              setTimeout(function() {
                  ul.className = '';
                  ul.style.left = '';
              }, 500);
            }else{
              let last1 = ul1.lastElementChild;
              ul1.removeChild(last1);
              ul1.insertBefore(last1, ul1.childNodes[0]);
              ul1.style.left = n + 'px';
              ul1.className = 'back';
              setTimeout(function() {
                  ul1.className = '';
                  ul1.style.left = '';
              }, 500);
            }
              
              
          }
          prev.onclick = function(){
            right(1);
          }
          next.onclick = function(){
            left(1);
          }
          prev1.onclick = function(){
            right(2);
          }
          next1.onclick = function(){
            left(2);
          }

          var timer1 = null;
          var timer2 = null;
          
          timer1 = setInterval(() => {
            left(1)
          }, 1000 * 4);
          timer2 = setInterval(() => {
            left(2)
          }, 1000 * 4);

          main.onmouseover = function(e) {
            let ta = e.target.localName;
            if ( ta== 'div' || ta == 'ul'||ta == 'li'||ta == 'span'||ta==''){
              clearInterval(timer1);
            }
          };
          main.onmouseout = function(e){
            if (e.target.id == 'game_list' || e.target.localName == 'ul' || e.target.localName == 'span'){
              timer1 = setInterval(function(){
                left(1)
              }, 2000);
            }
          };
          main1.onmouseover = function(e) {
            let ta = e.target.localName;
            if ( ta== 'div' || ta == 'ul'||ta == 'li'||ta == 'span'||ta=='') {
              clearInterval(timer2);
            }
          };
          main1.onmouseout = function(e) {
            if (e.target.id == 'game_list_1' || e.target.localName == 'ul' || e.target.localName == 'span') {
              timer2 = setInterval(function(){
                left(2)
              }, 2000);
            }
          };
      },
      
      preload() {
        let imgs = [
          "/static/vnso/img/AG.png",
          "/static/vnso/img/h_AG.png",
          "/static/vnso/img/BG.png",
          "/static/vnso/img/BBIN.png",
          "/static/vnso/img/h_BBIN.png",
          "/static/vnso/img/DG.png",
          "/static/vnso/img/h_DG.png",
          "/static/vnso/img/wm.png",
          "/static/vnso/img/h_WM.png",
          "/static/vnso/img/EBET.png",
          "/static/vnso/img/h_EBET.png",
          "/static/vnso/img/DS.png",
          "/static/vnso/img/h_DS.png",
          "/static/vnso/img/KY.png",
          "/static/vnso/img/h_KY.png",
          "/static/vnso/img/LY.png",
          "/static/vnso/img/h_LY.png",
          "/static/vnso/img/MT.png",
          "/static/vnso/img/h_MT.png",
          "/static/vnso/img/TH.png",
          "/static/vnso/img/h_TH.png",
          "/static/vnso/img/DFW.png",
          "/static/vnso/img/h_DFW.png",
          "/static/vnso/img/XSJ.png",
          "/static/vnso/img/h_XSJ.png",
          "/static/vnso/img/h_LC.png",
          "/static/vnso/img/LC.png",
          "/static/vnso/img/h_AK.png",
          "/static/vnso/img/AK.png",
          "/static/vnso/img/FG.png",
          "/static/vnso/img/h_FG.png",
          "/static/vnso/img/h_vg.png",
          "/static/vnso/img/VG.png",
          "/static/vnso/img/EVO.png",
          "/static/vnso/img/h_EVO.png",
          "/static/vnso/img/h_OG.png",
          "/static/vnso/img/OG.png",
          "/static/vnso/img/h_VR.png",
          "/static/vnso/img/VR.png",
          "/static/vnso/img/h_EVO.png",
        ]

        for (let img of imgs) {
          let image = new Image()
          image.src = img
          image.onload = () => {
            this.count++
          }
        }
      },
      getQipList(){
        let chess_game;
        this.$getObjByLocalStorage("gameSortV4_chess").forEach((gamelist)=>{
          if(gamelist.name=='棋牌游戏平台')  chess_game =gamelist.list
       })
       chess_game = chess_game.filter(ele => ele.name !='全部' )
       chess_game.forEach(val => {
            if(val.id && val.name){
              this.qipaiList.push({
                name:val.name,
                id:val.id,
                link:"/home/chess?navid=9&id="+val.gcid,
                class:val.name==("开元棋牌")?'ky':val.name==("乐游棋牌")?'ly':val.name==("MT棋牌")?'mt':val.name==("天游棋牌")?'th':val.name==("凯旋棋牌")?'lc':val.name==("龙城棋牌")?'lc':val.name==("大富翁")?'dfw':val.name==("新世界")?'xsj':val.name==("VG棋牌")?'vg':val.name==("FG棋牌")?'fg':'',
                // icon:val.name==("开元棋牌")?this.ky:val.name==("乐游棋牌")?this.ly:val.name==("MT棋牌")?this.mt:val.name==("天游棋牌")?this.th:val.name==("凯旋棋牌")?this.lc:val.name==("大富翁")?this.dfw:val.name==("新世界")?this.xsj:val.name==("VG棋牌")?this.vg:val.name==("FG棋牌")?this.fg:'',
              })
            }
        });
        
        // this.$store.dispatch('game/ChessFishSort',{ device: "pc",type: "1"}).then(res=>{
        //   if (res.code == 200) {
        //     let a = res.data.list.platform;
        //     a.forEach(val => {
        //       if(val.id && val.name){
        //         this.qipaiList.push({
        //           name:val.name,
        //           id:val.id,
        //           link:"/home/chess?navid=9&id="+val.id,
        //           class:val.name==("开元棋牌")?'ky':val.name==("乐游棋牌")?'ly':val.name==("MT棋牌")?'mt':val.name==("天游棋牌")?'th':val.name==("凯旋棋牌")?'lc':val.name==("龙城棋牌")?'lc':val.name==("大富翁")?'dfw':val.name==("新世界")?'xsj':val.name==("VG棋牌")?'vg':val.name==("FG棋牌")?'fg':'',
        //           // icon:val.name==("开元棋牌")?this.ky:val.name==("乐游棋牌")?this.ly:val.name==("MT棋牌")?this.mt:val.name==("天游棋牌")?this.th:val.name==("凯旋棋牌")?this.lc:val.name==("大富翁")?this.dfw:val.name==("新世界")?this.xsj:val.name==("VG棋牌")?this.vg:val.name==("FG棋牌")?this.fg:'',
        //         })
        //       }
        //     });
        //   }
        // })
      },
      getLiveList(){
          let a = this.$getObjByLocalStorage("gameSortV4_live").games;
          let list = [];
          let list2 = [];
          a.forEach(val => {
            if(val.id && val.name){
              list.push({
                name:val.name,
                id:val.id,
                class:val.name==("BG视讯")?'bg':val.name==("DG视讯")?'dg':val.name==("BBIN视讯")?'bbin':val.name==("WM视讯")?'wm':val.name==("EBET视讯")?'ebet':val.name==("EVO视讯")?'evo':val.name==("DS视讯")?'ds':val.name==("AG视讯")?'ag':val.name==("OG视讯")?'og':val.name==("VR彩票")?'vr':'',
                icon:val.icon,
              })
            }
          });
          list2 = list;
          if (list.length < 8) {
            list2.push(list[0])
            list2.push(list[1])
            list2.push(list[2])
            list2.push(list[3])
          }
          this.liveList = list2
        // this.$store.dispatch("game/gameSortNew", {device: "pc",id: 10003}).then(res => {
        //   if (res.code == 200) {
        //     let a = this.$getObjByLocalStorage("gameSortV4_live").games;
        //     a.forEach(val => {
        //       if(val.id && val.name){
        //         this.liveList.push({
        //           name:val.name,
        //           id:val.id,
        //           class:val.name==("BG视讯")?'bg':val.name==("DG视讯")?'dg':val.name==("BBIN视讯")?'bbin':val.name==("WM视讯")?'wm':val.name==("EBET视讯")?'ebet':val.name==("EVO视讯")?'evo':val.name==("DS视讯")?'ds':val.name==("AG视讯")?'ag':val.name==("OG视讯")?'og':val.name==("VR彩票")?'vr':'',
        //           icon:val.icon,
        //         })
        //       }
        //     });
        //     console.log(this.liveList);
        //   }
        // });
      }
    },
    
    created () {
      this.preload();
      this.$nextTick(() => {
            this.slider();
        });
      
      setTimeout(() => {
        this.showimg=false
      }, 10000)
      if(localStorage.register){
        this.$router.push('/home/register');
        localStorage.removeItem('register')
      }
    },
    mounted () {
      setTimeout(()=>{
        this.getLiveList();
        this.getQipList();
      },500)
      
      this.createDownloadQRCode({
          el: this.$refs['qr-code'],
          url: window.location.origin + '/m#/download',
          size: 170
      });
    },
    computed: {
        colorbool(){
         return this.$store.state.mainState.color
       },
        websocketdata(){
          return this.$store.state.mainState.websoc
       },
    },
    components: {
    },
    
    filters:{},
    store
  }
</script>

<style lang="less">
  .new-index {
    position: relative;
    width:100%;
    margin: 0 auto;
    .content_bg{
      overflow: hidden;
      .content-main-bg{
        position: relative;
        
        .wp{
          width: 1200px;
          margin: 0 auto;
          padding-bottom: 10px;
          .gameContainer{
            display: flex;
            flex-wrap: nowrap;
            margin-top: 20px;
            .container_2{
              position: relative;
              .jieshao{
                margin-top: -11px;
              }
              .qipaiBg{
                position: absolute;
                right: 32px;
                top: 61px;
                
                span{
                  color: #fff;
                  font-family:FZLanTingHei-DB-GBK;
                  font-size: 28px;
                  font-weight: bold;
                  &:last-child{
                    display: inline-block;
                    margin-top: 5px;
                    font-size: 15px;
                    font-weight: 400;
                    font-family:Microsoft YaHei;
                        letter-spacing: 3px;
                  }
                  
                }
              }
            }
            >div{
              width: 590px;
              height: 490px;
              margin-right: 20px;
              position: relative;
              >img{
                width: 590px;
              }
              &:last-child{
                margin: 0;
              }
              .jieshao{
                display: flex;
                flex-wrap: nowrap;
                background: #fff;
                margin-top: -10px;
                
                p{
                  width: 70%;
                  line-height: 30px;
                  font-size: 15px;
                  padding: 23px 23px 0 23px;
                  &:last-child{
                    width: 30%;
                    padding: 0;
                  }
                  span:first-child{
                    cursor: pointer;
                    display: inline-block;
                    height:50px;
                    width:162px;
                    text-align:center;
                    font-size:15px;
                    margin: 30px 0 0 0;
                    background: url('/static/vnso/img/toGame1.png')no-repeat;
                    background-size: 100% 100%;
                    transition:all .3s linear;
                  }
                  span:first-child:hover{
                    background: url('/static/vnso/img/toGame2.png') no-repeat; /* 标准的语法 */
                    background-size: 100% 100%;
                    height:50px;
                    width:162px;
                  }
                }
              }
              .line{
                width: 100%;
                height: 15px;
                background: #fff;
                text-align: center;
                span{
                  display: inline-block;
                  width: 90%;
                  height: 1px;
                  background: #ECECEC;
                }
              }
              .game_nav,.game_nav_1{
                height: 90px;
                width: 100%;
                position: relative;
                z-index: 1;
                margin: 0 auto;
                overflow: hidden;
                white-space: nowrap;
                border-bottom-left-radius: 15px;
                border-bottom-right-radius: 15px;
                .arrow {
                    cursor: pointer;
                    vertical-align: top;
                    background: #fff;
                    width: 52px;
                    height: 90px;
                    text-align: center;
                    &.prev {
                      position: absolute;
                      top: 0;
                      left: 0;
                      span{
                        display: inline-block;
                        z-index: 999;
                        height: 23px;
                        width: 15px;
                        margin: 27px auto;
                        background: url(/static/vnso/img/h_right.png) no-repeat;
                        &:hover {
                            background: url(/static/vnso/img/h_left.png) no-repeat;
                        }
                      }
                    }
                    &.next {
                      position: absolute;
                      top: 0;
                      right: 0;
                      span{
                        display: inline-block;
                        height: 23px;
                        width: 15px;
                        margin: 27px auto;
                        background: url(/static/vnso/img/p_left.png) no-repeat;
                        &:hover {
                            background: url(/static/vnso/img/p_right.png) no-repeat;
                        }
                      }
                    }
                    &.prev_1 {
                      position: absolute;
                      top: 0;
                      left: 0;
                      span{
                        display: inline-block;
                        z-index: 999;
                        height: 23px;
                        width: 15px;
                        margin: 27px auto;
                        background: url(/static/vnso/img/h_right.png) no-repeat;
                        &:hover {
                            background: url(/static/vnso/img/h_left.png) no-repeat;
                        }
                      }
                    }
                    &.next_1 {
                      position: absolute;
                      top: 0;
                      right: 0;
                      span{
                        display: inline-block;
                        height: 23px;
                        width: 15px;
                        margin: 27px auto;
                        background: url(/static/vnso/img/p_left.png) no-repeat;
                        &:hover {
                            background: url(/static/vnso/img/p_right.png) no-repeat;
                        }
                      }
                    }
                }

                .mainCell {
                    height: 100%;
                    margin: 0 52px;

                    .tempWarp {
                        overflow: hidden;
                        width: 100%;
                        height: 100%;
                        margin: auto;
                        position: relative;

                        #game_list,#game_list_1 {
                            width: 3000px;
                            height: 100%;
                            position: relative;
                            margin: 0;
                            display: table;
                            background: #fff;
                            &.move {
                                transition: all 0.5s ease;
                                -webkit-transition: all 0.5s ease;
                                transform: translate3d(-70px, 0, 0);
                            }
                            &.back {
                                transition: all 0.5s ease;
                                -webkit-transition: all 0.5s ease;
                                transform: translate3d(70px, 0, 0);
                            }

                            li {
                                cursor: pointer;
                                width: 70px;
                                float: left;
                                height: 82px;
                                display: table-cell;
                                color: #7C7C7C;
                                font-size: 12px;
                                text-align: left;
                                vertical-align: top;
                                transition: all 1s !important;
                                position: relative;
                                &:hover{
                                  .gameListText{
                                    span{
                                      color: #4095F0;
                                    }
                                  }
                                }
                                &::before {
                                    content: '';
                                    margin-right: 10px;
                                    height: 37px;
                                    width: 60px;
                                    margin-top: 26px;
                                    text-align: left;
                                    vertical-align: middle;
                                    background-repeat: no-repeat;
                                    background-position: 50%;
                                    position: absolute;
                                    top: 9%;
                                    left: 50%;
                                    transform: translate(-50%, -50%);
                                }
                                &.og:before {
                                    background: url(/static/vnso/img/OG.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.vr:hover:before {
                                    background: url(/static/vnso/img/h_VR.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.vr:before {
                                    background: url(/static/vnso/img/VR.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.og:hover:before {
                                    background: url(/static/vnso/img/h_OG.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.ag:before {
                                    background: url(/static/vnso/img/AG.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.ag:hover:before {
                                    background: url(/static/vnso/img/h_AG.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.bg:before {
                                    background: url(/static/vnso/img/BG.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.bg:hover:before {
                                    background: url(/static/vnso/img/h_BG.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.bbin:before {
                                    background: url(/static/vnso/img/BBIN.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.bbin:hover:before {
                                    background: url(/static/vnso/img/h_BBIN.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.dg:before {
                                    background: url(/static/vnso/img/DG.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.dg:hover:before {
                                    background: url(/static/vnso/img/h_DG.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.wm:before {
                                    background: url(/static/vnso/img/wm.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.wm:hover:before {
                                    background: url(/static/vnso/img/h_WM.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.ebet:before {
                                    background: url(/static/vnso/img/EBET.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.ebet:hover:before {
                                    background: url(/static/vnso/img/h_EBET.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.ds:before {
                                    background: url(/static/vnso/img/DS.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.ds:hover:before {
                                    background: url(/static/vnso/img/h_DS.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.evo:before {
                                    background: url(/static/vnso/img/EVO.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.evo:hover:before {
                                    background: url(/static/vnso/img/h_EVO.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.ky:before {
                                    background: url(/static/vnso/img/KY.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.ky:hover:before {
                                    background: url(/static/vnso/img/h_KY.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.ly:before {
                                    background: url(/static/vnso/img/LY.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.ly:hover:before {
                                    background: url(/static/vnso/img/h_LY.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.mt:before {
                                    background: url(/static/vnso/img/MT.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.mt:hover:before {
                                    background: url(/static/vnso/img/h_MT.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.th:before {
                                    background: url(/static/vnso/img/TH.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.th:hover:before {
                                    background: url(/static/vnso/img/h_TH.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.dfw:before {
                                    background: url(/static/vnso/img/DFW.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.dfw:hover:before {
                                    background: url(/static/vnso/img/h_DFW.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.xsj:before {
                                    background: url(/static/vnso/img/XSJ.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.xsj:hover:before {
                                    background: url(/static/vnso/img/h_XSJ.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.lc:before {
                                    background: url(/static/vnso/img/LC.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.lc:hover:before {
                                    background: url(/static/vnso/img/h_LC.png) no-repeat center center;
                                    background-size: contain;
                                    height: 48px;
                                }
                                &.ak:before {
                                    background: url(/static/vnso/img/AK.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.ak:hover:before {
                                    background: url(/static/vnso/img/h_AK.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.fg:before {
                                    background: url(/static/vnso/img/FG.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.fg:hover:before {
                                    background: url(/static/vnso/img/h_FG.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.vg:before {
                                    background: url(/static/vnso/img/VG.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                &.vg:hover:before {
                                    background: url(/static/vnso/img/h_vg.png) no-repeat center center;
                                    background-size: contain;height: 48px;
                                }
                                .gameListText {
                                    width: 100%;
                                    vertical-align: middle;
                                    text-align: center;
                                    position: absolute;
                                    bottom: 5px;
                                    transition: all 1s;

                                    span {
                                        display: block;
                                        text-align: center;

                                        &:nth-child(2) {
                                            color: #7a5434;
                                            font-size: 14px;
                                            text-align: left;
                                            margin-top: 5px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
              }
            }
          }
          .gameContainer2{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            cursor: pointer;
            div{
              width: 50%;
              height: 262px;
              // overflow: hidden;
              margin-right: 20px;
              &:first-child{
                img{
                  margin-top: 5px;
                }
              }
              &:last-child{
                margin: 0;
              }
              img{
                transition: all .4s linear;
                -moz-transition: all .4s linear;
                -webkit-transition: all .4s linear;
              }
              img:hover{
                -webkit-transform: scale(1.05,1.05);
                -moz-transform: scale(1.05,1.05);
                transform: scale(1.05,1.05);
              }
            }
          }
          .gameContainer3{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            cursor: pointer;
            div{
              width: 33%;
              height: 288px;
              // overflow: hidden;
              margin-right: 20px;
              &:nth-child(2){
                img{
                  height: 264px;
                  margin-top: -6px;
                }
              }
              &:last-child{
                margin: 0;
                img{
                  height: 245px;
                  bottom: -40px;
                }
              }
              
              img{
                width: 385px;
                height: 258px;
                position: relative;
                bottom: -27px;
                transition: all .4s linear;
                -moz-transition: all .4s linear;
                -webkit-transition: all .4s linear;
              }
              img:hover{
                -webkit-transform: scale(1.06,1.06);
                -moz-transform: scale(1.06,1.06);
                transform: scale(1.06,1.06);
              }
            }
          }
          
        }
        .gameContainer4{
          width: 100%;
          margin-top: 25px;
          padding-top: 50px;
          .mobileDetail{
            width: 1200px;
            margin: 0 auto;
            .mobileDetail1{
              display: flex;
              >div{
                width: 60%;
                &:last-child{
                  width: 40%;
                }
                h1{
                  color: #4B9BF2;
                  font-size: 46px;
                  font-weight:bold;
                  text-align: center;
                  // font-family:ShinYaLan;
                  margin-top: 35px;
                }
                h2{
                  color: #474747;
                  font-size: 36px;
                  // font-family:FZLanTingHei-DB-GBK;
                  font-weight:400;
                  text-align: center;
                  margin-top: 20px;
                }
                p{
                  line-height: 30px;
                  color: #505050;
                  font-size: 14px;
                  margin-top: 30px;
                  // font-family: FZLTHK;
                  font-weight: normal;
                }
                .someOne{
                  width: 100%;
                  display: flex;
                  margin-top: 40px;
                  div{
                    width: 50%;
                    text-align: center;
                    .loadCode{
                      display: inline-block;
                      height: 182px;
                      width: 182px;
                      background: url('/static/vnso/img/11-1.jpg') no-repeat;
                      background-size: cover;
                      padding: 6px;
                    }
                    .btn_code{
                      width: 209px;
                      height: 40px;
                      line-height: 40px;
                      color: #4b9bf2;
                      border: 1px solid #4b9bf2;
                      border-radius: 30px;
                      margin: 15px auto;
                    }
                   
                    span{
                      &:last-child{
                        display: inline-block;
                        width: 180px;
                        text-align: center;
                        line-height: 25px;
                        color: #505050;
                        font-size: 15px;
                        margin-top: 20px;
                        // font-family:FZLTHK;
                        i{
                          font-size: 12px;
                        }
                      }
                    }
                  }
                  
                }
                
              }
            }
          }
          .someDe{
            padding-top: 6px;
            padding-bottom: 38px;
            ul{
              display: flex;
              flex-wrap: wrap;
              width: 1200px;
              margin: 20px auto;
              li{
                width: 578px;
                height: 113px;
                margin-top: 20px;
                margin-left: 44px;
                text-align: right;
                padding-top: 10px;
                &:nth-child(odd){
                  margin-left: 0;
                  
                }
                span{
                  display: inline-block;
                  width: 78%;
                  padding: 10px 10px 0 10px;
                  &:first-child{
                    color: #5F6365;
                    font-size: 18px;
                    text-align: left;
                  }
                  &:last-child{
                    color: #5F6365;
                    font-size: 14px;
                    line-height: 25px;
                    text-align: left;
                  }
                }
                &:first-child{
                  background: url('/static/vnso/img/f1.png') no-repeat ;
                  background-size: 100% 100%;
                  margin-top: 0;
                }
                &:nth-child(2){
                  background: url('/static/vnso/img/f2.png') no-repeat ;
                  background-size: 100% 100%;
                  margin-top: 0;
                }
                &:nth-child(3){
                  background: url('/static/vnso/img/f3.png') no-repeat ;
                  background-size: 100% 100%;
                }
                &:last-child{
                  background: url('/static/vnso/img/f4.png') no-repeat ;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
      }
     .night{
        background:url(/static/vnso/img/index-main-bg-n.jpg) no-repeat center top;
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
        background: #ff0000 url(/static/vnso/img/ui-bg_gloss-wave_45_817865_500x100.png) 50% 50% repeat-x;
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
