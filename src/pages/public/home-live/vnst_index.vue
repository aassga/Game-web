<template>
    <div class="casino">
        <div class="casino_nav">
            <ul>
                <li v-for="(item,i) in navList" :key="i" @click="getItemIdlive(item)" >
                    <div class="game_ico"><img :src="item.img" alt=""></div>
                    <div class="game_name">{{item.name}}</div>
                </li>
            </ul>
        </div>

        <div class="casino_content">
            <div class="game_box">
                <div class="ag">
                    <img src="/static/public/image/casino/AG-logo.png">
                    <div class="ag_cover">
                        <img src="/static/public/image/casino/AG-logo.png">
                        <ul class="tables">
                            <li v-for="(item,i) in tableList" :key="i" @click="getItemId(item)">
                                <i :class="item.class"></i>
                            </li>
                        </ul>
                        <span class="btn" @click="getItemId({name: 'AG视讯', id: 31})">进入游戏</span>
                    </div>
                </div>
                <ul class="other_games">
                    <li v-for="(item,i) in subList" :key="i" :class="item.class">
                        <div class="enter_cover">
                            <span class="name">{{item.name}}</span>
                            <span class="btn" @click="getItemId(item)">进入游戏</span>
                        </div>
                        <img :src="item.img">
                    </li>
                </ul>
            </div>
            <ul class="casino_box">
                <li v-for="(item) in casinoList" :key="item.id" class="game_item">
                    <i :class="item.class">
                        <img :src="item.src" class="logo" />
                        <span class="enterBtn">
                            <img :src="item.src" />
                            <span class="name">{{item.name}}</span>
                            <span class="btn" @click="getItemId(item)" v-if="item.id !=45">进入游戏</span>
                        </span>
                    </i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { _SetGet, _SetPost } from '@/service/public/service.js';
import mixin from '../games/public.js';
export default {
    mixins: [mixin],
    data() {
        return {
            navList: [
                { img: '/static/public/image/casino/sx1.png', name: 'AG视讯', id: 31, index: 0 },
                { img: '/static/public/image/casino/sx2.png', name: 'BBIN视讯', id: 32, index: 1 },
                { img: '/static/public/image/casino/sx3.png', name: 'EBET视讯', id: 43, index: 2 },
                { img: '/static/public/image/casino/sx4.png', name: 'BG视讯', id: 3180, index: 3 },
                { img: '/static/public/image/casino/sx5.png', name: 'DG视讯', id: 42, index: 4 },
                { img: '/static/public/image/casino/sx6.png', name: 'DS视讯', id: 34, index: 5 },
                // { img: '/static/public/image/casino/sx7.png', name: 'LEBO视讯', id: 44, index: 6 },
                { img: '/static/public/image/casino/sx8.png', name: 'OG视讯', id: 48, index: 7 },
                // { img: '/static/public/image/casino/sx9.png', name: 'LMG视讯', id: 45, index: 8 },
                // { img: '/static/public/image/casino/sx10.png', name: '欧博视讯', id: 46, index: 9 },
                // { img: '/static/public/image/casino/sx11.png', name: 'SA视讯', id: 49, index: 10 },
                { img: '/static/public/image/casino/sx12.png', name: 'VR彩票',id: 30, index: 11 },
                { img: '/static/public/image/casino/sx13.png', name: '敬请期待', index: 12 },
                { img: '/static/public/image/casino/sx13.png', name: '敬请期待', index: 13 },
                { img: '/static/public/image/casino/sx13.png', name: '敬请期待', index: 14 },
                { img: '/static/public/image/casino/sx13.png', name: '敬请期待', index: 15},
                
            ],
            tableList: [
                { class: 'duotai', name: 'AG视讯', id: 31, index: 0 },
                { class: 'kuaisu', name: 'AG视讯', id: 31, index: 1 },
                { class: 'qijian', name: 'AG视讯', id: 31, index: 2 },
                { class: 'jingmi', name: 'AG视讯', id: 31, index: 3 },
                { class: 'baozhuo', name: 'AG视讯', id: 31, index: 4 }
            ],
            subList: [
                { class: 'game_bbin', img: '/static/public/image/casino/bbin-logo.png', name: 'BBIN视讯', id: 32, index: 0 },
                { class: 'game_ebet', img: '/static/public/image/casino/ebet-logo.png', name: 'EBET视讯', id: 43, index: 1 },
                { class: 'game_bg', img: '/static/public/image/casino/bg-logo.png', name: 'BG视讯', id: 3180, index: 2 }
            ],
            casinoList: [
                { class: 'dg', src: '/static/public/image/casino/dg_ico.png', name: 'DG视讯', id: 42, index: 0 },
                { class: 'ds', src: '/static/public/image/casino/ds_ico.png', name: 'DS视讯', id: 34, index: 1 },
                // { class: 'lebo', src: '/static/public/image/casino/lebo_ico.png', name: 'LEBO视讯', id: 44, index: 2 },
                { class: 'og', src: '/static/public/image/casino/og_ico.png', name: 'OG视讯', id: 48, index: 3 },
                // { class: 'ob', src: '/static/public/image/casino/ob_ico.png', name: '欧博视讯', id: 46, index: 5 },
                // { class: 'sa', src: '/static/public/image/casino/sa_ico.png', name: 'SA视讯', id: 49, index: 6 },
                { class: 'vr', src: '/static/public/image/casino/vr_ico.png', name: 'VR彩票', id: 30, index: 6 },
                { class: 'lmg', src: '/static/public/image/casino/lmg_ico.png', name: '敬请期待', id: 45, index: 4 },
            ]
        };
    },
    methods: {
      getItemIdlive(item){
          if(item.name=='敬请期待'){
            return false
          }else{
            this.getItemId(item) 
          }     
        }  
    },
    created: function() {},
    mounted() {

    },
    watch: {},
    components: {}
};
</script>

<style lang="less" scoped>
.casino {
    width: 1200px;
    margin: 0 auto;
    background: #202020;
    padding: 15px 20px;

    .casino_nav {
        box-sizing: border-box;
        ul {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;

            li {
                color: #fff;
                cursor: pointer;
                width: 185px;
                height: 52px;
                background: #151515;
                border-radius: 10px;
                margin-bottom: 12px;
                margin-right: 10px;
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

                .game_ico {
                    img {
                        display: block;
                    }
                }
                .game_name {
                    font-size: 18px;
                    padding-left: 4px;
                }

                &:hover {
                    color: #fff;
                    background: linear-gradient(to bottom, #dbb948, #ae861e);
                }
                &:nth-child(6n) {
                    margin-right: 0;
                }
                &:nth-child(9),&:nth-child(10),&:nth-child(11),&:nth-child(12) {
                    color: #4e4e4e;
                }
            }
        }
    }

    .casino_content {
        width: 100%;
        margin-top: 3px;

        .game_box {
            width: 100%;
            height: 511px;
            margin-bottom: 6px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: space-between;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;

            .ag {
                flex: 1;
                height: 100%;
                margin-right: 6px;
                position: relative;
                background: url(/static/public/image/casino/ag.png) center center no-repeat;

                img {
                    transform: translate(-50%, 33px);
                    position: absolute;
                    left: 18%;
                    opacity: 1;
                    transition: all 0.5s ease-in;
                }

                &:hover {
                    img {
                        opacity: 0;
                        transition: all 0.5s ease-out;
                    }
                    .ag_cover {
                        opacity: 1;
                        transition: all 0.5s ease-in-out;
                    }
                }

                .ag_cover {
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background: rgba(14, 15, 26, 0.8);
                    opacity: 0;
                    transition: all 0.5s ease-in-out;
                    img {
                        transform: translate(-50%, 65px);
                        position: absolute;
                        left: 50%;
                        opacity: 1;
                        transition: all 0.5s ease-in-out;
                    }
                    .tables {
                        width: 340px;
                        margin: 206px auto 0;
                        display: flex;
                        justify-content: flex-start;
                        flex-wrap: wrap;

                        li {
                            width: 93px;
                            height: 93px;
                            margin-bottom: 30px;
                            margin-right: 30px;
                            cursor: pointer;

                            &:nth-child(3) {
                                margin-right: 0;
                            }

                            i {
                                display: inline-block;
                                width: 100%;
                                height: 100%;

                                &.duotai {
                                    background: url(/static/public/image/casino/duotai.png) center center no-repeat;
                                    transition: all 0.4s ease;
                                    &:hover {
                                        background: url(/static/public/image/casino/duotai_hover.png) center center no-repeat;
                                        transition: all 0.4s ease;
                                    }
                                }
                                &.kuaisu {
                                    background: url(/static/public/image/casino/kuaisu.png) center center no-repeat;
                                    transition: all 0.4s ease;
                                    &:hover {
                                        background: url(/static/public/image/casino/kuaisu_hover.png) center center no-repeat;
                                        transition: all 0.4s ease;
                                    }
                                }
                                &.qijian {
                                    background: url(/static/public/image/casino/qijian.png) center center no-repeat;
                                    transition: all 0.4s ease;
                                    &:hover {
                                        background: url(/static/public/image/casino/qijian_hover.png) center center no-repeat;
                                        transition: all 0.4s ease;
                                    }
                                }
                                &.jingmi {
                                    background: url(/static/public/image/casino/jingmi.png) center center no-repeat;
                                    transition: all 0.4s ease;
                                    &:hover {
                                        background: url(/static/public/image/casino/jingmi_hover.png) center center no-repeat;
                                        transition: all 0.4s ease;
                                    }
                                }
                                &.baozhuo {
                                    background: url(/static/public/image/casino/baozhuo.png) center center no-repeat;
                                    transition: all 0.4s ease;
                                    &:hover {
                                        background: url(/static/public/image/casino/baozhuo_hover.png) center center no-repeat;
                                        transition: all 0.4s ease;
                                    }
                                }
                            }
                        }
                    }
                    .btn {
                        display: block;
                        margin: 0 auto;
                        width: 93px;
                        height: 27px;
                        color: #000;
                        text-align: center;
                        line-height: 27px;
                        background: #f7c851;
                        border-radius: 14px;
                        cursor: pointer;
                    }
                }
            }
            .other_games {
                flex: 1;
                height: 100%;

                li {
                    width: 100%;
                    height: 166px;
                    cursor: pointer;
                    position: relative;

                    .enter_cover {
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        background: rgba(14, 15, 26, 0.8);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        opacity: 0;
                        transition: all 0.5s ease-in-out;
                        .name {
                            color: #fff;
                            font-size: 16px;
                            margin-bottom: 14px;
                        }
                        .btn {
                            width: 93px;
                            height: 27px;
                            color: #000;
                            text-align: center;
                            line-height: 27px;
                            background: #f7c851;
                            border-radius: 14px;
                        }
                    }

                    img {
                        position: absolute;
                        top: 50%;
                        transform: translate(40%, -50%);
                    }

                    &.game_bbin {
                        background: url(/static/public/image/casino/bbin_bg.png) center center no-repeat;
                        &:hover {
                            .enter_cover {
                                opacity: 1;
                                transition: all 0.5s ease-in;
                            }
                        }
                    }
                    &.game_ebet {
                        margin: 6px 0;
                        background: url(/static/public/image/casino/ebet_bg.png) center center no-repeat;
                        &:hover {
                            .enter_cover {
                                opacity: 1;
                                transition: all 0.5s ease-in;
                            }
                        }
                    }
                    &.game_bg {
                        background: url(/static/public/image/casino/bg_bg.png) center center no-repeat;
                        &:hover {
                            .enter_cover {
                                opacity: 1;
                                transition: all 0.5s ease-in;
                            }
                        }
                    }
                }
            }
        }

        .casino_box {
            width: 100%;
            height: 300px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: space-between;
            -webkit-justify-content: space-between;
            -ms-flex-pack: space-between;
            justify-content: space-between;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;

            .game_item {
                flex: 1;
                width: 226px;
                height: 100%;
                margin-right: 6px;

                &:last-child {
                    margin-right: 0;
                }
                i {
                    display: block;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    position: relative;

                    .logo {
                        position: absolute;
                        bottom: 24px;
                        left: 50%;
                        transform: translate(-50%, 0);
                        opacity: 1;
                        transition: all 0.5s ease;
                    }

                    .enterBtn {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        opacity: 0;
                        transition: all 0.6s ease;

                        img {
                            margin-bottom: 10px;
                            margin-top: -32px;
                        }
                        .name {
                            color: #fff;
                            font-size: 16px;
                        }
                        .btn {
                            width: 93px;
                            height: 27px;
                            color: #000;
                            text-align: center;
                            line-height: 27px;
                            background: #f7c851;
                            border-radius: 14px;
                            position: absolute;
                            bottom: 30px;
                            left:50%;
                            margin-left: -46.5px;
                        }
                    }

                    &.dg {
                        background: url(/static/public/image/casino/dg_bg.png) center center no-repeat;
                        &:hover {
                            .logo {
                                opacity: 0;
                                transition: all 0.6s ease;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.8);
                                transition: all 0.6s ease;
                            }
                        }
                    }
                    &.ds {
                        background: url(/static/public/image/casino/ds_bg.png) center center no-repeat;
                        &:hover {
                            .logo {
                                opacity: 0;
                                transition: all 0.6s ease;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.8);
                                transition: all 0.6s ease;
                            }
                        }
                    }
                    &.lebo {
                        background: url(/static/public/image/casino/lebo_bg.png) center center no-repeat;
                        &:hover {
                            .logo {
                                opacity: 0;
                                transition: all 0.6s ease;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.8);
                                transition: all 0.6s ease;
                            }
                        }
                    }
                    &.og {
                        background: url(/static/public/image/casino/og_bg.png) center center no-repeat;
                        &:hover {
                            .logo {
                                opacity: 0;
                                transition: all 0.6s ease;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.8);
                                transition: all 0.6s ease;
                            }
                        }
                    }
                    &.lmg {
                        background: url(/static/public/image/casino/lmg_bg.png) center center no-repeat;
                        &:hover {
                            .logo {
                                opacity: 0;
                                transition: all 0.6s ease;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.8);
                                transition: all 0.6s ease;
                            }
                        }
                    }
                    &.ob {
                        background: url(/static/public/image/casino/ob_bg.png) center center no-repeat;
                        &:hover {
                            .logo {
                                opacity: 0;
                                transition: all 0.6s ease;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.8);
                                transition: all 0.6s ease;
                            }
                        }
                    }
                    &.sa {
                        background: url(/static/public/image/casino/sa_bg.png) center center no-repeat;
                        &:hover {
                            .logo {
                                opacity: 0;
                                transition: all 0.6s ease;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.8);
                                transition: all 0.6s ease;
                            }
                        }
                    }
                    &.vr {
                        background: url(/static/public/image/casino/vr_bg.png) center center no-repeat;
                        &:hover {
                            .logo {
                                opacity: 0;
                                transition: all 0.6s ease;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.8);
                                transition: all 0.6s ease;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
