<template>
    <div class="register">
        <div class="about-mian">
            <div class="wrapper">
                <div class="about-left">
                    <ul>
                        <li v-for="(branch,index)  in muneList" :key="index">
                            <a :class="branch.class" :id="branch.id" @click="goView(branch.link)"></a>
                        </li>
                    </ul>
                </div>

                <div class="about-right">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import { _SetPost, postS } from '@/service/public/service.js';
import store from '@/vuex/store';
import data from '@/pages/public/user/register';
import $ from 'jquery';

export default {
    mixins: [data],
    data() {
        return {
            muneList: [
                {
                    name: '游戏规则',
                    link: '/rules/ssc?id=4',
                    id: 'gameRules',
                    order_name: 'game rules',
                    class: 'game_rule'
                },
                {
                    name: '关于我们',
                    link: '/about-page',
                    id: 'aboutUs',
                    order_name: 'about us',
                    class: 'about_1'
                },
                {
                    name: '联系我们',
                    link: '/relation',
                    id: 'contactUs',
                    order_name: 'contact us',
                    class: 'about_2'
                },
                {
                    name: '存款帮助',
                    link: '/save-help',
                    id: 'Deposit help',
                    order_name: 'about us',
                    class: 'about_6'
                },
                {
                    name: '取款帮助',
                    link: '/pull-help',
                    id: 'Withdrawal help',
                    order_name: 'about us',
                    class: 'about_7'
                }
            ]
        };
    },
    mounted() {},
    methods: {
        pushView(link) {
            this.$router.push(link);
        },
        reset() {
            (this.userName = ''),
                (this.password = ''),
                (this.password_confirmation = ''),
                (this.pulicError = ''),
                (this.code = ''),
                (this.pulicError = ''),
                this.register &&
                    this.register.forEach(item => {
                        item.value = '';
                    });
        },
        login() {
            this.$store.commit('mainState/setChooseModel', '登录');
            this.$store.commit('mainState/setLoginTitle', '登录');
        },

        goView(href) {
            if (href == 'Kefu') {
                let service = JSON.parse(localStorage.config).service;
                if (service) {
                    let ser = service.find(item => item.status === 'on');
                    if (ser) {
                        window.open(ser.url);
                    }
                }
                return false;
            } else if (href.indexOf('rules') > -1) {
                var i = window.location.href.indexOf('#');
                var host = window.location.href.slice(0, i + 1);
                window.open(host + href, '_blank');
            } else {
                this.$router.push(href);
            }
        }
    },

    created() {},
    store
};
</script>

<style lang="less" scoped>
.register {
    margin: 0 auto;

    .about-banner {
        height: 303px;
        background: url(/static/js85/img/about-banner.jpg) center no-repeat;
        border-top: 2px #1d124c solid;
        border-bottom: 2px #2d2359 solid;
    }
    .about-mian {
        background: #1d124c url(/static/js85/img/aboutbg.jpg) center no-repeat;
        min-height: 650px;
        background-size: cover;
        .wrapper {
            width: 1200px;
            margin: 0 auto;
            .about-left {
                float: left;
                width: 213px;
                height: 600px;
                margin-top: 20px;
                background: #1b1b1b;
                position: relative;
                z-index: 5;
                ul {
                    li {
                        height: 70px;
                        a {
                            display: block;
                            height: 76px;
                            &.game_rule {
                                background: url(/static/js85/img/game_rule.png) -2px 21px no-repeat;
                                &:hover {
                                    background: url(/static/js85/img/game_rule_hover.png) -2px 21px no-repeat;
                                }
                                &.agentclk {
                                    background: url(/static/js85/img/about-title_hover.png) -2px 21px no-repeat !important;
                                }
                            }
                            &.about_1 {
                                background: url(/static/js85/img/about_1.png) -2px 21px no-repeat;
                                &:hover {
                                    background: url(/static/js85/img/about_1_hover.png) -2px 21px no-repeat;
                                }
                                &.agentclk {
                                    background: url(/static/js85/img/about-title_hover.png) -2px 21px no-repeat !important;
                                }
                            }
                            &.about_2 {
                                background: url(/static/js85/img/about_2.png) -2px 21px no-repeat;
                                &:hover {
                                    background: url(/static/js85/img/about_2_hover.png) -2px 21px no-repeat;
                                }
                                &.agentclk {
                                    background: url(/static/js85/img/about-title_hover.png) -6px -61px no-repeat !important;
                                }
                            }
                            &.about_3 {
                                background: url(/static/js85/img/about_3.png) -2px 21px no-repeat;
                                &:hover {
                                    background: url(/static/js85/img/about_3_hover.png) -2px 21px no-repeat;
                                }
                                &.agentclk {
                                    background: url(/static/js85/img/about-title_hover.png) -2px 21px no-repeat !important;
                                }
                            }
                            &.about_4 {
                                background: url(/static/js85/img/about_4.png) -2px 21px no-repeat;
                                &:hover {
                                    background: url(/static/js85/img/about_4_hover.png) -2px 21px no-repeat;
                                }
                                &.agentclk {
                                    background: url(/static/js85/img/about-title_hover.png) -6px -218px no-repeat !important;
                                }
                            }
                            &.about_5 {
                                background: url(/static/js85/img/about-title_01.png) -2px -295px no-repeat;
                                &:hover {
                                    background: url(/static/js85/img/about-title_hover.png) -6px -295px no-repeat;
                                }
                                &.agentclk {
                                    background: url(/static/js85/img/about-title_hover.png) -6px -295px no-repeat !important;
                                }
                            }
                            &.about_6 {
                                background: url(/static/js85/img/about_4.png) -2px 21px no-repeat;
                                &:hover {
                                    background: url(/static/js85/img/about_4_hover.png) -2px 21px no-repeat;
                                }
                                &.agentclk {
                                    background: url(/static/js85/img/about-title_hover.png) -6px -376px no-repeat !important;
                                }
                            }
                            &.about_7 {
                                background: url(/static/js85/img/about_5.png) -2px 21px no-repeat;
                                &:hover {
                                    background: url(/static/js85/img/about_5_hover.png) -2px 21px no-repeat;
                                }
                                &.agentclk {
                                    background: url(/static/js85/img/about-title_hover.png) -6px -451px no-repeat !important;
                                }
                            }
                            p {
                                font-size: 12px;
                                color: #fff;
                                margin-top: 5px;
                                padding-left: 60px;
                                &.about-t {
                                    font-size: 18px;
                                    padding-top: 15px;
                                }
                            }
                        }
                    }
                }
            }

            .about-right {
                width: 960px;
                min-height: 600px;
                background: #1b1b1b;
                float: right;
                margin-top: 20px;
                dl {
                    dt {
                        font-size: 15px;
                        color: #cccccc;
                        font-weight: bold;
                        margin-top: 15px;
                    }
                    dd {
                        margin-top: 15px;
                        line-height: 20px;
                    }
                }

                .container {
                    width: 100%;
                    .body {
                        width: 100%;
                        background-color: #1b1b1b;
                    }
                }
            }
        }
        #signUpForm {
            color: #fff;
        }
    }

    .JM_content {
        padding: 10px 10px 10px 20px;
        font-size: 10px;
        #joinmem {
            p {
                font-size: 12px;
                margin: 1em 0;
            }
        }
    }

    .err {
        width: 262px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 14px;
        border: 1px solid #666666;
        box-shadow: 0 0 6px #3a3a3a;
        border-radius: 3px;
        margin-top: 20px;
        display: flex;
        align-items: center;

        i {
            padding: 2px 0 0 5px;
            margin-right: 5px;
            font-size: 15px;
        }
    }

    .registered {
        border: 3px #666666 solid;
        padding-bottom: 20px;
        margin-top: 30px;
        position: relative;
    }
    .registered ul .btnee {
        position: absolute;
        left: -73px;
        top: 58px;
        background: url(/static/js85/img/zc-title.jpg) no-repeat;
        width: 44px;
        height: 96px;
    }
    .registered ul li {
        margin: 15px 0px 0px 50px;
    }
    .registered ul li label {
        display: block;
        width: 100px;
        float: left;
        height: 30px;
        line-height: 30px;
    }
    .registered ul li input {
        border: none;
        background: #4c4d53;
        width: 220px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        padding-left: 5px;
    }
    .registered ul li span {
        margin-left: 20px;
    }

    .registered-data {
        border: 3px #666666 solid;
        padding-bottom: 20px;
        margin-top: 30px;
        position: relative;
        min-height: 170px;
        padding-bottom: 20px;
        ul {
            li {
                &:first-of-type {
                    margin-top: 40px;
                }
            }
        }
    }

    .registered-data ul .btnees {
        position: absolute;
        left: -73px;
        top: 20px;
        background: url(/static/js85/img/zczl-title.jpg) no-repeat;
        width: 44px;
        height: 96px;
    }
    .registered-data ul li {
        margin: 15px 0px 0px 50px;
    }
    .registered-data ul li label {
        display: block;
        width: 100px;
        float: left;
        height: 30px;
        line-height: 30px;
    }
    .registered-data ul li input {
        border: none;
        background: #4c4d53;
        width: 220px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        padding-left: 5px;
    }
    .registered-data ul li span {
        margin-left: 20px;
    }

    .regist-btn {
        margin-top: 20px;
        height: 55px;
    }
    .regist-btn::after {
        clear: both;
    }
    .regist-btn ul li {
        float: left;
    }
    .regist-btn ul li a {
        display: block;
        width: 189px;
        height: 51px;
        float: left;
        margin-left: 15px;
    }
    .regist-btn ul input {
        display: block;
        width: 189px;
        height: 51px;
        float: left;
        margin-left: 15px;
        border: none;
    }
    .regist-btn ul li .zc-btn {
        background: url(/static/js85/img/registered-btn.jpg) center no-repeat;
        margin-left: 150px;
    }
    .regist-btn ul .cz-btn {
        background: url(/static/js85/img/Reset-btn.jpg) center no-repeat;
    }
}
</style>
