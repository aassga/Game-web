<template>
    <div class="footers">
        <div class="footer-bg"></div>
        <div class="first-footer-wrap">
            <div class="footer-top-wrap clearfix">
                <div class="footer-top-left">
                    <div class="article-menu">
                        <ul>
                            <li v-for="(item,i) in footerList" :key="i">
                                <a href="javascript:;" @click="goHelp(item)">{{item.name}}</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="copyright">2001-2020 bet365 版权所有</div>
                    <div class="footer-info"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'vpHomeFooter',
    data() {
        return {
            footerList: [
                { name: '关于我们', link: '/home/register1' },
                { name: '游戏规则', link: '/rules/ssc?id=4' },
                { name: '存款帮助', link: '/home/register1' },
                { name: '取款帮助', link: '/home/register1' },
                { name: '联系我们', link: '/home/register1' }
            ]
        };
    },
    methods: {
        goHelp(item) {
            this.$store.commit('bet/showArticle', true);
            if (item.link == '/service') {
                let service = JSON.parse(localStorage.config).service;
                if (service) {
                    let ser = service.find(item => item.status === 'on');
                    if (ser) {
                        window.open(ser.url);
                    }
                }
            } else if (item.link == '/rules/ssc?id=4') {
                window.open('#/rules/ssc?id=4', '_blank');
            } else {
                this.$router.push({ path: item.link, query: { name: item.name } });
                this.$store.commit('bet/betTitle', item.name);
            }
        },
        goHome() {
            this.$router.push('/home');
        }
    },
    computed: {
        tipDatas() {
            return this.$store.state.alert.tipModel;
        }
    }
};
</script>

<style lang="less" scoped>
.footers {
    background-color: #252525;
    height: auto;
    overflow: hidden;
    height: 106px;
    .footer-bg {
        height: 2px;
        width: 100%;
        background: url(/static/blr/img/home/footer_bg.png) repeat-x 0% 0%;
    }
    .footer-newbg {
        height: 2px;
        width: 960px;
        margin: 0px auto 0;
        background: url(/static/blr/img/home/footer_bg.png) repeat-x 0% 0%;
    }
    .first-footer-wrap {
        width: 850px;
        margin: 0px auto 0;
        .footer-top-wrap {
            color: #697571;
            padding: 12px 0 12px 0;
            .footer-top-left {
                position: relative;
                float: left;
                width: 100%;
                padding-right: 10px;
                text-align: center;
                padding-left: 18px;
                .article-menu {
                    ul {
                        li {
                            border-right: 1px solid #697571;
                            height: 12px;
                            line-height: 12px;
                            padding: 0 10px;
                            a {
                                color: #697571;
                                display: inline-block;
                                font-size: 12px;
                                width: 48px;
                                height: 12px;
                                display: block;
                            }
                        }
                        li:last-child {
                            border-right: none;
                        }
                    }
                    a:hover {
                        border-bottom: 1px solid #697571;
                    }

                    ul:after {
                        clear: both;
                        content: '';
                        display: block;
                    }
                    ul {
                        position: relative;
                        left: 50%;
                        transform: translateX(-50%);
                        li {
                            display: inline-block;
                        }
                    }
                }
                .article-menu:after {
                    clear: both;
                    content: '';
                    display: block;
                }
                .copyright {
                    margin-top: 20px;
                    font-family: 'STHeiti';
                    font-size: 12px;
                }
                .gohome {
                    position: absolute;
                    top: 26px;
                    right: 240px;
                    width: 79px;
                    color: #697571;
                    font-size: 12px;
                    height: 29px;
                    background: url(/static/blr/img/home/footer_common_btn.png) no-repeat 0% 0%;
                    text-align: center;
                    line-height: 29px;
                    font-size: 12px;
                    text-align: center;
                    a {
                        color: #697571;
                    }
                    a:hover {
                        border-bottom: 1px solid #697571;
                    }
                }
            }
            .footer-top-right {
                float: left;
                width: 264px;
                #bblogo {
                    display: inline-block;
                    width: 113px;
                    height: 46px;
                    background: url(/static/blr/img/home/bbinlogo.png);
                }
                #browser-logo {
                    display: inline-block;
                    margin-left: 33px;
                }
            }
        }
    }
}
/deep/.ivu-modal-mask {
    z-index: 2000;
}
/deep/.ivu-modal-wrap {
    z-index: 2000;
}
/deep/.ivu-modal-close {
    right: 0;
}
/deep/.ivu-modal-footer {
    border-top: none;
    display: none;
}
/deep/.ivu-modal {
    top: 50%;
    margin-top: -159px;
    height: 318px;
}
/deep/.ivu-modal-header {
    border-bottom: none;
    padding: 0;
}
/deep/ .ivu-modal-close .ivu-icon-ios-close-empty {
    color: #fff;
    font-size: 37px;
    top: 0;
}

/deep/ .ivu-modal-body {
    padding: 0;
}

/deep/.ivu-modal-close {
    top: 0;
    right: 20px;
}
.headerp {
    text-align: center;
    margin-top: 20px;
}
.tishi {
    height: 37px;
    line-height: 37px;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(to right, #65e0f4, #4fade6);
    border-radius: 6px 6px 0 0;
    span {
        margin-left: 30px;
    }
}
.agent-con {
    position: relative;
    padding: 51.5px 0;
}
.icon-baojing {
    font-size: 40px;
    color: #f90;
}
.iconspan {
    margin-left: 70px;
    height: 40px;
    line-height: 40px;
    display: block;
    font-size: 16px;
    position: relative;
    .tispan {
        margin-left: 10px;
        position: absolute;
        font-size: 17px;
        color: #1f1f1f;
    }
}
.newspan {
    margin-left: 165px;
}
.pay {
    display: block;
    position: absolute;
    width: 160px;
    height: 35px;
    background: linear-gradient(180deg, #ff3492, #ff1e4f);
    text-align: center;
    line-height: 35px;
    color: #fff;
    font-size: 18px;
    left: 130px;
    top: 80px;
    border-radius: 10px;
}

.vp-admin-wrap-close {
    width: 60px;
    height: 40px;
    background: #f2f2f2;
    border-bottom-left-radius: 24px;
    border-top-left-radius: 24px;
    &:hover {
        background: linear-gradient(180deg, #ff3492, #ff1e4f);
    }
    .vp-admin-wrap-close-empty {
        position: relative;
        background: #fff;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        font-size: 56px;
        left: 2px;
        top: 2px;
        -moz-transition: all 0.5s ease-in;
        -webkit-transition: all 0.5s ease-in;
        -o-transition: all 0.5s ease-in;
        transition: all 0.5s ease-in;
        a {
            position: absolute;
            top: 9px;
            left: 9px;
            width: 20px;
            height: 20px;
            display: inline-block;
            background: url('/static/public/image/common/vp-common-close.png') #fff;
            background-size: 98% 98%;
        }
        &:hover {
            transform: translateX(40%);
        }
    }
}
</style>
