<template>
    <div class="new-index klk-home">
        <!-- <vp-home-header></vp-home-header> -->
        <!-- <vp-nav></vp-nav> -->

        <div class="content_bg">
            <div class="content-main-bg" :class="{night:colorbool}">
                <div class="title">
                    <span><img src="/static/jltx/img/title_left.png" alt=""></span>
                    <span>全球最佳<span>真人视讯、棋牌游戏、捕鱼达人</span>游戏平台</span>
                    <span><img src="/static/jltx/img/title_right.png" alt=""></span>
                </div>
                <p class="smallFont">WORLD'S BEST LIVE-ACTION VIDEO, BOARD GAMES, FISHING GAME PALTFORM</p>
                <div class="gameShow">
                    <div v-for="(item,index) in gameShowList" :key="index">
                        <p><span><img :src="item.icon" ></span><span>{{item.title}}</span></p>
                        <p><img :src="item.img"></p>
                        <p>{{item.qTitle}}</p>
                        <ul>
                            <li v-for="(j,i) in item.gamelist" :key="i">
                                <span  class="gameIcon"><img :src="j.icon"></span><br>
                                <span>{{j.name}}</span>
                                <div class="hoverShow" @click="$loginGame(j)">
                                    <span><img src="/static/jltx/img/to.png" style="position: relative;top: -3px;" alt=""></span>
                                    <br>
                                    <span>开始游戏</span>
                                </div>
                            </li>
                        </ul>
                        <div @click="$router.push(item.link)" class="toGames"><img src="/static/jltx/img/togame.png" alt=""></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content_bg2">
            <div class="main_content">
                <div>
                    <ul>
                        <li v-for="(k,c) in dianList" :key="c" :class="showGameList == c?'active':''" @mouseover="changeGames(c)">
                            <span><img :src="k.icon" ></span>
                            <span>{{k.name}}</br><i>{{k.mark}}</i> </span>
                        </li>
                    </ul>
                </div>
                <div style="height:481px;margin-left: 20px;">
                    <div class="listContainer" v-if="showGameList == 0">
                        <div>
                            <p><span>彩票游戏</span><span>LOTTERY</span></p>
                            <p>提供快速时时彩 快速赛车等各地彩票在线投注 保证公平公开让你快乐游戏</p>
                        </div>
                        <div>
                            <ul>
                                <li v-for="(g,u) in caipiaoList" :key="u" @click="loginGame('c',g)">
                                    <span><img :src="g.icon" ></span>
                                    <span>{{g.name}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="listContainer" v-if="showGameList == 1">
                        <div>
                            <p><span>电子游艺</span><span style="margin-left: -10px;">SLOT GAMES</span></p>
                            <p>全球知名游戏 最佳老虎机投注平台. 上万款游戏,高额奖池无限喷发.</p>
                        </div>
                        <div style="position: relative;left: 11px;height: 485px;margin-top: -10px;">
                            <ul>
                                <li v-for="(g,l) in dzList" :key="l" @click="loginGame('d',g)">
                                    <span style="height:55px;line-height:55px;"><img :src="g.icon" ></span>
                                    <span>{{g.name}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="listContainer" v-if="showGameList == 2">
                        <div>
                            <p><span>体育赛事</span><span>SPORT</span></p>
                            <p>汇集全球顶级经典赛事，欧洲杯 世界杯 篮球 网球 排球 F1赛车等各赛事.</p>
                        </div>
                        <div style="position: relative;left: 10px;height: 481px;">
                            <ul class="tiyu">
                                <li v-for="(g,n) in tyList" :key="n">
                                    <span></span>
                                    <span style="background:none">{{g.name}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="listContainer" v-if="showGameList == 3">
                        <div>
                            <p><span>牛牛游戏</span><span>NIUNIU GAMES</span></p>
                            <p>最权威经典的棋牌博弈，一牛到底斗士觉醒 巅峰对决谁与争锋，抢庄牛牛、通比牛牛、百人牛牛、五人牛牛</p>
                        </div>
                        <div>
                            <ul>
                                <li v-for="(g,m) in niuList" :key="m" @click="loginGame('n',g)">
                                    <span><img :src="g.icon" ></span>
                                    <span>{{g.name}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="btn" @click="toGamepage">
                        <p><img src="/static/jltx/img/bg6.png" ></p>
                    </div>
                    
                </div>
                <div @click="toGamepage" v-if="showGameList == 3">
                    <img src="/static/jltx/img/bg7.png" alt="">
                </div>
                <div @click="toGamepage" style="    margin-top: 11px;margin-left: 15px;" v-if="showGameList == 0">
                    <p><img src="/static/jltx/img/bg8.png" ></p>
                </div>
                <div @click="toGamepage" style="position: relative;top: -40px;left: 20px;" v-if="showGameList == 1">
                    <p><img src="/static/jltx/img/d_logos.png" ></p>
                </div>
                <div @click="toGamepage" style="position: relative;left: 20px;top: -29px;" v-if="showGameList == 2">
                    <p><img src="/static/jltx/img/t_logo.png" ></p>
                </div>
            </div>
            
        </div>
        <div class="content_bg3">
            <div class="main_bg">
                <div>
                    <p><span>方寸之间 从容尽显</span><br><span>业内最顶尖的手机投注APP</span></p>
                    <p class="marks">最顶尖的手机投注APP希望您始终能感受到澳门永利皇宫品牌对专业的执着！在这里，有全网最丰富的视讯、棋牌、捕鱼、电子、彩票、电竞游戏，最贴心的优惠，最卓越的用户体验，全年无休的技术支持，稳定陪伴您畅快游戏，方寸之间，从容尽显，娱乐真的可以信手拈来，财富一键在手。</p>
                    <div>
                        <div>
                            <div class="qr_code">
                                <div class="qr" ref="qr-code"></div>
                            </div>
                            <div>安卓&iOS全部移动设备</div>
                        </div>
                        <div>
                            <span></span>
                            <span>手机无需下载</br>浏览器输入网址即可访问</span>
                        </div>
                    </div>
                </div>
                <div><img src="/static/jltx/img/loadapp.png" alt=""></div>
                
            </div>
        </div>
        <div class="content_bg4">
            <div>
                <span><img src="/static/jltx/img/thirty.png" alt=""></span>
                <span><img src="/static/jltx/img/fivty.png" alt=""></span>
                <span><img src="/static/jltx/img/sixty.png" alt=""></span>
                <span><img src="/static/jltx/img/ninety.png" alt=""></span>
            </div>
            
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store';
import UserService from '@/service/public/UserService.js';
import '@/assets/iconfont/klk/iconfont.css';
import '@/assets/iconfont/public/iconfont.css';
import vpHomeTimer from './timer.vue';
import vpHomeHeader from './header.vue';
import vpNav from './nav.vue';
import vpFooter from './footer';
let indextime;
export default {
    data() {
        return {
            showGameList:0,
            activeIndex:1,
            gameShowList:[
                {
                    icon:'/static/jltx/img/q_logo.png',
                    title:'棋牌游戏',
                    link:'/home/chess?navid=9&id=0',
                    img:'/static/jltx/img/qipai.png',
                    qTitle:'抢庄牛牛龙虎斗，多款棋牌任君选棋牌彰显胸怀，好友相约竞技，游戏改变生活',
                    gamelist:[
                        {icon:'/static/jltx/img/q1.png',name:'抢庄牛牛',id:'245'},
                        {icon:'/static/jltx/img/q2.png',name:'二八杠',id:'245'},
                        {icon:'/static/jltx/img/q3.png',name:'炸金花',id:'10617'},
                        {icon:'/static/jltx/img/q4.png',name:'斗地主',id:'10625'},
                    ]
                },
                {
                    icon:'/static/jltx/img/d_logo.png',
                    title:'真人游戏',
                    link:'/home/live',
                    img:'/static/jltx/img/dianzi.png',
                    qTitle:'全球最佳真人视讯平台，真人荷官在线发牌画面真实高清，给您亲临赌场的真实爽快感受！',
                    gamelist:[
                        {icon:'/static/jltx/img/s1.png',name:'贵宾厅',id:'31'},
                        {icon:'/static/jltx/img/s2.png',name:'大游厅',id:'3180'},
                        {icon:'/static/jltx/img/s3.png',name:'旗舰厅',id:'32'},
                        {icon:'/static/jltx/img/s4.png',name:'视讯厅',id:'34'},
                    ]
                },
                {
                    icon:'/static/jltx/img/b_logo.png',
                    title:'捕鱼游戏',
                    
                    link:'/home/fish?navid=9&id=0',
                    img:'/static/jltx/img/buyu.png',
                    qTitle:'花式捕鱼，多种玩法超乎想象，爽快爆金，大奖连连，收获大奖HIGH翻天！',
                    gamelist:[
                        {icon:'/static/jltx/img/b1.png',name:'财神捕鱼',id:'173'},
                        {icon:'/static/jltx/img/b2.png',name:'五龙捕鱼',id:'11421'},
                        {icon:'/static/jltx/img/b3.png',name:'捕鱼王3D',id:'11729'},
                        {icon:'/static/jltx/img/b4.png',name:'金蟾捕鱼',id:'11667'},
                    ]
                },
            ],
            dianList:[
                {icon:"/static/jltx/img/bg2.png",name:'彩票游戏',mark:"LOTTERY"},
                {icon:"/static/jltx/img/bg3.png",name:'电子游艺',mark:"SLOT GAMES"},
                {icon:"/static/jltx/img/bg4.png",name:'体育赛事',mark:"SPORT"},
                {icon:"/static/jltx/img/bg5.png",name:'牛牛游戏',mark:"NIUNIU GAMES"},
            ],
            niuList:[
                {icon:"/static/jltx/img/n1.png",name:'抢庄牛牛',id:"11887"},
                {icon:"/static/jltx/img/n2.png",name:'看牌抢庄牛牛',id:'10688'},
                {icon:"/static/jltx/img/n3.png",name:'百人牛牛',id:'3605'},
                {icon:"/static/jltx/img/n4.png",name:'看三张抢庄牛牛',id:'10626'},
                {icon:"/static/jltx/img/n5.png",name:'癞子牛牛',id:'11179'},
                {icon:"/static/jltx/img/n6.png",name:'通比牛牛',id:'10701'},
                {icon:"/static/jltx/img/n7.png",name:'百人斗牛',id:'10702'},
                {icon:"/static/jltx/img/n8.png",name:'五人牛牛',id:'11791'},
            ],
            caipiaoList:[
                {icon:"/static/jltx/img/c1.png",name:'快速PK10',id:'12'},
                {icon:"/static/jltx/img/c2.png",name:'幸运赛车',id:'3630'},
                {icon:"/static/jltx/img/c3.png",name:'快速时时彩',id:'16'},
                {icon:"/static/jltx/img/c4.png",name:'快速快三',id:'27'},
                {icon:"/static/jltx/img/c5.png",name:'快乐飞艇',id:'10045'},
                {icon:"/static/jltx/img/c6.png",name:'香港赛马',id:'10044'},
                {icon:"/static/jltx/img/c7.png",name:'三分时时彩',id:'17'},
                {icon:"/static/jltx/img/c8.png",name:'快速六合彩',id:'18'},
                
            ],
            dzList:[
                {icon:"/static/jltx/img/d1.png",name:'MG电子',id:"10022"},
                {icon:"/static/jltx/img/d2.png",name:'JDB电子',id:"10021"},
                {icon:"/static/jltx/img/d3.png",name:'CQ9电子',id:"10018"},
                {icon:"/static/jltx/img/d4.png",name:'AG电子',id:"10015"},
                {icon:"/static/jltx/img/d5.png",name:'PG电子',id:"11320"},
                {icon:"/static/jltx/img/d6.png",name:'BBIN电子',id:"10016"},
                {icon:"/static/jltx/img/d7.png",name:'DT电子',id:"10019"},
                {icon:"/static/jltx/img/d8.png",name:'PT电子',id:"10024"},
            ],
            tyList:[
                {icon:"/static/jltx/img/t1.png",name:'足球',id:'38'},
                {icon:"/static/jltx/img/t2.png",name:'篮球',id:'39'},
                {icon:"/static/jltx/img/t3.png",name:'美式足球',id:'11368'},
                {icon:"/static/jltx/img/t4.png",name:'网球',id:'11752'},
                {icon:"/static/jltx/img/t4.png",name:'排球',id:'11752'},
                {icon:"/static/jltx/img/t4.png",name:'羽毛球',id:'11752'},
            ],
        };
    },
    methods: {
        loginGame(name,g){
            
            if(name=='d'){
                this.$router.push('/home/slot?navid=9&id='+g.id)
            }else if(name == 'n'){
                this.$router.push('/home/chess?navid=3')
            }else{
                let link = "#/plays/tradition/" +g.id
                window.open(link);
            }
            
        },
        changeGames(i){
            this.showGameList = i;
        },
        getIndex(i){
            this.activeIndex = i
        },
        toGamepage(){
            switch (this.showGameList) {
                case 0:
                    window.open("#/plays/hall");
                    break;
                case 1:
                    this.$router.push('/home/slot?navid=9&id=0')
                    break;
                case 2:
                    this.$router.push('/home/tiyu?id=0')
                break;
                case 3:
                    this.$router.push('/home/chess?navid=3')
                break;
            }
        }
    },
    created() {},
    mounted() {
        this.createDownloadQRCode({
            el: this.$refs['qr-code'],
            url: window.location.origin + '/m#/download',
            size: 166
        })
    },
    computed: {
        colorbool() {
            return this.$store.state.mainState.color;
        },
        
    },
    
    components: {
        vpHomeHeader,
        vpNav,
        vpFooter
    },
    store
};
</script>

<style lang="less">
.new-index {
    position: relative;
    width: 100%;
    margin: 0 auto;
    background: #1e1e1e;
    .dating{
        position: relative;
        top: 10px;
    }
    .active{
        background: url('/static/jltx/img/bg1.png') no-repeat!important;
        background-size: 100% 100%!important;
        width: 211px!important;
    }
    .content_bg {
        background-color: #0a0a0a;
        height: 700px;
        padding-top: 40px;
        
        .content-main-bg {
            position: relative;
            background: #0A0A0A;
            width: 1200px;
            margin: 0 auto;
            .title{
                display: flex;
                width: 950px;
                margin: 0 auto;
                span{
                    display: inline-block;
                    text-align: center;
                    line-height: 50px;
                    height: 52px;
                    font-size: 31px;
                    color: #fff;
                    img{
                        vertical-align: middle;
                    }
                    &:nth-child(2){
                        color: #fff;
                        >span{
                            color: #CDAD70;
                            background: linear-gradient(180deg, #D3A453 0%, #FDFA8A 100%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            padding: 0;
                        }
                    }
                    &:last-child{
                        text-align: left;
                        padding-left: 20px;
                    }
                    &:first-child{
                        text-align: right;
                        padding-right: 20px;
                    }
                }
            }
            .smallFont{
                font-size: 14px;
                color: #646464;
                text-align: center;
            }
            .gameShow{
                display: flex;
                width: 1240px;
                margin: 80px 0 0 0;
                position: relative;
                // justify-content: space-around;
                >div{
                    width: 361px;
                    height: 465px;
                    background: url('/static/jltx/img/sl_bg.png') no-repeat;
                    background-size: 100% 100%;
                    margin-right: 35px;
                    position: relative;
                    .toGames{
                        position: absolute;
                        top: 37%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                        display: none;
                        cursor: pointer;
                        width: 321px;
                        border-radius: 10px;
                        height: 232px;
                        line-height: 232px;
                        text-align: center;
                        // background: rgba(0, 0, 0, 0.7);
                        img{
                            vertical-align: middle;
                        }
                    }
                    p{
                        position: relative;
                        
                        color: #1E1E1E;
                        &:first-child{
                            display: flex;
                            width: 286px;
                            span{
                                display: inline-block;
                                width: 90%;
                                text-align: left;
                                font-size: 22px;
                                line-height: 46px;
                                img{
                                    vertical-align: middle;
                                }
                                &:first-child{
                                    text-align: right;
                                }
                                &:last-child{
                                    padding-left: 15px;
                                }
                            }
                        }
                        &:nth-child(2){
                            width: 321px;
                            margin: 10px auto;
                            img{
                                width: 320px;
                                height: 231px;
                            }
                        }
                        &:nth-child(3){
                            width: 321px;
                            height: 40px;
                            background: url('/static/jltx/img/band_bg.png') no-repeat;
                            background-size: 100% 100%; 
                            line-height: 20px; 
                            color: #fff;
                            text-align: center;
                            font-size: 13px;
                            padding: 0 25px 0 25px;
                            margin: 24px 15px 10px 15px;
                        }
                    }
                    ul{
                        display: flex;
                        width: 321px;
                        margin: 0px auto;
                        li{
                            width: 25%;
                            height: 64px;
                            position: relative;
                            cursor: pointer;
                            .hoverShow{
                                position: absolute;
                                bottom: 0px;
                                left: 8px;
                                width: 64px;
                                height: 64px;
                                background: url('/static/jltx/img/o_bg.png');
                                display: none;
                                // transition:width .4s;
                                // -moz-transition:height .4s; /* Firefox 4 */
                                // -webkit-transition:height .4s; /* Safari and Chrome */
                                // -o-transition:height .4s; /* Opera */
                                cursor: pointer;
                                overflow: hidden;
                            }
                            span{
                                height: 30px;
                                width: 100%;
                                font-size: 13px;
                                line-height: 35px;
                                text-align: center;
                                display: inline-block;
                                cursor: pointer;
                                color: #fff;
                                &:first-child{
                                    height: 63px;
                                    width:100%;
                                    line-height: 60px;
                                }
                               &:last-child{
                                   position: relative;
                                    top: -35px;
                                    font-size: 10px;
                                    color: #FFDA81;
                               } 
                            }
                            &:hover{
                                .hoverShow{
                                    display:block;
                                }
                                span{
                                    color: #FFDA81;
                                }
                                
                            }
                        }
                        
                    }
                    &:first-child{
                        .toGames{
                            background: url('/static/jltx/img/q_shadow.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        p{
                            span{
                                img{
                                    width: 33px;
                                    height: 23px;
                                }
                            }
                        }
                        
                    }
                    &:nth-child(2){
                        width: 400px;
                        height: 500px;
                        margin-top: -33px;
                        background: url('/static/jltx/img/sl_bg_1.png') no-repeat;
                        background-size: 100% 100%;
                        .toGames{
                            position: absolute;
                            top: 38%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            display: none;
                            cursor: pointer;
                            width: 361px;
                            border-radius: 10px;
                            height: 262px;
                            line-height: 262px;
                            text-align: center;
                            background: url('/static/jltx/img/shadou.png') no-repeat;
                            background-size: 100% 100%;
                            img{
                                vertical-align: middle;
                            }
                        }
                        p{
                            &:first-child{
                                display: flex;
                                width: 335px;
                                span{
                                    display: inline-block;
                                    width: 90%;
                                    text-align: left;
                                    font-size: 22px;
                                    line-height: 46px;
                                    img{
                                        vertical-align: middle;
                                    }
                                    &:first-child{
                                        text-align: right;
                                    }
                                    &:last-child{
                                        padding-left: 15px;
                                        padding-top: 3px;
                                    }
                                }
                            }
                            &:nth-child(2){
                                width: 360px;
                                margin: 10px auto;
                                img{
                                    width: 360px;
                                    height: 260px;
                                }
                            }
                            &:nth-child(3){
                                width: 355px;
                                height: 40px;
                                background: url('/static/jltx/img/band_bg.png') no-repeat;
                                background-size: 100% 100%; 
                                line-height: 20px; 
                                color: #fff;
                                text-align: center;
                                font-size: 13px;
                                padding: 0 25px 0 25px;
                                margin: 24px 15px 10px 22px;
                            }
                            
                        }
                        ul{
                            display: flex;
                            width: 355px;
                            margin: 0px auto;
                            li{
                                width: 25%;
                                height: 64px;
                                position: relative;
                                cursor: pointer;
                                .gameIcon{
                                    position: relative;
                                    top: 10px;
                                }
                                .hoverShow{
                                    position: absolute;
                                    bottom: 0px;
                                    left: 8px;
                                    width: 64px;
                                    height: 0px;
                                    background: url('/static/jltx/img/o_bg.png');
                                    transition:width .4s;
                                    -moz-transition:height .4s; /* Firefox 4 */
                                    -webkit-transition:height .4s; /* Safari and Chrome */
                                    -o-transition:height .4s; /* Opera */
                                    cursor: pointer;
                                    overflow: hidden;
                                }
                                span{
                                    height: 30px;
                                    width: 100%;
                                    font-size: 13px;
                                    line-height: 35px;
                                    text-align: center;
                                    display: inline-block;
                                    cursor: pointer;
                                    color: #fff;
                                    &:first-child{
                                        height: 63px;
                                        width:100%;
                                        line-height: 60px;
                                    }
                                &:last-child{
                                    position: relative;
                                        top: -35px;
                                        font-size: 10px;
                                        color: #FFDA81;
                                } 
                                }
                                &:hover{
                                    .hoverShow{
                                        height: 64px;
                                        
                                    }
                                    span{
                                        color: #FFDA81;
                                    }
                                    
                                }
                            }
                            
                        }
                        p{
                            span{
                                
                                img{
                                    width: 31px;
                                    height: 31px;
                                }
                            }
                        }
                        &:hover{
                            background: url('/static/jltx/img/lll.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        
                    }
                    &:last-child{
                        .toGames{
                            background: url('/static/jltx/img/b_shadow.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        p{
                            span{
                                img{
                                    width: 25px;
                                    height: 21px;
                                }
                            }
                        }
                       
                    }
                    &:hover{
                        background: url('/static/jltx/img/lll_1.png') no-repeat;
                        background-size: 100% 100%;
                        .toGames{
                            display: block;
                        }
                    }
                        
                }

            }
        }
        .night {
            background: url(/static/jltx/img/index-main-bg-n.jpg) no-repeat center top;
            background-size: 100% 100%;
        }
    }
    .content_bg2{
        height: 580px;
        width: 100%;
        background: #000000;
        padding-top: 55px;
        .main_content{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            >div{
                .btn{
                    position: absolute;
                    bottom: 15px;
                    left:25px;
                    cursor: pointer;
                }
                &:first-child{
                    width: 221px;
                    ul{
                        li{
                            width: 200px;
                            height: 85px;
                            background: url('/static/jltx/img/bg1-1.png') no-repeat;
                            background-size: 100% 100%;
                            display: flex;
                            margin-top: 31px;
                            cursor: pointer;
                            span{
                                display: inline-block;
                                height: 100%;
                                &:first-child{
                                    line-height: 81px;
                                    width: 87px;
                                    text-align: center;
                                    img{
                                        vertical-align: middle;
                                    }
                                }       
                                &:last-child{
                                    font-size: 22px;
                                    color: #fff;
                                    padding-top: 23px;
                                    i{
                                        font-size: 12px;
                                        color: #636363;
                                    }
                                }
                            }
                            &:hover{
                                background: url('/static/jltx/img/bg1.png') no-repeat;
                                background-size: 100% 100%;
                                width: 211px;
                            }
                        }
                    }
                }
                &:nth-child(2){
                    width: 446px;
                    padding-top: 60px;
                    position: relative;
                    .listContainer{
                        div{
                            &:first-child{
                                padding-left: 26px;
                                p{
                                    color: #8E8E8E;
                                    font-size: 16px;
                                    &:first-child{
                                        margin-bottom: 22px;
                                        span{
                                            color: #747474;
                                            font-size: 24px;
                                            &:first-child{
                                                font-size: 52px;
                                                font-family: FZLanTingHei-B-GBK;
                                                font-weight: 600;
                                                color: #FBDD7E;
                                                margin-right: 20px;
                                                line-height: 23px;
                                                background: linear-gradient(0deg, #D3A554 0%, #FCF988 100%);
                                                -webkit-background-clip: text;
                                                -webkit-text-fill-color: transparent;
                                            }
                                        }
                                    }
                                    &:nth-child(2){
                                        margin-bottom: 28px;
                                        line-height: 28px;
                                    }
                                }
                            }
                            &:nth-child(2){
                                width: 395px;
                                .tiyu{
                                    width: 300px;
                                    margin-left: 15px;
                                    li{
                                        width: 100px;
                                        margin-bottom: 10px;
                                        span{
                                            display: block;
                                            width: 60px;
                                            height: 60px;
                                            
                                            text-align: center;
                                            color: #fff;
                                            font-size: 13px;
                                            
                                            &:last-child{
                                                height: 30px;
                                                line-height: 34px;
                                            }
                                            &:hover:first-child{
                                                -webkit-transform:rotate(180deg);
                                                transform:rotate(360deg);
                                                -webkit-transition:-webkit-transform .2s linear;
                                                transition:transform .2s linear;
                                            }
                                        }
                                        &:first-child{
                                            span{
                                                background: url('/static/jltx/img/ty1.png') no-repeat;
                                                // background-position-y: 2px;
                                            }
                                        }
                                        &:nth-child(2){
                                            span{
                                                background: url('/static/jltx/img/ty1.png') no-repeat;
                                                background-position-x: -97px;
                                            }
                                        }
                                        &:nth-child(3){
                                            span{
                                                background: url('/static/jltx/img/ty1.png') no-repeat;
                                                background-position-x: -206px;
                                            }
                                        }
                                        &:nth-child(4){
                                            span{
                                                background: url('/static/jltx/img/ty2.png') no-repeat;
                                            }
                                        }
                                        &:nth-child(5){
                                            span{
                                                background: url('/static/jltx/img/ty2.png') no-repeat;
                                                    background-position: -97px 4px;
                                            }
                                        }
                                        &:nth-child(6){
                                            span{
                                                background: url('/static/jltx/img/ty2.png') no-repeat;
                                                background-position: -205px 4px;
                                            }
                                        }
                                    }
                                    
                                    
                                }
                                ul{
                                    display: flex;
                                    flex-wrap: wrap;
                                    li{
                                        width: 25%;
                                        cursor: pointer;
                                        span{
                                            display: block;
                                            width: 100%;
                                            text-align: center;
                                            color: #fff;
                                            font-size: 13px;
                                            img{
                                                vertical-align: middle;
                                            }
                                            &:last-child{
                                                height: 30px;
                                                line-height: 34px;
                                            }
                                        }
                                        &:hover{
                                            img{
                                                -webkit-transform:rotate(180deg);
                                                transform:rotate(360deg);
                                                -webkit-transition:-webkit-transform .2s linear;
                                                transition:transform .2s linear;
                                            }
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                }
                &:last-child{
                    display: flex;
                    justify-content: space-around;
                }
            }
        }
        
    }
    .content_bg3{
        height: 628px;
        background: #0A0A0A;
        padding-top: 50px;
        border-top: 1px solid #1E1E1E;
        .main_bg{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            >div{
                .marks{
                    color: #A9A9A9;
                    font-size: 15px;
                    line-height: 30px;
                    margin-top: 20px;
                }
                &:first-child{
                    width: 510px;
                    >p{
                        &:first-child{
                            span{
                                display: block;
                                color: #fff;
                                font-size: 25px;
                                text-align: center;
                                margin-top: 5px;
                                &:first-child{
                                    margin-top: 0;
                                    font-size: 46px;
                                    font-family: Microsoft YaHei;
                                    font-weight: bold;
                                    color: #4B9BF2;
                                    background: linear-gradient(180deg, #D3A353 0%, #FDFB8A 100%);
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                }
                                
                            }
                        }
                    }
                    >div{
                        display: flex;
                        margin: 30px auto;
                        >div{
                            &:first-child{
                                text-align: center;
                                margin-left: 45px;
                                >div:first-child{
                                    width: 182px;
                                    height: 182px;
                                    background: url('/static/jltx/img/codeBorder.png') no-repeat;
                                    background-size: 100% 100%;
                                    margin-left: 14px;
                                    padding: 5px;
                                    .qr{
                                        width: 172px;
                                        height: 172px;
                                        background-color: #fff;
                                        padding: 3px;
                                    }
                                    // img{
                                    //     margin: 0px 0 0 6px;
                                    // }
                                }
                                >div:last-child{
                                    font-size: 16px;
                                    color: #E1C266;
                                    width: 209px;
                                    text-align: center;
                                    height: 39px;
                                    line-height: 39px;
                                    background: url('/static/jltx/img/btn_bg2.png') no-repeat;
                                    background-size: 100% 100%;
                                    margin-top: 29px;
                                }
                            }
                            &:last-child{
                                width: 180px;
                                margin-left: 55px;
                                span{
                                    display: block;
                                    color: #FFFFFF;
                                    font-size: 15px;
                                    text-align: center;
                                    line-height: 25px;
                                    &:first-child{
                                        width: 103px;
                                        height: 150px;
                                        background: url('/static/jltx/img/h5.png') no-repeat;
                                        background-size: 100% 100%;
                                        margin-left: 38px;
                                        margin-top: 17px;
                                    }
                                    &:last-child{
                                        margin-top: 37px;
                                    }
                                }
                            }
                        }
                        
                    }
                }
                &:last-child{
                    width: 577px;
                }
            }
        }
    }
    .content_bg4{
        width: 100%;
        background: #0A0A0A;
        padding-bottom: 53px;
        padding-top: 30px;
        div{
            width: 1295px;
            height: 115px;
            margin: 0 auto;
            display: flex;
            background: url('/static/jltx/img/f_list.png') no-repeat;
            background-size: 100% 100%;
            // padding: 38px;
            span{
                display: inline-block;
                margin: 35px 38px 38px 38px;
                img{
                    vertical-align: middle;
                }
            }
        }
    }
}


</style>
