<template>
    <div>
        <div class="reginer_box">
            <div class="reginer_cont">

                <div id="left_center">
                    <ul id="sidebar">
                        <li><a @click="goLink('/home/games?id=10022&name=MG老虎机')">电子游艺</a></li>
                        <li><a @click="goLink('/home/games?id=10022&name=MG老虎机')">MG电子</a></li>
                        <li><a @click="goLink('/home/buyu')">捕鱼游戏</a></li>
                        <li><a @click="goLink('/home/live')">真人视讯</a></li>
                        <li><a @click="goLink('/home/tiyu')">体育赛事</a></li>
                        <li><a @click="goLink('/home/youhui')">优惠活动</a></li>
                        <li><a @click="goLink('/service')">在线客服</a></li>
                    </ul>
                </div>

                <div id="right_center">
                    <!-- 关于我们 -->
                    <div v-html="articleData"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import { _SetPost, postS, getS } from '@/service/public/service.js';
import store from '@/vuex/store';

export default {
    data() {
        return {
            articleData: '',
            title: '关于我们'
        };
    },
    mounted() {},
    methods: {
        goLink(link) {
            if (link == '/home/tiyu') {
                this.$router.push(link);
            } else if (link == '/service') {
                let service = JSON.parse(localStorage.config).service;
                if (service) {
                    let ser = service.find(item => item.status === 'on');
                    if (ser) {
                        window.open(ser.url);
                    }
                }
            } else {
                this.$router.push({
                    path: link
                });
            }
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
                    // 存在返回值为空的情况
                    // articleData=JSON.stringify(res.data.data[0].description);
                    // localStorage.setItem("articleData",articleData);
                    this.articleData = res.data.data[0].description;
                }
            }
        },
        changeTitle(title) {
            let oTitle = '';
            switch (title) {
                case 'guanyu':
                    oTitle = '关于我们';
                    break;
                case 'question':
                    oTitle = '常见问题';
                    break;
                case 'cunkuan':
                    oTitle = '存款帮助';
                    break;
                case 'qukuan':
                    oTitle = '取款帮助';
                    break;
                case 'lianxi':
                    oTitle = '联系我们';
                    break;
                default:
                    oTitle = '关于我们';
                    break;
            }
            this.title = oTitle;
        },
        getOpt() {
            if (this.$route.params && this.$route.params.id) {
                this.changeTitle(this.$route.params.id);
            }
            this.getArticle(this.title);
        }
    },

    created() {
        this.getOpt();
    },
    watch: {
        $route() {
            this.getOpt();
        }
    },
    store
};
</script>

<style lang="less" scoped>
.reginer_box {
    width: 100%;
    overflow: hidden;
    background: url(/static/cmgm/img/mgimg/bg.jpg);
    .reginer_cont {
        width: 1040px;
        height: auto;
        margin: 20px auto;
        padding: 33px 33px 22px;
        overflow: hidden;
        position: relative;
        min-height: 580px;
        #left_center {
            width: 235px;
            padding: 86px 0 0;
            background: url(/static/cmgm/img/mgimg/register/top.png) left top no-repeat;
            overflow: hidden;
            margin-top: 15px;
            position: absolute;
            left: 19px;
            top: 18px;
            z-index: 0;
            #sidebar li {
                width: 232px;
                height: 40px;
                background: url(/static/cmgm/img/mgimg/register/btn.png) left top no-repeat;
                a {
                    display: block;
                    height: 100%;
                    padding-left: 68px;
                    color: #f2e196;
                    font-size: 16px;
                    text-align: left;
                    text-decoration: none;
                    line-height: 45px;
                }

                &:hover {
                    background-position: left -40px;
                }
                &:hover a {
                    color: #673a11;
                }
            }
        }

        #right_center {
            width: 730px;
            min-height: 345px;
            position: relative;
            z-index: 2;
            margin-left: 245px;
            color: #cfac60;
            .register-slogan {
                height: 58px;
                padding-top: 25px;
                font-size: 14px;
                text-align: center;
                background: url(/static/cmgm/img/register_slogan.png) no-repeat left center;
            }

            p {
                font-size: 12px;
                margin: 1em 0;
            }

            .JoinMemForm {
                fieldset {
                    font-size: 10px;
                    border: 1px solid #cfac60;
                    margin: 10px;
                    padding: 10px;

                    legend {
                        margin-left: 25px;
                        padding: 0 12px;
                        font-size: 14px;
                        font-weight: bold;
                    }

                    p {
                        label {
                            float: left;
                            height: 25px;
                            line-height: 25px;
                            text-align: right;
                            width: 135px;
                            .star {
                                font-weight: bold;
                                vertical-align: -2px;
                            }
                            .red {
                                color: rgb(255, 0, 0);
                            }
                        }
                        span {
                            display: inline-block;
                            line-height: 25px;
                        }
                        input {
                            width: 148px;
                            height: 22px;
                            line-height: 22px;
                            border: 1px solid #666;
                            box-shadow: 0 0 6px #3a3a3a;
                            border-radius: 3px;
                            color: #444;
                            font-size: 12px;
                            text-indent: 6px;
                            outline: none;
                            border: none;
                            margin: 0 15px;

                            &#rmNum {
                                width: 81px;
                                margin: 0 0 0 15px;
                            }
                        }
                        img {
                            width: 58px;
                            height: 23px;
                            vertical-align: middle;
                            margin-left: 5px;
                            border-radius: 3px;
                        }
                        .memCash_text {
                            display: block;
                            padding: 5px 0 0 135px;
                            min-height: 26px;
                            border: 0;
                            font-size: 100%;
                            font: inherit;
                        }
                    }
                }
                #memCash-confirm {
                    input {
                        display: inline-block;
                        width: 106px;
                        height: 38px;
                        margin: 0 5px;
                        padding: 0;
                        color: #fff;
                        font-size: 17px;
                        font-weight: bold;
                        line-height: 38px;
                        vertical-align: top;
                        border: none;
                        border-radius: 5px;
                        background: url(/static/cmgm/img/mgimg/register/confirm.png);
                        background-size: 103% 205%;
                        &:hover {
                            background-position: 0 -38px;
                        }
                    }
                }
            }
            .err {
                width: 210px;
                margin-left: 22px;
                height: 30px;
                line-height: 30px;
                color: #fff;
                font-size: 14px;
                border: 1px solid #666666;
                box-shadow: 0 0 6px #3a3a3a;
                border-radius: 3px;
                margin-bottom: 20px;

                i {
                    padding-left: 5px;
                    font-size: 15px;
                }
            }
            .JM_content {
                padding: 10px 10px 10px 20px;
                font-size: 10px;
            }
            &:before {
                content: '';
                position: absolute;
                top: 20px;
                left: 0;
                width: 730px;
                height: 345px;
                background: url(/static/cmgm/img/mgimg/register/others_bg.png) no-repeat center;
                z-index: -1;
            }
        }
    }
}

/deep/ table {
    border-spacing: 0;
    border-collapse: collapse;
    border: 1px solid yellow;

    tbody {
        display: table-row-group;
        vertical-align: middle;
        border-color: inherit;

        td {
            border: 1px solid yellow;
            font-size: 14px;
            text-align: center;
            color: red;
            line-height: 25px;
        }
    }
}
</style>
