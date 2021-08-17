<template>
    <div class="register" v-if="isResiter">
        <div class="popup">
            <div class="headline">
                <!-- <p>注册blr会员</p>
                <p>开启您的财富之旅</p> -->
                <img src="/static/blr/img/headFont.png" alt="">
            </div>
            <div class="swiper-content">
                <swiper ref="mySwiper" :options="swiperOption" class="show-swiper">
                <template v-for="(item, index) in list">
                    <swiper-slide :key="index">
                    <div class="swiper-item">
                        <img :src="item.img" alt="">
                    </div>
                    </swiper-slide>
                </template>
                </swiper>
            </div>
            <div class="content">
                <div class="title_tab">
                    <ul>
                        <li>
                            <a class="cur" href="javascript:void(0)">注册帐号</a>
                        </li>
                    </ul>
                    <div class="close1" @click="close">
                        <a href="javascript:void(0)">
                            <span class="closeBox"></span>
                            <img src="/static/blr/img/xx.png" alt="">
                        </a>
                    </div>
                </div>
                <div class="row">
                    <label>会员帐号：</label>
                    <div class="group">
                        <input autocomplete="off" type="text" placeholder="请输入6到10位的数字或字母组合" maxlength="10" v-model="userName"
                            @blur="getCode">
                    </div>
                </div>

                <div class="row">
                    <label>登入密码：</label>
                    <div class="group">
                        <input autocomplete="off" type="password" placeholder="请输入8到20位的数字或字母组合" maxlength="20" v-model="password">
                    </div>
                </div>

                <div class="row">
                    <label>确认密码：</label>
                    <div class="group">
                        <input autocomplete="off" type="password" placeholder="请输入8到20位的数字或字母组合" maxlength="20"
                            v-model="password_confirmation">
                    </div>
                </div>

                <!-- 手机号等信息 -->
                <div v-for="(item,index) in register" :key="index">
                    <div v-if="JSON.stringify(item) !== '{}' " class="row">
                        <label>{{item.name}}：</label>
                        <div class="group">
                            <input type="text" :placeholder="item.placeholder" v-model="item.value" :maxlength="item.maxlength">
                        </div>
                    </div>
                </div>

                <!-- 短信验证码 -->
                <sms-input v-if="isShowSms" :qygj="theName" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :star="star"
                    :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend" :reSend="reSend"
                    :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms" :hasSendMsg="hasSendMsg"
                    :countDownTime="countDownTime" :paddingBottom2="paddingBottom2" bColor="#007b5b">
                </sms-input>

                <div v-if="!isShowSms&&!isShowTnCode" class="row">
                    <label style="padding-left: 18px;">验证码：</label>
                    <div class="group">
                        <input autocomplete="off" type="text" placeholder="请输入验证码" v-model="code" maxlength="4" style="width:158px">
                        <span class="yzm_reg">
                            <img class="checkLoginCodeImage" :src="codeImg" @click="getCode">
                        </span>
                    </div>
                </div>
                 <div class="row" v-if="iscode">
                    <label style="padding-left: 18px;">邀请码：</label>
                    <div class="group">
                        <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="邀请码" type="text"
                            v-model="intacode" :readonly="incodeReadonly">
                    </div>
                </div>
                <div class="operate">
                    <a class="btn" @click="registerTest">立即注册</a>
                </div>

                <div class="row tip_info">
                    <p>完成即视为同意已年满18岁，且在此网站所有活动并没抵触本人所在国家所管辖的法律</p>
                </div>
            </div>
            <div class="stepTree">
                <p>全网首家出款系统<br/>对接银行中服中心,<br/>出入款即时到账,大额无忧</p>
                <p> <span>红包雨领不停,</span> <span>只要您注册存款游戏,</span><br/><span>红包天天领,100%中奖!</span></p>
                <p>金管家理财,<br/>每月派发工资,终身受益</p>
            </div>
        </div>
    </div>
</template>

<script>

import store from '@/vuex/store';
import UserService from '@/service/public/UserService';
import { postS, getS } from '@/service/public/service.js';
import data2 from '../../public/user/register_copy';
import smsInput from '../../public/home/smsInput';

export default {
    mixins: [data2],
    components: { smsInput },
    data() {
        return {
            list: [
                {img:"/static/blr/img/sl1.png"},
                {img:"/static/blr/img/sl2.png"},
                {img:"/static/blr/img/sl3.png"},
            ],
            codeImg:"/static/blr/img/new_games/re.png",
            smsInputBox: {
                marginTop: '18px'
            },
            theName:"bet365_1",
            smsCodeWrapper: {
                position: 'relative',
                fontSize: '16px',
                color: '#333',
                textAlign: 'center'
            },
            paddingBottom2: '5px',
            curLabel: {
                width: '84px',
                height: '25px',
                lineHeight: '25px',
                color: '#989898',
                fontSize: '19px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-217px)'
            },
            star: {
                display: 'none'
            },
            inputBox: {
                width: '152px',
                height: '40px',
                border: '1px solid #ebecef',
                borderRadius: '3px',
                color: '#000',
                fontSize: '12px',
                outline: 'none',
                paddingLeft: '12px',
                transform: 'translateX(-220px)'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '0',
                right: '297px',
                marginLeft: '2px',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '142px'
            },
            btnStyle: {
                display: 'inline-block',
                width: '90px',
                height: '40px',
                lineHeight: '40px',
                fontSize: '14px',
                borderRadius: '3px',
                transform: 'translateY(1px)',
            },
            beforeSend: {
                 color: '#fff',
                 background: '#069772'
            },
            reSend: {
                 color: '#006f51',
                 background: '#f8e423'
            },
            msgTip: {
                margin: '5px 0 16px 122px',
                color: '#333',
                fontSize: '12px'
            },
            swiperOption: {
                watchSlidesProgress: true,
                slidesPerView: 'auto',
                centeredSlides: true,
                loopedSlides: 4,
                loop:true,
                autoplay:{
                    delay:3000,
                    disableOnInteraction:false
                },
                centeredSlides: true,
                // 当你创建一个Swiper实例时是否立即初始化，这里我们手动初始化
                init: true,
                longSwipesRatio: 0.1,
                touchReleaseOnEdges: true,
                observer: true, // 修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, // 修改swiper的父元素时，自动初始化swiper
                on: {
                    progress: function (progress) {
                    for (var i = 0; i < this.slides.length; i++) {
                        var slide = this.slides.eq(i);
                        var slideProgress = this.slides[i].progress;
                        let modify = 0 // 偏移权重
                        if (parseInt(Math.abs(slideProgress)) > 0) {
                            modify = Math.abs(slideProgress) * 0.2 // 不一定要0.2，可自行调整
                        }
                        const translate = slideProgress * modify * 260 + 'px' // 500是swiper-slide的宽度
                        const scale = 1 - Math.abs(slideProgress) / 5 // 缩放权重值，随着progress由中向两边依次递减，可自行调整
                        const zIndex = 99 - Math.abs(Math.round(10 * slideProgress))
                        slide.transform(`translateX(${translate}) scale(${scale})`)
                        slide.css('zIndex', zIndex)
                        slide.css('opacity', 1) // 是否可见
                        if (Math.abs(slideProgress) > 3) {
                            slide.css('opacity', 0);
                        }
                        if (parseInt(Math.abs(slideProgress)) > 1) { // 设置了只有选中的元素以及他两遍的显示，其他隐藏
                                slide.css('opacity', 0);
                        }
                    }
                    },
                    setTransition: function (transition) {
                        for (var i = 0; i < this.slides.length; i++) {
                            var slide = this.slides.eq(i)
                            slide.transition(transition);
                        }
                    }
                }
            }
        };
    },
    created() {
    },
    mounted() {
        this.initSwiper()
    },
    methods: {
        initSwiper() {
            this.$nextTick(async() => {
                // await this.swiper.init() // 现在才初始化
                await this.swiper.slideTo(this.activeItemIndex)
            })
        },
        close() {
            this.userName = '';
            this.password = '';
            this.password_confirmation = '';
            this.code = '';
            this.replaceMent();
            this.$store.commit('cjw/showRegister', false);
        }
    },
    computed: {
        isResiter() {
            return this.$store.state.cjw.registerShow;
        },
        swiper() {
            return this.$refs.mySwiper.swiper;
        },
        activeItemIndex(){
            return this.$store.state.alert.activeIndexs;
        }
    },
    watch:{
       isResiter:function(val){
            if(val){
                this.inInCreate();
                this.inInMounted();
            }
       }
    },
    store
};
</script>

<style lang="less" scoped>
.swiper-content {
  width: 640px;
  height: 100%;
  position: relative;
  opacity: hidden;
  margin: 0 auto;
  padding-top: 10px;
  opacity: hidden;

  .show-swiper {
    width: 620px;
    height: 100%;
    top: 0;
    left: 0;
    padding-bottom: 20px;
    opacity: hidden;
    .swiper-slide {
      width: 260px;
      // 表示所有属性都有动作效果，过度时间为0.4s，以慢速开始和结束的过渡效果
      transition: all .4s cubic-bezier(.4, 0, .2, 1);
      border-radius: 10px;
      opacity: hidden;
      background: #000;
      box-shadow: 0px 15px 17px -10px #3e3c3c;
      .swiper-item {
        width: 100%;
        border-radius: 6px;
        color: orangered;
        font-size: 24px;
        img{
            width: 100%;
            border-radius:6px;
        }
      }
    }
  }
}
.register {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1900;

    .popup {
        position: absolute;
        width: 774px;
        
        top: 50%;
        left: 50%;
        min-height: 200px;
        transform: translate(-50%,-50%);
        background: #fff;
        border-radius: 10px;
        .headline {
            height: 122px;
            background-image: linear-gradient(160deg, #7faaff 30%, #07cacc 70%);
            border-radius: 10px 10px 0 0;
            background: url('/static/blr/img/bg_reg_title.png');
            background-size: contain;
            img{
                width: 320px;
                margin: 14px 0 0 400px;
            }
            p {
                font-size: 27.4px;
                color: #fff;
                position: absolute;
                left: 350px;
                top: 30px;
            }

            p:nth-child(2) {
                left: 450px;
                top: 70px;
            }
        }
        .stepTree{
            width: 335px;
            height: 370px;
            background: url("/static/blr/img/trees.png") no-repeat ;
            background-size:100% 100% ;
            position: absolute;
            top: 285px;
            right: 14px;
            p{
                color: #858c89;
                font-size: 14px;
                line-height: 18px;
                &:first-child{
                    position: absolute;
                    top: 93px;
                    left: -20px;
                }
                &:nth-child(2){
                    position: absolute;
                    top: 144px;
                    left: 193px;
                    width: 200px;
                    span{
                        &:first-child{
                            display: block;
                            margin-left: 59px;
                        }
                        &:nth-child(2){
                            margin-left: 16px;
                        }
                    }
                }
                &:last-child{
                    position: absolute;
                    bottom: 65px;
                    left: 10px;
                }
            }
        }
        .content {
            padding: 0px 40px 10px;
            height: 422px;
            .title_tab {
                height: 40px;
                overflow: hidden;
                padding-bottom: 10px;
                border-bottom: 1px solid #ebecef;
                width: 345px;
                ul {
                    li {
                        float: left;

                        a {
                            display: block;
                            height: 40px;
                            color: #3c3c3c;
                            font-size: 24px;
                            
                        }

                        .cur {
                            position: relative;
                            color: #00a97d;
                            font-weight: bold;
                        }

                        .cur:after {
                            content: '';
                            position: absolute;
                            bottom: 1px;
                            left: 0;
                            width: 100%;
                            height: 2px;
                            background: #00a97d;
                        }
                    }
                }

                .close1 {
                    position: absolute;
                    width: 50px;
                    height: 40px;
                    top: 15px;
                    right: 0;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 20px 0 0 20px;

                    a {
                        display: block;
                        height: 100%;
                    }
                    .closeBox {
                        width: 32px;
                        height: 32px;
                        background: white;
                        border-radius: 50%;
                        position: absolute;
                        left: 6px;
                        top: 4px;
                    }

                    img {
                        width: 25px;
                        height: 24px;
                        position: absolute;
                        left: 9px;
                        top: 8px;
                        transition: transform 0.3s ease-in-out;
                    }

                    i {
                        display: inline-block;
                        width: 32px;
                        height: 32px;
                        text-align: center;
                        line-height: 34px;
                        font-size: 18px;
                        margin: 4px;
                        color: #0a9899;
                        border-radius: 50%;
                        background: #fff;
                        transition: transform 0.3s ease-in-out;
                    }
                }

                .close1:hover img {
                    transform: rotate(90deg);
                }
            }

            .row {
                clear: both;
                overflow: hidden;
                margin-top: 18px;

                label {
                    float: left;
                    display: block;
                    width: 95px;
                    height: 40px;
                    line-height: 40px;
                    font-size: 19px;
                    color: #989898;
                    font-family: '微软雅黑';
                    text-align: left;
                }

                .group {
                    float: left;
                    overflow: hidden;

                    input {
                        width: 250px;
                        height: 40px;
                        box-sizing: border-box;
                        padding: 5px 10px;
                        font-size: 18px;
                        line-height: 30px;
                        border: 1px solid #ebecef;
                        border-radius: 3px;
                        background: #fff;
                        font-size: 14px;
                        outline: 0;

                        &:hover,
                        &:focus {
                            outline: 0;
                            border-color: #007b5b;
                            box-shadow: 0 0 2px 0 #007b5b;
                        }
                    }
                    input::-webkit-input-placeholder {
                        font-size: 15px;
                    }
                    .yzm_reg {
                        float: right;
                        margin-left: 8px;
                        cursor: pointer;

                        img {
                            width: 84px;
                            height: 40px;
                            position: relative;
                            top: 0px;
                        }
                    }
                }

                p {
                    font-size: 12px;
                }
            }

            .operate {
                width: 100%;
                margin: auto;
                text-align: center;
                position: absolute;
                bottom: 30px;
                left: 0;
                .btn {
                    display: inline-block;
                    width: 250px;
                    height: 40px;
                    color: #fff;
                    background: #00a97d;
                    line-height: 40px;
                    text-align: center;
                    font-size: 16px;
                    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
                    border: none;
                    margin: 10px 0;
                    cursor: pointer;
                    transition: background 0.1s ease-in-out;
                    border-radius: 3px;
                }
            }

            .tip_info {
                text-align: center;
                width: 100%;
                position: absolute;
                bottom: 12px;
                left: 0;
            }
        }
    }
}

input:-webkit-autofill {
    -webkit-text-fill-color: #333 !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    transition: background-color 50000s ease-in-out 0s !important;
}
</style>
