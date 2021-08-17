<template>
    <div id="maincontainer">
        <div class="content">
            <div class="list_nav">
                <ul>
                    <li v-for="(item, index) in list_nav" :key="index" :class="[nav_active == item.id ? 'active' : '']" @click="setNav(item.id)"><p>{{item.name}}</p></li>
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
            <div class="content_box" ref="gameMenu"  v-show="nav_active == 30006">
                <div class="mainbox">
                    <ul class="game_type game_type1">
                        <li :class="[active == item.id ? 'active' : '',item.newclass+'_hover']" :key="index" @click="switchover(item)"
                            v-for="(item,index) in list_games">
                            <div style="display: flex;justify-content: center;">
                                <p class="game_icon"  :class="[{'newactive':active == item.id},item.newclass]"></p>
                            </div>
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                    <ul class="game_type game_type2" v-show="list_games.length>9">
                        <li @click="changeMenu" class="deGame" id="moreli">
                            <div style="display: flex; justify-content: center;">
                                <p class="game_icon more_game" id="moreGame"></p>
                            </div> 
                            <span>更多平台</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="list_box" v-show="nav_active!=30003">
                <div class="box">
                    <ul class="list_type"  v-show="nav_active == 30006">
                        <li class="top"><i class="gicon gicon1"></i>游戏类型:</li>
                        <li v-for="(item, index) in list_type" :key="index" :class="[btn_active == item.id ? 'active' : '']" @click="btnType(item.id,0,1)">{{item.name}}</li>
                    </ul>
                    <ol class="list_line"  v-show="nav_active == 30006">
                        <li class="top"><i class="gicon gicon2"></i>赔钱线数:</li>
                        <li v-for="(item, index) in list_line" :key="index" :class="[btn_active1 == item.id ? 'active' : '']" @click="btnType(0,item.id,2)">{{item.name}}</li>
                    </ol>
                    <ul class="img_box">
                        <li v-for="(item, index) in listData" :key="index">
                            <img v-lazy="item.icon" alt="">
                            <i v-show="item.Hot == 1"></i>
                            <p>{{item.name}}</p>
                            <div class="list_btn">
                                <span class="begin" @click="loginGame(item)">开始游戏</span>
                                <span class="collect" v-show="item.love == 'no'" @click="joinCollect(item)">加入收藏</span>
                                <span class="collect" v-show="item.love == 'yes'" @click="cancelCollect(item)">取消收藏</span>
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
            <div class="hot_game" v-show="nav_active==30003">
                <div class="game_swiper">
                    <div class="border_line">
                        <div class="swiper_top" @click="changSwiper(1)">热门推荐</div>
                    </div>
                    <div class="swiper_box">
                        <div class="swiper_show" ref="swiperShow">
                            <ul class="swiper_list" v-for="(item, index) in swiperList" :key="index">
                                <li v-for="(it, idx) in item.list" :key="idx">
                                    <img v-lazy="it.icon" alt="">
                                    <i v-show="it.Hot == 1"></i>
                                    <p>{{it.name}}</p>
                                    <div class="list_btn">
                                        <span class="begin" @click="loginGame(it)">开始游戏</span>
                                        <span class="collect" v-show="it.love == 'no'" @click="joinCollect(it)">加入收藏</span>
                                        <span class="collect" v-show="it.love == 'yes'" @click="cancelCollect(it)">取消收藏</span>
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
                        <div class="swiper_top">热门游戏</div>
                    </div>
                    <ul class="hot_list">
                        <li v-for="(item, index) in listData" :key="index">
                            <img :src="item.icon" alt="">
                            <i v-show="item.Hot == 1"></i>
                            <p>{{item.name}}</p>
                            <div class="list_btn">
                                <span class="begin" @click="loginGame(item)">开始游戏</span>
                                <span class="collect" v-show="item.love == 'no'" @click="joinCollect(item)">加入收藏</span>
                                <span class="collect" v-show="item.love == 'yes'" @click="cancelCollect(item)">取消收藏</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { _SetGet, _SetPost, postS, getS} from '@/service/public/service.js';
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
            allListData:[],//1600条数据
            listDatas:[],//总数据
            listData:[],
            showGames:[],
            total_pages:0, 
            page:0,
            jiazai:true,
            noSuit:false,
            rollList: [],
            btn_active:0,
            btn_active1:0,
            nav_active:30006,
            nav_show:'top',
            list_nav:[
                {id:30006,'name':'全部游戏','show':'all'},
                {id:30003,'name':'热门游戏','show':'top'},
                {id:30004,'name':'最新游戏'},
                {id:30005,'name':'彩金池游戏'},
                {id:3006,'name':'收藏游戏'}
            ],
            list_type:[
                {id:0,"name":'全部',"top":false},
                {id:1,"name":'老虎机游戏',"top":true},
                {id:2,"name":'街机',"top":false},
                {id:3,"name":'捕鱼',"top":false},
                {id:4,"name":'其他游戏',"top":false}
            ],
            nowTypeList: {
                type: { list: [] },
                line: { list: [] },
                thirt: { list: [] }
            },
            list_line:[
                {id:0,'name':'全部'},
                {id:1,'name':'1-4'},
                {id:2,'name':'5-10'},
                {id:3,'name':'15-25'},
                {id:4,'name':'30-50'},
                {id:5,'name':'51-146'},
                {id:6,'name':'243'},
                {id:7,'name':'1024'}
            ],
            active:30006,
            swiperOption: {
                autoplay: {
                    delay: 3000,
                },
                loop: true,
                slidesPerView: 4,
                // pagination: {
                //     el: ".swiper-pagination",
                //     clickable: true,
                // },
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            swiperOption1: {
                autoplay: {
                    delay: 6000,
                },
                // loop: true,
                slidesPerView: 8,
            },
            swiperOption2: {
                autoplay: {
                    delay: 6000,
                },
                // loop: true,
                slidesPerView: 2,
            },
            list_images:[
                // {'src': '/static/public/image/game/new_games/list_img.png'},
                // {'src': '/static/public/image/game/new_games/list_img.png'}
            ],
            list_games:[
                {id: 30006, name: '全部电子',src:"QB.png",newclass:"hot_game"},
                {id: 10015, name: "AG电子",src:"AG.png",newclass:"ag_game"},
                {id: 10022, name: "MG电子",src:"MG.png",newclass:"mg_game"},
                {id: 10016, name: "BBIN电子",src:"BBIN.png",newclass:"bbin_game"},
                {id: 10021, name: "JDB电子",src:"JDB.png",newclass:"jdb_game"},
                {id: 10024, name: "PT电子",src:"PT.png",newclass:"pt_game"},
                {id: 10018, name: "CQ9电子",src:"CQ9.png",newclass:"cq9_game"},
                {id: 10019, name: "DT电子",src:"DT.png",newclass:"dt_game"},
                {id: 10020, name: "FG电子",src:"FG.png",newclass:"fg_game"},
                {id: 10023, name: "MW电子",src:"MW.png",newclass:"mw_game"},
                {id: 11320, name: "PG电子",src:"PG.png",newclass:"pg_game"},
                // {id: 10025, name: "TTG电子",src:"TTG.png",newclass:"ttg_game"},
                // {id: 10014, name: "AE电子",src:"AE.png",newclass:"ae_game"}
                
            ],
            jackpotNum1: 41126438914,
            jackpotNum2: 90166438211,
            jackpotNum3: 81522438312,
            setInter: null,
            iptVal:'',
            setting: {//轮播设置
                autoplay: true,//自动播放快关
                autoplaySpeed: 5000,//自动切换速度
                dots: 'none',//指示器位置
                trigger: 'click',//指示器触发方式
                arrow: 'hover',//切换箭头
            },
            swiperList:[
                {id:1,list:[]},
                {id:2,list:[]},
                {id:3,list:[]},
                {id:4,list:[]},
                {id:5,list:[]},
                {id:6,list:[]},
                {id:7,list:[]},
                {id:8,list:[]},
                {id:9,list:[]},
            ],
            ActiveIndex:1,
            timesRun:1,
            collectList:[],//收藏游戏列表
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
        needScroll () {
            let clientHeight = document.documentElement.scrollTop || document.body.scrollTop
            let num = 1300 + (this.page - 1) * 800
            if(this.page >= this.total_pages){
                this.jiazai = false
            }else{
                if(clientHeight >= num){
                    this.jiazai = true
                }
            }
        },
        getListImg(){
            this.$http.get(`${this.$HOST_NAME}/site/electronicList?position=pc_hot`).then(res => {
                if(res.code == 200){
                    this.list_images = res.data.pc_hot.desc_json
                }
            })
        },
        async search() {
            if(this.iptVal){
                let gameList = [];
                gameList = this.listDatas.filter(item => {
                    if (item.name.includes(this.iptVal)) {
                        return item;
                    }
                });
                this.listData = gameList
                if(this.listData.length==0){
                    this.jiazai=false;   
                    this.noSuit=true; 
                    
                }
            }else{
                this.listData=this.listDatas
            }
           
        },
        btnType(type,line,num){
            if(num == 1){
                this.btn_active = type
            }else if(num == 2){
                this.btn_active1 = line
            }
            this.fengame()
        },
        fengame() {
            if(this.btn_active1 == 0 && this.btn_active == 0){
                this.listData = this.listDatas
            }else{
                let num = Math.floor(Math.random() * 9)
                this.listData= this.listDatas.slice(num,9999)
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
        setNav(id){
            this.active = 30006
            this.nav_active = id
            let datas = [];
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            if(id == 30003){
                datas = this.listDatas.filter(item => {
                    let flag = true;
                    flag = flag && item.tag.includes("HOT") ? true : false;
                    if (flag) {
                        return item;
                    }
                });
                this.listData = datas
                if(this.listData.length==0){
                    this.jiazai=false;   
                    this.noSuit=true; 
                }else{
                    this.jiazai=false;   
                    this.noSuit=false; 
                }
                for(var i=0;i<this.swiperList.length;i++){
                    this.swiperList[i].list=this.listDatas.slice((i+1)*5,(i+2)*5)
                }
                this.$router.push('/home/games?id=30003&name=热门游戏');
                window.scrollTo(0, scrollTop);
            }else if(id == 30004){
                datas = this.listDatas.filter(item => {
                    let flag = true;
                    flag = flag && item.tag.includes("NEW") ? true : false;
                    if (flag) {
                        return item;
                    }
                });
                this.listData = datas
                if(this.listData.length==0){
                    this.jiazai=false;   
                    this.noSuit=true; 
                }else{
                    this.jiazai=false;   
                    this.noSuit=false; 
                }
                this.$router.push('/home/games?id=30004&name=最新游戏');
                window.scrollTo(0, scrollTop);
            }else if(id == 30005){
                datas = this.listDatas.filter(item => {
                    let flag = true;
                    flag = flag && item.tag.includes("SLO") ? true : false;
                    if (flag) {
                        return item;
                    }
                });
                this.listData = datas
                if(this.listData.length==0){
                    this.jiazai=false;   
                    this.noSuit=true; 
                }else{
                    this.jiazai=false;   
                    this.noSuit=false; 
                }
                this.$router.push('/home/games?id=30005&name=彩金池游戏');
                window.scrollTo(0, scrollTop);
            }else if(id == 30006){
                this.listData = this.listDatas
                if(this.listData.length==0){
                    this.jiazai=false;   
                    this.noSuit=true; 
                }else{
                    this.jiazai=false;   
                    this.noSuit=false; 
                }
                this.$router.push('/home/games?id=30006&name=全部游戏');
                window.scrollTo(0, scrollTop);
            }else if(id == 3006){
                this.listData = this.collectList;
                if(this.listData.length==0){
                    this.jiazai=false;   
                    this.noSuit=true; 
                }else{
                    this.jiazai=false;   
                    this.noSuit=false; 
                }
                this.$router.push('/home/games?id=3006&name=收藏游戏');
                window.scrollTo(0, scrollTop);
            }else{
                // this.getData(id)
                window.scrollTo(0, scrollTop);
            } 
        },
        getData(id){
            this.$http.post(`${this.$HOST_NAME}/gameSortNew`, {
                id: id,
                device: 'pc'
            }).then(res => {
                if(res.code === 200){
                    if(res.data[id].length > 0){
                        let arr = res.data[id]
                        for(let i = 0; i < arr.length; i ++){
                            arr[i] = {"love":'no',...arr[i]}
                        }
                        this.listDatas = arr
                        this.listData = arr
                        if(this.listData.length==0){
                            this.noSuit=true;
                        }
                    }  
                    this.getAllDatas();                    
                }
            })  
        },
        joinCollect(item){//加入收藏
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
                        {id: 10014, name: "AE"},
                        {id: 11320, name: "PG"}
                    ];
                let orName = "AE"
                arr.forEach(val => {
                    if(val.id === item.upid){
                        orName = val.name || "AE"
                    }
                })
                if(this.collectList.length>9){//收藏列表的长度大于10个，不加入收藏
                    this.$store.commit('alert/newshowtip', {
                        bool: true,
                        title: `由于您的游戏收藏超过10个,"${item.name}"游戏从收藏列表删除！`,
                        model: 'warn'
                    })
                }else{
                    this.$http.post(`${this.$HOST_NAME}/collectGame`,{
                        game_name:item.name,
                        game_desc:JSON.stringify({...item,"love":'yes',"orName":orName})
                    }).then(res => {
                        if(res.code == 200){
                            this.$store.commit('alert/newshowtip', {
                                bool: true,
                                title: `"${item.name}"游戏收藏成功！`,
                                model: 'warn'
                            })
                            this.collectList.push({...item,"love":'yes'})
                        }else if(res.code == 400){
                            this.$store.commit('alert/newshowtip', {
                                bool: true,
                                title:  `"${item.name}"游戏已收藏！`,
                                model: '',
                                leftspan: true
                            });
                            return false;
                        }else{
                            this.$store.commit('alert/newshowtip', {
                                bool: true,
                                title:  `"${item.name}"游戏收藏失败！`,
                                model: '',
                                leftspan: true
                            });
                            return false;
                        }
                    })
                }
            }
        },
        cancelCollect(item){//取消收藏
            this.$http.get(`${this.$HOST_NAME}/deleteCollectGame?game_id=${item.id}`).then(res => {
                if(res.code == 200){
                    this.$store.commit('alert/newshowtip', {
                        bool: true,
                        title: `"${item.name}"取消收藏成功！`,
                        model: 'warn'
                    })
                    for(let i = 0; i < this.collectList.length; i ++){
                        if(this.collectList[i].id == item.id){
                            this.collectList[i].love = 'no'
                            this.collectList.splice(i,1)
                            this.listData=this.collectList
                            if(this.listData.length==0){ 
                                this.noSuit=true; 
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
        whetherCollect(num){
            if (!localStorage.token || !localStorage.userinfo) {
                this.$store.commit('alert/showTipModel', {
                    bool: true,
                    title: '未登录',
                    model: 'warn'
                });
                this.listDatas = []
                this.page = 0;
                this.total_pages = 0;
                return false;
            }else{
                this.$http.post(`${this.$HOST_NAME}/memberCollectGames`).then(res => {
                    if(res.code === 200){
                        this.collectList=res.data;
                        sessionStorage.setItem("collectGames", JSON.stringify(this.collectList));
                    }
                })
            }
        },
        // //数据来源
        getAllDatas() {
            if (sessionStorage.allgames) {
                // 有缓存,可以不用请求数据
                this.listDatas = JSON.parse(sessionStorage.allgames);
                for(let i = 0; i < this.listDatas.length; i ++){
                    this.listDatas[i] = {"love":'no',...this.listDatas[i]}
                }
                let datas = [];
                let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
                let id = this.$route.query.id;
                if (id == 30003) {
                    datas = this.listDatas.filter(item => {
                        let flag = true;
                        flag = flag && item.tag.includes("HOT") ? true : false;
                        if (flag) {
                            return item;
                        }
                    });
                    this.listData = datas
                }else if(id == 30004){
                    datas = this.listDatas.filter(item => {
                        let flag = true;
                        flag = flag && item.tag.includes("NEW") ? true : false;
                        if (flag) {
                            return item;
                        }
                    });
                    this.listData = datas
                }else if(id == 30005){
                    datas = this.listDatas.filter(item => {
                        let flag = true;
                        flag = flag && item.tag.includes("SLO") ? true : false;
                        if (flag) {
                            return item;
                        }
                    });
                    this.listData = datas
                    this.$router.push('/home/games?id=30005&name=彩金池游戏');
                    window.scrollTo(0, scrollTop);
                }else if(id == 30006){
                    this.listData = this.listDatas
                    this.$router.push('/home/games?id=30006&name=全部游戏');
                    window.scrollTo(0, scrollTop);
                }else {
                     this.setNav(30006)
                }
            } else {
                this.getData(id)
                return false;
            }
        },

        switchover(item){
            this.active = item.id
            let da = []
            let arr = this.listDatas;
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            if(item.id === 30006){
                this.listData = arr
                this.$router.push('/home/games?id=30006&name=全部游戏');
                window.scrollTo(0, scrollTop);
            }else{
                arr.forEach(val => {
                    if(val.upid == item.id){
                        da.push(val)
                    }
                })
                this.listData = da
                this.$router.push({
                    path: `/home/games`,
                    query: {
                        id: item.id,
                        name: item.name
                    }
                });
                window.scrollTo(0, scrollTop);
            }
            this.btn_active1 = 0 
            this.btn_active = 0
        },
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
        //热门swiper切换
        mySwpier() {
            clearInterval(this.setInter);
            this.setInter = setInterval(() => {
                this.timesRun += 1;
                if(this.timesRun>9){
                    this.timesRun=1;
                }
                this.changSwiper(this.timesRun)
            }, 5000);
        },
       async getallData(){
            await  this.getData(this.$route.query.id)
            await  this.setNav(this.$route.query.id)
            await  this.getListImg()
            await  this.mySwpier()
            await this.whetherCollect()
       },
      },
      created() {
        this.getallData()
      },
  
    mounted() {
        this.getAllDatas();
        window.addEventListener('scroll', this.needScroll)
        for(var i=0;i<this.swiperList.length;i++){
            this.swiperList[i].list=this.listDatas.slice((i+1)*5,(i+2)*5)
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.needScroll)
    },
    watch: {},
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
        background:rgba(242,242,242,1);
        border-radius: 10px;
        .list_nav{
            position: relative;
            width: 1200px;
            height: 50px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
            align-items: center;
            background-color: #fff;
            padding: 0 35px;
            &>ul{
                height: 50px;
                overflow: hidden;
                li{
                    height: 50px;
                    line-height: 50px;
                    display: inline-block;
                    text-align: center;
                    cursor: pointer;
                    p{
                        font-size: 18px;
                        font-weight: 400;
                        padding: 0 20px;
                        color: #999;
                    }
                }
                li.active{
                    background:url(/static/public/image/casino/blue_image/border-bg.png) center bottom no-repeat;
                    p{
                        color: #1CA9EC;
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
                        border:1px solid #D6DAE4;
                        vertical-align: middle;
                        box-sizing: border-box;

                        .ipt {
                            border: none;
                            width: 100%;
                            padding: 0 16px;
                            height: 100%;
                            line-height: 38px;
                            color: #333;
                            background-color: transparent;
                            outline: none;
                        }
                    }

                    .btn-search {
                        outline: none;
                        width:94px;
                        height: 38px;
                        border: none;
                        border-radius: 6px;
                        vertical-align: middle;
                        font-size: 15px;
                        color: #ffffff;
                        vertical-align: middle;
                        background: url('/static/public/image/casino/youyi/seach_btn.png') no-repeat center center;
                        background-size: cover;
                        cursor: pointer;
                        margin-left: 14px;

                        .search_icon {
                            width: 16px;
                            height: 16px;
                            display: inline-block;
                            background: url('/static/public/image/casino/youyi/sousuo.png') no-repeat center center;
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
                            background: -webkit-linear-gradient(23deg,rgba(81,177,231,1),rgba(98,219,242,1)); /* Safari 5.1 - 6.0 */
                            background: -o-linear-gradient(23deg,rgba(81,177,231,1),rgba(98,219,242,1)); /* Opera 11.1 - 12.0 */
                            background: -moz-linear-gradient(23deg,rgba(81,177,231,1),rgba(98,219,242,1)); /* Firefox 3.6 - 15 */
                            background: linear-gradient(23deg,rgba(81,177,231,1),rgba(98,219,242,1)); /* 标准的语法 */
                            color: #fff;
                            div {
                                border-bottom: 1px solid #ffffff;
                            }
                        }
                        &.active {
                            transform:  scale(1.05);
                            -webkit-transform:  scale(1.05);
                            -ms-transform:  scale(1.05);
                            background: -webkit-linear-gradient(23deg,rgba(81,177,231,1),rgba(98,219,242,1)); /* Safari 5.1 - 6.0 */
                            background: -o-linear-gradient(23deg,rgba(81,177,231,1),rgba(98,219,242,1)); /* Opera 11.1 - 12.0 */
                            background: -moz-linear-gradient(23deg,rgba(81,177,231,1),rgba(98,219,242,1)); /* Firefox 3.6 - 15 */
                            background: linear-gradient(23deg,rgba(81,177,231,1),rgba(98,219,242,1)); /* 标准的语法 */
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
                        background-color: #fff;
                        color: #606060;
                        border-radius: 6px;
                        transition: all 0.2s ease 0s;
                        cursor: pointer;
                        text-align: center;
                        overflow: hidden;

                        &.hot_game {
                            background: #fff;
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
                            .pg_game {
                                background: url('/static/public/image/casino/youyi/pg-vnst.png') center top no-repeat;
                            }
                            .ttg_game {
                                background: url('/static/public/image/casino/youyi/ttg-vnst.png') center top no-repeat;
                            }
                            .more_game {
                                background: url('/static/public/image/casino/youyi/more.png') center top no-repeat;
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
                            .pg_game.newactive {
                                background: url('/static/public/image/casino/youyi/pg-hover.png') center top no-repeat;
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
                    li:hover .pg_game {
                        background: url('/static/public/image/casino/youyi/pg-hover.png') center top no-repeat;
                    }
                    li:hover .ttg_game {
                        background: url('/static/public/image/casino/youyi/ttg-hover.png') center top no-repeat;
                    }
                    li:hover .more_game {
                        background: url('/static/public/image/casino/youyi/more-hover.png') center top no-repeat;
                    }
                    li.active {
                        background: linear-gradient(23deg,rgba(81,177,231,1),rgba(98,219,242,1));
                        color: #fff;
                        div {
                            border-bottom: 1px solid #fff;
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
                        color: #63DDF3;
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
                        color: #606060;
                        cursor:pointer;

                        .gicon1 {
                            background: url('/static/public/image/casino/youyi/game_typ.png') no-repeat center center;
                            background-size: 22px 18px;
                        }
                        .gicon2 {
                            background: url('/static/public/image/casino/youyi/money-ne.png') no-repeat center center;
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
                        color: #420711;
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
                        background: #fff;
                        display: flex;
                        color: #252525;
                        flex-direction: column;
                        justify-content: space-between;
                        img{
                            width: 210px;
                            height: 210px;
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
                        p{
                            font-size: 16px;
                            text-align: center;
                            color: #252525;
                            margin: 15px 0;
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
                        color: #000;
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
                        color: #000;
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
                    border-bottom: 1px solid #1CA9EC; 
                    .swiper_top{
                        width: 121px;
                        height: 35px;
                        line-height: 35px;
                        text-align: center;
                        font-size: 17px;
                        color: #fff444;
                        background: #1CA9EC;
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
                                background: #fff;
                                display: flex;
                                color: #c1c1c1;
                                flex-direction: column;
                                justify-content: space-between;
                                img{
                                    width: 210px;
                                    height: 210px;
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
                                p{
                                    font-size: 16px;
                                    text-align: center;
                                    color: #252525;
                                    margin: 15px 0;
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
                    .swiper_dot{
                        width: 347px;
                        margin: 0 auto; 
                        li{
                            width: 27px;
                            height: 2px;
                            background-color: #1CA9EC;
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
                    border-bottom:1px solid #1CA9EC; 
                    .swiper_top{
                        width: 121px;
                        height: 35px;
                        line-height: 35px;
                        text-align: center;
                        font-size: 17px;
                        color: #fff444;
                        background: #1CA9EC;
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
                        background: #fff;
                        display: flex;
                        color: #c1c1c1;
                        flex-direction: column;
                        justify-content: space-between;
                        img{
                            width: 210px;
                            height: 210px;
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
                        p{
                            font-size: 16px;
                            text-align: center;
                            color: #252525;
                            margin: 15px 0;
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
