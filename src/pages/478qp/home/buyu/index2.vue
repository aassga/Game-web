 <template>
    <div class="fishContainer">
        <vp-home-header></vp-home-header>
        <vp-nav></vp-nav>
        <section class="banner-cpyx">
            <vp-header-pic :headerImg="headBg"></vp-header-pic>
        </section>

        <!-- 公告跑马灯 -->
        <div class="notice">
            <div class="w1000" @click="showTextModal()">
                <span>最新公告</span>
                <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()"
                    onmouseover="this.stop()">
                    <a href="javascript:;" v-html="lantern"></a>
                </marquee>
            </div>
        </div>

        <div class="buyu-wrap">
            <div class="live">
                <dl class="js-list-items list-item">
                    <dd v-for="(item,index) in buyudata" :key="index" @click="changgeme(item,index)"
                        :class="[{active:item.id==gameIndex&& gameIndex!=0},{firstdd:item.id==0 && gameIndex==0},{firstdd1:item.id==0}]">
                        <div :class="item.class" class="topimg"></div>
                        <br />
                        {{item.name}}
                    </dd>
                </dl>
                <div class="live_content" :class="{night:colorbool}">
                    <ul class="home-list-wrap">
                        <li :key="index" v-for="(item,index) in showLiveDawta" href="javascript:void(0)"
                            :class="[item.class,'home-list-item']">
                            <div class="left_cont">
                                <div class="left_logo">
                                    <img :src="item.logoSrc" alt />
                                </div>
                                <p class="title">{{item.name}}</p>
                            </div>
                            <img :src="item.rightImgSrc" :class="['right_img',!isdong? '':'right_img_a']" alt />
                            <div class="mark-box">
                                <div :class="clicked? 'qr-code-container':''">
                                    <div class="client-down">
                                        <p>苹果客户端下载</p>
                                    </div>
                                    <div class="client-down">
                                        <p>安卓客户端下载</p>
                                    </div>
                                </div>
                                <div class="join-game-btn js-join-game-btn" data-type="aglive" @click="trustLogin(item)" v-if="item.id">
                                    <a href="javascript:;"></a>
                                </div>
                            </div>
                        </li>
                        <li href="javascript:void(0)" class="home-list-item more"></li>
                    </ul>
                </div>
            </div>
        </div>

        <vpFooter></vpFooter>
    </div>

</template>
<script>
import { _SetGet, _SetPost } from '@/service/public/service.js';
import vpHeaderPic from '../headerPic';
import mixin from '../../../public/games/public.js';
import vpHomeHeader from '../header.vue';
import vpNav from '../nav.vue';
import vpFooter from '../footer';

export default {
    mixins: [mixin],
    data() {
        return {
            headBg: '/static/478qp/img/buyu/fish.jpg',
            lantern: '',
            params: '',
            clicked: true,
            key: '',
            gameIndex: 0,
            isdong: false,
            liveDatas: [
                {
                    platform: 'AG_GAME',
                    gameName: '548',
                    name: 'AG捕鱼',
                    text: '支持设备:web/h5/手机客户端',
                    logoSrc: '/static/478qp/img/buyu/bulogo_01.png',
                    rightImgSrc: '/static/478qp/img/buyu/buyu_01.png',
                    type: 'AG',
                    class: 'aa',
                    id: 265
                },
                {
                    platform: 'FG_GAME',
                    gameName: 'fish_mm',
                    text: '支持设备:web/h5/手机客户端',
                    logoSrc: '/static/478qp/img/buyu/bulogo_02.png',
                    rightImgSrc: '/static/478qp/img/buyu/buyu_02.png',
                    name: 'FG美人捕鱼',
                    type: 'FG',
                    class: 'ab',
                    id: 2576
                },

                {
                    platform: 'FG_GAME',
                    gameName: 'fish_hl',
                    text: '支持设备:web/h5/手机客户端',
                    logoSrc: '/static/478qp/img/buyu/bulogo_03.png',
                    rightImgSrc: '/static/478qp/img/buyu/buyu_03.png',
                    name: 'FG欢乐捕鱼',
                    type: 'FG',
                    class: 'ac',
                    id: 2626
                },

                {
                    platform: 'JDB_GAME',
                    gameName: '7#7002',
                    text: '支持设备:web/h5/手机客户端',
                    logoSrc: '/static/478qp/img/buyu/bulogo_04.png',
                    rightImgSrc: '/static/478qp/img/buyu/buyu_04.png',
                    name: 'FG天天捕鱼',
                    type: 'FG',
                    class: 'ad',
                    id: 2628
                },

                {
                    platform: 'CQ9_GAME',
                    gameName: 'AB3',
                    text: '支持设备:web/h5/手机客户端',
                    logoSrc: '/static/478qp/img/buyu/bulogo_05.png',
                    rightImgSrc: '/static/478qp/img/buyu/buyu_05.png',
                    name: 'MW千炮捕鱼',
                    type: 'MW',
                    class: 'af',
                    id: 151
                },

                {
                    platform: 'PT_GAME',
                    gameName: 'cashfi',
                    text: '支持设备:web/h5/手机客户端',
                    logoSrc: '/static/478qp/img/buyu/bulogo_06.png',
                    rightImgSrc: '/static/478qp/img/buyu/buyu_06.png',
                    name: 'JDB龙王捕鱼',
                    type: 'JDB',
                    class: 'ag',
                    id: 174
                },
                {
                    platform: 'JDB_GAME',
                    gameName: '7#7003',
                    logoSrc: '/static/478qp/img/buyu/bulogo_06.png',
                    rightImgSrc: '/static/478qp/img/buyu/buyu_07.png',
                    name: 'JDB龙王捕鱼2',
                    text: '支持设备:web/h5/手机客户端',
                    type: 'JDB',
                    class: 'ah',
                    id: 175
                },
                {
                    platform: 'JDB_GAME',
                    gameName: '7#7003',
                    logoSrc: '/static/478qp/img/buyu/bulogo_08.png',
                    rightImgSrc: '/static/478qp/img/buyu/buyu_08.png',
                    name: 'JDB财神捕鱼',
                    text: '支持设备:web/h5/手机客户端',
                    type: 'JDB',
                    class: 'ba',
                    id: 173
                },
                {
                    platform: 'JDB_GAME',
                    gameName: '7#7003',
                    logoSrc: '/static/478qp/img/buyu/bulogo_cq9.png',
                    rightImgSrc: '/static/478qp/img/buyu/buyu_09.png',
                    name: 'CQ9皇金渔场',
                    text: '支持设备:web/h5/手机客户端',
                    type: 'CQ9',
                    class: 'bb',
                    id: 2639
                },
                {
                    platform: 'JDB_GAME',
                    gameName: '7#7003',
                    logoSrc: '/static/478qp/img/buyu/bulogo_10.png',
                    rightImgSrc: '/static/478qp/img/buyu/buyu_10.png',
                    name: 'PT深海大赢家',
                    text: '支持设备:web/h5/手机客户端',
                    type: 'PT',
                    class: 'pt',
                    id: 3296
                },
                {
                    platform: 'JDB_GAME',
                    gameName: '7#7003',
                    logoSrc: '/static/478qp/img/buyu/bulogo_11.png',
                    rightImgSrc: '/static/478qp/img/buyu/buyu_11.png',
                    name: 'BG捕鱼大师',
                    text: '支持设备:web/h5/手机客户端',
                    type: 'BG',
                    class: 'bg',
                    id: 3602
                }
            ],
            buyudata: [
                {
                    id: 0,
                    name: '',
                    class: ''
                },
                {
                    id: 1,
                    name: 'AG捕鱼',
                    class: 'ag',
                    img: '/static/478qp/img/buyu/ag.png'
                },
                {
                    id: 2,
                    name: 'FG捕鱼',
                    class: 'fg',
                    img: '/static/478qp/img/buyu/fg.png'
                },
                {
                    id: 3,
                    name: 'MW千炮捕鱼',
                    class: 'mw',
                    img: '/static/478qp/img/buyu/mw.png'
                },
                {
                    id: 4,
                    name: 'JDB捕鱼',
                    class: 'jdb',
                    img: '/static/478qp/img/buyu/jdb.png'
                },
                {
                    id: 5,
                    name: 'CQ9皇金渔场',
                    class: 'cq9',
                    img: '/static/478qp/img/buyu/cq9.png'
                },
                {
                    id: 6,
                    name: 'PT捕鱼',
                    class: 'pt',
                    img: '/static/478qp/img/buyu/pt.png'
                },
                {
                    id: 7,
                    name: 'BG捕鱼',
                    class: 'bg',
                    img: '/static/478qp/img/buyu/bg.png'
                }
            ],
            showLiveDawta: [],
            lanternData: "",
        };
    },
    methods: {
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
        // 点击导航栏
        changgeme(item, index) {
            this.gameIndex = index;
            if (index == 0) {
                this.showLiveDawta = this.liveDatas;
            } else {
                this.showLiveDawta = this.liveDatas.filter(liveItem => {
                    return item.name.includes(liveItem.type);
                });
            }

            this.isdong = false;

            setTimeout(() => {
                this.isdong = true;
            }, 100);
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
    created: function() {},
    mounted() {
        this.showLiveDawta = this.liveDatas;
        this.getLantern();
        this.getLanternList();
    },
    watch: {},
    components: {
        vpHeaderPic,
        vpHomeHeader,
        vpNav,
        vpFooter
    },
    computed: {
        colorbool() {
            return this.$store.state.mainState.color;
        }
    }
};
</script>

<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
}

span {
    position: absolute;
    top: 0;
    z-index: 1;
    display: inline-block;
    width: 27px;
    height: 80px;
    vertical-align: top;
    background-color: #202020;
    cursor: pointer;
}

span:hover:before {
    background-position-y: bottom;
}

#prev {
    left: 27px;
}

#next {
    right: 27px;
}

span:before {
    content: '';
    position: absolute;
    top: 30px;
    left: 8px;
    width: 12px;
    height: 20px;
    background-position: center top;
    background-repeat: no-repeat;
}

#prev:before {
    background-image: url('/static/public/image/game/live/left.png');
}

#next:before {
    background-image: url('/static/public/image/game/live/right.png');
}

.active {
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    transform: translate3d(-150px, 0, 0);
}

.back {
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    transform: translate3d(150px, 0, 0);
}

.home-list-wrap {
    text-align: center;
    overflow: hidden;
    width: 1200px;
    margin: 0 auto;
    font-size: 0;
    .home-list-item:nth-child(odd) {
        background-size: 100% 100%;
        &:hover .left_cont {
            transform: translateX(10px);
        }
        &:hover .right_img {
            transform: translateX(-10px);
        }
        position: relative;
        float: left;
        margin-bottom: 20px;
        width: 588px;
        height: 272px;
        .left_cont {
            float: l;
            position: relative;
            left: 0;
            padding: 35px 0 0 35px;
            color: #fff;
            transition: all 0.3s;
            .left_logo {
                text-align: left;
            }
            .title {
                margin: 25px auto 25px;
                font-size: 24px;
                font-weight: bolder;
                text-align: left;
            }
            .text {
                font-size: 16px;
                line-height: 1.5;
            }
        }
        .right_img {
            position: absolute;
            right: 0px;
            bottom: 0px;
            width: 280px;
            height: 271px;
            transition: all 0.3s;
        }
        .mark-box {
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            padding-top: 35px;
            .qr-code-container {
                opacity: 0;
                width: 59%;
                overflow: hidden;
                margin-bottom: 25px;
                .client-down {
                    float: left;
                    margin: 0 0 0 45px;
                    img {
                        border: 0;
                        vertical-align: middle;
                    }
                    p {
                        font-size: 14px;
                        color: #fff;
                        text-align: center;
                    }
                }
            }
            .join-game-btn {
                position: absolute;
                bottom: 20px;
                left: 35px;
                z-index: 200;
                height: 38px;
                width: 150px;
                text-align: center;
                background: url(/static/478qp/img/buyu/jr.png);
                opacity: 0;
                transition: all 0.3s;
                cursor: pointer;
                line-height: 33px;
                background-size: 100% 100%;
                a {
                    font-size: 16px;
                    color: #fff;
                    display: block;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                }
            }
        }

        &:hover .join-game-btn {
            opacity: 1;
        }
    }

    .home-list-item:nth-child(even) {
        &:hover .left_cont {
            transform: translateX(-10px);
        }
        &:hover .right_img {
            transform: translateX(10px);
        }
        position: relative;
        float: left;
        margin-left: 20px;
        margin-bottom: 20px;
        width: 588px;
        height: 272px;
        background-size: 100% 100%;
        .left_cont {
            float: right;
            position: relative;
            right: 0;
            padding: 35px 35px 0 0px;
            color: #fff;
            transition: all 0.3s;
            .left_logo {
                text-align: right;
            }
            .title {
                margin: 25px auto 25px;
                font-size: 24px;
                font-weight: bolder;
                text-align: right;
            }
            .text {
                font-size: 16px;
                line-height: 1.5;
            }
        }
        .right_img {
            position: absolute;
            left: 20px;
            bottom: 0px;
            width: 280px;
            height: 272px;
            transition: all 0.3s;
        }

        .mark-box {
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            padding-top: 35px;
            .qr-code-container {
                opacity: 0;
                width: 59%;
                overflow: hidden;
                margin-bottom: 25px;
                .client-down {
                    float: left;
                    margin: 0 0 0 45px;
                    img {
                        border: 0;
                        vertical-align: middle;
                    }
                    p {
                        font-size: 14px;
                        color: #fff;
                        text-align: center;
                    }
                }
            }
            .join-game-btn {
                position: absolute;
                bottom: 20px;
                right: 35px;
                z-index: 200;
                height: 38px;
                width: 150px;
                text-align: center;
                background: url(/static/478qp/img/buyu/jr.png);
                opacity: 0;
                transition: all 0.3s;
                cursor: pointer;
                line-height: 33px;
                background-size: 100% 100%;
                a {
                    font-size: 16px;
                    color: #fff;
                    display: block;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                }
            }
        }

        &:hover .join-game-btn {
            opacity: 1;
        }
    }

    .home-list-item:hover .qr-code-container {
        opacity: 1;
    }

    li:hover {
        background-position-y: bottom;
    }

    .aa {
        background-image: url(/static/478qp/img/buyu/bugj_01.png);
        .right_img_a {
            width: 270px !important;
            height: 272px !important;
        }
    }

    .ab {
        background-image: url(/static/478qp/img/buyu/bugj_02.png);
        .right_img_a {
            width: 270px !important;
            height: 272px !important;
        }
    }

    .ac {
        background-image: url(/static/478qp/img/buyu/bugj_03.png);
        .right_img_a {
            width: 270px !important;
            height: 272px !important;
        }
    }

    .ad {
        background-image: url(/static/478qp/img/buyu/bugj_04.png);
        .right_img_a {
            width: 270px !important;
            height: 272px !important;
        }
    }

    .ae {
        background-image: url(/static/478qp/img/buyu/bugj_05.png);
    }

    .af {
        background-image: url(/static/478qp/img/buyu/bugj_05.png);
        .right_img_a {
            width: 270px !important;
            height: 272px !important;
        }
    }

    .ag {
        background-image: url(/static/478qp/img/buyu/bugj_06.png);
        .right_img_a {
            width: 270px !important;
            height: 272px !important;
        }
    }

    .ah {
        background-image: url(/static/478qp/img/buyu/bugj_07.png);
        .right_img_a {
            width: 270px !important;
            height: 272px !important;
        }
    }

    .ba {
        background-image: url(/static/478qp/img/buyu/bugj_06.png);
        .right_img_a {
            width: 270px !important;
            height: 270px !important;
        }
    }

    .bb {
        background-image: url(/static/478qp/img/buyu/bugj_09.png);
        .right_img_a {
            width: 270px !important;
            height: 272px !important;
        }
    }

    .bc {
        background-image: url(/static/478qp/img/buyu/bugj_08.png);
    }

    .bd {
        background-image: url(/static/478qp/img/buyu/bugj_12.png);
    }
    .be {
        background-image: url(/static/478qp/img/buyu/bugj_13.png);
    }
    .bf {
        background-image: url(/static/478qp/img/buyu/bugj_14.png);
    }
    .bg {
        background-image: url(/static/478qp/img/buyu/bugj_10.png);
        .right_img_a {
            width: 270px !important;
            height: 272px !important;
            // bottom: 38px !important;
        }
    }
    .pt {
        background-image: url(/static/478qp/img/buyu/bugj_11.png);
        .right_img_a {
            width: 270px !important;
            height: 272px !important;
        }
    }
    .more {
        background-image: url(/static/478qp/img/buyu/more.png);
    }
}
.home-list-wrap:nth-child(even) {
    margin-left: 20px;
}

.fishContainer {
    background: #272727;

    .banner-cpyx {
        .wrapper {
            margin: 0 auto;
            width: 960px;
            height: 10px;

            .demolist {
                margin-top: 30px;
            }
        }
    }
}

.notice {
    height: 36px;
    line-height: 36px;
    width: 100%;
    margin-top: 0px;
    background: url(/static/478qp/img/buyu/noticebg.png) repeat-x;

    .w1000 {
        width: 1200px;
        height: 100%;
        margin: auto;
        position: relative;
        span {
            font-size: 14px;
            background: url(/static/478qp/img/buyu/notice.png) left center no-repeat;
            padding-left: 30px;
            width: 128px;
            float: left;
            display: block;
            height: 36px;
            line-height: 37px;
            color: #e0bf55;

            i {
                font-style: normal;
            }
        }

        marquee {
            float: right;
            width: 1100px;
            margin-right: 10px;
            color: #fff;
            height: 36px;
            line-height: 36px;
            font-size: 12px;
            a {
                color: #fff;
            }
        }
    }
}
.live_content {
    position: relative;
    padding: 30px 0 50px;
    margin: 0 auto;
    background: #252525;
}
.night {
    background: rgba(18, 21, 66, 0.8);
}
.js-list-items {
    padding: 10px 0 10px 0;
    width: 1200px;
    height: 124px;
    margin: 0 auto;
    margin-top: 30px;
    dd {
        display: inline-block;
        vertical-align: top;
        height: 104px;
        width: 137px;
        margin-left: 13px;
        padding-top: 10px;
        border-radius: 13px;
        background: #383838;
        text-align: center;
        font-size: 16px;
        color: rgb(143, 143, 143);
        cursor: pointer;
        -webkit-transition: all 0.2s;
        -o-transition: all 0.2s;
        transition: all 0.2s;
        // img {
        //   margin-bottom: 4px;
        // }
        .topimg {
            height: 53px;
        }
        &.firstdd1 {
            background: url('/static/478qp/img/buyu/hot.jpg') no-repeat center center;
            &:hover {
                background: url('/static/478qp/img/buyu/hot-hover.jpg') no-repeat center center;
            }

            p {
                display: none;
            }
            line-height: 28px;
            margin-left: 0;
        }
        &.firstdd {
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            transform: scale(1.1);
            background: url('/static/478qp/img/buyu/hot-hover.jpg') no-repeat center center;
            margin-left: 0;
            &:hover {
                background: url('/static/478qp/img/buyu/hot-hover.jpg') no-repeat center center;
            }
        }

        &:hover {
            -webkit-transform: scale(1.1);
            -ms-transform: scale(1.1);
            transform: scale(1.1);
            font-size: 16px;
            color: #fff;
            background: linear-gradient(to bottom right, rgb(241, 211, 94), rgb(172, 130, 27));
        }

        & .ag {
            background: url('/static/478qp/img/buyu/ag.png') no-repeat center center;
        }
        & .fg {
            background: url('/static/478qp/img/buyu/fg.png') no-repeat center center;
        }
        & .mw {
            background: url('/static/478qp/img/buyu/mw.png') no-repeat center center;
        }
        & .cq9 {
            background: url('/static/478qp/img/buyu/cq9.png') no-repeat center center;
        }
        & .pt {
            background: url('/static/478qp/img/buyu/pt.png') no-repeat center center;
        }
        & .bg {
            background: url('/static/478qp/img/buyu/bg.png') no-repeat center center;
        }
        & .jdb {
            background: url('/static/478qp/img/buyu/jdb.png') no-repeat center center;
        }

        &:hover .ag {
            background: url('/static/478qp/img/buyu/h_ag.png') no-repeat center center;
        }
        &:hover .fg {
            background: url('/static/478qp/img/buyu/h_fg.png') no-repeat center center;
        }
        &:hover .mw {
            background: url('/static/478qp/img/buyu/h_mw.png') no-repeat center center;
        }
        &:hover .jdb {
            background: url('/static/478qp/img/buyu/h_jdb.png') no-repeat center center;
        }
        &:hover .cq9 {
            background: url('/static/478qp/img/buyu/h_cq9.png') no-repeat center center;
        }
        &:hover .pt {
            background: url('/static/478qp/img/buyu/h_pt.png') no-repeat center center;
        }
        &:hover .bg {
            background: url('/static/478qp/img/buyu/h_bg.png') no-repeat center center;
        }

        p {
            width: 111px;
            height: 43px;
            margin: 0 auto;
        }

        &:not(:first-child):hover {
            font-size: 16px;
            background: linear-gradient(rgb(241, 211, 94), rgb(172, 130, 27));
            color: #fff;
        }
    }

    .hot {
        padding-top: 0;
        line-height: 120px;
        text-align: center;
        font-size: 20px;
        color: #f44336;
    }
    .active {
        -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
        font-size: 16px;
        color: #fff;
        background: linear-gradient(to bottom right, rgb(241, 211, 94), rgb(172, 130, 27));

        .ag {
            background: url('/static/478qp/img/buyu/h_ag.png') no-repeat center center;
        }
        .fg {
            background: url('/static/478qp/img/buyu/h_fg.png') no-repeat center center;
        }
        .mw {
            background: url('/static/478qp/img/buyu/h_mw.png') no-repeat center center;
        }
        .jdb {
            background: url('/static/478qp/img/buyu/h_jdb.png') no-repeat center center;
        }
        .cq9 {
            background: url('/static/478qp/img/buyu/h_cq9.png') no-repeat center center;
        }
        .pt {
            background: url('/static/478qp/img/buyu/h_pt.png') no-repeat center center;
        }
        .bg {
            background: url('/static/478qp/img/buyu/h_bg.png') no-repeat center center;
        }
    }
}
</style>

