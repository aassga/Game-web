<template>
    <div id="maincontainer">
        <div class="content">
            <div class="list_nav">
                <ul>
                    <li v-for="(item, index) in list_nav" :key="index" :class="[nav_active == item.id ? 'active' : '']" @click="setNav(item)"><p>{{item.name}}</p></li>
                </ul>
                <div class="search-head">
                    <div>
                        <div class="ipt-group">
                            <input type="text" v-model="iptVal" class="ipt" autocomplete="off" @keyup.enter="search()" placeholder="请输入游戏名称">
                        </div>
                        <button class="btn-search" @click="search()"><i class="search_icon"></i> 搜索</button>
                    </div>
                </div>
            </div>
            <div class="content_box" ref="gameMenu" v-show="nav_active == 9">
                <div class="mainbox">
                    <ul class="game_type game_type1">
                        <li :class="[active == item.id ? 'active' : '',item.newclass+'_hover']" :key="index" @click="setGameMaker(item)"
                            v-for="(item,index) in rollList">
                            <div style="display: flex;justify-content: center;">
                                <p class="game_icon"  :class="[{'newactive':active == item.id},item.newclass]"></p>
                            </div>
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                    <ul class="game_type game_type2" v-show="rollList.length>9">
                        <li @click="changeMenu" class="deGame" id="moreli">
                            <div style="display: flex; justify-content: center;">
                                <p class="game_icon more_game" id="moreGame"></p>
                            </div> 
                            <span>更多平台</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="list_box" v-show="nav_active == 9">
                <div class="box">
                    <ul class="list_type"  v-show="nav_active == 9 && GameTypeList.length>1">
                        <li class="top"><i class="gicon gicon1"></i>游戏类型:</li>
                        <li v-for="(item, index) in GameTypeList" :key="index" :class="[gameType_active == item.id ? 'active' : '']" @click="setGameType(item)">{{item.name}}</li>
                    </ul>
                    <ol class="list_line"  v-show="nav_active == 9 && gameTitleList.length>1">
                        <li class="top"><i class="gicon gicon2"></i>赔付线数:</li>
                        <li v-for="(item, index) in gameTitleList" :key="index" :class="[gameTitle_active == item.id ? 'active' : '']"  @click="setGameTitle(item)">{{item.name}}</li>
                    </ol>
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
                                <span>{{item.line}}线</span>
                            </div>
                            <i v-show="item.Hot == 1"></i>
                            <div class="textBox">
                                <span class="leftName">{{item.name}}</span>
                                <span class="rightName">{{idToName(item.upid)}}</span>
                            </div>
                            <div class="list_btn">
                                <span class="begin" @click="loginGame(item)">开始游戏</span>
                                <span class="collect" v-show="item.love == 'no'" @click="joinCollect(item,index)">加入收藏</span>
                                <span class="collectY" v-show="item.love == 'yes'" @click="cancelCollect(item,index)">取消收藏</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="hot_game" v-show="nav_active != 9">
                <div class="game_swiper" v-show="swiperList.length>0">
                    <div class="border_line">
                        <div class="swiper_top">推荐游戏</div>
                    </div>
                    <div class="nav prev" @click="goPrev()"></div>
                    <div class="nav next" @click="goNext()"></div>
                    <div class="swiper_box">
                        <div class="swiper_show" ref="swiperShow">
                            <ul class="swiper_list" v-for="(item, index) in swiperList" :key="index">
                                <li v-for="(it, idx) in item.list" :key="idx">
                                    <div class="itemBox">
                                        <img v-lazy="it.icon" alt="">
                                        <span>{{it.line}}线</span>
                                    </div>
                                    <i v-show="it.Hot == 1"></i>
                                    <div class="textBox">
                                        <span class="leftName">{{it.name}}</span>
                                        <span class="rightName">{{idToName(it.upid)}}</span>
                                    </div>
                                    <div class="list_btn">
                                        <span class="begin" @click="loginGame(it)">开始游戏</span>
                                        <!-- <span class="collect" @click="joinCollect(it)">加入收藏</span> -->
                                        <!-- <span class="collectY" v-show="it.love == 'yes'" @click="cancelCollect(it)">取消收藏</span> -->
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="dot_list">
                        <ul class="swiper_dot">
                            <li v-for="(item, index) in swiperList" :key="index" :class="[{active:item.id==ActiveIndex}]" @mouseover="changSwiper(item.id)"></li>
                        </ul>
                    </div>
                </div>
                <div class="hotgame_list">
                    <div class="border_line" v-show="swiperList.length>0">
                        <div class="swiper_top">{{this.showName}}</div>
                    </div>
                    <div class="noSuit" v-show="searchListShow">
                        <span>未找到符合条件的相关游戏 , 以下是为您推荐的热门游戏</span>
                    </div>
                    <div class="noSuit" v-show="showGameList.length<1">
                        <span>—————————— 未找到符合条件的相关游戏 ——————————</span>
                    </div>
                    <ul class="hot_list">
                        <li v-for="(item, index) in showGameList" :key="index">
                            <div class="itemBox">
                                <img v-lazy="item.icon" alt="">
                                <span>{{item.line}}线</span>
                            </div>
                            <i v-show="item.Hot == 1"></i>
                            <div class="textBox">
                                <span class="leftName">{{item.name}}</span>
                                <span class="rightName">{{idToName(item.upid)}}</span>
                            </div>
                            <div class="list_btn">
                                <span class="begin" @click="loginGame(item)">开始游戏</span>
                                <span class="collect" v-show="item.love == 'no'" @click="joinCollect(item,index)">加入收藏</span>
                                <span class="collectY" v-show="item.love == 'yes'" @click="cancelCollect(item,index)">取消收藏</span>
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

export default {
    mixins: [mixin],
    data() {
        return {
            noSuit:false,
            setInter: null,
            setLoadInter:null,
            iptVal:'',
            ActiveIndex:1,
            timesRun:1,
            list: [],
            loading: true,    // 数据加载中
            allLoaded: false, // 数据已经全部加载
            rollList: [],
            list_games:[
                {id: 0, name: '全部',newclass:"hot_game"},
                {id: 10015, name: "AG电子",newclass:"ag_game"},
                {id: 10016, name: "BBIN电子",newclass:"bbin_game"},
                {id: 10018, name: "CQ9电子",newclass:"cq9_game"},
                {id: 10019, name: "DT电子",newclass:"dt_game"},
                {id: 10020, name: "FG电子",newclass:"fg_game"},
                {id: 10021, name: "JDB电子",newclass:"jdb_game"},
                {id: 10022, name: "MG电子",newclass:"mg_game"},
                {id: 10023, name: "MW电子",newclass:"mw_game"},
                {id: 10024, name: "PT电子",newclass:"pt_game"},
                {id: 10025, name: "TTG电子",newclass:"ttg_game"},
                {id: 10014, name: "AE电子",newclass:"ae_game"}, 
                {id: 11320, name: "PG电子",newclass:"pg_game"},
            ],
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
            showName:'',
            collectList:[],//收藏列表
            showPage:0,
            showList:[],
            getNewShow:true,//是否执行加载函数
            list_nav:[
                {id:9,'name':'全部游戏'}
            ],
            showUserInfo:'',
            searchListShow:false,//显示推荐热门
            searchList:[],
        };
    },
    computed: {},
    methods: {
        //搜索
        async search() {
            this.getNewShow=false;
            this.searchListShow=false;
            if(this.iptVal){
                let gameList = [];
                let showList = [];
                if(this.$route.query.navid == 999) {
                    if(sessionStorage.collectgames_slot){
                        showList = JSON.parse(sessionStorage.getItem("collectgames_slot"))
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
                    if(sessionStorage.collectgames_slot){
                        this.searchListShow=false;
                        this.showGameList = JSON.parse(sessionStorage.getItem("collectgames_slot"))
                    }else{
                        this.searchListShow=true;
                    }
                }else{
                    if(sessionStorage.showgamelist){
                        let itemList = JSON.parse(sessionStorage.getItem("showgamelist"))
                        this.GameListAll = itemList;
                        this.showPage=1;
                        this.getNewShow=true;
                        if(itemList.length<25){
                            this.showGameList= itemList
                        }else{
                            this.showGameList =itemList.slice(0,25)
                        }
                    }
                }
            }
        },
        //更多平台显示
        changeMenu() {
            let menu = document.getElementsByClassName('content_box')[0];
            let moreLi = document.getElementById('moreli');
            let moreGame=document.getElementById("moreGame");
            let gao = window.getComputedStyle(this.$refs.gameMenu).height;
            if (parseInt(gao) <=126) {
                moreLi.className = 'active';
                moreGame.className='game_icon newactive more_game';
                menu.style.height = '252px';
                menu.style.transition = 'all .6s ease';
                this.showGtu = false;
            } else {
                menu.style.height = '126px';
                this.showGtu = true;
                moreLi.className = 'deGame';
                moreGame.className = 'game_icon more_game';
            }
        }, 
        //热门推荐列表
        async changSwiper(num){
            let speed=-1130;
            let swiperLeft = document.getElementsByClassName('swiper_show')[0];
            let swiperShow = window.getComputedStyle(this.$refs.swiperShow).left;
            if(swiperShow){
                this.ActiveIndex=num;
                this.timesRun=num;
                swiperLeft.style.left=`${speed*(num-1)}px`;
                swiperLeft.style.transition = 'all .6s ease';
            } 
        },
        //热门推荐列表滚动
        mySwpier() {
            clearInterval(this.setInter);
            this.setInter = setInterval(() => {
                this.timesRun += 1;
                if(this.timesRun>this.swiperList.length){
                    this.timesRun=1;
                }
                this.changSwiper(this.timesRun)
            }, 3000);
        },
        //滚动加载
        onScroll(e) {
          let top = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条在Y轴上的滚动距离
          let vh = document.compatMode == 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight; // 浏览器视口的高度
          let height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); // 文档的总高度
          if (top + vh >= (height-600)) { // 滚动到底部
            this.getNewData(); // 如果已经滚到底了 获取数据
          }
        },
        //加载的数据
        getNewData() {
            if(this.getNewShow){
                if(sessionStorage.showgamelist){
                    this.showPage++
                    this.showList = JSON.parse(sessionStorage.getItem("showgamelist"))
                    this.showGameList =this.showList.slice(0,25*this.showPage)
                }
            }else{
                return false;
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
            }else if(id ==11320){
                return id = 'PG'
            }else{
                return id = ''
            }
        },
        goPrev(){
            this.timesRun -= 1;
            if(this.timesRun<1){
                this.timesRun=this.swiperList.length;
            }
            this.changSwiper(this.timesRun)
        },
        goNext(){
            this.timesRun += 1;
            if(this.timesRun>this.swiperList.length){
                this.timesRun=1;
            }
            this.changSwiper(this.timesRun)
        },
        //获取全部参数  是否在session里 不在则获取
        async getAllDatas() {
            let allGame = sessionStorage.getItem("allgames");
            let collectGame = sessionStorage.getItem("collectgames_slot");
            if (allGame) { // 有缓存,可以不用请求数据
                allGame = JSON.parse(allGame);
            } else {
                let res = await postS(`gameSortSlot`, { device: "pc",});
                if (res && res.code === 200) {
                allGame = res.data;
                sessionStorage.setItem("allgames", JSON.stringify(res.data));
                }
            }
            if (collectGame) { // 有缓存,可以不用请求数据
                collectGame = JSON.parse(collectGame);
            } else {
                let res = await postS(`memberCollectGames`,{type:"slot"});
                if (res && res.code === 200) {
                    collectGame = res.data;
                    sessionStorage.setItem("collectgames_slot", JSON.stringify(res.data));
                }
            }
            this.listDatas = allGame.list;
            if (this.listDatas.label.length > 0) {
                this.listDatas.label.forEach(val => {//一级导航
                    if(val.id!=0){
                        this.list_nav.push(val)
                    }
                });
                if(this.listDatas.label[0].list){ //推荐游戏列表
                    let swipList=this.listDatas.label[0].list
                    for(let i=1;i<=Math.ceil(swipList.length/5);i++){
                        this.swiperList.push({'id':i,'list':swipList.slice((i-1)*5,i*5)})
                    }
                }
                for(var i=0;i<this.listDatas.label.length;i++){//热门游戏列表
                    if(this.listDatas.label[i].name=='热门游戏'){
                        this.searchList=this.listDatas.label[i].list.slice(0,15)
                        this.searchList.forEach(val=>{
                            val.love="no"
                            if(sessionStorage.collectgames_slot){
                            let showsSearchList = JSON.parse(sessionStorage.getItem("collectgames_slot"))
                                for(let i=0;i<showsSearchList.length;i++){
                                    if(showsSearchList[i].id== val.id){
                                        val.love="yes"
                                    }
                                }
                            }
                        })
                    }
                    
                }
            }
            if(allGame.list.platform.length>0) { //二级导航
                allGame.list.platform.forEach(val => {
                    for(let i = 0; i < this.list_games.length; i ++){
                        if(this.list_games[i].id==val.id&&this.list_games[i].name==val.name){
                            this.rollList.push(Object.assign(val,this.list_games[i]))
                        }
                    }
                })  
            }
            this.list_nav.push({
                name: "收藏游戏",
                id: 999
            });
            if (this.$route.query.navid) {
                this.list_nav.some(ele => {
                    if (ele.id == this.$route.query.navid) {
                        this.setNav(ele);
                        this.showName=ele.name;
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
                this.getNewShow=true;
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
                    this.getNewShow=false;
                    this.showName='收藏游戏';
                    this.getCollectList();
                    this.$router.push({ path: "/home/games", query: { navid: item.id } });
                    window.scrollTo(0, scrollTop);
                } else {
                    if(sessionStorage.collectgames_slot){
                        this.collectList=JSON.parse(sessionStorage.getItem("collectgames_slot")) 
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
                    this.$router.push({ path: "/home/games", query: { navid: item.id } });
                    sessionStorage.setItem("showgamelist", JSON.stringify(itemList));
                    this.GameListAll = itemList;
                    this.showName=item.name;
                    this.showPage=1
                    if(itemList.length<25){
                        this.showGameList= itemList
                    }else{
                        this.showGameList =itemList.slice(0,25)
                    }
                    window.scrollTo(0, scrollTop);
                }
            }
        },
        // 游戏厂商设置
        setGameMaker(item) {
            this.iptVal='';
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            this.searchListShow=false;
            this.active = item.id;
            this.GameMakerData = item;
            this.GameListAll = [];
            this.GameTypeList = [];
            this.$router.push({
                path: "/home/games",
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
            this.getNewShow=true;
            if(sessionStorage.collectgames_slot){
                this.collectList=JSON.parse(sessionStorage.getItem("collectgames_slot")) 
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
            sessionStorage.setItem("showgamelist", JSON.stringify(itemList));
            this.GameListAll = item.list;
            this.showPage=1
            if(itemList.length<25){
                this.showGameList= itemList
            }else{
                this.showGameList =itemList.slice(0,25)
            }
        },
        //加入收藏
        joinCollect(item,index) {
            if (!localStorage.token || !localStorage.userinfo) {
                this.$store.commit("alert/newshowtip", {
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
                this.$http.post(`${this.$HOST_NAME}/collectGame`, {
                    game_name: item.name,
                    game_desc: JSON.stringify({ ...item, love: "yes", orName: orName }),
                    type:"slot"
                }).then(res => {
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
                            if(sessionStorage.showgamelist&&this.showPage==1){
                                this.showList = JSON.parse(sessionStorage.getItem("showgamelist"))
                                this.showGameList =this.showList.slice(0,25*this.showPage)
                            }
                            this.collectList.push(item);
                            this.showGameList[index].love="yes";
                            this.GameListAll[index].love="yes";
                            sessionStorage.setItem("showgamelist", JSON.stringify(this.GameListAll));
                        }
                        sessionStorage.setItem("collectgames_slot", JSON.stringify(this.collectList));
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
        // 取消收藏
        cancelCollect(item,index) {
            this.$http.get(`${this.$HOST_NAME}/deleteCollectGame?game_id=${item.id}`).then(res => {
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
                            sessionStorage.setItem("collectgames_slot", JSON.stringify(this.collectList)); 
                        }else{
                            this.collectList.splice(index, 1);
                            this.showGameList=this.collectList;
                            sessionStorage.setItem("collectgames_slot", JSON.stringify(this.collectList));
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
                            if(sessionStorage.showgamelist&&this.showPage==1){
                                this.showList = JSON.parse(sessionStorage.getItem("showgamelist"))
                                this.showGameList =this.showList.slice(0,25*this.showPage)
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
                        sessionStorage.setItem("collectgames_slot", JSON.stringify(this.collectList));  
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
        //获取收藏列表
        getCollectList() {
            this.searchListShow=false;
            if (!localStorage.token || !localStorage.userinfo) {
                this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '请先登录',
                    model: '',
                    leftspan: true
                });
                this.GameListAll = [];
                this.showGameList = [];
                return false
            }else{
                this.$http.post(`${this.$HOST_NAME}/memberCollectGames`,{type:"slot"}).then(res => {
                    if (res.code === 200) {
                        this.collectList = res.data;
                        sessionStorage.setItem("collectgames_slot", JSON.stringify(res.data));
                        if (this.$route.query.navid == 999) {
                            this.GameListAll = res.data;
                            this.showGameList = res.data; 
                        }    
                    }
                });
            }
        }, 
    },
    created() {
        this.mySwpier()
        window.addEventListener('scroll', this.onScroll);
        if(localStorage.userinfo||localStorage.token){
            this.showUserInfo=localStorage.userinfo
        }else{
            this.showUserInfo=''
            sessionStorage.removeItem("allgames")
            sessionStorage.removeItem("collectgames_slot")
            sessionStorage.removeItem("searchlist")
        }
    },
    mounted() {
        this.getAllDatas();
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll);
        sessionStorage.removeItem("allgames")
        sessionStorage.removeItem("collectgames_slot")
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
        },
    },
    beforeDestroy() {
        clearInterval(this.setInter);
    },
};
</script>

<style lang="less" scoped>
#maincontainer{
    .content{
        width: 1200px;
        margin: 0 auto;
        background: #420711;
        border-radius: 10px;
        .list_nav{
            position: relative;
            width: 1130px;
            height: 64px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #61101e;
            &>ul{
                height: 64px;
                overflow: hidden;
                li{
                    height: 64px;
                    line-height: 64px;
                    display: inline-block;
                    text-align: center;
                    cursor: pointer;
                    p{
                        font-size: 18px;
                        font-weight: 600;
                        padding: 0 16px;
                        color: #ffffff;
                    }
                }
                li.active{
                    background:url(/static/public/image/casino/images/border-bg.png) center bottom no-repeat;
                    p{
                        color: #ffd101;
                    }
                }
                // li:first-child{
                //     margin-left: -17px;
                //     padding-left: 20px;
                // }
            }
          
            .search-head {
                float: right;
                    .bg-search {
                        width: 26px;
                        height: 26px;
                        margin-right: 7px;
                        display: inline-block;
                        vertical-align: middle;
                        background: url('http://betsb.3000018.com/game/img/slot_sprites.png') -63px -185px;
                    }

                    .label {
                        display: inline-block;
                        vertical-align: middle;
                        color: #b48c68;
                        text-align: left;
                        font-size: 18px;
                        font-weight: 600;
                        padding: 0.2em 0.6em 0.3em;
                        line-height: 1;
                    }

                    .ipt-group {
                        position: relative;
                        display: inline-block;
                        width: 158px;
                        height: 38px;
                        border-radius: 5px;
                        border: 1px solid #ae3348;
                        vertical-align: middle;
                        box-sizing: border-box;

                        .ipt {
                            border: none;
                            width: 100%;
                            padding: 0 16px;
                            height: 100%;
                            line-height: 38px;
                            color: #fff;
                            background-color: transparent;
                            outline: none;
                        }
                    }

                    .btn-search {
                        outline: none;
                        width: 86px;
                        height: 38px;
                        border: none;
                        border-radius: 6px;
                        vertical-align: middle;
                        font-size: 16px;
                        color: #420711;
                        vertical-align: middle;
                        background: #ffd100;
                        cursor: pointer;
                        margin-left: 0px;

                        .search_icon {
                            width: 16px;
                            height: 16px;
                            display: inline-block;
                            background: url('/static/public/image/casino/youyi/fdj.png') no-repeat center center;
                            background-size: 100% 100%;
                            white-space: nowrap;
                            letter-spacing: -1em;
                            text-indent: -99em;
                            color: transparent;
                            &:after {
                                /* 伪元素插入空格文本 */
                                content: '\3000';
                            }
                        }
                    }
                }
        }
        .content_box{
            width: 1200px;
            height: 126px;
            margin: 8px auto 0 auto;
            padding: 10px 0; 
            overflow: hidden;
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
         
            .mainbox {
                height: 106px;
                position: relative;
                margin: 0;
                // overflow: hidden;
                padding: 0 35px;

                .game_type1,.game_type2 {
                    width: 1026px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-evenly;

                    li {
                        width: 100px;
                        height: 106px;
                        &:hover {
                            transform:  scale(1.05);
                            -webkit-transform:  scale(1.05);
                            -ms-transform:  scale(1.05);
                            background: -webkit-linear-gradient(to bottom, #fbdd7e, #f3cc55); /* Safari 5.1 - 6.0 */
                            background: -o-linear-gradient(to bottom, #fbdd7e, #f3cc55); /* Opera 11.1 - 12.0 */
                            background: -moz-linear-gradient(to bottom, #fbdd7e, #f3cc55); /* Firefox 3.6 - 15 */
                            background: linear-gradient(to bottom, #fbdd7e, #f3cc55); /* 标准的语法 */
                            color: #fff;
                            div {
                                border-bottom: 1px solid #ffffff;
                            }
                        }
                        &.active {
                            transform:  scale(1.05);
                            -webkit-transform:  scale(1.05);
                            -ms-transform:  scale(1.05);
                            background: -webkit-linear-gradient(to bottom, #fbdd7e, #f3cc55); /* Safari 5.1 - 6.0 */
                            background: -o-linear-gradient(to bottom, #fbdd7e, #f3cc55); /* Opera 11.1 - 12.0 */
                            background: -moz-linear-gradient(to bottom, #fbdd7e, #f3cc55); /* Firefox 3.6 - 15 */
                            background: linear-gradient(to bottom, #fbdd7e, #f3cc55); /* 标准的语法 */
                            color: #fff;
                            div {
                                border-bottom: 1px solid #fff;
                            }
                        }
                    }
                }
            
                .game_type {
                    clear: both;
                    zoom: 1;
                    // overflow: hidden;
                    display: inline-block;

                    li {
                        height: 106px;
                        width: 100px;
                        float: left;
                        margin-right: 14px;
                        // margin-top: 4px;
                        padding: 0;
                        font-size: 16px;
                        background-color: #530815;
                        color: #bc7783;
                        border-radius: 6px;
                        transition: all 0.2s ease 0s;
                        cursor: pointer;
                        text-align: center;
                        overflow: hidden;

                        &.hot_game {
                            background: #530815;
                            // background: url('/static/public/image/casino/youyi/hot-game1.png') center top no-repeat;
                        }
                        &.hot_game:hover {
                            background: linear-gradient(to bottom,#f3cc55, #fbdd7e);
                            // background: url('/static/public/image/casino/youyi/hot-game-hover1.png') center top no-repeat;
                            background-size: 100% 100%;
                        }
                        &.hot_game.active {
                            background: linear-gradient(to bottom,#f3cc55, #fbdd7e);
                            // background: url('/static/public/image/casino/youyi/hot-game-hover1.png') center top no-repeat;
                            background-size: 100% 100%;
                        }

                        div {
                            border-bottom: 1px solid transparent;
                            padding: 10px 0 0;
                            width: 90%;
                            margin: 0 auto;

                            .game_icon {
                                width: 81px;
                                height: 54px;
                            }
                            .hot_game{
                                background: url('/static/public/image/casino/youyi/qb.png') center top no-repeat;
                            }
                            .ag_game {
                                background: url('/static/public/image/casino/youyi/ag-vnst.png') center top no-repeat;
                            }
                            .ae_game {
                                background: url('/static/public/image/casino/youyi/ae-vnst.png') center top no-repeat;
                            }
                            .pg_game{
                                background: url('/static/public/image/casino/youyi/pg-vnst.png') center top no-repeat;
                            }
                            .bbin_game {
                                background: url('/static/public/image/casino/youyi/bbin-vnst.png') center top no-repeat;
                            }
                            .cq9_game {
                                background: url('/static/public/image/casino/youyi/cq9-vnst.png') center top no-repeat;
                            }
                            .fg_game {
                                background: url('/static/public/image/casino/youyi/fg-vnst.png') center top no-repeat;
                            }
                            .dt_game {
                                background: url('/static/public/image/casino/youyi/dt-vnst.png') center top no-repeat;
                            }
                            .jdb_game {
                                background: url('/static/public/image/casino/youyi/jdb-vnst.png') center top no-repeat;
                            }
                            .mg_game {
                                background: url('/static/public/image/casino/youyi/mg-vnst.png') center top no-repeat;
                            }
                            .mw_game {
                                background: url('/static/public/image/casino/youyi/mw-vnst.png') center top no-repeat;
                            }
                            .pt_game {
                                background: url('/static/public/image/casino/youyi/pt-vnst.png') center top no-repeat;
                            }
                            .ttg_game {
                                background: url('/static/public/image/casino/youyi/ttg-vnst.png') center top no-repeat;
                            }
                            .more_game {
                                background: url('/static/public/image/casino/youyi/more_loder.png') center top no-repeat;
                            }
                            .hot_game.newactive{
                                background: url('/static/public/image/casino/youyi/qb-hover.png') center top no-repeat;
                            }
                            .ag_game.newactive {
                                background: url('/static/public/image/casino/youyi/ag-hover.png') center top no-repeat;
                            }
                            .pg_game.newactive {
                                background: url('/static/public/image/casino/youyi/pg-hover.png') center top no-repeat;
                            }
                            .ae_game.newactive {
                                background: url('/static/public/image/casino/youyi/ae-hover.png') center top no-repeat;
                            }
                            .bbin_game.newactive {
                                background: url('/static/public/image/casino/youyi/bbin-hover.png') center top no-repeat;
                            }
                            .cq9_game.newactive {
                                background: url('/static/public/image/casino/youyi/cq9-hover.png') center top no-repeat;
                            }
                            .fg_game.newactive {
                                background: url('/static/public/image/casino/youyi/fg-hover.png') center top no-repeat;
                            }
                            .dt_game.newactive {
                                background: url('/static/public/image/casino/youyi/dt-hover.png') center top no-repeat;
                            }
                            .jdb_game.newactive {
                                background: url('/static/public/image/casino/youyi/jdb-hover.png') center top no-repeat;
                            }
                            .mg_game.newactive {
                                background: url('/static/public/image/casino/youyi/mg-hover.png') center top no-repeat;
                            }
                            .mw_game.newactive {
                                background: url('/static/public/image/casino/youyi/mw-hover.png') center top no-repeat;
                            }
                            .pt_game.newactive {
                                background: url('/static/public/image/casino/youyi/pt-hover.png') center top no-repeat;
                            }
                            .ttg_game.newactive {
                                background: url('/static/public/image/casino/youyi/ttg-hover.png') center top no-repeat;
                            }
                            .more_game.newactive {
                                background: url('/static/public/image/casino/youyi/more-hover.png') center top no-repeat;
                            }
                        }

                        span {
                            line-height: 32px;
                        }
                    }
                    li:nth-child(10),
                    li:nth-child(11),
                    li:nth-child(12) {
                        margin-top: 16px;
                    }
                    li:hover .hot_game {
                        background: url('/static/public/image/casino/youyi/qb-hover.png') center top no-repeat;
                    }
                    li:hover .ag_game {
                        background: url('/static/public/image/casino/youyi/ag-hover.png') center top no-repeat;
                    }
                    li:hover .ae_game {
                        background: url('/static/public/image/casino/youyi/ae-hover.png') center top no-repeat;
                    }
                    li:hover .pg_game {
                        background: url('/static/public/image/casino/youyi/pg-hover.png') center top no-repeat;
                    }
                    li:hover .bbin_game {
                        background: url('/static/public/image/casino/youyi/bbin-hover.png') center top no-repeat;
                    }
                    li:hover .cq9_game {
                        background: url('/static/public/image/casino/youyi/cq9-hover.png') center top no-repeat;
                    }
                    li:hover .dt_game {
                        background: url('/static/public/image/casino/youyi/dt-hover.png') center top no-repeat;
                    }
                    li:hover .fg_game {
                        background: url('/static/public/image/casino/youyi/fg-hover.png') center top no-repeat;
                    }
                    li:hover .jdb_game {
                        background: url('/static/public/image/casino/youyi/jdb-hover.png') center top no-repeat;
                    }
                    li:hover .mg_game {
                        background: url('/static/public/image/casino/youyi/mg-hover.png') center top no-repeat;
                    }
                    li:hover .mw_game {
                        background: url('/static/public/image/casino/youyi/mw-hover.png') center top no-repeat;
                    }
                    li:hover .pt_game {
                        background: url('/static/public/image/casino/youyi/pt-hover.png') center top no-repeat;
                    }
                    li:hover .ttg_game {
                        background: url('/static/public/image/casino/youyi/ttg-hover.png') center top no-repeat;
                    }
                    li:hover .more_game {
                        background: url('/static/public/image/casino/youyi/more-hover.png') center top no-repeat;
                    }
                    li.active {
                        background: linear-gradient(to bottom, #fbdd7e, #f3cc55);
                        color: #530815;
                        div {
                            border-bottom: 1px solid #530815;
                        }
                    }
                }
                .game_type2 {   
                    width: 100px;
                    position: absolute;
                    top: 0;
                    li {
                        padding: 0 !important;
                        margin-right: 0;
                    }
                }

                .nav {
                    width: 47px;
                    height: 90px;
                    position: absolute;
                    cursor: pointer;
                    border: 1px solid #ccc;
                    line-height: 90px;
                    font-weight: bold;
                    font-size: 24px;
                    text-align: center;

                    &:hover {
                        color: #fff;
                        background: #ccc;
                    }
                }
            }
        }
        .list_box{
            width: 1200px;
            margin: 0 auto;
           
            .box{
                position: relative;
                width: 1200px;
                padding: 0 35px;
                background: rgba(0,0,0,0);
                 .img_l{
                    position: absolute;
                    left: -45px;
                    top: -30px;
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
                    height: 28px;
                    line-height: 28px;
                    display: flex;
                    align-items: center;
                    li{
                        padding: 0 20px;
                        color: #bc7783;
                        cursor:pointer;

                        .gicon1 {
                            background: url('/static/public/image/casino/youyi/game_type.png') no-repeat center center;
                            background-size: 22px 22px;
                        }
                        .gicon2 {
                            background: url('/static/public/image/casino/youyi/money.png') no-repeat center center;
                            background-size: 22px 22px;
                        }
                        .gicon {
                            width: 28px;
                            height: 28px;
                            display: inline-block;
                            white-space: nowrap;
                            letter-spacing: -1em;
                            text-indent: -99em;
                            color: transparent;
                            margin-right: 10px;
                            &:after {
                                /* 伪元素插入空格文本 */
                                content: '\3000';
                            }
                        }
                    }
                    li.top{
                        color: #ffffff;
                    }
                    li.active{
                        background:#ffd101;
                        border-radius: 14px;
                        color: #420711;
                        padding: 0 30px;
                    }
                    li:first-child{
                        padding-left: 0;
                        cursor: default;
                    }
                }
                .list_type{
                    margin: 10px 0 20px 0;

                }
                .img_box{
                    width: 1130px;
                    display: flex;
                    flex-wrap:  wrap;
                    margin-top: 20px;
                    justify-content: flex-start;
                    align-items: center;
                    li{
                        position: relative;
                        width: 210px;
                        height: 256px;
                        margin-bottom: 20px;
                        margin-right: 20px;
                        overflow: hidden;
                        border-radius: 10px;
                        background: #530815;
                        display: flex;
                        color: #c1c1c1;
                        flex-direction: column;
                        justify-content: space-between;
                        .itemBox{
                            width: 210px;
                            height: 210px;
                            position: relative;
                            img{
                                width: 210px;
                                height: 210px;
                            }
                            span{
                                font-size: 14px;
                                text-align: center;
                                width: 52px;
                                height: 22px;
                                line-height: 22px;
                                background-color: #6efde4;
                                border-bottom-right-radius: 6px;
                                border-top-right-radius: 6px;
                                color: #000;
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
                            width: 210px;
                            height: 46px;
                            position: relative;
                            span{
                                position: absolute;
                                top: 0;
                                font-size: 16px;
                                text-align: center;
                                color: #eeeeee;
                                margin: 15px 0;
                            }
                            .leftName{
                                left: 0;
                                margin-left: 18px;
                            }
                            .rightName{
                                right: 0;
                                margin-right: 18px;
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
                                width: 102px;
                                height: 32px;
                                line-height: 32px;
                                text-align: center;
                                font-size: 16px;
                                margin-bottom: 20px;
                                border-radius:4px;
                                cursor:pointer;
                            }
                            .begin{
                                color: #000;
                                background: #ffd100;
                            }
                            .collect{
                                color: #000;
                                background: #7cdcff;
                            }
                            .collectY{
                                color: #000;
                                background: #9bff6a;
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
                    height: 80px;
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
                .noSuit{
                    width: 100%;
                    height: 140px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span{
                        font-size: 16px;
                        color: #FFB359;
                    }
                }
            }
            
        }
        .hot_game{
            width:1200px;
            padding: 0 35px 35px 35px;
            .game_swiper{
                margin-top: 16px;
                position: relative;
                .border_line{
                    width: 100%;
                    height: 36px;
                    border-bottom: 1px solid #61101e; 
                    .swiper_top{
                        width: 121px;
                        height: 35px;
                        line-height: 35px;
                        text-align: center;
                        font-size: 17px;
                        color: #fff444;
                        background: #93162c;
                        border-top-left-radius: 7px;
                        border-top-right-radius: 7px;
                    }
                }
                .nav {
                    width: 38px;
                    height: 256px;
                    position: absolute;
                    margin-top: 12px;
                    cursor: pointer;
                    line-height: 140px;
                    font-weight: bold;
                    font-size: 24px;
                    text-align: center;
                    z-index: 99;

                    &.prev {
                    left: -35px;
                    background:url('/static/public/image/casino/images/left-s.png') center center no-repeat;
                    background-size: 15px 25px;
                    }
                    &.next {
                    right: -35px;
                        background:url('/static/public/image/casino/images/right-s.png') center center no-repeat;
                    background-size: 15px 25px;
                    }
                    &.prev:hover {
                        background:url('/static/public/image/casino/images/left.png') center center no-repeat;
                        background-size: 15px 25px;
                    }
                    &.next:hover {
                        background:url('/static/public/image/casino/images/right.png') center center no-repeat;
                        background-size: 15px 25px;
                    }
                }
                .swiper_box{
                    width: 1130px;
                    height: 256px;
                    margin-top: 12px;
                    overflow: hidden;
                    position: relative;
                    .swiper_show{
                        width: 10170px;
                        height: 256px;
                        display: flex;
                        flex-direction: row;
                        flex-wrap:  nowrap;
                        justify-content: flex-start;
                        align-items: center;
                        position: absolute;
                        top: 0;
                        left: 0;
                        .swiper_list{
                            width: 1130px;
                            display: flex;
                            flex-wrap:  wrap;
                            justify-content: flex-start;
                            align-items: center;
                            li{
                                position: relative;
                                width: 210px;
                                height: 256px;
                                margin-right: 20px;
                                overflow: hidden;
                                border-radius: 10px;
                                background: #530815;
                                display: flex;
                                color: #c1c1c1;
                                flex-direction: column;
                                justify-content: space-between;
                                .itemBox{
                                    width: 210px;
                                    height: 210px;
                                    position: relative;
                                    img{
                                        width: 210px;
                                        height: 210px;
                                    }
                                    span{
                                        font-size: 14px;
                                        text-align: center;
                                        width: 52px;
                                        height: 22px;
                                        line-height: 22px;
                                        background-color: #6efde4;
                                        border-bottom-right-radius: 6px;
                                        border-top-right-radius: 6px;
                                        color: #000;
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
                                    width: 210px;
                                    height: 46px;
                                    position: relative;
                                    span{
                                        position: absolute;
                                        top: 0;
                                        font-size: 16px;
                                        text-align: center;
                                        color: #eeeeee;
                                        margin: 15px 0;
                                    }
                                    .leftName{
                                        left: 0;
                                        margin-left: 18px;
                                    }
                                    .rightName{
                                        right: 0;
                                        margin-right: 18px;
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
                                        width: 102px;
                                        height: 32px;
                                        line-height: 32px;
                                        text-align: center;
                                        font-size: 16px;
                                        margin-bottom: 20px;
                                        border-radius:4px;
                                        cursor:pointer;
                                    }
                                    .begin{
                                        color: #000;
                                        background: #ffd100;
                                    }
                                    .collect{
                                        color: #000;
                                        background: #7cdcff;
                                    }
                                    .collectY{
                                        color: #000;
                                        background: #9bff6a;
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
                }
             
                .dot_list{
                    height: 36px;
                    padding-top: 17px;
                    position: relative;
                    .swiper_dot{
                        position: absolute;
                        left: 50%;
                        margin: 0 auto; 
                        transform: translateX(-50%);
                        li{
                            width: 27px;
                            height: 2px;
                            background-color: #982c3f;
                            float: left;
                            margin-right:13px;
                        }
                        li:last-child{
                            margin-right: 0;
                        }
                        .active{
                            background-color: #ffd101;
                        }
                    }
                }
            }
            .hotgame_list{
                margin-top: 18px;
                .border_line{
                    width: 100%;
                    height: 36px;
                    border-bottom:1px solid #61101e; 
                    .swiper_top{
                        width: 121px;
                        height: 35px;
                        line-height: 35px;
                        text-align: center;
                        font-size: 17px;
                        color: #fff444;
                        background: #93162c;
                        border-top-left-radius: 7px;
                        border-top-right-radius: 7px;
                    }
                }
                .hot_list{
                    width: 1130px;
                    display: flex;
                    flex-wrap:  wrap;
                    justify-content: flex-start;
                    align-items: center;
                    margin-top: 12px;
                    li{
                        position: relative;
                        width: 210px;
                        height: 256px;
                        margin-right: 20px;
                        margin-bottom: 20px;
                        overflow: hidden;
                        border-radius: 10px;
                        background: #530815;
                        display: flex;
                        color: #c1c1c1;
                        flex-direction: column;
                        justify-content: space-between;
                        .itemBox{
                            width: 210px;
                            height: 210px;
                            position: relative;
                            img{
                                width: 210px;
                                height: 210px;
                            }
                            span{
                                font-size: 14px;
                                text-align: center;
                                width: 52px;
                                height: 22px;
                                line-height: 22px;
                                background-color: #6efde4;
                                border-bottom-right-radius: 6px;
                                border-top-right-radius: 6px;
                                color: #000;
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
                            width: 210px;
                            height: 46px;
                            position: relative;
                            span{
                                position: absolute;
                                top: 0;
                                font-size: 16px;
                                text-align: center;
                                color: #eeeeee;
                                margin: 15px 0;
                            }
                            .leftName{
                                left: 0;
                                margin-left: 18px;
                            }
                            .rightName{
                                right: 0;
                                margin-right: 18px;
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
                                width: 102px;
                                height: 32px;
                                line-height: 32px;
                                text-align: center;
                                font-size: 16px;
                                margin-bottom: 20px;
                                border-radius:4px;
                                cursor:pointer;
                            }
                            .begin{
                                color: #000;
                                background: #ffd100;
                            }
                            .collect{
                                color: #000;
                                background: #7cdcff;
                            }
                            .collectY{
                                color: #000;
                                background: #9bff6a;
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
                .jiazai{
                    width: 100%;
                    height: 80px;
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
                .noSuit{
                    width: 100%;
                    height: 140px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span{
                        font-size: 16px;
                        color: #FFB359;
                    }
                }
            }
        }
    }
}



</style>
