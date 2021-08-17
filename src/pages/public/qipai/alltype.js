import { postS, getS, _SetGet, _SetPost } from '@/service/public/service.js';
import UserService from '@/service/public/UserService.js';
const mixin = {
  data() {
    return {
      listDatas: [], //总数据
      listData: [],
      jiazai: true,
      rollList: [],
      nav_show: 'top',
      list_nav: [ //一级导航
        {
          id: 9,
          'name': '全部游戏'
        }
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
      setInter: null,
      listDatas: [], //总数据
      listData: {}, //总数据里list 
      nav_active: 99,
      active: 99,
      gameType_active: 99,
      gameTitle_active: 99,
      swiperList: [], //滚动展示列表
      GameListAll: [], //展示的游戏列表
      showGameList: [], //搜索数据
      GameMakerData: [], //游戏厂商
      gameTitleList: [], //游戏类型列表
      GameTypeList: [],
      collectList: [],
      showName: '',
      iptVal: '',
      searchListShow: false, //显示推荐热门
      searchList: [],
      leftImageSrc: '/static/' + this.themes.name + '/img/new_games/next_l.png',
      rightImageSrc: '/static/' + this.themes.name + '/img/new_games/next_r.png',
      myLoveGameList: [],
    }

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
    setSwiper(num) {
      if (num === 1) {
        this.swiper.slidePrev();
      } else if (num === 2) {
        this.swiper.slideNext();
      } else if (num === 3) {
        this.swiper1.slidePrev();
      } else if (num === 4) {
        this.swiper1.slideNext();
      } else if (num === 5) {
        this.swiper2.slidePrev();
      } else if (num === 6) {
        this.swiper2.slideNext();
      }
    },
    async search() {
      this.searchListShow = false;
      if (this.iptVal) {
        let gameList = [];
        let showList = [];
        if (this.$route.query.navid == 999) {
          if (sessionStorage.collectgames_chess) {
            showList = JSON.parse(sessionStorage.getItem("collectgames_chess"))
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
        } else if (this.$route.query.navid == 1000) {
          if (sessionStorage.collectchess_myLove) {
            showList = JSON.parse(sessionStorage.getItem("collectchess_myLove"))
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
        } else {
          if (sessionStorage.showgamelist) {
            showList = JSON.parse(sessionStorage.getItem("showgamelist"))
          }
          gameList = showList.filter(item => {
            if (item.name.includes(this.iptVal)) {
              return item;
            }
          });
          if (gameList.length < 1) {
            this.showGameList = this.searchList
            this.searchListShow = true;
          } else {
            this.searchListShow = false;
            this.showGameList = gameList
          }
        }
        sessionStorage.setItem("searchlist", JSON.stringify(this.showGameList));
      } else {
        if (this.$route.query.navid == 999) {
          if (sessionStorage.collectgames_chess) {
            this.searchListShow = false;
            this.showGameList = JSON.parse(sessionStorage.getItem("collectgames_chess"))
          } else {
            this.searchListShow = true;
          }
        } else {
          if (sessionStorage.showgamelist) {
            let itemList = JSON.parse(sessionStorage.getItem("showgamelist"))
            this.GameListAll = itemList;
            this.showGameList = itemList
          }
        }
      }
    },
    //获取全部参数 是否在session里 不在则获取
    async getAllDatas() {
      let allGame = sessionStorage.getItem("chessgame");
      let collectGame = sessionStorage.getItem("collectgames_chess");
      let collectchess = sessionStorage.getItem("collectchess_myLove");
      if (collectchess) {
        collectchess = JSON.parse(collectchess);
      } else {
        let data = {
          type: 10004,
          device: "pc"
        }
        this.$http.post(`${this.$HOST_NAME}/myloveGame`, data).then(res => {
          if (res.code === 200) {
            collectchess = res.data;
            sessionStorage.setItem("collectchess_myLove", JSON.stringify(res.data))
          }
        })
      }
      if (allGame) { // 有缓存,可以不用请求数据
        allGame = JSON.parse(allGame);
      } else {
        let res = await postS(`ChessFishSort`, {
          device: "pc",
          type: "1"
        });
        if (res && res.code === 200) {
          allGame = res.data;
          sessionStorage.setItem("chessgame", JSON.stringify(res.data));
        }
      }
      if (collectGame) { // 有缓存,可以不用请求数据
        collectGame = JSON.parse(collectGame);
      } else {
        let res = await postS(`memberCollectGames`, {
          type: "chess"
        });
        if (res && res.code === 200) {
          collectGame = res.data;
          sessionStorage.setItem("collectgames_chess", JSON.stringify(res.data));
        }
      }
      this.listDatas = allGame.list;
      if (this.listDatas.label.length > 0) {
        this.listDatas.label.forEach(val => {
          if (val.name != '推荐游戏') {
            this.list_nav.push(val)
          } else {
            if (val.list) {
              let swipList = val.list
              for (let i = 1; i <= Math.ceil(swipList.length / 5); i++) {
                this.swiperList.push({
                  'id': i,
                  'list': swipList.slice((i - 1) * 5, i * 5)
                })
              }
            }
          }
        });
        for (var i = 0; i < this.listDatas.label.length; i++) { //热门游戏列表
          if (this.listDatas.label[i].name == '热门游戏') {
            this.searchList = this.listDatas.label[i].list.slice(0, 15)
          }
          this.searchList.forEach(val => {
            val.love = "no"
            if (sessionStorage.collectgames_chess) {
              let showsSearchList = JSON.parse(sessionStorage.getItem("collectgames_chess"))
              for (let i = 0; i < showsSearchList.length; i++) {
                if (showsSearchList[i].id == val.id) {
                  val.love = "yes"
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
        if (collectchess) {
          this.list_nav.push({
            name: "我的最爱",
            id: 1000
          })
        }
        if (this.$route.query.navid) {
          this.list_nav.some(ele => {
            if (ele.id == this.$route.query.navid) {
              this.setNav(ele);
              if (ele.name == "热门游戏") {
                this.showName = 'hotgame';
              } else if (ele.name == "最新游戏") {
                this.showName = 'newgame';
              } else if (ele.name == "牛牛游戏") {
                this.showName = 'niuniugame';
              } else if (ele.name == "百人游戏") {
                this.showName = 'bairengame';
              } else if (ele.name == "捕鱼游戏") {
                this.showName = 'buyugame';
              } else if (ele.name == "我的最爱") {
                this.showName = '1000';
              } else {
                this.showName = '999';
              }
            }
          });
        } else {
          this.setNav(this.list_nav[0]);
        }
      })
    },
    getMyLove() {
      let data = {
        type: 10004,
        device: "pc"
      }
      this.$http.post(`${this.$HOST_NAME}/myloveGame`, data).then(res => {
        if (res.code === 200) {
          sessionStorage.setItem("collectgames_myLove", JSON.stringify(res.data))
          return res.data
        }
      })

    },
    //一级导航点击
    setNav(item) {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.nav_active !== item.id) {
        this.searchListShow = false;
        this.nav_active = item.id;
        this.GameListAll = [];
        this.showGameList = [];
        this.iptVal = '';
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
        } else if (item.id == 1000) {
          this.showName = '1000';
          this.$router.push({
            path: "/home/qipai",
            query: {
              navid: item.id
            }
          });
          this.getMyLoveList();
          window.scrollTo(0, scrollTop);
        }
        //收藏游戏
        else if (item.id == 999) {
          this.showName = '999';
          this.getCollectList();
          this.$router.push({
            path: "/home/qipai",
            query: {
              navid: item.id
            }
          });
          window.scrollTo(0, scrollTop);
        } else {
          if (sessionStorage.collectgames_chess) {
            this.collectList = JSON.parse(sessionStorage.getItem("collectgames_chess"))
          }
          if (item.name == "热门游戏") {
            this.showName = 'hotgame';
          } else if (item.name == "最新游戏") {
            this.showName = 'newgame';
          } else if (item.name == "牛牛游戏") {
            this.showName = 'niuniugame';
          } else if (item.name == "百人游戏") {
            this.showName = 'bairengame';
          } else if (item.name == "捕鱼游戏") {
            this.showName = 'buyugame';
          }
          let itemList = item.list;
          itemList.forEach(val => {
            val.love = "no"
            for (let i = 0; i < this.collectList.length; i++) {
              if (this.collectList[i].id == val.id) {
                val.love = "yes"
              }
            }
          })
          this.$router.push({
            path: "/home/qipai",
            query: {
              navid: item.id
            }
          });
          sessionStorage.setItem("showgamelist", JSON.stringify(itemList));
          this.GameListAll = itemList;
          this.showGameList = itemList;
          window.scrollTo(0, scrollTop);
        }
      }
    },
    // 游戏厂商设置
    setGameMaker(item) {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.searchListShow = false;
      this.active = item.id;
      this.GameMakerData = item;
      this.GameListAll = [];
      this.GameTypeList = [];
      this.$router.push({
        path: "/home/qipai",
        query: {
          navid: 9,
          id: item.id
        }
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
      this.searchListShow = false;
      if (sessionStorage.collectgames_chess) {
        this.collectList = JSON.parse(sessionStorage.getItem("collectgames_chess"))
      }
      let itemList = item.list;
      itemList.forEach(val => {
        val.love = "no"
        for (let i = 0; i < this.collectList.length; i++) {
          if (this.collectList[i].id == val.id) {
            val.love = "yes"
          }
        }
      })
      this.gameTitle_active = item.id
      this.GameListAll = itemList;
      sessionStorage.setItem("showgamelist", JSON.stringify(itemList));
      this.showGameList = itemList;
    },
    //加入收藏
    joinCollect(item, index) {
      if (!localStorage.token || !localStorage.userinfo) {
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
            game_desc: JSON.stringify({
              ...item,
              love: "yes",
              orName: orName
            }),
            type: "chess"
          })
          .then(res => {
            if (res.code == 200) {
              if (this.iptVal) {
                let showList = JSON.parse(sessionStorage.getItem("searchlist"))
                this.collectList.push(item);
                showList[index].love = "yes";
                this.showGameList = showList
              } else {
                if (sessionStorage.showgamelist) {
                  setTimeout(()=>{
                    this.showList = JSON.parse(sessionStorage.getItem("showgamelist"))
                    this.showGameList = this.showList
                  })
                }
                this.collectList.push(item);
                this.showGameList[index].love = "yes";
                this.GameListAll[index].love = "yes";
                sessionStorage.setItem("showgamelist", JSON.stringify(this.GameListAll));
              }
              sessionStorage.setItem("collectgames_chess", JSON.stringify(this.collectList));
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
        let res = await postS(`memberCollectGames`, {
          type: "chess"
        });
        if (res && res.code === 200) {
          sessionStorage.setItem("collectgames_chess", JSON.stringify(res.data));
          res.data.forEach(ele => {
            if (ele.id = item.id) delid = ele.sortid
          })
          this.deleteCollectGame(item, index, delid);
        }
      } else{
        this.deleteCollectGame(item, index, item.sortid);
      }

    },
    deleteCollectGame(item, index, delid) {
      this.$http.post(`${this.$HOST_NAME}/deleteCollectGame`, {
        deleteids: delid
      }).then(res => {
        if (res.code == 200) {
          if (this.$route.query.navid == 999) {
            if (this.iptVal) {
              let showList = JSON.parse(sessionStorage.getItem("searchlist"))
              showList.splice(index, 1);
              this.showGameList = showList;
              for (var i = 0; i < this.collectList.length; i++) {
                if (this.collectList[i].id == item.id) {
                  this.collectList.splice(i, 1);
                }
              }
              sessionStorage.setItem("searchlist", JSON.stringify(this.showGameList));
              sessionStorage.setItem("collectgames_chess", JSON.stringify(this.collectList));
            } else {
              this.collectList.splice(index, 1);
              this.showGameList = this.collectList;
              sessionStorage.setItem("collectgames_chess", JSON.stringify(this.collectList));
            }

          } else {
            if (this.iptVal) {
              if (this.searchListShow) {
                this.showList = JSON.parse(sessionStorage.getItem("searchlist"))
                this.showGameList = this.showList
                this.showGameList[index].love = "no";
              } else {
                this.showGameList[index].love = "no";
              }
            } else {
              if (sessionStorage.showgamelist) {
                setTimeout(()=>{
                  this.showList = JSON.parse(sessionStorage.getItem("showgamelist"))
                  this.showGameList = this.showList
                })
              }
              this.showGameList[index].love = "no";
              this.GameListAll[index].love = "no";
              sessionStorage.setItem("showgamelist", JSON.stringify(this.GameListAll));
            }
            for (var i = 0; i < this.collectList.length; i++) {
              if (this.collectList[i].id == item.id) {
                this.collectList.splice(i, 1);
              }
            }
            sessionStorage.setItem("collectgames_chess", JSON.stringify(this.collectList));
          }
        } else {
          this.errorAlert(res.message, "warn");
        }
      });
    },
    getCollectList() {
      this.searchListShow = false;
      if (!localStorage.token || !localStorage.userinfo) {
        this.errorAlert("请先登录", "warn");
        return false;
        this.GameListAll = [];
        this.showGameList = [];
        return false
      } else {
        this.$http.post(`${this.$HOST_NAME}/memberCollectGames`, {
          type: "chess"
        }).then(res => {
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
    getMyLoveList() {
      this.searchListShow = false;
      let collectchess = JSON.parse(sessionStorage.getItem("collectchess_myLove"))
      let collectGame = JSON.parse(sessionStorage.getItem("collectgames_chess"));
      if (collectchess) {
        collectchess.forEach((ele) => {
          ele.love = 'no'
          collectGame.forEach((el) => {
            if (ele.id == el.id) ele.love = 'yes'
          })
        })
        this.GameListAll = collectchess.slice(0,25)
        this.showGameList = collectchess.slice(0,25)
      }
    },
    idToName: function (id) {
      if (id == 10015) {
        return id = 'AG'
      } else if (id == 10016) {
        return id = 'BBIN'
      } else if (id == 10018) {
        return id = 'CQ9'
      } else if (id == 10019) {
        return id = 'DT'
      } else if (id == 10020) {
        return id = 'FG'
      } else if (id == 10021) {
        return id = 'JDB'
      } else if (id == 10022) {
        return id = 'MG'
      } else if (id == 10023) {
        return id = 'MW'
      } else if (id == 10024) {
        return id = 'PT'
      } else if (id == 10025) {
        return id = 'TTG'
      } else if (id == 10014) {
        return id = 'AE'
      } else {
        return id = ''
      }
    },
    changeSrc1() {
      this.leftImageSrc = '/static/' + this.themes.name + '/img/new_games/next_l_a.png'
    },
    changeSrc2() {
      this.leftImageSrc = '/static/' + this.themes.name + '/img/new_games/next_l.png'
    },
    changeSrc3() {
      this.rightImageSrc = '/static/' + this.themes.name + '/img/new_games/next_r_a.png'
    },
    changeSrc4() {
      this.rightImageSrc = '/static/' + this.themes.name + '/img/new_games/next_r.png'
    },
  },
  created() {
    if (localStorage.userinfo || localStorage.token) {
      this.showUserInfo = localStorage.userinfo
    } else {
      this.showUserInfo = ''
      sessionStorage.removeItem("chessgame")
      sessionStorage.removeItem("collectgames_chess")
      sessionStorage.removeItem("searchlist")
      sessionStorage.removeItem("collectchess_myLove")
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
}
export default mixin;