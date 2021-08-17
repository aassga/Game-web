<template>
    <div class="vnst_new_index" :style="{'margin-top' : userinfo ? '185px':'130px'}">
        <!-- 登录框 滚动到一定距离显示 -->
        <div class="headerLogin" v-if="showLoginBox && !loggedIn">
            <form name="LoginForm" id="loginForm" action="#" method="POST" target="actionframe" onsubmit="return false;">
                <div class="headerLogincon">
                    <input type="text" class="user" id="userName" name="username" tabindex="0" v-model="passKey.userName" placeholder="帐号"
                        @change="getCode">

                    <input type="password" class="pass" id="passwd" name="password" tabindex="0" v-model="passKey.password"
                         @keyup="clearNull" placeholder="密码">

                    <!-- 验证码 -->
                    <div class="verify_code_box" v-if="code_show">
                        <input type="text" class="code" id="rmNum" name="rmNum" placeholder="验证码" size="4" tabindex="0" maxlength="4"
                            title="(点选此处产生新验证码)" v-model="passKey.code">

                        <img class="codeimg" id="vPic" :src="codeImg" width="42" height="20" border="1" align="absmiddle" alt="(点选此处产生新验证码)"
                            @click="getCode">
                    </div>

                    <a href="javascript:void(0)" @click="forget" class="forgetPwd">忘记密码</a>

                    <a href="javascript:void(0)" class="logBut subbtn1" @click="login">立即登录</a>

                    <a href="javascript:void(0)" class="logBut regbtn1" @click="goKaihu">立即注册</a>
                </div>
            </form>
        </div>

        <!-- Banner -->
        <div class="bannerWrapper">
            <!-- 轮播图 -->
            <div class="carouse">
                <Carousel :autoplay="setting.autoplay" :loop="setting.loop" :autoplay-speed="setting.autoplaySpeed"
                    :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow"
                    :style="{height:carheight +'px',overflow:'hidden'}">
                    <Carousel-item v-for="(item, i) in carouselData" :key="i" class="myItems">
                        <a v-if="item.targets !=='#'" style="cursor: auto">
                            <div
                                :style="{background: 'url(' + item.img + ') no-repeat center top',backgroundSize:'cover',height: carheight +'px'}">
                            </div>
                        </a>
                        <div :style="{background: 'url(' + item.img + ') no-repeat center top',backgroundSize:'cover',height: carheight +'px'}"
                            v-else></div>
                    </Carousel-item>
                </Carousel>
            </div>

            <!-- 首页登录框 -->
            <div class="loginBox" :style="{height: carheight +'px'}" v-if="!loggedIn">
                <div class="indexBannercon">
                    <div name="LoginForm" id="loginForms">
                        <div class="indexLogin" :class="[code_show ? 'withCode':'noCode']">
                            <div class="title"></div>
                            <p class="username_box">
                                <input type="text" class="user" id="userName" name="username" value="帐号" tabindex="1" placeholder="帐号"
                                    @change="getCode" autocomplete="off" v-model="passKey.userName">
                            </p>
                            <p class="pwd_box">
                                <input type="password" id="passwd" name="password" v-model="passKey.password" tabindex="2" placeholder="密码"
                                    autocomplete="off" @keyup="clearNull" v-on:keyup.enter="login">
                            </p>
                            <p class="code_box0" v-if="code_show">
                                <input type="text" class="yzm code_box" id="rmNum" name="rmNums" placeholder="验证码" size="4" tabindex="3"
                                    maxlength="4" title="( 点选此处产生新验证码)" v-model="passKey.code" v-on:keyup.enter="login">
                                <img class="yzmimg" id="vPic" :src="codeImg" width="55" height="26" border="1" align="absmiddle"
                                    alt="( 点选此处产生新验证码 )" @click="getCode">
                            </p>
                            <div class="button">
                                <a class="login_btn" href="javascript:void(0)" @click="login"></a><!-- login -->
                                <a class="forget" href="javascript:void(0)" @click="forget"></a>
                            </div>

                            <a class="register_btn" :class="[code_show ? 'show_code' : 'no_code']" href="javascript:void(0)"
                                @click="goKaihu"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- notice 走马灯 -->
        <div class="indexNotice" :style="{top: carheight +'px'}">
            <div class="noticeInner" @click="showTextModal()">
                <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="4" onmouseout="this.start()"
                    onmouseover="this.stop()">
                    <a href="javascript:;" v-html="lantern"></a>
                </marquee>
            </div>
        </div>

        <!-- 彩金 + 电子 -->
        <div class="dianziWrapper">
            <section id="slotBox" ng-controller="LobbiesCtrl" class="ng-scope">
                <!-- 导航栏 -->
                <div class="game_nav" carousel-slider super-vis="6" super-play="true" super-effect="leftLoop">
                    <span class="arrow prev"></span>
                    <span class="arrow next"></span>

                    <div class="mainCell">
                        <div class="tempWarp">
                            <ul id="game_list">
                                <li :key="index" v-for="(item,index) in rollList" :class="[{'active':gameId===item.id},item.class]"
                                    @mouseenter.stop.prevent="changeGame(item)">
                                    <div class="gameListText">
                                        <span class="game_name">{{item.name}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 游戏列表 -->
                <div class="game_list_box">
                    <div class="gameContent">
                        <div class="content">
                            <ul>
                                <!-- 预览版  getItemId(item) -->
                                <li class="gameItem" :key="index" v-for="(item,index) in gameSelectData" @click="getItemId(item)">
                                    <div class="gamePic">
                                        <img :src="'/static/jsyl/img/gamelist/gameicon/'+item.icon"
                                            :class="{'default':true,'mg-pic':$route.query.id==='10022'}" alt />
                                        <div class="game_name">
                                            <div class="name_txt">{{item.name}}</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!--赢家榜-->
                <div class="winner_list">
                    <p class="title"><span style="padding-left: 33px;">会员账号</span><span style="padding-left: 32px;">游戏名称</span><span style="padding-left: 30px;">中奖金额</span><span style="padding-left: 46px;">会员账号</span><span style="padding-left: 42px;">游戏名称</span><span style="padding-left: 42px;">中奖金额</span></p>
                    <div class="winningBox">
                        <ul class="winningList" :style="[{transform: 'translateY(-'+noticePosition+'px) translateZ(0px)'}]">
                            <li class="winningItem" v-for="(item, i) in winningInfoLeft" :key="i">
                                <i class="user_id">{{item.name.padEnd(8, '*')}}</i>
                                <i class="game_name">{{item.game_name}}</i>
                                <i class="money_num">{{item.num}} 元</i>
                            </li>
                        </ul>
                        <span class="separateLine">|</span>
                        <ul class="winningList" :style="[{transform: 'translateY(-'+noticePosition+'px) translateZ(0px)'}]">
                            <li class="winningItem" v-for="(item, i) in winningInfoRight" :key="i">
                                <i class="user_id">{{item.name.padEnd(8, '*')}}</i>
                                <i class="game_name">{{item.game_name}}</i>
                                <i class="money_num">{{item.num}} 元</i>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- 超级彩金 -->
                <div class="super_award">{{superAward.toLocaleString()}}.{{randomFloat.toLocaleString().padEnd(2,'0')}}</div>
            </section>
        </div>

        <!-- 内页导航 -->
        <div class='Game_container'>
            <div class="Game_centet">
                <div class="process"></div>
                <!-- 导航列表 -->
                <div class='subNav'>
                    <ul class="subNavWrapper">
                        <li v-for="(item,index) in gameNavList" @mouseover="changeDzId(index)" :key="index"
                            :class="['navItem',item.className,{cur:dzId==index}]" @click.stop="goLink(item)">
                        </li>
                    </ul>

                    <ul class='Game_xx'>
                        <li v-for="(item,index) in Game_xx" :key="index" :class="item.className"
                            :style="xlid==index?'display:block;opacity:1;':'display:none;opacity:0;'">
                            <img :src="item.src" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 关于 -->
        <div id="about">
            <div class="wrapper">
                <div class="pic"></div>
                <h2>关于金沙<span>ABOUT US</span></h2>
                <p>
                    在市场上众多的博彩网站中，玩家选择金沙娱乐场除了多元化的产品，也是因为我们在业界拥有良好的信誉口碑，以及高质量的服务，我们的用心随处可见，绝无任何恶意软件，并获得GEOTRUST国际认证，确保网站公平公正性，所有会员数据均经过加密，保障玩家隐私。我们以服务会员不打烊的精神，24小时处理会员出入款相关事宜，令我们骄傲的客服团队，亲切又专业，解决玩家对于网站、游戏的种种疑难杂症，让每位玩家有宾至如归的感觉！您所想要的，就是我们一直在追求的，我们绝对是您的最佳选择。
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import store from '@/vuex/store';
import data from '../../public/games/public.js';
import data1 from '../../public/homeMeans/Aside';
import data2 from '../../public/homeMeans/home_index';
import data3 from '../../public/user/login';
import { _SetGet, _SetPost ,postS, getS} from '@/service/public/service.js';
export default {
    mixins: [data, data1, data2, data3],
    data() {
        return {
            lanternData: "",
            loggedIn: false,
            showLoginBox: false,
            carheight: 442,
            clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            showimg: false,
            popups: '',
            lantern: '',
            value3: 0,
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
                        { id: '11348', icon: '11348.png', name: '金猪报财' },
                        { id: '11327', icon: '11327.jpg', name: '摇钱树' }
                    ]
                },
                {
                    name: 'AG电子',
                    id: '10015',
                    class: 'ag',
                    img: '/static/jsyl/img/gamelist/navicon/ag.png',
                    list: [
                        { id: '258', icon: '258.png', name: '金龙珠' },
                        { id: '259', icon: '259.png', name: '猛龙传奇' },
                        { id: '261', icon: '261.png', name: '阿里巴巴' },
                        { id: '263', icon: '263.png', name: '金拉霸' },
                        { id: '264', icon: '264.png', name: '复古花园' },
                        { id: '266', icon: '266.png', name: '麻将老虎机' },
                        { id: '267', icon: '267.png', name: '水果拉霸' },
                        { id: '268', icon: '268.png', name: '日本武士' },
                        { id: '269', icon: '269.png', name: '杰克高手' },
                        { id: '270', icon: '270.png', name: '武财神' }
                    ]
                },
                {
                    name: 'BBIN老虎机',
                    id: '10016',
                    class: 'bbin',
                    img: '/static/jsyl/img/gamelist/navicon/bbin.png',
                    list: [
                        { id: '3461', icon: '3461.png', name: '惑星战记' },
                        { id: '3462', icon: '3462.png', name: 'Staronic' },
                        { id: '3463', icon: '3463.png', name: '激爆水果盘' },
                        { id: '3464', icon: '3464.png', name: '猴子爬树' },
                        { id: '3465', icon: '3465.png', name: '金刚爬楼' },
                        { id: '3466', icon: '3466.png', name: '外星战记' },
                        { id: '3467', icon: '3467.png', name: '外星争霸' },
                        { id: '3468', icon: '3468.png', name: '传统' },
                        { id: '3469', icon: '3469.png', name: '丛林' },
                        { id: '3470', icon: '3470.png', name: 'FIFA2010' }
                    ]
                },
                {
                    name: 'CQ9电子',
                    id: '10018',
                    class: 'cq9',
                    img: '/static/jsyl/img/gamelist/navicon/cq9.png',
                    list: [
                        
                        { id: '2641', icon: '2641.png', name: '世界杯球鞋' },
                        { id: '2642', icon: '2642.png', name: '足球寶貝' },
                        { id: '2643', icon: '2643.png', name: '世界杯球場' },
                        { id: '2644', icon: '2644.png', name: '世界杯全明星' },
                        { id: '2645', icon: '2645.png', name: '世界杯球衣' },
                        { id: '2646', icon: '2646.png', name: '跳高高' },
                        { id: '2647', icon: '2647.png', name: '聚宝盆JP' },
                        { id: '2648', icon: '2648.png', name: '赚金蛋JP' },
                        { id: '2649', icon: '2649.png', name: '五福临门JP' },
                        { id: '2674', icon: '2674.png', name: '宙斯' }
                    ]
                },
                {
                    name: 'DT老虎机',
                    id: '10019',
                    class: 'dt',
                    img: '/static/jsyl/img/gamelist/navicon/dt.png',
                    list: [
                        { id: '79', icon: '79.png', name: '决战世界杯' },
                        { id: '80', icon: '80.png', name: '传奇之路' },
                        { id: '81', icon: '81.png', name: '比武招亲' },
                        { id: '82', icon: '82.png', name: '逍遥骑士' },
                        { id: '83', icon: '83.png', name: '银河战争' },
                        { id: '84', icon: '84.png', name: '战甲危机' },
                        { id: '85', icon: '85.png', name: '大亨小传' },
                        { id: '86', icon: '86.png', name: '大魔术师' },
                        { id: '88', icon: '88.png', name: '埃及帝国' },
                        { id: '89', icon: '89.png', name: '心动女主播' }
                    ]
                },
                {
                    name: 'FG老虎机',
                    id: '10020',
                    class: 'fg',
                    img: '/static/jsyl/img/gamelist/navicon/fg.png',
                    list: [
                        { id: '2569', icon: '2569.png', name: '恭贺新春' },
                        { id: '2578', icon: '2578.png', name: '西游' },
                        { id: '2549', icon: '2549.png', name: '二人麻将' },
                        { id: '2550', icon: '2550.png', name: '德州牛仔' },
                        { id: '2551', icon: '2551.png', name: '炸金花' },
                        { id: '2552', icon: '2552.png', name: '潘帕斯雄鹰' },
                        { id: '2553', icon: '2553.png', name: '金球争霸' },
                        { id: '2554', icon: '2554.png', name: '闹元宵' },
                        { id: '2555', icon: '2555.png', name: '抢红包' },
                        { id: '2556', icon: '2556.png', name: '古墓丽影' }
                    ]
                },
                
                {
                    name: 'JDB电子',
                    id: '10021',
                    class: 'jdb',
                    img: '/static/jsyl/img/gamelist/navicon/jdb.png',
                    list: [
                        { id: '169', icon: '169.png', name: '唐伯虎点秋香2"' },
                        { id: '170', icon: '170.png', name: '变脸2' },
                        { id: '11078', icon: '11078.png', name: '七海夺宝' },
                        { id: '172', icon: '172.png', name: '赌王扑克' },
                        { id: '176', icon: '176.png', name: '幸运赛车' },
                        { id: '177', icon: '177.png', name: '发大财' },
                        { id: '178', icon: '178.png', name: '九尾狐' },
                        { id: '179', icon: '179.png', name: '啤酒大亨' },
                        { id: '180', icon: '180.png', name: '花果山传奇' },
                        { id: '181', icon: '181.png', name: '超激发水果盘' }
                    ]
                },
                {
                    name: 'MG老虎机',
                    id: '10022',
                    class: 'mg',
                    img: '/static/jsyl/img/gamelist/navicon/mg.png',
                    list: [
                        { id: '10117', icon: '1881.png', name: '108好汉"' },
                        { id: '10118', icon: '2049.png', name: '逐鹿三国' },
                        { id: '10119', icon: '1867.png', name: '侠盗猎车手' },
                        { id: '10121', icon: '1913.png', name: '冒险丛林(HD)' },
                        { id: '10122', icon: '1877.png', name: '大航海时代' },
                        { id: '10123', icon: '1921.png', name: '城市猎人' },
                        { id: '10124', icon: '1892.png', name: '阿拉斯加垂钓' },
                        { id: '10126', icon: '2093.png', name: '北极特务' },
                        { id: '10127', icon: '2072.png', name: '北极祕宝' },
                        { id: '10128', icon: '1982.png', name: '爱丽娜' }
                    ]
                },
                
                {
                    name: 'MW电子',
                    id: '10023',
                    class: 'mw',
                    img: '/static/jsyl/img/gamelist/navicon/mw.png',
                    list: [
                        { id: '152', icon: '152.png', name: '百乐牛牛' },
                        { id: '153', icon: '153.png', name: '超级斗地主"' },
                        { id: '154', icon: '154.png', name: '水浒英雄' },
                        { id: '155', icon: '155.png', name: '森林舞会' },
                        { id: '156', icon: '156.png', name: '水浒传' },
                        { id: '157', icon: '157.png', name: '魔豆' },
                        { id: '158', icon: '158.png', name: '黄金777' },
                        { id: '159', icon: '159.png', name: 'HUGA' },
                        { id: '160', icon: '160.png', name: '好运5扑克' },
                        { id: '161', icon: '161.png', name: '经典水果机' }
                    ]
                },
                {
                    name: 'PT老虎机',
                    id: '10024',
                    class: 'pt',
                    img: '/static/jsyl/img/gamelist/navicon/pt.png',
                    list: [
                        { id: '11443', icon: '11443.png', name: '3个小丑刮刮乐' },
                        { id: '11444', icon: '11444.png', name: '八宝一后' },
                        { id: '11445', icon: '11445.png', name: '一夜奇遇' },
                        { id: '11446', icon: '11446.png', name: '仙境冒险' },
                        { id: '11447', icon: '11447.png', name: '神的时代' },
                        { id: '11448', icon: '11448.png', name: '神的时代：命运姐妹' },
                        { id: '11449', icon: '11449.png', name: '神的时代：智慧女神' },
                        { id: '11450', icon: '11450.png', name: '神的时代：奥林匹斯之国王' },
                        { id: '11451', icon: '11451.png', name: '神的时代：奥林匹斯之王子' },
                        { id: '11452', icon: '11452.png', name: '弓兵|弓箭手' },
                        
                    ]
                },
                {
                    name: '乐游棋牌',
                    id: '10694',
                    class: 'ly',
                    img: '/static/jsyl/img/gamelist/navicon/ly.png',
                    list: [
                        { id: '10613', icon: '10613.png', name: '大厅' },
                        { id: '10614', icon: '10614.png', name: '德州扑克' },
                        { id: '10615', icon: '10615.png', name: '二八杠' },
                        { id: '10616', icon: '10616.png', name: '抢庄牛牛' },
                        { id: '10617', icon: '10617.png', name: '炸金花' },
                        { id: '10618', icon: '10618.png', name: '三公' },
                        { id: '10619', icon: '10619.png', name: '龙虎斗' },
                        { id: '10620', icon: '10620.png', name: '21点' },
                        { id: '10621', icon: '10621.png', name: '通比牛牛' },
                        { id: '10622', icon: '10622.png', name: '极速炸金花' }
                    ]
                },
                {
                    name: '开元棋牌',
                    id: '10042',
                    class: 'ky',
                    img: '/static/jsyl/img/gamelist/navicon/ky.png',
                    list: [

                        { id: '3605', icon: '3605.png', name: '百人牛牛' },
                        { id: '245', icon: '245.png', name: '抢庄牛牛' },
                        { id: '246', icon: '246.png', name: '炸金花' },
                        { id: '247', icon: '247.png', name: '德州扑克' },
                        { id: '248', icon: '248.png', name: '二八杠' },
                        { id: '249', icon: '249.png', name: '三公' },
                        { id: '251', icon: '251.png', name: '21点' },
                        { id: '255', icon: '255.png', name: '抢庄牌九' },
                        { id: '10688', icon: '10688.png', name: '看牌抢庄牛牛' },
                        { id: '10689', icon: '10689.png', name: '万人炸金花' }
                    ]
                }
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
            winningInfoLeft: [],
            winningInfoRight: [],
            // 轮播名单
            carouselData: [],
            superAward: 24687936,
            randomFloat: 18,
            setInter: null,
            setting: {
                autoplay: true,
                loop: true,
                autoplaySpeed: 3000,
                radiusDot: false,
                arrow: 'never',
                trigger: 'click'
            },
            gameNavList: [
                {
                    name: '手机投注',
                    link: '/download',
                    imgSrc: '/static/jsyl/img/home/mobile.jpg',
                    className: 'download'
                },
                {
                    name: '开元棋牌',
                    link: '/ky',
                    imgSrc: '/static/jsyl/img/home/ky_chess.jpg',
                    className: 'kyChess',
                    id: 151
                },
                {
                    name: '真人娱乐',
                    link: '/home/live',
                    imgSrc: '/static/jsyl/img/home/live.jpg',
                    className: 'casino'
                },
                {
                    name: '彩票游戏',
                    link: '/plays/hall',
                    imgSrc: '/static/jsyl/img/home/lottery.jpg',
                    className: 'lottery'
                },
                {
                    name: '体育投注',
                    link: '/home/tiyu',
                    imgSrc: '/static/jsyl/img/home/sport.jpg',
                    className: 'sport'
                }
            ],
            dzId: 0,
            xlid: 0,
            Game_xx: [
                {
                    src: '/static/jsyl/img/home/mobile_bg.png',
                    className: 'mobile_bg'
                },
                {
                    src: '/static/jsyl/img/home/kg_bg.png',
                    className: 'kg_bg'
                },
                {
                    src: '/static/jsyl/img/home/live_bg.png',
                    className: 'live_bg'
                },
                {
                    src: '/static/jsyl/img/home/lottery_bg.png',
                    className: 'lottery_bg'
                },
                {
                    src: '/static/jsyl/img/home/sport_bg.png',
                    className: 'sport_bg'
                }
            ],
            gameSelectData: []
        };
    },
    methods: {
        //是否已登录
        isLogged() {
            if (!localStorage.token || !localStorage.userinfo) {
                this.loggedIn = false;
            } else {
                this.loggedIn = true;
            }
        },

        //滚动监听
        handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop > 370) {
                this.showLoginBox = true;
            } else {
                this.showLoginBox = false;
            }
        },

        // 改变dzId
        changeDzId(index) {
            this.dzId = index;
            this.xlid = index;
        },

        forget() {
            this.$store.commit('alert/newshowtip', {
                bool: true,
                title: '忘记帐号密码，请联系在线客服人员取回！',
                model: '',
                leftspan: true
            });
        },

        //页面跳转
        goLink(item) {
            if (item.link) {
                if (item.link == 'service') {
                    let service = JSON.parse(localStorage.config).service;
                    if (service) {
                        let ser = service.find(item => item.status === 'on');
                        if (ser) {
                            window.open(ser.url);
                        }
                    }
                } else if (item.link == '/plays/hall') {
                    window.open('#/plays/hall');
                    return false;
                } else if (item.link == '/download') {
                    window.open('/static/jsyl/html/download/index.html');
                } else if (item.link == '/ky') {
                    this.$router.push('/home/qipai?id=10042&name=开元棋牌');
                } else {
                    this.$router.push(item.link);
                }
            } else if (item.cname) {
                this.getItemId(item);
            } else if (item.id == 151) {
                this.trustLogin(item);
            }
        },

        goKaihu() {
            this.$store.commit('hsyl/showRegister', true);
        },

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
            this.gameId = item.id;

            var len = this.rollList;
            for (var i = 0; i < len.length; i++) {
                if (len[i].id == item.id) {
                    this.gameSelectData = len[i].list;
                    return;
                }
            }
        },

        async clear() {
            this.iptVal = '';
            this.currenttype = '';
            this.currentline = '';
            this.currentTag = '';
            this.pageDatas.page = 1;
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

        // 获取游戏列表
        async getData() {
            var allGameData = {};
            let idArr = [];
            var gameList = [];

            this.rollList.forEach(v => {
                idArr.push(v.id);
            });

            let res = await this.$http.post(`${this.$HOST_NAME}/gameSortNew`, {
                id: '10022',
                device: 'pc'
            });

            if (res && res.code === 200) {
                this.gameData = res.data[10022].slice(0, 12);
                this.gameData.splice(3, 1);
                this.gameData.splice(7, 1);
            }

            let gameId = idArr.join('|');
            let res2 = await this.$http.post(`${this.$HOST_NAME}/gameSortNew`, {
                id: gameId,
                device: 'pc'
            });

            if (res2 && res2.code == 200) {
                idArr.forEach((item, index) => {
                    if (item == '10022') {
                        gameList = res2.data[item].slice(0, 12);
                        gameList.splice(3, 1);
                        gameList.splice(7, 1);
                        allGameData[idArr[index]] = gameList;
                    } else {
                        gameList = res2.data[item].slice(0, 10);
                        allGameData[idArr[index]] = gameList;
                    }
                });
                localStorage.setItem('gameDate', JSON.stringify(allGameData));
            }
        },

        hotTag(item) {
            this.hotNow.img = item.img;
            this.hotNow.name = item.name;
            this.hotNow.class = item.class;
            this.hotNow.title = item.title;
            this.hotNow.text = item.text;
            this.hotNow.btn = item.btn;
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
                ul.style.left = n + 'px';
                ul.className = 'back';
                setTimeout(function() {
                    ul.className = '';
                    ul.style.left = '';
                }, 500);
            }
            prev.onclick = left;
            next.onclick = right;
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
            this.winningInfoLeft = data.slice(0, 25);
            this.winningInfoRight = data.slice(25, 50);
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

        async getnewDatas() {
            // await this.getid();
            await this.getData();
        },
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
        //获取电子游艺参数
        // async getGameData() {
        //     let res = await postS(`gameSortSlot`,{device:'pc'})
        //     if (res && res.code === 200) {
        //         sessionStorage.setItem('allgames', JSON.stringify(res.data));
        //     }
        // },
    },

    created() {
        this.getLanternList();
        this.changeGame(this.rollList[0]);
        this.getnewDatas();
        this.getqipai(); //获取棋牌游戏的数据
        // this.getGameData();
        setTimeout(() => {
            this.showimg = false;
        }, 7000);
        this.$nextTick(() => {
            this.slider();
        });

        if (this.clientwidth > 1920) {
            this.carheight = 442 * (this.clientwidth / 1920) * 0.9;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
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
        this.isLogged();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    watch: {
        $route() {
            this.getData();
        },
        isLogged() {
            this.isLogged();
        }
    },
    computed: {
        userinfo() {
            return this.$store.state.mainState.userinfo;
        }
    },
    components: {},
    store
};
</script>

<style lang="less" scoped>
/deep/ .ivu-carousel-dots {
    z-index: 1000;

    li {
        opacity: 0;
    }
}

body {
    background: #1a1a1a;
}
.vnst_new_index {
    position: relative;
    min-width: 1200px;
    background: #101010;
    font-size: 16px;

    a {
        text-decoration: none;
        color: #fff;
        font-size: 12px;
    }

    @keyframes animateSub {
        0% {
            top: 0;
        }

        to {
            top: -700px;
        }
    }

    .headerLogin {
        position: fixed;
        top: 132px;
        z-index: 100;
        width: 100%;
        height: 42px;
        background: #000;

        #loginForm {
            width: 100%;
            height: 100%;
            .headerLogincon {
                background: url(/static/jsyl/img/home/headerlogin.png) left center no-repeat;
                height: 100%;
                width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: start;
                align-items: center;

                input {
                    width: 147px;
                    height: 24px;
                    line-height: 24px;
                    padding-left: 10px;
                    color: #aaa;
                    font-size: 12px;
                    font-family: 'Microsoft Yahei';
                    border: 1px solid #626262;
                    background: transparent;
                    caret-color: #ccc;

                    &::-webkit-input-placeholder {
                        color: #626262;
                    }
                    &::-moz-placeholder {
                        color: #626262;
                        opacity: 1;
                    }
                    &::-moz-placeholder {
                        color: #626262;
                        opacity: 1;
                    }
                    &:-ms-input-placeholder {
                        color: #626262;
                    }
                    &:-webkit-autofill {
                        -webkit-text-fill-color: #fff !important;
                        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
                        background-color: transparent !important;
                        background-image: none !important;
                        transition: background-color 50000s ease-in-out 0s !important;
                    }

                    &.user {
                        transition: all 0.4s;
                        margin-left: 150px;
                        &:hover {
                            border: 1px solid #ffd053;
                            transition: all 0.4s ease;
                        }
                    }
                    &.pass {
                        margin-left: 15px;
                        margin-right: 15px;
                        transition: all 0.4s;
                        &:hover {
                            border: 1px solid #ffd053;
                            transition: all 0.4s ease;
                        }
                    }
                    &.code {
                        width: 147px;
                        padding-left: 10px;
                        transition: all 0.4s;
                    }
                    &::-webkit-input-placeholder {
                        color: #fff;
                    }
                    &::-moz-placeholder {
                        color: #fff;
                        opacity: 1;
                    }
                    &:-moz-placeholder {
                        color: #fff;
                        opacity: 1;
                    }
                }

                .verify_code_box {
                    position: relative;
                    margin: 15px;
                    .codeimg {
                        position: absolute;
                        top: 2px;
                        right: 2px;
                        height: 20px;
                        cursor: pointer;
                    }
                }
                .forgetPwd {
                    height: 26px;
                    line-height: 26px;
                    display: inline-block;
                    position: relative;
                    color: #626262;
                    text-decoration: underline;
                    margin-right: 15px;
                }

                .logBut {
                    width: 83px;
                    height: 26px;
                    text-align: center;
                    line-height: 26px;
                    font-size: 12px;
                    font-family: 'Microsoft Yahei';
                    border: none;
                    cursor: pointer;

                    &.subbtn1 {
                        color: #54300d;
                        background: url(/static/jsyl/img/login/btn_login.png) no-repeat;
                        background-position: top center;
                        &:hover {
                            background-position: bottom center;
                        }
                    }
                    &.regbtn1 {
                        margin-left: 10px;
                        color: #e9d87b;
                        background: url(/static/jsyl/img/login/btn_join.png) no-repeat;
                        background-position: top center;
                        :hover {
                            background-position: bottom center;
                        }
                    }
                }
            }
        }

        .w1000 {
            color: #fff;
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            position: relative;
            z-index: 4;
            .left {
                min-width: 250px;
                height: 100%;
                text-align: left;
                display: flex;
                align-items: center;
                span {
                    height: 100%;
                    line-height: 54px;
                    font-size: 16px;
                    padding: 0 1px 0 0;

                    &.account {
                        margin: 0 6px 0 0px;
                        font {
                            display: inline-block;
                            min-width: 68px;
                        }
                    }
                    &.user_money {
                        font {
                            display: inline-block;
                            min-width: 35px;
                        }
                    }

                    &.refresh_balance {
                        .refresh {
                            display: inline-block;
                            width: 22px;
                            height: 20px;
                            background: url('/static/jsyl/img/login/refresh.png') center center no-repeat;
                            margin-top: 17px;
                        }
                        .newfresh {
                            background: url('/static/jsyl/img/login/newfresh.png') no-repeat center;
                        }
                        .fres {
                            -webkit-animation: spin 1s linear;
                            animation: spin 1s linear;
                        }
                        @-webkit-keyframes spin {
                            from {
                                -webkit-transform: rotate(0deg) scale(1.2);
                            }
                            to {
                                -webkit-transform: rotate(360deg) scale(1.2);
                            }
                        }

                        @keyframes spin {
                            from {
                                transform: rotate(0deg) scale(1.2);
                            }
                            to {
                                transform: rotate(360deg) scale(1.2);
                            }
                        }
                    }
                }
            }

            .right {
                flex: 1;
                margin-left: 8px;
                span {
                    a {
                        font-size: 15px;

                        &.unread_msg {
                            margin: 0 8px;
                        }

                        &.logOut {
                            display: inline-block;
                            width: 62px;
                            height: 24px;
                            line-height: 24px;
                            text-align: center;
                            color: #000;
                            background: url(/static/jsyl/img/login/log_out.png) center center no-repeat;
                            background-size: contain;
                        }
                    }
                }
            }
        }
    }

    .bannerWrapper {
        position: relative;

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

        .loginBox {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translate(-50%, 0);
            width: 1200px;
            margin: 0 auto;
            z-index: 3;

            .indexBannercon {
                position: relative;
                width: 100%;
                height: 442px;
                margin: 0 auto;
                z-index: 20;
                overflow: hidden;

                #loginForms {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translate(0, -50%);
                    z-index: 20;

                    .indexLogin {
                        width: 280px;
                        height: 360px;
                        overflow: hidden;
                        position: relative;
                        padding-top: 28px;
                        &.withCode {
                            background: url(/static/jsyl/img/login/with_code.png) no-repeat;
                            .subbtn {
                                bottom: 10px;
                            }
                        }
                        &.noCode {
                            background: url(/static/jsyl/img/login/no_code.png) no-repeat;
                            .subbtn {
                                bottom: 64px;
                            }
                        }

                        .title {
                            width: 100%;
                            height: 24px;
                            margin-bottom: 12px;
                            background: url(/static/jsyl/img/login/title.png) center center no-repeat;
                            background-size: contain;
                        }
                        p {
                            width: 82%;
                            height: 42px;
                            line-height: 42px;
                            margin: 0 auto;
                            border: 1px solid #212121;
                            &:hover {
                                border: 1px solid #d9b575;
                            }
                            &.username_box {
                                margin-bottom: 10px;
                                background: url(/static/jsyl/img/login/user_input.png) no-repeat center center;
                            }
                            &.pwd_box {
                                background: url(/static/jsyl/img/login/pwd_input.png) no-repeat center center;
                            }
                            &.code_box0 {
                                height: 48px;
                                line-height: 48px;
                                padding-top: 4px;
                                width: 83%;
                                margin: 12px auto;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;

                                .yzm {
                                    width: 52%;
                                    height: 40px;
                                    line-height: 40px;
                                    background: transparent;
                                    border: none;
                                    color: #fff !important;
                                    font-size: 15px;
                                    outline: 0;
                                    margin: 0;
                                    padding-left: 13px;
                                    border: 1px solid #626262;

                                    &::-webkit-input-placeholder {
                                        color: #fff;
                                    }
                                    &::-moz-placeholder {
                                        color: #fff;
                                        opacity: 1;
                                    }
                                    &::-moz-placeholder {
                                        color: #fff;
                                        opacity: 1;
                                    }
                                }
                                .yzm:hover {
                                    border: 1px solid #d9b575 !important;
                                }

                                .yzmimg {
                                    width: 44%;
                                    height: 40px;
                                    margin-top: 0;
                                }
                            }

                            input {
                                width: 85%;
                                height: 40px;
                                line-height: 40px;
                                background: transparent;
                                border: none;
                                color: #fff !important;
                                font-size: 15px;
                                display: block;
                                outline: 0;
                                margin: 0 34px;
                                padding-right: 10px;
                                caret-color: #fff;

                                &::-webkit-input-placeholder {
                                    color: #fff;
                                }
                                &::-moz-placeholder {
                                    color: #fff;
                                    opacity: 1;
                                }
                                &::-moz-placeholder {
                                    color: #fff;
                                    opacity: 1;
                                }
                                &:-webkit-autofill {
                                    -webkit-text-fill-color: #fff !important;
                                    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
                                    background-color: transparent !important;
                                    background-image: none !important;
                                    transition: background-color 50000s ease-in-out 0s !important;
                                }
                            }
                        }
                        .code_box0 {
                            border: 0 !important;
                        }

                        .code_box {
                            height: 48px;
                            line-height: 48px;
                            padding-top: 4px;
                            width: 83%;
                            margin: 12px auto;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .yzm {
                                width: 52%;
                                height: 40px;
                                line-height: 40px;
                                background: transparent;
                                border: none;
                                color: #fff !important;
                                font-size: 15px;
                                outline: 0;
                                margin: 0;
                                padding-left: 13px;
                                border: 1px solid #212121;

                                &::-webkit-input-placeholder {
                                    color: #fff;
                                }
                                &::-moz-placeholder {
                                    color: #fff;
                                    opacity: 1;
                                }
                                &::-moz-placeholder {
                                    color: #fff;
                                    opacity: 1;
                                }
                            }

                            .yzmimg {
                                width: 44%;
                                height: 40px;
                                margin-top: 0;
                            }
                        }
                        .button {
                            width: 82%;
                            height: 42px;
                            margin: 12px auto;
                            display: flex;
                            justify-content: space-between;

                            a {
                                width: 48%;
                                height: 100%;

                                &.login_btn {
                                    text-decoration: none;
                                    background: url(/static/jsyl/img/login/login_btn.png) no-repeat center center;
                                    background-size: contain;

                                    &:hover {
                                        color: #fefba6;
                                    }
                                }
                                &.forget {
                                    background: url(/static/jsyl/img/login/forget_pwd.png) no-repeat center center;
                                    background-size: contain;
                                }
                            }
                            .subbtn {
                                background: #27c6fa;
                                border-radius: 4px;
                                width: 259px;
                                height: 46px;
                                line-height: 40px;
                                text-align: center;
                                border: none;
                                color: #282203;
                                font-size: 18px;
                                font-family: '微软雅黑';
                                cursor: pointer;
                                display: block;
                                margin: 0 auto;
                                transition: all 0.4s;
                                position: absolute;
                                left: 50%;
                                transform: translate(-50%, 0);

                                &:hover {
                                    background: #5cd7ff;
                                }
                            }
                        }
                        .register_btn {
                            display: block;
                            width: 83%;
                            height: 42px;
                            background: url(/static/jsyl/img/login/register_btn.png) no-repeat center center;
                            background-size: contain;

                            &.show_code {
                                margin: 0 auto;
                            }
                            &.no_code {
                                margin: 25px auto 0;
                            }
                        }
                    }
                }
            }
        }
    }

    .w1000 {
        width: 1040px;
        height: 36px;
        margin: 0 auto;
        cursor: pointer;
    }

    .indexNotice {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -17px);
        height: 34px;
        width: 1920px;
        background: url(/static/jsyl/img/home/noticebg.png) no-repeat center;
        background-size: contain;
        z-index: 10;
        margin: 0 auto;

        .noticeInner {
            width: 988px;
            height: 34px;
            margin: 0 auto;
            cursor: pointer;
            transform: translate(55px, 0);

            marquee {
                float: right;
                width: 100%;
                height: 34px;
                line-height: 34px;
                margin-right: 10px;
                color: #fff;
                font-size: 12px;
            }
        }
    }

    .dianziWrapper {
        height: 595px;
        position: relative;
        overflow: hidden;
        padding-top: 33px;
        background: url(/static/jsyl/img/home/caijin/bg.jpg) no-repeat center top;

        #slotBox {
            position: relative;
            width: 1200px;
            height: 100%;
            font-size: 0;
            margin: 0 auto;

            .game_nav {
                height: 82px;
                width: 100%;
                position: relative;
                z-index: 1;
                margin: 0 auto;
                border-radius: 5px;
                white-space: nowrap;

                .arrow {
                    position: absolute;
                    top: 0;
                    width: 52px;
                    height: 85px;
                    background-repeat: no-repeat;
                    background-position: center top;
                    cursor: pointer;
                    vertical-align: top;

                    &.prev {
                        z-index: 999;
                        left: 0;
                        background-image: url(/static/jsyl/img/home/caijin/prev.png);
                        &:hover {
                            background-position: center bottom;
                            background-image: url(/static/jsyl/img/home/caijin/prev.png);
                        }
                    }
                    &.next {
                        right: 0;
                        background: url(/static/jsyl/img/home/caijin/next.png);
                        &:hover {
                            background-position: center bottom;
                            background: url(/static/jsyl/img/home/caijin/next.png);
                        }
                    }
                }

                .mainCell {
                    height: 100%;
                    margin: 0 52px;

                    .tempWarp {
                        overflow: hidden;
                        width: 100%;
                        height: 100%;
                        margin: auto;
                        position: relative;

                        #game_list {
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
                                cursor: pointer;
                                width: 109.6px;
                                float: left;
                                height: 82px;
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
                                    background: url(/static/jsyl/img/home/caijin/ae.png) no-repeat center center;
                                    background-size: contain;
                                    height: 30px;
                                }
                                &.ag:before {
                                    background: url(/static/jsyl/img/home/caijin/ag.png) no-repeat center center;
                                    background-size: contain;
                                }
                                &.bbin:before {
                                    background: url(/static/jsyl/img/home/caijin/bbin.png) no-repeat center center;
                                    background-size: contain;
                                }
                                &.cq9:before {
                                    background: url(/static/jsyl/img/home/caijin/cq9.png) no-repeat center center;
                                    background-size: contain;
                                }
                                &.dt:before {
                                    background: url(/static/jsyl/img/home/caijin/dt.png) no-repeat center center;
                                    background-size: contain;
                                    height: 34px;
                                }
                                &.fg:before {
                                    background: url(/static/jsyl/img/home/caijin/fg.png) no-repeat center center;
                                    background-size: contain;
                                }
                                &.jdb:before {
                                    background: url(/static/jsyl/img/home/caijin/jdb.png) no-repeat center center;
                                    background-size: contain;
                                    height: 30px;
                                }
                                &.mg:before {
                                    background: url(/static/jsyl/img/home/caijin/mg.png) no-repeat center center;
                                    background-size: contain;
                                }
                                &.mw:before {
                                    background: url(/static/jsyl/img/home/caijin/mw.png) no-repeat center center;
                                    background-size: contain;
                                }
                                &.pt:before {
                                    background: url(/static/jsyl/img/home/caijin/pt.png) no-repeat center center;
                                    background-size: contain;
                                }
                                &.ky:before {
                                    background: url(/static/jsyl/img/home/caijin/ky.png) no-repeat center center;
                                    background-size: contain;
                                    height: 32px;
                                }
                                &.vg:before {
                                    background: url(/static/jsyl/img/home/caijin/vg.png) no-repeat center center;
                                    background-size: contain;
                                    height: 26px;
                                }
                                &.ly:before {
                                    background: url(/static/jsyl/img/home/caijin/ly.png) no-repeat center center;
                                    background-size: contain;
                                    height: 32px;
                                }
                                &.pg:before {
                                    background: url(/static/jsyl/img/home/caijin/pg.png) no-repeat center center;
                                    background-size: contain;
                                    height: 32px;
                                }
                                &.ttg:before {
                                    background: url(/static/jsyl/img/home/caijin/ttg.png) no-repeat center center;
                                    background-size: contain;
                                }
                                &.ttg:before {
                                    background: url(/static/jsyl/img/home/caijin/ttg.png) no-repeat center center;
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

                                .gameListText {
                                    width: 100%;
                                    vertical-align: middle;
                                    text-align: center;
                                    position: absolute;
                                    bottom: 10px;
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
                width: 842px;
                height: 256px;
                margin: 15px 0 0 12px;
                padding: 10px 0 0 10px;
                background: url(/static/jsyl/img/home/caijin/game_list_bg.jpg) no-repeat;

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
                                margin: 0 10px 6px 0;
                                width: 155px;
                                height: 116px;
                                overflow: hidden;
                                background-color: transparent;
                                cursor: pointer;
                                box-sizing: border-box;
                                .gamePic {
                                    transition: all 0.4s;
                                    text-align: center;
                                    position: relative;

                                    img {
                                        width: 100%;
                                        height: 116px;
                                        transition: all 2s;
                                    }

                                    .game_name {
                                        position: absolute;
                                        bottom: 0;
                                        width: 155px;
                                        height: 30px;
                                        line-height: 30px;
                                        text-align: center;
                                        margin: 0;
                                        padding: 0;
                                        color: #fff;
                                        font-size: 12px;
                                        font-family: SimSun;
                                        z-index: 1;
                                        background: rgba(0, 0, 0, 0.8);
                                        opacity: 0.01;
                                        transition: all 0.8s ease-in-out;

                                        .name_txt {
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            text-align: center;
                                            white-space: nowrap;
                                        }
                                    }
                                }

                                &:hover {
                                    .game_name {
                                        opacity: 1;
                                        transition: all 0.8s ease-in-out;
                                    }
                                }
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
                background: url(/static/jsyl/img/home/caijin/winner_bg.png) no-repeat center;
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
                line-height: 64px;
                padding-left: 620px;
                color: red;
                font-size: 31px;
                font-weight: bold;
                transform: translate(0, 6px);
            }
        }
    }

    .Game_container {
        height: 581px;
        position: relative;
        background: url(/static/jsyl/img/home/bg.jpg) no-repeat center top;

        .Game_centet {
            width: 1200px;
            margin: 0 auto;

            .process {
                height: 179px;
                background: url(/static/jsyl/img/home/process.png) no-repeat center top;
                background-size: cover;
            }

            .subNav {
                width: auto;
                position: relative;

                .subNavWrapper {
                    display: flex;

                    .navItem {
                        width: 240px;
                        height: 87px;
                        position: relative;
                        cursor: pointer;

                        &.download {
                            background: url(/static/jsyl/img/home/mobile.jpg) no-repeat;
                            background-position: center top;
                            background-size: cover;
                            &:hover {
                                background-position: center bottom;
                            }
                        }
                        &.kyChess {
                            background: url(/static/jsyl/img/home/ky_chess.jpg) no-repeat;
                            background-position: center top;
                            &:hover {
                                background-position: center bottom;
                            }
                        }
                        &.casino {
                            background: url(/static/jsyl/img/home/live.jpg) no-repeat;
                            background-position: center top;
                            &:hover {
                                background-position: center bottom;
                            }
                        }
                        &.lottery {
                            background: url(/static/jsyl/img/home/lottery.jpg) no-repeat;
                            background-position: center top;
                            &:hover {
                                background-position: center bottom;
                            }
                        }
                        &.sport {
                            background: url(/static/jsyl/img/home/sport.jpg) no-repeat;
                            background-position: center top;
                            &:hover {
                                background-position: center bottom;
                            }
                        }
                    }
                    .cc {
                        width: 222px;
                    }
                    .cur {
                        cursor: pointer;

                        #hover_xx {
                            p {
                                background: url(/static/blr/img/kt_03s.png) center no-repeat;
                                width: 144px;
                                height: 39px;
                            }
                        }
                    }
                }

                .Game_xx {
                    ul {
                        li {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        .fig {
            position: absolute;
            top: -8px;
            right: 36px;
        }
    }

    #about {
        padding-bottom: 30px;
        color: #969696;
        font-size: 12px;
        font-family: 'Microsoft YaHei';
        border-top: 1px solid #282828;
        border-bottom: 1px solid #282828;

        .wrapper {
            width: 1016px;
            margin: 0 auto;

            .pic {
                float: right;
                width: 344px;
                height: 143px;
                margin: 12px 0 0 20px;
                background: url(/static/jsyl/img/home/about_img.png) no-repeat center;
            }
            h2 {
                color: #e9d77b;
                font-size: 18px;
                font-weight: normal;
                line-height: 3;

                span {
                    margin-left: 10px;
                    color: #636363;
                }
            }
            p {
                line-height: 2;
            }
        }
    }
}
</style>
