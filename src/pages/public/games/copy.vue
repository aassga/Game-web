<template>
    <div id="maincontainer">
        <div class="content">
            <div class="list_nav">
                <ul>
                    <li v-for="(item, index) in list_nav" :key="index" :class="[nav_active == '3000'+item.id ? 'active' : '']" @click="setNav(item.id)"><p>{{item.name}}</p></li>
                    <li :class="[nav_active == 30008 ? 'active' : '']" @click="setNav(8)"><p>收藏游戏</p></li>
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
            <div class="content_box" ref="gameMenu"  v-show="nav_active == 30009">
                <div class="mainbox">
                    <ul class="game_type game_type1">
                        <li :class="[active == item.id ? 'active' : '',item.newclass+'_hover']" :key="index" @click="showPlatform(item)"
                            v-for="(item,index) in rollList">
                            <div style="display: flex;justify-content: center;">
                                <p class="game_icon"  :class="[{'newactive':active == item.id},item.newclass]"></p>
                            </div>
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                    <ul class="game_type game_type2">
                        <li @click="changeMenu" class="deGame" id="moreli">
                            <div style="display: flex; justify-content: center;">
                                <p class="game_icon more_game" id="moreGame"></p>
                            </div> 
                            <span>更多平台</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="list_box" v-show="!showHot">
                <div class="box">
                    <ul class="list_type"  v-show="nav_active == 30009&&list_type.length>1">
                        <li class="top"><i class="gicon gicon1"></i>游戏类型:</li>
                        <li v-for="(item, index) in list_type" :key="index" :class="[btn_active == item.id ? 'active' : '']" @click="gameType(item)">{{item.name}}</li>
                    </ul>
                    <ol class="list_line"  v-show="nav_active == 30009&&list_line.length>1">
                        <li class="top"><i class="gicon gicon2"></i>赔付线数:</li>
                        <li v-for="(item, index) in list_line" :key="index" :class="[btn_active1 == item.id ? 'active' : '']" @click="lineType(item)">{{item.name}}</li>
                    </ol>
                    <ul class="img_box">
                        <li v-for="(item, index) in listData" :key="index">
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
                                <span v-show="nav_active!=30008&&item.love == 'no'" class="collect" @click="joinCollect(item)">加入收藏</span>
                                <span class="collectY" v-show="item.love == 'yes'" @click="cancelCollect(item)">取消收藏</span>
                            </div>
                        </li>
                    </ul>
                    <div class="jiazai" v-show="jiazai">
                        <img src="/static/public/image/game/new_games/spinner.png" alt="加载">
                        <span>正在加拼命加载中，请稍等片刻</span>
                    </div>
                    <div class="noSuit" v-show="noSuit">
                        <span>—————————— 未找到符合条件的相关游戏 ——————————</span>
                    </div>
                </div>
            </div>
            <div class="hot_game" v-show="showHot">
                <div class="game_swiper">
                    <div class="border_line">
                        <div class="swiper_top">推荐游戏</div>
                    </div>
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
                                        <span class="collect" v-show="it.love == 'no'" @click="joinCollect(it)">加入收藏</span>
                                        <span class="collectY" v-show="it.love == 'yes'" @click="cancelCollect(it)">取消收藏</span>
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
                    <div class="border_line">
                        <div class="swiper_top">{{this.showHotName}}</div>
                    </div>
                    <ul class="hot_list">
                        <li v-for="(item, index) in listData" :key="index">
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
                                <span class="collect" v-show="item.love == 'no'" @click="joinCollect(item)">加入收藏</span>
                                <span class="collectY" v-show="item.love == 'yes'" @click="cancelCollect(item)">取消收藏</span>
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
            allDatas:[],//全部加载数据
            listData:[],
            jiazai:true,
            noSuit:false,
            rollList: [],
            btn_active:0,
            btn_active1:0,
            nav_active:30009,
            collectList:[],//收藏列表
            showPage:0,
            showList:[],
            showHot:false,
            showHotName:'',
            getNewShow:true,//是否执行加载函数
            list_nav:[
                {id:9,'name':'全部游戏'}
            ],
            platformData:[],//平台数据（导航2）
            list_type:[],//导航3
            list_line:[],//导航4
            active:0,
            idlist: [],
            list_games:[
                {id: 0, name: '全部',src:"QB.png",newclass:"hot_game"},
                {id: 10015, name: "AG电子",src:"AG.png",newclass:"ag_game",platformName:'AG'},
                {id: 10016, name: "BBIN电子",src:"BBIN.png",newclass:"bbin_game",platformName:'BBIN'},
                {id: 10018, name: "CQ9电子",src:"CQ9.png",newclass:"cq9_game",platformName:'CQ9'},
                {id: 10019, name: "DT电子",src:"DT.png",newclass:"dt_game",platformName:'DT'},
                {id: 10020, name: "FG电子",src:"FG.png",newclass:"fg_game",platformName:'FG'},
                {id: 10021, name: "JDB电子",src:"JDB.png",newclass:"jdb_game",platformName:'JDB'},
                {id: 10022, name: "MG电子",src:"MG.png",newclass:"mg_game",platformName:'MG'},
                {id: 10023, name: "MW电子",src:"MW.png",newclass:"mw_game",platformName:'MW'},
                {id: 10024, name: "PT电子",src:"PT.png",newclass:"pt_game",platformName:'PT'},
                {id: 10025, name: "TTG电子",src:"TTG.png",newclass:"ttg_game",platformName:'TTG'},
                {id: 10014, name: "AE电子",src:"AE.png",newclass:"ae_game",platformName:'AE'}, 
            ],
            jackpotNum1: 41126438914,
            jackpotNum2: 90166438211,
            jackpotNum3: 81522438312,
            setInter: null,
            setLoadInter:null,
            iptVal:'',
            swiperList:[],
            ActiveIndex:1,
            timesRun:1,
            list: [],
            loading: true,    // 数据加载中
            allLoaded: false  // 数据已经全部加载
        };
    },
    computed: {},
    methods: {
        needScroll () {
            let windowHeight=window.innerHeight //浏览器窗口高度
            let bodyHeight=document.body.clientHeight //内容高度
            let clientHeight = document.documentElement.scrollTop || document.body.scrollTop //滚动条滚动的距离
            let num = 1300 + (this.page - 1) * 800
            if(this.page >= this.total_pages){
                this.jiazai = false
            }else{
                if(clientHeight >= num){
                    this.jiazai = true
                }
            }
        },
        //搜索
        async search() {
            this.noSuit=false;
            this.getNewShow=false;
            if(this.iptVal){  
                if(sessionStorage.showlist){
                    this.showList = JSON.parse(sessionStorage.showlist)
                    let gameList = [];
                    gameList = this.showList.filter(item => { 
                        if (item.name.includes(this.iptVal)) {
                            return item;
                        }
                    });
                    this.listData = gameList
                    if(gameList.length==0){
                        this.jiazai=false;   
                        this.noSuit=true;  
                    }
                }
            }else{
                this.listData=JSON.parse(sessionStorage.showlist)
                this.jiazai=false;   
                this.noSuit=false;
                
            }
        },
        // 初始化列表
        rollListInit() {
            let nrollList = [];
            this.rollList.forEach((item, index) => {
                if (item.id == 26 || item.id == 19) {
                } else {
                    nrollList.push(item);
                }
            });
            this.rollList = nrollList;
        },
        //最新最热（导航1）
        setNav(id){
            this.getNewShow=true;
            this.showHot=false
            this.active = 30009
            this.nav_active = "3000"+ id
            let datas = [];
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            if(id == 0||id == 1||id==2||id==3){
                datas = this.listDatas.label[id].list
                let showName=this.listDatas.label[id].name;
                this.showHot=true
                this.showHotName=showName;
                if(datas<25){
                    this.showPage=1
                    this.listData = datas
                }else{
                    this.showPage=1
                    this.listData = datas.slice(0,25)
                    sessionStorage.setItem("showlist", JSON.stringify(datas));
                }
                if(this.listData.length==0){
                    this.jiazai=false;   
                    this.noSuit=true; 
                }else{
                    this.jiazai=false;   
                    this.noSuit=false; 
                }
                this.$router.push(`/home/games?id=3000${id}&name=${showName}`);
                window.scrollTo(0, scrollTop);
            }else if(id == 9){
                this.platformData=this.listDatas.platform
                this.showPlatform(this.rollList[0])
                this.$router.push(`/home/games?id=30009&name=全部游戏&platform=0`);
                window.scrollTo(0, scrollTop);
            }else if(id == 8){
                this.whetherCollect();
                this.$router.push(`/home/games?id=3000${id}&name=收藏游戏`);
                window.scrollTo(0, scrollTop);
            }else{
                // this.getData(id)
                window.scrollTo(0, scrollTop);
            }   
        },
        //展示平台（导航2）
        async showPlatform(item){
            this.getNewShow=true;
            this.active = item.id
            let arr = this.platformData;
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop
            arr.forEach(val => {
                if(item.id==val.id){
                    this.list_type = val.list
                }
            })
            this.list_type=Object.values(this.list_type)
            this.gameType(this.list_type[0])//选中导航3全部
            this.btn_active = 0   
            this.$router.push(`/home/games?id=30009&name=全部&platform=${item.id}`);
            window.scrollTo(0, scrollTop);   
        },
        //游戏类型（导航3）
        gameType(item){
            this.getNewShow=true;
            this.btn_active=item.id
            let arr = this.list_type;
            arr.forEach(val => {
                if(item.id==val.id){
                    this.list_line = val.list
                }
            })
            this.list_line=Object.values(this.list_line)
            this.lineType(this.list_line[0])//选中导航4全部
            this.btn_active1 = 0
        },
        //线数类型（导航4）
        lineType(item){
            this.getNewShow=true;
            this.btn_active1=item.id
            let arr = this.list_line;
            arr.forEach(val => {
                if(item.id==val.id){
                    this.allDatas=val.list
                    if(val.list.length<25){
                        this.showPage=1
                        this.listData = val.list
                    }else{
                        this.showPage=1
                        this.listData = val.list.slice(0,25)
                    }
                    sessionStorage.setItem("showlist", JSON.stringify(val.list));
                    if(this.listData.length==0){
                        this.jiazai=false;   
                        this.noSuit=true; 
                    }else{
                        this.jiazai=false; 
                        this.noSuit=false; 
                    }
                }
            })
        },
        //加入收藏
        joinCollect(item){
            if (!localStorage.token || !localStorage.userinfo) {
                this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '请先登录',
                    model: '',
                    leftspan: true
                });
                return false;
            }else{
                let arr = [
                        {id: 10015, name: "AG"},
                        {id: 10022, name: "MG"},
                        {id: 10016, name: "BBIN"},
                        {id: 10021, name: "JDB"},
                        {id: 10024, name: "PT"},
                        {id: 10018, name: "CQ9"},
                        {id: 10019, name: "DT"},
                        {id: 10020, name: "FG"},
                        {id: 10023, name: "MW"},
                        {id: 10025, name: "TTG"},
                        {id: 10014, name: "AE"}
                    ];
                let orName = "AE"
                arr.forEach(val => {
                    if(val.id === item.upid){
                        orName = val.name || "AE"
                    }
                })
                this.$http.post(`${this.$HOST_NAME}/collectGame`,{
                    game_name:item.name,
                    game_desc:JSON.stringify({...item,"love":'yes',"orName":orName}),
                    type:"slot"
                }).then(res => {
                    if(res.code == 200){
                        this.$store.commit('alert/newshowtip', {
                            bool: true,
                            title: `"${item.name}"游戏收藏成功！`,
                            model: 'warn'
                        })
                        this.collectList.push({...item,"love":'yes'})
                        for(let i=0;i<this.listData.length;i++){
                            if(this.listData[i].id== item.id){
                                this.listData[i].love="yes"
                            }
                        }
                    }else if(res.code == 400){
                        this.$store.commit('alert/newshowtip', {
                            bool: true,
                            title:  `"${item.name}"游戏已收藏！`,
                            model: ''
                        });
                        return false;
                    }else{
                        this.$store.commit('alert/newshowtip', {
                            bool: true,
                            title:  `"${item.name}"游戏收藏失败！`,
                            model: ''
                        });
                        return false;
                    }
                })
                
            }
        },
        //取消收藏
        cancelCollect(item){
            this.$http.get(`${this.$HOST_NAME}/deleteCollectGame?game_id=${item.id}`).then(res => {
                if(res.code == 200){
                    this.$store.commit('alert/newshowtip', {
                        bool: true,
                        title: `收藏游戏"${item.name}"删除成功！`,
                        model: 'warn'
                    })
                    if(this.$route.query.id==30008){
                        this.getAllDatas();
                    }else{
                        for(let i=0;i<this.listData.length;i++){
                            if(this.listData[i].id== item.id){
                                this.listData[i].love="no"
                            }
                        }
                    }
                }else{
                    this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: `"${item.name}"取消收藏失败！`,
                        model:  'warn'
                    });
                }
            })
        },
        //收藏列表
        whetherCollect(num){
            if (!localStorage.token || !localStorage.userinfo) {
                this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '请先登录',
                    model: '',
                    leftspan: true
                });
                this.listData = []
                sessionStorage.setItem("showlist",[]);
                this.jiazai=false;   
                this.noSuit=true; 
                return false;
            }else{
                this.$http.post(`${this.$HOST_NAME}/memberCollectGames`,{type:"slot"}).then(res => {
                    if(res.code === 200){
                        this.getNewShow=false;
                        this.collectList=res.data;
                        this.listData = res.data
                        sessionStorage.setItem("showlist", JSON.stringify(res.data));
                        sessionStorage.setItem("collectGames", JSON.stringify(this.collectList));
                        if(this.listData.length==0){
                            this.jiazai=false;   
                            this.noSuit=true; 
                        }else{
                            this.jiazai=false;   
                            this.noSuit=false; 
                        }
                    }
                })
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
            }, 8000);
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
                if(sessionStorage.showlist){
                    this.showPage++
                    this.showList = JSON.parse(sessionStorage.showlist)
                    this.listData =this.showList.slice(0,25*this.showPage)
                }
            }else{
                return false;
            }
        },
        //获取电子游艺全部参数
        async getGameList() {
            let res = await postS(`gameSortSlot`,{device:'pc'})
            let swipList=[]
            if (res && res.code === 200) {
                if(res.data.list.label.length>0){
                    res.data.list.label.forEach(val => {
                        if(val.id!=0){
                            this.list_nav.push(val)
                        }
                    })  
                }
                this.listDatas=res.data.list
                swipList=res.data.list.label[0].list
                for(let i=1;i<=Math.ceil(swipList.length/5);i++){
                    this.swiperList.push({'id':i,list:swipList.slice((i-1)*5,i*5)})
                }
            }
            this.setNav(9);
        },
        //获取缓存数据来源
        getAllDatas() {
            if (sessionStorage.allgames) {
                // 有缓存,可以不用请求数据
                let allgamesData = JSON.parse(sessionStorage.allgames);
                let swipList=[];
                if(allgamesData.list.label.length>0){
                    allgamesData.list.label.forEach(val => {
                        if(val.id!=0){
                            this.list_nav.push(val)
                        }
                    })  
                    swipList=allgamesData.list.label[0].list
                    if(sessionStorage.collectGames){
                        this.collectList=JSON.parse(sessionStorage.collectGames);
                        swipList.forEach(val=>{
                            val.love="no"
                            for(let i=0;i<this.collectList.length;i++){
                                if(this.collectList[i].id== val.id){
                                    val.love="yes"
                                }
                            }
                        })
                    }
                  
                    for(let i=1;i<=Math.ceil(swipList.length/5);i++){
                        this.swiperList.push({'id':i,'list':swipList.slice((i-1)*5,i*5)})
                    }
                }
                if(allgamesData.list.platform.length>0){
                    allgamesData.list.platform.forEach(val => {
                        for(let i = 0; i < this.list_games.length; i ++){
                            if(this.list_games[i].id==val.id&&this.list_games[i].name==val.name){
                                this.rollList.push(Object.assign(val,this.list_games[i]))
                            }
                        }
                    })  
                }
                this.getNewShow=true;
                this.listDatas=allgamesData.list
                let datas = [];
                let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
                let id = this.$route.query.id;
                let uid= this.$route.query.id.substring(this.$route.query.id.length-1);
                let platform = this.$route.query.platform;
                this.nav_active = id
                if(id == 30000||id == 30001||id == 30002||id == 30003){
                    datas = this.listDatas.label[uid].list
                    let showName=this.listDatas.label[uid].name;
                    this.listData=datas
                    this.showHot=true
                    this.showHotName=showName;
                    if(this.listData.length==0){
                        this.jiazai=false;   
                        this.noSuit=true; 
                    }else{
                        this.jiazai=false;   
                        this.noSuit=false; 
                    }
                    this.$router.push(`/home/games?id=${id}&name=${showName}`);
                    window.scrollTo(0, scrollTop);
                }else if(id == 30009){
                    this.platformData=this.listDatas.platform
                    this.showPlatform(this.rollList[0])
                    this.$router.push(`/home/games?id=30009&name=全部游戏&platform=0`);
                    window.scrollTo(0, scrollTop);
                    if(platform){
                        this.active = platform
                        let arr =this.listDatas.platform;
                        arr.forEach(val => {
                            if(platform==val.id){
                                this.list_type = val.list
                            }
                        })
                        this.list_type=Object.values(this.list_type)
                        this.gameType(this.list_type[0])//选中导航3全部
                        this.btn_active = 0   
                        this.$router.push(`/home/games?id=30009&name=全部&platform=${platform}`);
                        window.scrollTo(0, scrollTop); 
                    }
                }else if(id == 30008){
                    this.$http.post(`${this.$HOST_NAME}/memberCollectGames`,{type:"slot"}).then(res => {
                        if(res.code === 200){
                            this.getNewShow=false;
                            this.collectList=res.data;
                            this.listData = res.data;
                            if(this.listData.length==0){
                                this.jiazai=false;   
                                this.noSuit=true; 
                            }else{
                                this.jiazai=false;   
                                this.noSuit=false; 
                            }
                            this.$router.push(`/home/games?id=${id}&name=收藏游戏`);
                            window.scrollTo(0, scrollTop);
                        }
                    })
                }else{
                    this.setNav(9);
                    window.scrollTo(0, scrollTop);
                }
            } else {//没有缓存，调用接口获取数据
                this.getGameList();
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
            }else{
                return id = 'AE'
            }
        },
    },
    created() {
        this.mySwpier()
        // this.whetherCollect()
        window.addEventListener('scroll', this.onScroll);
    },
    mounted() {
        this.getAllDatas();
        window.addEventListener('scroll', this.needScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.needScroll)
        window.removeEventListener('scroll', this.onScroll);
    },
    watch: {
        'listData':{
            handler:function(val,oldval){
                if(sessionStorage.collectGames){
                    this.collectList=JSON.parse(sessionStorage.collectGames);
                    this.listData.forEach(val=>{
                        val.love="no"
                        for(let i=0;i<this.collectList.length;i++){
                            if(this.collectList[i].id== val.id){
                                val.love="yes"
                            }
                        }
                    })
                }
            },   
        }        
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
                        padding: 0 20px;
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
                        width: 242px;
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
                        width: 102px;
                        height: 38px;
                        border: none;
                        border-radius: 6px;
                        vertical-align: middle;
                        font-size: 16px;
                        color: #420711;
                        vertical-align: middle;
                        background: #ffd100;
                        cursor: pointer;
                        margin-left: 14px;

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
            }
        }
    }
}



</style>
