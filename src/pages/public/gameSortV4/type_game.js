
import idConfig from "./idConfig";
const mixin={
    data () {
        return {
          gameKind:[],
          jiazai: true,
          rollList: [],
          nav_show: "top",
          list_nav: [
            //一级导航
            { id: 9, name: "全部游戏" }
          ],
          isLazy: true,
          listDatas: [], //总数据
          listData: {}, //总数据里list
          nav_active: 99,
          active: 0,
          gameType_active: 99,
          gameTitle_active: 99,
          swiperList: [], //滚动展示列表
          GameListAll: [], //展示的游戏列表
          showGameList: [], //搜索数据
          GameMakerData: [], //游戏厂商
          gameTitleList: [], //游戏类型列表
          GameTypeList: [],
          collectList: [],
          showName: "",
          iptVal: "",
          idConfig: {},
          getNewShow: true, //是否执行加载函数
          searchListShow: false, //显示推荐热门
          searchList: [],
          leftImageSrc:
            "/static/" + this.themes.name + "/img/new_games/next_l.png",
          rightImageSrc:
            "/static/" + this.themes.name + "/img/new_games/next_r.png",
          swiperOption2: {
            loop: true,
            autoplay: true,
            observer: true,
            observeParents: true,
            speed:200,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false
            },
            slidesPerView: 5
          },
          isSwiper:true,
        };
    },
    computed: {
         swiper2() {
            return this.$refs.mySwiper2.swiper
          }
    },
    methods:{
          setSwiper(num){
            switch(num){
                case 5:
                   this.$refs.mySwiper2.swiper.slideNext();
                break;
                case 6:
                   this.$refs.mySwiper2.swiper.slidePrev();
                break;
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
          getAllDatas(){
            let allGame = this.$getObjByLocalStorage(`gameSortV4_${this.gameType}`);
            if(localStorage.token){
                this.getCollect();
                let love = this.$getObjByLocalStorage(`collect${this.gameType}_myLove`);
                if(love){
                    if(love.length>0){
                        this.list_nav.unshift({
                            name: "我的最爱",
                            id: 1000
                        })
                    }
                }else{
                    this.getMyloveGame(true)
                }
            }
            if(!allGame){
                this.$gameSortV4();
                setTimeout(()=>{
                    let allGame = this.$getObjByLocalStorage(`gameSortV4_${this.gameType}`);
                    this.listDatas = allGame;
                    this.informationData();
                },2000)
            }else{
                this.listDatas = allGame;
                this.informationData();
            }
        },
        async getCollect(callback){
            this.$store.dispatch('game/memberCollectGamesV4',{ type:this.gameType}).then(res=>{
                if(res&&res.code==200){
                    this.$setObjByLocalStorage(`collectgames_${this.gameType}`,res.data);
                    if(typeof callback === 'function') callback(res)
                }
            })
        },
        getMyloveGame(status){
            console.log('status',status)
            let data={type: '',device: "pc"}
            switch(this.gameType){
                case 'slot':
                data.type=10001;
                break;
                case 'chess':
                data.type=10004;
                break;
                default:
                data.type=10005;
                break;
            }
            if(['blr'].includes(this.$websiteName)) {
                data['style'] = 'style24'
              }else if(['tycjt'].includes(this.$websiteName)){
                data['style'] = 'style26'
              }else if(['tyc86'].includes(this.$websiteName)){
                data['style'] = 'style28'
              }else if(['qygj'].includes(this.$websiteName)){
                data['style'] = 'style30'
              }else if(['bet365'].includes(this.$websiteName)) {
                data['style'] = 'style31'
              }else if(['vnst'].includes(this.$websiteName)) {
                data['style'] = 'style32'
              }else if(['amvnsr'].includes(this.$websiteName)){
                data['style'] = 'style33'
              }else if(['amxpj'].includes(this.$websiteName)){
                data['style'] = 'style35'
              }else if(['99qp'].includes(this.$websiteName)){
                data['style'] = 'style37'
              }else if(['839qp'].includes(this.$websiteName)){
                data['style'] = 'style41'
              }else if(['qmcp'].includes(this.$websiteName)){
                data['style'] = 'style43'
              }else if(['wycp'].includes(this.$websiteName)){
                data['style'] = 'style57'
              }else if(['amvns'].includes(this.$websiteName)){
                data['style'] = 'style59'
              }else if(['ybcp'].includes(this.$websiteName)){
                data['style'] = 'style55'
              }else if(['hty'].includes(this.$websiteName)){
                data['style'] = 'style45'
              }else if(['dqr'].includes(this.$websiteName)){
                data['style'] = 'style47'
              }else if(['fhcp'].includes(this.$websiteName)){
                data['style'] = 'style49'
              }else if(['xpj83'].includes(this.$websiteName)){
                data['style'] = 'style49'
              }else if(['dalao'].includes(this.$websiteName)){
                data['style'] = 'style51'
              }else if(['aqvns'].includes(this.$websiteName)){
                data['style'] = 'style53'
              }else if(['js85'].includes(this.$websiteName)){
                data['style'] = 'style80'
              }else if(['amhg'].includes(this.$websiteName)){
                data['style'] = 'style61'
              }else if(['cpxpj'].includes(this.$websiteName)){
                data['style'] = 'style67'
              }else if(['tyc82'].includes(this.$websiteName)){
                data['style'] = 'style69'
              }else if(['xpj80'].includes(this.$websiteName)){
                data['style'] = 'style71'
              }else if(['vns81'].includes(this.$websiteName)){
                data['style'] = 'style73'
              }
              if(!data.style) delete data.style
            this.$store.dispatch('game/myloveGame',data).then(res =>{
                 if(res.code==200){
                     this.$setObjByLocalStorage(`collect${this.gameType}_myLove`,res.data)
                     if(res.data.length>0){
                        if(status){
                            this.list_nav.unshift({
                                name: "我的最爱",
                                id: 1000
                            })
                        }
                        this.getMyLove()
                     }
                 } 
            })
        },
        informationData(){
            if(this.listDatas.length){
                this.listDatas.forEach((itemlist)=>{
                    if(itemlist.name=='电子游艺标签'||itemlist.name=='捕鱼游戏标签'||itemlist.name=='棋牌游戏标签'){
                        if (itemlist.list.length > 0) {
                            itemlist.list.forEach(val => {
                                switch (this.gameType){
                                   case 'slot':case 'chess':
                                   if(val.name!='推荐游戏'){
                                    if(val.id==9) val.id=9999
                                    this.list_nav.push(val)
                                    }else{
                                        if(val.games){
                                            this.swiperList=val.games
                                        }
                                    }
                                   break;
                                   default :
                                   if(val.name!='推荐捕鱼'){
                                    if(val.id==9) val.id=9999
                                    this.list_nav.push(val)
                                    }else{
                                        if(val.games){
                                            this.swiperList=val.games
                                        }
                                    }
                                    break;
                                }
                               
                            });
                            // this.initSwiperList()
                            // this.initgameKind()
                            for(var i=0;i<itemlist.list.length;i++){//热门游戏列表
                                if(itemlist.list[i].name=='热门游戏'){
                                    this.searchList=itemlist.list[i].games.slice(0,18)
                                }
                                let showsSearchList = this.$getObjByLocalStorage(`collectgames_${this.gameType}`);
                                this.searchList.forEach(val=>{
                                    this.changeId(val.className,val)
                                    val.love="no"
                                    if(showsSearchList){
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
                })
            }
            this.initSwiperList()
            this.initgameKind()
            this.list_nav.push({
                name: "收藏游戏",
                id: 999
            });
            this.getShowName()
        },
        initgameKind(){
            let kind;
            this.listDatas.length&&this.listDatas.forEach((itemlist)=>{
                if(itemlist.name=='电子游艺平台'||itemlist.name=='棋牌游戏平台'||itemlist.name=='捕鱼游戏平台'){
                    kind = itemlist.list
                }
            })
            for (let j = 0; j < kind.length; j++){
                if (kind[j].name.includes('捕鱼')) {
                    kind[j].gcid = idConfig.idImg[kind[j].gcid].id; 
                }
                if (kind[j].name.includes('全部')) {
                    kind[j].id = 0;
                }
            }
            this.gameKind = kind; 
        },
        initSwiperList(){
            let collectList = this.$getObjByLocalStorage(`collectgames_${this.gameType}`);
            this.swiperList.length&&this.swiperList.forEach(ele=>{
                this.changeId(ele.className,ele)
                 ele.love='no';
                 if(collectList){
                     for(let i=0;i<collectList.length;i++){
                        if(collectList[i].id== ele.id){
                            ele.love="yes"
                        }
                    }                
                 } 
            })
        },
        getShowName(){
            if(this.$route.query.navid){
                if(localStorage.token){
                    if(this.$route.query.navid==1000){
                        this.setNav({id: 1000 ,name: "我的最爱"})
                        this.setShowName('我的最爱')
                        return false 
                    }
                }
                if(!localStorage.token&&this.$route.query.navid==1000){
                    this.setNav(this.list_nav[0]);
                    this.setShowName(this.list_nav[0].name)
                    return false
                }
                this.list_nav.some(ele=>{
                     if(ele.id == this.$route.query.navid){
                         this.setNav(ele);
                         this.setShowName(ele.name)
                     }
                })
            }
        },
        setShowName(name){
            switch (name) {
              case "热门游戏":
                this.showName = "hotgame";
                break;
              case "最新游戏":
                this.showName = "newgame";
                break;
              case "奖金池游戏":
                this.showName = "jiangjingame";
                break;
              case "街机游戏":
                this.showName = "jiejigame";
                break;
              case "捕鱼游戏":
                this.showName = "buyugame";
                break;
              case "牛牛游戏":
                this.showName = "niuniugame";
                break;
              case "经典游戏":
                this.showName = "jingdian";
                break;
              case "百人游戏":
                this.showName = "bairengame";
                break;
              case "我的最爱":
                this.showName = "1000";
                break;
              case "热门捕鱼":
                this.showName='hotfish';
                break;
              case "推荐捕鱼":
                this.showName='tuifish';
                break;
              case "最新捕鱼":
                this.showName='newfish';
                break;      
              default:
                this.showName = "999";
                break;
            }
        },
        async setNav(item){
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            if(this.nav_active !== item.gcid){
                this.getNewShow=true;
                this.searchListShow=false;
                this.nav_active = item.id;
                this.GameListAll = [];
                this.showGameList = [];
                this.iptVal='';
                switch(item.id){
                    case 9:
                    if (this.$route.query.id&&this.$route.query.id!=0) {
                        this.gameKind.some(ele => {
                            if (ele.gcid == this.$route.query.id) {
                                this.setGameMaker(ele);
                            }
                            window.scrollTo(0, scrollTop);
                        });
                    } else {
                        this.setGameMaker(this.gameKind[0]); // 设置热门游戏标签 
                        window.scrollTo(0, scrollTop);
                    }
                    break;
                    case 1000:
                    this.getNewShow=false;
                    this.showName = '1000';
                    this.$router.push({
                    path: `/home/${this.gameType}`,
                    query: {
                        navid: item.id
                    }
                    });
                    setTimeout(()=>{
                        this.getMyLove();
                    },500)
                    window.scrollTo(0, scrollTop);
                    break;
                    case 999:
                    this.getNewShow=false;
                    this.showName='999',
                    this.$router.push({ path: `/home/${this.gameType}`, query: { navid: item.id } });
                    this.getCollect((res)=>{
                        this.getCollectList();
                    })
                    window.scrollTo(0, scrollTop);
                    break;
                    default:
                    let collectGame = this.$getObjByLocalStorage(`collectgames_${this.gameType}`);
                    if(collectGame){
                        this.collectList=collectGame
                    }
                    this.setShowName(item.name)
                    let itemList=item.games;
                    itemList.forEach(val=>{
                        val.love="no"
                        this.changeId(val.className,val)
                        for(let i=0;i<this.collectList.length;i++){
                            if(this.collectList[i].id== val.id){
                                val.love="yes"
                            }
                        }
                    })
                    this.$router.push({ path: `/home/${this.gameType}`, query: { navid: item.id } });
                    this.$setObjByLocalStorage('showgamelist',JSON.parse(JSON.stringify(itemList)));
                    this.GameListAll = itemList;
                    this.showGameList = itemList;
                    this.showPage=1
                    if(itemList.length<25){
                        this.showGameList= itemList
                    }else{
                        this.showGameList =itemList.slice(0,25)
                    }
                    window.scrollTo(0, scrollTop);
                    break;
                }
            }
        },
        getMyLove(){
            this.searchListShow=false;
            let collectGame = this.$getObjByLocalStorage(`collectgames_${this.gameType}`);
            let collectslot = this.$getObjByLocalStorage(`collect${this.gameType}_myLove`);
            if(collectslot.length){
                collectslot.forEach((ele) => {
                    ele.love = 'no'
                    collectGame.forEach((el) => {
                    if (ele.id == el.id) ele.love = 'yes'
                    })
                })
                this.GameListAll = collectslot.slice(0,25)
                this.showGameList = collectslot.slice(0,25)
                this.$setObjByLocalStorage('showgamelist',collectslot);
            }
        },
        getCollectList(){
            this.searchListShow=false;
            if(!localStorage.token){
                this.GameListAll = [];
                this.showGameList = [];
                return false 
            }else{
                let collectGame = this.$getObjByLocalStorage(`collectgames_${this.gameType}`);
                if(collectGame){
                    this.collectList = collectGame
                    if(this.$route.query.navid == 999){
                        this.GameListAll = collectGame;
                        this.showGameList = collectGame;
                    }
                }
            }
        },
        setGameMaker(item){
            this.iptVal = "";
            let scrollTop =
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            this.searchListShow = false;
            this.active = item.gcid;
            this.GameMakerData = item;
            this.GameListAll = [];
            this.GameTypeList = [];
            this.$router.push({
                path: `/home/${this.gameType}`,
                query: { navid: 9, id: item.gcid ? item.gcid : item.id }
            });

            if(this.gameType=='fish'){
                this.setGameTitle(item)
            }else{
                for (const key in this.GameMakerData.list) {
                    this.GameTypeList.push(
                    this.GameMakerData.list[key]
                    );
                }
                if(this.gameType=='slot'){
                    this.setGameType(
                            this.GameMakerData.list[Object.keys(this.GameMakerData.list)[0]]
                    );
                }else{
                   this.setGameTitle(this.GameMakerData.list[Object.keys(this.GameMakerData.list)[0]])
                }
            }
               window.scrollTo(0, scrollTop);
            },
        // 游戏类型设置
        setGameType(item) {
            if(item.games){
                this.gameType_active = item.id;
                this.setGameTitle(item)
            }else{
                this.gameTitleList = []
                this.gameType_active = item.id;
                for (const key in item.list) {
                    this.gameTitleList.push(item.list[key])
                }
                this.setGameTitle(item.list[Object.keys(item.list)[0]])
            }
        },
         // 游戏线数设置
        setGameTitle(item) {
            this.searchListShow=false;
            this.getNewShow=true;
            let collectGame = this.$getObjByLocalStorage(`collectgames_${this.gameType}`);
            if(collectGame){
                this.collectList=collectGame
            }
            let itemList=item.games;
            // if(this.gameType=='fish'){
            //     itemList=item.games;
            // }else{
            //     itemList=item.games;
            // }
            itemList.forEach(val=>{
                val.love="no"
                this.changeId(val.className,val)
                for(let i=0;i<this.collectList.length;i++){
                    if(this.collectList[i].id== val.id){
                        val.love="yes"
                    }
                }
            })
            this.gameTitle_active = item.id
            this.GameListAll = itemList;
            this.$setObjByLocalStorage('showgamelist',JSON.parse(JSON.stringify(itemList)));
            this.showGameList = itemList;
            this.showPage=1
            if(itemList.length<25){
                this.showGameList= itemList
            }else{
                this.showGameList =itemList.slice(0,25)
            }
        }, 
        changeId(name,val){
            switch (name) {
                case "开元棋牌":
                    val.upid='18';
                    break;
                case "乐游棋牌":
                    val.upid='19';
                    break;
                case "美博棋牌":
                    val.upid='12465';
                    break;
                case "MT棋牌":
                    val.upid='20';
                    break;
                case "天游棋牌":
                    val.upid='21';
                    break;
                case "凯旋棋牌":
                    val.upid='22';
                    break;
                case "大富翁":
                    val.upid='23';
                    break;
                case "新世界":
                    val.upid='24';
                    break;
                case "VG棋牌":
                    val.upid='25';
                    break;
                case "AK棋牌":
                    val.upid='26';
                    break;
                case "FG棋牌":
                    val.upid='27';
                    break;
                case "开元棋牌":
                    val.upid='18';
                    break;
                case "乐游棋牌":
                    val.upid='19';
                    break;
                case "MT棋牌":
                    val.upid='20';
                    break;
                case "天游棋牌":
                    val.upid='21';
                    break;
                case "凯旋棋牌":
                    val.upid='22';
                    break;
                case "大富翁":
                    val.upid='23';
                    break;
                case "新世界":
                    val.upid='24';
                    break;
                case "VG棋牌":
                    val.upid='25';
                    break;
                case "AK棋牌":
                    val.upid='26';
                    break;
                case "FG棋牌":
                    val.upid='27';
                    break;
                case "AG电子":
                    val.upid='75';
                    break;
                case "BBIN电子":
                    val.upid='76';
                    break;
                case "CQ9电子":
                    val.upid='77';
                    break;
                case "DT电子":
                    val.upid='78';
                    break;
                case "FG电子":
                    val.upid='79';
                    break;
                case "JDB电子":
                    val.upid='80';
                    break;
                case "MG电子":
                    val.upid='81';
                    break;
                case "MW电子":
                    val.upid='82';
                    break;
                case "PT电子":
                    val.upid='83';
                    break;
                case "PG电子":
                    val.upid='84';
                    break;
                case "PP电子":
                    val.upid='85';
                    break;  
                case "JDB捕鱼":
                    val.upid='198';
                    break;
                case "MT捕鱼":
                    val.upid='199';
                    break;
                case "AG捕鱼":
                    val.upid='200';
                    break;
                case "CQ9捕鱼":
                    val.upid='201';
                    break;
                case "MW捕鱼":
                    val.upid='202';
                    break;
                case "BG捕鱼":
                    val.upid='203';
                    break;
                case "FG捕鱼":
                    val.upid='204';
                    break;
                case "天游捕鱼":
                    val.upid='205';
                    break;
                case "开元捕鱼":
                    val.upid='206';
                    break;
                case "乐游捕鱼":
                    val.upid='207';
                    break;
                case "凯旋捕鱼":
                    val.upid='208';
                    break;
                case "BBIN捕鱼":
                    val.upid='209';
                    break;
                case "VG捕鱼":
                    val.upid='210';
                    break;
                case "MG捕鱼":
                    val.upid='211';
                    break;
                case "PT捕鱼":
                    val.upid='212';
                    break;
            }
        },
        onScroll(e) {
            let top = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条在Y轴上的滚动距离
            let vh = document.compatMode == 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight; // 浏览器视口的高度
            let height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); // 文档的总高度
            if (top + vh >= (height-600)) { // 滚动到底部
              this.getNewData(); // 如果已经滚到底了 获取数据
            }
        },
        getNewData(){
            if(this.getNewShow){
                let showgamelist = this.$getObjByLocalStorage(`showgamelist`);
                if(showgamelist){
                    this.showPage++
                    this.showList = showgamelist
                    this.showGameList =this.showList.slice(0,25*this.showPage)
                }
            }else{
                return false;
            }
        },
        joinCollect(item,index,type,name){
            if(name == 'mgm-preview' || name == 'betsb'||name=='vnso-preview'){
                this.$errorAlert('预览版 暂未开放', 'warn')
                return false
            }else{
                if(!localStorage.token){
                    this.$errorAlert("请先登录", "warn");
                    return false;
                }else{
                    let arr = [];
                    this.gameKind.forEach(ele => {
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
                    let params={
                        game_name: item.name,
                        game_desc: JSON.stringify({ ...item, love: "yes", orName: orName }),
                        type:this.gameType
                    }
                    this.$store.dispatch('game/collectGameV4',params).then(res=>{
                          if(res.code==200){
                              if(type=='tab'){
                                  if(this.iptVal){
                                      let showList=  this.$getObjByLocalStorage('searchlist')
                                      this.collectList.push(item);
                                      showList[index].love="yes";
                                      this.showGameList=showList
                                  }else{
                                      let showgamelist= this.$getObjByLocalStorage('showgamelist')
                                      if(showgamelist&&this.showPage==1){
                                         this.showList = showgamelist
                                         this.showGameList =this.showList.slice(0,25*this.showPage)
                                      }
                                      this.collectList.push(item);
                                      this.showGameList[index].love="yes";
                                      this.GameListAll[index].love="yes";
                                      this.$setObjByLocalStorage(`showgamelist`,this.GameListAll);
                                  }
                                  this.changSwiperList(item,'yes')
                              }else{
                                  this.isSwiper=false
                                  this.collectList.push(item);
                                  this.swiperList[index].love='yes';
                                  setTimeout(()=>{
                                      this.isSwiper=true
                                  },100)
                                  this.changGameList(item)
                              }
                              this.$setObjByLocalStorage(`collectgames_${this.gameType}`,this.collectList);
                          }else{
                              this.$errorAlert(res.message, "warn"); 
                          }
                    })
                }
            }
            
        },
        cancelCollect(item, index,type){
           let delid;
           if(!item.sortid){
                this.getCollect((res)=>{
                    res.data.forEach(ele=>{
                        if(ele.id =item.id) delid=ele.sortid
                    })
                    this.deleteCollectGame(item,index,delid,type)
                })
           }else{
              this.deleteCollectGame(item,index,item.sortid,type)
           }
        },
        deleteCollectGame(item,index,delid,type){
            this.$store.dispatch('game/deleteCollectGameV4',{deleteids:delid}).then(res=>{
                 if(res.code==200){
                     if(type=='tab'){
                         switch(this.$route.query.navid){
                             case 999:
                             this.isLazy=false
                             if(this.iptVal){
                                let showList=  this.$getObjByLocalStorage('searchlist')
                                showList.splice(index, 1);
                                this.showGameList=showList;
                                for (var i=0;i<this.collectList.length;i++){
                                    if (this.collectList[i].id==item.id){
                                        this.collectList.splice(i,1);
                                    }    
                                }
                                this.$setObjByLocalStorage(`searchlist`,this.showGameList);
                                this.$setObjByLocalStorage(`collectgames_${this.gameType}`,this.collectList);
                             }else{
                                this.collectList.splice(index, 1);
                                this.showGameList=this.collectList;
                                this.$setObjByLocalStorage(`collectgames_${this.gameType}`,this.collectList);
                             }
                             this.changSwiperList(item,'no');
                             setTimeout(()=>{
                                this.isLazy=true
                            },3000)
                             break;
                             default :
                               if(this.iptVal){
                                   if(this.searchListShow){
                                        this.showList = this.$getObjByLocalStorage('searchlist')
                                        this.showGameList =this.showList
                                        this.showGameList[index].love="no";
                                   }else{
                                        this.showGameList[index].love="no"; 
                                   }
                               }else{
                                    let showgamelist=this.$getObjByLocalStorage('showgamelist')
                                    if(showgamelist&&this.showPage==1){
                                        this.showList=showgamelist
                                        this.showGameList =this.showList.slice(0,25*this.showPage)
                                    }
                                    this.showGameList[index].love="no";
                                    this.GameListAll[index].love="no";
                                    this.$setObjByLocalStorage(`showgamelist`,this.GameListAll);
                                    for (var i=0;i<this.collectList.length;i++){
                                        if (this.collectList[i].id==item.id){
                                            this.collectList.splice(i,1);
                                        }    
                                    }
                                    this.$setObjByLocalStorage(`collectgames_${this.gameType}`,this.collectList); 
                                    
                               }
                               this.changSwiperList(item,'no');
                             break
                         }
                     }else{
                        this.isSwiper=false
                        this.swiperList[index].love='no';
                        for (var i=0;i<this.collectList.length;i++){
                            if (this.collectList[i].id==item.id){
                                this.collectList.splice(i,1);
                            }    
                        }
                        setTimeout(()=>{
                            this.isSwiper=true
                        },100)
                        this.$setObjByLocalStorage(`collectgames_${this.gameType}`,this.collectList);   
                        this.changGameList(item)
                     }
                 }
            })
        },
        changGameList(item){
            this.showGameList.filter(ele=>{if(ele.id==item.id){ele.love=item.love}})
        },
        changSwiperList(item,status){
            this.isSwiper=false
            this.swiperList.filter(ele=>{if(ele.id==item.id){ele.love=status=='yes'?'yes':'no'}})
            setTimeout(()=>{
                this.isSwiper=true
            },100)
        },
        search(){
            this.getNewShow=false;
            this.searchListShow=false;
            if(this.iptVal){
                let gameList = [];
                let showList = [];
                switch(this.$route.query.navid){
                    case 999:
                    let collectGame = this.$getObjByLocalStorage(`collectgames_${this.gameType}`);
                    if(collectGame){
                        showList=collectGame;
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
                    break;
                    case 1000:
                    let collectslot = this.$getObjByLocalStorage(`collect${this.gameType}_myLove`);
                       if(collectslot){
                        showList=collectslot
                        gameList = showList.filter(item => {
                            if (item.name.includes(this.iptVal)) {
                            return item;
                            }
                        });
                        this.showGameList = gameList
                       }else{
                          this.searchListShow = true;
                          this.showGameList = this.searchList
                       }
                    break;
                    default :
                    let showgamelist=this.$getObjByLocalStorage('showgamelist');
                       if(showgamelist){
                           showList = showgamelist
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
                       this.$setObjByLocalStorage(`searchlist`,this.showGameList);
                    break

                }
            }else{
                 switch(this.$route.query.navid){
                     case 999:
                     let collectGame = this.$getObjByLocalStorage(`collectgames_${this.gameType}`);
                        if(collectGame){
                            this.searchListShow=false;
                            this.showGameList = collectGame
                        }else{
                            this.searchListShow=true;
                        }
                     break;
                     default:
                     let showgamelist= this.$getObjByLocalStorage(`showgamelist`);
                         if(showgamelist){
                             let itemList = showgamelist
                             this.GameListAll = itemList;
                             this.showPage=1;
                             this.getNewShow=true;
                             if(itemList.length<25){
                                this.showGameList= itemList
                             }else{
                                this.showGameList =itemList.slice(0,25)
                            }
                         }
                     break;
                 }
                 
            } 
        }
    },
    created () {
        this.idConfig = idConfig;
        window.addEventListener('scroll', this.onScroll);
        if(!localStorage.token){
            ['slot','chess','fish'].forEach(ele=>{
                localStorage.removeItem(`collectgames_${ele}`)
                localStorage.removeItem(`collect${ele}_myLove`)
            })
            localStorage.removeItem('searchlist')
        }
    },
    mounted () {
        this.getAllDatas()
        // setTimeout(()=>{
        //     if(localStorage.token){
        //         this.getMyloveGame(false)
        //     }
        // },1000)
    },
    destroyed(){
        window.removeEventListener('scroll', this.onScroll);
    },
    watch: {
        "$route.query.id"(newPath) {
            if (newPath === 0 || newPath) {
                this.gameKind.some(ele => {
                if (ele.gcid == newPath) {
                    this.setGameMaker(ele);
                }
                });
            }
        },
    }
}
export default mixin;