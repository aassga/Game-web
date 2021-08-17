<template>
    <div class="xpj83-new-index">
        <div class="banner-wrap">
            <div class="carouse">
                <Carousel v-model="curIndex" :autoplay="setting.autoplay" :loop="setting.loop" :autoplay-speed="setting.autoplaySpeed"
                    :radius-dot="setting.radiusDot" :arrow="setting.arrow" :trigger="setting.trigger"
                    :style="{height:carheight +'px',overflow:'hidden'}">
                    <CarouselItem v-for="(item, i) in carouselData" :key="i" class="myItems">
                        <a v-if="item.targets !=='#'">
                            <div
                                :style="{background: 'url(' + item.img + ') no-repeat center top',backgroundSize:'cover',height: carheight +'px'}">
                            </div>
                        </a>
                        <div :style="{background: 'url(' + item.img + ') no-repeat center top',backgroundSize:'cover',height: carheight +'px'}"
                            v-else></div>
                    </CarouselItem>
                </Carousel>
            </div>
        </div>
        <div class="notice index-notice" :style="{top: carheight +'px'}">
            <div class="w1000" @click="showTextModal()">
                <span>最新公告</span>
                <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()"
                    onmouseover="this.stop()">
                    <a href="javascript:;" v-html="lantern"></a>
                </marquee>
                
            </div>
        </div>
        <div class="home-container">
            <section id="slot-box" ng-controller="LobbiesCtrl" class="ng-scope">
                <div class="wrapper">
                    <!-- 超级彩金 -->
                    <div class="super_award">
                        <i class="txt_icon"></i>
                        <ul class="award_num">
                            <li :key="i" v-for="(item,i) in superAward">{{item}}</li>
                        </ul>
                    </div>
                    <div class="game_info_box">
                        <!-- 左边 游戏导航+游戏列表 -->
                        <div class="game_container">
                            <!-- 导航栏 -->
                            <div class="game_nav" carousel-slider super-vis="6" super-play="true" super-effect="leftLoop">
                                <span class="arrow prev"></span>
                                <span class="arrow next"></span>
                                <div class="main-cell">
                                    <div class="tempWarp">
                                        <ul id="game-list">
                                            <li :class="[{'active':gameId===item.id},item.class]" :key="index"
                                                v-for="(item,index) in rollList " @mouseenter.stop.prevent="changeGame(item)">
                                                <div class="game-list-text">
                                                    <span class="game_name">{{item.name}}</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <!-- 游戏列表 -->
                            <div class="game_list_box">
                                <div class="game-content">
                                    <div class="content">
                                        <ul>
                                            <li class="game-item" :key="index" v-for="(item,index) in gameData" @click="$loginGame(item)">
                                                <div class="game-pic">
                                                    <img :src="'/static/xpj83/img/gamelist/gameicon/'+ item.icon" 
                                                    :class="{'default':true,'mg-pic':$route.query.id==='10022'}" alt />
                                                </div>
                                                <div class="game_name">
                                                    <div class="name_txt">{{item.name}}</div>
                                                    <div class="star_num">{{item.popular}}人气</div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 右边 赢家榜-->
                        <div class="winner_list">
                            <div class="title_txt">
                                <span class="id">会员账号</span>
                                <span class="game-name">游戏名称</span>
                                <span class="amount">中奖金额</span>
                            </div>

                            <div class="winning-box1">
                                <ul class="winning-list" :style="[{transform: 'translateY(-'+noticePosition+'px) translateZ(0px)'}]">
                                    <li class="winning-item" v-for="(item, i) in winningInfo" :key="i">
                                        <i class="user_id">{{item.name.padEnd(8, '*')}}</i>
                                        <i class="game_name">{{item.game_name}}</i>
                                        <i class="money_num">{{item.num}}</i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
        <div class="cont">
            <div class="inner">
                <div class="game top">
                    <!-- 棋牌 -->
                    <div class="ga chess">
                        <a href="javascript:void(0)" @click="goView('/home/chess?navid=9&id=0')" class="enterzh"><i /></a>
                    </div>
                    <!-- 真人 -->
                    <div class="ga casino">
                        <a href="javascript:void(0)" @click="goView('/home/live')" class="enterzh"><i /></a>
                    </div>
                </div>
                <div class="game bottom">
                    <!-- 彩票 -->
                    <div class="ga lottery">
                        <a href="javascript:void(0)" @click="goView('/plays/hall')" class="enterzh"><i /></a>
                    </div>
                    <!-- 捕鱼 -->
                    <div class="ga fishing">
                        <a href="javascript:void(0)" @click="goView('/home/fish?navid=9&id=0')" class="enterzh"><i /></a>
                    </div>
                    <!-- 体育 -->
                    <div class="ga sport">
                        <a href="javascript:void(0)" @click="goView('/home/tiyu?id=0')" class="enterzh"><i /></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot-lx">
            <div class="foot-lx-width">
                <a class="foot-lx-convction" href="tencent://message/?Menu=yes&uin=199899099"></a>
                <a class="foot-lx-convction" href="tencent://message/?Menu=yes&uin=199899099"></a>
                <a class="foot-lx-convction-lxyx"></a>
                <a class="foot-lx-convction-zxkf" @click="$openKefu"></a>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import store from '@/vuex/store';
// import data from '../../public/games/public.js';

export default {
    // mixins: [data],
    data() {
        return {
            carheight: 460,
            clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            showimg: false,
            popups: '',
            lantern: '',
            curIndex: 0,
            setting: {
                autoplay: true,
                loop: true,
                autoplaySpeed: 3000,
                radiusDot: true,
                arrow: 'never',
                trigger: 'click'
            },
            publicUrl: 'http://static.1356111.com/',
            showPopout: false,
            noticePosition: 0,
            gameList: [
                { name: '真人娱乐', className: 'live', path: '/home/live' },
                { name: '彩票游戏', className: 'lottery', path: '/plays/hall' },
                {
                    name: '电子游艺',
                    className: 'slot',
                    path: '/home/games?id=26&name=MG老虎机'
                },
                { name: '体育赛事', className: 'sport', path: '/home/tiyu' }
            ],
            idlist: [],
            rollList: [
                  {
                    name: 'MG电子',
                    id: '10022',
                    class: 'mg',
                    img: '/static/jsyl/img/gamelist/navicon/mg.png',
                    list: [
                        { id: '10157', icon: '1824.png', name: '冰上曲棍球' },
                        { id: '10303', icon: '1825.png', name: '不朽的浪漫' },
                        // { id: '1834', icon: '1834.png', name: '幸运双星' },
                        { id: '10139', icon: '1831.png', name: '篮球巨星' },
                        { id: '10414', icon: '1839.png', name: '花花公子' },
                        { id: '10229', icon: '1862.png', name: '青龙出海' },
                        { id: '10175', icon: '1830.png', name: '狂欢节' },
                        { id: '10427', icon: '3567.png', name: '宝石之轮' },
                        { id: '10348', icon: '3575.png', name: '淑女派对' },
                        // { id: '3575', icon: '3575.png', name: '舞龙' }
                    ]
                },
                {
                    name: 'CQ9电子',
                    id: '10018',
                    class: 'cq9',
                    img: '/static/jsyl/img/gamelist/navicon/cq9.png',
                    list: [
                        { id: '2667', icon: '2667.png', name: '跳起来' },
                        { id: '2668', icon: '2668.png', name: '跳起来2' },
                        { id: '2674', icon: '2674.png', name: '宙斯' },
                        { id: '2677', icon: '2677.png', name: '洪福齐天' },
                        { id: '3195', icon: '3195.png', name: '蹦迪' },
                        { id: '2670', icon: '2670.png', name: '武圣' },
                        { id: '2646', icon: '2646.png', name: '跳高高' },
                        { id: '10775', icon: '10775.png', name: '发财神' },
                        // { id: '10777', icon: '10777.png', name: '火之女王' },
                        // { id: '2669', icon: '2669.png', name: '五福临门' }
                    ]
                },
                 {
                    name: 'JDB电子',
                    id: '10021',
                    class: 'jdb',
                    img: '/static/jsyl/img/gamelist/navicon/jdb.png',
                    list: [
                        { id: '3578', icon: '3578.png', name: '三倍金刚' },
                        { id: '184', icon: '184.png', name: '变脸' },
                        { id: '196', icon: '196.png', name: '芝麻开门' },
                        { id: '11072', icon: '11072.png', name: '飞鸟派对' },
                        { id: '11075', icon: '11075.png', name: '超级牛B' },
                        { id: '11067', icon: '11067.png', name: '芝麻开门2' },
                        { id: '11077', icon: '11077.png', name: '开运夺宝' },
                        { id: '11078', icon: '11078.png', name: '七海夺宝' },
                        // { id: '11076', icon: '11076.png', name: '埃及夺宝' },
                        // { id: '227', icon: '227.png', name: '王牌特工' }
                    ]
                },
                 {
                    name: 'PG电子',
                    id: '11320',
                    class: 'pg',
                    img: '/static/jsyl/img/gamelist/navicon/pg.png',
                    list: [
                        { id: '11365', icon: '11365.png', name: '麻将胡了' },
                        { id: '11361', icon: '11361.png', name: '爱尔兰精灵' },
                        { id: '11359', icon: '11359.png', name: '赏金船长' },
                        { id: '11681', icon: '11681.png', name: '寻龙探宝' },
                        { id: '11355', icon: '11355.png', name: '双喜临门' },
                        { id: '11357', icon: '11357.png', name: '冰雪大冲关' },
                        { id: '11353', icon: '11353.png', name: '水果丛林' },
                        { id: '11351', icon: '11351.png', name: '象财神' },
                        // { id: '10621', icon: '10621.png', name: '通比牛牛' },
                        // { id: '10622', icon: '10622.png', name: '极速炸金花' }
                    ]
                },
                  {
                    name: 'AG电子',
                    id: '10015',
                    class: 'ag',
                    img: '/static/jsyl/img/gamelist/navicon/ag.png',
                    list: [
                        { id: '263', icon: '263.png', name: '金拉霸' },
                        { id: '338', icon: '338.png', name: '太空漫游' },
                        { id: '264', icon: '264.png', name: '复古花园' },
                        { id: '266', icon: '266.png', name: '麻将老虎机' },
                        { id: '258', icon: '258.png', name: '金龙珠' },
                        { id: '259', icon: '259.png', name: '猛龙传奇' },
                        // { id: '11504', icon: '11504.png', name: '阿里巴巴' },
                        { id: '268', icon: '268.png', name: '日本武士' },
                        { id: '10653', icon: '10653.png', name: '街头烈战' },
                        // { id: '274', icon: '274.png', name: '夏日营地' },
                        // { id: '276', icon: '276.png', name: '糖果碰碰乐' }
                    ]
                },
                {
                    name: 'PT电子',
                    id: '10024',
                    class: 'pt',
                    img: '/static/jsyl/img/gamelist/navicon/pt.png',
                    list: [
                        { id: '11596', icon: '11596.png', name: '三倍猴子' },
                        { id: '11537', icon: '11537.png', name: '龙龙龙' },
                        { id: '11461', icon: '11461.png', name: '野牛闪电战' },
                        { id: '11613', icon: '11613.png', name: '招财童子' },
                        { id: '11581', icon: '11581.png', name: '超级狮子' },
                        { id: '11504', icon: '11504.png', name: '古怪猴子' },
                        { id: '11611', icon: '11611.png', name: '招财进宝' },
                        { id: '11524', icon: '11524.png', name: '印加大奖' },
                        // { id: '2621', icon: '2621.png', name: '湛蓝深海' },
                        // { id: '11558', icon: '11558.png', name: '权杖女王' }
                    ]
                },
                 {
                    name: 'BBIN电子',
                    id: '10016',
                    class: 'bbin',
                    img: '/static/jsyl/img/gamelist/navicon/bbin.png',
                    list: [
                        { id: '3567', icon: '3567.png', name: '糖果派对' },
                        { id: '3568', icon: '3568.png', name: '糖果派对2' },
                        { id: '3572', icon: '3572.png', name: '糖果派对3' },
                        { id: '11353', icon: '11353.png', name: '连环夺宝' },
                        { id: '11357', icon: '11357.png', name: '连环夺宝2' },
                        { id: '3565', icon: '3565.png', name: '喜福猴年' },
                        { id: '3563', icon: '3563.png', name: '喜福牛年' },
                        { id: '3573', icon: '3573.png', name: '开心消消乐' },
                        // { id: '155', icon: '155.png', name: '森林舞会' },
                        // { id: '3522', icon: '3522.png', name: '三国' }
                    ]
                },
                {
                    name: 'DT电子',
                    id: '10019',
                    class: 'dt',
                    img: '/static/jsyl/img/gamelist/navicon/dt.png',
                    list: [
                        { id: '109', icon: '109.png', name: '赛亚烈战' },
                        { id: '10952', icon: '10952.png', name: '财神过年' },
                        { id: '3182', icon: '3182.png', name: '深夜食堂' },
                        { id: '10955', icon: '10955.png', name: '老子是皇帝' },
                        { id: '110', icon: '110.png', name: '摇滚之夜' },
                        { id: '112', icon: '112.png', name: '龙凤呈祥' },
                        { id: '3181', icon: '3181.png', name: '寻宝之旅' },
                        { id: '113', icon: '113.png', name: '夜店之王' },
                        // { id: '101', icon: '101.png', name: '麻辣火锅' },
                        // { id: '89', icon: '89.png', name: '心动女主播' }
                    ]
                },
                {
                    name: 'MW电子',
                    id: '10023',
                    class: 'mw',
                    img: '/static/jsyl/img/gamelist/navicon/mw.png',
                    list: [
                        { id: '155', icon: '155.png', name: '森林舞会' },
                        { id: '11392', icon: '11392.png', name: '森林舞会2' },
                        { id: '156', icon: '156.png', name: '水浒传' },
                        { id: '154', icon: '154.png', name: '水浒英雄' },
                        { id: '161', icon: '161.png', name: '金典水果机' },
                        { id: '158', icon: '158.png', name: '黄金777' },
                        { id: '162', icon: '162.png', name: '舞龙争霸' },
                        { id: '11119', icon: '11119.png', name: '五路财神' },
                        // { id: '165', icon: '165.png', name: '太极' },
                        // { id: '160', icon: '160.png', name: '好运5扑克 ' }
                    ]
                },
                {
                    name: 'FG电子',
                    id: '10020',
                    class: 'fg',
                    img: '/static/jsyl/img/gamelist/navicon/fg.png',
                    list: [
                        { id: '10987', icon: '10987.png', name: '金瓶梅' },
                        { id: '2567', icon: '2567.png', name: '招财进宝' },
                        { id: '11014', icon: '11014.png', name: '发发发' },
                        { id: '2569', icon: '2569.png', name: '恭贺新春' },
                        { id: '2555', icon: '2555.png', name: '抢红包' },
                        { id: '2621', icon: '2621.png', name: '湛蓝深海' },
                        { id: '11044', icon: '11044.png', name: '疯狂7' },
                        { id: '10994', icon: '10994.png', name: '钻石之恋' },
                        // { id: '2578', icon: '2578.png', name: '西游' },
                        // { id: '11010', icon: '11010.png', name: '百变猴子' }
                    ]
                },
            ],
            currenttype: '',
            iptVal: '',
            currentline: '',
            currentTag: '',
            pageDatas: {
                page: 1
            },
            gameId: 26,
            gameData: [],
            gameDataLeft: [],
            gameDataRight: [],
            winningInfo: [],
            // 轮播名单
            carouselData: [],
            superAward: '24687936.18',
            setInter: null,
            lanternData: "",
        };
    },
    methods: {
        
        goLive(item) {
            if (item) {
                if (!localStorage.token || !localStorage.userinfo) {
                    this.$router.push('/home/live');
                } else {
                    this.getItemId(item);
                }
            }
        },
         // 点击导航栏
        changeGame(item) {
            //左右布局,右边是超级赢家榜
            if (item) {
                this.gameId = item.id;

                var len = this.rollList;
                len.forEach((ele)=>{
                     if(ele.id==item.id){
                           this.gameData = ele.list
                     }
                })
                 this.gameData.forEach(item=>{
                        item.popular = Math.floor(Math.random() * 1000000);
                  })
                setTimeout(()=>{
                })
                this.clear()
            }
        },

        async changeGame_new(item) {
            //左中右布局,中间是超级赢家榜
            if (item) {
                this.gameId = item.id;
                let gameDataLeft = JSON.parse(localStorage.gameDataLeft);
                for (let game in gameDataLeft) {
                    if (game == item.id) {
                        this.gameDataLeft = gameDataLeft[game];
                    }
                }
                let gameDataRight = JSON.parse(localStorage.gameDataRight);
                for (let game in gameDataRight) {
                    if (game == item.id) {
                        this.gameDataRight = gameDataRight[game];
                    }
                }
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

        //获取banner
        async getBanner() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
                position: 'banner',
                clientType: 'pc'
            });
            if (res && res.code == 200) {
                this.carouselData = res.data[0] && res.data[0].body; // img 图片
            }
        },

        close() {
            this.showimg = false;
        },

        goView(item) {
            if (item == '/plays/hall') {
                var i = window.location.href.indexOf('#');
                var href = window.location.href.slice(0, i + 1);
                window.open(href + item);
            } else {
                this.$router.push(item);
            }
        },

        // 新文字走马灯接口
        async getLantern() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
                type: 'lantern',
                client_type: 'PC'
            });
            if (res && res.code == 200) {
                if (res.data.data.length) {
                    this.lantern = res.data.data[0] && res.data.data[0].description;
                } else {
                    return false;
                }
            }
            // 参数： type: lantern 走马灯
            // 参数： type: popups 弹窗
            // 参数： type: notice 提示
        },

        hotTag(item) {
            this.hotNow.img = item.img;
            this.hotNow.name = item.name;
            this.hotNow.class = item.class;
            this.hotNow.title = item.title;
            this.hotNow.text = item.text;
            this.hotNow.btn = item.btn;
        },

        kefu() {
            let service = JSON.parse(localStorage.config).service;
            if (service) {
                let ser = service.find(item => item.status === 'on');
                if (ser) {
                    window.open(ser.url);
                }
            }
        },
        //导航动画
        async slider() {
            let ul = document.getElementById('game-list');
            let prev = document.getElementsByClassName('prev')[0];
            let next = document.getElementsByClassName('next')[0];
            let main = document.getElementsByClassName('game_nav')[0];
            let n = -104;

            function left() {
                let oLi = ul.children[0];
                ul.className = 'move';
                setTimeout(function() {
                    ul.removeChild(oLi);
                    ul.appendChild(oLi);
                    ul.className = '';
                }, 500);
            }

            function right() {
                let last = ul.lastElementChild;
                ul.removeChild(last);
                ul.insertBefore(last, ul.childNodes[0]);
                ul.style.left = n + 'px';
                ul.className = 'back';
                setTimeout(function() {
                    ul.className = '';
                    ul.style.left = '';
                }, 500);
            }
            prev.onclick = right;
            next.onclick = left;
            let timer = null;
            timer = setInterval(left, 1000 * 4);
            main.onmouseover = function() {
                clearInterval(timer);
            };
            main.onmouseout = function() {
                timer = setInterval(left, 1000 * 4);
            };
        },

        initWinningInfo() {
            let data = [];
            let games = [
                '跳高高',
                '篮球巨星',
                '水果拉霸',
                '湛蓝深海',
                '冰上曲棍球',
                '金钱蛙',
                '飞天',
                '发财神',
                '空手道猪',
                '雷霆风暴',
                '熊之舞',
                '不朽的爱情',
                '嗨爆大马戏',
                '银行劫匪',
                '雷霆风暴',
                '不朽的爱情',
                '侠盗猎车手',
                '水果拉霸',
                '空手道猪',
                '冰上曲棍球',
                '飞天',
                '抢庄牛牛',
                '十三水',
                '斗地主',
                '押庄龙虎',
                '德州扑克',
                '不朽的浪漫',
                '银行劫匪2',
                '108好汉',
                '逐鹿三国',
                '跳高高',
                '篮球巨星',
                '水果拉霸',
                '湛蓝深海',
                '冰上曲棍球',
                '金钱蛙',
                '飞天',
                '发财神',
                '空手道猪',
                '雷霆风暴',
                '嗨爆大马戏',
                '银行劫匪',
                '雷霆风暴',
                '不朽的浪漫',
                '银行劫匪2',
                '108好汉',
                '逐鹿三国',
                '冒险丛林',
                '城市猎人',
                '大航海时代'
            ];
            for (let i = 0; i < games.length; i++) {
                let num = parseInt(Math.random() * (Math.random() * (Math.random() * 360000)));
                num = num < 10 ? num * 1234 : num;
                num = num < 100 ? num * 123 : num;
                num = num < 1000 ? num * 12 : num;
                let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
                name = name.substr(0, 3);

                data[i] = { name, num, game_name: games[i] };
            }

            this.arraySort(data, (v1, v2) => v1.num < v2.num);
            this.winningInfo = data;
        },

        //超级奖池
        jackpotFc() {
            var _this = this;
            clearInterval(this.setInter);

            this.setInter = setInterval(function() {
                if (typeof _this.superAward == 'number') {
                    _this.superAward = _this.superAward.toString();
                } else if (_this.superAward instanceof Array) {
                    _this.superAward = _this.superAward.join(''); //数组->字符串
                }

                var num, index;
                num = parseFloat(parseFloat(_this.superAward.substr(0, 5), 2) + 1); //截取前5位
                index = num.toString().indexOf('.');
                num =
                    num.toString() +
                    parseInt(Math.random() * 9) +
                    parseInt(Math.random() * 9) +
                    parseInt(Math.random() * 9) +
                    '.' +
                    parseInt(Math.random() * 9) +
                    parseInt(Math.random() * 9);
                _this.superAward = num.split(''); //字符串->数组
            }, 1000);
        },
        // async getnewDatas() {
        //     await this.getid();
        //     await this.getData();
        // },
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
        }
    },

    created() {
        this.changeGame(this.rollList[0]);
        // this.getnewDatas();
        // this.getqipai(); //获取棋牌游戏的数据
        // this.getPopout();
        this.getLanternList();
        setTimeout(() => {
            this.showimg = false;
        }, 7000);
        this.$nextTick(() => {
            this.slider();
        });
        setTimeout(() => {
            if(localStorage.register){
                this.$store.commit('alert/showMgmRegister', true);
                localStorage.removeItem('register')
            }
        }, 2000);
        
        if (this.clientwidth > 1920) {
            this.carheight = 460 * (this.clientwidth / 1920) * 0.9;
        }
    },
    mounted() {
        if(this.$route.query.main){
            this.$store.commit('alert/showMgmRegister', true);
        }
        this.initWinningInfo();
        if (localStorage.config) {
            let config = JSON.parse(localStorage.config);
            this.publicUrl = config.statics;
        }
        clearInterval(this.setInter);
        this.jackpotFc();
        this.getLantern();
        setTimeout(() => {
            if (!!this.$root && !!this.$root.config && !!this.$root.config.service) {
                this.serviceUrl = this.$root.config.service[0] && this.$root.config.service[0].url;
            }
        }, 200);
        this.getBanner();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    watch:{
        $route(){
            if(this.$route.query.main){
                this.$store.commit('alert/showMgmRegister', true);
            }
        }
    },
    components: {},
    store
};
</script>

<style lang="less" scoped>
/deep/ .ivu-carousel-dots {
    z-index: 1000;
}
.alert-img {
    /deep/ .ivu-modal-content {
        background-color: transparent;
    }
    /deep/ .ivu-modal-footer {
        display: none;
    }
    /deep/ .ivu-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -325px;
        margin-top: -275px;
    }
    /deep/ .ivu-modal-body {
        padding: 0;
        height: 550px;
    }
}

.guanbi img {
    position: relative;
}
.guanbi .ivu-modal-content .ivu-modal-footer {
    display: none !important;
}
.guanbi .ivu-modal-body {
    padding: 0 !important;
    height: 550px;
}
.guanbi .ivu-modal-close {
    display: none;
}
.guanbi .ivu-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -328px;
    margin-top: -273px;
}
.guanbi .close {
    position: absolute;
    display: block;
    width: 70px;
    height: 70px;
    right: 0;
    top: 0;
    cursor: pointer;
}
body {
    background: #272727;
}
.xpj83-new-index {
    position: relative;
    min-width: 1200px;
    margin: 0 auto;
    background: #272727;
    font-size: 16px;

    .just-bg {
        width: 90%;
        height: 500px;
        background: url('/static/xpj83/img/cbg2.jpg');
        position: absolute;
        top: 0px;
        z-index: -10;
    }

    .list li a:hover {
        background: #e1bd53;
    }
    .list li a:hover .ren {
        color: #2d1e17;
    }

    a {
        text-decoration: none;
        color: #fff;
        font-size: 12px;
    }
    .pt60 {
        padding-top: 60px;
    }
    .tac {
        text-align: center;
        width: 123px;
        height: 30px;
    }

    .zhenren {
        background: #1b1b1b;
        height: 231px;
        border: 0px solid #e1bd53;
        li {
            float: left;
            width: 123px;
            height: 76px;
            border-right: 1px solid #2a2a2a;
            border-bottom: 1px solid #2a2a2a;

            a {
                display: block;
                text-align: center;
                color: #fff;
                padding-top: 12px;

                p {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 24px;
                    &:hover {
                        color: #ffd053;
                    }
                }
            }

            &.rimr {
                border-right: none;
                width: 124px;
            }
        }
    }

    .pt20 {
        padding-top: 20px;
    }

    .lunti div {
        float: left;
        font-size: 12px;
        width: 33.3%;
        text-align: center;
        line-height: 26px;
        color: #f4dc77;
    }
    .luntop2 li .red {
        color: #ff0000;
    }

    .home-container {
        height: 737px;
        background: #1a1a1a;
        background-size: cover;
        position: relative;
        overflow: hidden;
        margin: 36px auto 0;
        width: 100%;
        #slot-box {
            position: relative;
            max-width: 1920px;
            height: 100%;
            font-size: 0;
            margin: 0 auto;
            background: url(/static/xpj83/img/home/caijin/bg.jpg) no-repeat center top;
            background-size:cover;
            .wrapper {
                position: relative;
                width: 1200px;
                height: 100%;
                z-index: 99;
                padding: 34px 0 0 0;
                margin: 0 auto;

                .super_award {
                    width: 870px;
                    height: 125px;
                    text-align: center;
                    font-size: 28px;
                    line-height: 54px;
                    color: #ffed8d;
                    margin: 0 auto;
                    padding: 0 92px 0 60px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: url(/static/xpj83/img/home/caijin/money_bg.gif) no-repeat center center;

                    .txt_icon {
                        display: inline-block;
                        width: 190px;
                        height: 45px;
                        margin: 0 30px 0 0;
                        background: url(/static/xpj83/img/home/caijin/super_bonus.png) no-repeat center center;
                    }
                    .award_num {
                        flex: 1;
                        height: 61px;
                        font-size: 37.75px;
                        color: #ffed8d;
                        display: flex;
                        justify-content: space-between;
                        li {
                            flex: 1;
                            margin-right: 5px;
                            box-sizing: border-box;
                            background: url(/static/xpj83/img/home/caijin/num_box.png) no-repeat center center;
                            background-size: contain;
                            &:nth-child(9) {
                                background: none;
                                margin: 0 -5px 0 -9px;
                            }
                        }
                    }
                }

                .game_info_box {
                    height: 74.5%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-left: 243px;
                    margin-top: 20px;
                    .game_container {
                        width: 713px;
                        height: 100%;
                        padding-top: 9px;
                        .game_nav {
                            height: 102px;
                            width: 100%;
                            position: relative;
                            z-index: 1;
                            margin: 0 auto;
                            border-radius: 5px;
                            white-space: nowrap;

                            .arrow {
                                position: absolute;
                                top: 31px;
                                width: 30px;
                                height: 30px;
                                background-repeat: no-repeat;
                                background-position: 50%;
                                cursor: pointer;

                                &.prev {
                                    z-index: 999;
                                    left: 20px;
                                    background: url(/static/xpj83/img/home/caijin/arrow-left.png) no-repeat center center;
                                    &:hover {
                                        background: url(/static/xpj83/img/home/caijin/arrow-left-hover.png) no-repeat center center;
                                    }
                                }
                                &.next {
                                    right: 20px;
                                    background: url(/static/xpj83/img/home/caijin/arrow-right.png) no-repeat center center;
                                    &:hover {
                                        background: url(/static/xpj83/img/home/caijin/arrow-right-hover.png) no-repeat center center;
                                    }
                                }
                            }
                            .main-cell {
                                height: 100%;
                                .tempWarp {
                                    overflow: hidden;
                                    width: 86%;
                                    height: 100%;
                                    margin: auto;
                                    position: relative;

                                    #game-list {
                                        width: 3000px;
                                        height: 100%;
                                        position: relative;
                                        margin: 0;
                                        display: table;

                                        &.move {
                                            transition: all 0.5s ease;
                                            -webkit-transition: all 0.5s ease;
                                            transform: translate3d(-104px, 0, 0);
                                        }
                                        &.back {
                                            transition: all 0.5s ease;
                                            -webkit-transition: all 0.5s ease;
                                            transform: translate3d(104px, 0, 0);
                                        }

                                        li {
                                            background: url(/static/xpj83/img/xian.png) right center no-repeat;
                                            cursor: pointer;
                                            width: 104px;
                                            float: left;
                                            height: 102px;
                                            display: table-cell;
                                            color: #fff;
                                            font-size: 14px;
                                            text-align: left;
                                            vertical-align: top;
                                            transition: all 1s !important;
                                            position: relative;

                                            &::before {
                                                content: '';
                                                margin-right: 10px;
                                                height: 37px;
                                                width: 60px;
                                                margin-top: 26px;
                                                text-align: left;
                                                vertical-align: middle;
                                                background-repeat: no-repeat;
                                                background-position: 50%;
                                                position: absolute;
                                                top: 9%;
                                                left: 50%;
                                                transform: translate(-50%, -50%);
                                            }

                                            &.ae:before {
                                                background: url(/static/xpj83/img/home/caijin/ae.png) no-repeat center center;
                                                background-size: contain;
                                                height: 30px;
                                            }
                                            &.ag:before {
                                                background: url(/static/xpj83/img/home/caijin/ag.png) no-repeat center center;
                                                background-size: contain;
                                            }
                                            &.bbin:before {
                                                background: url(/static/xpj83/img/home/caijin/bbin.png) no-repeat center center;
                                                background-size: contain;
                                            }
                                            &.cq9:before {
                                                background: url(/static/xpj83/img/home/caijin/cq9.png) no-repeat center center;
                                                background-size: contain;
                                            }
                                            &.dt:before {
                                                background: url(/static/xpj83/img/home/caijin/dt.png) no-repeat center center;
                                                background-size: contain;
                                                height: 34px;
                                            }
                                            &.fg:before {
                                                background: url(/static/xpj83/img/home/caijin/fg.png) no-repeat center center;
                                                background-size: contain;
                                            }
                                            &.jdb:before {
                                                background: url(/static/xpj83/img/home/caijin/jdb.png) no-repeat center center;
                                                background-size: contain;
                                                height: 30px;
                                            }
                                            &.mg:before {
                                                background: url(/static/xpj83/img/home/caijin/mg.png) no-repeat center center;
                                                background-size: contain;
                                            }
                                            &.mw:before {
                                                background: url(/static/xpj83/img/home/caijin/mw.png) no-repeat center center;
                                                background-size: contain;
                                            }
                                            &.pt:before {
                                                background: url(/static/xpj83/img/home/caijin/pt.png) no-repeat center center;
                                                background-size: contain;
                                            }
                                            &.pg:before {
                                                background: url(/static/xpj83/img/home/caijin/pg.png) no-repeat center center;
                                                background-size: contain;
                                            }
                                            &.ky:before {
                                                background: url(/static/xpj83/img/home/caijin/ky.png) no-repeat center center;
                                                background-size: contain;
                                                height: 32px;
                                            }
                                            &.vg:before {
                                                background: url(/static/xpj83/img/home/caijin/vg.png) no-repeat center center;
                                                background-size: contain;
                                                height: 26px;
                                            }
                                            &.ly:before {
                                                background: url(/static/xpj83/img/home/caijin/ly.png) no-repeat center center;
                                                background-size: contain;
                                                height: 32px;
                                            }
                                            &.ttg:before {
                                                background: url(/static/xpj83/img/home/caijin/ttg.png) no-repeat center center;
                                                background-size: contain;
                                            }

                                            &.active {
                                                span {
                                                    color: #fefd8a !important;
                                                }
                                            }
                                            &:hover {
                                                background-color: #222;
                                            }

                                            .game-list-text {
                                                width: 100%;
                                                vertical-align: middle;
                                                text-align: center;
                                                position: absolute;
                                                bottom: 28px;
                                                transition: all 1s;

                                                span {
                                                    display: block;
                                                    text-align: center;

                                                    &:nth-child(2) {
                                                        color: #7a5434;
                                                        font-size: 14px;
                                                        text-align: left;
                                                        margin-top: 5px;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        .game_list_box {
                            width: 100%;
                            margin: 14px 0 0 0;
                            padding: 9px 4px;
                            .game-content {
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                                align-items: center;
                                .content {
                                    width: 100%;

                                    ul {
                                        display: flex;
                                        flex-direction: row;
                                        flex-wrap: wrap;
                                        justify-content: center;
                                        align-items: center;

                                        .game-item {
                                            display: inline-block;
                                            position: relative;
                                            vertical-align: top;
                                            padding: 0 6px 15px;
                                            width: 25%;
                                            height: 180px;
                                            overflow: hidden;
                                            background-color: transparent;
                                            cursor: pointer;
                                            box-sizing: border-box;
                                            .game-pic {
                                                transition: all 0.4s;
                                                text-align: center;

                                                img {
                                                    width: 100%;
                                                    height: 110px;
                                                    transition: all 2s;
                                                }
                                            }

                                            .game_name {
                                                width: 100%;
                                                margin: 0;
                                                padding: 0;
                                                color: #fff;
                                                font-size: 14px;
                                                text-align: center;
                                                line-height: 24px;
                                                z-index: 1;

                                                .name_txt {
                                                    overflow: hidden;
                                                    text-overflow: ellipsis;
                                                    text-align: center;
                                                    white-space: nowrap;
                                                    border-bottom: 1px solid #585858;
                                                    padding-top: 4px;
                                                }
                                            }
                                            .star_num {
                                                z-index: 1;
                                                overflow: hidden;
                                                white-space: nowrap;
                                                position: relative;
                                                text-align: right;
                                                color: #8e8e8e;
                                                font-size: 14px;
                                                padding-right: 6px;

                                                &:after {
                                                    content: '';
                                                    position: absolute;
                                                    top: 7px;
                                                    left: 10px;
                                                    height: 10px;
                                                    width: 55px;
                                                    background: url(/static/xpj83/img/home/star.png) repeat-x 0;
                                                }
                                            }

                                            &:hover .game_name {
                                                background-color: #e1bd53;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .winner_list {
                        width: 272px;
                        height: 96%;
                        padding-top: 104px;
                        margin-top: -10px;
                        text-align: center;
                        vertical-align: top;
                        overflow: hidden;
                        background: url(/static/xpj83/img/home/caijin/winner_list.png) no-repeat 50%;

                        .title_txt {
                            height: 26px;
                            line-height: 26px;
                            width: 82%;
                            margin: auto;
                            border-bottom: 1px solid #444;
                            display: flex;
                            justify-content: space-between;
                            span {
                                padding: 0;
                                color: #f4dc77;
                                font-size: 14px;
                                flex: 1;
                                &.id {
                                    text-align: left;
                                }
                                &.amount {
                                    text-align: left;
                                    padding-left: 10px;
                                }
                                &.game-name {
                                    text-align: right;
                                }
                            }
                        }

                        .winning-box1 {
                            overflow: hidden;
                            position: relative;
                            height: 69%;
                            margin-top: 14px;

                            &:hover {
                                .winning-list {
                                    animation-play-state: paused;
                                }
                            }

                            .winning-list {
                                position: relative;
                                left: 0;
                                top: 0;
                                animation: animateSub 40s linear infinite;

                                .winning-item {
                                    width: 100%;
                                    padding: 0 10px 0 4px;
                                    line-height: 28px;
                                    display: flex;
                                    flex-direction: row;
                                    justify-content: center;
                                    align-items: center;

                                    &:after {
                                        content: '';
                                        display: table;
                                        clear: both;
                                        zoom: 1;
                                    }
                                    &:first-child,
                                    &:nth-child(2),
                                    &:nth-child(3) {
                                        .order {
                                            background-color: red;
                                        }
                                    }

                                    i {
                                        font-size: 12px;
                                        font-weight: 400;
                                        flex: 1;
                                        text-align: left;
                                    }
                                    .user_id {
                                        color: #fefa84;
                                        padding-left: 20px;
                                    }
                                    .money_num {
                                        color: red;
                                    }
                                    .game_name {
                                        color: #868686;
                                    }
                                    .order {
                                        display: block;
                                        float: left;
                                        width: 20px;
                                        height: 20px;
                                        line-height: 20px;
                                        text-align: center;
                                        color: #fff;
                                        background-color: #afafaf;
                                        border-radius: 4px;
                                    }
                                    .sort {
                                        float: left;
                                        width: 75px;
                                        color: #f27800;
                                        text-align: center;
                                        font-weight: 400;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .cont {
        height: 618px;
        position: relative;
        background: url('/static/xpj83/img/home/bottom_nav/bottom_bg.jpg');
        border-top: 1px solid #484848;

        .inner {
            width: 1200px;
            margin: 0 auto;
            height: 100%;
            padding: 40px 0 48px;
            .game {
                &.top {
                    width: 100%;
                    height: 280px;
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: space-between;
                    .ga {
                        width: 590px;
                        height: 100%;
                        border-radius: 28px;
                        position: relative;
                        transition: all 0.5s ease-in-out;
                        &.chess {
                            background: url(/static/xpj83/img/home/bottom_nav/chess.png) no-repeat 0 0/100%;
                            background-size: cover;
                        }
                        &.casino {
                            background: url(/static/xpj83/img/home/bottom_nav/casino.png) no-repeat 0 0/100%;
                            background-size: cover;
                        }

                        .enterzh {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            top: 0;
                            left: 0;
                            z-index: 99;
                            opacity: 0;
                            border-radius: 28px;
                            background: rgba(0, 0, 0, 0.7);
                            transition: all 0.5s ease-in-out;
                        }

                        &:hover {
                            transform: scale(1.05);
                            transition: all 0.5s ease-in-out;
                            .enterzh {
                                opacity: 1;
                                transition: all 0.6s ease;
                                i {
                                    position: absolute;
                                    right: 0;
                                    width: 95%;
                                    height: 100%;
                                    background: url(/static/xpj83/img/home/bottom_nav/entry_btn.png) no-repeat left center;
                                }
                            }
                        }
                    }
                }
                &.bottom {
                    width: 100%;
                    height: 230px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .ga {
                        flex: 1;
                        height: 100%;
                        border-radius: 28px;
                        position: relative;
                        transition: all 0.5s ease-in-out;
                        &.lottery {
                            background: url(/static/xpj83/img/home/bottom_nav/lottery.png) no-repeat 0 0/100%;
                            background-size: cover;
                        }
                        &.fishing {
                            background: url(/static/xpj83/img/home/bottom_nav/fishing.png) no-repeat 0 0/100%;
                            background-size: cover;
                            margin: 0 20px;
                        }
                        &.sport {
                            background: url(/static/xpj83/img/home/bottom_nav/sport.png) no-repeat 0 0/100%;
                            background-size: cover;
                        }
                        &:hover {
                            transform: scale(1.05);
                            transition: all 0.5s ease-in-out;
                            .enterzh {
                                opacity: 1;
                                transition: all 0.5s ease-in-out;

                                i {
                                    position: absolute;
                                    right: 0;
                                    width: 95%;
                                    height: 100%;
                                    background: url(/static/xpj83/img/home/bottom_nav/entry_btn.png) no-repeat left center;
                                }
                            }
                        }

                        .enterzh {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            top: 0;
                            left: 0;
                            z-index: 99;
                            opacity: 0;
                            border-radius: 28px;
                            background: rgba(0, 0, 0, 0.7);
                            transition: all 0.5s ease-in-out;
                        }
                    }
                }
            }
        }
    }

    @keyframes animateSub {
        0% {
            top: 0;
        }

        to {
            top: -700px;
        }
    }

    .home-container #slot-box:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        margin-left: -805px;
        bottom: -20px;
        width: 355px;
        height: 518px;
        z-index: 1;
    }

    /deep/ .carouse {
        min-width: 1200px;
        max-width: 100%;
        margin: 0 auto;

        .carousel_wrapper {
            overflow: hidden;
            width: 100%;

            .ivu-carousel-list {
                height: 100%;
                .ivu-carousel-track {
                    height: 100%;
                    width: 100%;
                    .myItems {
                        width: 100%;
                        height: 100% !important;
                        img {
                            height: 100%;
                            width: 100%;
                        }
                    }
                }
            }
        }
        .ivu-carousel-dots-inside {
            bottom: 12px;
            li {
                .radius {
                    width: 12px;
                    height: 12px;
                    background: #fff;
                }
                &.ivu-carousel-active {
                    .radius {
                        background: #de3a3a;
                    }
                }
            }
        }
    }

    .el-carousel {
        width: 100%;
    }

    .w1000 {
        width: 1040px;
        height: 36px;
        margin: 0 auto;
        cursor: pointer;
    }
    .index-banner {
        height: 465px;
        position: relative;
    }
    .index-bannercon {
        position: relative;
        height: 464px;
        overflow: hidden;
    }
    .index-bannercon {
        position: absolute;
        left: 50%;
        top: 0px;
        margin-left: -500px;
        z-index: 20;
    }

    .notice {
        position: absolute;
        height: 36px;
        line-height: 36px;
        width: 100%;
        margin-top: 0;
        background: url(/static/xpj83/img/noticebg.png) repeat-x;
    }
    .index-notice {
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .notice span {
        font-size: 12px;
        background: url(/static/xpj83/img/notice.png) left center no-repeat;
        padding-left: 30px;
        width: 100px;
        float: left;
        display: block;
        height: 36px;
        line-height: 37px;
        color: #e0bf55;
    }
    .notice span i {
        font-style: normal;
    }
    .notice marquee {
        float: right;
        width: 860px;
        margin-right: 10px;
        color: #fff;
        height: 36px;
        line-height: 36px;
    }

    .index-slots {
        height: 453px;
        overflow: hidden;
    }
    // .index-slotstab {
    //     height: 453px;
    //     background: #2c2b2b;
    //     position: relative;
    // }
    // .index-slotstab .hd {
    //     height: 85px;
    //     position: relative;
    //     overflow: hidden;
    //     background: #3e3d3d;
    // }
    // .index-slotstab .hd ul {
    //     float: left;
    //     width: 1005px;
    // }
    // .index-slotstab .hd ul li {
    //     float: left;
    //     cursor: pointer;
    //     height: 67px;
    //     width: 167px;
    //     margin-top: 18px;
    // }
    // .index-slotstab .hd ul a {
    //     float: left;
    //     cursor: pointer;
    //     height: 67px;
    //     width: 167px;
    //     margin-top: 18px;
    // }
    // .index-slotstab .hd ul .img {
    //     display: block;
    //     width: 166px;
    //     height: 51px;
    //     background: url(/static/xpj83/img/ico.png) no-repeat;
    //     border-right: 1px dotted #7d7d7d;
    // }
    // .index-slotstab .hd ul .img1 {
    //     background-position: 0 0;
    // }
    // .index-slotstab .hd ul .img2 {
    //     background-position: -826px 0;
    // }
    // .index-slotstab .hd ul .img3 {
    //     background-position: -166px 0;
    //     border: none;
    // }
    // .index-slotstab .hd ul .img4 {
    //     background-position: -342px 0;
    // }
    // .index-slotstab .hd ul .img5 {
    //     background-position: -498px 0;
    // }
    // .index-slotstab .hd ul .img6 {
    //     background-position: -664px 0;
    // }

    // .index-slotstab .hd ul li.on {
    //     background: url(/static/xpj83/img/tabon.png) bottom center no-repeat;
    // }
    // .index-slotstab .hd ul a:hover {
    //     background: url(/static/xpj83/img/tabon.png) bottom center no-repeat;
    // }
    // .index-slotstab .bd {
    //     margin-top: 10px;
    //     background: #323131;
    //     padding-top: 10px;
    // }
    // .index-slotstab .bd .item {
    //     background: url(/static/xpj83/img/slots/b2.jpg) no-repeat center;
    //     width: 1000px;
    //     height: 338px;
    //     position: relative;
    // }
    // .index-slotstab .bd .item ul.listleft {
    //     float: left;
    //     width: 326px;
    // }
    // .index-slotstab .bd .item ul.listright {
    //     float: right;
    //     width: 326px;
    //     margin-right: 11px;
    // }
    // .index-slotstab .bd .item ul li {
    //     float: left;
    //     width: 153px;
    //     height: 164px;
    //     background: #3e3d3d;
    //     text-align: center;
    //     margin-left: 10px;
    //     margin-bottom: 10px;
    //     transition: all 0.4s;
    // }
    // .index-slotstab .bd .item ul li a {
    //     display: block;
    //     height: 164px;
    //     transition: all 0.4s;
    // }
    // .index-slotstab .bd .item ul li img {
    //     display: block;
    // }
    // .index-slotstab .bd .item ul li p {
    //     line-height: 44px;
    //     font-size: 14px;
    // }
    // .index-slotstab .bd .item ul li:hover {
    //     background: #ffd053;
    // }
    // .index-slotstab .bd .item ul li:hover a {
    //     color: #000;
    // }
    // .index-slotstab .bigimg {
    //     width: 328px;
    //     height: 338px;
    //     position: absolute;
    //     margin-left: -164px;
    //     left: 50%;
    //     bottom: 10px;
    // }
    // .index-slotstab .bigimg .imghd {
    //     display: none;
    // }
    // .index-slotstab .bigimg a {
    //     display: block;
    //     height: 338px;
    // }
    // .index-slotstab .bigimg span {
    //     width: 100%;
    //     height: 44px;
    //     line-height: 44px;
    //     text-align: center;
    //     background: rgba(0, 0, 0, 0.8);
    //     display: block;
    //     position: absolute;
    //     bottom: 0;
    //     left: 0;
    //     color: #fff100;
    //     font-size: 16px;
    //     font-weight: bold;
    // }

    // .index-platform {
    //     background: url(/static/xpj83/img/indexplatform.png) top center no-repeat;
    //     height: 275px;
    // }
    // .index-platformcon {
    //     position: relative;
    //     height: 275px;
    // }
    // .index-platformcon .jackpots {
    //     position: absolute;
    //     top: 188px;
    //     left: 43px;
    //     font-family: Arial;
    //     color: #fffea5;
    //     font-size: 32px;
    // }
    // .index-platformcon .wininfo {
    //     width: 510px;
    //     position: absolute;
    //     right: 0;
    //     top: 110px;
    // }
    // .index-platformcon .wininfo i {
    //     display: inline-block;
    //     font-style: normal;
    //     color: #959595;
    //     font-size: 14px;
    // }
    // .index-platformcon .wininfo i.i1 {
    //     width: 108px;
    // }
    // .index-platformcon .wininfo i.i2 {
    //     width: 145px;
    // }
    // .index-platformcon .wininfo i.i3 {
    //     width: 145px;
    // }
    // .index-platformcon .wininfo i.i4 {
    //     width: 112px;
    // }
    // .index-platformcon .wininfo .title {
    //     height: 25px;
    // }
    // .index-platformcon .wininfo .title i {
    //     color: #ffd053;
    //     font-size: 14px;
    //     font-weight: bold;
    // }
    // .index-platformcon .wininfo ul li {
    //     line-height: 22px;
    // }
    // .people1 {
    //     background: url(/static/xpj83/img/people1.png) no-repeat;
    //     width: 290px;
    //     height: 304px;
    //     position: absolute;
    //     left: -300px;
    //     top: -97px;
    // }
    // .people2 {
    //     background: url(/static/xpj83/img/people2.png) no-repeat;
    //     width: 293px;
    //     height: 284px;
    //     position: absolute;
    //     right: -223px;
    //     top: -230px;
    // }
    // .index-item {
    //     border-top: 3px solid #414141;
    //     border-bottom: 3px solid #414141;
    //     height: 456px;
    //     background: #232222;
    //     overflow: hidden;
    // }
    // .index-itemtab {
    //     height: 426px;
    //     position: relative;
    //     margin-top: 30px;
    // }
    // .index-itemtab .bd {
    //     height: 330px;
    //     background: url(/static/xpj83/img/itembg.png) no-repeat;
    // }
    // .index-itemtab .bd .phone {
    //     position: absolute;
    //     left: 233px;
    //     top: 93px;
    // }
    // .index-itemtab .bd .info {
    //     left: 546px;
    //     top: 63px;
    //     position: absolute;
    // }
    // .index-itemtab .bd .info h2 {
    //     color: #ffd053;
    //     font-size: 45px;
    //     height: 42px;
    // }
    // .index-itemtab .bd .info h2 i {
    //     font-weight: normal;
    //     font-style: normal;
    //     font-size: 20px;
    //     font-family: Arial;
    //     color: #ffd053;
    //     margin-left: 10px;
    // }
    // .index-itemtab .bd .info p {
    //     margin-top: 15px;
    //     color: #959595;
    //     line-height: 25px;
    //     width: 420px;
    //     display: block;
    //     height: 50px;
    // }
    // .index-itemtab .bd .info .img {
    //     border-top: 1px solid #242424;
    //     border-bottom: 1px solid #242424;
    // }
    // .index-itemtab .ewm {
    //     position: absolute;
    //     left: 51px;
    //     top: 93px;
    //     background: url(/static/xpj83/img/ewm.png) no-repeat;
    //     display: block;
    //     width: 116px;
    //     height: 116px;
    // }
    // .index-itemtab .ts {
    //     position: absolute;
    //     top: 230px;
    //     left: 51px;
    //     line-height: 21px;
    //     color: #959595;
    //     font-size: 14px;
    // }
    // .index-itemtab .ts a {
    //     font-size: 14px;
    //     color: #e8d060;
    // }
    // .index-itemtab .hd {
    //     height: 97px;
    //     position: relative;
    // }
    // .index-itemtab .hd ul li {
    //     float: left;
    //     margin: 0 101px;
    //     width: 131px;
    //     color: #959595;
    //     margin-top: 25px;
    //     cursor: pointer;
    // }
    // .index-itemtab .hd ul li i {
    //     display: block;
    //     width: 34px;
    //     height: 34px;
    //     float: left;
    //     background: url(/static/xpj83/img/itemtabico.png) no-repeat;
    //     margin-right: 10px;
    //     margin-top: 4px;
    // }
    // .index-itemtab .hd ul li i.i1 {
    //     background-position: 0 0;
    // }
    // .index-itemtab .hd ul li i.i2 {
    //     background-position: -34px 0;
    // }
    // .index-itemtab .hd ul li i.i3 {
    //     background-position: -68px 0;
    // }
    // .index-itemtab .hd ul li h3 {
    //     font-size: 20px;
    // }
    // .index-itemtab .hd ul li p {
    //     font-size: 13px;
    //     font-family: 'Times New Roman';
    //     margin-top: 6px;
    // }
    // .index-itemtab .hd ul li.on {
    //     color: #dcad3e;
    // }
    // .index-itemtab .hd ul li.on i.i1 {
    //     background-position: 0 -34px;
    // }
    // .index-itemtab .hd ul li.on i.i2 {
    //     background-position: -34px -34px;
    // }
    // .index-itemtab .hd ul li.on i.i3 {
    //     background-position: -68px -34px;
    // }
    .notice {
        height: 36px;
        line-height: 36px;
        width: 100%;
        margin-top: 0px;
        background: url(/static/xpj83/img/noticebg.png) repeat-x;
    }
    .index-notice {
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .notice span {
        font-size: 12px;
        background: url(/static/xpj83/img/notice.png) left center no-repeat;
        padding-left: 30px;
        width: 130px;
        float: left;
        display: block;
        height: 36px;
        line-height: 37px;
        color: #e0bf55;
    }
    .notice span i {
        font-style: normal;
    }
    .notice marquee {
        float: right;
        width: 860px;
        margin-right: 10px;
        color: #fff;
        height: 36px;
        line-height: 36px;
        font-size: 12px;
    }
    // .index-login {
    //     p {
    //         input {
    //             width: 155px;
    //             margin-left: 50px;
    //             height: 45px;
    //             line-height: 45px;
    //             background: none;
    //             border: none;
    //             color: #fff;
    //             font-size: 15px;
    //             display: block;
    //             float: left;
    //             outline: 0;
    //         }
    //     }
    // }
    // @keyframes animate {
    //     0% {
    //         bottom: 0;
    //     }
    //     2% {
    //         bottom: -50px;
    //     }
    //     50% {
    //         bottom: -50px;
    //     }
    //     52% {
    //         bottom: 0px;
    //     }
    //     100% {
    //         bottom: 0;
    //     }
    // }

    // @-webkit-keyframes animate {
    //     0% {
    //         bottom: 0;
    //     }
    //     2% {
    //         bottom: -50px;
    //     }
    //     50% {
    //         bottom: -50px;
    //     }
    //     52% {
    //         bottom: 0px;
    //     }
    //     100% {
    //         bottom: 0;
    //     }
    // }

    // @-moz-keyframes animate {
    //     0% {
    //         bottom: 0;
    //     }
    //     2% {
    //         bottom: -50px;
    //     }
    //     50% {
    //         bottom: -50px;
    //     }
    //     52% {
    //         bottom: 0px;
    //     }
    //     100% {
    //         bottom: 0;
    //     }
    // }

    // @-o-keyframes animate {
    //     0% {
    //         bottom: 0;
    //     }
    //     2% {
    //         bottom: -50px;
    //     }
    //     50% {
    //         bottom: -50px;
    //     }
    //     52% {
    //         bottom: 0px;
    //     }
    //     100% {
    //         bottom: 0;
    //     }
    // }

    // @-ms-keyframes animate {
    //     0% {
    //         bottom: 0;
    //     }
    //     2% {
    //         bottom: -50px;
    //     }
    //     50% {
    //         bottom: -50px;
    //     }
    //     52% {
    //         bottom: 0px;
    //     }
    //     100% {
    //         bottom: 0;
    //     }
    // }

    /* @keyframes animate2 {
        0% {
            top: 0;
        }
        1% {
            top: -25px;
        }
        5% {
            top: -25px;
        }
        6% {
            top: -50px;
        }
        10% {
            top: -50px;
        }
        11% {
            top: -75px;
        }
        15% {
            top: -75px;
        }
        16% {
            top: -100px;
        }
        20% {
            top: -100px;
        }
        21% {
            top: -125px;
        }
        25% {
            top: -125px;
        }
        26% {
            top: -150px;
        }
        30% {
            top: -150px;
        }
        31% {
            top: -175px;
        }
        35% {
            top: -175px;
        }
        36% {
            top: -200px;
        }
        40% {
            top: -200px;
        }

        41% {
            top: -225px;
        }
        45% {
            top: -225px;
        }
        46% {
            top: -250px;
        }
        50% {
            top: -250px;
        }
        51% {
            top: -275px;
        }
        55% {
            top: -275px;
        }
        56% {
            top: -300px;
        }
        60% {
            top: -300px;
        }
        61% {
            top: -325px;
        }
        65% {
            top: -325px;
        }
        66% {
            top: -350px;
        }
        70% {
            top: -350px;
        }

        71% {
            top: -375px;
        }
        75% {
            top: -375px;
        }
        76% {
            top: -400px;
        }
        80% {
            top: -400px;
        }
        81% {
            top: -425px;
        }
        85% {
            top: -425px;
        }
        86% {
            top: -450px;
        }
        90% {
            top: -450px;
        }
        91% {
            top: -475px;
        }
        95% {
            top: -475px;
        }
        96% {
            top: -500px;
        }
        100% {
            top: -500px;
        }
    } */
}
</style>
