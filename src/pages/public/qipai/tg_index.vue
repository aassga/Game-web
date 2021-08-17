<template>
    <div id="maincontainer">
        <div class="banner">
            <img src="/static/public/image/game/new_games/qp_banner.png" alt="" />
        </div>
        <div class="content">
            <!-- 一级导航 -->
            <div class="list_nav">
                <ul>
                    <li v-for="(item, index) in list_nav" :key="index" :class="[nav_active == item.id ? 'active' : '']" @click="setNav(item)"><p>{{item.name}}</p></li>
                </ul>
                <div class="seek">
                    <img src="/static/klk/img/new_games/coin-l.png" alt="">
                    <input type="text" placeholder="请输入游戏名称" ref="inputVal" v-model="iptVal" @keyup.enter="search()">
                    <a href="javascript:void(0);" @click="search()">
                        <i></i>
                    </a>
                </div>
            </div>
            <!-- 平台导航 -->
            <div class="content_box" v-show="nav_active == 9">
                <div class="list_gams" v-show="nav_active == 9">
                    <ul>
                        <li v-for="(item,index) in listDatas.platform" :key="index">
                            <div :class="['gams_list',active == item.id ? 'active' : '']" @click="setGameMaker(item)">
                                <img :src="'/static/klk/img/new_games/new_icon'+ (active == item.id ? '_a/' : '/') + item.id+'.png'" :alt="index">
                                <p>{{item.name}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 推荐游戏 -->
            <div class="content_boxer" v-show="nav_active !=9">
                <!-- <img src="/static/public/image/game/new_games/coin-bg.png" class="img_bg" alt=""> -->
                <div class="title_line" v-show="nav_active != 9"><img src="/static/klk/img/new_games/tjyx.png" alt=""></div>
                <div class="list_gamser" v-show="nav_active != 9">
                    <span class="slidePrev" @click="setSwiper(5)"><i></i></span>
                    <swiper :options="swiperOption2" ref="mySwiper2">
                        <swiper-slide v-for="(item,index) in swiperList" :key="index">
                            <div class="gams_lister">
                                <ul class="img_boxer">
                                    <li v-for="(it, index) in item.list" :key="index">
                                        <img v-lazy="it.icon" alt="">
                                        <i v-show="it.Hot == 1"></i>
                                        <p>{{it.name}}</p>
                                        <div class="list_btn">
                                            <span class="begin" @click="loginGame(it)">开始游戏</span>
                                            <!-- <span class="collect" @click="joinCollect(it)">加入收藏</span> -->
                                            <!-- <span class="collectY" v-show="item.love == 'yes'" @click="cancelCollect(it)">取消收藏</span> -->
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </swiper-slide>
                    </swiper>
                    <span class="slideNext" @click="setSwiper(6)"><i></i></span>
                </div>
            </div>
            <!-- 展示列表 -->
            <div class="list_box">
                <div class="box">
                    <img src="/static/public/image/game/new_games/coin-r.png" class="img_l" alt="">
                    <img src="/static/public/image/game/new_games/coin-l1.png" class="img_r" alt="">
                    <ul class="list_type"  v-show="nav_active == 9 && GameTypeList.length>1">
                        <li class="top">游戏类型：</li>
                        <li v-for="(item, index) in GameTypeList" :key="index" :class="[gameType_active == item.id ? 'active' : '']" @click="setGameType(item)">{{item.name}}</li>
                    </ul>
                    <ol class="list_line"  v-show="nav_active == 9 && gameTitleList.length>1">
                        <li class="top">赔付线数：</li>
                        <li v-for="(item, index) in gameTitleList" :key="index" :class="[gameTitle_active == item.id ? 'active' : '']"  @click="setGameTitle(item)">{{item.name}}</li>
                    </ol>
                    <div class="title_line" v-show="nav_active != 9"><img :src="'/static/klk/img/new_games/'+this.showName+'_bg.png'" alt="" v-if="showName!=''"></div>
                    <div class="noSuit" v-show="searchListShow">
                        <span>未找到符合条件的相关游戏 , 以下是为您推荐的热门游戏</span>
                    </div>
                    <div class="noSuit" v-show="showGameList.length<1">
                        <span>—————————— 未找到符合条件的相关游戏 ——————————</span>
                    </div>
                    <ul class="img_box">
                        <li v-for="(item, index) in showGameList" :key="index">
                            <div class="itemBox">
                                <img v-lazy="item.icon" alt="">
                                <!-- <span>{{item.line}}线</span> -->
                            </div>
                            <i v-show="item.Hot == 1"></i>
                            <div class="textBox">
                                <span class="leftName">{{item.name}}</span>
                                <span class="rightName">{{idToName(item.upid)}}</span>
                            </div>
                            <div class="list_btn">
                                <span class="begin" @click="loginGame(item)">开始游戏</span>
                                <span class="collect" v-show="item.love == 'no'" @click="joinCollect(item,index)" :style="{background:'url(/static/klk/img/new_games/qxshoucang.png) center center no-repeat'}"></span>
                                <span class="collectY" v-show="item.love == 'yes'" @click="cancelCollect(item,index)" :style="{background:'url(/static/klk/img/new_games/shoucang.png) center center no-repeat'}"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { _SetGet, _SetPost ,postS, getS} from '@/service/public/service.js';
import UserService from '@/service/public/UserService.js';
import mixin from './public.js';

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    mixins: [mixin],
    components: {
        swiper,
        swiperSlide,
    },
    data() {
        return {
            listDatas:[],//总数据
            listData:[],
            jiazai:true,
            rollList: [],
            nav_show:'top',
            list_nav:[//一级导航
                {id:9,'name':'全部游戏'}
            ],
            swiperOption: {
                autoplay: {
                    delay: 3000,
                },
                loop: true,
                slidesPerView: 4,

                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            swiperOption1: {
                autoplay: {
                    delay: 3000,
                },
                loop: true,
                slidesPerView: 8,
            },
            swiperOption2: {
                autoplay: {
                    delay: 3000,
                },
                loop: true,
                slidesPerView: 1,
            },
            list_arr:[
                {id:50,"shu":5,"price":1235,"name":'******3215',"game":'吉祥如意',"src":"http://static.k0061.com/images/default/pc/50.png"},
                {id:2648,"shu":7,"price":2547,"name":'******22姬',"game":'赚金蛋JP',"src":"http://static.k0061.com/images/default/pc/2648.png"},
                {id:51,"shu":15,"price":1852,"name":'******1524',"game":'魔法球',"src":"http://static.k0061.com/images/default/pc/51.png"},
                {id:60,"shu":20,"price":5642,"name":'******5354',"game":'招財進寶',"src":"http://static.k0061.com/images/default/m/60.png"},
                {id:67,"shu":31,"price":30458,"name":'******飞天',"game":'海洋世界',"src":"http://static.k0061.com/images/default/m/67.png"},
                {id:71,"shu":3,"price":4253,"name":'******5593',"game":'猴寶寶',"src":"http://static.k0061.com/images/default/m/71.png"},
                {id:3463,"shu":11,"price":7568,"name":'******8954',"game":'激爆水果盘',"src":"http://static.k0061.com/images/default/pc/3463.png"},
                {id:3461,"shu":18,"price":10246,"name":'******0095',"game":'惑星战记',"src":"http://static.k0061.com/images/default/pc/3461.png"},
                {id:2648,"shu":9,"price":5621,"name":'******32了',"game":'赚金蛋JP',"src":"http://static.k0061.com/images/default/pc/2648.png"},
                {id:300,"shu":14,"price":2354,"name":'******玛14',"game":'西洋棋老虎机',"src":"http://static.k0061.com/images/default/pc/300.gif"},
                {id:53,"shu":21,"price":6874,"name":'******8465',"game":'魔鑽',"src":"http://static.k0061.com/images/default/pc/53.png"},
                {id:162,"shu":28,"price":823,"name":'******7951',"game":'五龙争霸',"src":"http://static.k0061.com/images/default/pc/162.jpg"},
                {id:2643,"shu":13,"price":4252,"name":'******静静',"game":'世界杯球場',"src":"http://static.k0061.com/images/default/pc/2643.png"},
                {id:167,"shu":6,"price":6035,"name":'******学li',"game":'舞狮报喜',"src":"http://static.k0061.com/images/default/pc/167.jpg"},
                {id:295,"shu":13,"price":3335,"name":'******4315',"game":'龙凤呈祥',"src":"http://static.k0061.com/images/default/pc/295.gif"}
            ],
            setInter: null,
            listDatas: [], //总数据
            listData: {}, //总数据里list 
            nav_active: 99,
            active:99,
            gameType_active: 99,
            gameTitle_active: 99,
            swiperList:[],//滚动展示列表
            GameListAll: [], //展示的游戏列表
            showGameList: [], //搜索数据
            GameMakerData: [], //游戏厂商
            gameTitleList: [],//游戏类型列表
            GameTypeList: [],
            collectList: [],
            showName:'',
            iptVal:'',
            searchListShow:false,//显示推荐热门
            searchList:[],
            
        };
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      swiper1() {
        return this.$refs.mySwiper1.swiper
      },
      swiper2() {
        return this.$refs.mySwiper2.swiper
      }
    },
    methods: {
        setSwiper(num){
            if(num === 1){
                this.swiper.slidePrev();
            }else if(num === 2){
                this.swiper.slideNext();
            }else if(num === 3){
                this.swiper1.slidePrev();
            }else if(num === 4){
                this.swiper1.slideNext();
            }else if(num === 5){
                this.swiper2.slidePrev();
            }else if(num === 6){
                this.swiper2.slideNext();
            }
        },
        //搜索
        async search() {
            this.searchListShow=false;
            if(this.iptVal){
                let gameList = [];
                let showList = [];
                if(this.$route.query.navid == 999) {
                if(sessionStorage.collectgames_chess){
                    showList = JSON.parse(sessionStorage.getItem("collectgames_chess"))
                    gameList =showList.filter(item => {
                        if (item.name.includes(this.iptVal)) {
                            return item;
                        }
                    });
                    this.showGameList = gameList
                }else{
                    this.searchListShow=true;
                    this.showGameList=this.searchList
                }
                }else{
                    if(sessionStorage.showgamelist){
                        showList = JSON.parse(sessionStorage.getItem("showgamelist"))
                    }
                    gameList =showList.filter(item => {
                        if (item.name.includes(this.iptVal)) {
                            return item;
                        }
                    });
                    if(gameList.length<1){
                        this.showGameList=this.searchList
                        this.searchListShow=true;
                    }else{
                        this.searchListShow=false;
                        this.showGameList = gameList
                    }
                }
                sessionStorage.setItem("searchlist", JSON.stringify(this.showGameList));
            }else{
                if(this.$route.query.navid == 999) {
                    if(sessionStorage.collectgames_chess){
                    this.searchListShow=false;
                    this.showGameList = JSON.parse(sessionStorage.getItem("collectgames_chess"))
                    }else{
                    this.searchListShow=true;
                    }
                }else{
                    if(sessionStorage.showgamelist){
                    let itemList = JSON.parse(sessionStorage.getItem("showgamelist"))
                    this.GameListAll = itemList;
                    this.showGameList= itemList
                    }
                }
            }
        },
        //获取全部参数 是否在session里 不在则获取
        async getAllDatas() {
            let allGame = sessionStorage.getItem("chessgame");
            let collectGame = sessionStorage.getItem("collectgames_chess");
            if (allGame) { // 有缓存,可以不用请求数据
                allGame = JSON.parse(allGame);
            } else {
                let res = await postS(`ChessFishSort`, { device: "pc",type:"1"});
                if (res && res.code === 200) {
                allGame = res.data;
                sessionStorage.setItem("chessgame", JSON.stringify(res.data));
                }
            }
            if (collectGame) { // 有缓存,可以不用请求数据
                collectGame = JSON.parse(collectGame);
            } else {
                let res = await postS(`memberCollectGames`,{type:"chess"});
                if (res && res.code === 200) {
                    collectGame = res.data;
                    sessionStorage.setItem("collectgames_chess", JSON.stringify(res.data));
                }
            }
            this.listDatas = allGame.list;
            if (this.listDatas.label.length > 0) {
                this.listDatas.label.forEach(val => {
                    if(val.name!='推荐游戏'){
                        this.list_nav.push(val)
                    }else{
                        if(val.list){
                            let swipList=val.list
                            for(let i=1;i<=Math.ceil(swipList.length/5);i++){
                                this.swiperList.push({'id':i,'list':swipList.slice((i-1)*5,i*5)})
                            }
                        }
                    }
                });
                for(var i=0;i<this.listDatas.label.length;i++){ //热门游戏列表
                    if(this.listDatas.label[i].name=='热门游戏'){
                        this.searchList=this.listDatas.label[i].list.slice(0,15)
                    }
                    this.searchList.forEach(val=>{
                        val.love="no"
                        if(sessionStorage.collectgames_chess){
                            let showsSearchList = JSON.parse(sessionStorage.getItem("collectgames_chess"))
                            for(let i=0;i<showsSearchList.length;i++){
                                if(showsSearchList[i].id== val.id){
                                    val.love="yes"
                                }
                            }
                        }
                      
                    })
                }
            }
            this.list_nav.push({
                name: "收藏游戏",
                id: 999
            });
            if (this.$route.query.navid) {
                this.list_nav.some(ele => {
                    if (ele.id == this.$route.query.navid) {
                        this.setNav(ele);
                        if(ele.name=="热门游戏"){
                            this.showName='hotgame';
                        }else if(ele.name=="最新游戏"){
                            this.showName='newgame';
                        }else if(ele.name=="牛牛游戏"){
                            this.showName='niuniugame';
                        }else if(ele.name=="百人游戏"){
                            this.showName='bairengame';
                        }else if(ele.name=="捕鱼游戏"){
                            this.showName='buyugame';
                        }else{
                            this.showName='999';
                        }
                    }
                });
            } else {
                this.setNav(this.list_nav[0]);
            }
        },
         //一级导航点击
        setNav(item) {
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            if (this.nav_active !== item.id) {
                this.searchListShow=false;
                this.nav_active = item.id;
                this.GameListAll = [];
                this.showGameList = [];
                this.iptVal='';
                //全部游戏
                if (item.id === 9) {
                    if (this.$route.query.id) {
                        this.listDatas.platform.some(ele => {
                            if (ele.id == this.$route.query.id) {
                                this.setGameMaker(ele);
                            }
                            window.scrollTo(0, scrollTop);
                        });
                    } else {
                        this.setGameMaker(this.listDatas.platform[0]);
                        window.scrollTo(0, scrollTop);
                    }
                }
                //收藏游戏
                else if (item.id == 999) {
                    this.showName='999',
                    this.getCollectList();
                    this.$router.push({ path: "/home/qipai", query: { navid: item.id } });
                    window.scrollTo(0, scrollTop);
                } else {
                    if(sessionStorage.collectgames_chess){
                        this.collectList=JSON.parse(sessionStorage.getItem("collectgames_chess")) 
                    }
                    if(item.name=="热门游戏"){
                        this.showName='hotgame';
                    }else if(item.name=="最新游戏"){
                        this.showName='newgame';
                    }else if(item.name=="牛牛游戏"){
                        this.showName='niuniugame';
                    }else if(item.name=="百人游戏"){
                        this.showName='bairengame';
                    }else if(item.name=="捕鱼游戏"){
                        this.showName='buyugame';
                    }
                    let itemList=item.list;
                    itemList.forEach(val=>{
                        val.love="no"
                        for(let i=0;i<this.collectList.length;i++){
                            if(this.collectList[i].id== val.id){
                                val.love="yes"
                            }
                        }
                    })

                    this.$router.push({ path: "/home/qipai", query: { navid: item.id } });
                    sessionStorage.setItem("showgamelist", JSON.stringify(itemList));
                    this.GameListAll = itemList;
                    this.showGameList = itemList;
                    window.scrollTo(0, scrollTop);
                }
            }
        },
        // 游戏厂商设置
        setGameMaker(item) {
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            this.searchListShow=false;
            this.active = item.id;
            this.GameMakerData = item;
            this.GameListAll = [];
            this.GameTypeList = [];
            this.$router.push({
                path: "/home/qipai",
                query: { navid: 9, id: item.id }
            });
            for (const key in this.GameMakerData.list) {
                this.GameTypeList.push(this.GameMakerData.list[key])
            }
            this.setGameType(this.GameMakerData.list[Object.keys(this.GameMakerData.list)[0]])
            window.scrollTo(0, scrollTop);
        },
        // 游戏类型设置
        setGameType(item) {
            this.gameTitleList = []
            this.gameType_active = item.id;
            for (const key in item.list) {
                this.gameTitleList.push(item.list[key])
            }
            this.setGameTitle(item.list[Object.keys(item.list)[0]])
        },
        // 游戏线数设置
        setGameTitle(item) {
            this.searchListShow=false;
            if(sessionStorage.collectgames_chess){
                this.collectList=JSON.parse(sessionStorage.getItem("collectgames_chess")) 
            }
            let itemList=item.list;
            itemList.forEach(val=>{
                val.love="no"
                for(let i=0;i<this.collectList.length;i++){
                    if(this.collectList[i].id== val.id){
                        val.love="yes"
                    }
                }
            })
            this.gameTitle_active = item.id
            this.GameListAll = itemList;
            sessionStorage.setItem("showgamelist", JSON.stringify(itemList));
            this.showGameList = itemList;
        }, 
        //加入收藏
        joinCollect(item,index) {
            if (!localStorage.token || !localStorage.userinfo) {
                this.$store.commit("alert/showTipModel", {
                bool: true,
                title: "请先登录",
                model: "",
                leftspan: true
                });
                return false;
            } else {
                let arr = [];
                this.listDatas.platform.forEach(ele => {
                let Obj = {
                    id: ele.id,
                    name: ele.name
                };
                arr.push(Obj);
                });
                let orName = "";
                arr.forEach(val => {
                if (Number.parseFloat(val.id) === Number.parseFloat(item.upid)) {
                    orName = val.name;
                }
                });
                this.$http
                .post(`${this.$HOST_NAME}/collectGame`, {
                    game_name: item.name,
                    game_desc: JSON.stringify({ ...item, love: "yes", orName: orName }),
                    type:"chess"
                })
                .then(res => {
                    if (res.code==200) {
                        // this.$store.commit("alert/newshowtip", {
                        //     bool: true,
                        //     title: `"${item.name}"游戏收藏成功！`,
                        //     model: "warn"
                        // });
                        if(this.iptVal){
                            let showList = JSON.parse(sessionStorage.getItem("searchlist"))
                            this.collectList.push(item);
                            showList[index].love="yes";
                            this.showGameList=showList
                        }else{
                            if(sessionStorage.showgamelist){
                                this.showList = JSON.parse(sessionStorage.getItem("showgamelist"))
                                this.showGameList =this.showList
                            }
                            this.collectList.push(item);
                            this.showGameList[index].love="yes";
                            this.GameListAll[index].love="yes";
                            sessionStorage.setItem("showgamelist", JSON.stringify(this.GameListAll));
                        }
                        sessionStorage.setItem("collectgames_chess", JSON.stringify(this.collectList));
                    } else if (res.code==400) {
                        // this.$store.commit("alert/newshowtip", {
                        //     bool: true,
                        //     title:  `"${item.name}"游戏已收藏！`,
                        //     model: "",
                        //     leftspan: true
                        // });
                    } else {
                        // this.$store.commit("alert/newshowtip", {
                        //     bool: true,
                        //     title: `"${item.name}"游戏收藏失败！`,
                        //     model: "",
                        //     leftspan: true
                        // });
                        // return false;
                    }
                });
            }
        },
        //取消收藏
        cancelCollect(item, index) {
            this.$http.post(`${this.$HOST_NAME}/deleteCollectGame`,{deleteids:item.id}).then(res => {
                if (res.code == 200) {
                    // this.$store.commit("alert/newshowtip", {
                    //     bool: true,
                    //     title: `"${item.name}"游戏取消收藏！`,
                    //     model: ""
                    // });
                    if(this.$route.query.navid == 999) {
                        if(this.iptVal){
                            let showList = JSON.parse(sessionStorage.getItem("searchlist"))
                            showList.splice(index, 1);
                            this.showGameList=showList;
                            for (var i=0;i<this.collectList.length;i++){
                                if (this.collectList[i].id==item.id){
                                    this.collectList.splice(i,1);
                                }    
                            }
                            sessionStorage.setItem("searchlist", JSON.stringify(this.showGameList));
                            sessionStorage.setItem("collectgames_chess", JSON.stringify(this.collectList)); 
                        }else{
                            this.collectList.splice(index, 1);
                            this.showGameList=this.collectList;
                            sessionStorage.setItem("collectgames_chess", JSON.stringify(this.collectList));
                        }
                        
                    }else{
                        if(this.iptVal){
                            if(this.searchListShow){
                                this.showList = JSON.parse(sessionStorage.getItem("searchlist"))
                                this.showGameList =this.showList
                                this.showGameList[index].love="no";
                            }else{
                                this.showGameList[index].love="no"; 
                            }
                        }else{
                            if(sessionStorage.showgamelist){
                                this.showList = JSON.parse(sessionStorage.getItem("showgamelist"))
                                this.showGameList =this.showList
                            }
                            this.showGameList[index].love="no";
                            this.GameListAll[index].love="no";
                            sessionStorage.setItem("showgamelist", JSON.stringify(this.GameListAll));
                        } 
                        for (var i=0;i<this.collectList.length;i++){
                            if (this.collectList[i].id==item.id){
                                this.collectList.splice(i,1);
                            }    
                        }    
                        sessionStorage.setItem("collectgames_chess", JSON.stringify(this.collectList));  
                    }      
                }else{
                    // this.$store.commit("alert/newshowtip", {
                    //     bool: true,
                    //     title: `"${item.name}"游戏取消收藏失败！`,
                    //     model: ""
                    // });
                }
            });
        },
        getCollectList() {
            this.searchListShow=false;
            if (!localStorage.token || !localStorage.userinfo) {
                this.$store.commit('alert/showTipModel', {
                    bool: true,
                    title: '请先登录',
                    model: '',
                    leftspan: true
                });
                this.GameListAll = [];
                this.showGameList = [];
                return false
            }else{
                this.$http.post(`${this.$HOST_NAME}/memberCollectGames`,{type:"chess"}).then(res => {
                if (res.code === 200) {
                    this.collectList = res.data;
                    sessionStorage.setItem("collectgames_chess", JSON.stringify(res.data));
                    if (this.$route.query.navid == 999) {
                        this.GameListAll = res.data;
                        this.showGameList = res.data;
                    }
                }
                });
            }
        },
        idToName: function(id) {
            if (id ==10015) {
                return id = 'AG'
            } else if(id ==10016){
                return id = 'BBIN'
            } else if(id ==10018){
                return id = 'CQ9'
            } else if(id ==10019){
                return id = 'DT'
            } else if(id ==10020){
                return id = 'FG'
            } else if(id ==10021){
                return id = 'JDB'
            } else if(id ==10022){
                return id = 'MG'
            } else if(id ==10023){
                return id = 'MW'
            } else if(id ==10024){
                return id = 'PT'
            } else if(id ==10025){
                return id = 'TTG'
            } else if(id ==10014){
                return id = 'AE'
            }else{
                return id = ''
            }
        }
    },
    created() {
        if(localStorage.userinfo||localStorage.token){
            this.showUserInfo=localStorage.userinfo
        }else{
            this.showUserInfo=''
            sessionStorage.removeItem("chessgame")
            sessionStorage.removeItem("collectgames_chess")
            sessionStorage.removeItem("searchlist")
        }
    },
    mounted() {
        this.getAllDatas()
    },
    destroyed() {
        sessionStorage.removeItem("chessgame")
        sessionStorage.removeItem("collectgames_chess")
        sessionStorage.removeItem("searchlist")
    },
    watch: {
        "$route.query.id"(newPath) {
            if (newPath === 0 || newPath) {
                this.listDatas.platform.some(ele => {
                if (ele.id == newPath) {
                    this.setGameMaker(ele);
                }
                });
            }
        }
    },
    beforeDestroy() {
        clearInterval(this.setInter);
    },
};
</script>

<style lang="less" scoped>
#maincontainer{
    .banner {
        position: relative;
        opacity: 1;

        img {
            width: 100%;
            margin: 0 auto;
            cursor: pointer;
        }
        ul{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            min-width: 1550px;
            height: 23%;
            background: url("/static/public/image/game/new_games/feature.png") center top;
            background-size: auto 100%;
            display: flex;
            font-size: 16px;
            justify-content: center;
            align-items: center;
            li{
                width: 17%;
                height: 55%;
                margin-top: 1.5%;
                text-align: center;
                p{
                    font-size: 24px;
                    margin-bottom: 10px;
                    color: #fff;
                }
                span{
                    font-size: 16px;
                    color: #FFB359;
                }
            }
        }
    }
    .content{
        width: 100%;
        height: auto;
        padding-top: 20px;
        padding-bottom: 20px;
        background: url("/static/public/image/game/new_games/bg.png") left top / 100% no-repeat;
        .list_user{
            position: relative;
            width: 1200px;
            height: 150px;
            margin:0 auto 20px auto;
            padding: 0 38px;
            display: flex;
            &>span{
                position: absolute;
                top: 0;
                display: flex;
                width: 30px;
                height: 100%;
                justify-content: center;
                align-items: center;
                background: #fff;
                cursor:pointer;
                i{
                    display: block;
                    width: 17px;
                    height: 33px;
                }
            }
            .slidePrev{
                left: 0;
                i{
                    background: url("/static/public/image/game/new_games/next_l.png") center center / 17px no-repeat;
                }
            }
            .slidePrev:hover{
                i{
                    background: url("/static/public/image/game/new_games/next_l_a.png") center center / 17px no-repeat;
                }
            }
            .slideNext{
                right: 0;
                i{
                    background: url("/static/public/image/game/new_games/next_r.png") center center / 17px no-repeat;
                }
            }
            .slideNext:hover{
                i{
                    background: url("/static/public/image/game/new_games/next_r_a.png") center center / 17px no-repeat;
                }
            }
            .slide_list{
                width: 265px;
                margin: 0 8px;
                background: #fff;
                padding: 23px 16px;
                display: flex;
                cursor:pointer;
                img{
                    width: 104px;
                    height: 104px;
                    margin-right: 10px;
                }
                div{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    width: 70%;
                    span{
                        font-size: 14px;
                        color: #333333;
                    }
                    p{
                        width: 100%;
                        font-size: 12px;
                        display: flex;
                        justify-content: space-between;
                        small{
                            color:#333333;
                            b{
                                font-size: 14px;
                                color: #FF5F00;
                            }
                        }
                    }
                    h2{
                        font-size: 18px;
                        color: #0F1724;
                    }
                }
            }
        }
        .list_nav{
            position: relative;
            width: 1200px;
            height: 60px;
            margin: 0 auto 20px auto;
            background:#fff;
            display: flex;
            justify-content: space-between;
            box-shadow: 0px 1px 4px 0px rgba(28, 26, 123, 0.11);
            align-items: center;
            overflow: hidden;
            &>ul{
                width: 850px;
                height: 60px;
                overflow: hidden;
                li{
                    width: 112px;
                    height: 60px;
                    line-height: 60px;
                    display: inline-block;
                    transform:skewX(20deg);
                    text-align: center;
                    cursor: pointer;
                    p{
                        transform:skewX(-20deg);
                        font-size: 16px;
                        color: #000;
                    }
                }
                li.active{
                    background: linear-gradient(#FFB55A, #FF5F00);
                    p{
                        color: #fff;
                    }
                }
                li:first-child{
                    margin-left: -10px;
                    padding-left: 12px;
                }
            }
            .seek{
                width: 345px;
                height: 60px;
                position: relative;
                padding-right: 40px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                input{
                    position: absolute;
                    top: 15px;
                    right: 80px;
                    width: 229px;
                    height: 31px;
                    line-height: 31px;
                    font-size: 14px;
                    padding: 0 10px;
                    z-index: 1;
                    display: inline-block;
                    border:1px solid #DCDCDC;
                    border-right:none;
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                }
                a{
                    position: absolute;
                    top: 15px;
                    right: 42px;
                    display: inline-block;
                    width: 49px;
                    height: 31px;
                    z-index: 1;
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    background: linear-gradient(#FFB55A, #FF5F00);
                    cursor: pointer;
                    i{
                        display: block;
                        width: 22px;
                        height: 22px;
                        margin: 5px auto;
                        background: url(/static/public/image/game/new_games/sou.png) center center / 100% no-repeat;
                    }
                }
                img{
                    position: absolute;
                    right: -16px;
                    top: -16px;
                    width: 252px;
                    height: 71px;
                }
            }
        }
        .content_box{
            width: 1200px;
            margin: 0 auto;
            .list_img{
                position: relative;
                width: 1200px;
                height: 119px;
                margin:20px auto;
                padding: 0 40px;
                display: flex;
                &>span{
                    position: absolute;
                    top: 0;
                    display: flex;
                    width: 30px;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    background: #fff;
                    cursor:pointer;
                    i{
                        display: block;
                        width: 17px;
                        height: 33px;
                    }
                }
                .slidePrev{
                    left: 0;
                    i{
                        background: url("/static/public/image/game/new_games/next_l.png") center center / 17px no-repeat;
                    }
                }
                .slidePrev:hover{
                    i{
                        background: url("/static/public/image/game/new_games/next_l_a.png") center center / 17px no-repeat;
                    }
                }
                .slideNext{
                    right: 0;
                    i{
                        background: url("/static/public/image/game/new_games/next_r.png") center center / 17px no-repeat;
                    }
                }
                .slideNext:hover{
                    i{
                        background: url("/static/public/image/game/new_games/next_r_a.png") center center / 17px no-repeat;
                    }
                }
                .list_img_btn{
                    padding: 0 10px;
                    overflow: hidden;
                    img{
                        width: 500px;
                        cursor: pointer;
                    }
                }
                
            }
            .list_gams{
                position: relative;
                width: 1200px;
                height: 119px;
                margin:20px auto;
                // padding: 0 40px;
                display: flex;
                ul{
                    border-left: 1px dashed #eee;
                    border-right: 1px dashed #eee;
                    li{
                        float: left;
                        .gams_list{
                            width: 140px;
                            height: 119px;
                            border-right: 1px dashed #eee;
                            background: #fff;
                            display: flex;
                            flex-direction:  column ;
                            justify-content: center;
                            align-items: center;
                            cursor:pointer;
                            img{
                                width: 55%;
                                margin: 0 auto;
                            }
                            p{
                                margin-top: 20px;
                            }
                        }
                        div.active{
                            p{
                                color: #EB410A;
                            }
                        }
                    }
                }
            }
        }
        .content_boxer{
            width: 1200px;
            height: 319px;
            margin: 0 auto;
            box-shadow: 0px 1px 4px 0px rgba(28, 26, 123, 0.11);
            background-color: #fff;
            position: relative;
            .img_bg{
                position: absolute;
                top: 0;
                left: 0;
            }
            .title_line{
                padding-left: 30px;
                padding-top: 20px;
                height: 38px;
                img{
                    height: 18px;
                }
            }
            .list_img{
                position: relative;
                width: 1200px;
                height: 307px;
                margin:20px auto;
                padding: 0 40px;
                display: flex;
                &>span{
                    position: absolute;
                    top: 0;
                    display: flex;
                    width: 30px;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    background: #fff;
                    cursor:pointer;
                    i{
                        display: block;
                        width: 17px;
                        height: 33px;
                    }
                }
                .slidePrev{
                    left: 0;
                    i{
                        background: url("/static/public/image/game/new_games/next_l.png") center center / 17px no-repeat;
                    }
                }
                .slidePrev:hover{
                    i{
                        background: url("/static/public/image/game/new_games/next_l_a.png") center center / 17px no-repeat;
                    }
                }
                .slideNext{
                    right: 0;
                    i{
                        background: url("/static/public/image/game/new_games/next_r.png") center center / 17px no-repeat;
                    }
                }
                .slideNext:hover{
                    i{
                        background: url("/static/public/image/game/new_games/next_r_a.png") center center / 17px no-repeat;
                    }
                }
                .list_img_btn{
                    padding: 0 10px;
                    overflow: hidden;
                    img{
                        width: 500px;
                        cursor: pointer;
                    }
                }
                
            }
            .list_gamser{
                position: relative;
                width: 1200px;
                height: 282px;
                // margin:20px auto;
                padding: 0 30px;
                display: flex;
                &>span{
                    position: absolute;
                    top: 0;
                    display: flex;
                    width: 30px;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    background: #fff;
                    cursor:pointer;
                    i{
                        display: block;
                        width: 17px;
                        height: 33px;
                    }
                }
                .slidePrev{
                    left: 0;
                    i{
                        background: url("/static/public/image/game/new_games/next_l.png") center center / 17px no-repeat;
                    }
                }
                .slidePrev:hover{
                    i{
                        background: url("/static/public/image/game/new_games/next_l_a.png") center center / 17px no-repeat;
                    }
                }
                .slideNext{
                    right: 0;
                    i{
                        background: url("/static/public/image/game/new_games/next_r.png") center center / 17px no-repeat;
                    }
                }
                .slideNext:hover{
                    i{
                        background: url("/static/public/image/game/new_games/next_r_a.png") center center / 17px no-repeat;
                    }
                }
                .gams_lister{
                    width: 1140px;
                    height: 282px;
                    // border-right: 1px dashed #eee;
                    overflow: hidden;
                    background: #fff;
                    display: flex;
                    flex-direction:  column ;
                    justify-content: center;
                    align-items: center;
                    cursor:pointer;
                    .img_boxer{
                        width: 100%;
                        display: flex;
                        flex-wrap:  wrap;
                        justify-content: flex-start;
                        align-items: center;
                        li{
                            position: relative;
                            width: 200px;
                            height: 232px;
                            padding: 11px 11px 0 11px;
                            // margin-bottom: 20px;
                            margin-left: 16px;
                            margin-right: 11px;
                            overflow: hidden;
                            box-shadow:rgba(238,238,238,0.5) 0px 1px 4px 2px;
                            border-radius: 4px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            img{
                                width: 178px;
                                height: 178px;
                                border-radius: 4px;
                            }
                            i{
                                position: absolute;
                                top:18px;
                                right: 20px;
                                display: block;
                                width: 20px;
                                height: 26px;
                                background: url(/static/public/image/game/new_games/top.png) center center / 70px no-repeat;;
                            }
                            p{
                                font-size: 16px;
                                text-align: center;
                                line-height: 42px;
                                color: #000;
                            }
                            div.list_btn{
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                width: 100%;
                                height: 0;
                                background: rgba(0,0,0,0);
                                z-index: 0;
                                transition: all .3s;
                                display: flex;
                                flex-direction: column ;
                                justify-content: center;
                                align-items: center;
                                overflow: hidden;
                                &>span{
                                    display: block;
                                    width: 114px;
                                    height: 36px;
                                    line-height: 36px;
                                    text-align: center;
                                    font-size: 16px;
                                    margin-bottom: 20px;
                                    border-radius:4px;
                                    cursor:pointer;
                                }
                                .begin{
                                    color: #000;
                                    background: #FFFF00;
                                }
                                .collect{
                                    color: #fff;
                                    background: #FF5F00;
                                }
                            }
                        }
                        li:nth-child(5n+5){
                            margin-right: 0;
                        }
                        li:hover{
                            div.list_btn{
                                height: 100%;
                                background: rgba(0,0,0,.5);
                                z-index: 1;
                            }
                        }
                        
                    }
                }
                div.active{
                    p{
                        color: #EB410A;
                    }
                }
            }
        }
        .list_box{
            width: 1200px;
            margin: 20px auto;
            background: #fff;
            box-shadow:0px 1px 4px 0px rgba(28,26,123,0.11);
            .box{
                position: relative;
                width: 1200px;
                padding: 20px 30px;
                background: rgba(0,0,0,0);
                 .img_l{
                    position: absolute;
                    left: -45px;
                    top: 20px;
                    width: 141px;
                }
                .img_r{
                    position: absolute;
                    top: -20px;
                    right: -105px;
                    width: 266px;
                }
                .list_type,.list_line{
                    width: 100%;
                    height: 42px;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #FDEFEF;
                    li{
                        height: 25px;
                        line-height: 25px;
                        padding: 0 10px;
                        color: #5B6168;
                        cursor:pointer;
                    }
                    li.top{
                        color: #EB410A;
                    }
                    li.active{
                        background: linear-gradient(#FFB55A, #FF5F00);
                        border-radius: 4px;
                        color: #fff;
                    }
                    li:first-child{
                        padding: 0;
                        cursor: default;
                    }
                }
                .title_line{
                    height: 18px;
                    img{
                        height: 18px;
                    }
                }
                .img_box{
                    width: 100%;
                    display: flex;
                    flex-wrap:  wrap;
                    margin-top: 16px;
                    justify-content: flex-start;
                    align-items: center;
                    li{
                        position: relative;
                        width: 200px;
                        height: 232px;
                        padding: 11px 11px 0 11px;
                        margin-bottom: 20px;
                        margin-right: 34px;
                        overflow: hidden;
                        box-shadow:rgba(238,238,238,0.5) 0px 1px 4px 2px;
                        border-radius: 4px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .itemBox{
                            width: 178px;
                            height: 178px;
                            border-radius: 4px;
                            overflow: hidden;
                            position: relative;
                            img{
                                width: 178px;
                                height: 178px;
                            }
                            span{
                                font-size: 14px;
                                text-align: center;
                                width: 52px;
                                height: 22px;
                                line-height: 22px;
                                background-color: #008E64;
                                border-bottom-right-radius: 6px;
                                border-top-right-radius: 6px;
                                color:#fff;
                                position: absolute;
                                left: 0;
                                bottom: 0;
                            }
                        }
                        i{
                            position: absolute;
                            top:18px;
                            right: 20px;
                            display: block;
                            width: 20px;
                            height: 26px;
                            background: url(/static/public/image/game/new_games/top.png) center center / 70px no-repeat;
                        }
                        .textBox{
                            width: 178px;
                            height: 42px;
                            position: relative;
                            span{
                                position: absolute;
                                top: 0;
                                font-size: 16px;
                                text-align: center;
                                color: #0F1724;
                                margin: 15px 0;
                            }
                            .leftName{
                                left: 0;
                            }
                            .rightName{
                                right: 0;
                                color: #ac727c;
                            }
                        }
                        div.list_btn{
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 0;
                            background: rgba(0,0,0,0);
                            z-index: 0;
                            transition: all .3s;
                            display: flex;
                            flex-direction: column ;
                            justify-content: center;
                            align-items: center;
                            overflow: hidden;
                            &>span{
                                display: block;
                                width: 114px;
                                height: 36px;
                                line-height: 36px;
                                text-align: center;
                                font-size: 16px;
                                margin-bottom: 20px;
                                border-radius:4px;
                                cursor:pointer;
                            }
                            .begin{
                                color: #000;
                                background: #FFFF00;
                            }
                             .collect{
                                background-size: 36px 36px;
                            }
                            .collectY{
                                background-size: 36px 36px;
                            }
                        }
                    }
                    li:nth-child(5n+5){
                        margin-right: 0;
                    }
                    li:hover{
                        div.list_btn{
                            height: 100%;
                            background: rgba(0,0,0,.5);
                            z-index: 1;
                        }
                    }
                }
                .paging_nav{
                    width: 100%;
                    height: 32px;
                    margin-top: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    li{
                        height: 32px;
                        line-height: 32px;
                        border:1px solid #B2B2B2;
                        border-radius: 4px;
                        padding: 0 19px;
                        margin-right: 12px;
                        font-size:14px ;
                        text-align: center;
                        color: #BABABA;
                        cursor:no-drop;
                    }
                    li.page{
                        border:1px solid #FF6406;
                        color: #FF6406;
                        cursor: default;
                    }
                    li.btn_a{
                        background: #FF5F00;
                        border:1px solid #FF5F00;
                        color: #fff;
                        cursor:pointer;
                    }
                }
                .jiazai{
                    width: 100%;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: 30px;
                        margin-right: 9px;
                    }
                    span{
                        font-size: 14px;
                        color: #FFB359;
                    }
                }
                .noSuit {
                    width: 100%;
                    height: 140px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span {
                        font-size: 16px;
                        color: #ffb359;
                    }
                }
            }
            
        }
    }
}



</style>
