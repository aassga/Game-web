<template>
    <div class="register">
        <div class="wrapperbox">
            <div class="registerBanner"></div>

            <div class="abount-main">
                <div class="w1200 clearfix">
                    <div class="cont-left fl">
                        <ul>

                            <li v-for="(item,i) in footerList" :key="i" :class="item.className">
                                <a href="javascript:;" @click="goHelp(item)">{{item.name}}</a>
                            </li>
                        </ul>
                        <div id="ads1">
                            <a href="javascript:void(0)"></a>
                        </div>
                    </div>

                    <div class="cont-right fr">
                        <!-- 注册内容 -->
                        <div class="page" v-show="!showArticle">
                            <p class="title">WELCOME：b e t 3 6 5 世 界 领 先 的 博 彩 集 团</p>
                            <div class="content">
                                <fieldset>
                                    <legend class="join-acc">注册帐号</legend>
                                    <div class="row">
                                        <label>
                                            <span class="star">*</span>帐号2:
                                        </label>
                                        <input autocomplete="off" type="text" maxlength="10" v-model="userName" @blur="getCode"
                                            @keydown="pulicError=''" v-on:keyup.enter="registerTest" />
                                        <div class="remark">帐号：6-10位数字或字母，支持纯数字，纯字母，及数字与字母的组合</div>
                                    </div>
                                    <div class="row">
                                        <label>
                                            <span class="star">*</span>密码:
                                        </label>
                                        <input autocomplete="off" type="password" maxlength="20" v-model="password" @keydown="pulicError=''"
                                           @keyup="clearNull" v-on:keyup.enter="registerTest" />
                                        <div class="remark">密码:8-20位数字或字母，支持纯数字，纯字母，及数字与字母的组合</div>
                                    </div>
                                    <div class="row">
                                        <label>
                                            <span class="star">*</span>确认密码:
                                        </label>
                                        <input autocomplete="off" type="password" maxlength="20" v-model="password_confirmation"
                                            @keydown="pulicError=''" v-on:keyup.enter="registerTest" />
                                    </div>
                                    <div class="row">
                                        <label>
                                            <span class="star">*</span>验证码:
                                        </label>
                                        <input autocomplete="off" type="text" v-model="code" @keydown="pulicError=''"
                                            v-on:keyup.enter="registerTest" />
                                        <img class="checkLoginCodeImage" :src="codeImg" @click="getCode" />
                                    </div>
                                    <div class="row" v-if="iscode">
                                        <label>
                                            <span class="star">*</span>邀请码:
                                        </label>

                                        <!-- 只读注册 -->
                                        <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="邀请码"
                                            type="text" v-model="intacode" :readonly="incodeReadonly" id="incode" />
                                    </div>
                                </fieldset>
                                <fieldset v-if="register.length">
                                    <legend class="join-acc">会员资料</legend>
                                    <div class="row" v-for="(item,index) in register" :key="index">
                                        <label>
                                            <span class="star">*</span>
                                            {{item.name}}:
                                        </label>
                                        <input type="text" :placeholder="item.placeholder" v-model="item.value" @keydown="pulicError=''"
                                            v-on:keyup.enter="registerTest" :maxlength="item.maxlength" />
                                    </div>
                                </fieldset>
                                <div class="agree">
                                    <input type="checkbox" name="agree" v-model="isCheckbox" />
                                    我已届满合法博彩年龄﹐且同意各项开户条约。
                                </div>
                                <br />
                                <div class="err" v-if="pulicError">
                                    <i class="iconfont icon-baojing"></i>
                                    <span ref="pulicError">{{pulicError}}</span>
                                </div>
                                <div class="operate">
                                    <a class="btn" @click="registerTest">确认</a>
                                    <a class="btn" @click="submitReset">重设</a>
                                </div>

                                <div class="row tip_info">
                                    <p>备注：</p>
                                    <p>1.标记有 * 者为必填项目。</p>
                                    <p>2.取款密码为取款时的凭证,请会员务必仔细填写。</p>
                                </div>
                            </div>
                        </div>

                        <!--  -->
                        <vp-article :title="title" v-show="showArticle"></vp-article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vpArticle from '../../public/help/index';
import store from '@/vuex/store';
import UserService from '@/service/public/UserService';
import { _SetPost, postS, getS } from '@/service/public/service.js';
import data from '../../public/user/register';
export default {
    mixins: [data],
    data() {
        return {
            page: 'register',
            id: 1,
            pageId: '',
            title: '',
            footerList: [
                { name: '关于我们', link: '/home/register1', className: 'lebo' },
                { name: '游戏规则', link: '/rules/ssc?id=4', className: 'bbin' },
                { name: '存款帮助', link: '/home/register1', className: 'mg' },
                { name: '取款帮助', link: '/home/register1', className: 'ct' },
                { name: '联系我们', link: '/home/register1', className: 'sports' },
                { name: '真人视讯', link: '/home/live', className: 'liveGame' },
                { name: '棋牌游戏', link: '/home/qipai?id=0&name=热门游戏', className: 'qipaiGame' },
                { name: '彩票游戏', link: '/plays/hall', className: 'lotteryGame' },
                { name: '优惠活动', link: '/home/youhui', className: 'youhuiGame' }
            ]
        };
    },
    created() {
        this.getTitle();
        switch (this.id) {
            case 1:
                this.page = 'about';
                break;
            case 2:
                this.page = 'lianxi';
                break;
            case 3:
                this.page = 'cooperation';
                break;
            case 4:
                this.page = 'deposit';
                break;
            case 5:
                this.page = 'withdraw';
                break;
            case 6:
                this.page = 'questions';
                break;
            default:
                this.page = 'register';
                break;
        }
    },
    mounted() {
    },
    methods: {
        kefu() {
            let service = JSON.parse(localStorage.config).service;
            if (service) {
                let ser = service.find(item => item.status === 'on');
                if (ser) {
                    window.open(ser.url);
                }
            }
        },
        goHelp(item) {
            this.$store.commit('bet/showArticle', true);
            if (item.link == '/rules/ssc?id=4') {
                window.open('#/rules/ssc?id=4', '_blank');
            } else if (item.link == '/home/live' || item.link == '/home/youhui' || item.link == '/home/qipai?id=0&name=热门游戏') {
                this.$router.push(item.link);
            } else if (item.link == '/plays/hall') {
                window.open('#/plays/hall');
            } else {
                this.$router.push({ path: item.link, query: { name: item.name } });
                this.$store.commit('bet/betTitle', item.name);
            }
        },
        goPage(link) {
            if (link == '/plays/hall') {
                window.open('#/plays/hall', '_blank');
            } else {
                this.$router.push(link);
            }
        },

        submitReset() {
            this.userName = '';
            this.password = '';
            this.password_confirmation = '';
            this.code = '';
            this.pulicError = '';
            this.register &&
                this.register.forEach(item => {
                    item.value = '';
                });
        },

        async getArticle(title) {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
                type: 'article',
                client_type: 'PC',
                title
            });
            let articleData = '';
            if (res && res.code == 200) {
                // 请求成功
                // 存入本地存储，在对应的页面获取数据即可
                if (res.data.data) {
                    this.articleData = res.data.data[0].description;
                }
            }
        },
        getTitle() {
            this.title = this.$route.query.name;
            let title = '';
            switch (this.pageId) {
                case 'lianxi':
                    title = '联系我们';
                    break;
                case 'guanyu':
                    title = '关于我们';
                    break;
                case 'hezuo':
                    title = '合作伙伴';
                    break;
                case 'qukuan':
                    title = '取款帮助';
                    break;
                case 'cunkuan':
                    title = '存款帮助';
                    break;
                case 'question':
                    title = '常见问题';
                    break;
                case 'lottery':
                    title = '负责任博彩';
                    break;
                default:
                    title = '关于我们';
                    break;
            }
        }
    },
    components: {
        vpArticle
    },
    computed: {
        showArticle() {
            return this.$store.state.bet.showArticle;
        }
    },
    watch: {
        '$route.query': function(newVal, oldVal) {
            this.getTitle();
            if (this.title == '注册') {
                this.$store.commit('bet/showArticle', false);
            } else if (this.title == '游戏规则') {
                return;
            } else {
                this.$store.commit('bet/showArticle', true);
            }
            this.title = newVal.name;
        }
    },
    store
};
</script>

<style lang="less" scoped>
@h: 25px;
@font-size: 13px;
.register {
    background: #252525;
    .about-banner {
        min-height: 291px;
        position: relative;
    }

    .wrapperbox {
        width: 100%;
        .registerBanner {
            width: 100%;
            height: 250px;
            background: url(/static/bet365/img/8.jpg) no-repeat -5px center;
            background-size: cover;
        }
        .abount-main {
            padding: 20px 0px;
            width: 1000px;
            margin: 0 auto;
            padding-top: 30px;
            .clearfix:after {
                clear: both;
                content: '';
                display: block;
            }

            .cont-left {
                position: relative;
                float: left;
                width: 200px;
                min-height: 600px;
                max-height: 1381px;
                padding: 20px 20px 0;
                padding-left: 0;
                padding-top: 0;
                li:first-child {
                    a {
                        margin-top: 0;
                    }
                }
                li {
                    a {
                        background: url(/static/bet365/img/left_sidbar_bg.png) no-repeat 35px 0px;
                        display: block;
                        width: 100%;
                        height: 23px;
                        line-height: 23px;
                        text-align: center;
                        color: #727272;
                        margin: 12px 0;
                        padding-left: 28px;
                    }

                    a:hover {
                        text-decoration: underline;
                    }
                }
                li.lebo a {
                    background-position: 35px -220px;
                }
                li.bbin a {
                    background-position: 35px -36px;
                }
                li.mg a {
                    background-position: 35px -66px;
                }
                li.ct a {
                    background-position: 35px -99px;
                }
                li.sports a {
                    background-position: 35px -132px;
                }
                li.lot a {
                    background-position: 35px -162px;
                }
                li.liveGame a {
                    background-position: 35px -516px;
                }
                li.qipaiGame a {
                    background-position: 35px -191px;
                }
                li.lotteryGame a {
                    background-position: 35px -161px;
                }
                li.youhuiGame a {
                    background-position: 35px -451px;
                }

                li.bbin a:hover {
                    background-position: 35px -258px;
                }
                li.mg a:hover {
                    background-position: 35px -288px;
                }
                li.ct a:hover {
                    background-position: 35px -321px;
                }

                li.sports a:hover {
                    background-position: 35px -354px;
                }
                li.lot a:hover {
                    background-position: 35px -384px;
                }
                li.qipaiGame a:hover {
                    background-position: 35px -414px;
                }
                li.youhuiGame a:hover {
                    background-position: 35px -481px;
                }
                li.liveGame a:hover {
                    background-position: 35px -553px;
                }
                li.lotteryGame a:hover {
                    background-position: 35px -382px;
                }
                li:first-child {
                    border: 0;
                }
            }

            .cont-right {
                min-height: 600px;
                width: 787px;
                padding: 10px 20px;
                letter-spacing: 2px;
                color: #727272;
                padding-left: 0;
                padding-top: 0;
                padding-right: 0;
                li {
                    color: #fff;
                    margin: 10px 0;
                }
                td {
                    border: 1px solid #000;
                }

                p.title {
                    font-size: 15 px;
                    color: #85b9ab;
                }

                p {
                    line-height: 22px;
                    color: #ffcc99;
                }

                .content {
                    width: 787px;
                    margin: 20px auto;
                    margin-bottom: 0;
                    color: #fff;
                    margin-left: 0;
                    margin-right: 0;
                    margin-top: 0;

                    fieldset {
                        border: 1px solid #b48d3e;
                        padding: 10px;
                        width: 787px;
                        margin-top: 15px;
                        margin-bottom: 15px;
                        legend {
                            font-size: @font-size;
                            color: #b48d3e;
                            font-weight: bold;
                        }
                    }

                    .row {
                        clear: both;
                        overflow: hidden;
                        margin-top: 10px;
                        width: 100%;
                        font-size: @font-size;

                        label {
                            display: inline-block;
                            width: 135px;
                            height: @h;
                            text-indent: 10px;
                            line-height: @h;
                            color: #fff;
                            text-align: right;
                            padding-right: 10px;

                            .star {
                                color: #f00;
                                font-weight: bold;
                                vertical-align: -2px;
                            }
                        }

                        input {
                            height: @h;
                            line-height: @h;
                            border: 1px solid #666666;
                            border-radius: 3px;
                            box-shadow: 0 0 6px #3a3a3a;
                            text-indent: 10px;
                        }

                        .remark {
                            height: @h;
                            line-height: @h;
                            color: #fff;
                            text-indent: 140px;
                            margin-top: 10px;
                        }

                        img {
                            margin-left: 5px;
                            cursor: pointer;
                            width: 78px;
                            height: @h;
                            vertical-align: middle;
                        }
                    }

                    .agree {
                        // padding-left: 20px;
                        height: @h;
                        line-height: @h;
                        color: #fff;
                        font-size: @font-size;

                        input {
                            width: 15px;
                            height: 15px;
                            vertical-align: middle;
                        }
                    }

                    .err {
                        color: red;
                        margin-left: 16px;
                    }

                    .operate {
                        width: 100%;
                        margin: auto;
                        text-align: center;
                        margin-top: 10px;

                        .btn {
                            display: inline-block;
                            width: 80px;
                            height: 40px;
                            color: #000;
                            background: #fff;
                            line-height: 40px;
                            text-align: center;
                            font-size: 16px;
                            box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
                            border: none;
                            margin: 10px 5px;
                            cursor: pointer;
                            transition: background 0.1s ease-in-out;
                            border-radius: 3px;
                        }
                    }

                    .tip_info {
                        p {
                            font-size: 13px;
                            height: @h;
                            line-height: @h;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
}
#ads1 {
    margin: 0;
    height: 250px;
    width: 180px;
    background: url(/static/bet365/img/ads1.jpg) no-repeat;
    background-size: contain;
}

/deep/ table tbody td {
    border: 1px solid #fff !important;
    font-size: 14px;
    text-align: center;
    color: #fff !important;
    line-height: 25px;
}

input:-webkit-autofill {
    -webkit-text-fill-color: #333 !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    transition: background-color 50000s ease-in-out 0s !important;
}
</style>
