<template>
    <div class="register" v-show="isResiter">
        
        <div class="popup">
            <div class="headline"></div>
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

                    <div class="close1" @click="close">
                        <a href="javascript:void(0)">
                            <span class="closeBox"></span>
                            <img src="/static/js85/img/xx.png" alt="">
                        </a>
                    </div>
                </div>
                <div class="regTitle">注册账号</div>
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
                        <input autocomplete="off" :type="pwdInp" ref="pwdInp" placeholder="请输入8到20位的数字或字母组合" maxlength="20"
                            v-model="password">
                        <!-- <img @click='changType' class='eys_ico1' src="/static/test-7/img/reg/eyes_ico.png" alt=""> -->
                    </div>
                </div>

                <div class="row">
                    <label>确认密码：</label>
                    <div class="group">

                        <input autocomplete="off" type="password" placeholder="请输入8到20位的数字或字母组合" maxlength="20"
                            v-model="password_confirmation">
                    </div>
                </div>

                <div class="row" v-for="(item,index) in register" :key="index">
                    <div v-if="JSON.stringify(item) !== '{}' ">
                        <label>{{item.name}}：</label>
                        <div class="group">
                            <input type="text" :placeholder="item.placeholder" v-model="item.value" :maxlength="item.maxlength">
                        </div>
                    </div>
                </div>
                <div class="row" v-if="!isShowSms&&!isShowTnCode">
                    <label style="text-align: right;">验证码：</label>
                    <div class="group">
                        <input autocomplete="off" class="regCode" type="text" placeholder="请输入验证码" v-model="code" maxlength="4">
                        <span class="yzm_reg">
                            <img class="checkLoginCodeImage" :src="codeImg" @click="getCode">
                        </span>
                    </div>
                </div>
                <!-- 短信验证码 -->
                <sms-input  v-if="isShowSms" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :inputBox="inputBox"
                    :star="star" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend" :reSend="reSend" :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms" :hasSendMsg="hasSendMsg"
                    :countDownTime="countDownTime" bColor="#ffa200">
                </sms-input>
                <div class="row" v-if="iscode">
                    <label>邀请码：</label>
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
            <div class="logAside">
                <ul>
                    <li>
                        <span>会员1元+有效投注</span>
                        <span>即可获得每月派送千万现金回馈</span>
                    </li>
                    <li>
                        <span>会员账户</span>
                        <span>永久受益领工资</span>
                    </li>
                    <li>
                        <span>免息借钱</span>
                        <span>余额宝存钱有利息</span>
                    </li>
                    <li>
                        <span>天天8:00准时</span>
                        <span>红包高达8888元</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store';
import UserService from '@/service/public/UserService';
import { postS } from '@/service/public/service.js';
import data from '../../public/user/register_copy.js';
import smsInput from '../../public/home/smsInput';

export default {
    mixins: [data],
    data() {
        return {
            codeImg:'/static/js85/img/new_games/re.png',
            pwdInp: 'password',
            smsInputBox: {
                marginTop: '15px'
            },
            smsCodeWrapper: {
                paddingBottom: '25px',
                position: 'relative',
                fontSize: '16px',
                color: '#333',
                textAlign: 'center'
            },
            curLabel: {
                width: '99px',
                height: '40px',
                lineHeight: '40px',
                color: '#0b0b0b',
                fontSize: '16px',
                textAlign: 'left',
                display: 'inline-block',
                transform: 'translateX(-129px)'
            },
            star: {
                display: 'none'
            },
            inputBox: {
                width: '223px',
                height: '40px',
                border: '1px solid #ebecef',
                borderRadius: '5px',
                background: '#fff',
                color: '#999',
                fontSize: '14px',
                // textIndent: '6px',
                outline: 'none',
                transform: 'translateX(-158px)',
                paddingLeft:'15px'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '-3px',
                right: '125px',
                marginLeft: '2px',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '179px'
            },
            btnStyle: {
                display: 'inline-block',
                height: '40px',
                lineHeight: '40px',
                fontSize: '13px',
                borderRadius: '3px',
                padding: '0 6px',
                transform: 'translateY(3px)'
            },
            beforeSend: {
                color: '#fff',
                background: '#f43535'
            },
            reSend: {
                color: '#fff',
                background: '#788494'
            },
            msgTip: {
                margin: '5px 0 16px 97px',
                color: '#333',
                fontSize: '12px'
            },
            list: [
                {img:"/static/js85/img/sl1.png"},
                {img:"/static/js85/img/sl2.png"},
                {img:"/static/js85/img/sl3.png"},
                {img:"/static/js85/img/sl4.png"},
            ],
            
                
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
                init: false,
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
    mounted() {this.initSwiper()},
    methods: {
        initSwiper() {
            this.$nextTick(async() => {
                await this.swiper.init() // 现在才初始化
                await this.swiper.slideTo(this.activeItemIndex)
            })
        },
        close() {
            this.replaceMent()
            this.$store.commit('alert/showMgmRegister', false);
        },
        //修改密码框type类型
        changType() {
            if (this.pwdInp == 'password') {
                this.pwdInp = 'text';
            } else {
                this.pwdInp = 'password';
            }
        }
    },
    computed: {
        isResiter() {
            return this.$store.state.alert.mgmRegister;
        },
        swiper() {
            return this.$refs.mySwiper.swiper
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
    components: {
        smsInput
    },
    store
};
</script>

<style lang="less" scoped>
.regCode{
    width: 220px!important;
}
.swiper-content {
  width: 620px;
  height: 100%;
  position: relative;
  opacity: hidden;
  margin: 0 auto;
  padding: 10px 0;
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
        // position: relative;
        width: 745px;
        min-height: 200px;
        // margin: 10% auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 10px;

        .headline {
            height: 120px;
            // background-image: linear-gradient(160deg, #7faaff 30%, #07cacc 70%);
            border-radius: 10px 10px 0 0;
            background: url('/static/js85/img/reheader.png') no-repeat;
            background-size: 100% 100%;
            p {
                font-size: 24px;
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

        .content {
            background: #fff;
            padding: 0px 57px 26px 54px;
            .regTitle{
                color: #0b0b0b;
                font-size: 21px;
                margin-left: 10px;
                padding-bottom: 18px;
                border-bottom:1px solid  #ebecef;
                width: 400px;
            }
            .title_tab {
                opacity: hidden;

                ul {
                    li {
                        float: left;

                        a {
                            display: block;
                            height: 40px;
                            line-height: 40px;
                            color: #3c3c3c;
                            font-size: 16px;
                            margin-left: 10px;
                            padding: 0 20px;
                        }

                        .cur {
                            position: relative;
                            color: #ffa200;
                            font-weight: bold;
                        }

                        .cur:after {
                            content: '';
                            position: absolute;
                            bottom: 1px;
                            left: 0;
                            width: 100%;
                            height: 2px;
                            background: #ffa200;
                        }
                    }
                }

                .close1 {
                    position: absolute;
                    width: 50px;
                    height: 40px;
                    top: 15px;
                    right: 0;
                    background: rgba(0, 0, 0, 0.8);
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
                        width: 18px;
                        height: 18px;
                        position: absolute;
                        left: 13px;
                        top: 11px;
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
                opacity: hidden;
                margin-top: 15px;
                label {
                    float: left;
                    display: block;
                    width: 100px;
                    height: 40px;
                    text-indent: 10px;
                    line-height: 40px;
                    // text-align: right;
                    padding-right: 10px;
                    font-size: 16px;
                    color: #0b0b0b;
                }

                .group {
                    float: left;
                    opacity: hidden;
                    position: relative;
                    .eys_ico1 {
                        width: 20px;
                        height: 13px;
                        position: absolute;
                        right: 22px;
                        top: 15px;
                        cursor: pointer;
                    }
                    input {
                        width: 308px;
                        height: 40px;
                        box-sizing: border-box;
                        padding: 7px 14px 7px 15px;
                        line-height: 40px;
                        border: 1px solid #ebecef;
                        border-radius: 5px;
                        background: #fff;
                        font-size: 14px;
                        color: #0b0b0b;
                        &:hover,
                        &:focus {
                            border:1px solid #ffa200;
                            // box-shadow: 0 0 2px 0 #ffa200;
                             border-radius: 5px;
                             outline: none;
                        }
                    }

                    .yzm_reg {
                        float: right;
                        margin-left: 10px;
                        cursor: pointer;

                        img {
                            width: 78px;
                            height: 40px;
                        }
                    }
                }

                p {
                    font-size: 12px;
                }
            }
            .smsInputBox{
                 input{
                      &:focus {
                            border:1px solid #ffa200;
                            // box-shadow: 0 0 2px 0 #4d8cfa;
                             border-radius: 5px;
                             outline: none;
                        }
                 }
            }
            .operate {
                width: 100%;
                margin: auto;
                text-align: center;
                margin-top: 20px;

                .btn {
                    display: inline-block;
                    width: 250px;
                    height: 40px;
                    color: #fff;
                    background: #e80000;
                    line-height: 40px;
                    text-align: center;
                    font-size: 18px;
                    // box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
                    border: none;
                    // margin: 10px 0;
                    cursor: pointer;
                    transition: background 0.1s ease-in-out;
                    border-radius: 3px;
                }
            }

            .tip_info {
                text-align: center;
                margin-top: 20px;
                p {
                    font-size: 12px;
                    color: rgba(102, 102, 102, 1);
                }
            }
        }
        .logAside{
            position: absolute;
            right: -38px;
            top: 300px;
            ul{
                li{
                    width: 285px;
                    height: 88px;
                    padding-top: 8px;
                    padding-left: 45px;
                    span{
                        display: block;
                        text-align: center;
                        color: #752c0f;
                        font-size: 17px;
                        line-height: 20px;
                    }
                    &:first-child{
                        background: url('/static/js85/img/tan2.png') no-repeat;
                        background-size: 100% 100%;
                        span{
                            &:last-child{
                                font-size: 14px;
                            }
                        }
                    }
                    &:nth-child(2){
                        background: url('/static/js85/img/tan1.png') no-repeat;
                        background-size: 100% 100%; 
                    }
                    &:nth-child(3){
                        background: url('/static/js85/img/tan3.png') no-repeat;
                        background-size: 100% 100%; 
                    }
                    &:last-child{
                        background: url('/static/js85/img/tan4.png') no-repeat;
                        background-size: 100% 100%; 
                    }
                }
            }
        }
    }
}

input:-webkit-autofill {
    -webkit-text-fill-color: #333 !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    // background-image: none!important;
    transition: background-color 50000s ease-in-out 0s !important;
}
</style>
