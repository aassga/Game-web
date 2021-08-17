<template>
  <div class="new-home">
    <div class="container clearfloat">

      <!--通告区域-->
      <div class="notice clear-fix" @click="showTextModal()">
        <div class="notice-l">
          <i class="fa fa-fw fa-bullhorn"></i>
          最新通告
        </div>
        <div class="notice-content">
          <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()"
                   onmouseover="this.stop()"
                   style="color: #666666; font-size: 15px; line-height: 40px;overflow: hidden;height: 40px;">
            <span v-html="lantern"></span>
          </marquee>
        </div>
      </div>
      

      <!-- 左边 -->
      <div class="wrapL">
        <!-- 左边导航 -->
        <ul class="subnav" >
          <li v-for="(item,key) in wraplCtData1" :key="key">
            <a target="_blank" class="MustLogin" @click="$goPath('main',item)">
              <img :src="'/static/public/image/lottery/nico/png/'+item.id +'.png'" alt>
              <span class="sortName">{{item.name}}</span>
              <span class="des">{{item.title}}</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- 中间 -->
      <div class="wrapC">
        <div class="banner">
          <Carousel autoplay arrow='never' v-model="autoPlay" loop >
            <CarouselItem v-for="(item,i) in carouselData" :key="i">
              <a  @click="activity">
                <img :src="item.img" style="height:250px;" alt>
              </a>
              <!-- <img @click="activity" :src="item.img" style="height:250px;" alt v-else> -->
            </CarouselItem>

        </Carousel>
        </div>
        
        <div class="autoTab">

          <ul class="hd clearfloat">
            <li :class="{on:hdActive==0}" @click="getResult({type:'jsk3',id:9});hdActive=0">江苏快３</li>
            <li :class="{on:hdActive==1}" @click="getResult({type:'wfk3',id:3632});hdActive=1">5分快3</li>
            <li :class="{on:hdActive==2}" @click="getResult({type:'sfk3',id:3631});hdActive=2">3分快3</li>
          </ul>

          <div class="bd" v-if="hdActive==0">
            <div class="shaizi">
              <label for="" :key="index" v-for="(item,index) in allReData[0].lastresultInfoArr">
                <span :class="'active'+item"></span><i v-if="index<2">+</i>
              </label>
              <i>=</i>
              <em>{{allReData[0].total}}</em>
            </div>

            <div class="bd-text">
              <p>
                <span>当前期：第<i>{{allReData[0].lastissue}}</i>期</span>
                <span>开奖号码：<i>{{allReData[0].lastresultInfo}}</i></span>
                <span>和值：<i>{{allReData[0].total}}</i></span>
                <span>形态：<a class="valueType">{{allReData[0].lastluzhuArr[0]}}</a><a class="valueType">{{allReData[0].lastluzhuArr[1]}}</a>
                                  </span>
              </p>
            </div>
          </div>

          <div class="bd" v-if="hdActive==1">
            <div class="shaizi">
              <label for="" :key="index" v-for="(item,index) in allReData[1].lastresultInfoArr">
                <span :class="'active'+item"></span><i v-if="index<2">+</i>
              </label>
              <i>=</i>
              <em>{{allReData[1].total}}</em>
            </div>

             <div class="bd-text">
              <p>
                <span>当前期：第<i>{{allReData[1].lastissue}}</i>期</span>
                <span>开奖号码：<i>{{allReData[1].lastresultInfo}}</i></span>
                <span>和值：<i>{{allReData[1].total}}</i></span>
                <span>形态：<a class="valueType">{{allReData[1].lastluzhuArr[0]}}</a><a class="valueType">{{allReData[1].lastluzhuArr[1]}}</a>
                                  </span>
              </p>
            </div>
          </div>

          <div class="bd" v-if="hdActive==2">
            <div class="shaizi">
              <label for="" :key="index" v-for="(item,index) in allReData[2].lastresultInfoArr">
                <span :class="'active'+item"></span><i v-if="index<2">+</i>
              </label>
              <i>=</i>
              <em>{{allReData[2].total}}</em>
            </div>

             <div class="bd-text">
              <p>
                <span>当前期：第<i>{{allReData[2].lastissue}}</i>期</span>
                <span>开奖号码：<i>{{allReData[2].lastresultInfo}}</i></span>
                <span>和值：<i>{{allReData[2].total}}</i></span>
                <span>形态：<a class="valueType">{{allReData[2].lastluzhuArr[0]}}</a><a class="valueType">{{allReData[2].lastluzhuArr[1]}}</a>
                                  </span>
              </p>
            </div>
          </div>

        </div>


      </div>
      <!-- 右边 -->
      <div class="wrapR">
        <!-- 登录前 -->
        <div class="login-after" v-if="!userinfo">
          <a @click="login" href='javascript:void(0)'>登录</a>
          <a @click="register" href='javascript:void(0)'>用户注册</a>
        </div>

        <!-- 登陆后 -->
        <div class="login-before" v-else>
          <h3>欢迎您，{{userinfo.userName}}</h3>
          <a class="loginout" @click="logout">
            <em>退出</em>
            <i class="el-icon-close"></i>
          </a>
        </div>

        <div class="slide">
          <div class="yesterDay"> 
            <h6>昨日奖金榜</h6>
            <table>
              <tr v-for="(item,index) in yesterDay" :key="index" @mouseenter="getName(item,'y')" >
                <td>
                  <img :src="item.ico" alt>
                  <p>
                    帐号昵称：
                    <span>{{item.account}}***</span>
                    <br>昨日奖金：
                    <i>{{item.out}}</i>
                  </p>
                </td>
                <td>
                  <ins :class="'oneIns'+ item.id">{{item.id}}</ins>
                </td>
              </tr>
            </table>
            <div class="infoContainer1">
              <div class="showInfo1">
                <!-- <div class="loading" v-if="showLoading">加载中...</div> -->
                <div>
                  <span><img :src="itemInfo.ico" ></span>
                  <span>昵称未设置</span>
                </div>
                <div>
                  <span>性别：保密</span>
                  <span>账号：{{itemInfo.account}}***</span>
                  <span>等级：{{level}}</span>
                  <span>头衔：{{name}}</span>
                  <span>累计中奖：{{itemInfo.out}}</span>
                </div>
                
              </div>
              <div class="iconList">
                <ul>
                  <li v-for="(i,v) in iconList2" :key="v"><img :src="i.img" @click="changePath(i.link)" ></li>
                </ul>
              </div>
          </div>
        </div>

        <div class="winningList" >
          <h6>中奖信息</h6>
          <div ref="parents" style="overflow:hidden">
            <ul ref="slideNav" class="winerList" :style="slideShow">
              <li class="clearfloat" v-for="(item,key) in scrollDatas" :key="key" @mouseenter="getName(item,'x')">
                <img :src="item.ico">
                <p class="color">
                  {{item.account}}**** {{item.name}}
                  <br>喜中
                  <span>¥{{item.out}}</span>
                </p>
              </li>
            </ul>
            
            <div  class="infoContainer" >
              <div class="showInfo">
                <!-- <div class="loading" v-if="showLoading">加载中...</div> -->
                <div>
                  <span><img :src="itemInfo.ico" ></span>
                  <span>昵称未设置</span>
                </div>
                <div>
                  <span>性别：保密</span>
                  <span>账号：{{itemInfo.account}}***</span>
                  <span>等级：{{level}}</span>
                  <span>头衔：{{name}}</span>
                  <span>累计中奖：{{itemInfo.out}}</span>
                </div>
                
              </div>
              <div class="iconList">
                <ul>
                  <li v-for="(i,v) in iconList2" :key="v"><img :src="i.img" @click="changePath(i.link)" ></li>
                </ul>
              </div>
              
            </div>
            
            </div>
            
          </div>
        </div>
        
      </div>
    </div>

    <!-- svg动画 -->
    <div class="home-svg" v-if="svgShow">
      <embed type="image/svg+xml" src="../../../../static/tycp/img/loading.svg">
    </div>
    <Modal
      :scrollable="true"
      title="网站公告"
      ok-text="关闭"
      v-model="showPopout"
      width="657"
      class="vp-popout-box"
    >
      <div class="popout-box">
        <span v-html="popups"></span>
      </div>
    </Modal>
    <div class="my-modal" v-show="ifLogin">
      <div class="bg"></div>
      <div class="my-modal-content">
        <div class="my-register">注册帐号</div>
        <vp-admin-index></vp-admin-index>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
import vpAdminIndex from '../../public/tradition/components/admin'
export default {
  data() {
    return {
      // showLoading:true,
      showInfoWin:false,
      showInfoWin1:false,
      num:0,
      itemInfo:[],
      level:"",
      name:"",
      lanternData: "",
      showimg: false,
      svgShow: true,
      showPopout: false,
      popups: "",
      autoPlay:0,
      carouselData: [],
      imgsrc:"/static/klk/img/pcAlert.png",
      lantern:'',
      wraplCtData1: [],
      hdActive: 0,
      // 滚动名单
      random: [
        {
          account: "",
          name: "江苏快3",
          ico: "/static/tycp/img/home/slder1.jpg",
          out: 0
        },
        {
          account: "",
          name: "快速快3",
          ico: "/static/tycp/img/home/slder.jpg",
          out: 0
        },
        {
          account: "",
          name: "5分六合彩",
          ico: "/static/tycp/img/home/slder2.jpg",
          out: 0
        },
        {
          account: "",
          name: "快乐飞艇",
          ico: "/static/tycp/img/home/slder3.jpg",
          out: 0
        },
        // {
        //   account: "",
        //   name: "北京赛车",
        //   ico: "/static/tycp/img/home/slder4.jpg",
        //   out: 0
        // },
        {
          account: "",
          name: "香港赛马",
          ico: "/static/tycp/img/home/slder5.jpg",
          out: 0
        },
        {
          account: "",
          name: "快乐赛车",
          ico: "/static/tycp/img/home/td1.jpg",
          out: 0
        },
        {
          account: "",
          name: "欢乐生肖",
          ico: "/static/tycp/img/home/slder6.jpg",
          out: 0
        },
        // {
        //   account: "",
        //   name: "广东11选5",
        //   ico: "/static/tycp/img/home/slder7.jpg",
        //   out: 0
        // },
        {
          account: "",
          name: "3分时时彩",
          ico: "/static/tycp/img/home/slder8.jpg",
          out: 0
        },
        {
          account: "",
          name: "快速六合彩",
          ico: "/static/tycp/img/home/slder9.jpg",
          out: 0
        },
        {
          account: "",
          name: "幸运赛车",
          ico: "/static/tycp/img/home/slder10.jpg",
          out: 0
        },
        {
          account: "",
          name: "3分快3",
          ico: "/static/tycp/img/home/slder11.jpg",
          out: 0
        },
        {
          account: "",
          name: "5分快3",
          ico: "/static/tycp/img/home/slder12.jpg",
          out: 0
        }
      ],
      iconList2:[],
      timer: null,
      iconList:[
        {img:"/static/tycp/img/home/1.svg",id:16,link:"/home/caipiao/88?par=3"},
        {img:"/static/tycp/img/home/2.svg",id:12,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/3.svg",id:4,link:"/home/caipiao/88?par=4"},
        {img:"/static/tycp/img/home/4.svg",id:27,link:"/home/caipiao/88?par=5"},
        {img:"/static/tycp/img/home/5.svg",id:17,link:"/home/caipiao/88?par=6"},
        {img:"/static/tycp/img/home/6.svg",id:13,link:"/home/caipiao/88?par=7"},
        {img:"/static/tycp/img/home/7.svg",id:9,link:"/home/caipiao/88?par=2"},
        // {img:"/static/tycp/img/home/8.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/9.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/10.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/11.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/12.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/13.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/14.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/15.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/16.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/17.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/18.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/19.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/20.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/21.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/22.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/23.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/24.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/25.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/26.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/27.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/28.svg",id:9,link:"/home/caipiao/88?par=2"},
        {img:"/static/tycp/img/home/29.svg",id:9,link:"/home/caipiao/88?par=2"},
      ],
      slideShow:{
        transform: 'translateY(-0px)',
      },
      yesterDay:[
        {account:"逆****",out:"923770",ico:"../../../../static/tycp/img/home/td1.jpg",id:1},
        {account:"龙***",out:"420732",ico:'../../../../static/tycp/img/home/slder8.jpg',id:2},
        {account:"赐****",out:"231702",ico:"../../../../static/tycp/img/home/slder1.jpg",id:3},
      ],
      scrollDatas: [],
      allReData: [
           {
            router: '#/plays/tradition/9',
            id: 9,
            type: 'jsk3',
            lastissue: '',
            lastresultInfo: '',
            lastresultInfoArr: '',
            lastluzhu: '',
            lastluzhuArr: '',
            total: ''
          },
          {
            router: '#/plays/tradition/3632',
            id: 3632,
            type: 'wfk3',
            lastissue: '',
            lastresultInfo: '',
            lastresultInfoArr: '',
            lastluzhu: '',
            lastluzhuArr: '',
            total: ''
          },
          {
            router: '#/plays/tradition/3631',
            id: 3631,
            type:'sfk3',
            lastissue: '',
            lastresultInfo: '',
            lastresultInfoArr: '',
            lastluzhu: '',
            lastluzhuArr: '',
            total: ''
          }
        ]
    
    };
  },
  methods: {
    changePath(link){
      this.$router.push(link)
    },
    hiddenInfo(e){
    },
    activity(){
      this.$router.push({ path: "/home/youhui" })
    },
    getName(q,t) {
      this.iconList2 = this.getRandomArrayElements(this.iconList,7);
      if(t == 'y'){
        this.showInfoWin1 = true;
      }else{
        this.showInfoWin = true;
      }
      this.itemInfo = {};
      this.itemInfo = q;
      var arr = ["星耀","钻石","皇冠", "水晶" ]; 
      var arr1 = ["VIP1","VIP2","VIP3", "VIP4","VIP5","VIP6", "VIP7" ]; 
      var index = Math.floor((Math.random()*arr.length));
      var index1 = Math.floor((Math.random()*arr1.length));
      this.level = arr[index];
      this.name = arr1[index1];
    },
    async getLeftData() {
      this.$http
        .post(`${this.$HOST_NAME}/gameSortNew`, {
          id: 30001,
          device: "pc"
        })
        .then(res => {
          if(res && res.code == 200){
            let arr = res.data[30001].slice(0,10);
            this.wraplCtData1 = arr;
          }
          
        });
      
    },
    //注册
    register () {
        this.$store.commit('alert/showLogin', true)
        this.$store.commit('alert/setChooseModel', '注册帐号')
        this.$store.commit('alert/setLoginTitle', '注册帐号')
    },
    // 新文字走马灯接口
    async getLantern () {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: 'lantern',
        // desc_client_type: 'html'
        client_type:"PC"
      })
      if (res && res.code == 200) {
        // if (!res.data.data.length) return false
        // this.lantern = res.data.data[0] && res.data.data[0].description

        if(res.data.data.length){
          this.lantern = res.data.data[0] && res.data.data[0].description
        }else{  
          return false;
        }

      }
      // 参数： type: lantern 走马灯
      // 参数： type: popups 弹窗
      // 参数： type: notice 提示
    },
    login(){
        this.$router.push({ path: "/home/login" });
    },
    close() {
      this.showimg = false;
    },
    goto(id) {
      if (localStorage.token) {
        if (localStorage.Public_User == "test") {
          this.dNotify("彩票暂无试玩,立即注册", "error");
        } else {
          var newitem = "#/plays/tradition/"+ id;
          window.open(newitem)
        }
      } else {
        this.$router.push({ path: "/home/login" });
      }
    },
    //获取banner
    async getBanner() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
        position: "banner",
        clientType: "pc"
      });
      if (res && res.code == 200) {
        this.carouselData = res.data[0] && res.data[0].body;
      }
    },

    async getResult(item) {
      let res = await this.$http.get(
        `${this.$HOST_NAME}/lottery/getIssue/${item.id}`,
        {}
      );
      if (res && res.code == 200) {
        switch (item.type) {
          case 'jsk3':
            this.allReData[0].lastissue = (res.data.lastissue).toString().length>8 ? (res.data.lastissue).toString().slice(4) : res.data.lastissue
            this.allReData[0].lastresultInfo = res.data.lastresultInfo
            this.allReData[0].lastresultInfoArr = res.data.lastresultInfo.split(
              ','
            )
            this.allReData[0].total =
              parseInt(this.allReData[0].lastresultInfoArr[0]) +
              parseInt(this.allReData[0].lastresultInfoArr[1]) +
              parseInt(this.allReData[0].lastresultInfoArr[2])
            this.allReData[0].lastluzhu = res.data.lastluzhu
            this.allReData[0].lastluzhuArr = res.data.lastluzhu.split(',')
            break
          case 'wfk3':
            this.allReData[1].lastissue = (res.data.lastissue).toString().length>8 ? (res.data.lastissue).toString().slice(4) : res.data.lastissue
            this.allReData[1].lastresultInfo = res.data.lastresultInfo
            this.allReData[1].lastresultInfoArr = res.data.lastresultInfo.split(
              ','
            )
            this.allReData[1].total =
              parseInt(this.allReData[1].lastresultInfoArr[0]) +
              parseInt(this.allReData[1].lastresultInfoArr[1]) +
              parseInt(this.allReData[1].lastresultInfoArr[2])
            this.allReData[1].lastluzhu = res.data.lastluzhu
            this.allReData[1].lastluzhuArr = res.data.lastluzhu.split(',')
            break
          case 'sfk3':
            this.allReData[2].lastissue = (res.data.lastissue).toString().length>8 ? (res.data.lastissue).toString().slice(4) : res.data.lastissue
            this.allReData[2].lastresultInfo = res.data.lastresultInfo
            this.allReData[2].lastresultInfoArr = res.data.lastresultInfo.split(
              ','
            )
            this.allReData[2].total =
              parseInt(this.allReData[2].lastresultInfoArr[0]) +
              parseInt(this.allReData[2].lastresultInfoArr[1]) +
              parseInt(this.allReData[2].lastresultInfoArr[2])
            this.allReData[2].lastluzhu = res.data.lastluzhu
            this.allReData[2].lastluzhuArr = res.data.lastluzhu.split(',')
            break

        }
        this.svgShow = false;

      }
    },
    setNavCurr() {
      this.$store.commit("setCurr", 1);
      this.$router.push("/home/youhui");
    },
    logout() {
      UserService.logout.call(this);
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
    },
    // 选出随机
    getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }
  },
  components: {
    vpAdminIndex,
  },
  created() {
    if(localStorage.zhuce){
      if(!localStorage.token){
        this.register();
        localStorage.removeItem("zhuce");
      }
    };
    this.getLantern();
    setTimeout(() => {
      if(localStorage.register){
        this.$store.commit('alert/showLogin', true);
        this.$store.commit('alert/setChooseModel', '注册帐号');
        this.$store.commit('alert/setLoginTitle', '注册帐号');
        localStorage.removeItem('register')
      }
    }, 2000);
    
    
    let chars = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "j",
      "k",
      "-",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];

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
        Math.ceil(Math.random() * 1000) *
        Math.pow(
          arr[Math.floor(Math.random() * arr.length)],
          arr[Math.floor(Math.random() * arr.length)]
        );
      item.account = generateMixed(3);
    });
    this.scrollDatas = datas;
  },
  mounted() {
    this.getLeftData();
    this.getResult({ type: "jsk3", id: 9 });
    this.getResult({ type: "wfk3", id: 3632 });
    this.getResult({ type: "sfk3", id: 3631 });
    this.getBanner();
    this.getLanternList();
    this.timer = setInterval(() => {
      this.num = this.num + 58;
      if( this.num == 2726){
        this.num = 0;
      }
      this.slideShow = {
        transform: 'translateY(-'+ this.num +'px)',
      }
    }, 3500);
    

  },
  beforeDestroy() {
    if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
        clearInterval(this.timer); //关闭
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.mainState.userinfo;
    },
    // 是否提示信息
    tipDatas () {
      return this.$store.state.alert.tipModel;
    },
    // 是否显示登录
    ifLogin () {
      return this.$store.state.alert.login.ifLogin;
    },
    // 登录注册标题切换
    modelTitle () {
      return this.$store.state.alert.login.modelTitle;
    }
  },
  
  store
};
</script>

<style lang="less" scoped>
@keyframes animatesub {
  0% {
    top: 0;
  }
  100% {
    top: -2000px;
  }
}

.new-home {
  padding-top: 45px;
  padding-bottom: 10px;
  position:relative;
  .container {
    width: 1000px;
    margin: 0 auto;
    
      .notice {
        position:absolute;
        top:0;
        width:1000px;
        height: 40px;
        line-height: 40px;
        left:50%;
        transform:translateX(-50%);
        .notice-l {
          width: 100px;
          color: red;
          font-size: 14px;
          font-weight: 600;
          float: left;

          > i.fa {
            display: inline-block;
            font-size: 20px;
            width: 34px;
            height: 25px;
            background: url(/static/tycp/img/noticeIcon.png);
            position: relative;
            top: 7px;
          }
        }

        .notice-content {
          width: 900px;
          height: 40px;
          float: left;
          padding-right:4px;
        }
      }

    .wrapL {
      width: 232px;
      background: #fffdf3;
      border: 1px solid #e6c9a0;
      border-top: 3px solid #e6c9a0;
      float: left;
      height: 468px;

      .lotteryMenuTop {
        .ltbtn {
          // display: inline-block;
          float: left;
          width: 50%;
          height: 30px;
          text-align: center;
          position: relative;
          font-size: 15px;
          color: #333;
          font-weight: 700;
          line-height: 29px;
          border-bottom: 1px solid #f4f1d9;
          border-top: 1px solid #f4f1d9;
          cursor: pointer;
        }

        .active {
          border-left: 1px solid #f4f1d9;
          color: #333;
        }

        .active::before {
          content: "";
          width: 100%;
          height: 3.5px;
          display: inline-block;
          position: absolute;
          top: -3.5px;
          left: 0;
          background: #e4393c;
        }

        .ctbtn {
          border-left: 1px solid #f4f1d9;
        }
      }

      .subnav {
        li {
          height: 46.4px;
          line-height: 46px;
          border-bottom: 1px dashed #ddd;
          padding: 2px 7px;

          &:last-child {
            border-bottom: none;
          }

          a {
            display: block;
            height: 100%;

            img {
              // margin: 2px 5px;
              // width: 38px;
              // height: 38px;
              width:36px;
              height:36px;
              margin:2px 5px 5px 2px;
              display: inline-block;
            }

            .sortName {
              margin-right: 5px;
              margin-bottom: 10px;
              vertical-align: top;
              font-size: 14px;
              color: #333;
              font-weight: 700;
            }

            .des {
              margin-right: 5px;
              margin-bottom: 10px;
              vertical-align: top;
              color: #999;
              font-size: 12px;
              font-weight: 100;
            }
          }
        }

        li:hover {
          img {
            transition: 0.5s;
            transform: rotate(1turn);
            // transform-origin: 17px 25px;
          }
        }
      }
    }

    .wrapC {
      width: 488px;
      margin-left: 13px;
      float: left;
      height: 468px;

      .banner {
        height: 251px;
        overflow: hidden;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .autoTab {
        height: 204px;
        margin-top: 13px;
        border: 1px solid #d7e2f7;
        box-sizing: border-box;

        .hd {
          li {
            width: 33.33333%;
            text-align: center;
            line-height: 30px;
            background: #edf7ff;
            border-top: 1px solid #fff;
            border-bottom: 1px solid #d7e2f7;
            box-sizing: border-box;
            cursor: pointer;
            float: left;
            font-size: 12px;
            color: #666;
          }

          .on {
            border-top: 2px solid #e4393c;
            background: #fff;
            border-bottom: none;
            margin-top: -1px;
          }
        }

        .bd {
          .shaizi {
            margin-top: 32px;
            text-align: center;

            span {
              display: inline-block;
              background: url("../../../../static/tycp/img/home/open_num.png");
              width: 60px;
              height: 60px;
              vertical-align: middle;

              &.active1 {
                background-position-y: 0px;
              }

              &.active2 {
                background-position-y: -60px;
              }

              &.active3 {
                background-position-y: -120px;
              }

              &.active4 {
                background-position-y: -180px;
              }

              &.active5 {
                background-position-y: -240px;
              }

              &.active6 {
                background-position-y: -305px;
              }
            }

            i {
              font-size: 25px;
              vertical-align: middle;
              color: #999;
              margin: 10px;
            }

            em {
              font-size: 25px;
              color: #333;
              vertical-align: middle;
              margin: 3px;
            }
          }

          .bd-text {
            margin-top: 20px;

            p {
              text-align: center;
              font-size: 12px;

              span {
                margin-right: 14px;

                i {
                  color: red;
                  margin: 0 3px;
                }

                a {
                  display: inline-block;
                  width: 18px;
                  height: 18px;
                  line-height: 18px;
                  color: #fff;
                  background: #ff9726;
                  border-radius: 2px;
                  margin-right: 6px;
                }

                a + a {
                  background: #5691d7;
                }
              }

              span:last-child {
                margin: 0;
              }
            }
          }

          .kslhc {
            .number {
              padding-top: 26px !important;
              em {
                border-radius: 0 !important;
                border: none !important;
                width: 30px !important;
                height: 30px !important;
                display: inline-block;
                text-align: center;
                font-weight: 100;
                margin: 0 5px;
                cursor: default;
                font-size: 18px !important;
                line-height: 30px !important;
                text-align: center;
                &.Blue {
                  background: #1c8ce2;
                }

                &.Red {
                  background: #bc2a1b;
                }

                &.Green {
                  background: #49bb27;
                }

                &:nth-child(6) {
                  // margin-right: 30px;
                }
              }
            }

            .mainColorBtn {
              margin-top: 18px !important;
            }
          }

          .pk10 {
            .number {
              padding-top: 26px !important;

              em {
                width: 30px !important;
                height: 30px !important;
                font-size: 18px !important;
                line-height: 30px !important;
                border-radius: 0 !important;
                border: none !important;

                &.pkActive01 {
                  background: #e6de0b;
                }

                &.pkActive02 {
                  background: #4b84f8;
                }

                &.pkActive03 {
                  background: #4c4c4c;
                }

                &.pkActive04 {
                  background: #d86f1a;
                }

                &.pkActive05 {
                  background: #80e7e6;
                }

                &.pkActive06 {
                  background: #4403f3;
                }

                &.pkActive07 {
                  background: #dfdfdf;
                }

                &.pkActive08 {
                  background: #d10108;
                }

                &.pkActive09 {
                  background: #650000;
                }

                &.pkActive10 {
                  background: #73c32e;
                }
              }
            }

            .mainColorBtn {
              margin-top: 18px !important;
            }
          }

          .cqssc {
            text-align: center;

            .number {
              float: left;
              padding-top: 45px;
              padding-left: 40px;

              em {
                border: 1px solid #b13032;
                background: linear-gradient(180deg, #e46062 2%, #c72c2e);
                font-size: 30px;
                color: #fff;
                border-radius: 50%;
                width: 41px;
                height: 41px;
                display: inline-block;
                line-height: 41px;
                text-align: center;
                font-weight: 100;
                margin: 0 5px;
                cursor: default;
              }
            }

            .mainColorBtn {
              display: inline-block;
              line-height: 30px;
              color: #fff !important;
              padding: 0 15px;
              border-radius: 3px;
              font-size: 14px;
              margin-right: 10px;
              min-width: 55px;
              text-align: center;
              cursor: pointer;
              background: #e4393c;
              margin: 10px 0;
              margin-top: 51px;
            }
          }
        }
      }
    }

    .wrapR {
      float: left;
      width: 252px;
      height: 472px;
      margin-left: 13px;
      position: relative;
      .login-after {
        height: 44px;

        a {
          display: inline-block;
          width: 117.5px;
          text-align: center;
          background: #fff9dd;
          line-height: 42px;
          color: #e4393c;
          font-size: 16px;
          font-weight: 700;
          border: 1px solid #ebd4b3;
          box-sizing: border-box;
          border-radius: 2px;
        }

        a:nth-child(2) {
          margin-left: 12px;
        }
      }

      .login-before {
        padding: 0 15px;
        height: 44px;
        background: #fffdf3;
        border-radius: 2px;
        border: 1px solid #ebd4b3;
        border-top: 3px solid #ebd4b3;
        position: relative;

        h3 {
          line-height: 26px;
          text-align: center;
          margin: 7px;
          font-size: 14px;
          color: #36c;
          font-weight: bolder;
        }

        .loginout {
          width: 45px;
          height: 15px;
          line-height: 15px;
          display: inline-block;
          cursor: pointer;
          border: none;
          position: absolute;
          z-index: 2;
          top: 12px;
          right: 10px;
          line-height: 15px;
          padding-left: 5px;
          border-radius: 2px;
          font-size: 12px;
          color: #ccc;

          em {
            color: #fff;
          }
        }

        .loginout:hover {
          background: #d8d8d8;

          i {
            color: #fff;
          }
        }
      }

      .slide {
        border: 1px solid #dce1e5;
        margin-top: 13px;
        
        h6 {
          margin: 0;
          padding: 0 8px;
          line-height: 30px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          font-weight: 600;
        }

        table {
          margin: 5px 0;
          height: 152px;
          position: relative;
          border-collapse: collapse;
          border-spacing: 0;
          z-index: 12;
          tr {
            height: 50px;
            border-bottom: 1px dashed #ccc;
            cursor: pointer;
            td {
              text-align: left;
              padding: 7px 15px;
              padding-right: 12px;
              border-right: none;
              vertical-align: middle;

              img {
                height: 36px;
                width: 36px;
                float: left;
                border-radius: 50%;
                margin-right: 9px;
                transition: 0.5s;
              }

              p {
                margin: 0;
                margin-top: 0;
                line-height: 1.7;
                height: 36px;
                font-size: 12px;

                i {
                  color: red;
                }
              }

              ins {
                display: block;
                width: 25px;
                height: 25px;
                margin: 0 auto;
                text-decoration: none;
                vertical-align: middle;
                color: #fff;
                border-radius: 50%;
                text-align: center;
                line-height: 25px;
              }

              .oneIns1 {
                background: radial-gradient(
                  circle at 25px 25px,
                  #c12f33,
                  #ca9293
                );
              }

              .oneIns2 {
                background: radial-gradient(
                  circle at 25px 25px,
                  #2b82cc,
                  #53b0fe
                );
              }

              .oneIns3 {
                background: radial-gradient(
                  circle at 25px 25px,
                  #c57532,
                  #f8a968
                );
              }
            }

            td:first-child {
              width: 280px;
            }
          }
        }
        .yesterDay:hover .infoContainer1{
          display: block;
        }
      }
      .iconList{
        background: #eaeaea;
        padding:6px 5px;
        width: 275px;
        box-shadow: 3px 3px 7px #888888;
        ul{
          display: flex;
          flex-wrap: nowrap;
          li{
            margin: 5px;
            border-radius: 50%;
            width: 35px;
            overflow: hidden;
            
          }
        }
      }
      .infoContainer{
        position: absolute;
        left: -280px;
        top: 279px;
        height: 200px;
        width: 542px;
        z-index: 1;
        display: none;
      }
      .infoContainer1{
        position: absolute;
        left: -280px;
        top: 80px;
        height: 183px;
        width: 542px;
        z-index: 10;
        display: none;
      }
      .showInfo1{
        background: #fff;
        height: 140px;
        width: 275px;
        z-index: 99;
        overflow: hidden;
        box-shadow: 2px 2px 10px #888888;
        display: flex;
        flex-wrap: nowrap;
        .loading{
          position: absolute;
          height: 172px;
          width: 250px!important;
          background: #fff;
          line-height: 172px!important;
          text-align: center;
          color: #666!important;
        }
        div{
          width: 50%;
          text-align: left;
          line-height: 25px;
          font-size: 14px;
          &:last-child{
            margin-top: 10px;
            span{
              display: block;
              margin-left: 30px;
              width: 100%;
            }
          }
          
          &:first-child{
            width: 41%;
            line-height: 44px;
            text-align: center;
            color: deepskyblue;
            span{
              display: block;
              margin-left: 26px;
              margin-top: 13px;
              &:first-child{
                width: 85px;
                height: 85px;
                overflow: hidden;
                border-radius: 50%;
              }
              &:last-child{
                margin-top: 3px;
              }
            }
            img{
              width: 100px;
            }
          }
        }
      }
      .showInfo{
        background: #fff;
        height: 140px;
        width: 275px;
        overflow: hidden;
        box-shadow: 2px 2px 10px #888888;
        display: flex;
        flex-wrap: nowrap;
        margin-top: 10px;
        .loading{
          position: absolute;
          height: 172px;
          width: 250px!important;
          background: #fff;
          line-height: 172px!important;
          text-align: center;
          color: #666!important;
        }
        div{
          width: 50%;
          text-align: left;
          line-height: 25px;
          font-size: 14px;
          &:last-child{
            margin-top: 10px;
            span{
              display: block;
              margin-left: 30px;
              width: 100%;
            }
          }
          
          &:first-child{
            width: 41%;
            line-height: 40px;
            text-align: center;
            color: deepskyblue;
            span{
              display: block;
              margin-left: 26px;
              margin-top: 13px;
              &:first-child{
                width: 85px;
                height: 85px;
                overflow: hidden;
                border-radius: 50%;
              }
              &:last-child{
                margin-top: 3px;
              }
            }
            img{
              width: 100px;
            }
          }
        }
      }
      .winningList {
        margin-top: 13px;
        border: 1px solid #dce1e5;
        height: 204px;
        overflow: hidden;
        h6 {
          margin: 0;
          padding: 0 8px;
          line-height: 30px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          font-weight: 600;
        }

        .winerList {
          position: relative;
          transition: .5s linear;
          z-index: 2;
          
          li {
            height: 58px;
            cursor: default;
            padding: 10px 15px 0 15px;
            &:hover{
              cursor: pointer;
            }
            img {
              height: 36px;
              width: 36px;
              border-radius: 50%;
              float: left;
              margin-top: 2px;
              margin-right: 9px;
              transition: 0.5s;
            }

            p {
              margin: 0;
              float: left;
              line-height: 1.7;
              font-size: 12px;

              span {
                color: #f63745;
                margin: 0 5px;
              }
            }
          }
        }
        &:hover .infoContainer{
          display: block;
        }
      }
    }
  }

  .home-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 820px;
    text-align: center;
    line-height: 820px;
    background: #fff;
    z-index: 1001;
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
}

.guanbi img {
  position: relative;
}
.guanbi /deep/ .ivu-modal-footer {
  display: none;
}
.guanbi /deep/ .ivu-modal-body {
  padding: 0 !important;
  height: 546.67px;
}
.guanbi /deep/ .ivu-modal-close {
  display: none;
}
.guanbi /deep/ .ivu-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -328px;
  margin-top: -273px;
}
.guanbi .close {
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  top: 3px;
  right: 3px;
  cursor: pointer;
}

.my-modal {
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;

  .bg {
  z-index: 9998;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
    background-color: rgba(0,0,0,0.36)
  }
  .my-modal-content {
    max-width: 750px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 9999;
    background-color: #fff;
    // padding: 5% 0;
    border-radius: 10px;

    .vp-admin-wrap{
      padding: 116px 0 0px;
    }

    .my-register{
        position: absolute;
        font-size: 20px;
        line-height: 20px;
        color: #333;
        font-weight: normal;
        border-bottom: 2px solid #FF0024;
        padding: 20px 10px 20px 10px;
        top:0px;
        left: 30px;
        z-index: 99;
    }
  }
}
</style>
