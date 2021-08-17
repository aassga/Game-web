<template>
    <footer id="footer" :class="{homeColor:$route.path=='/home'}">
        <div class="wrapper">
            <ul id="footer-info">
                <li class="qq" ng-click="qqClick(ContactInfo.QQ)">客服QQ:80067717</li>
                <li class="tel">热线电话:+639399933333</li>
                <li class="mail">联系邮箱:mgmtousu@163.com</li>
                <li class="service" ng-click="lineChatClick()">7X24小时在线客服</li>
            </ul>
            <div id="footer-logo"></div>
            <ul id="footer-nav">
                <li v-for="(item,i) in goInfo" :key="i"><a @click="goLink(item.link)">{{item.name}}</a></li>
            </ul>
            <p id="footer-suggest">
                MGM GRAND © 澳门美高梅 MGM Macau
            </p>
        </div>
        <Modal :scrollable=true title="提示信息" v-model="tipDatas.bool" class-name="vp-all-tipModel-wrap" width="450">
            <div class="tipModel-box">
                <span>
                    <i v-if="tipDatas.model=='warn'" class="iconfont icon-baojing"></i>
                    <i v-if="tipDatas.model=='error'" class="iconfont icon-cuowu"></i>
                    <i v-if="tipDatas.model=='success'" class="iconfont icon-chenggong"></i>
                </span>
                <span>{{tipDatas.title}}</span>
            </div>
        </Modal>
    </footer>
</template>

<script>
import store from '@/vuex/store';

export default {
    name: 'vpHomeFooter',
    data() {
        return {
            goInfo: [
                { name: '关于我们', link: '/home/help/guanyu' },
                { name: '常见问题', link: '/home/help/question' },
                { name: '存款帮助', link: '/home/help/cunkuan' },
                { name: '取款帮助', link: '/home/help/qukuan' },
                { name: '联系我们', link: '/home/help/lianxi' }
            ]
        };
    },
    methods: {
        goLink(link) {
            if (link == '/service') {
                let service = JSON.parse(localStorage.config).service;
                if (service) {
                    let ser = service.find(item => item.status === 'on');
                    if (ser) {
                        window.open(ser.url);
                    }
                }
            } else {
                this.$router.push(link);
            }
        },
        godown() {
            window.open('/static/cmgm/html/download/index.html');
        }
    },
    computed: {
        tipDatas() {
            return this.$store.state.alert.tipModel;
        }
    },
    mounted() {},
    store
};
</script>

<style lang="less" scoped>
#footer {
    padding-bottom: 20px;
    background: #2d1e17 !important;
    border-top: 1px solid #674432;

    .wrapper {
        position: relative;
        width: 1000px;
        margin: 0 auto;

        #footer-info {
            display: block;
            text-align: center;
            padding: 30px 0;
            font-size: 0;
            white-space: nowrap;
            & > li {
                display: inline-block;
                vertical-align: top;
                height: 36px;
                padding-right: 30px;
                padding-left: 46px;
                color: #edc679;
                font-size: 15px;
                line-height: 36px;
                text-align: left;
                background-position: left top;
                background-repeat: no-repeat;
                -moz-transition: all 0.3s;
                -o-transition: all 0.3s;
                -webkit-transition: all 0.3s;
                transition: all 0.3s;

                & > span {
                    display: block;
                    color: #fff;
                    font-size: 16px;

                    a {
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }

            & > li.qq {
                background-image: url(/static/cmgm/img/mgimg/footer_icon_02.png);
            }
            & > li.tel {
                background-image: url(/static/cmgm/img/mgimg/footer_icon_01.png);
            }
            & > li.mail {
                background-image: url(/static/cmgm/img/mgimg/footer_icon_03.png);
            }
            & > li.service {
                background-image: url(/static/cmgm/img/mgimg/footer_icon_04.png);
            }

            & > li:hover {
                color: #f9e87a;
                background-position: left bottom;
            }
        }

        #footer-logo {
            height: 73px;
            background: url(/static/cmgm/img/mgimg/footer_logo.png) no-repeat center;
            border-top: 1px solid #4f3224;
            border-bottom: 1px solid #4f3224;
        }
        #footer-nav {
            display: block;
            height: 53px;
            text-align: center;

            li {
                display: inline-block;
                margin: 0 20px;
                a {
                    color: #b7935a;
                    font-size: 14px;
                    text-align: center;
                    line-height: 53px;
                    text-decoration: none;
                }
                a:hover {
                    color: #ffb94a;
                }
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        #footer-suggest {
            color: #b7935a;
            font-size: 13px;
            text-align: center;
            line-height: 28px;
        }
    }
}
.homeColor {
    background-color: transparent !important;
}
</style>
