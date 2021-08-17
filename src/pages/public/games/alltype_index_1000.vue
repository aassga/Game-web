<template>
    <div id="maincontainer">
        <div class="content">
            <!-- 一级导航 -->
            <div class="list_nav" :style="themes.allbgStyle">
                <ul>
                    <li v-for="(item, index) in list_nav" :key="index" :style="[nav_active == item.id?themes.oneCheckedStyle:themes.oneStyle]" @click="setNav(item)"><p>{{item.name}}</p></li>
                </ul>
                <div class="seek">
                    <img :src="'/static/'+themes.name+'/img/new_games/coin-l.png'" alt="">
                    <input type="text" placeholder="请输入游戏名称" ref="inputVal" :style="themes.inputStyle" v-model="iptVal" @keyup.enter="search()">
                    <a href="javascript:void(0);" @click="search()" :style="{background:themes.oneCheckedStyle.background}">
                        <i :style="{background:'url(/static/'+themes.name+'/img/new_games/sou.png) center center/100% no-repeat'}"></i>
                    </a>
                </div>
            </div>
            <!-- 平台导航 -->
            <div class="content_box" v-show="nav_active == 9" :style="themes.allbgStyle">
                <div class="list_gams" v-show="nav_active == 9">
                    <span class="slidePrev" @click="setSwiper(3)" @mouseover="changeSrc1" @mouseout="changeSrc2" :style="{borderRight:themes.borderStyle}"><i :style="{background:'url('+leftImageSrc+') center center / 17px no-repeat'}"></i></span>
                    <swiper :options="swiperOption1" ref="mySwiper1">
                        <swiper-slide v-for="(item,index) in listDatas.platform" :key="index">
                            <div class='gams_list' :style="{borderRight:themes.borderStyle}" @click="setGameMaker(item)">
                                <img :src="'/static/' +themes.name+ '/img/new_games/new_icon'+ (active == item.id ? '_a/' : '/') + item.id+'.png'" :alt="index">
                                <p :style="[active == item.id?themes.twoCheckedStyle:themes.twoStyle]">{{item.name}}</p>
                            </div>
                        </swiper-slide>
                    </swiper>
                    <span class="slideNext" @click="setSwiper(4)" @mouseover="changeSrc3" @mouseout="changeSrc4" :style="{borderLeft:themes.borderStyle}"><i :style="{background:'url('+rightImageSrc+') center center / 17px no-repeat'}"></i></span>
                </div>
            </div>
            <!-- 推荐游戏 -->
            <div class="content_boxer" v-show="nav_active !=9&&swiperList.length>0" :style="themes.allbgStyle">
                <!-- <img :src="'/static/'+themes.name+'/img/new_games/coin-bg.png'" class="img_bg" alt=""> -->
                <div class="title_line" v-show="nav_active != 9"><img :src="'/static/'+themes.name+'/img/new_games/tjyx.png'" alt=""></div>
                <div class="list_gamser" v-show="nav_active != 9">
                    <span class="slidePrev" @click="setSwiper(5)" @mouseover="changeSrc1" @mouseout="changeSrc2"><i :style="{background:'url('+leftImageSrc+') center center / 17px no-repeat'}"></i></span>
                    <swiper :options="swiperOption2" ref="mySwiper2">
                        <swiper-slide v-for="(item,index) in swiperList" :key="index">
                            <div class="gams_lister">
                                <div class="img_boxer" :style="themes.liStyle">
                                    <img :src="item.icon" alt="">
                                    <i v-show="item.Hot == 1"></i>
                                    <p :style="{color:themes.otherColor.leftColor}">{{item.name}}</p>
                                    <div class="list_btn">
                                        <span class="begin" :style="themes.btnColor" @click="loginGame(item)">开始游戏</span>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                    <span class="slideNext" @click="setSwiper(6)" @mouseover="changeSrc3" @mouseout="changeSrc4"><i :style="{background:'url('+rightImageSrc+') center center / 17px no-repeat'}"></i></span>
                </div>
            </div>
            <!-- 展示列表 -->
            <div class="list_box" :style="themes.allbgStyle">
                <div class="box">
                    <ul class="list_type" :style="{borderBottom:themes.borderColor}" v-show="nav_active == 9 && GameTypeList.length>1">
                        <li :style="themes.twoCheckedStyle">游戏类型：</li>
                        <li v-for="(item, index) in GameTypeList" :key="index" :style="[gameType_active == item.id?themes.fourCheckedStyle:themes.fourStyle]" @click="setGameType(item)">{{item.name}}</li>
                    </ul>
                    <ol class="list_line" :style="{borderBottom:themes.borderColor}" v-show="nav_active == 9 && gameTitleList.length>1">
                        <li :style="themes.twoCheckedStyle">赔付线数：</li>
                        <li v-for="(item, index) in gameTitleList" :key="index" :style="[gameTitle_active == item.id?themes.fourCheckedStyle:themes.fourStyle]" @click="setGameTitle(item)">{{item.name}}</li>
                    </ol>
                    <div class="title_line" v-show="nav_active != 9"><img :src="'/static/'+themes.name+'/img/new_games/'+this.showName+'_bg.png'" alt="" v-if="showName!=''"></div>
                    <div class="noSuit" v-show="searchListShow">
                        <span :style="themes.Souti" >未找到符合条件的相关游戏 , 以下是为您推荐的热门游戏</span>
                    </div>
                    <div class="noSuit" v-show="showGameList.length<1">
                        <span :style="themes.Souti" >—————————— 未找到符合条件的相关游戏 ——————————</span>
                    </div>
                    <ul class="img_box">
                        <li v-for="(item, index) in showGameList" :key="index" :style="themes.liStyle">
                            <div class="itemBox">
                                <img v-lazy="item.icon" alt="">
                                <span v-if="item.line" :style="{background:themes.otherColor.lineBgColor}">{{item.line}}</span>
                            </div>
                            <i v-show="item.Hot == 1"></i>
                            <div class="textBox">
                                <span class="leftName" :style="{color:themes.otherColor.leftColor}">{{item.name}}</span>
                                <span class="rightName" :style="{color:themes.otherColor.rightColor}">{{idToName(item.upid)}}</span>
                            </div>
                            <div class="list_btn">
                                <span class="begin" :style="themes.btnColor" @click="loginGame(item)">开始游戏</span>
                                <span class="collect" v-show="item.love == 'no'" @click="joinCollect(item,index)" :style="{background:'url(/static/'+themes.name+'/img/new_games/qxshoucang.png) center center no-repeat'}"></span>
                                <span class="collectY" v-show="item.love == 'yes'" @click="cancelCollect(item,index)" :style="{background:'url(/static/'+themes.name+'/img/new_games/shoucang.png) center center no-repeat'}"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from './public.js';
import slotMixin from './alltypeSlot.js';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
let vm = null;
export default {
    mixins: [mixin,slotMixin],
    components: {
        swiper,
        swiperSlide,
    },
    props:{
        themes:{
            type:Object
        }
    },
};
</script>

<style lang="less" scoped>
#maincontainer{
    .content{
        width: 100%;
        height: auto;
        padding-top: 20px;
        padding-bottom: 20px;
        .list_nav{
            position: relative;
            width: 1000px;
            height: 60px;
            margin: 0 auto 20px auto;
            background:#fff;
            display: flex;
            justify-content: space-between;
            box-shadow: 0px 1px 4px 0px rgba(28, 26, 123, 0.11);
            overflow: hidden;
            align-items: center;
            &>ul{
                width: 950px;
                height: 60px;
                overflow: hidden;
                li{
                    width: 97px;
                    height: 60px;
                    line-height: 60px;
                    display: inline-block;
                    transform:skewX(20deg);
                    text-align: center;
                    cursor: pointer;
                    p{
                        transform:skewX(-20deg);
                        font-size: 16px;
                        // color: #000;
                    }
                }
                li:first-child{
                    margin-left: -12px;
                    padding-left: 12px;
                }
            }
            .seek{
                width: 268px; // 搜索框外层修改我268px
                height: 60px;
                position: relative;
                padding-right: 20px; // 右内边距修改为20px
                display: flex;
                justify-content: flex-end;
                align-items: center;
                input{
                    position: absolute;
                    top: 15px;
                    right: 63px;
                    width: 155px; // 搜索框修改为200px
                    height: 31px;
                    line-height: 31px;
                    font-size: 14px;
                    padding: 0 10px;
                    z-index: 1;
                    display: inline-block;
                    border-right:none;
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    outline: none;
                }
                a{
                    position: absolute;
                    top: 15px;
                    right: 23px; // 按钮往右23px
                    display: inline-block;
                    width: 40px; // 搜索按钮宽度修改为40px
                    height: 31px;
                    z-index: 1;
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    cursor: pointer;
                    i{
                        display: block;
                        width: 22px;
                        height: 22px;
                        margin: 5px auto;
                    }
                }
                img{
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    width: 220px; // 搜索框背景图片修改为220px
                    height: 60px;
                }
            }
        }
        .content_box{
            width: 1000px;
            margin: 0 auto;
            .list_img{
                position: relative;
                width: 1000px;
                height: 119px;
                margin:20px auto;
                padding: 0 40px;
                display: flex;
                &>span{
                    position: absolute;
                    top: 0;
                    display: flex;
                    width: 30px;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    background: #fff;
                    cursor:pointer;
                    i{
                        display: block;
                        width: 17px;
                        height: 33px;
                    }
                }
                .slidePrev{
                    left: 0;
                }
                .slideNext{
                    right: 0;
                }
                .list_img_btn{
                    padding: 0 10px;
                    overflow: hidden;
                    img{
                        width: 500px;
                        cursor: pointer;
                    }
                }
                
            }
            .list_gams{
                position: relative;
                width: 1000px;
                height: 119px;
                margin:20px auto;
                padding: 0 40px;
                box-sizing: border-box;
                box-shadow: 0px 1px 4px 0px rgba(28, 26, 123, 0.11);
                display: flex;
                &>span{
                    position: absolute;
                    top: 0;
                    display: flex;
                    width: 42px;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    cursor:pointer;
                    i{
                        display: block;
                        width: 17px;
                        height: 33px;
                    }
                }
                .slidePrev{
                    left: 0;
                }
                .slideNext{
                    right: 0;
                }
                .gams_list{
                    width: 140px;
                    height: 119px;
                    display: flex;
                    flex-direction:  column;
                    justify-content: center;
                    align-items: center;
                    cursor:pointer;
                    img{
                        width: 55%;
                        margin: 0 auto;
                    }
                    p{
                        margin-top: 20px;
                    }
                }
            }
        }
        .content_boxer{
            width: 1000px;
            height: 319px;
            margin: 0 auto;
            box-shadow: 0px 1px 4px 0px rgba(28, 26, 123, 0.11);
            position: relative;
            overflow: hidden;
            .img_bg{
                position: absolute;
                top: -22px;
                left: -100px;
            }
            .title_line{
                padding-left: 30px;
                padding-top: 20px;
                height: 38px;
                img{
                    height: 18px;
                }
            }
            .list_img{
                position: relative;
                width: 1000px;
                height: 307px;
                margin:20px auto;
                padding: 0 40px;
                display: flex;
                &>span{
                    position: absolute;
                    top: 0;
                    display: flex;
                    width: 30px;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    background: #fff;
                    cursor:pointer;
                    i{
                        display: block;
                        width: 17px;
                        height: 33px;
                    }
                }
                .slidePrev{
                    left: 0;
                }
                .slideNext{
                    right: 0;
                }
                .list_img_btn{
                    padding: 0 10px;
                    overflow: hidden;
                    img{
                        width: 500px;
                        cursor: pointer;
                    }
                }
                
            }
            .list_gamser{
                position: relative;
                width: 1000px;
                height: 282px;
                padding: 0 30px;
                &>span{
                    position: absolute;
                    top: 0;
                    display: flex;
                    width: 30px;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    cursor:pointer;
                    i{
                        display: block;
                        width: 17px;
                        height: 33px;
                    }
                }
                .slidePrev{
                    left: 0;
                }
                .slideNext{
                    right: 0;
                }
                .gams_lister{
                    width: 228px;
                    height: 282px;
                    overflow: hidden;
                    display: flex;
                    flex-direction:  column;
                    justify-content: center;
                    align-items: center;
                    cursor:pointer;
                    .img_boxer{
                        position: relative;
                        width: 200px;
                        height: 232px;
                        padding: 11px 11px 0 11px;
                        margin-left: 16px;
                        margin-right: 11px;
                        overflow: hidden;
                        border-radius: 4px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        img{
                            width:178px;
                            height: 178px;
                            border-radius: 4px;
                        }
                        i{
                            position: absolute;
                            top:18px;
                            right: 20px;
                            display: block;
                            width: 20px;
                            height: 26px;
                        }
                        p{
                            font-size: 16px;
                            text-align: center;
                            line-height: 42px;
                            color: #000;
                        }
                        div.list_btn{
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 0;
                            background: rgba(0,0,0,0);
                            z-index: 0;
                            transition: all .3s;
                            display: flex;
                            flex-direction: column ;
                            justify-content: center;
                            align-items: center;
                            overflow: hidden;
                            &>span{
                                display: block;
                                width: 114px;
                                height: 36px;
                                line-height: 36px;
                                text-align: center;
                                font-size: 16px;
                                margin-bottom: 20px;
                                border-radius:4px;
                                cursor:pointer;
                            }
                            .collect{
                                color: #fff;
                                background: #FF5F00;
                            }
                        }
                    }
                    .img_boxer:nth-child(5n+5){
                        margin-right: 0;
                    }
                    .img_boxer:hover{
                        div.list_btn{
                            height: 100%;
                            background: rgba(0,0,0,.5);
                            z-index: 1;
                        }
                    }
                        
                }
                div.active{
                    p{
                        color: #EB410A;
                    }
                }
            }
        }
        .list_box{
            width: 1000px;
            margin: 20px auto;
            background: #fff;
            box-shadow:0px 1px 4px 0px rgba(28,26,123,0.11);
            .box{
                position: relative;
                width: 1000px;
                padding: 20px 30px;
                background: rgba(0,0,0,0);
                 .img_l{
                    position: absolute;
                    left: -45px;
                    top: 20px;
                    width: 141px;
                }
                .img_r{
                    position: absolute;
                    top: -20px;
                    right: -105px;
                    width: 266px;
                }
                .list_type,.list_line{
                    width: 100%;
                    height: 42px;
                    display: flex;
                    align-items: center;
                    
                    li{
                        font-size: 16px;
                        line-height: 25px;
                        padding: 0 10px;
                        color: #0F1724;
                        cursor:pointer;
                    }
                    li:first-child{
                        padding: 0;
                        cursor: default;
                    }
                }
                .title_line{
                    height: 18px;
                    img{
                        height: 18px;
                    }
                }
                .img_box{
                    width: 100%;
                    display: flex;
                    flex-wrap:  wrap;
                    margin-top: 16px;
                    justify-content: flex-start;
                    align-items: center;
                    li{
                        position: relative;
                        width: 165px; // 游戲列表项修改为165px
                        height: 232px;
                        padding: 11px 11px 0 11px;
                        margin-bottom: 20px;
                        margin-right: 28px; // 右边距修改为28px
                        overflow: hidden;
                        box-shadow:rgba(238,238,238,0.5) 0px 1px 4px 2px;
                        border-radius: 4px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .itemBox{
                            width: 165px;
                            height: 178px;
                            border-radius: 4px;
                            overflow: hidden;
                            position: relative;
                            img{
                                width: 143px; // 图片宽度修改为143px
                                height: 165px;// 图片高度修改为165px
                            }
                            span{
                                font-size: 14px;
                                text-align: center;
                                width: 52px;
                                height: 22px;
                                line-height: 22px;
                                border-bottom-right-radius: 6px;
                                border-top-right-radius: 6px;
                                color:#fff;
                                position: absolute;
                                left: 0;
                                bottom: 0;
                            }
                        }
                        i{
                            position: absolute;
                            top:18px;
                            right: 20px;
                            display: block;
                            width: 20px;
                            height: 26px;
                        }
                        .textBox{
                            width: 178px;
                            height: 42px;
                            position: relative;
                            span{
                                position: absolute;
                                top: 0;
                                font-size: 16px;
                                text-align: center;
                                color: #0F1724;
                                margin: 13px 0;
                            }
                            .leftName{
                                left: 0;
                                text-overflow:ellipsis;
                                overflow:hidden;
                                white-space:nowrap;
                                width: 145px;
                                color: #fff;
                            }
                            .rightName{
                                right: 0;
                            }
                        }
                        div.list_btn{
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 0;
                            background: rgba(0,0,0,0);
                            z-index: 0;
                            transition: all .3s;
                            display: flex;
                            flex-direction: column ;
                            justify-content: center;
                            align-items: center;
                            overflow: hidden;
                            &>span{
                                display: block;
                                width: 114px;
                                height: 36px;
                                line-height: 36px;
                                text-align: center;
                                font-size: 16px;
                                margin-bottom: 20px;
                                border-radius:4px;
                                cursor:pointer;
                            }
                            .collect{
                                background-size: 36px 36px;
                            }
                            .collectY{
                                background-size: 36px 36px;
                            }
                        }
                    }
                    li:nth-child(5n+5){
                        margin-right: 0;
                    }
                    li:hover{
                        div.list_btn{
                            height: 100%;
                            background: rgba(0,0,0,.5);
                            z-index: 1;
                        }
                    }
                }
                // .paging_nav{
                //     width: 100%;
                //     height: 32px;
                //     margin-top: 10px;
                //     display: flex;
                //     justify-content: center;
                //     align-items: center;
                //     li{
                //         height: 32px;
                //         line-height: 32px;
                //         border:1px solid #B2B2B2;
                //         border-radius: 4px;
                //         padding: 0 19px;
                //         margin-right: 12px;
                //         font-size:14px ;
                //         text-align: center;
                //         color: #BABABA;
                //         cursor:no-drop;
                //     }
                //     li.page{
                //         border:1px solid #FF6406;
                //         color: #FF6406;
                //         cursor: default;
                //     }
                //     li.btn_a{
                //         background: #FF5F00;
                //         border:1px solid #FF5F00;
                //         color: #fff;
                //         cursor:pointer;
                //     }
                // }
                // .jiazai{
                //     width: 100%;
                //     height: 40px;
                //     display: flex;
                //     justify-content: center;
                //     align-items: center;
                //     img{
                //         width: 30px;
                //         margin-right: 9px;
                //     }
                //     span{
                //         font-size: 14px;
                //         color: #FFB359;
                //     }
                // }
                .noSuit {
                    width: 100%;
                    height: 140px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span {
                        font-size: 16px;
                        color: #ffb359;
                    }
                }
            }
            
        }
    }
}



</style>
