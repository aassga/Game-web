<template>
    <div class="vnst_new_index" >
        <div class="dianziWrapper">
            <div class="indexNotice"  @click="showTextModal">
                <div class="noticeInner">
                    <span class="giftIcon"><img src="/static/amjs/img/notice.png" alt=""> <i>最新消息:</i> </span>
                    <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="4" onmouseout="this.start()"
                        onmouseover="this.stop()">
                        <a href="javascript:;" v-html="lantern"></a>
                    </marquee>
                </div>
            </div>
            <div class="pageRoute">
                
                <div class="loginForm" v-if="!$store.state.mainState.loginOrout">
                    <div class="noLogin" style="height:214px">
                        <div class="login_title"></div>
                        <input type="text" placeholder="账号" @change="getCode" autocomplete="off" v-model="passKey.userName">
                        <input type="password" placeholder="密码" autocomplete="off" v-model="passKey.password">
                        <input v-if="code_show" type="text" placeholder="验证码" v-model="passKey.code" v-on:keyup.enter="login">
                        <i class="icon1"></i>
                        <i class="icon2"></i>
                        <i v-if="code_show" class="icon3"></i>
                        <img v-if="code_show" class="codeimg" id="vPic" :src="codeImg" width="60" height="33" border="1" align="absmiddle" alt="(点选此处产生新验证码)"
                            @click="getCode">
                        <div :class="['login',{'loginPad':code_show == false}]">
                            <span @click="login">立即登入</span>
                            <span @click="goKaihu()">免费开户</span>
                        </div>
                        <div class="forget" @click="$forget()">忘记密码?</div>
                    </div>
                </div>
            </div>
            <div class="gameContainer">
                <div class="topContainer">
                    <ul>
                        <li v-for="(item,index) in topList" :key="index" @click="$router.push(item.link)">
                            <span><img :src="item.img" ></span>
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="payContanier">
                    <ul>
                        <li v-for="(item,index) in payList" :key="index" @click="goUserCen(index)">
                            <span><img :src="item.img" ></span>
                            <span>
                                <i>{{item.name}}</i>
                                <i>{{item.mark}}</i>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="priceContainer">
                    <section id="slotBox" ng-controller="LobbiesCtrl" class="ng-scope">
                        <!-- 导航栏 -->
                        <div class="game_nav" carousel-slider super-vis="6" super-play="true" super-effect="leftLoop">
                            <span class="arrow prev"></span>
                            <div class="mainCell">
                                <div class="tempWarp">
                                    <ul id="game_list">
                                        <li :key="index" v-for="(item,index) in rollList" :class="[{'active':gameId===item.id},item.class]"
                                            @mouseenter.stop.prevent="changeGame(item)">
                                            <div class="gameListText">
                                                <span class="game_name">{{item.name}}</span>
                                                <span style="font-size:12px;color:#555;text-align: center;">{{item.mark}}</span>
                                            </div>
                                            <i class="slotTri"><img src="/static/amjs/img/slot_tri.png" alt=""></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <span class="arrow next"></span>
                        </div>

                        <!-- 游戏列表 -->
                        <div class="game_list_box">
                            <div class="gameContent">
                                <div class="content">
                                    <ul>
                                        <!-- 预览版  getItemId(item) -->
                                        <li class="gameItem" :key="index" v-for="(item,index) in gameSelectData" @click="$loginGame(item)">
                                            <div class="gamePic">
                                                <img :src="'/static/amjs/img/gamelist/gameicon/'+item.icon"
                                                    :class="{'default':true,'mg-pic':$route.query.id==='10022'}" alt />
                                                <div class="game_name">
                                                    <div class="name_txt">{{item.name}}</div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="caijin">
                                <div class="super_award"> <span>￥</span> {{superAward.toLocaleString()}}.{{randomFloat.toLocaleString().padEnd(2,'0')}}</div>
                            </div>
                            
                        </div>
                        <div class="gameDetail">
                            <div class="mobileImg"><img src="/static/amjs/img/mobile_img.png"></div>
                            <div>全亚首创，历经14年精心开发打造全新网投模式，新颖设计更耐玩，汇集诸多精彩一一呈现；各国博彩精英、世界顶级博彩服务团队打造，享受随时随地、足不出户的博彩奢华之旅!</div>
                            <div class="loadImg">
                                <div><img src="/static/amjs/img/ios.png" style="margin-right:5px;"></div>
                                <div ref="qrcode1"></div>
                                <div><img src="/static/amjs/img/android.png" style="margin-right:5px;" alt=""></div>
                                <div ref="qrcode2"></div>
                            </div>
                        </div>
                        

                        <!-- 超级彩金 -->
                        <!-- <div class="super_award">{{superAward.toLocaleString()}}.{{randomFloat.toLocaleString().padEnd(2,'0')}}</div> -->
                    </section>
                </div>
                <div class="gamefooter">
                    <p>
                        奢华博彩之旅，尽在澳门金沙娱乐场58220.com，亚洲最具公信力线上娱乐平台，<br/>
                        无尽奖赏、尊贵礼遇，宾至如归服务，等您体验！
                    </p>
                    <!-- <div><router-link to="/home/register/about-page"></router-link></div> -->
                </div>
            </div>
        </div>

       
    </div>
</template>
<script>
import $ from 'jquery';
import store from '@/vuex/store';
import data1 from '../../public/user/login';
import UserService from '@/service/public/UserService.js';
import { _SetGet, _SetPost ,postS, getS} from '@/service/public/service.js';
export default {
    mixins: [data1],
    data() {
        return {
            lantern:"",
            codeImg:"/static/amjs/img/new_games/lo.png",
            payList:[
                {name:"APP下载",mark:"APP Download",img:'/static/amjs/img/deposit_icon01.png',link:"window.open('/static/amjs/html/download/index.html')"},
                {name:"支付宝支付",mark:"Pay with Ali-Pay",img:'/static/amjs/img/deposit_icon02.png',link:""},
                {name:"微信支付",mark:"WeChat payment",img:'/static/amjs/img/deposit_icon03.png',link:""},
                {name:"QQ钱包支付",mark:"QQ wallet payment",img:'/static/amjs/img/deposit_icon04.png',link:""},
                {name:"银联支付",mark:"Fast recharge center",img:'/static/amjs/img/deposit_icon05.png',link:""},
            ],
            topList:[
                {name:"开元棋牌",img:"/static/amjs/img/top_01.png",link:"/home/chess?navid=9&id=10042"},
                {name:"AG女优厅",img:"/static/amjs/img/top_02.png",link:"/home/live"},
                {name:"BB旗舰厅",img:"/static/amjs/img/top_03.png",link:"/home/live"},
                {name:"百家乐",img:"/static/amjs/img/top_04.png",link:"/home/chess?navid=9&id=10042"},
                {name:"炸金花",img:"/static/amjs/img/top_05.png",link:"/home/chess?navid=9&id=10042"},
                {name:"抢庄牛牛",img:"/static/amjs/img/top_06.png",link:"/home/chess?navid=9&id=10042"},
            ],
            classListData: [
                {
                    name: "首页",
                    text: "HOME",
                    platform: "home",
                    link: "/home",
                    hot:false,
                },
                {
                    name: "棋牌游戏",
                    text: "CHESS",
                    link: "/home/chess?navid=9&id=0",
                    platform: "KY_CHESS",
                    gameName: "0",
                    list: [],
                    type: "chess",
                    hot:true,
                },
                {
                    name: "捕鱼游戏",
                    text: "FISHING",
                    link: "/home/fish?navid=9&id=0",
                    type: "fish",
                    hot:true,
                },
                {
                    name: "真人视讯",
                    text: "CASINO",
                    link: "/home/live",
                    platform: "live_casino",
                    hot:false,
                    jiang:true
                },
                {
                    name: "电子游艺",
                    text: "GAME",
                    platform: "AG_GAME",
                    link: "/home/slot?navid=9&id=0",
                    type: "slot",
                    hot:true,
                },
                {
                    name: "彩票游戏",
                    text: "LOTTERY",
                    platform: "CT_LOTTERY",
                    link: "/plays/hall",
                    gameName: "0",
                    type: "lottery",
                    hot:false,
                },
                {
                    name: "体育赛事",
                    text: "SPORTS",
                    platform: "sport",
                    link: "/home/tiyu?id=0",
                    list: [],
                    hot:false,
                    jiang:true
                },
                {
                    name: "优惠活动",
                    text: "ACTIVETY",
                    link: "/home/youhui",
                    hot:false,
                    jiang:true
                },
                {
                    name: "在线客服",
                    text: "SERVICE",
                    link: "service",
                    type: "service",
                    hot:false,
                }
            ],
            rollList: [
                {
                    name: 'PG电子',
                    id: '11320',
                    class: 'pg',
                    mark:"PG gaming",
                    img: '/static/amjs/img/gamelist/navicon/pg.png',
                    list: [
                        { id: '11365', icon: '11365.png', name: '麻将胡了' },
                        { id: '11361', icon: '11361.png', name: '爱尔兰精灵' },
                        { id: '11359', icon: '11359.png', name: '赏金船长' },
                        { id: '11681', icon: '11681.png', name: '寻龙探宝' },
                        { id: '11355', icon: '11355.png', name: '双喜临门' },
                        { id: '11357', icon: '11357.png', name: '冰雪大冲关' },
                        // { id: '11353', icon: '11353.png', name: '水果丛林' },
                        // { id: '11351', icon: '11351.png', name: '象财神' },
                        // { id: '11348', icon: '11348.png', name: '金猪报财' },
                        // { id: '11327', icon: '11327.jpg', name: '摇钱树' }
                    ]
                },
                {
                    name: 'AG电子',
                    id: '10015',
                    mark:"AG gaming",
                    class: 'ag',
                    img: '/static/amjs/img/gamelist/navicon/ag.png',
                    list: [
                        { id: '258', icon: '258.png', name: '金龙珠' },
                        { id: '259', icon: '259.png', name: '猛龙传奇' },
                        { id: '261', icon: '261.png', name: '阿里巴巴' },
                        { id: '263', icon: '263.png', name: '金拉霸' },
                        { id: '264', icon: '264.png', name: '复古花园' },
                        { id: '266', icon: '266.png', name: '麻将老虎机' },
                        // { id: '267', icon: '267.png', name: '水果拉霸' },
                        // { id: '268', icon: '268.png', name: '日本武士' },
                        // { id: '269', icon: '269.png', name: '杰克高手' },
                        // { id: '270', icon: '270.png', name: '武财神' }
                    ]
                },
                {
                    name: 'BBIN老虎机',
                    id: '10016',
                    class: 'bbin',
                    mark:"BBIN gaming",
                    img: '/static/amjs/img/gamelist/navicon/bbin.png',
                    list: [
                        { id: '3461', icon: '3461.png', name: '惑星战记' },
                        { id: '3462', icon: '3462.png', name: 'Staronic' },
                        { id: '3463', icon: '3463.png', name: '激爆水果盘' },
                        { id: '3464', icon: '3464.png', name: '猴子爬树' },
                        { id: '3465', icon: '3465.png', name: '金刚爬楼' },
                        { id: '3466', icon: '3466.png', name: '外星战记' },
                        // { id: '3467', icon: '3467.png', name: '外星争霸' },
                        // { id: '3468', icon: '3468.png', name: '传统' },
                        // { id: '3469', icon: '3469.png', name: '丛林' },
                        // { id: '3470', icon: '3470.png', name: 'FIFA2010' }
                    ]
                },
                {
                    name: 'CQ9电子',
                    id: '10018',
                    class: 'cq9',
                    mark:"CQ9 gaming",
                    img: '/static/amjs/img/gamelist/navicon/cq9.png',
                    list: [
                        
                        { id: '2641', icon: '2641.png', name: '世界杯球鞋' },
                        { id: '2642', icon: '2642.png', name: '足球寶貝' },
                        { id: '2643', icon: '2643.png', name: '世界杯球場' },
                        { id: '2644', icon: '2644.png', name: '世界杯全明星' },
                        { id: '2645', icon: '2645.png', name: '世界杯球衣' },
                        { id: '2646', icon: '2646.png', name: '跳高高' },
                        // { id: '2647', icon: '2647.png', name: '聚宝盆JP' },
                        // { id: '2648', icon: '2648.png', name: '赚金蛋JP' },
                        // { id: '2649', icon: '2649.png', name: '五福临门JP' },
                        // { id: '2674', icon: '2674.png', name: '宙斯' }
                    ]
                },
                {
                    name: 'DT老虎机',
                    id: '10019',
                    class: 'dt',
                    mark:"DT gaming",
                    img: '/static/amjs/img/gamelist/navicon/dt.png',
                    list: [
                        { id: '79', icon: '79.png', name: '决战世界杯' },
                        { id: '80', icon: '80.png', name: '传奇之路' },
                        { id: '81', icon: '81.png', name: '比武招亲' },
                        { id: '82', icon: '82.png', name: '逍遥骑士' },
                        { id: '83', icon: '83.png', name: '银河战争' },
                        { id: '84', icon: '84.png', name: '战甲危机' },
                        // { id: '85', icon: '85.png', name: '大亨小传' },
                        // { id: '86', icon: '86.png', name: '大魔术师' },
                        // { id: '88', icon: '88.png', name: '埃及帝国' },
                        // { id: '89', icon: '89.png', name: '心动女主播' }
                    ]
                },
                {
                    name: 'FG老虎机',
                    id: '10020',
                    class: 'fg',
                    mark:"FG gaming",
                    img: '/static/amjs/img/gamelist/navicon/fg.png',
                    list: [
                        { id: '2555', icon: '2555.png', name: '抢红包' },
                        { id: '2567', icon: '2567.png', name: '招财进宝' },
                        { id: '2569', icon: '2569.png', name: '恭贺新春' },
                        { id: '2578', icon: '2578.png', name: '西游' },
                        { id: '2621', icon: '2621.png', name: '湛蓝深海' },
                        { id: '10987', icon: '10987.png', name: '金瓶梅' },
                        // { id: '10994', icon: '10994.png', name: '钻石之恋' },
                        // { id: '11010', icon: '11010.png', name: '百变猴子' },
                        // { id: '11014', icon: '11014.png', name: '发发发' },
                        // { id: '11044', icon: '11044.png', name: '疯狂7' }
                    ]
                },
                
                {
                    name: 'JDB电子',
                    id: '10021',
                    class: 'jdb',
                    mark:"JDB gaming",
                    img: '/static/amjs/img/gamelist/navicon/jdb.png',
                    list: [
                        { id: '169', icon: '169.png', name: '唐伯虎点秋香2"' },
                        { id: '170', icon: '170.png', name: '变脸2' },
                        { id: '11078', icon: '11078.png', name: '七海夺宝' },
                        { id: '172', icon: '172.png', name: '赌王扑克' },
                        { id: '176', icon: '176.png', name: '幸运赛车' },
                        { id: '177', icon: '177.png', name: '发大财' },
                        // { id: '178', icon: '178.png', name: '九尾狐' },
                        // { id: '179', icon: '179.png', name: '啤酒大亨' },
                        // { id: '180', icon: '180.png', name: '花果山传奇' },
                        // { id: '181', icon: '181.png', name: '超激发水果盘' }
                    ]
                },
                {
                    name: 'MG老虎机',
                    id: '10022',
                    class: 'mg',
                    mark:"MG gaming",
                    img: '/static/amjs/img/gamelist/navicon/mg.png',
                    list: [
                        { id: '10117', icon: '1881.png', name: '108好汉"' },
                        { id: '10118', icon: '2049.png', name: '逐鹿三国' },
                        { id: '10119', icon: '1867.png', name: '侠盗猎车手' },
                        { id: '10121', icon: '1913.png', name: '冒险丛林(HD)' },
                        { id: '10122', icon: '1877.png', name: '大航海时代' },
                        { id: '10123', icon: '1921.png', name: '城市猎人' },
                        // { id: '10124', icon: '1892.png', name: '阿拉斯加垂钓' },
                        // { id: '10126', icon: '2093.png', name: '北极特务' },
                        // { id: '10127', icon: '2072.png', name: '北极祕宝' },
                        // { id: '10128', icon: '1982.png', name: '爱丽娜' }
                    ]
                },
                
                {
                    name: 'MW电子',
                    id: '10023',
                    class: 'mw',
                    mark:"MW gaming",
                    img: '/static/amjs/img/gamelist/navicon/mw.png',
                    list: [
                        { id: '152', icon: '152.png', name: '百乐牛牛' },
                        { id: '153', icon: '153.png', name: '超级斗地主"' },
                        { id: '154', icon: '154.png', name: '水浒英雄' },
                        { id: '155', icon: '155.png', name: '森林舞会' },
                        { id: '156', icon: '156.png', name: '水浒传' },
                        { id: '157', icon: '157.png', name: '魔豆' },
                        // { id: '158', icon: '158.png', name: '黄金777' },
                        // { id: '159', icon: '159.png', name: 'HUGA' },
                        // { id: '160', icon: '160.png', name: '好运5扑克' },
                        // { id: '161', icon: '161.png', name: '经典水果机' }
                    ]
                },
                {
                    name: 'PT老虎机',
                    id: '10024',
                    class: 'pt',
                    mark:"PT gaming",
                    img: '/static/amjs/img/gamelist/navicon/pt.png',
                    list: [
                        { id: '11443', icon: '11443.png', name: '3个小丑刮刮乐' },
                        { id: '11444', icon: '11444.png', name: '八宝一后' },
                        { id: '11445', icon: '11445.png', name: '一夜奇遇' },
                        { id: '11446', icon: '11446.png', name: '仙境冒险' },
                        { id: '11447', icon: '11447.png', name: '神的时代' },
                        { id: '11448', icon: '11448.png', name: '神的时代：命运姐妹' },
                        // { id: '11449', icon: '11449.png', name: '神的时代：智慧女神' },
                        // { id: '11450', icon: '11450.png', name: '神的时代：奥林匹斯之国王' },
                        // { id: '11451', icon: '11451.png', name: '神的时代：奥林匹斯之王子' },
                        // { id: '11452', icon: '11452.png', name: '弓兵|弓箭手' },
                        
                    ]
                },
                {
                    name: '乐游棋牌',
                    id: '10694',
                    class: 'ly',
                    mark:"LY chess",
                    img: '/static/amjs/img/gamelist/navicon/ly.png',
                    list: [
                        { id: '10613', icon: '10613.png', name: '大厅' },
                        { id: '10614', icon: '10614.png', name: '德州扑克' },
                        { id: '10615', icon: '10615.png', name: '二八杠' },
                        { id: '10616', icon: '10616.png', name: '抢庄牛牛' },
                        { id: '10617', icon: '10617.png', name: '炸金花' },
                        { id: '10618', icon: '10618.png', name: '三公' },
                        // { id: '10619', icon: '10619.png', name: '龙虎斗' },
                        // { id: '10620', icon: '10620.png', name: '21点' },
                        // { id: '10621', icon: '10621.png', name: '通比牛牛' },
                        // { id: '10622', icon: '10622.png', name: '极速炸金花' }
                    ]
                },
                {
                    name: '开元棋牌',
                    id: '10042',
                    class: 'ky',
                    mark:"KY chess",
                    img: '/static/amjs/img/gamelist/navicon/ky.png',
                    list: [

                        { id: '3605', icon: '3605.png', name: '百人牛牛' },
                        { id: '245', icon: '245.png', name: '抢庄牛牛' },
                        { id: '246', icon: '246.png', name: '炸金花' },
                        { id: '247', icon: '247.png', name: '德州扑克' },
                        { id: '248', icon: '248.png', name: '二八杠' },
                        { id: '249', icon: '249.png', name: '三公' },
                        // { id: '251', icon: '251.png', name: '21点' },
                        // { id: '255', icon: '255.png', name: '抢庄牌九' },
                        // { id: '10688', icon: '10688.png', name: '看牌抢庄牛牛' },
                        // { id: '10689', icon: '10689.png', name: '万人炸金花' }
                    ]
                }
            ],
            loggedIn:false,
            randomFloat: 18,
            gameId: 26,
            superAward: 24687936,
            gameSelectData: [],
            noticePosition: 0,
            winningInfoLeft: [],
            winningInfoRight: [],
        };
    },
    methods: {
        goUserCen(i){
            if(i == 0){
                window.open('/static/amjs/html/download/index.html');
            }else{
                this.$goUserCen('recharge',0)
            }
            
        },
        logout() {
            UserService.logout.call(this);
        },
        goKaihu() {
             this.$router.push('/home/register');
        },
        //点击展示公告列表
        showTextModal(){
            if(this.lanternData.total>0){
                this.$store.commit('alert/showTextTip', true)
            }else{
                return false
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
        //导航动画
        async slider() {
            let ul = document.getElementById('game_list');
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
                ul.style.top = n + 'px';
                ul.className = 'back';
                setTimeout(function() {
                    ul.className = '';
                    ul.style.top = '';
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
        getNativeDatas() {
            if (localStorage.chess_game_new) {
                this.classListData[1].list = this.$gameClassV4("chess");
            }
            if (localStorage.sport_game_new) {
                this.classListData[6].list = this.$gameClassV4("sport");
            }
        },
        async getGameDatas() {
            await this.$gameSortV4(this.getNativeDatas);
        },
        // 点击导航栏
        changeGame(item) {
            this.gameId = item.id;

            var len = this.rollList;
            for (var i = 0; i < len.length; i++) {
                if (len[i].id == item.id) {
                    this.gameSelectData = len[i].list;
                    return;
                }
            }
        },
        //超级奖池
        jackpotFc() {
            clearInterval(this.setInter);
            this.setInter = setInterval(() => {
                var num = Math.floor(Math.random() * 100);

                this.superAward = this.superAward + 18;
                this.randomFloat = num;
            }, 600);
        },
        //是否已登录
        isLogged() {
            if (this.userinfo) {
                this.loggedIn = true;
            } else {
                this.loggedIn = false;
            }
        },
    },
    computed:{
        userinfo() {
            return this.$store.state.mainState.userinfo;
        },
    },
    created() {
        this.$nextTick(() => {
            this.slider();
        });
    },
    watch:{
        userinfo(val){
            if (val) {
                this.loggedIn = true;
            } else {
                this.loggedIn = false;
            }
        }
    },
    mounted() {
        this.is_code_show();
        this.getGameDatas();  
        this.getLantern();
        this.changeGame(this.rollList[0]);
        this.jackpotFc();
        this.isLogged();
        this.createDownloadQRCode({
            el: this.$refs['qrcode1'],
            url: window.location.origin + '/m#/download',
            size: 86
        });
        this.createDownloadQRCode({
            el: this.$refs['qrcode2'],
            url: window.location.origin + '/m#/download',
            size: 86
        });
    },
    components: {},
    store
};
</script>

<style lang="less" scoped>
.loginPad{
    padding-top: 20px;
    padding-inline: 10px;
}
.dianziWrapper {
    height: 1450px;
    position: relative;
    overflow: hidden;
    background: url('/static/amjs/img/amjs_bg2.jpg') no-repeat center top;
    background-position-y: 30px;
    .pageRoute{
        width: 1000px;
        margin: 0 auto;
        height: 490px;
        position: relative;
        ul{
            position: absolute;
            left: 0;
            top: -4px;
            width: 150px;
            height: 460px;
            padding: 55px 0 0;
            background: url('/static/amjs/img/nav.png') no-repeat center top;
            li{
                .subnav {
                    position: absolute;
                    line-height: 36px;
                    left: 155px;
                    top: 79px;
                    z-index: 99;
                    display: none;
                    padding-top: 5px;
                    .jt {
                        background: url(/static/amjs/img/home/arrow_top.png) no-repeat;
                        height: 5px;
                        width: 9px;
                        display: block;
                        margin: 0 auto;
                        transform: rotate(-90deg);
                        position: relative;
                        top: 155px;
                        left: -78px;
                    }

                    .con {
                        background: rgba(0, 0, 0, 0.85);
                        width: 150px;
                        border: 2px solid #ffd053;
                        height: auto;
                        padding-top: 3px;

                        a {
                            color: #c7c7c7;
                            font-size: 13px;
                            display: block;
                            width: 120px;
                            height: 36px;
                            line-height: 36px;
                            text-align: center;
                            border-bottom: 1px dotted rgba(255, 255, 255, 0.15);
                            margin: 0 auto;
                            padding: 5px 15px 0;
                            position: relative;

                            &:hover {
                                color: #d6bd7b;
                            }

                            img {
                                position: absolute;
                                z-index: 99;
                                right: 5px;
                                top: 50%;
                                transform: translate(0, -35%);
                            }
                        }
                    }
                }
                .yell {
                    color: #ffff00 !important;
                }
                span{
                    width: 85%;
                    margin: 0 auto;
                    display: block;
                    text-align: center;
                    color: #fff;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    cursor: pointer;
                    position: relative;
                    img {
                        position: absolute;
                        top: 4px;
                        right: 8px;
                    }
                    
                }
                &:hover{
                    span{
                        cursor: pointer;
                        background: url('/static/amjs/img/nav_hover.png')no-repeat;
                        background-size: 100% 100%;
                    }
                        
                }
                
            }
            .SPORTS:hover{
                .subnav{
                    display: block;
                    top:141px!important;
                }
            }
            .CHESS:hover{
                .subnav{
                    display: block;
                    .jt{
                        top:42px!important;
                    }
                }
            }
        }
        .loginForm{
            display: inline-block;
            position: absolute;
            top: 25px;
            right: 0;
            width: 232px;
            height: 239px;
            background: url("/static/amjs/img/login_bg02.png") no-repeat;
            background-size: 100% 100%;
            .alreadyLogin{
                    height: 185px;
                    margin-top: 50px;
                    margin-left: 30px;
                p{
                    height: 30px;
                    line-height: 30px;
                    span{
                        font-size: 12px;
                        color:#fff;
                        &:last-child{
                            color: #FDE04E;
                        }
                    }
                }
                div{
                    span{
                        display: inline-block;
                        padding: 0 6px 0 1px;
                        border-right: 1px solid #fff;
                        font-size: 12px;
                        margin-top: 10px;
                        color:#fff;
                        cursor: pointer;
                        &:last-child{
                            border: none;
                        }
                        &:nth-child(3){
                            border: none;
                        }
                    }
                }
            }
            .login_title{
                width: 114px;
                height: 18px;
                margin: 20px auto;
                background: url('/static/amjs/img/login_title.png') no-repeat;
                background-size: 100% 100%;
                
            }
            
            i{
                display: inline-block;
                width: 30px;
                height: 30px;
                position: absolute;
            }
            .icon1{
                background: url('/static/amjs/img/icon_id.png') no-repeat;
                top: 68px;
                left: 30px;
            }
            .icon2{
                background: url('/static/amjs/img/icon_pw.png') no-repeat;
                top: 110px;
                left: 32px;
            }
            .icon3{
                background: url('/static/amjs/img/icon_yz.png') no-repeat;
                top: 151px;
                left: 32px;
            }
            .codeimg{
                display: inline-block;
                position: absolute;
                top: 142px;
                left: 152px;
                cursor: pointer;
            }
            .forget{
                text-align: center;
                font-size: 12px;
                color: #fff1bb;
                padding: 7px 0 0 0;
                cursor: pointer;
            }
            .login{
                width: 194px;
                margin: 0 auto;
                display: flex;
                span{
                    cursor: pointer;
                    display: inline-block;
                    width: 92px;
                    height: 34px;
                    font-size: 12px;
                    line-height: 34px;
                    text-align: center;
                    color:#6E3A0F;
                    background: url('/static/amjs/img/btn_reg.png') no-repeat;
                    background-size: 100% 100%;
                    &:first-child{
                        margin-right: 10px;
                        color: #fff;
                        background: url('/static/amjs/img/btn_login.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            input{
                display: block;
                width: 162px;
                height: 34px;
                margin: 0 auto 5px;
                padding-left: 30px;
                color: #fff1bb;
                line-height: 32px;
                font-size: 13px;
                background-position: 10px center;
                background-color: transparent;
                border: 1px solid #322f2f;
                box-sizing: initial;
                position: relative;
            }
            input::-webkit-input-placeholder {
                color:#fff1bb!important;
            }
        }
    }
    .gameContainer{
        width: 1000px;
        margin: 0 auto;
        .topContainer{
            ul{
                display: flex;
                justify-content: center;
                li{
                    width: 127px;
                    cursor: pointer;
                    transition:transform 1s ease;
                    span{
                        display: block;
                        color: #fff;
                        text-align: center;
                        font-size: 14px;
                        img{
                            vertical-align: middle;
                        }
                        &:first-child{
                            height: 100px;
                            line-height: 100px;
                        }
                    }
                    &:hover{
                        transform:translateY(-20px);
                        span{
                            color: #f9e978;
                        }
                    }
                    &:nth-child(2){
                        img{
                            position: relative;
                            width: 87px;
                            top: 3px;
                        }
                    }
                    &:nth-child(3){
                        img{
                            position: relative;
                            top: 6px;
                        }
                    }
                    &:nth-child(4){
                        img{
                            width: 70px;
                            position: relative;
                            top: 4px;
                        }
                        
                    }
                    &:nth-child(5){
                        img{
                            position: relative;
                            width: 74px;
                            top: 5px;
                        }
                    }
                    &:last-child{
                        img{
                            position: relative;
                            width: 69px;
                            top: 4px;
                        }
                    }
                }
            }
        }
        .payContanier{
            margin-top: 90px;
            height: 115px;
            background: url('/static/amjs/img/deposit_bg.png');
            ul{
                display: flex;
                li{
                    width: 200px;
                    height: 67px;
                    display: flex;
                    margin-top: 50px;
                    padding-left: 15px;
                    cursor: pointer;
                    span{
                        display: inline-block;
                        &:first-child{
                            width: 30%;
                            text-align: center;
                        }
                        &:last-child{
                            width: 70%;
                            i{
                                display: inline-block;
                                color: #ba4040;
                                font-size: 12px;
                                &:first-child{
                                    font-size:14px;
                                    color:#fff;
                                }
                            }
                        }
                    }
                    &:hover{
                        span{
                            &:last-child{
                                i{
                                    &:last-child{
                                        color: #f8e978;
                                    }
                                }
                            }
                            
                        }
                        
                    }
                }
            }
        }
        .priceContainer {
            height: 420px;
            position: relative;
            overflow: hidden;
            padding-top: 33px;
            // background: url(/static/amjs/img/home/caijin/bg.jpg) no-repeat center top;

            #slotBox {
                position: relative;
                width: 1000px;
                height: 100%;
                font-size: 0;
                margin: 0 auto;
                display: flex;
                
                .game_nav {
                    height: 365px;
                    background: #161616;
                    width: 199px;
                    position: relative;
                    z-index: 1;
                    border-radius: 5px;
                    white-space: nowrap;
                    .arrow {
                        position: absolute;
                        top: 0;
                        width: 200px;
                        height: 30px;
                        background-repeat: no-repeat;
                        background-position: center top;
                        cursor: pointer;
                        vertical-align: top;

                        &.prev {
                            z-index: 999;
                            top: 0;
                            background-image: url('/static/amjs/img/prev.png');
                            &:hover {
                                background-position: center bottom;
                                background-image: url('/static/amjs/img/prev.png');
                            }
                        }
                        &.next {
                            top: 335px;
                            background: url('/static/amjs/img/next.png');
                            &:hover {
                                background-position-y: -30px;
                                background: url('/static/amjs/img/next.png');
                            }
                        }
                    }

                    .mainCell {
                        height: 304px;
                        width: 208px;
                        margin-top: 30px;
                        // background: #161616;
                        .tempWarp {
                            overflow: hidden;
                            width: 208px;
                            height: 304px;
                            position: relative;

                            #game_list {
                                width: 100%;
                                height: 100%;
                                position: relative;
                                margin: 0;
                                &.move {
                                    transition: all 0.5s ease;
                                    -webkit-transition: all 0.5s ease;
                                    transform: translate3d(0, -104px, 0);
                                }
                                &.back {
                                    transition: all 0.5s ease;
                                    -webkit-transition: all 0.5s ease;
                                    transform: translate3d(0, 104px, 0);
                                }
                                li {
                                    cursor: pointer;
                                    width: 200px;
                                    float: left;
                                    height: 61px;
                                    display: table-cell;
                                    color: #fff;
                                    font-size: 14px;
                                    text-align: left;
                                    vertical-align: top;
                                    // transition: all 1s !important;
                                    position: relative;
                                    background: #252525;
                                    border-left: 2px solid transparent;
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
                                        left: 30%;
                                        transform: translate(-50%, -50%);
                                    }

                                    &.ae:before {
                                        background: url(/static/amjs/img/home/caijin/ae.png) no-repeat center center;
                                        background-size: contain;
                                        height: 30px;
                                    }
                                    &.ag:before {
                                        background: url(/static/amjs/img/home/caijin/ag.png) no-repeat center center;
                                        background-size: contain;
                                    }
                                    &.bbin:before {
                                        background: url(/static/amjs/img/home/caijin/bbin.png) no-repeat center center;
                                        background-size: contain;
                                    }
                                    &.cq9:before {
                                        background: url(/static/amjs/img/home/caijin/cq9.png) no-repeat center center;
                                        background-size: contain;
                                    }
                                    &.dt:before {
                                        background: url(/static/amjs/img/home/caijin/dt.png) no-repeat center center;
                                        background-size: contain;
                                        height: 34px;
                                    }
                                    &.fg:before {
                                        background: url(/static/amjs/img/home/caijin/fg.png) no-repeat center center;
                                        background-size: contain;
                                    }
                                    &.jdb:before {
                                        background: url(/static/amjs/img/home/caijin/jdb.png) no-repeat center center;
                                        background-size: contain;
                                        height: 30px;
                                    }
                                    &.mg:before {
                                        background: url(/static/amjs/img/home/caijin/mg.png) no-repeat center center;
                                        background-size: contain;
                                    }
                                    &.mw:before {
                                        background: url(/static/amjs/img/home/caijin/mw.png) no-repeat center center;
                                        background-size: contain;
                                    }
                                    &.pt:before {
                                        background: url(/static/amjs/img/home/caijin/pt.png) no-repeat center center;
                                        background-size: contain;
                                    }
                                    &.ky:before {
                                        background: url(/static/amjs/img/home/caijin/ky.png) no-repeat center center;
                                        background-size: contain;
                                        height: 32px;
                                    }
                                    &.vg:before {
                                        background: url(/static/amjs/img/home/caijin/vg.png) no-repeat center center;
                                        background-size: contain;
                                        height: 26px;
                                    }
                                    &.ly:before {
                                        background: url(/static/amjs/img/home/caijin/ly.png) no-repeat center center;
                                        background-size: contain;
                                        height: 32px;
                                    }
                                    &.pg:before {
                                        background: url(/static/amjs/img/home/caijin/pg.png) no-repeat center center;
                                        background-size: contain;
                                        height: 22px;
                                    }
                                    &.ttg:before {
                                        background: url(/static/amjs/img/home/caijin/ttg.png) no-repeat center center;
                                        background-size: contain;
                                    }
                                    &.ttg:before {
                                        background: url(/static/amjs/img/home/caijin/ttg.png) no-repeat center center;
                                        background-size: contain;
                                    }

                                    &.active {
                                        background-color: #2f2f2f!important;
                                        border-left: 2px solid #fefd8a!important;
                                        span {
                                            color: #fefd8a !important;
                                        }
                                        .slotTri{
                                            display: block;
                                        }
                                    }
                                    .slotTri{
                                        position: absolute;
                                        right: -6px;
                                        top: 25px;
                                        display: none;
                                    }
                                    .gameListText {
                                        width: 30px;
                                        vertical-align: middle;
                                        text-align: center;
                                        position: absolute;
                                        transition: all 1s;
                                        bottom: 15px;
                                        left: 100px;
                                        span {
                                            display: block;
                                            text-align: left;

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
                    width: 540px;
                    height: 350px;
                    padding: 20px 0 0 10px;
                    background: #161616;
                    .gameContent {
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
                                
                                .gameItem {
                                    display: inline-block;
                                    position: relative;
                                    vertical-align: top;
                                    margin: 0 10px 16px 0;
                                    width: 163px;
                                    height: 126px;
                                    overflow: hidden;
                                    background-color: #252525;
                                    cursor: pointer;
                                    box-sizing: border-box;
                                    .gamePic {
                                        transition: all 0.4s;
                                        text-align: center;
                                        position: relative;

                                        img {
                                            width: 95%;
                                            height: 113px;
                                            margin: 4px auto;
                                            transition: all 2s;
                                        }

                                        .game_name {
                                            position: absolute;
                                            bottom: -5px;
                                            width: 163px;
                                            background: #252525;
                                            height: 30px;
                                            line-height: 30px;
                                            text-align: center;
                                            margin: 0;
                                            padding: 0;
                                            color: #fff;
                                            font-size: 12px;
                                            font-family: SimSun;
                                            z-index: 1;
                                            .name_txt {
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                text-align: center;
                                                white-space: nowrap;
                                            }
                                        }
                                    }

                                    &:hover {
                                        .game_pic{

                                        }
                                        background: #f9e978!important;
                                        .game_name {
                                            background: #f9e978!important;
                                            color: #000;
                                            .name_txt{
                                                background: #f9e978!important;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .caijin{
                        width: 538px;
                        height: 59px;
                        background: url('/static/amjs/img/price_bg.jpg') no-repeat;
                        background-size: 100% 100%;
                            margin-left: -8px;
                    }
                }
                .gameDetail{
                    div{
                        .mobileImg{
                            margin-left: 15px;
                        }
                        &:nth-child(2){
                            color: #999;
                            font-size: 12px;
                            border-bottom:1px solid #2f2f2f;
                            padding: 10px 0 15px 0;
                            line-height: 20px;
                            margin-left: 10px;
                        }
                    }
                    .mobileImg{
                        margin-left: 10px;
                    }
                    .loadImg{
                        margin-left: 13px;
                        margin-top: 25px;
                        display: flex;
                        div{
                            &:nth-child(2){
                                margin: 0 8px 0 5px;
                            }
                            &:nth-child(2),&:nth-child(4){
                                width:92px;
                                height: 92px;
                                background: #fff;
                                padding: 3px;
                                img{
                                    vertical-align: middle;
                                    line-height: 92px;
                                }
                            }
                        }
                    }
                }
                
                .winner_list {
                    width: 866px;
                    height: 93px;
                    margin: 12px 0 0 0;
                    padding: 6px 0 6px 41px;
                    text-align: left;
                    vertical-align: top;
                    overflow: hidden;
                    background: url(/static/amjs/img/home/caijin/winner_bg.png) no-repeat center;
                    background-size: contain;
                    p.title{
                        height: 25px;
                        padding: 0 10px;
                        span{
                            display: inline-block;
                            width: 134px;
                            height: 25px;
                            line-height: 25px;
                            font-size: 14px;
                            color: #fff;
                        }
                    }
                    .winningBox {
                        overflow: hidden;
                        position: relative;
                        height: 68PX;
                        display: flex;

                        &:hover {
                            .winningList {
                                animation-play-state: paused;
                            }
                        }

                        .winningList {
                            width: 50%;
                            position: relative;
                            left: 0;
                            top: 0;
                            animation: animateSub 40s linear infinite;

                            .winningItem {
                                width: 100%;
                                padding: 0 10px 0 4px;
                                line-height: 28px;
                                display: flex;
                                flex-direction: row;
                                justify-content: center;
                                align-items: center;

                                i {
                                    font-size: 12px;
                                    font-weight: 400;
                                    flex: 1;
                                    text-align: center;
                                    color: #fff;

                                    &.user_id {
                                        color: #A0A0A0;
                                    }
                                    &.money_num {
                                        color: #CD3332;
                                    }

                                    &.game_name {
                                        color: #FEFD8A;
                                    }
                                }
                            }
                        }

                        .separateLine {
                            width: 1px;
                            background: #fefda3;
                        }
                    }
                }

                .super_award {
                    height: 64px;
                    line-height: 50px;
                    padding-left: 220px;
                    color: #f8e978;
                    font-size: 34px;
                    // font-weight: bold;
                    transform: translate(0, 6px);
                    span{
                        font-size: 22px;
                    }
                }
            }
        }
        .gamefooter{
            background: url('/static/amjs/img/about_bg.png') no-repeat;
            background-size: 100% 100%;
            width: 100%;
            margin: 0 auto;
            height: 197px;
            p{
                font-size: 16px;
                color: #999;
                width: 36%;
                line-height: 30px;
                position: relative;
                top: 70px;
                left: 31px;
            }
            div{
                width: 130px;
                height: 36px;
                margin-top: 90px;
                margin-left: 32px;
                background: url('/static/amjs/img/more.png')no-repeat;
                &:hover{
                    background: url('/static/amjs/img/more.png')no-repeat;
                    background-position-y: -36px;
                }
                a{
                    display: inline-block;
                    width: 130px;
                    height: 36px; 
                }
            }
        }
    }
    .indexNotice {
        position: relative;
        height: 34px;
        width: 100%;
        background-size: contain;
        z-index: 98;
        margin: 0 auto;
        // border: 1px solid #303030;
        // border-radius: 20px;
        background-color: #121212;
        .noticeInner {
            width: 1000px;
            height: 34px;
            margin: 0 auto;
            cursor: pointer;
            transform: translate(6px, 0);
            position:relative;
            marquee {
                float: right;
                width: 89%;
                height: 34px;
                line-height: 30px;
                margin-right: 10px;
                color: #fff;
                font-size: 12px;
                a{
                    color: #fff;
                }
            }
        }
        .giftIcon{
            position: absolute;
            top: 6px;
            left:-4px;
            color: #ffd053;
                i{
                    position: relative;
                    top: -4px;
                    left: 7px;
                }
        }
    }
}
</style>
