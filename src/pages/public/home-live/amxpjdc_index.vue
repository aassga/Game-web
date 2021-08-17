<template>
    <div class="casino">
        <div class="casino_nav">
            <ul>
                <li v-for="(item,i) in navList" :key="i" @click="getItemIdlive(item)" @mouseover="mOver(i)" @mouseout="mOut(i)">
                    <div class="game_ico"><img :src="item.img" alt=""></div>
                    <div class="game_name">{{item.name}}</div>
                </li>
            </ul>
        </div>

        <div class="casino_content">
            <div class="game_box">
                <ul class="other_games">
                    <li v-for="(item,i) in subList" :key="i" :class="[item.class]"  @click="getItemId(item)">
                        <div class="boxShadow"></div>
                        <div class="enter_cover">
                            <img :src="item.img">
                            <span class="name">{{item.name}}</span>
                            <span class="btn">开始游戏</span>
                        </div>
                    </li>
                </ul>
            </div>
            <ul class="casino_box">
                <li v-for="(item) in casinoList" :key="item.id" :class="['game_item']"  @click="getItemIdTo(item)">
                    <i :class="item.class">
                        <span class="enterBtn">
                            <img :src="item.src" />
                            <span class="name">{{item.name}}</span>
                            <span class="btn">开始游戏</span>
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
                {class:'ag_game', img: '/static/public/image/casino/icon_sx/sx1.png', name: 'AG视讯', id: 31, index: 0 },
                {class:'bbin_game', img: '/static/public/image/casino/icon_sx/sx2.png', name: 'BBIN视讯', id: 32, index: 1 },
                {class:'ebet_game', img: '/static/public/image/casino/icon_sx/sx3.png', name: 'EBET视讯', id: 43, index: 2 },
                {class:'bg_game', img: '/static/public/image/casino/icon_sx/sx4.png', name: 'BG视讯', id: 3180, index: 3 },
                {class:'dg_game', img: '/static/public/image/casino/icon_sx/sx5.png', name: 'DG视讯', id: 42, index: 4 },
                {class:'ds_game', img: '/static/public/image/casino/icon_sx/sx6.png', name: 'DS视讯', id: 34, index: 5 },
                // {class:'lebo_game', img: '/static/public/image/casino/icon_sx/sx7.png', name: 'LEBO视讯', id: 44, index: 6 },
                {class:'og_game', img: '/static/public/image/casino/icon_sx/sx8.png', name: 'OG视讯', id: 48, index: 6 },
                // {class:'lmg_game', img: '/static/public/image/casino/icon_sx/sx9.png', name: 'LMG视讯', id: 45, index: 7 },
                // {class:'ob_game', img: '/static/public/image/casino/icon_sx/sx10.png', name: '欧博视讯', id: 46, index: 9 },
                // {class:'sa_game', img: '/static/public/image/casino/icon_sx/sx11.png', name: 'SA视讯', id: 49, index: 10 },
                {class:'vr_game', img: '/static/public/image/casino/icon_sx/sx12.png', name: 'VR彩票', id: 30, index: 8 },
                {class:'more_game', img: '/static/public/image/casino/icon_sx/sx13.png', name: '敬请期待', index: 9 },
                {class:'more_game', img: '/static/public/image/casino/icon_sx/sx13.png', name: '敬请期待', index: 10 },
                {class:'more_game', img: '/static/public/image/casino/icon_sx/sx13.png', name: '敬请期待', index: 11},
                {class:'more_game', img: '/static/public/image/casino/icon_sx/sx13.png', name: '敬请期待', index: 12}
            ],
            subList: [
                { class: 'game_ag', img: '/static/public/image/casino/AG-logo.png', name: 'AG视讯', id: 31, index: 0 },
                { class: 'game_bbin', img: '/static/public/image/casino/bbin-logo.png', name: 'BBIN视讯', id: 32, index: 1 },
            ],
            casinoList: [
                { class: 'ebet', src: '/static/public/image/casino/ebet_ico.png', name: 'EBET视讯', id: 43, index: 0 },
                { class: 'bg', src: '/static/public/image/casino/bg_ico.png', name: 'BG视讯', id: 3180, index: 1 },
                { class: 'dg', src: '/static/public/image/casino/dg_ico.png', name: 'DG视讯', id: 42, index: 2 },
                { class: 'ds', src: '/static/public/image/casino/ds_ico.png', name: 'DS视讯', id: 34, index: 3 },
                // { class: 'lebo', src: '/static/public/image/casino/lebo_ico.png', name: 'LEBO视讯', id: 44, index: 4 },
                { class: 'og', src: '/static/public/image/casino/og_ico.png', name: 'OG视讯', id: 48, index: 5 },
                // { class: 'lmg', src: '/static/public/image/casino/lmg_ico.png', name: 'LMG视讯', id: 45, index: 6 },
                // { class: 'ob', src: '/static/public/image/casino/ob_ico.png', name: '欧博视讯', id: 46, index: 7 },
                // { class: 'sa', src: '/static/public/image/casino/sa_ico.png', name: 'SA视讯', id: 49, index: 8 },
                { class: 'vr', src: '/static/public/image/casino/vr_ico.png', name: 'VR彩票', id: 30, index: 9 },
                { class: 'more', name: '', index: 10 },
                { class: 'more', name: '', index: 11 }
            ]
        };
    },
    methods: {
         mOver(i){
            if(i<8){
                this.navList[i].img="/static/public/image/casino/icon2/sx"+(i+1)+".png";
            }else{
                this.navList[i].img="/static/public/image/casino/icon2/sx13.png";
            }
        },
        mOut(i){
            if(i<8){
                this.navList[i].img="/static/public/image/casino/icon_sx/sx"+(i+1)+".png";
            }else{
                this.navList[i].img="/static/public/image/casino/icon_sx/sx13.png";
            }
        },
        getItemIdlive(item){
          if(item.name=='敬请期待'){
            return false
          }else{
            this.getItemId(item) 
          }     
        },
        getItemIdTo(item){
            if(item.class=='more'){
                return false
            }else{
                this.getItemId(item) 
            }      
        } 
    },
    created: function() {},
    mounted() {},
    watch: {},
    components: {}
};
</script>

<style lang="less" scoped>
.casino {
    width: 1200px;
    margin: 0 auto;

    .casino_nav {
        box-sizing: border-box;
        margin-top: 20px;
        z-index:99;
        ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;

            li {
                color: #000;
                cursor: pointer;
                width: 191px;
                height: 52px;
                background: #ffffff;
                border-radius: 6px;
                margin-top: 10px;
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
                    font-size: 16px;
                    padding-left: 20px;
                }

                &:hover {
                    color: #ffffff;
                    background:url(/static/public/image/casino/blue_image/hover_btn.png) center center no-repeat;
                    background-size:100% 100%;
                    transform:  scale(1.05);
                    -webkit-transform:  scale(1.05);
                    -ms-transform:  scale(1.05);
                    transition: all 0.3s ease;
                }
            }
        }
    }

    .casino_content {
        width: 100%;
        margin-top: 20px;

        .game_box {
            width: 100%;
            height: 240px;
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
            
            .other_games {
                flex: 1;
                height: 100%;

                li {
                    width: 595px;
                    height: 240px;
                    float: left;
                    border-radius: 10px;
                    overflow: hidden;
                    cursor: pointer;
                    position: relative;
                    .boxShadow{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                    }
                    .enter_cover {
                        position: absolute;
                        width: 298px;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        // opacity: 0;
                        transition: all 0.6s ease;
                        // margin-left: 297px;
                        img {
                            width: 120px;
                            margin-top: 0px;
                            margin-bottom: 20px;
                        }
                        .name {
                            color: #fff;
                            font-size: 18px;
                            margin-bottom: 20px;
                        }
                        .btn {
                            width: 142px;
                            height: 42px;
                            color: #fec35d;
                            text-align: center;
                            font-size: 18px;
                            line-height: 42px;
                            border-radius: 5px;
                            background: rgba(0,0,0,0.3);
                            border: 1px solid #fec35d;
                            display: none;
                            // position: absolute;
                            // bottom: 30px;
                            // left:50%;
                            // opacity: 0;
                            // transform:translateX(-50%); 
                        }
                    }
                    &.game_ag {
                        background: url(/static/public/image/casino/blue_image/ag_bg.png) center center no-repeat;
                        background-size: cover;
                        &:hover {
                            .boxShadow{
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.5);
                                transition: all 0.6s ease;
                            }
                            .btn{
                                display: block;
                            }
                        }
                    }
                    &.game_bbin {
                        background: url(/static/public/image/casino/blue_image/bbin_bg.png) center center no-repeat;
                        background-size: cover;
                        &:hover {
                            .boxShadow{
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.5);
                                transition: all 0.6s ease;
                            }
                            .btn{
                                display: block;
                            }
                        }
                    }
                }
                li:nth-child(2n){
                    float: right;
                    padding-left: 297px;
                }
            }
        }

        .casino_box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;

            .game_item {
                color: #fff;
                cursor: pointer;
                width: 293px;
                height: 302px;
                border-radius: 10px;
                margin-top: 10px;
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                overflow: hidden;
                -webkit-box-pack: center;
                -webkit-justify-content: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                -webkit-align-items: center;
                -ms-flex-align: center;
                align-items: center;
                &:last-child {
                    margin-right: 0;
                }
                i {
                    display: block;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    position: relative;

                    .enterBtn {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        // opacity: 0;
                        transition: all 0.6s ease;

                        img {
                            margin-top: 126px;
                            margin-bottom: 20px;
                            transform: scale(1.2);
                        }
                        .name {
                            color: #fff;
                            font-size: 18px;
                            margin-bottom: 20px;
                        }
                        .btn {
                            width: 142px;
                            height: 42px;
                            color: #fec35d;
                            text-align: center;
                            font-size: 18px;
                            line-height: 42px;
                            border-radius: 5px;
                            background: rgba(0,0,0,0.3);
                            border: 1px solid #fec35d;
                            position: absolute;
                            bottom: 30px;
                            left:50%;
                            opacity: 0;
                            transform:translateX(-50%); 
                        }
                    }
                    &.ebet {
                        background: url(/static/public/image/casino/blue_image/ebet_bg.png) center center no-repeat;
                        background-size: cover;
                        &:hover {
                            img {
                                margin-top: 40px;
                                margin-bottom: 20px;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.5);
                                transition: all 0.6s ease;
                            }
                            .btn{
                                opacity: 1; 
                            }
                        }
                    }
                    &.bg {
                        background: url(/static/public/image/casino/blue_image/bg_bg.png) center center no-repeat;
                        background-size: cover;
                        &:hover {
                            img {
                                margin-top: 40px;
                                margin-bottom: 20px;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.5);
                                transition: all 0.6s ease;
                            }
                            .btn{
                                opacity: 1; 
                            }
                        }
                    }
                    &.dg {
                        background: url(/static/public/image/casino/blue_image/dg_bg.png) center center no-repeat;
                        background-size: cover;
                        &:hover {
                        
                            img {
                                margin-top: 40px;
                                margin-bottom: 20px;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.5);
                                transition: all 0.6s ease;
                            }
                            .btn{
                                opacity: 1; 
                            }
                        }
                    }
                    &.ds {
                        background: url(/static/public/image/casino/blue_image/ds_bg.png) center center no-repeat;
                        background-size: cover;
                        &:hover {
                         
                             img {
                                margin-top: 40px;
                                margin-bottom: 20px;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.5);
                                transition: all 0.6s ease;
                            }
                            .btn{
                                opacity: 1; 
                            }
                        }
                    }
                    &.og {
                        background: url(/static/public/image/casino/blue_image/og_bg.png) center center no-repeat;
                        background-size: cover;
                        &:hover {
                            img {
                                margin-top: 40px;
                                margin-bottom: 20px;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.5);
                                transition: all 0.6s ease;
                            }
                            .btn{
                                opacity: 1; 
                            }
                        }
                    }
                    &.lmg {
                        background: url(/static/public/image/casino/blue_image/lmg_bg.png) center center no-repeat;
                        background-size: cover;
                        &:hover {
                            img {
                                margin-top: 40px;
                                margin-bottom: 20px;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.5);
                                transition: all 0.6s ease;
                            }
                            .btn{
                                opacity: 1; 
                            }
                        }
                    }
                    &.vr {
                        background: url(/static/public/image/casino/blue_image/vr_bg.png) center center no-repeat;
                        background-size: cover;
                        &:hover {
                            img {
                                margin-top: 40px;
                                margin-bottom: 20px;
                            }
                            .enterBtn {
                                opacity: 1;
                                background: rgba(14, 15, 26, 0.5);
                                transition: all 0.6s ease;
                            }
                            .btn{
                                opacity: 1; 
                            }
                        }
                    }
                    &.more {
                        background: url(/static/public/image/casino/blue_image/more.png) center center no-repeat;
                        background-size: cover;
                        // &:hover {
                        //     img {
                        //         margin-top: 40px;
                        //         margin-bottom: 20px;
                        //     }
                        //     .enterBtn {
                        //         opacity: 1;
                        //         background: rgba(14, 15, 26, 0.35);
                        //         transition: all 0.6s ease;
                        //     }
                        //     .btn{
                        //         opacity: 1; 
                        //     }
                        // }
                    }
                }
            }
        }
    }
}
</style>
