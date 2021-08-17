import { postS, getS, _SetGet, _SetPost } from '@/service/public/service.js';
import UserService from '@/service/public/UserService.js';

const mixin={
    data() {
        return {
            jiazai:true,
            rollList: [],
            nav_show:'top',
            list_nav:[//一级导航
                {id:9,'name':'全部游戏'}
            ],
            swiperOption1: {
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    stopOnLastSlide: false,
                },
                slidesPerView: 8,
            },
            swiperOption2: {
                autoplay: {
                    disableOnInteraction: false,
                    stopOnLastSlide: false,
                    delay: 3000,
                },
                slidesPerView: 5,
                slidesPerGroup: 5,
                loopFillGroupWithBlank: true,
            },
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
            getNewShow:true,//是否执行加载函数
            searchListShow:false,//显示推荐热门
            searchList:[],
            leftImageSrc:'/static/'+this.themes.name+'/img/new_games/next_l.png',
            rightImageSrc:'/static/'+this.themes.name+'/img/new_games/next_r.png',

        }
    },
    computed: {
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
                }else if (this.$route.query.navid == 1000) {
                if (sessionStorage.collectslot_myLove) {
                   showList = JSON.parse(sessionStorage.getItem("collectslot_myLove"))
                   gameList = showList.filter(item => {
                    if (item.name.includes(this.iptVal)) {
                    return item;
                    }
                });
                   this.showGameList = gameList
                } else {
                   this.searchListShow = true;
                   this.showGameList = this.searchList
                }
              } else{
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
        //获取全部参数 是否在session里 不在则获取
        async getAllDatas() {
            let allGame = sessionStorage.getItem("allgames");
            let collectGame = sessionStorage.getItem("collectgames_slot");
            let collectslot = sessionStorage.getItem("collectslot_myLove"); 
            if (collectslot) {
                collectslot = JSON.parse(collectslot);
            } else {
            let data = {
                type: 10001,
                device: "pc"
            }
            this.$http.post(`${this.$HOST_NAME}/myloveGame`, data).then(res => {
                if (res.code === 200) {
                collectslot = res.data;
                sessionStorage.setItem("collectslot_myLove", JSON.stringify(res.data))
                }
            })
            }
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
                this.listDatas.label.forEach(val => {
                    if(val.name!='推荐游戏'){
                        this.list_nav.push(val)
                    }else{
                        if(val.list){
                            this.swiperList=val.list
                        }
                    }
                });
                for(var i=0;i<this.listDatas.label.length;i++){//热门游戏列表
                    if(this.listDatas.label[i].name=='热门游戏'){
                        this.searchList=this.listDatas.label[i].list.slice(0,18)
                    }
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
            this.list_nav.push({
                name: "收藏游戏",
                id: 999
            });
            setTimeout(()=>{
            if (collectslot) {
                this.list_nav.push({
                    name: "我的最爱",
                    id: 1000
                })
            }
            if (this.$route.query.navid) {
                this.list_nav.some(ele => {
                    if (ele.id == this.$route.query.navid) {
                        this.setNav(ele);
                        if(ele.name=="热门游戏"){
                            this.showName='hotgame';
                        }else if(ele.name=="最新游戏"){
                            this.showName='newgame';
                        }else if(ele.name=="奖金池游戏"){
                            this.showName='jiangjingame';
                        }else if(ele.name=="街机游戏"){
                            this.showName='jiejigame';
                        }else if(ele.name=="捕鱼游戏"){
                            this.showName='buyugame';
                        }else if (ele.name == "我的最爱") {
                            this.showName = '1000';
                        } else{
                            this.showName='999';
                        }
                    }
                });
            } else {
                this.setNav(this.list_nav[0]);
            }
            })
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
                }else if (item.id == 1000) {
                    this.getNewShow=false;
                    this.showName = '1000';
                    this.$router.push({
                    path: "/home/games",
                    query: {
                        navid: item.id
                    }
                    });
                    this.getMyLoveSlot();
                    window.scrollTo(0, scrollTop);
                 }
                //收藏游戏
                else if (item.id == 999) {
                    this.getNewShow=false;
                    this.showName='999',
                    this.getCollectList();
                    this.$router.push({ path: "/home/games", query: { navid: item.id } });
                    window.scrollTo(0, scrollTop);
                } else {
                    if(sessionStorage.collectgames_slot){
                        this.collectList=JSON.parse(sessionStorage.getItem("collectgames_slot")) 
                    }
                    if(item.name=="热门游戏"){
                        this.showName='hotgame';
                    }else if(item.name=="最新游戏"){
                        this.showName='newgame';
                    }else if(item.name=="奖金池游戏"){
                        this.showName='jiangjingame';
                    }else if(item.name=="街机游戏"){
                        this.showName='jiejigame';
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

                    this.$router.push({ path: "/home/games", query: { navid: item.id } });
                    sessionStorage.setItem("showgamelist", JSON.stringify(itemList));
                    this.GameListAll = itemList;
                    this.showGameList = itemList;
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
        getMyLoveSlot(){
            this.searchListShow=false;
            let collectslot = JSON.parse(sessionStorage.getItem("collectslot_myLove"))
            let collectGame = JSON.parse(sessionStorage.getItem("collectgames_slot"));
            if (collectslot) {
            collectslot.forEach((ele) => {
                ele.love = 'no'
                collectGame.forEach((el) => {
                if (ele.id == el.id) ele.love = 'yes'
                })
            })
            this.GameListAll = collectslot.slice(0,25)
            this.showGameList = collectslot.slice(0,25)
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
            this.GameListAll = itemList;
            sessionStorage.setItem("showgamelist", JSON.stringify(itemList));
            this.showGameList = itemList;
            this.showPage=1
            if(itemList.length<25){
                this.showGameList= itemList
            }else{
                this.showGameList =itemList.slice(0,25)
            }
        }, 
        //加入收藏
        joinCollect(item,index) {
            if (!localStorage.token) {
                this.errorAlert("请先登录", "warn");
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
                    type:"slot"
                })
                .then(res => {
                    if (res.code==200) {
                        if(this.iptVal){
                            let showList = JSON.parse(sessionStorage.getItem("searchlist"))
                            this.collectList.push(item);
                            showList[index].love="yes";
                            this.showGameList=showList
                        }else{
                            if(sessionStorage.showgamelist&&this.showPage==1){
                                setTimeout(()=>{
                                    this.showList = JSON.parse(sessionStorage.getItem("showgamelist"))
                                    this.showGameList =this.showList.slice(0,25*this.showPage)
                                })
                            }
                            this.collectList.push(item);
                            this.showGameList[index].love="yes";
                            this.GameListAll[index].love="yes";
                            sessionStorage.setItem("showgamelist", JSON.stringify(this.GameListAll));
                        }
                        sessionStorage.setItem("collectgames_slot", JSON.stringify(this.collectList));
                    } else {
                        this.errorAlert(res.message, "warn"); 
                    }
                });
            }
        },
        //取消收藏
        async cancelCollect(item, index) {
            let delid;
            if(!item.sortid){
                let res = await postS(`memberCollectGames`,{type:"slot"});
                    if (res && res.code === 200) {
                        sessionStorage.setItem("collectgames_slot", JSON.stringify(res.data));
                        res.data.forEach(ele=>{
                          if(ele.id =item.id) delid=ele.sortid
                        })
                        this.deleteCollectGame(item,index,delid)
                }
            }else{
                this.deleteCollectGame(item,index,item.sortid)
            }
        },
        deleteCollectGame(item,index,delid){
             this.$http.post(`${this.$HOST_NAME}/deleteCollectGame`,{deleteids:delid}).then(res => {
                if (res.code == 200) {
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
                   
                }
            });
        },
        getCollectList() {
            this.searchListShow=false;
            if (!localStorage.token || !localStorage.userinfo) {
                
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
                    this.showList = JSON.parse(sessionStorage.showgamelist)
                    this.showGameList =this.showList.slice(0,25*this.showPage)
                }
            }else{
                return false;
            }
        },
        changeSrc1(){
            this.leftImageSrc='/static/'+this.themes.name+'/img/new_games/next_l_a.png'
        },
        changeSrc2(){
            this.leftImageSrc='/static/'+this.themes.name+'/img/new_games/next_l.png'
        },
        changeSrc3(){
            this.rightImageSrc='/static/'+this.themes.name+'/img/new_games/next_r_a.png'
        },
        changeSrc4(){
            this.rightImageSrc='/static/'+this.themes.name+'/img/new_games/next_r.png'
        },
    },
    created() {
        window.addEventListener('scroll', this.onScroll);
        if(localStorage.userinfo||localStorage.token){
            this.showUserInfo=localStorage.userinfo
        }else{
            this.showUserInfo=''
            sessionStorage.removeItem("allgames")
            sessionStorage.removeItem("collectgames_slot")
            sessionStorage.removeItem("searchlist")
            sessionStorage.removeItem("collectslot_myLove")
        }
    },
    mounted() { 
        this.getAllDatas()
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll);
        sessionStorage.removeItem("allgames")
        sessionStorage.removeItem("collectgames_slot")
        sessionStorage.removeItem("searchlist")
        sessionStorage.removeItem("collectslot_myLove")
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
    }
}
export default mixin;