<template>
    <div class="buyu">
        <div class="byzhi"><img src="/static/jsyl/img/fish/nyzhi.png" alt="" /></div>
        <div class="fish_box">
            <!-- 捕鱼左 -->
            <div class="nav_list">
                <ul>
                    <li v-for="(item,i) in fishData" :key="i" @click="showFish(item,i)" :class="{active:selIndex==i}">
                        <a href="javascript:;" class="">
                            <img :src="item.imgLeft" alt="" class="buyuic" />
                            <span class="buyuiw">{{item.name}}</span>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- 捕鱼右 -->
            <div class="content" @click="gobuyu">
                <ul>
                    <li>
                        <img :src="fishImg.imgRight" alt="" class="yuyutu" />
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>
<script>
// import $ from 'jquery'
import mixin from '../games/public.js';

export default {
    mixins: [mixin],
    data() {
        return {
            selIndex: 0,
            selectItem: {
                platform: 'AG_GAME',
                gameName: '548',
                name: 'AG捕鱼王',
                imgLeft: '/static/jsyl/img/fish/byi1.png',
                imgRight: '',
                imgLogo: '/static/public/image/buyu/ag-logo.png',
                type: ['AG', '捕鱼王'],
                id: 265
            },
            fishData: [
                {
                    platform: 'AG_GAME',
                    gameName: '548',
                    name: 'AG捕鱼王',
                    imgLeft: '/static/jsyl/img/fish/byi1.png',
                    imgRight: '',
                    imgLogo: '/static/public/image/buyu/ag-logo.png',
                    type: ['AG', '捕鱼王'],
                    id: 265
                },
                {
                    platform: 'FG_GAME',
                    gameName: 'fish_mm',
                    name: 'FG美人捕鱼',
                    imgLeft: '/static/jsyl/img/fish/byi2.png',
                    imgRight: '',
                    imgLogo: '/static/public/image/buyu/fg-logo.jpg',
                    type: ['FG', '美人捕鱼'],
                    id: 2576
                },
                {
                    platform: 'FG_GAME',
                    gameName: 'fish_hl',
                    name: 'FG欢乐捕鱼',
                    imgLeft: '/static/jsyl/img/fish/byi3.png',
                    imgRight: '',
                    imgLogo: '/static/public/image/buyu/fg-logo.jpg',
                    type: ['FG', '欢乐捕鱼'],
                    id: 2626
                },
                {
                    platform: 'FG_GAME',
                    gameName: 'fish_hl',
                    name: 'FG天天捕鱼',
                    imgLeft: '/static/jsyl/img/fish/byi4.png',
                    imgRight: '',
                    imgLogo: '/static/public/image/buyu/fg-logo.jpg',
                    type: ['FG', '天天捕鱼'],
                    id: 2628
                },
                {
                    platform: 'JDB_GAME',
                    gameName: '7#7002',
                    name: 'JDB龙王捕鱼',
                    imgLeft: '/static/jsyl/img/fish/byi5.png',
                    imgRight: '',
                    imgLogo: '/static/public/image/buyu/jdb-logo.png',
                    type: ['JDB', '龙王捕鱼'],
                    id: 174
                },
                {
                    platform: 'JDB_GAME',
                    gameName: '7#7002',
                    name: 'JDB龙王捕鱼2',
                    imgLeft: '/static/jsyl/img/fish/byi5.png',
                    imgRight: '',
                    imgLogo: '/static/public/image/buyu/jdb-logo.png',
                    type: ['JDB', '龙王捕鱼2'],
                    id: 175
                },
                {
                    platform: 'JDB_GAME',
                    gameName: '7#7003',
                    name: 'JDB财神捕鱼',
                    imgLeft: '/static/jsyl/img/fish/byi5.png',
                    imgRight: '',
                    imgLogo: '/static/public/image/buyu/jdb-logo.png',
                    type: ['JDB', '财神捕鱼'],
                    id: 173
                },
                {
                    platform: 'MW_GAME',
                    gameName: '1051',
                    name: 'MW千炮捕鱼',
                    imgLeft: '/static/jsyl/img/fish/byi8.png',
                    imgRight: '',
                    imgLogo: '/static/public/image/buyu/mw-logo.jpg',
                    type: ['MW', '千炮捕鱼'],
                    id: 151
                },
                {
                    platform: 'CQ9_GAME',
                    gameName: 'AB3',
                    name: 'CQ9皇金渔场',
                    imgLeft: '/static/jsyl/img/fish/byi9.png',
                    imgRight: '',
                    imgLogo: '/static/public/image/buyu/cq9-logo.png',
                    type: ['CQ9', '皇金渔场'],
                    id: 2639
                },
                {
                    platform: 'PT_GAME',
                    gameName: 'cashfi',
                    name: 'PT深海大赢家',
                    imgLeft: '/static/jsyl/img/fish/byi10.png',
                    imgRight: '',
                    imgLogo: '/static/public/image/buyu/pt-logo.png',
                    type: ['PT', '深海大赢家'],
                    id: 3296
                },
                {
                    platform: 'PT_GAME',
                    gameName: 'cashfi',
                    name: 'BG捕鱼大师',
                    imgLeft: '/static/jsyl/img/fish/byi11.png',
                    imgRight: '',
                    imgLogo: '/static/public/image/buyu/pt-logo.png',
                    type: ['BG', '捕鱼大师'],
                    id: 3202
                },
                {
                    platform: '',
                    gameName: '',
                    name: '+敬请期待',
                    imgLeft: '/static/jsyl/img/fish/byi12.png',
                    imgLogo: '',
                    imgRight: '',
                    type: ['', '']
                }
            ],
            fishImg: { imgRight: '/static/jsyl/img/fish/yuyu1.png' }
        };
    },
    methods: {
        showFish(item, i) {
            switch (item.name) {
                case 'AG捕鱼王':
                    this.fishImg.imgRight = '/static/jsyl/img/fish/yuyu1.png';
                    break;
                case 'FG美人捕鱼':
                    this.fishImg.imgRight = '/static/jsyl/img/fish/yuyu2.png';
                    break;
                case 'FG欢乐捕鱼':
                    this.fishImg.imgRight = '/static/jsyl/img/fish/yuyu3.png';
                    break;
                case 'FG天天捕鱼':
                    this.fishImg.imgRight = '/static/jsyl/img/fish/yuyu4.png';
                    break;
                case 'JDB龙王捕鱼':
                    this.fishImg.imgRight = '/static/jsyl/img/fish/yuyu5.png';
                    break;
                case 'JDB龙王捕鱼2':
                    this.fishImg.imgRight = '/static/jsyl/img/fish/yuyu6.png';
                    break;
                case 'JDB财神捕鱼':
                    this.fishImg.imgRight = '/static/jsyl/img/fish/yuyu7.png';
                    break;
                case 'MW千炮捕鱼':
                    this.fishImg.imgRight = '/static/jsyl/img/fish/yuyu8.png';
                    break;
                case 'CQ9皇金渔场':
                    this.fishImg.imgRight = '/static/jsyl/img/fish/yuyu9.png';
                    break;
                case 'PT深海大赢家':
                    this.fishImg.imgRight = '/static/jsyl/img/fish/yuyu10.png';
                    break;
                case 'BG捕鱼大师':
                    this.fishImg.imgRight = '/static/jsyl/img/fish/yuyu11.png';
                    break;
            }
            this.selIndex = i;
            if (item.id) {
                this.selectItem = item;
                this.trustLogin(item);
            }
        },
        gobuyu() {
            this.trustLogin(this.selectItem);
        }
    },
    created: function() {},
    mounted() {},
    watch: {},
    components: {}
};
</script>

<style lang="less" scoped>
.buyu {
    height: 820px;
    background: url(/static/jsyl/img/fish/bybg.png) no-repeat center bottom;

    .byzhi {
        text-align: center;
        padding-top: 20px;
        padding-bottom: 30px;
    }

    .fish_box {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;

        .nav_list {
            padding-left: 25px;
            width: 510px;

            li {
                float: left;
                margin: 11px 8px;
                width: 225px;
                height: 63px;
                background: url(/static/jsyl/img/fish/byli1.png) no-repeat center top;

                &:hover {
                    background: url(/static/jsyl/img/fish/byli2.png) no-repeat center top;
                }

                &.cur {
                    background: url(/static/jsyl/img/fish/byli2.png) no-repeat center top;

                    a {
                        text-decoration: none;
                        color: #7a4800;
                    }
                }

                a {
                    display: block;
                    height: 58px;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: center;
                    -webkit-justify-content: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                    -ms-flex-align: center;
                    align-items: center;
                    color: #fff;

                    &:hover {
                        text-decoration: none;
                        color: #7a4800;
                    }

                    .buyuic {
                        transform: translate(0, 3px);
                    }

                    .buyuiw {
                        margin-left: 5px;
                        font-size: 20px;
                    }
                }
            }
            .active {
                background: url(/static/jsyl/img/fish/byli2.png) no-repeat center top;
            }
        }

        .content {
            width: 490px;
            height: 580px;
            cursor: pointer;
            li {
                display: none;

                &:nth-child(1) {
                    display: block;
                }

                .yuyutu {
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: center;
                    -webkit-justify-content: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    -webkit-box-align: end;
                    -webkit-align-items: flex-end;
                    -ms-flex-align: end;
                    align-items: flex-end;
                }
            }
        }
    }
}
</style>