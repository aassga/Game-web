<template>
    <div class="newIndex">
        <div class="banner">
            <div class="newgong">
                <div class="newgong_content" @click="showTextModal()">
                    <div class="demolist list">
                        <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()"
                            onmouseover="this.stop()">
                            <span v-html="lantern"></span>
                        </marquee>
                    </div>
                </div>
            </div>
        </div>

        <div class="home_container">
            <ul id="lobby-box">
                <li :class="item.className" :style="{backgroundImage:'url('+item.bgcImg+')'}" v-for="(item,index) in gameBox" :key="index">
                    <a href="javascript:void(0)" @click="goTo(item)"></a>
                </li>
            </ul>
            <!-- 视讯轮循 -->
            <div class="liveCarouel">
                <div class="liveShowBox">
                    <span class="prepBtn" @click="liveBoxAnm(1)"></span>
                    <span class="nextBtn" @click="liveBoxAnm(-1)"></span>
                    <div class="outBox">
                        <ul class="innerBox" :style="{width:liveShowBox.length*260+'px',left:0}">
                            <li v-for="(item,index) in liveShowBox" :key="index" :style="{backgroundImage:'url('+item.bgcImg+')'}"
                                @click="$loginGame(item)"></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 电子游戏 -->
            <div class="dianziBox">
                <div class="img-1"></div>
                <div class="img-2"></div>
                <div class="wrapper">
                    <div class="slider-left">
                        <span class="prev" @click="gamesAnm(1)"></span>
                        <span class="next" @click="gamesAnm(-1)"></span>
                        <div class="main-cell">
                            <div class="tempWarp" style="overflow:hidden; position:relative; width:957px">
                                <ul id="game-list" :style="{width:rollList.length*87+'px',left:0}" ref="gameList">
                                    <li :style="{backgroundImage:'url(/static/cmgm/img/mgimg/game/'+item.id+'.png)'}" :key="index"
                                        v-for="(item,index) in rollList " @mouseover="changeGame(item)" @click="goto(item)">{{item.name}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="hotGame">
                        <ul class="gamesList">
                            <li v-for="(item,index) in showGames" :key="index" @click="$loginGame(item)">
                                <div class="pic" :style="{backgroundImage:'url('+item.icon+')'}"></div>
                                <p>
                                    <span>{{item.name}}</span>
                                </p>
                            </li>
                        </ul>
                        <div class="winList">
                            <span>帐号</span>
                            <span>金额</span>
                            <span>游戏名称</span>

                            <div class="winBox">
                                <ul class="ulList" :style="[{transform: 'translateY(-'+noticePosition+'px) translateZ(0px)'}]">
                                    <li v-for="(item,index) in winningInfo" :key="index">
                                        <span>{{item.name}}***</span>
                                        <span>{{item.num}}</span>
                                        <span>{{item.game}}</span>
                                    </li>
                                </ul>
                            </div>
                            <span class="changeNum">{{showNumber}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 关于 -->
            <div class="about-us">
                <div class="wrapper">
                    <h3>
                        关于
                        <span>澳门美高梅</span>
                        <span class="en">MGM CASINO</span>
                    </h3>品牌信誉-首选
                    <span>澳门美高梅</span>
                    ，最具公信力的博彩公司、更有高质量的游戏平台、打造在线博彩第一品牌。公司不仅拥有市场上最多样化的游戏投注平台，
                    同时为客户提供实时、刺激、高信誉的服务保证和高质量的游戏。
                    <ul class="count">
                        <li id="counter01">
                            <canvas id="circle1" width="110" height="110"></canvas>
                            <span>35</span>
                        </li>
                        <li id="counter02">
                            <canvas id="circle2" width="110" height="110"></canvas>
                            <span>3`12</span>
                        </li>
                        <li id="counter03">
                            <canvas id="circle3" width="110" height="110"></canvas>
                            <span>20</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="content">
                <vp-Home-Footer />
            </div>
        </div>
    </div>
</template>
<script>
import store from '@/vuex/store';
import vpHomeFooter from './footer.vue';
import vpMc from './mc';
import { postS, getS, _SetGet, _SetPost } from '@/service/public/service.js';
// import data from '../../public/games/public.js';
// import data1 from '../../public/homeMeans/Aside.js';

export default {
    // mixins: [ data1, data2],
    components: {
        vpHomeFooter,
        vpMc
    },
    data() {
        return {
            noticePosition: 0,
            gameBox: [
                {
                    name: '',
                    bgcImg: '/static/cmgm/img/mgimg/index/sport.jpg',
                    link: '/home/tiyu',
                    className: 'sportBox',
                    linkType: 1
                },
                {
                    name: '',
                    bgcImg: '/static/cmgm/img/mgimg/index/live.jpg',
                    link: '/home/live',
                    className: 'liveBox',
                    linkType: 1
                },
                {
                    name: '',
                    bgcImg: '/static/cmgm/img/mgimg/index/game.jpg',
                    link: '/home/games?id=10022&name=Mw老虎机',
                    className: 'slotBox',
                    linkType: 1
                },
                {
                    name: '',
                    bgcImg: '/static/cmgm/img/mgimg/index/lottery2.png',
                    link: '/plays/hall',
                    className: 'lotteryBox',
                    linkType: 3
                }
            ],
            liveShowBox: [
                // {
                //     name: 'ab',
                //     bgcImg: '/static/cmgm/img/mgimg/index/ab.png',
                //     link: '',
                //     id: 46
                // },
                {
                    name: 'ag',
                    bgcImg: '/static/cmgm/img/mgimg/index/ag.png',
                    link: '',
                    id: 31
                },
                {
                    name: 'bb',
                    bgcImg: '/static/cmgm/img/mgimg/index/bb.png',
                    link: '',
                    id: 32
                },
                {
                    name: 'bgg',
                    bgcImg: '/static/cmgm/img/mgimg/index/bgg.png',
                    link: '',
                    id: 3180
                },
                {
                    name: 'ebet',
                    bgcImg: '/static/cmgm/img/mgimg/index/ebet.png',
                    link: '',
                    id: 43
                },
                {
                    name: 'dg',
                    bgcImg: '/static/cmgm/img/mgimg/index/dg.png',
                    link: '',
                    id: 42
                },
                {
                    name: 'ds',
                    bgcImg: '/static/cmgm/img/mgimg/index/ds.png',
                    link: '',
                    id: 34
                },

                // {
                //     name: 'lmg',
                //     bgcImg: '/static/cmgm/img/mgimg/index/lmg.png',
                //     link: '',
                //     id: 45
                // },
                // {
                //     name: 'lebo',
                //     bgcImg: '/static/cmgm/img/mgimg/index/lebo.png',
                //     link: '',
                //     id: 44
                // },
                // {
                //     name: 'og',
                //     bgcImg: '/static/cmgm/img/mgimg/index/og.png',
                //     link: '',
                //     id: 48
                // },
                // {
                //   name:"pt",
                //   bgcImg:"/static/cmgm/img/mgimg/index/pt.png",
                //   link:"",
                //   id:""
                // },
                // {
                //     name: 'sa',
                //     bgcImg: '/static/cmgm/img/mgimg/index/sa.png',
                //     link: '',
                //     id: 49
                // }
                // {
                //   name:"sb",
                //   bgcImg:"/static/cmgm/img/mgimg/index/sb.png",
                //   link:"",
                //   id:""
                // },
            ],
            liveTimer: null,
            gameTimer: null,
            // linshiPic: '/static/cmgm/img/mgimg/index/bbgame.png',
            showGames: [],
            allDatas: [],
            changeNum: 134646322,
            showNumber: '',
            publicUrl: 'http://static.1356111.com/',
            gameData: [],
            lantern: '',
            // 滚动名单
            // scrollDatas: [],
            rollList: [],
            idlist: [],
            pageDatas: {
                page: 1
            },
            currenttype: '',
            iptVal: '',
            currentline: '',
            currentTag: '',
            winningInfo: [],
            gameId: 10022,
            allGameData: []
        };
    },
    methods: {
        
        goTo(item) {
            // 主页导航
            if (item.linkType == 1) {
                // 正常跳转
                this.$router.push({ path: item.link });
            } else if (item.linkType == 2) {
                // 优惠活动
                this.$router.push({ path: item.link });
            } else if (item.linkType == 3) {
                // 新开页面，彩票跳转
                window.open('#/plays/hall', '_blank');
            } else {
                // 其他跳转
            }
        },

        // 电子游戏跳转
        goto(item) {
            if (item.id) {
                if (item.name.includes('棋牌')) {
                    this.$router.push({
                        path: `/home/chess?navid=9&id=0`
                    });
                } else {
                    this.$router.push({
                        path: `/home/slot?navid=9&id=${item.id}`
                    });
                }
            } else {
            }
        },

        // 点击导航栏
        async changeGame(item) {
            if (!localStorage.gameDate) {
                return false;
            }
            let gameDate = JSON.parse(localStorage.gameDate);
            if (item) {
                this.gameId = item.id;
                for (let game in gameDate) {
                    if (game == item.id) {
                        this.gameData = gameDate[game];
                        this.showGames = gameDate[game];
                        // this.allDatas=res.data[game]
                    }
                }
                this.allDatas = gameDate;
                this.clear();
            }
        },

        async clear() {
            this.iptVal = '';
            this.currenttype = '';
            this.currentline = '';
            this.currentTag = '';
            this.pageDatas.page = 1;
        },

        // 获取游戏列表
        

        // 走马灯
        initWinningInfo() {
            let idList = Object.keys(JSON.parse(localStorage.gameDate));
            let length = 50;
            let data = [];
            idList.forEach((item, index) => {
                let num = parseInt(Math.random() * (Math.random() * (Math.random() * 360000)));
                num = num < 10 ? num * 1234 : num;
                num = num < 100 ? num * 123 : num;
                num = num < 1000 ? num * 12 : num;
                let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
                let game = '';
                name = name.substr(0, 3);

                this.allDatas[item].forEach(nameItem => {
                    game = nameItem.name;
                });
                data[index] = { name, num, game };
            });
            this.arraySort(data, (v1, v2) => v1.num < v2.num);
            this.winningInfo = data;
        },

        liveBoxAnm(num) {
            clearInterval(this.liveTimer);
            let oUl = document.getElementsByClassName('innerBox')[0];
            let ofirstLi = oUl.getElementsByTagName('li')[0];
            let jumpNum = ofirstLi.offsetWidth;
            let oLeft = parseInt(oUl.style.left);

            // 左边left值
            let minLeft = -Math.abs(oUl.offsetWidth - 3 * 260);
            let jumpLeft = 0;

            if (num == 1) {
                // 左按钮
                jumpLeft = 260;
            }
            if (num == -1) {
                jumpLeft = -260;
            }
            oLeft += jumpLeft;

            if (oLeft < minLeft) {
                oLeft = 0;
            }
            if (oLeft > 1) {
                oLeft = 0;
            }
            // 最左，点击左按钮
            if (oLeft == 0 && num == 1) {
                oLeft = minLeft;
            }
            // 最右，点击有按钮
            if (oLeft == minLeft && num == -1) {
                oLeft = 0;
            }
            oUl.style.left = oLeft + 'px';
            // 开启定时器
            this.liveTimer = setInterval(() => {
                this.liveBoxAnm(-1);
            }, 2000);
        },

        gamesAnm(num) {
            clearInterval(this.gameTimer);
            let oUl = document.getElementById('game-list');
            let ofirstLi = oUl.getElementsByTagName('li')[0];
            let jumpNum = ofirstLi.offsetWidth;
            let oLeft = parseInt(oUl.style.left);
            // 左边left值,最左
            let minLeft = -Math.abs(oUl.offsetWidth - 11 * 87);
            let jumpLeft = 0;

            if (num == 1) {
                // left+
                // 左按钮
                jumpLeft = 87;
                if (oLeft >= 0) {
                    oLeft = minLeft;
                } else {
                    oLeft += jumpLeft;
                }
            } else if (num == -1) {
                // left-
                jumpLeft = -87;
                if (oLeft <= minLeft) {
                    oLeft = 0;
                } else {
                    oLeft += jumpLeft;
                }
            }
            oUl.style.left = oLeft + 'px';
            // 开启定时器
            this.gameTimer = setInterval(() => {
                this.gamesAnm(-1);
            }, 2000);
        },
        //轮播图
        async getBanner() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
                position: "banner",
                clientType: "pc"
            });
            if (res && res.code == 200) {
                this.carouselData = res.data[0] && res.data[0].body;
            }
        },
        //走马灯
        async getLantern () {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
                type: 'lantern',
                client_type:"PC"
            })
            if (res && res.code == 200) {
                if(res.data.data.length){
                this.lantern = res.data.data[0] && res.data.data[0].description
                }else{  
                return false;
                }
            }
        },
        /*
         * formatMoney(s,type)
         * 功能：金额按千位逗号分割
         * 参数：s，需要格式化的金额数值.
         * 参数：type,判断格式化后的金额是否需要小数位.
         * 返回：返回格式化后的数值字符串.
         */
        formatMoney(s, type) {
            if (/[^0-9\.]/.test(s)) return '0';
            if (s == null || s == '') return '0';
            s = s.toString().replace(/^(\d*)$/, '$1.');
            s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1');
            s = s.replace('.', ',');
            var re = /(\d)(\d{3},)/;
            while (re.test(s)) s = s.replace(re, '$1,$2');
            s = s.replace(/,(\d\d)$/, '.$1');
            if (type == 0) {
                // 不带小数位(默认是有小数位)
                var a = s.split('.');
                if (a[1] == '00') {
                    s = a[0];
                }
            }
            return s;
        },

        // 底部圆圈
        drawCircle(id, r, lineWidth, j) {
            // id，canvas元素
            // r,半径
            // j,圆弧的角度
            let canvas = document.getElementById(id);
            var ctx = canvas.getContext('2d');
            // let j1=Math.PI*3/2-j;
            // 剩余圆弧起始位置
            //设置线宽
            ctx.lineWidth = lineWidth;
            //设置线的颜色
            ctx.strokeStyle = '#ffd053';

            //画一段圆弧,300,300是圆心，200是半径，0是超始角度，Math.PI是结束角度,是否逆时钟
            ctx.arc(55, 55, r, -Math.PI / 2, j, false);
            ctx.stroke();
            ctx.closePath();
            // 画第二个圆弧
            ctx.beginPath();
            ctx.strokeStyle = '#584033';
            ctx.arc(55, 55, r, j, (Math.PI * 3) / 2, false);
            ctx.stroke();
            ctx.closePath();
        },
        // 进入游戏
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
        // 获取电子游戏的数据
        async getid() {
            
            // let id = '10001';
            // let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
            //     id,
            //     device: 'pc'
            // });
            // if (res && res.code == 200) {
            //     res.data[10001].forEach((item, index) => {
            //         this.idlist.push(item.id);
            //     });
            // }
            let a = JSON.parse(localStorage.gameSortV4_slot)[1].list;
            a.forEach((item, index) => {
                this.idlist.push(item.gcid);
            });
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
            this.changeGame(this.rollList[0]);
        },
        async getnewDatas() {
            await this.getid();
            this.$gameSortV4();
        },
    },
    created() {
        this.getLanternList();
        this.getnewDatas();
        // 奖池奖金
        this.jackpotNumTimer = setInterval(() => {
            this.changeNum = this.changeNum * 1 + 8.56;
            this.showNumber = this.formatMoney(this.changeNum, 1);
        }, 500);

        this.$nextTick(() => {
            this.drawCircle('circle1', 52, 6, (Math.PI * 7) / 12);
            this.drawCircle('circle2', 52, 6, Math.PI / 4);
            this.drawCircle('circle3', 52, 6, (Math.PI * 7) / 6);
        });
        if(localStorage.register){
            this.$router.push('/home/register');
            localStorage.removeItem('register')
        }
    },
    mounted() {
        // 视讯轮循
        this.liveTimer = setInterval(() => {
            this.liveBoxAnm(-1);
        }, 2500);

        if (localStorage.config) {
            let config = JSON.parse(localStorage.config);
            this.publicUrl = config.statics;
        }
        this.getLantern();
    },
    beforeDestroy() {
        clearInterval(this.liveTimer);
        clearInterval(this.gameTimer);
        clearInterval(this.jackpotNumTimer);
    },
    store
};
</script>

<style lang="less" scoped>
// 中奖名单动画
@keyframes animatesub {
    0% {
        top: 0;
    }
    100% {
        top: -300px;
    }
}
.home_container {
    background: #37251c !important;
    #lobby-box {
        padding: 30px 0 0;
        display: block;
        text-align: center;
        font-size: 0;
        background: #37241d;
        li {
            display: inline-block;
            vertical-align: top;
            width: 235px;
            height: 220px;
            margin: 0;
            background-position: center top;
            background-repeat: no-repeat;
            background-size: 95% 200%;
            border-radius: 25px;
            a {
                display: block;
                height: 100%;
                background: transparent;
            }
            cursor: pointer;
        }
        li:hover {
            background-position: center 100%;
        }
    }
    .liveCarouel {
        height: 426px;
        min-width: 1000px;
        padding-top: 36px;
        background: #37251c url(/static/cmgm/img/mgimg/index/bg.jpg) no-repeat center;
        overflow: hidden;
        .liveShowBox {
            position: relative;
            span {
                position: absolute;
                top: 163px;
                left: 50%;
                z-index: 1;
                width: 66px;
                height: 66px;
                background: no-repeat center top;
                cursor: pointer;
            }
            .prepBtn {
                margin-left: -592px;
                background-image: url(/static/cmgm/img/mgimg/index/left.png);
                &:hover {
                    background-position-y: bottom;
                }
            }
            .nextBtn {
                margin-left: 527px;
                background-image: url(/static/cmgm/img/mgimg/index/right.png);
                &:hover {
                    background-position-y: bottom;
                }
            }

            .outBox {
                // position:relative;
                overflow: hidden;
                position: relative;
                width: 1040px;
                margin: 0 auto;
                height: 366px;
                .innerBox {
                    width: 4680px;
                    position: absolute;
                    overflow: hidden;
                    padding: 0px;
                    margin: 0px;
                    transition: all 0.3s ease;
                    // left: -260px;
                    li {
                        float: left;
                        width: 260px;

                        position: relative;
                        // display: inline-block;
                        vertical-align: top;
                        width: 260px;
                        height: 366px;
                        white-space: nowrap;
                        background: no-repeat center top;
                        cursor: pointer;
                        &:hover {
                            background-position-y: bottom;
                        }
                    }
                }
            }
        }
    }

    .dianziBox {
        width: 100%;
        height: 520px;
        position: relative;
        overflow: hidden;
        padding: 10px 0 30px;
        z-index: 0;
        background: url(/static/cmgm/img/mgimg/index/bg1.jpg) no-repeat center top;
        .wrapper {
            position: relative;
            width: 1000px;
            margin: 0 auto;
            padding: 10px 0;
            background: url(/static/cmgm/img/mgimg/index/game_bg.jpg) no-repeat center 100px;
            .slider-left {
                position: relative;
                height: 75px;
                overflow: hidden;
                span {
                    position: absolute;
                    top: 30px;
                    z-index: 1;
                    display: inline-block;
                    width: 21px;
                    height: 21px;
                    background-position: center top;
                    background-repeat: no-repeat;
                    cursor: pointer;
                    vertical-align: top;
                    &:hover {
                        background-position: center bottom;
                    }
                }
                .prev {
                    left: 0;
                    background-image: url(/static/cmgm/img/mgimg/index/prev.png);
                }
                .next {
                    right: 0;
                    background-image: url(/static/cmgm/img/mgimg/index/next.png);
                }

                .main-cell {
                    margin: 0 24px;
                    .tempWarp {
                        #game-list {
                            position: relative;
                            overflow: hidden;
                            padding: 0px;
                            margin: 0px;
                            transition: all 0.3s ease;
                            li {
                                float: left;
                                width: 87px;
                                width: 87px;
                                height: 75px;
                                padding-top: 55px;
                                color: #fff;
                                font-size: 14px;
                                text-align: center;
                                background-position: center top;
                                background-repeat: no-repeat;
                                vertical-align: top;
                                -moz-transition: all 0.4s !important;
                                -o-transition: all 0.4s !important;
                                -webkit-transition: all 0.4s !important;
                                transition: all 0.4s !important;
                                background-size: 55%;
                                cursor: pointer;
                                &:hover {
                                    background-position: center 0;
                                    padding-top: 45px;
                                }
                            }
                        }
                    }
                }
            }

            .hotGame {
                margin-top: 10px;
                padding: 50px 0 30px 32px;
                .gamesList {
                    width: 650px;
                    margin-left: 8px;
                    display: inline-block;
                    li {
                        position: relative;
                        display: inline-block;
                        width: 150px;
                        height: 142px;
                        overflow: hidden;
                        margin: 0 5px 5px;
                        vertical-align: top;
                        background-color: transparent;
                        cursor: pointer;
                        .pic {
                            width: 150px;
                            height: 100px;
                            background-color: #21120b;
                            background-position: center;
                            background-repeat: no-repeat;
                            -moz-transition: all 0.4s;
                            -o-transition: all 0.4s;
                            -webkit-transition: all 0.4s;
                            transition: all 0.4s;
                            background-size: 80%;
                        }
                        p {
                            position: relative;
                            margin: 0;
                            padding: 0 8px;
                            color: #ffdcb7;
                            font-size: 14px;
                            text-align: center;
                            line-height: 40px;
                            background: #8e5a23;
                            z-index: 1;
                            span {
                                position: relative;
                                z-index: 1;
                            }
                        }
                    }
                    li p:before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 40px;
                        width: 0;
                        -moz-transition: width 0.4s;
                        -o-transition: width 0.4s;
                        -webkit-transition: width 0.4s;
                        transition: width 0.4s;
                    }

                    li:hover:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 42px;
                        z-index: 1;
                        border: 2px solid #fff100;
                        background: url(/static/cmgm/img/mgimg/index/hov_bg.png);
                    }
                    li:hover .pic {
                        transform: scale(1.1);
                    }
                    li:hover p {
                        color: #333;
                    }
                    li:hover p:before {
                        width: 150px;
                        background-color: #fff100;
                    }
                    li:hover .pic:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 150px;
                        height: 100px;
                        background: url(/static/cmgm/img/mgimg/index/hov_bg.png) no-repeat center top;
                    }
                    li:hover:after {
                        content: '进入游戏';
                        position: absolute;
                        top: 42px;
                        left: 46px;
                        font-size: 14px;
                        color: #fff100;
                        z-index: 2;
                    }
                }

                .winList {
                    display: inline-block;
                    width: 280px;
                    padding-top: 38px;
                    text-align: center;
                    vertical-align: top;
                    span {
                        display: inline-block;
                        margin: 0 25px;
                        color: #fff;
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .main-cell {
                        margin-top: 10px;
                        height: 144px;
                        overflow: hidden;
                    }
                    .winBox {
                        margin-top: 10px;
                        height: 144px;
                        overflow: hidden;
                        position: relative;
                        .ulList {
                            position: absolute;
                            left: 8px;
                            animation: animatesub 15s linear infinite;
                            overflow: hidden;
                            li {
                                height: 24px;
                                span {
                                    display: inline-block;
                                    width: 80px;
                                    color: #f7b18f;
                                    font-size: 12px;
                                    text-align: center;
                                    line-height: 24px;
                                    margin: 0;
                                }
                                span:last-child {
                                    width: 80px;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                }
                            }
                        }
                    }
                    .changeNum {
                        display: block;
                        width: 200px;
                        margin: 31px 0 0 40px;
                        font-size: 16px;
                        font-weight: normal;
                        line-height: 32px;
                        color: #fff;
                    }
                    .changeNum:before {
                        content: 'CNY';
                        margin-right: 10px;
                    }
                }
            }
        }
    }
    .dianziBox:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #37251c url(/static/cmgm/img/mgimg/index/img03.png) no-repeat center;
    }

    .img-1 {
        position: absolute;
        top: 130px;
        left: 50%;
        margin-left: -740px;
        width: 247px;
        height: 233px;
        z-index: 1;
        background: url(/static/cmgm/img/mgimg/index/img01.png) no-repeat center;
    }
    .img-2 {
        position: absolute;
        top: 160px;
        left: 50%;
        margin-left: 510px;
        width: 247px;
        height: 232px;
        background: url(/static/cmgm/img/mgimg/index/img02.png) no-repeat center;
    }

    .about-us {
        height: 400px;
        background: url(/static/cmgm/img/mgimg/index/about_bg.jpg) no-repeat center top;
        .wrapper {
            height: 100%;
            padding: 55px 395px 0 165px;
            color: #865f38;
            font-size: 12px;
            text-align: justify;
            line-height: 22px;
            position: relative;
            width: 1000px;
            margin: 0 auto;
            background: url(/static/cmgm/img/mgimg/index/about_img.png) no-repeat left center;
            h3 {
                color: #ffd053;
                font-size: 18px;
                font-weight: bold;
            }
            audio,
            canvas,
            progress,
            video {
                display: inline-block;
                vertical-align: baseline;
            }
            .count {
                display: block;
                font-size: 0;
                margin-top: 15px;
                li {
                    position: relative;
                    display: inline-block;
                    color: #865f38;
                    font-size: 13px;
                    vertical-align: top;
                    span {
                        position: absolute;
                        top: 42px;
                        left: 0;
                        right: 0;
                        color: #ffd053;
                        font-size: 36px;
                        text-align: center;
                    }
                    span:after {
                        margin-left: 5px;
                        color: #ad8977;
                        font-size: 12px;
                    }
                }
                li:after {
                    display: block;
                    text-align: center;
                }
                li + li {
                    margin-left: 45px;
                }
                li#counter01 span:after {
                    content: '秒';
                }
                li#counter01:after {
                    content: '存款到账';
                }
                li#counter02 span:after {
                    content: '分';
                }
                li#counter02:after {
                    content: '取款到账';
                }
                li#counter03 span:after {
                    content: '家';
                }
                li#counter03:after {
                    content: '游戏平台';
                }
            }
        }
    }
}

.alert-img {
    /deep/ .ivu-modal-content {
        background-color: transparent;
    }
}

.newIndex {
    position: relative;
    background: #f1f1f1;

    .banner {
        position: relative;
        background-color: #10151b;

        .newgong {
            position: absolute;
            z-index: 6;
            height: 44px;
            width: 100%;
            bottom: 0;
            left: 0;

            padding-bottom: 7px solid #263c78;
            background: #2d1e17 url(/static/cmgm/img/mgimg/news_bottom.jpg) repeat-x left bottom;

            .newgong_content {
                padding: 0 0 0 95px;
                overflow: hidden;
                width: 1000px;
                height: 38px;
                margin: 0 auto;
                background: url(/static/cmgm/img/home/news.png) no-repeat left center;
                .demolist {
                    display: inline-block;
                    width: 950px;
                    position: relative;
                    height: 34px;

                    marquee {
                        color: white;
                        font-size: 14px;
                        height: 34px;
                        line-height: 34px;
                        overflow: hidden;
                    }
                }
            }
        }
    }
}

.guanbi img {
    position: relative;
}
.guanbi .ivu-modal-footer {
    display: none;
}
.guanbi .ivu-modal-body {
    padding: 0 !important;
    height: 425px;
}
.guanbi .ivu-modal-close {
    display: none;
}
.guanbi .ivu-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -453px;
    margin-top: -212px;
}
.guanbi .close {
    position: absolute;
    display: block;
    width: 40px;
    height: 40px;
    right: 100px;
    top: 80px;
    cursor: pointer;
}
</style>
