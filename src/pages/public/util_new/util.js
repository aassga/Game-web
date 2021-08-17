export default {
  install(Vue) {
    Vue.prototype.$goPath = function (type, path, opneWay) {
      switch (type) {
        case 'open':
          window.open("#" + path)
          break;
        case 'lot':
          break;
        case 'one':
          switch (path.type) {
            case 'service':
              let service = JSON.parse(localStorage.config).service;
              if (service) {
                let ser = service.find(item => item.status === 'on')
                if (ser) {
                  window.open(ser.url);
                }
              }
              break;
            case 'load':
              if (this.$websiteName == 'vnso') {
                window.open('/static/vnso/html/download/index.html');
              }
              if (this.$websiteName == 'jltx') {
                window.open('/static/jltx/html/download/index.html');
              } else if (this.$websiteName == '478qp') {
                window.open('/static/478qp/html/download/index.html');
              } else if (this.$websiteName == '99qp') {
                window.open('/static/99qp/html/download/index.html');
              } else {
                window.open('/static/jltx-new/html/download/index.html');
              }
              break;
            case 'lottery':
              if (this.$websiteName == "betsb") {
                this.$errorAlert('预览版 暂未开放', 'warn');
                return false
              } else {
                window.open("#/plays/hall");
              }

              break;
            case 'open':
              window.open("#" + path.link);
              break;
              case 'openNew':
                window.open(path.link);
                break;
            case 'slot':
            case 'chess':
            case 'fish':
              let collectslot = this.$getObjByLocalStorage(`collect${path.type}_myLove`);
              if (collectslot && collectslot.length > 0) this.$router.push({
                path: `/home/${path.type}?navid=1000`
              });
              else this.$router.push(path.link);
              break;
            case 'lottery_review':
              this.$errorAlert('预览版 暂未开放', 'warn');
              break;

            case 'mgm-preview':
              console.log('666')
              this.$errorAlert('预览版 暂未开放', 'warn');
              break;
            case 'betsb-preview':
              this.$errorAlert('预览版 暂未开放', 'warn');
              break;
            case 'bet365':
              this.$errorAlert('预览版 暂未开放', 'warn');
              break;
            case 'youhui':
              this.$errorAlert('预览版 暂未开放', 'warn');
              break;
            default:
              if (path.link == "" || path.link == undefined) return false
              if (opneWay && opneWay == 'open') window.open(path.link)
              else this.$router.push(path.link);
          }
          break;
        case '500w':
          this.$errorAlert('游戏暂未开放', 'warn');
          break;
        case 'main':
          if (localStorage.token) {
            if (path.type == 'live') {
              this.$loginGame(path);
            } else {
              this.$store.dispatch('lottery/getStopLotteryCheck', path.id).then(res => {
                if (res && res.length > 0) {
                  this.$store.commit('alert/showTipModel', {
                    bool: true,
                    title: res.replace(/，/g, '</br>'),
                    model: 'warn',
                    type: 'closeMaret',
                  });
                } else {
                  window.open(path.router)
                  return false
                }
              })
            }
          } else {
            this.dNotify("请先登录", 'error')
          }
          break;
        case 'rot':
          if (path == "service") {
            let service = JSON.parse(localStorage.config).service;
            if (service) {
              let ser = service.find(item => item.status === 'on')
              if (ser) {
                window.open(ser.url);
              }
            }
          } else if (path == "/plays/hall") {
            window.open("#/plays/hall");
          } else {
            if (path == "" || path == undefined) return false
            if (opneWay && opneWay == 'open') window.open(path)
            else this.$router.push(path);
          }
          break;
        case 'game':
          break;
        case 'nav':
          if (path.type == 'live' || path.type == 'game2') {
            this.$loginGame(path)
          } else {
            this.$router.push(path.link);
          }
          break;
        default:
          break
      }
    }
    Vue.prototype.$gameClass = function (type) {
      // if (localStorage['gameList']) {
      let gamelist = []
      if (type == 'chess') {
        let chess_game = this.$getObjByLocalStorage("chess_game_new").list.platform;
        chess_game = chess_game.filter(ele => ele.name != '全部')
        chess_game.forEach((game) => {
          const qipai = {
            name: game.name,
            type: 'chess',
            link: `/home/chess?navid=9&id=${game.id}`,
          }
          switch (game.id) {
            case 10042:
              qipai.id = 243
              break;
            case 10041:
              qipai.id = 10091
              break;
            case 10612:
              qipai.id = 10613
              break;
            case 10636:
              qipai.id = 10693
              break;
            case 10694:
              qipai.id = 10695
              break;
            case 10732:
              qipai.id = 10733;
              break;
          }
          gamelist.push(qipai)
        })
      }
      if (type == 'sport') {
        let sport_game_new = this.$getObjByLocalStorage("sport_game_new");
        sport_game_new.forEach((game) => {
          if (this.$websiteName == 'blr' && game.id == 11756) {
            game.className = '365体育'
          }
          const sport = {
            name: game.className,
            type: 'sport',
            link: `/home/tiyu?id=${game.id}`,
            id: game.id
          }
          gamelist.push(sport)
        })
      }
      if (type == 'fish') {
        let fish_game = this.$getObjByLocalStorage("fish_game_new").list.platform;
        fish_game = fish_game.filter(ele => ele.name.includes('捕鱼'))
        fish_game.forEach((game) => {
          const qipai = {
            name: game.name,
            type: 'fish',
            link: `/home/fish?navid=9&id=${game.id}`,
          }
          if (game.id == 10054 || game.id == 10055 || game.id == 10057 || game.id == 11660 || game.id == 10056 || game.id == 10057) {
            qipai.id = game.id
            gamelist.push(qipai)
          }
        })
      }
      if (type == 'live') {
        let live_game_new = this.$getObjByLocalStorage("live_game_new");
        live_game_new.forEach((game) => {
          const live = {
            name: game.className,
            type: 'live',
            link: `/home/live`,
            id: game.id
          }
          gamelist.push(live)
        })

      }
      return gamelist
      // }
    }
    Vue.prototype.$getGameV4 = function (type, id) {
      let gameV4 = []
      let correlation = this.$getObjByLocalStorage(`gameSortV4_note`).correlation;
      if (type == 'chess') {
        let chess_game;
        this.$getObjByLocalStorage("gameSortV4_chess").forEach((gamelist) => {
          if (gamelist.name == '棋牌游戏平台') chess_game = gamelist.list
        })
        if (!chess_game.length) return false
        chess_game.forEach((game) => {
          if (game.gcid == id) {
            let chess = game.list.filter(ele => ele.name == '全部游戏')
            gameV4 = chess[0].games
          }
        })
      }
      if (type == 'slot') {
        let slot_game;
        this.$getObjByLocalStorage("gameSortV4_slot").forEach((gamelist) => {
          if (gamelist.name == '电子游艺平台') slot_game = gamelist.list
        })
        // let slot_game = this.$getObjByLocalStorage("gameSortV4_slot")[1].list;
        if (!slot_game.length) return false
        slot_game.forEach((game) => {
          if (game.gcid == id) {
            let slot = game.list.filter(ele => ele.name == '全部游戏')
            gameV4 = slot[0].list[0].games
          }
        })
      }
      if (type == 'fish') {
        let fish_game;
        this.$getObjByLocalStorage("gameSortV4_fish").forEach((gamelist) => {
          if (gamelist.name == '捕鱼游戏平台') fish_game = gamelist.list
        })
        if (!fish_game.length) return false
        fish_game.forEach((game) => {
          game.id = correlation[game.id]
          if (game.id == id) {
            gameV4 = game.games
          }
        })
      }
      if (type == 'lottery') {
        let lot_game = this.$getObjByLocalStorage("gameSortV4_lottery").list;
        if (!lot_game.length) return false
        lot_game.forEach((game) => {
          if (game.id == id) {
            gameV4 = game.games
          }
        })
      }
      return gameV4
    }
    Vue.prototype.$gameClassV4 = function (type) {
      let gamelist = []
      let correlation = this.$getObjByLocalStorage(`gameSortV4_note`).correlation;
      if (type == 'chess') {
        let chess_game;
        this.$getObjByLocalStorage("gameSortV4_chess").forEach((gamelist) => {
          if (gamelist.name == '棋牌游戏平台') chess_game = gamelist.list
        })
        if (!chess_game.length) return false
        chess_game = chess_game.filter(ele => ele.name != '全部')
        chess_game.forEach((game) => {
          const qipai = {
            name: game.name,
            type: 'chess',
            link: `/home/chess?navid=9&id=${game.gcid}`,
            id: game.gcid
          }
          switch (game.id) {
            case 10042:
              qipai.id = 243
              break;
            case 10041:
              qipai.id = 10091
              break;
            case 10612:
              qipai.id = 10613
              break;
            case 10636:
              qipai.id = 10693
              break;
            case 10694:
              qipai.id = 10695
              break;
            case 10732:
              qipai.id = 10733;
              break;
          }
          gamelist.push(qipai)
        })
      }
      if (type == 'sport') {
        let sport_game_new = this.$getObjByLocalStorage("gameSortV4_sport").games;
        sport_game_new.forEach((game) => {
          const sport = {
            name: game.className,
            type: 'sport',
            link: `/home/tiyu?id=${game.id}`,
            id: game.id
          }
          gamelist.push(sport)
        })
      }
      if (type == 'live') {
        let live_game_new = this.$getObjByLocalStorage("gameSortV4_live").games;
        live_game_new.forEach((game) => {
          const live = {
            name: game.className,
            type: 'live',
            link: `/home/live`,
            id: game.id
          }
          gamelist.push(live)
        })
      }
      if (type == 'fish') {
        let fish_game;
        this.$getObjByLocalStorage("gameSortV4_fish").forEach((gamelist) => {
          if (gamelist.name == '捕鱼游戏平台') fish_game = gamelist.list
        })
        if (!fish_game.length) return false
        fish_game = fish_game.filter(ele => ele.name.includes('捕鱼'))
        fish_game.forEach((game) => {
          const qipai = {
            name: game.name,
            type: 'fish',
            link: `/home/fish?navid=9&id=${game.gcid}`,
            id: game.gcid
          }
          let mathFishId = {
            10054: {
              id: 10021
            },
            10055: {
              id: 10015
            },
            10056: {
              id: 10020
            },
            10057: {
              id: 10018
            },
            10053: {
              id: 10023
            },
            10058: {
              id: 10058
            },
            11660: {
              id: 10694
            },
            11659: {
              id: 10042
            },
            11661: {
              id: 10612
            },
            11440: {
              id: 10016
            },
            11662: {
              id: 10041
            },
            11746: {
              id: 10022
            },
            11677: {
              id: 10024
            },
            12036: {
              id: 11775
            },
            12042: {
              id: 11828
            }
          }
          if(mathFishId[qipai.id]) qipai.id= mathFishId[qipai.id].id
          gamelist.push(qipai)
        })
      }
      if (type == 'slot') {
        let slot_game;
        this.$getObjByLocalStorage("gameSortV4_slot").forEach((gamelist) => {
          if (gamelist.name == '电子游艺平台') slot_game = gamelist.list
        })
        if (!slot_game.length) return false
        slot_game = slot_game.filter(ele => ele.name != '全部')
        slot_game.forEach((game) => {
          const slot = {
            name: game.name,
            type: 'slot',
            link: `/home/slot?navid=9&id=${game.gcid}`,
            id: game.gcid
          }
          gamelist.push(slot)
        })
      }
      return gamelist
    }
    Vue.prototype.$gameData = function (type) {
      if (type == 'sport') {
        if (!localStorage.sport_game_new) {
          this.$store.dispatch('game/gameSortNew', {
            device: "pc",
            id: 10002
          }).then(res => {
            if (res && res.code == 200) {
              this.$setObjByLocalStorage('sport_game_new', res.data[10002]);
            }
          })
        }
      }
      if (type == 'live') {
        if (!localStorage.live_game_new) {
          this.$store.dispatch('game/gameSortNew', {
            device: "pc",
            id: 10003
          }).then(res => {
            if (res && res.code == 200) {
              this.$setObjByLocalStorage('live_game_new', res.data[10003]);
            }
          })
        }
      }
    }
    Vue.prototype.$getAllgame = function (callback) {
      if (!localStorage.chess_game_new) {
        this.$store.dispatch('game/ChessFishSort', {
          device: "pc",
          type: "1"
        }).then(res => {
          if (res && res.code == 200) {
            this.$setObjByLocalStorage('chess_game_new', res.data);
          }
        })
      }
      if (!localStorage.sport_game_new) {
        this.$store.dispatch('game/gameSortNew', {
          device: "pc",
          id: 10002
        }).then(res => {
          if (res && res.code == 200) {
            this.$setObjByLocalStorage('sport_game_new', res.data[10002]);
          }
        })
      }
      if (!localStorage.live_game_new) {
        this.$store.dispatch('game/gameSortNew', {
          device: "pc",
          id: 10003
        }).then(res => {
          if (res && res.code == 200) {
            this.$setObjByLocalStorage('live_game_new', res.data[10003]);
          }
        })
      }
      if (!localStorage.slot_game_new) {
        this.$store.dispatch('game/gameSortSlot', {
          device: "pc"
        }).then(res => {
          if (res && res.code == 200) {
            this.$setObjByLocalStorage('slot_game_new', res.data);
          }
        })
      }
      if (!localStorage.fish_game_new) {
        this.$store.dispatch('game/ChessFishSort', {
          device: "pc",
          type: "2"
        }).then(res => {
          if (res && res.code == 200) {
            this.$setObjByLocalStorage('fish_game_new', res.data);
            if (typeof callback != "undefined") {
              callback()
            }
          }
        })
      }
      if (localStorage.token) {
        ['slot', 'fish', 'chess'].forEach((game) => {
          let love = this.$getObjByLocalStorage(`collect${game}_myLove`);
          if (!love) {
            let data = {
              type: '',
              device: "pc"
            }
            switch (game) {
              case 'slot':
                data.type = 10001;
                break;
              case 'chess':
                data.type = 10004;
                break;
              default:
                data.type = 10005;
                break;
            }
            this.$store.dispatch('game/myloveGame', data).then(res => {
              if (res.code == 200) {
                this.$setObjByLocalStorage(`collect${game}_myLove`, res.data)
              }
            })
          }
        })
      }
    }
    Vue.prototype.$gameSortV4 = function (callback) {
      this.$store.dispatch('game/gameSortV4Note', {
        // siteId: JSON.parse(localStorage.config).siteId,
        device: "pc"
      }).then(res => {
        if (res && res.code == 200) {
          this.$setObjByLocalStorage(`gameSortV4_note`, res.data)
        }
      })
      let data = {
        device: "pc"
      };
      if(['blr'].includes(this.$websiteName)) {
        data['style'] = 'style24'
      }else if(['tyc86'].includes(this.$websiteName)){
        data['style'] = 'style28'
      }else if(['tycjt'].includes(this.$websiteName)){
        data['style'] = 'style26'
      }else if(['qygj'].includes(this.$websiteName)){
        data['style'] = 'style30'
      }else if(['bet365'].includes(this.$websiteName)) {
        data['style'] = 'style31'
      }else if(['vnst'].includes(this.$websiteName)) {
        data['style'] = 'style32'
      }else if(['amvnsr'].includes(this.$websiteName)||['vns81'].includes(this.$websiteName)) {
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
      if (!data.style) delete data.style
      this.$store.dispatch('game/gameSortV4', data).then(res => {
        if (res && res.code == 200) {
          this.$setObjByLocalStorage('gameSortV4_chess', res.data[1].list);
          this.$setObjByLocalStorage('gameSortV4_slot', res.data[2].list);
          this.$setObjByLocalStorage('gameSortV4_fish', res.data[3].list);
          this.$setObjByLocalStorage('gameSortV4_live', res.data[5]);
          this.$setObjByLocalStorage('gameSortV4_sport', res.data[6]);
          this.$setObjByLocalStorage('gameSortV4_lottery', res.data[4]);
          if (localStorage.token) {
            ['slot', 'fish', 'chess'].forEach((game) => {
              let love = this.$getObjByLocalStorage(`collect${game}_myLove`);
              if (!love) {
                let data = {
                  type: '',
                  device: "pc"
                }
                switch (game) {
                  case 'slot':
                    data.type = 10001;
                    break;
                  case 'chess':
                    data.type = 10004;
                    break;
                  default:
                    data.type = 10005;
                    break;
                }
                this.$store.dispatch('game/myloveGame', data).then(res => {
                  if (res.code == 200) {
                    this.$setObjByLocalStorage(`collect${game}_myLove`, res.data)
                  }
                })
              }
            })
          }
          if (typeof callback != "undefined") {
            callback()
          }
        }
      })
    }

    Vue.prototype.$errorAlert = function (errMsg, type) {
      errMsg = errMsg || "错误";
      type = type || 'warn';
      if (this.$route.path.includes('/plays') || this.$route.path.includes('/rules') || this.$route.path.includes('/trend')) {
        this.$gameStyle = 2
      }
      switch (this.$gameStyle) {
        case 1:
          this.pulicError = errMsg;
          break;
        case 2:
          // 常用弹框
          this.$store.commit('alert/showTipModel', {
            bool: true,
            title: errMsg,
            model: type
          });
          break;
        case 3:
          // 第三种
          this.dNotify(errMsg, type)
          break;
        case 4:
          this.$store.commit('alert/newshowtip', {
            bool: true,
            title: errMsg,
            model: '',
            leftspan: true
          })
          break;
        default:
          // 常用弹框
          this.$store.commit('alert/showTipModel', {
            bool: true,
            title: errMsg,
            model: type
          });
          break;
      }
    }
    Vue.prototype.$loginGame = function (item, name) {
      if (this.$websiteName == "betsb") {
        this.$errorAlert('预览版 暂未开放', 'warn')
        return false
      }
      if (name == 'betsb' || name == 'vnso-preview' || name == 'jltx-new2' || name == 'jltx-new2_sport') {
        this.$errorAlert('预览版 暂未开放', 'warn')
        return false
      } else {
        if (item.id == 0) {
          return false
        }
        if (!localStorage.token || !localStorage.userinfo) {
          this.$errorAlert('请先登录', 'warn')
          return false
        }
        if (item.en == 'service') {
          this.$router.push(item.link);
        }
        let routeData = this.$router.resolve({
          path: '/loading',
          query: {
            id: item.id,
            login: true
          }
        });
        let winObj = window.open(
          routeData.href,
          'newwindow',
          'height=750,width=1285, top=0, left=' + (window.screen.availWidth - 1295) / 2 + ''
        );
        let loop = setInterval(() => {
          if (winObj.closed) {
            clearInterval(loop);
            window.vis = true
            this.$getBalance();
          }
        }, 2500)
      };
    }
    Vue.prototype.$getBalance = function () {
      if (localStorage.token) {
        this.$store.dispatch('mainState/reloadBalance')
      }
    }
    Vue.prototype.$addWindow = function (num) { //双副对联模式
      window.addEventListener('scroll', this.$scrollFunc(num))
    }
    Vue.prototype.$scrollFunc = function (num) { //双副对联模式
      var nodeitem = document.getElementsByClassName('TplFloatPic_1');
      window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if (t > 0) {
          if (nodeitem.length > 0) {
            if (nodeitem.length == 1) {
              nodeitem[0].style.top = t + 170 + 'px'
            } else {
              nodeitem[0].style.top = t + 170 + 'px'
              nodeitem[1].style.top = t + 170 + 'px'
            }
          }
        }
      }
    }
    Vue.prototype.$openKefu = function () {
      let service = JSON.parse(localStorage.config).service;
      if (service) {
        let ser = service.find(item => item.status === 'on')
        if (ser) {
          window.open(ser.url);
        }
      }
    }
    Vue.prototype.$forget = function () {
      this.$errorAlert('忘记帐号，请联系在线客服人员取回！', 'warn');
    }
    Vue.prototype.$getStaticUrl = function () {
      return JSON.parse(localStorage.config).statics + "images/"
    }
    Vue.prototype.$bindPhoneOrbank = function () {
      let _config = this.$getObjByLocalStorage('config')
      if(_config.depositPhoneValidate=='on'&&!this.userinfo.phone){
        this.$store.commit('alert/changbindPhone', true)
      } else if(_config.depositBankValidate=='on'&&this.$store.state.mainState.userinfo.cardNum=='unset') {
        this.$store.commit('alert/changbindbank', true)
      } else{
        this.$goUserCen('recharge',0);
      }

    }
  }
}
