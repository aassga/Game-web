<template>
    <div id="page-container" :style="{'height':h+'px'}">
        <div id="page-body" class="clearfix">
            <!-- 首頁特例 lang -->
            <div class="first-left-wrap">
                <div id="first-lang-wrap" class="first-lang-wrap">
                    <a href="javascript:;" v-for="(asideItem,asideIndex) in asideList" :key="asideIndex"
                        :class="{'asideChecked':asideChecked == asideIndex}" @click="changeLangue(asideIndex)">{{asideItem}}</a>
                </div>
            </div>
            <div class="first-right-wrap">
                <!-- 体育 -->
                <div id="g01">
                    <div id="g01img">
                        <div id="flash">
                            <a href="javascript:void(0);">
                                <span class="goGame" @click="$goPath('rot','/home/tiyu?id=0')"></span>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- 真人 电子 彩票 -->
                <div class="clear"></div>
                <div class="middleGame">
                    <div class="panel_b" style=" margin-left:0;" @click="$router.push('/home/live')">
                        <div class="gameItem g02">
                            <a href="javascript:void(0);">
                                <img src="/static/betnew/img/home/g02.png" alt="">
                            </a>
                            <div class="line_01"></div>
                            <div class="p_cont">
                                <h1>娱乐场</h1>
                                <div class="line_02"></div>
                                <span>1,000 RMB 奖金</span>
                                <div class="line_02"></div>
                                <p>超过200种精选游戏，包括最经典的现场荷官，精彩内容面向全部玩家。</p>
                                <a href="javascript:void(0);" class="btn_start"></a>
                            </div>
                        </div>
                    </div>

                    <div class="panel_b" @click="$router.push('/home/slot?navid=9&id=0')">
                        <div class="gameItem g04">
                            <a href="javascript:void(0);"> <img src="/static/betnew/img/home/g04.png" alt=""> </a>
                            <div class="line_01"></div>
                            <div class="p_cont">
                                <h1>电子</h1>
                                <div class="line_02"></div>
                                <span>1,000 RMB 奖金</span>
                                <div class="line_02"></div>
                                <p>上百款老虎机、电动扑克、大型电玩、桌上游戏、以丰富的视觉、声光效果提供您一级的娱乐。</p>
                                <a href="javascript:void(0);" class="btn_start"></a>
                            </div>
                        </div>
                    </div>

                    <div class="panel_b" @click="goLottery">
                        <div class="gameItem g03">
                            <a href="javascript:void(0);">
                                <img src="/static/betnew/img/home/g03.png" alt="">
                            </a>
                            <div class="line_01"></div>
                            <div class="p_cont">
                                <h1>彩票游戏</h1>
                                <div class="line_02"></div>
                                <span>1,000 RMB 奖金</span>
                                <div class="line_02"></div>
                                <p>最受全球华人喜欢的彩票游戏：时时彩，香港彩，双色球，福彩3D等在线投注方便快捷</p>
                                <a href="javascript:void(0);" class="btn_start playlotto"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- footer -->
                <div class="wrapbox">
                    <div class="footers">
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
                                    <div class="copyright">2001-2021 bet365。版权所有。</div>
                                    <div class="footer-info"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- footer paragraph -->
                    <div class="noteBox">
                        <div class="first-footer-wrap">
                            <div class="footer-bottom-wrap">
                                <p>
                                    通过进入、继续使用或浏览此网站，您即被认定接受：我们将使用特定的浏览器cookies优化您的客户享用体验。bet365仅会使用优化您服务体验的cookies，而不是可侵犯您隐私的cookies。关于我们使用cookies，以及您如何取消、管理cookies使用的更多详情，请参考我们的Cookies政策。bet365是世界领先的网络博彩集团之一，提供体育投注、金融、娱乐场、扑克牌及游戏等丰富选择。
                                </p>
                                <p>
                                    我们向客户提供全部体育范围内的丰富投注，内容涵盖足球、网球、篮球、棒球及乒乓球等。每场欧冠联赛足球比赛都提供超过70个不同的滚球盘盘口，同时我们的100％欧洲精英足球奖金也适用于该赛事。您可同时通过访问“移动中的bet365”，查看种类繁多的盘口和精彩赛事，其中包括我们的滚球盘服务。如想体验该项服务，只需使用您的iPhone、iPad、Android或手机浏览器访问bet365。为增加滚球盘的兴奋感受，我们还特别推出了现场链接，每年向您的电脑直播50,000多场精彩赛事。精选包括大师系列赛网球锦标赛和来自世界各地顶尖的国家级足球联赛。如想查看最新的体育投注信息，请访问我们全新的投注新闻站点。
                                </p>

                                <p>
                                    除了类别多样的体育投注之外，我们还提供丰富多种的精彩优惠。比如激动人心的欧洲精英足球奖金，如果您在英超、意甲、西甲、德甲或欧洲冠军联赛上进行过关投注，即有机会获取最高可达您彩金100％比例的奖金。另外，还有我们的零分平局退本大赠送优惠，如果您在赛前投注了"正确比分”、“半场/全场”
                                    或者“首个得分球员及最终比分”这些盘口，且假如比赛结果为0-0，我们将把输的投注取消，不惜退本大赠送!
                                </p>
                                <p>
                                    为何不尝试我们惊喜不断的在线娱乐场？150多种精彩游戏任您选择，包括21点等各种游戏。如想进行轮盘或百家乐，请立即访问现场荷官。而且，我们的扑克室是世界最大的在线扑克网络，您可在此挑战数千名现金比赛玩家或参加在线大型锦标赛事。
                                </p>

                                <p>
                                    bet365体育投注与金融投注，由英国博彩委员会颁发执照及进行监管。娱乐场、游戏与扑克牌由直布罗陀政府颁发执照及进行监管。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import store from '@/vuex/store';
import { postS, getS, _SetGet, _SetPost } from '@/service/public/service.js';

export default {
    data() {
        return {
            h: document.documentElement.clientHeight - 165,
            asideList: [
                'English',
                'Español',
                'Deutsch',
                'Italiano',
                'Português',
                'Dansk',
                'Svenska',
                'Norsk',
                '简体中文',
                '繁體中文',
                'Български',
                'Ελληνικά',
                'Polski',
                'Română',
                'Česky',
                'Magyar',
                'Slovenčina',
                'Nederlands'
            ],
            asideChecked: 8,
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
        changeLangue(index) {
            if (index == '8') {
                return;
            } else {
                this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '您的IP不支持该语言！',
                    model: '',
                    leftspan: true
                });
            }
        },

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

        goLottery() {
            window.open('#/plays/hall', '_blank');
        },

        goGamepage() {
            if (!localStorage.token || !localStorage.userinfo) {
                this.$store.commit('alert/showTipModel', {
                    bool: true,
                    title: '请先登录',
                    model: 'warn'
                });
            } else {
                this.getItemId({ id: 38 });
            }
        }
    },
    created(){
        setTimeout(() => {
            if(localStorage.register){
                this.$store.commit('cjw/showRegister', true)
                localStorage.removeItem('register')
            }
        }, 2000);
    },
    mounted() {},
    computed: {
        tipDatas() {
            return this.$store.state.alert.tipModel;
        }
    },
    store
};
</script>

<style lang="less" scoped>
.asideChecked {
    color: #dfd42a !important;
}
#page-container {
    min-height: 960px;
    padding-bottom: 20px;
    width: 1000px;
    margin: 0 auto;
    #page-body {
        .first-left-wrap {
            float: left;
            width: 120px;
            background: url(/static/betnew/img/home/index_left_y.jpg) repeat-y;
            .first-lang-wrap {
                min-height: 432px;
                padding-bottom: 172px;
                width: 120px;
                background: url(/static/betnew/img/home/index_left.jpg) no-repeat;
                background-size: cover;
                a {
                    display: block;
                    height: 24px;
                    line-height: 24px;
                    text-decoration: none;
                    font-size: 14px;
                    color: #fff;
                    text-align: center;
                    &:hover {
                        color: #dfd42a !important;
                    }
                }
            }
        }
        .first-right-wrap {
            float: right;
            width: 880px;
            background-color: #333;

            #g01 {
                width: 858px;
                height: 220px;
                padding: 4px;
                background: #636363;
                margin: 0 auto;
                margin-top: 5px;
                margin-bottom: 10px;

                &:hover {
                    background: #ffff00;
                }

                #g01img {
                    margin: 0;
                    height: 212px;
                    background: url(/static/betnew/img/home/title_first.png) no-repeat;

                    #flash {
                        float: left;
                        width: 645px;
                        height: 212px;
                        overflow: hidden;

                        a {
                            display: block;
                            width: 645px;
                            height: 212px;
                            position: relative;
                            .goGame {
                                width: 172px;
                                height: 28px;
                                position: absolute;
                                bottom: 22px;
                                right: 28px;
                            }
                        }
                    }
                }
            }

            .clear {
                clear: both;
            }

            .middleGame {
                width: 858px;
                margin: 0 auto;
                background: #333333;
                &:after {
                    clear: both;
                    content: '';
                    display: block;
                }

                .panel_b {
                    background: #333;
                    border: 1px #1d1d1d solid;
                    float: left;
                    margin-bottom: 10px;
                    margin-left: 10px;

                    .gameItem {
                        padding: 4px;
                        height: 242px;
                        width: auto !important;
                        width: 252px;

                        &.g02 {
                            background: #636363 url(/static/betnew/img/home/panel_b_bg.jpg) no-repeat center;
                        }
                        &.g04 {
                            background: #636363 url(/static/betnew/img/home/panel_b_bg.jpg) no-repeat center;
                        }
                        &.g03 {
                            background: #636363 url(/static/betnew/img/home/panel_b_bg.jpg) no-repeat center;
                        }
                        &:hover {
                            background: #ffff00 url(/static/betnew/img/home/panel_b_bg.jpg) no-repeat center;
                            cursor: pointer;
                        }
                    }

                    .line_01 {
                        background: url(/static/betnew/img/home/top_line.jpg) repeat-x top center;
                        height: 2px;
                    }

                    .p_cont {
                        padding-left: 6px;
                        padding-right: 6px;
                        width: 258px;

                        h1 {
                            color: white;
                            font-size: 18px;
                            line-height: 36px !important;
                            line-height: 24px;
                            display: block;
                            font-weight: normal;
                        }

                        span {
                            color: #fc0;
                            font-size: 12px;
                            font-weight: bold;
                            line-height: 24px;
                        }

                        .line_02 {
                            background: #358469;
                            height: 1px;
                            overflow: hidden;
                        }

                        p {
                            margin-top: 8px;
                            display: block;
                            color: #ffffff;
                            height: 38px;
                            overflow: hidden;
                            font-family: '微软雅黑';
                            font-size: 12px;
                            line-height: 20px;
                        }

                        .btn_start {
                            background: url(/static/betnew/img/home/btn_start.png) no-repeat left;
                            height: 15px;
                            width: 80px;
                            display: block;
                        }
                    }
                }
            }

            .wrapbox {
                background: #004531;

                .footers {
                    background-color: #004531;
                    height: auto;
                    overflow: hidden;
                    .first-footer-wrap {
                        width: 850px;
                        margin: 0px auto 0;

                        .footer-top-wrap {
                            color: #697571;
                            border-top: 1px solid #275a4b;
                            border-bottom: 1px solid #275a4b;
                            padding: 12px 0 12px 0;
                            margin-top: 16px;
                            .footer-top-left {
                                float: left;
                                width: 100%;
                                padding-right: 10px;
                                text-align: center;
                                padding-left: 18px;
                                .article-menu {
                                    a {
                                        color: #80a298;
                                        display: inline-block;
                                        padding: 0 5px;
                                        font-size: 12px;
                                    }
                                    a:after {
                                        content: '|';
                                        display: inline-block;
                                        color: #697571;
                                        opacity: 0.7;
                                        padding-left: 10px;
                                    }

                                    a:hover {
                                        text-decoration: underline;
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
                                        li:last-child a:after {
                                            content: '' !important;
                                        }
                                    }
                                }
                                .article-menu:after {
                                    clear: both;
                                    content: '';
                                    display: block;
                                }
                                .copyright {
                                    margin-top: 12px;
                                    font-family: 'STHeiti';
                                    font-size: 12px;
                                    color: #80a298;
                                }
                            }
                            .footer-top-right {
                                float: left;
                                width: 264px;
                                #bblogo {
                                    display: inline-block;
                                    width: 113px;
                                    height: 46px;
                                    background: url(/static/betnew/img/home/bbinlogo.png);
                                }
                                #browser-logo {
                                    display: inline-block;
                                    margin-left: 33px;
                                }
                            }
                        }
                    }
                }

                .noteBox {
                    padding-bottom: 20px;
                    width: 100%;
                    background: #004531;
                    .first-footer-wrap {
                        width: 850px;
                        margin: 10px auto 0;

                        .footer-bottom-wrap {
                            line-height: 20px;
                            color: #417667;
                            font-size: 12px;
                            p {
                                margin-bottom: 10px;
                                line-height: 22px;
                            }
                            p:last-child {
                                margin-bottom: 0;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
