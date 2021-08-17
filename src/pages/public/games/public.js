import UserService from '@/service/public/UserService.js';
import { postS, getS, _SetGet, _SetPost } from '@/service/public/service.js';

const mixin = {
    data: function() {
        return {
            token: localStorage.token,
            Public_User: localStorage.Public_User,
            gameItem: {},
        };
    },
    created() {
        if (!sessionStorage.qipai) {
            this.getDataQpai();
        }
        if (!window.balanceTask) window.balanceTask = this.bgetBalance.bind(this)
    },
    methods: {
        //刷新金额
        bgetBalance() {
            if (localStorage.token) {
                getS(`member/balance`).then((res) => {
                    if (res.code == 200) {
                        let userinfo = JSON.parse(localStorage.userinfo);
                        userinfo.balance = res.data.member;
                        userinfo.agent = res.data.agency;
                        this.$store.commit('mainState/reloadUserinfo', userinfo);
                    }
                });
            }
        },
        // 正式登陆
        async login(id) {
            let res = await this.$http.post(`${this.$HOST_NAME}/games/login`, {
                id,
                device: 'pc'
            });
            if (res && res.code == 200) {
                window.location.href = res.data.url;
            } else {
                alert(res.message);
            }
        },
        errorAlert(errMsg, type) {
            errMsg = errMsg || "错误";
            type = type || "warn";
            let $gameStyle = this.$gameStyle;
            if (this.$router.history.current.path.includes("/plays/hall")) {
                $gameStyle = 2;
            }
            switch ($gameStyle) {
                case 2:
                    // 常用弹框
                    this.$store.commit("alert/showTipModel", {
                        bool: true,
                        title: errMsg,
                        model: type
                    });
                    break;
                case 3:
                    // 第三种
                    this.dNotify(errMsg, type);
                    break;
                case 4:
                    // qygj,特殊弹框
                    this.$store.commit("alert/newshowtip", {
                        bool: true,
                        title: errMsg,
                        model: "",
                        leftspan: true
                    });
                    break;
                default:
                    // 常用弹框
                    this.$store.commit("alert/showTipModel", {
                        bool: true,
                        title: errMsg,
                        model: type
                    });
                    break;
            }
        },
        //需要获取/games/index再登录真人 vr 等
        async getItemId(item) {
            
            if (this.$websiteName && (['qygj','xpj80' , 't111', 'ybcp', 'amvns', 'bet365', 'vnst', 'cfgj', 'betsb', '478qp', 'tycjt', 'tyc82', 'amvnsr', 'vns81', 'jsyl-preview', 'jsyl', 'wpgj', 'cjw', 'tyc', 'aqvns','js85', 'test-6', 'amxpjdc'].includes(this.$websiteName))) {
                if (!localStorage.token || !localStorage.userinfo) {
                    this.$store.commit('alert/newshowtip', {
                        bool: true,
                        title: '请先登录',
                        model: '',
                        leftspan: true
                    });
                    return false;
                }
            }
            if (!localStorage.token || !localStorage.userinfo) {
                this.$store.commit('alert/showTipModel', {
                    bool: true,
                    title: '未登录',
                    model: 'warn'
                });
                return false;
            }
            let routeData = this.$router.resolve({
                path: '/loading',
                query: { id: item.id, login: true }
            });
            
            let winObj = window.open(
                routeData.href,
                'newwindow',
                'height=750,width=1285, top=0, left=' + (window.screen.availWidth - 1295) / 2 + ''
            );
            let loop = setInterval(() => {
                window.onblur = function() {
                    window.vis = false
                }
                window.onfocus = function() {
                    window.vis = true
                }
                if (winObj.closed) {
                    this.bgetBalance();
                    clearInterval(loop);
                    window.vis = true
                }
            }, 1000);
        },
        //直接登录，如捕鱼
        trustLogin(item) {
            if (
                this.$websiteName && (['qygj','xpj80' , 't111', 'ybcp', 'amvns', 'bet365', 'vnst', 'cfgj', 'betsb', '478qp', 'tycjt', 'tyc82', 'amvnsr', 'vns81', 'jsyl-preview', 'jsyl', 'wpgj', 'cjw', 'tyc', 'aqvns','js85', 'test-6', 'amxpjdc'].includes(this.$websiteName))
            ) {
                if (!localStorage.token) {
                    this.$store.commit('alert/newshowtip', {
                        bool: true,
                        title: '请先登录',
                        model: '',
                        leftspan: true
                    });
                    return false;
                }
            }
            
            if (!localStorage.token) {
                this.$store.commit('alert/showTipModel', {
                    bool: true,
                    title: '未登录',
                    model: 'warn'
                });
                return false;
            }
            let routeData = this.$router.resolve({
                path: '/loading',
                query: { id: item.id, login: true }
            });

            let winObj = window.open(
                routeData.href,
                'newwindow',
                'height=750,width=1285, top=0, left=' + (window.screen.availWidth - 1295) / 2 + ''
            );
            let loop = setInterval(() => {
                if (winObj.closed) {
                    clearInterval(loop);
                    this.bgetBalance();
                    window.vis = true
                }
            }, 2500);
        },
        // 需要解析再登录，如第三方电子,需要解析
        loginGame(item) {
            if (
                this.$websiteName && (['mgm-preview','qygj','xpj80' ,'935qp', 't111', 'ybcp', 'amvns', 'bet365', 'vnst', 'cfgj', 'betsb', '478qp', 'tycjt', 'tyc82', 'amvnsr', 'vns81', 'jsyl-preview', 'jsyl', 'wpgj', 'cjw', 'tyc', 'aqvns','js85','test-6', 'amxpjdc', 'test-7'].includes(this.$websiteName))
            ) {
                if (!localStorage.token || !localStorage.userinfo) {
                    this.$store.commit('alert/newshowtip', {
                        bool: true,
                        title: '请先登录',
                        model: '',
                        leftspan: true
                    });
                    return false;
                }
            }
            if (!localStorage.token || !localStorage.userinfo) {

                this.$store.commit('alert/showTipModel', {
                    bool: true,
                    title: '未登录',
                    model: 'warn'
                });
                return false;
            }
            // debugger
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
                    this.bgetBalance();
                }
            }, 2500);
        },
        loginTest(item) {
            if (!localStorage.token || !localStorage.userinfo) {
                this.tryPlay(item);
            } else {
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
                        this.bgetBalance();
                        window.vis = true
                    }
                }, 2500);
            }
        },
        async getDataQpai() {
            let id = '10004';
            let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
                id,
                device: 'pc'
            });
            if (res && res.code == 200) {
                sessionStorage.setItem('qipai', JSON.stringify(res.data[10004]));
            }
        },
        async tryPlay(item) {
            let res = await this.$http.get('/frontend/test/demo', {
                headers: { Accept: 'application/x.tg.v2+json' },
                params: {}
            });
            if (res && res.code == 200) {
                UserService.setCache(res, 'test');
                let routeData = this.$router.resolve({
                    path: '/loading',
                    query: {
                        id: item.id,
                        login: true
                    }
                });
                window.open(
                    routeData.href,
                    'newwindow',
                    'height=750,width=1285, top=0, left=' + (window.screen.availWidth - 1295) / 2 + ''
                );
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        },
        //获取棋牌游戏的数据
        async getqipai() {
            let id = '10004';
            let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
                id,
                device: 'pc'
            });
            if (res && res.code == 200) {
                res.data[10004].forEach((item, index) => {
                    this.idlist.push(item.id);
                });
            }
        },
        // 获取电子游戏的数据
        async getid() {
            // if(this.$siteName=="大佬彩票"||this.$siteName=="艺博彩票"||this.$websiteName=="qygj"||this.$websiteName=="qygj-preview"||this.$websiteName=="t111"||this.$websiteName=="xpj"||this.$websiteName=="ybcp"||this.$websiteName=="cmgm"||this.$websiteName=="pjdc"||this.$websiteName=="amvns"||this.$websiteName=="jsyl"){
            // }else{
            //   this.getqipai()
            // }
            let id = '10001';
            let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
                id,
                device: 'pc'
            });
            if (res && res.code == 200) {
                res.data[10001].forEach((item, index) => {
                    this.idlist.push(item.id);
                });
            }
            this.idlist.forEach((item) => {
                switch (item) {
                    case 10022:
                        this.gameItem = {
                            id: '10022',
                            name: 'MG老虎机',
                            text: 'MG CASINO',
                            src: '/static/public/image/youyi/mg2.png',
                            class: 'mg',
                            newclass: 'mg_game',
                            type: {
                                list: []
                            },
                            line: {
                                list: []
                            }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10015:
                        this.gameItem = {
                            id: '10015',
                            name: 'AG电子',
                            text: 'AG CASINO',
                            src: '/static/public/image/youyi/ag.png',
                            class: 'ag',
                            newclass: 'ag_game',
                            type: {
                                list: [
                                    { name: '全选', tag: '' },
                                    { name: '最新游戏', tag: 'NEW' },
                                    { name: '热门游戏', tag: 'HOT' },
                                    { name: '老虎机', tag: 'SLO' },
                                    { name: '大额投注', tag: 'MAX' },
                                    { name: '小额投注', tag: 'MIN' },
                                    { name: '经典拉霸', tag: 'FRT' },
                                    { name: '消消乐', tag: 'CLH' }
                                ]
                            },
                            line: {
                                list: [
                                    { name: '全选', tag: '' },
                                    { name: '5-10线', tag: '5-10' },
                                    { name: '15-20线', tag: '15-20' },
                                    { name: '25-30线', tag: '25-30' },
                                    { name: '更多', tag: 'MOR' }
                                ]
                            }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10024:
                        this.gameItem = {
                            id: '10024',
                            name: 'PT老虎机',
                            text: 'PT CASINO',
                            src: '/static/public/image/youyi/pt.png',
                            class: 'pt',
                            newclass: 'pt_game',
                            type: {
                                list: [
                                    { name: '全选', tag: '' },
                                    { name: '最新游戏', tag: 'NEW' },
                                    { name: '热门游戏', tag: 'HOT' },
                                    { name: '经典游戏', tag: 'CLA' },
                                    { name: '奖池游戏', tag: 'JPT' },
                                    { name: '老虎机', tag: 'SLO' }
                                ]
                            },
                            line: {
                                list: [
                                    { name: '全选', tag: '' },
                                    { name: '单线', tag: '1-1' },
                                    { name: '5-10线', tag: '5-10' },
                                    { name: '15-20线', tag: '15-20' },
                                    { name: '243线', tag: '243' },
                                    { name: '更多', tag: 'MOR' }
                                ]
                            },
                            thirt: {
                                list: [
                                    { name: '全选', tag: '' },
                                    { name: '卡通', tag: 'ANI' },
                                    { name: '洛奇', tag: 'RCK' },
                                    { name: '少女', tag: 'GIR' }
                                ]
                            }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10018:
                        this.gameItem = {
                            id: '10018',
                            name: 'CQ9电子',
                            text: 'CQ9 CASINO',
                            src: '/static/public/image/youyi/cq9.png',
                            class: 'cq9',
                            newclass: 'cq9_game',
                            type: {
                                list: [
                                    { name: '全选', tag: '' },
                                    { name: '最新游戏', tag: 'NEW' },
                                    { name: '热门游戏', tag: 'HOT' },
                                    { name: '老虎机', tag: 'SLO' },
                                    { name: '捕鱼游戏', tag: 'FSH' }
                                ]
                            },
                            line: {
                                list: [
                                    { name: '全选', tag: '' },
                                    { name: '单线', tag: '1-1' },
                                    { name: '5-10线', tag: '5-10' },
                                    { name: '15-20线', tag: '15-20' },
                                    { name: '243线', tag: '243' }
                                ]
                            }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10042:
                        this.gameItem = {
                            id: '10042',
                            name: '开元棋牌',
                            text: 'KY_CHESS',
                            class: 'ky',
                            type: { list: [] },
                            line: { list: [] }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10041:
                        this.gameItem = {
                            id: '10041',
                            name: 'VG棋牌',
                            text: 'VG_CHESS',
                            class: 'vg',
                            type: {
                                list: [
                                    { name: '全部', tag: '' },
                                    { name: '棋牌', tag: 'CHS' },
                                    { name: '电子', tag: 'SLO' },
                                    { name: '捕鱼', tag: 'FISH' }
                                ]
                            },
                            line: {
                                list: [
                                    // { name: "全选", tag: "" },
                                    // { name: "单线", tag: "1-1" },
                                    // { name: "5-10线", tag: "5-10" },
                                    // { name: "15-20线", tag: "15-20" }
                                ]
                            }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10612:
                        this.gameItem = {
                            id: '10612',
                            name: '乐游棋牌',
                            text: 'LEG_CHESS',
                            class: 'ly',
                            type: { list: [] },
                            line: { list: [] }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10636:
                        this.gameItem = {
                            id: '10636',
                            name: '大战棋牌',
                            text: 'DZ_CHESS',
                            class: 'dz',
                            type: { list: [] },
                            line: { list: [] }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10020:
                        this.gameItem = {
                            id: '10020',
                            name: 'FG老虎机',
                            text: 'FG CASINO',
                            src: '/static/public/image/youyi/fg.png',
                            class: 'fg',
                            newclass: 'fg_game',
                            type: { list: [] },
                            line: { list: [] }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10021:
                        this.gameItem = {
                            id: '10021',
                            name: 'JDB电子',
                            text: 'JDB GAMING',
                            src: '/static/public/image/youyi/jbd.png',
                            class: 'jdb',
                            newclass: 'jdb_game',
                            type: { list: [] },
                            line: { list: [] }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10016:
                        this.gameItem = {
                            id: '10016',
                            name: 'BBIN老虎机',
                            text: 'BBIN CASINO',
                            src: '/static/public/image/youyi/bbin.png',
                            class: 'bbin',
                            newclass: 'bbin_game',
                            type: {
                                list: [
                                    { name: '全选', tag: '' },
                                    { name: '最新游戏', tag: 'NEW' },
                                    { name: '热门游戏', tag: 'HOT' },
                                    { name: '老虎机', tag: 'SLO' },
                                    { name: '刮刮乐', tag: 'SCR' },
                                    { name: '桌上游戏', tag: 'TBL' },
                                    { name: '大型机台', tag: 'LMC' }
                                ]
                            },
                            line: { list: [] }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10014:
                        this.gameItem = {
                            id: '10014',
                            name: 'AE电子',
                            text: 'AE GAMING',
                            src: '/static/public/image/youyi/ae.png',
                            class: 'ae',
                            newclass: 'ae_game',
                            type: { list: [] },
                            line: { list: [] }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10019:
                        this.gameItem = {
                            id: '10019',
                            name: 'DT老虎机',
                            text: 'DT GAMING',
                            src: '/static/public/image/youyi/dt.png',
                            class: 'dt',
                            newclass: 'dt_game',
                            type: {
                                list: [
                                    { name: '全选', tag: '' },
                                    { name: '最新游戏', tag: 'NEW' },
                                    { name: '热门游戏', tag: 'HOT' },
                                    { name: '老虎机', tag: 'SLO' },
                                    { name: '奖池游戏', tag: 'JPT' },
                                    { name: '经典游戏', tag: 'CLA' }
                                ]
                            },
                            line: {
                                list: [
                                    { name: '全选', tag: '' },
                                    { name: '单线', tag: '1-1' },
                                    { name: '5-10线', tag: '5-10' },
                                    { name: '15-20线', tag: '15-20' },
                                    { name: '243线', tag: '243' },
                                    { name: '更多', tag: 'MOR' }
                                ]
                            }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10023:
                        this.gameItem = {
                            id: '10023',
                            name: 'MW电子',
                            text: 'MW GAMING',
                            src: '/static/public/image/youyi/mw.png',
                            class: 'mw',
                            newclass: 'mw_game',
                            type: { list: [] },
                            line: { list: [] }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 11320:
                        this.gameItem = {
                            id: '11320',
                            name: 'PG电子',
                            text: 'PG GAMING',
                            src: '/static/public/image/youyi/pg.png',
                            class: 'pg',
                            newclass: 'pg_game',
                            type: { list: [] },
                            line: { list: [] }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 11906:
                        this.gameItem = {
                            id: '11906',
                            name: 'PP电子',
                            text: 'PP GAMING',
                            src: '/static/public/image/youyi/pp.png',
                            class: 'pp',
                            newclass: 'pp_game',
                            type: { list: [] },
                            line: { list: [] }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                    case 10025:
                        this.gameItem = {
                            id: '10025',
                            name: 'TTG老虎机',
                            text: 'TTG GAMING',
                            src: '/static/public/image/youyi/ttg.png',
                            class: 'ttg',
                            newclass: 'ttg_game',
                            type: {
                                list: [
                                    { name: '全选', tag: '' },
                                    { name: '最新游戏', tag: 'NEW' },
                                    { name: '热门游戏', tag: 'HOT' },
                                    { name: '老虎机', tag: 'SLO' },
                                    { name: '经典游戏', tag: 'CLA' }
                                ]
                            },
                            line: {
                                list: [
                                    { name: '全选', tag: '' },
                                    { name: '单线', tag: '1-1' },
                                    { name: '5-10线', tag: '5-10' },
                                    { name: '15-20线', tag: '15-20' },
                                    { name: '243线', tag: '243' },
                                    { name: '更多', tag: 'MOR' }
                                ]
                            }
                        };
                        this.rollList.push(this.gameItem);
                        break;
                }
            });
            localStorage.setItem('rollList', JSON.stringify(this.rollList))
        }
    },
    beforeDestroy() {}
};

export default mixin;