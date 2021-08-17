<template>
    <div class="hty-new-index">
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
        <div class="notice index-notice" :style="{top: 424 +'px'}">
            <div class="w1000" @click="showTextModal()">
                <span> <i></i> 最新公告</span>
                <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="6" onmouseout="this.start()"
                    onmouseover="this.stop()">
                    <a href="javascript:;" v-html="lantern"></a>
                </marquee>
                
            </div>
        </div>
        <div class="wp">
           <div class="first_part">
               <div class="part_left">
                   <span>升级模式</span>
                   <span>账号交易</span>
                   <span>信用借呗</span>
                   <span>合作代理</span>
                   <span>热门活动</span>
               </div>
               <div class="part_middle">
                   <div>
                       <span></span>
                        <span>游戏奖金池</span>
                        <span></span>
                   </div>
                   <div class="super_award">
                        <ul class="award_num">
                            <li :key="i" v-for="(item,i) in superAward">{{item}}</li>
                        </ul>
                    </div>
               </div>
               <div class="part_right">
                   <span>快捷充值</span>
                   <span @click="goCenter">支付宝</span>
                   <span @click="goCenter">微信</span>
                   <span @click="goCenter">银联</span>
                   <span @click="goCenter">快速充值</span>
               </div>
           </div>
           <div class="second_part">
               <div class="game_nav" carousel-slider super-vis="3" super-play="true" super-effect="leftLoop">
                    <span class="arrow prev"><Icon type="chevron-left" color="#FFE371" size="30"></Icon></span>
                    <span class="arrow next"><Icon type="chevron-right" color="#FFE371" size="30"></Icon></span>

                    <div class="mainCell">
                        <div class="tempWarp">
                            <ul id="game_list">
                                <li :key="index" v-for="(item,index) in rollList" :class="[{'active':gameId===item.id},item.class]"
                                    @click.stop.prevent="changeGame(item)">
                                    <div class="gameListText">
                                        <span class="game_name">{{item.name}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
           </div>
           <div class="third_part">
                <div class="gameList">
                    <ul>
                        <li v-for="(item,index) in gameArr" :key="index">
                            <span><img :src="'/static/103qp/img/homeGame/'+item.icon"></span>
                            <span>{{item.name}}</span>
                            <div @click="$loginGame(item)">进入游戏</div>
                        </li>
                    </ul>
                </div>
                <!-- <div class="hotGame">
                    <div class="gameTitle">
                        <span></span>
                        <span>热门彩票</span>
                        <span></span>
                    </div>
                    <div class="caipiaoList">
                        <ul>
                            <li v-for="(item,index) in caipiaoList" :key="index">
                                <span><img :src="item.img"></span>
                                <span>{{item.name}}</span>
                                <div @click="goCaipiao(item)">进入游戏</div>
                            </li>
                        </ul>
                    </div>
                </div> -->
                <div class="bg2">
                    <div class="gameContainer2 ">
                        <div class="title wow fadeInUp" data-wow-delay="0">
                        <h2>全球顶级娱乐平台一应俱全</h2>
                        <p>Top entertainment platforms in the world</p>
                        </div>
                        <div class="index_layer3">
                        <div 
                        class="layer3_box wow" 
                        :class="i===0?'fadeInRight ':'fadeInLeft'"
                        style="visibility: visible;"
                        data-wow-delay="0" 
                        v-for="(item,i) in gameList1" 
                        :key="i">
                            <div class="icon" @click="$router.push(item.link)">
                            <img :src="item.bgImg" alt="bg" class="bg">
                            <img :src="item.img" alt="bg" class="pic">
                            </div>
                            <div class="text">
                            <div class="text_box">
                                <div class="text_Top">
                                <p>{{item.content}}</p>
                                <a class="playBtn" @click="$router.push(item.link)">PLAY</a>
                                </div>
                                <div class="text_Bottom">
                                <ul>
                                    <li v-for="(t,i) in item.games" :key="i">
                                    <a  @click="$router.push(t.link)">
                                        <img :src="t.icon" alt="icon">
                                        <div class="bt">{{t.name}}</div>
                                    </a>
                                    </li>
                                </ul>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="index_layer4">
                        <ul>
                            <li 
                            v-for="(item,i) in gameList2"
                            :key = "i"
                            class="wow fadeInUp" 
                            :data-wow-delay="i===0?'0.6s':i===1?'0.2s':'0.1s'"
                            >
                            <a @click="games(item)">
                                <div class="bg bg6" :style="{'background':'url('+item.bgImg+') no-repeat'}"></div>
                                <div class="pic" :class="'pic'+(i+1)" :style="{'background':'url('+item.img+') no-repeat'}"></div>
                            </a>
                            </li>
                        </ul>
                        </div>
                        
                    </div>
                </div>
           </div>
           <!-- <div class="four_part">
               <div class="agentName">
                    <span>
                        <i></i>
                        代理申请
                    </span>
                </div>
               <div class="agentStep">
                   <div class="step">
                       <div>01</div>
                       <div>
                           <span>联系代理专员</span>
                           <span>联系QQ专员、微信专员、<br>客服代理专线，进行咨询</span>
                       </div>
                       <div style="padding-top:20px"><Icon type="chevron-right" color="#FFE371" size="30"></Icon></div>
                   </div>
                   <div class="step">
                       <div>02</div>
                       <div>
                           <span>申请代理</span>
                           <span>包括两部分：注册代理账号<br>和登入代理账号</span>
                       </div>
                       <div style="padding-top:20px"><Icon type="chevron-right" color="#FFE371" size="30"></Icon></div>
                   </div>
                   <div class="step">
                       <div>03</div>
                       <div>
                           <span>申请专属域名</span>
                           <span>打开 www.net.cn 输入并查<br>询域名是否被注册</span>
                       </div>
                       <div style="position:relative;top:88px;left:-145px;"><Icon type="chevron-down" color="#FFE371" size="30"></Icon></div>
                   </div>
                   <div class="step">
                       <div>06</div>
                       <div>
                           <span>佣金结算</span>
                           <span>0投资，高回报，实时返佣<br>到账号上</span>
                       </div>
                       <div style="padding-top:20px"><Icon type="chevron-left" color="#FFE371" size="30"></Icon></div>
                   </div>
                   <div class="step">
                       <div>05</div>
                       <div>
                           <span>代理推广</span>
                           <span>推广方式比如：微信、<br>QQ、微博等等</span>
                       </div>
                       <div style="padding-top:20px"><Icon type="chevron-left" color="#FFE371" size="30"></Icon></div>
                   </div>
                   <div class="step">
                       <div>04</div>
                       <div>
                           <span>分配专属域名</span>
                           <span>分配专属域名成为代理</span>
                       </div>
                   </div>
               </div>
           </div> -->
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
            gameArr:[],
            gameList1: [
                {
                name: "电子游艺",
                text: "SLOT GAMES",
                bgImg: "/static/103qp/img/gameBg4.png",
                img: "/static/103qp/img/game4.png",
                link:"/home/slot?navid=9&id=0",
                content:
                    "全网最全电子游艺，汇聚世界顶级电子游艺平台，画质高清，玩法多样，亿元累计彩池，大奖一触即发！",
                games: [
                    { icon: "/static/103qp/img/LG_MGWBDZ.png", name: "MG电子", link: "/home/slot?navid=9&id=10022" },
                    { icon: "/static/103qp/img/LG_CQ.png", name: "CQ9电子", link: "/home/slot?navid=9&id=10018" },
                    {
                    icon: "/static/103qp/img/LG_JDB_DZ_LHJ.png",
                    name: "JDB电子",
                    link: "/home/slot?navid=9&id=10021",
                    },
                    { icon: "/static/103qp/img/LG_FGDZ.png", name: "FG电子", link: "/home/slot?navid=9&id=10020" },
                    { icon: "/static/103qp/img/LG_AGDZ.png", name: "AG电子", link: "/home/slot?navid=9&id=10015" },
                    {
                    icon: "/static/103qp/img/LG_BBINDZ.png",
                    name: "BBIN电子",
                    link: "/home/slot?navid=9&id=10016",
                    },
                    { icon: "/static/103qp/img/a15.png", name: "MORE", link: "/home/slot?navid=9&id=0" }
                ]
                },
                {
                name: "棋牌游戏",
                text: "CHESS GAMES",
                bgImg: "/static/103qp/img/gameBg5.png",
                img: "/static/103qp/img/game5.png",
                link:"/home/chess?navid=9&id=0",
                content:
                    "全网最全棋牌游戏，汇聚世界顶级棋牌游戏平台，画质高清，玩法多样，亿元累计彩池，大奖一触即发！",
                games: [
                    { icon: "/static/103qp/img/LG_KYQP.png", name: "开元棋牌", link: "/home/chess?navid=9&id=10042" },
                    {
                    icon: "/static/103qp/img/LG_SSOCHESS.png",
                    name: "乐游棋牌",
                    link: "/home/chess?navid=9&id=10612"
                    },
                    {
                    icon: "/static/103qp/img/10694.png",
                    name: "天游棋牌",
                    link: "/home/chess?navid=9&id=10694"
                    },
                    { icon: "/static/103qp/img/LG_FGQP.png", name: "FG棋牌", link: "/home/chess?navid=9&id=10732" },
                    { icon: "/static/103qp/img/LG_VG.png", name: "VG棋牌", link: "/home/chess?navid=9&id=10041" },
                    {
                    icon: "/static/103qp/img/LG_ZILLIONAIRE.png",
                    name: "大富翁棋牌",
                    link: "/home/chess?navid=9&id=11759"
                    },
                    { icon: "/static/103qp/img/a15.png", name: "MORE", link: "/home/chess?navid=9&id=0" }
                ]
                }
            ],
            gameList2:[
                {
                name: "捕鱼游戏",
                text: "FISHNG",
                bgImg: "/static/103qp/img/bg5.png",
                img: "/static/103qp/img/pic11.png",
                link:"/home/fish?navid=9&id=0",
                },
                {
                name: "体育赛事",
                text: "SPORTS",
                bgImg: "/static/103qp/img/bg3.png",
                img: "/static/103qp/img/pic9.png",
                link:"/home/live",
                },
                {
                name: "彩票游戏",
                text: "LOTTERY",
                bgImg: "/static/103qp/img/bg4.png",
                img: "/static/103qp/img/pic10.png",
                link:"#/plays/hall"
                }
            ],
            rollList: [
                {
                    name: '开元棋牌',
                    id: '10042',
                    class: 'ky',
                    img: '/static/103qp/img/gamelist/navicon/ky.png',
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
                        { id: '10689', icon: '10689.png', name: '万人炸金花' },
                        { id: '11378', icon: '11378.png', name: '红包捕鱼' },
                        { id: '256', icon: '256.png', name: '十三水' },
                    ]
                },
                {
                    name: '乐游棋牌',
                    id: '10694',
                    class: 'ly',
                    img: '/static/103qp/img/gamelist/navicon/ly.png',
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
                        { id: '10622', icon: '10622.png', name: '极速炸金花' },
                        { id: '11386', icon: '11386.png', name: '财神到' },
                        { id: '11389', icon: '11389.png', name: '金鲨银鲨' },
                    ]
                },
                {
                    name: 'PG电子',
                    id: '11320',
                    class: 'pg',
                    img: '/static/103qp/img/gamelist/navicon/pg.png',
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
                        { id: '11327', icon: '11327.png', name: '摇钱树' },
                        { id: '11354', icon: '11354.png', name: '摸金校尉' },
                        { id: '11329', icon: '11329.png', name: '美杜莎' }
                    ]
                },
                {
                    name: 'AG电子',
                    id: '10015',
                    class: 'ag',
                    img: '/static/103qp/img/gamelist/navicon/ag.png',
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
                        { id: '270', icon: '270.png', name: '武财神' },
                        { id: '10080', icon: '10080.png', name: '黑红梅方' },
                        { id: '10079', icon: '10079.png', name: '斗三公' },
                    ]
                },
                {
                    name: 'BBIN老虎机',
                    id: '10016',
                    class: 'bbin',
                    img: '/static/103qp/img/gamelist/navicon/bbin.png',
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
                        { id: '3470', icon: '3470.png', name: 'FIFA2010' },
                        { id: '3486', icon: '3486.png', name: '斗魂' },
                        { id: '3475', icon: '3475.png', name: '功夫龙' },
                    ]
                },
                {
                    name: 'CQ9电子',
                    id: '10018',
                    class: 'cq9',
                    img: '/static/103qp/img/gamelist/navicon/cq9.png',
                    list: [
                        
                        { id: '2641', icon: '2641.png', name: '世界杯球鞋' },
                        { id: '2642', icon: '2642.png', name: '足球寶貝' },
                        { id: '2698', icon: '2698.png', name: '金玉满堂' },
                        { id: '2644', icon: '2644.png', name: '世界杯全明星' },
                        { id: '10795', icon: '10795.png', name: '东方神起' },
                        { id: '2646', icon: '2646.png', name: '跳高高' },
                        { id: '2647', icon: '2647.png', name: '聚宝盆JP' },
                        { id: '2648', icon: '2648.png', name: '赚金蛋JP' },
                        { id: '2649', icon: '2649.png', name: '五福临门JP' },
                        { id: '2674', icon: '2674.png', name: '宙斯' },
                        { id: '2680', icon: '2680.png', name: '水世界' },
                        { id: '10818', icon: '10818.png', name: '火神' },
                    ]
                },
                {
                    name: 'DT老虎机',
                    id: '10019',
                    class: 'dt',
                    img: '/static/103qp/img/gamelist/navicon/dt.png',
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
                        { id: '3182', icon: '3182.png', name: '深夜食堂' },
                        { id: '89', icon: '89.png', name: '心动女主播' },
                        { id: '10955', icon: '10955.png', name: '老子是皇帝' },
                    ]
                },
                {
                    name: 'FG老虎机',
                    id: '10020',
                    class: 'fg',
                    img: '/static/103qp/img/gamelist/navicon/fg.png',
                    list: [
                        { id: '2555', icon: '2555.png', name: '抢红包' },
                        { id: '2567', icon: '2567.png', name: '招财进宝' },
                        { id: '2569', icon: '2569.png', name: '恭贺新春' },
                        { id: '2578', icon: '2578.png', name: '西游' },
                        { id: '2621', icon: '2621.png', name: '湛蓝深海' },
                        { id: '10987', icon: '10987.png', name: '金瓶梅' },
                        { id: '10994', icon: '10994.png', name: '钻石之恋' },
                        { id: '11010', icon: '11010.png', name: '百变猴子' },
                        { id: '11014', icon: '11014.png', name: '发发发' },
                        { id: '11044', icon: '11044.png', name: '疯狂7' },
                        { id: '11016', icon: '11016.png', name: '捕鸟达人' },
                        { id: '2634', icon: '2634.png', name: '奔驰宝马' },
                    ]
                },
                
                {
                    name: 'JDB电子',
                    id: '10021',
                    class: 'jdb',
                    img: '/static/103qp/img/gamelist/navicon/jdb.png',
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
                        { id: '181', icon: '181.jpg', name: '超激发水果盘' },
                        { id: '11739', icon: '11739.png', name: '五龙捕鱼' },
                        { id: '172', icon: '172.jpg', name: '赌王扑克' },
                    ]
                },
                {
                    name: 'MG老虎机',
                    id: '10022',
                    class: 'mg',
                    img: '/static/103qp/img/gamelist/navicon/mg.png',
                    list: [
                        { id: '10117', icon: '1881.png', name: '108好汉' },
                        { id: '10118', icon: '2049.png', name: '逐鹿三国' },
                        { id: '10119', icon: '1867.png', name: '侠盗猎车手' },
                        { id: '10121', icon: '1913.png', name: '冒险丛林(HD)' },
                        { id: '10122', icon: '1877.png', name: '大航海时代' },
                        { id: '10123', icon: '1921.png', name: '城市猎人' },
                        { id: '10124', icon: '1892.png', name: '阿拉斯加垂钓' },
                        { id: '10126', icon: '2093.png', name: '北极特务' },
                        { id: '10127', icon: '2072.png', name: '北极祕宝' },
                        { id: '10128', icon: '1982.png', name: '爱丽娜' },
                        { id: '1862', icon: '1862.png', name: '青龙出海' },
                        { id: '1917', icon: '1917.png', name: '暑假时光' },
                    ]
                },
                
                {
                    name: 'MW电子',
                    id: '10023',
                    class: 'mw',
                    img: '/static/103qp/img/gamelist/navicon/mw.png',
                    list: [
                        { id: '152', icon: '152.jpg', name: '百乐牛牛' },
                        { id: '153', icon: '153.jpg', name: '超级斗地主"' },
                        { id: '154', icon: '154.png', name: '水浒英雄' },
                        { id: '155', icon: '155.png', name: '森林舞会' },
                        { id: '156', icon: '156.png', name: '水浒传' },
                        { id: '157', icon: '157.jpg', name: '魔豆' },
                        { id: '158', icon: '158.png', name: '黄金777' },
                        { id: '159', icon: '159.jpg', name: 'HUGA' },
                        { id: '160', icon: '160.png', name: '好运5扑克' },
                        { id: '161', icon: '161.png', name: '经典水果机' },
                        { id: '11117', icon: '11117.png', name: '鱼鱼鱼' },
                        { id: '165', icon: '165.jpg', name: '太极' },
                    ]
                },
                {
                    name: 'PT老虎机',
                    id: '10024',
                    class: 'pt',
                    img: '/static/103qp/img/gamelist/navicon/pt.png',
                    list: [
                        { id: '11443', icon: '11443.png', name: '3个小丑刮刮乐' },
                        { id: '11444', icon: '11444.png', name: '八宝一后' },
                        { id: '11445', icon: '11445.png', name: '一夜奇遇' },
                        { id: '11446', icon: '11446.png', name: '仙境冒险' },
                        { id: '11447', icon: '11447.png', name: '神的时代' },
                        { id: '11461', icon: '11461.png', name: '野牛闪电战' },
                        { id: '11530', icon: '11530.png', name: '智慧女神' },
                        { id: '11450', icon: '11450.png', name: '奥林匹斯之国王' },
                        { id: '11451', icon: '11451.png', name: '奥林匹斯之王子' },
                        { id: '11452', icon: '11452.png', name: '弓兵|弓箭手' },
                        { id: '11524', icon: '11524.png', name: '印家大奖' },
                        { id: '11635', icon: '11635.png', name: '虎爪' },
                        
                    ]
                },
                
                
            ],
            caipiaoList:[
                {img:"/static/103qp/img/27.png",name:"快速快3",id:27},
                {img:"/static/103qp/img/10045.png",name:"快乐飞艇",id:10045},
                {img:"/static/103qp/img/18.png",name:"快速六合彩",id:18},
                {img:"/static/103qp/img/16.png",name:"快速时时彩",id:16},
                {img:"/static/103qp/img/12.png",name:"快速赛车",id:12},
                {img:"/static/103qp/img/3630.png",name:"幸运赛车",id:3630},
                {img:"/static/103qp/img/3631.png",name:"3分快3",id:3631},
                {img:"/static/103qp/img/17.png",name:"3分时时彩",id:17},
                {img:"/static/103qp/img/10044.png",name:"香港赛马",id:10044},
                {img:"/static/103qp/img/7.png",name:"广东11选5",id:7},
                {img:"/static/103qp/img/9.png",name:"江苏快3",id:9},
                {img:"/static/103qp/img/13.png",name:"快乐赛车",id:13},
            ],
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
            
            
            idlist: [],
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
            carouselData: [
                // {img:"/static/103qp/img/home/banner7.jpg"},
                // {img:"/static/103qp/img/home/banner8.jpg"},
                // {img:"/static/103qp/img/home/banner3.jpg"},
                // {img:"/static/103qp/img/home/banner4.jpg"},
                // {img:"/static/103qp/img/home/banner5.jpg"},
                // {img:"/static/103qp/img/home/banner6.jpg"},
            ],
            superAward: '2468793618',
            setInter: null,
            lanternData: "",
        };
    },
    methods: {
        games(item){
            if (item.text == 'LOTTERY') {
                window.open(item.link)
            }else{
                this.$router.push(item.link)
            }
        },
        goCenter(num){
            if(localStorage.token){
                this.$goUserCen('recharge',0)
            }else{
                this.$errorAlert('请先登录', 'warn');
            }
        },
        goCaipiao(item){
            if(localStorage.token){
                window.open('#/plays/tradition/'+item.id)
            }else{
                this.$errorAlert('请先登录', 'warn');
            }
        },
        godown(){
            window.open('/static/103qp/html/download/index.html')
        },
        loginGame(item){
            if(item.type)  window.open("#/plays/hall");
            else this.$loginGame(item)
        },
        goHall(){
            window.open('#/plays/hall')
        },
        async clear() {
            this.iptVal = '';
            this.currenttype = '';
            this.currentline = '';
            this.currentTag = '';
            this.pageDatas.page = 1;
        },
         // 点击导航栏
        
        goLink(item){
            if(item.link){this.$router.push(item.link);} 
            else if(item.dowblink){window.open(item.dowblink);} 
            else{
                if(localStorage.token) {this.$goUserCen('recharge',0)}
                else{ this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '请先登录',
                    model: '',
                })} 
            } 
        },
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
                    parseInt(Math.random() * 9) +
                    parseInt(Math.random() * 9);
                _this.superAward = num.split(''); //字符串->数组
            }, 1000);
        },
        goService() {
            let service = JSON.parse(localStorage.config).service;
            if (service) {
              let ser = service.find(item => item.status === 'on')
              if (ser) {
                window.open(ser.url);
              }
            }
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
            //左右布局,右边是超级赢家榜
            if (item) {
                this.gameId = item.id;
                this.gameArr = item.list;
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
            prev.onclick = right;
            next.onclick = left;
            let timer = null;
            timer = setInterval(left, 1500);
            main.onmouseover = function() {
                clearInterval(timer);
            };
            main.onmouseout = function() {
                timer = setInterval(left, 1500);
            };
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
        if (localStorage.config) {
            let config = JSON.parse(localStorage.config);
            this.publicUrl = config.statics;
        }
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
.youhuiActive {
    top: 100px !important;
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
.hty-new-index {

    position: relative;
    min-width: 1200px;
    margin: 0 auto;
    background: url('/static/103qp/img/bg.jpg') center top no-repeat;
    background-color: #3b1a0e;
    background-attachment: fixed;
    width: 100%;
    font-size: 16px;
    .banner-wrap{
        max-width: 1920px;
        min-width: 1200px;
        margin: 0 auto;
        background: #1b1a1a;
    }
    .notice {
        height: 36px;
        line-height: 36px;
        width: 1200px;
        margin: 0 auto;
        background-color: #1c1c1d;
        // background: url(/static/103qp/img/noticebg.png) repeat-x;
    }
    .notice span {
        font-size: 12px;
        padding-left: 30px;
        width: 115px;
        float: left;
        display: block;
        height: 36px;
        line-height: 37px;
        color: #FFE371;
        i{
            display: inline-block;
            background: url('/static/103qp/img/jingling.png') no-repeat;
            width: 25px;
            height: 24px;
            background-position: -146px -139px;
            position: relative;
            top: 8px;
        }
    }
    .notice span i {
        font-style: normal;
    }
    .notice marquee {
        float: right;
        width: 1064px;
        margin-right: 10px;
        color: #fff;
        height: 36px;
        line-height: 36px;
        a{
            color: #fff;
            font-size: 12px;
        }
    }
    .wp {
        width: 1200px;
        margin: 0 auto;
        padding-top: 15px;
        background: #1c1c1d;
        .first_part{
            display: flex;
            justify-content: space-between;
            .part_left,.part_right{
                border-top: 1px solid #323232;
                border-bottom: 1px solid #323232;
                height: 85px;
                span{
                    display: inline-block;
                    height:58px;
                    width: 53px;
                    line-height: 105px;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    margin: 12px 10px;
                    cursor: pointer;
                }
            }
            .part_left{
                span{
                    &:first-child{
                        background: url('/static/103qp/img/jingling.png') no-repeat;
                        background-position: -22px -189px;
                    }
                    &:nth-child(2){
                        background: url('/static/103qp/img/jingling.png') no-repeat;
                        background-position: -78px -195px;
                    }
                    &:nth-child(3){
                        background: url('/static/103qp/img/jingling.png') no-repeat;
                        background-position: -129px -195px;
                    }
                    &:nth-child(4){
                        background: url('/static/103qp/img/jingling.png') no-repeat;
                        background-position: -22px -244px;
                        margin-right: 20px;
                    }
                    &:last-child{
                        width: 30px;
                        height: 83px;
                        background: #FFE371;
                        line-height: 1;
                        color: #000;
                        padding: 22px 10px;
                        margin: 0;
                    }
                }
            }
            .part_middle{
                div{
                    &:first-child{
                        display: flex;
                        justify-content: space-around;
                        span{
                            &:first-child,&:last-child{
                                border-bottom: 1px solid #856f32;
                                display: inline-block;
                                width: 140px;
                                height: 15px;
                            }
                            &:nth-child(2){
                                color: #FFE371;
                                font-size: 26px;
                            }
                        }
                    }
                }
                .super_award {
                    height: 94px;
                    text-align: center;
                    font-size: 28px;
                    line-height: 54px;
                    color: #ffed8d;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    
                    .award_num {
                        flex: 1;
                        height: 61px;
                        font-size: 25px;
                        color: #ffed8d;
                        display: flex;
                        justify-content: space-between;
                        li {
                            flex: 1;
                            box-sizing: border-box;
                            background: url('/static/103qp/img/num_bg.webp') no-repeat center center;
                            background-size: contain;
                            color: #000;
                            width: 45px;
                            height: 42px;
                            font-weight: bold;
                            line-height: 42px;
                        }
                    }
                }
            }
            .part_right{
                span{
                    &:first-child{
                        width: 30px;
                        height: 83px;
                        background: #FFE371;
                        line-height: 1;
                        color: #000;
                        padding: 22px 10px;
                        margin: 0;
                    }
                    &:nth-child(2){
                        background: url('/static/103qp/img/zhifubao.webp') no-repeat;
                        background-position: 9px 6px;
                        margin-left: 20px;
                    }
                    &:nth-child(3){
                        background: url('/static/103qp/img/weixin.webp') no-repeat;
                        background-position: 9px 6px;
                    }
                    &:nth-child(4){
                        background: url('/static/103qp/img/yinlian.webp') no-repeat;
                        background-position: 9px 6px;
                    }
                    &:nth-child(5){
                        background: url('/static/103qp/img/kuaisu.webp') no-repeat;
                        background-position: 9px 6px;
                    }
                }
            }
        }
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
                line-height: 100px;
                text-align: center;
                &.prev {
                    z-index: 999;
                    left: 0;
                    // background-image: url(/static/103qp/img/prev.png);
                    // &:hover {
                    //     background-position: center bottom;
                    //     background-image: url(/static/103qp/img/prev.png);
                    // }
                }
                &.next {
                    right: 0;
                    // background: url(/static/103qp/img/next.png);
                    // &:hover {
                    //     background-position: center bottom;
                    //     background: url(/static/103qp/img/next.png);
                    // }
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
                                background: url(/static/103qp/img/ae.png) no-repeat center center;
                                background-size: contain;
                                height: 30px;
                            }
                            &.ag:before {
                                background: url(/static/103qp/img/ag.png) no-repeat center center;
                                background-size: contain;
                            }
                            &.bbin:before {
                                background: url(/static/103qp/img/bbin.png) no-repeat center center;
                                background-size: contain;
                            }
                            &.cq9:before {
                                background: url(/static/103qp/img/cq9.png) no-repeat center center;
                                background-size: contain;
                            }
                            &.dt:before {
                                background: url(/static/103qp/img/dt.png) no-repeat center center;
                                background-size: contain;
                                height: 34px;
                            }
                            &.fg:before {
                                background: url(/static/103qp/img/fg.png) no-repeat center center;
                                background-size: contain;
                            }
                            &.jdb:before {
                                background: url(/static/103qp/img/jdb.png) no-repeat center center;
                                background-size: contain;
                                height: 30px;
                            }
                            &.mg:before {
                                background: url(/static/103qp/img/mg.png) no-repeat center center;
                                background-size: contain;
                            }
                            &.mw:before {
                                background: url(/static/103qp/img/mw.png) no-repeat center center;
                                background-size: contain;
                            }
                            &.pt:before {
                                background: url(/static/103qp/img/pt.png) no-repeat center center;
                                background-size: contain;
                            }
                            &.ky:before {
                                background: url(/static/103qp/img/ky.png) no-repeat center center;
                                background-size: contain;
                                height: 32px;
                            }
                            &.vg:before {
                                background: url(/static/103qp/img/vg.png) no-repeat center center;
                                background-size: contain;
                                height: 26px;
                            }
                            &.ly:before {
                                background: url(/static/103qp/img/ly.png) no-repeat center center;
                                background-size: contain;
                                height: 32px;
                            }
                            &.pg:before {
                                background: url(/static/103qp/img/pg.png) no-repeat center center;
                                background-size: contain;
                                height: 22px;
                            }
                            &.ttg:before {
                                background: url(/static/103qp/img/ttg.png) no-repeat center center;
                                background-size: contain;
                            }
                            &.ttg:before {
                                background: url(/static/103qp/img/ttg.png) no-repeat center center;
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
        .third_part{
            .gameList{
                padding: 40px;
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        width: 170px;
                        height: 195px;
                        position: relative;
                        margin: 19px 16px 0 0;
                        cursor: pointer;
                        overflow: hidden;
                        transition:all .6s;
                        span{
                            display: block;
                            text-align: center;
                            color: #fff;
                            
                            &:last-child{
                                line-height: 35px;
                            }
                            img{
                                width: 168px;
                                height: 168px;
                                transition:all .7s;
                                padding-bottom: 10px;
                            }
                        }
                        div{
                            position: absolute;
                            display: none;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            color: #ffe371;
                            font-size: 16px;
                            line-height: 195px;
                            text-align: center;
                            background-color: rgba(0,0,0,.6);
                        }
                        &:hover{
                            transform:scale(1.1);
                            transition:all .7s;
                            div{
                                display: block;
                            }
                            
                        }
                    }
                }
            }
            .hotGame{
                .gameTitle{
                    display: flex;
                    span{
                        &:first-child,&:last-child{
                            border-bottom: 1px solid #464646;
                            display: inline-block;
                            width: 528px;
                            height: 22px;
                        }
                        &:nth-child(2){
                            color: #FFE371;
                            font-size: 26px;
                            font-weight: bold;
                            display: inline-block;
                            padding: 0 20px;
                            height: 40px;
                            line-height: 40px;
                        }
                    }
                }
                .caipiaoList{
                    padding: 0 66px 40px 66px;
                    ul{
                        display: flex;
                        flex-wrap: wrap;
                        li{
                            padding: 20px;
                            position: relative;
                            margin: 19px 16px 0 0;
                            cursor: pointer;
                            transition:all .7s;
                            span{
                                display: block;
                                text-align: center;
                                color: #fff;
                                &:last-child{
                                    line-height: 35px;
                                }
                                img{
                                    width: 120px;
                                    margin-bottom: 10px;
                                }
                            }
                            div{
                                position: absolute;
                                display: none;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                color: #ffe371;
                                font-size: 16px;
                                line-height: 195px;
                                text-align: center;
                                background-color: rgba(0,0,0,.6);
                            }
                            &:hover{
                                transform:scale(1.1);
                                transition:all .7s;
                                div{
                                    display: block;
                                }
                            }
                        }
                    }
                }
            }
            .bg2{
                width: 100%;
                background: url('/static/103qp/img/bg_3.png')no-repeat;
                background-size: auto;
            }
            .gameContainer2 {
                width: 1200px;
                margin: 0 auto;
                .title {
                    padding: 35px 0;
                    h2 {
                    text-align: center;
                    font-size: 34px;
                    color: #FFD053;
                    line-height: 34px;
                    padding-bottom: 10px;
                    }
                    p {
                    text-align: center;
                    color: #707574;
                    font-size: 10px;
                    line-height: 12px;
                    // background: url(/static/103qp/img/bg6.png) 50% no-repeat;
                    }
                }
                .index_layer3{
                    display: flex;
                    justify-content: space-between;
                    .layer3_box{
                        width: 590px;
                        border-radius: 24px;
                        .icon{
                            cursor: pointer;
                            width: 100%;
                            height: 200px;
                            position: relative;
                            .bg{
                            width: 100%;
                            height: 100%;
                            }
                            .pic{
                            position: absolute;
                            bottom: 0;
                            right: 44px;
                            -webkit-transition: .5s;
                            -o-transition: .5s;
                            transition: .5s;
                            
                            }
                        }
                        &:hover .icon .pic {
                            -webkit-animation: ab infinite linear 1.5s;
                            animation: ab infinite linear 1.5s;
                        }
                        .text {
                            width: 100%;
                            height: 215px;
                            background: #2C2C2C;
                            border-radius: 0 0 25px 25px;
                            position: relative;
                            z-index: 1;
                            .text_box {
                                width: 560px;
                                margin: 0 auto;
                                .text_Top {
                                    width: 100%;
                                    padding: 20px 0;
                                    border-bottom: 1px solid #414141;
                                    overflow: hidden;
                                    p{
                                    float: left;
                                    line-height: 25px;
                                    color: #fff;
                                    width: 385px;
                                    font-size:12px;
                                    }
                                    a{
                                        width: 155px;
                                        height: 56px;
                                        border-color: #664535;
                                        float: right;
                                        &.playBtn {
                                            display: -ms-flexbox;
                                            display: flex;
                                            -ms-flex-align: center;
                                            align-items: center;
                                            -webkit-box-sizing: border-box;
                                            box-sizing: border-box;
                                            border-radius: 28px;
                                            border-width: 3px;
                                            border-style: solid;
                                            font-size: 20px;
                                            color:#FFD053;
                                            background: url(/static/103qp/img/play.png) 100px no-repeat;
                                            text-indent: 40px;
                                            font-weight: 700;
                                            border: 1px solid #FFD053;
                                        }
                                    }
                                }
                                
                                .text_Bottom {
                                    width: 100%;
                                    ul {
                                        display: flex;
                                        justify-content:space-between;
                                        li {
                                            display: -ms-flexbox;
                                            display: flex;
                                            -ms-flex-pack: center;
                                            justify-content: center;
                                            -ms-flex-direction: column;
                                            flex-direction: column;
                                            height: 100px;
                                            cursor: pointer;
                                            a{
                                                color: #5c5c5c;
                                                text-decoration: none;
                                            }
                                            &:hover{
                                                .bt{
                                                    color:  #FFD053;
                                                }
                                            }
                                            img{
                                                width: 45px;
                                                height: 45px;
                                                margin: 12px 0;
                                            }
                                            .bt {
                                                font-size:12px;
                                                color: #fff;
                                                text-align: center;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .index_layer4{
                    margin-top: 35px;
                    padding-bottom: 25px;
                    ul {
                    display:flex;
                    justify-content: space-between;
                    height: 200px;
                    li {
                        position: relative;
                        width: 385px;
                        height: 200px;
                        cursor: pointer;
                        .bg {
                        width: 100%;
                        height: 100%;
                        }
                        .pic {
                        position: absolute;
                        right: 10px;
                        bottom: 10px;
                        -webkit-transition: .5s;
                        -o-transition: .5s;
                        transition: .5s;
                        }
                        .pic1 {
                        width: 190px;
                        height: 206px;
                        }
                        .pic2 {
                        width: 182px;
                        height: 204px;
                        }
                        .pic3 {
                        width: 222px;
                        height: 200px;
                        }
                        &:hover .pic {
                        -webkit-animation: ab infinite linear 1.5s;
                                animation: ab infinite linear 1.5s;
                        }
                    }
                    }
                }
            
            }
        }
        .second_part{
            border-bottom: 1px solid #464646;
        }
        .four_part{
            display: flex;
            padding: 70px 70px;
            .agentStep{
                display: flex;
                flex-wrap: wrap;
            }
            .agentName{
                height: 190px;
                color: #000;
                font-size: 22px;
                background: #FFE371;
                margin-right: 20px;
                margin-top: 38px;
                padding: 37px 30px;
                span{
                    display: inline-block;
                    width: 27px;
                }
                i{
                    display: inline-block;
                    width: 27px;
                    height: 28px;
                    background: url('/static/103qp/img/jingling.png') no-repeat;
                    background-position: -104px -139px;
                }
            }
            .step{
                display: flex;
                margin: 30px 17px;
                div{
                    &:first-child{
                        width: 68px;
                        height: 68px;
                        background: url('/static/103qp/img/jingling.png') no-repeat;
                        background-position: -15px -119px;
                        color: #b6832d;
                        font-size: 30px;
                        font-weight: bold;
                        text-align: center;
                        line-height: 68px;
                    }
                    &:nth-child(2){
                        width: 195px;
                        padding-top: 10px;
                        span{
                            display: block;
                            color: #fff;
                            font-size: 13px;
                            // height: 30px;
                            // line-height: 30px;
                            padding: 0 10px;
                            &:first-child{
                                color: #FFE371;
                                line-height: 15px;
                            }
                            &:last-child{
                                line-height: 20px;
                            }
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
            bottom: 10px;
            li {
                .radius {
                    width: 12px;
                    height: 12px;
                    background: #fff;
                    margin: 0 2px;
                }
                &.ivu-carousel-active {
                    .radius {
                        background: #fff;
                    }
                }
            }
        }
    }

    .el-carousel {
        width: 100%;
    }

    .w1000 {
        width: 1200px;
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

    .index-slots {
        height: 453px;
        overflow: hidden;
    }
}
@-webkit-keyframes ab {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  25% {
    -webkit-transform: translateY(5px);
            transform: translateY(5px);
  }
  50% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  75% {
    -webkit-transform: translateY(-5px);
            transform: translateY(-5px);
  }
  100% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
  }
}
@keyframes ab {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  25% {
    -webkit-transform: translateY(5px);
            transform: translateY(5px);
  }
  50% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  75% {
    -webkit-transform: translateY(-5px);
            transform: translateY(-5px);
  }
  100% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
  }
}
</style>
