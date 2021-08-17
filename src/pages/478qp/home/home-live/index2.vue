<template>
    <div class="homeLive-wrap">
        <vp-home-header></vp-home-header>
        <vp-nav></vp-nav>
        <div class="live">
            <vp-header-pic :headerImg="headerImg"></vp-header-pic>
            <div class="page-body">
                <div class="content">
                    <div class="cell" v-for="(liveItem,liveIndex) in liveDatas" :key="liveIndex" :class="liveItem.cellclass">
                        <div class="live-image relative" id="live-1" :style="{background:liveItem.bgImgSrc}">
                            <div class="hot cover-sprite" v-if="liveItem.hot"></div>
                            <div class="mask"></div>
                            <div class="color-cell-wrapper-1">
                                <a href="javascript:void(0)" class="pur-cell" :class="childOne.className"
                                    v-for="(childOne,childIndex) in liveItem.child1" :key="childIndex">{{childOne.gameName}}</a>
                            </div>
                            <div class="color-cell-wrapper-2">
                                <a href="javascript:void(0)" class="pur-cell" :class="childTwo.className"
                                    v-for="(childTwo,child2Index) in liveItem.child2" :key="child2Index">{{childTwo.gameName}}</a>
                            </div>
                        </div>
                        <div class="cell-text-wrapper">
                            <div class="cell-title">{{liveItem.name}}</div>
                            <div class="redpink-line"></div>
                            <div class="cell-text">{{liveItem.text1}}<br>{{liveItem.text2}}</div>
                            <div class="cell-more">
                                <a href="javascript:void(0)" class="start-game" data-game-id="A02026" @click="getItemId(liveItem)">
                                    <span>开始游戏 &gt;</span>
                                </a>
                            </div>
                        </div>
                    </div>
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
            headerImg: '/static/478qp/img/banner/live-banner.jpg',
            params: '',
            clicked: true,
            key: '',
            liveDatas: [
                {
                    name: 'AG视讯厅',
                    id: '31',
                    class: 'ag',
                    text1: '美女主播互动综合游戏区',
                    text2: '2万在线玩家同场竞技',
                    bgImgSrc: 'url(/static/478qp/img/live/live-1.jpg)',
                    child1: [
                        { gameName: '百家乐', className: 'purple-cell' },
                        { gameName: '包桌百家乐', className: 'blue-cell' },
                        { gameName: '竞咪百家乐', className: 'purple-cell' }
                    ],
                    child2: [
                        { gameName: '龙虎', className: 'blue-cell' },
                        { gameName: '骰宝', className: 'purple-cell' },
                        { gameName: '轮盘', className: 'purple-cell' }
                    ],
                    hot: true,
                    cellclass: ''
                },
                {
                    name: 'BBIN视讯厅',
                    id: '32',
                    class: 'bb',
                    text1: '唯一线上合作伙伴',
                    text2: '专业电投手 ，视频直播',
                    bgImgSrc: 'url(/static/478qp/img/live/live-14.jpg)',
                    child1: [
                        { gameName: '电投优势', className: 'purple-cell' },
                        { gameName: '电投攻略', className: 'blue-cell' },
                        { gameName: '常见问题', className: 'purple-cell' }
                    ],
                    hot: true,
                    cellclass: 'cellclass'
                },
                {
                    name: 'BG视讯厅',
                    id: '3180',
                    class: 'bg',
                    text1: '最老牌的博彩平台',
                    text2: '独创多台下注',
                    bgImgSrc: 'url(/static/478qp/img/live/live-3.jpg)',
                    child1: [{ gameName: '百家乐', className: 'purple-cell' }, { gameName: '牛牛', className: 'blue-cell' }],
                    child2: [{ gameName: '温州牌九', className: 'blue-cell' }, { gameName: '德州扑克', className: 'purple-cell' }],
                    hot: false,
                    cellclass: ''
                },
                {
                    name: 'DG视讯厅',
                    id: '42',
                    class: 'dg',
                    text1: '特有的PLAYBOY真人系统',
                    text2: '深受欧美玩家喜欢',
                    bgImgSrc: 'url(/static/478qp/img/live/live-6.jpg)',
                    child1: [
                        { gameName: '百家乐', className: 'purple-cell' },
                        { gameName: 'PLAYBOY真人', className: 'blue-cell' },
                        { gameName: '德州扑克', className: 'purple-cell' }
                    ],
                    child2: [{ gameName: '二十一点', className: 'blue-cell' }, { gameName: '轮盘', className: 'purple-cell' }],
                    hot: true,
                    cellclass: 'cellclass'
                },
                {
                    name: 'DS视讯厅',
                    id: '34',
                    class: 'ds',
                    text1: '实时荷官互动',
                    text2: '360度旋转咪牌',
                    bgImgSrc: 'url(/static/478qp/img/live/live-9.jpg)',
                    child1: [
                        { gameName: '百家乐', className: 'purple-cell' },
                        { gameName: '包桌百家乐', className: 'blue-cell' },
                        { gameName: '多台百家乐', className: 'purple-cell' }
                    ],
                    child2: [
                        { gameName: '龙虎', className: 'blue-cell' },
                        { gameName: '骰宝', className: 'purple-cell' },
                        { gameName: '轮盘', className: 'purple-cell' }
                    ],
                    hot: true,
                    cellclass: ''
                },
                // {
                //     name: 'LEBO视讯厅',
                //     id: '44',
                //     class: 'lebo',
                //     text1: '百家乐名人堂',
                //     text2: '一眼览尽玩家打牌手法',
                //     bgImgSrc: 'url(/static/478qp/img/live/live-2.jpg)',
                //     child1: [
                //         { gameName: '百家乐', className: 'purple-cell' },
                //         { gameName: '包桌百家乐', className: 'blue-cell' },
                //         { gameName: '包桌百家乐', className: 'purple-cell' }
                //     ],
                //     child2: [{ gameName: '龙虎', className: 'blue-cell' }, { gameName: '骰宝', className: 'purple-cell' }],
                //     hot: false,
                //     cellclass: 'cellclass'
                // },
                {
                    name: 'OG视讯厅',
                    id: '48',
                    class: 'og',
                    text1: '特有的PLAYBOY真人系统',
                    text2: '专业电投手,视频直播',
                    bgImgSrc: 'url(/static/478qp/img/live/live-4.jpg)',
                    child1: [
                        { gameName: '百家乐', className: 'purple-cell' },
                        { gameName: '包桌百家乐', className: 'blue-cell' },
                        { gameName: '竞咪百家乐', className: 'purple-cell' }
                    ],
                    child2: [
                        { gameName: '龙虎', className: 'blue-cell' },
                        { gameName: '骰宝', className: 'purple-cell' },
                        { gameName: '轮盘', className: 'purple-cell' }
                    ],
                    hot: true,
                    cellclass: 'cellclass'
                },
                {
                    name: 'EBET视讯厅',
                    id: '43',
                    class: 'ebet',
                    text1: '最老牌的博彩平台',
                    text2: '360度旋转咪牌,特殊玩法',
                    bgImgSrc: 'url(/static/478qp/img/live/live-5.jpg)',
                    child1: [
                        { gameName: '百家乐', className: 'purple-cell' },
                        { gameName: '竞咪百家乐', className: 'blue-cell' },
                        { gameName: '包桌百家乐', className: 'purple-cell' }
                    ],
                    hot: true,
                    cellclass: ''
                },
                // {
                //     name: 'LMG视讯厅',
                //     id: '45',
                //     class: 'lmg',
                //     text1: '美女主播互动综合游戏区',
                //     text2: '2万在线玩家同场竞技',
                //     bgImgSrc: 'url(/static/478qp/img/live/live-10.jpg)',
                //     child1: [
                //         { gameName: '百家乐', className: 'purple-cell' },
                //         { gameName: '包桌百家乐', className: 'blue-cell' },
                //         { gameName: '多台百家乐', className: 'purple-cell' }
                //     ],
                //     child2: [
                //         { gameName: '龙虎', className: 'blue-cell' },
                //         { gameName: '骰宝', className: 'purple-cell' },
                //         { gameName: '轮盘', className: 'purple-cell' }
                //     ],
                //     hot: false,
                //     cellclass: 'cellclass'
                // },
                // {
                //     name: '欧博视讯厅',
                //     id: '46',
                //     class: 'ob',
                //     text1: '唯一线上合作伙伴',
                //     text2: '专业电投手,视频直播',
                //     bgImgSrc: 'url(/static/478qp/img/live/live-15.jpg)',
                //     child1: [
                //         { gameName: '百家乐', className: 'purple-cell' },
                //         { gameName: '包桌百家乐', className: 'blue-cell' },
                //         { gameName: '竞咪百家乐', className: 'purple-cell' }
                //     ],
                //     hot: false,
                //     cellclass: 'cellclass'
                // },
                // {
                //     name: 'SA视讯厅',
                //     id: '49',
                //     class: 'sa',
                //     text1: '实时荷官互动',
                //     text2: '2万在线玩家同场竞技',
                //     bgImgSrc: 'url(/static/478qp/img/live/live-16.jpg)',
                //     child1: [
                //         { gameName: '百家乐', className: 'purple-cell' },
                //         { gameName: '多台百家乐', className: 'blue-cell' },
                //         { gameName: '包桌百家乐', className: 'purple-cell' }
                //     ],
                //     child2: [{ gameName: '龙虎', className: 'blue-cell' }, { gameName: '骰宝', className: 'purple-cell' }],
                //     hot: true,
                //     cellclass: ''
                // },
                {
                    name: 'VR彩票',
                    id: '30',
                    class: 'vr',
                    text1: '美女主播互动综合游戏区',
                    text2: '深受欧美玩家喜欢',
                    bgImgSrc: 'url(/static/478qp/img/live/live-17.jpg)',
                    child2: [{ gameName: 'VR赛车', className: 'purple-cell' }, { gameName: 'VR彩票', className: 'blue-cell' }],
                    hot: true,
                    cellclass: ''
                }
            ]
        };
    },
    methods: {},
    created: function() {},
    mounted() {},
    watch: {},
    components: {
        vpHeaderPic,
        vpHomeHeader,
        vpNav,
        vpFooter
    },
    computed: {}
};
</script>

<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
}
.page-body {
    background: #1e1e1e;
    padding-top: 38px;
    padding-bottom: 60px;
    .content {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        .cell {
            width: 589px;
            height: 225px;
            float: left;
            margin-top: 22px;
            .live-image {
                text-align: center;
                width: 364px;
                height: 225px;
                float: left;
                position: relative;
                .hot {
                    width: 63px;
                    height: 30px;
                    background: url('/static/478qp/img/live/hot.png');
                    right: 18px;
                    top: 10px;
                    position: absolute;
                    z-index: 100;
                }
                .color-cell-wrapper-1 {
                    position: relative;
                    z-index: 100;
                    margin-top: 133px;
                    display: none;
                    .pur-cell {
                        display: inline-block;
                        border-radius: 3px;
                        color: #ffffff;
                        height: 30px;
                        line-height: 30px;
                        padding: 0 12px;
                        font-size: 14px;
                        margin-left: 3px;
                    }
                    .purple-cell {
                        border: 1px solid #bf5ef9;
                    }
                    .blue-cell {
                        border: 1px solid #33bafe;
                    }
                    .purple-cell:hover {
                        background: rgb(191, 94, 249);
                        outline: 0;
                    }
                    .blue-cell:hover {
                        background: rgb(51, 186, 254);
                        outline: 0;
                    }
                }
                .color-cell-wrapper-2 {
                    position: relative;
                    z-index: 100;
                    margin-top: 8px;
                    display: none;
                    .pur-cell {
                        display: inline-block;
                        border-radius: 3px;
                        color: #ffffff;
                        height: 30px;
                        line-height: 30px;
                        padding: 0 12px;
                        font-size: 14px;
                        margin-left: 3px;
                    }
                    .purple-cell {
                        border: 1px solid #bf5ef9;
                    }
                    .blue-cell {
                        border: 1px solid #33bafe;
                    }
                    .purple-cell:hover {
                        background: rgb(191, 94, 249);
                        outline: 0;
                    }
                    .blue-cell:hover {
                        background: rgb(51, 186, 254);
                        outline: 0;
                    }
                }
            }
            .live-image:hover .mask {
                background: url('/static/478qp/img/live/mask.png') no-repeat;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                display: block;
            }
            .live-image:hover .color-cell-wrapper-1 {
                display: block;
            }
            .live-image:hover .color-cell-wrapper-2 {
                display: block;
            }
            .cell-text-wrapper {
                float: left;
                width: 225px;
                background: #181818;
                height: 100%;
                overflow: hidden;
                padding: 22px 33px 0;
                .cell-title {
                    font-size: 22px;
                    color: #ffffff;
                    line-height: 24px;
                }
                .redpink-line {
                    border-bottom: 2px solid #ba8d4d;
                    width: 37px;
                    margin-top: 10px;
                    margin-bottom: 17px;
                }
                .cell-text {
                    color: #828282;
                    font-size: 12px;
                    line-height: 20px;
                }
                .cell-more {
                    margin-top: 27px;
                    position: relative;
                    a {
                        position: absolute;
                        top: 0;
                        left: 0;
                        display: inline-block;
                        width: 134px;
                        height: 36px;
                        border: 1px solid #ba8d4d;
                        color: #ba8d4d;
                        font-size: 16px;
                        line-height: 36px;
                        text-align: center;
                        transition: 0.2s;
                        cursor: pointer;
                        opacity: 1;
                        z-index: 1;
                        span {
                            position: relative;
                            z-index: 3;
                        }
                    }
                    a:before {
                        position: absolute;
                        content: '';
                        z-index: 2;
                        background: #ba8d4d;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        -moz-transition: -moz-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
                        -o-transition: -o-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
                        -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
                        -webkit-transition-delay: 0s;
                        transition: transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
                        transform: scale(0, 1);
                        transform-origin: right top;
                    }

                    a:hover:before {
                        transform-origin: left top;
                        transform: scale(1, 1);
                    }
                    a:hover {
                        color: #fff;
                    }
                }
            }
        }
        .cellclass {
            margin-left: 22px;
        }
    }
}
</style>

