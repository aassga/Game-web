<template>
    <div class="home-help">
        <div class="container clearfloat">
            <!-- 左边导航 -->
            <div class="helpSlider">
                <ul class="helpMenu">
                    <li :class="active==key?'curr':''" v-for="(item,key) in aboutData" :key="key" @click="active=key">
                        <router-link :to="item.path">{{item.name}}</router-link>
                    </li>
                </ul>
            </div>

            <div class="helpContent" style="color:#fff;">
                <vp-article :title='title'></vp-article>
            </div>
        </div>
    </div>
</template>

<script>
import vpArticle from '../../../public/help/index';
export default {
    data() {
        return {
            aboutData: [
                { name: '视讯直播', path: '/home/live' },
                { name: '体育赛事', path: '/home/tiyu' },
                { name: '电子游艺', path: '/home/games?id=10015&name=AG老虎机' },
                { name: '彩票游戏', path: '/plays/hall' },
                { name: '代理合作', path: '/home/agent' },
                { name: '游戏规则', path: '/rules/ssc?id=4' }
            ],
            active: 0,
            title: '关于我们'
        };
    },
    methods: {
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
            let id = this.$router.history.current.params.id;
            let title = '';
            switch (id) {
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
            this.title = title;
        }
    },
    components: {
        vpArticle
    },
    created() {
        this.getTitle();
    },
    watch: {
        $route(newVal, oldVal) {
            this.getTitle();
        }
    }
};
</script>

<style lang="less" scoped>
.home-help {
    background: url(/static/bet365/img/bg-page.jpg) no-repeat center 0;
    background: #fff;
    padding-bottom: 15px;

    .container {
        width: 960px;
        margin: 0 auto;
        margin-top: 15px;
        background: #333;
        .helpSlider {
            width: 216px;
            float: left;
            height: 268px;
            background: url(/static/bet365/img/aside.png) no-repeat center;
            margin: 10px 0 0 30px;
            .helpMenu {
                width: 160px;
                margin: 25px auto 0;

                li {
                    font-size: 14px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    position: relative;

                    a {
                        display: block;
                        font-size: 14px;
                        color: #fff;
                    }
                }

                li:hover {
                    background: url(/static/bet365/img/aside-nav.png);
                }

                .curr {
                    a {
                        color: #fff;
                    }
                }
            }
        }

        .helpContent {
            width: 680px;
            float: right;
            min-height: 500px;
            margin-left: 20px;
            box-sizing: border-box;
            padding: 20px 20px 20px 0px;

            .help-info {
                position: relative;
                height: 160px;
                border: 1px solid #ddd;

                .help-cent {
                    float: left;
                    width: 149px;
                    height: 160px;
                    cursor: pointer;
                    position: relative;

                    .helpetin-left span {
                        font-size: 14px;
                        position: absolute;
                        left: 40px;
                        bottom: 25px;
                        color: #555;
                    }
                }
            }

            .help-center-box {
                margin-top: 12px;

                .help-center-tit {
                    border: 1px solid #ddd;
                    background: #fff;
                    height: 47px;
                    line-height: 47px;
                    color: #e4393c;
                    padding: 0 15px;
                    font-size: 18px;
                    overflow: hidden;
                }

                .help-center-list ul li {
                    line-height: 44px;
                    border-top: 0;
                    padding-left: 20px;

                    .f16 {
                        font-size: 16px;
                        margin-right: 10px;
                        color: #e4393c;
                    }
                }
            }
        }
    }
}
</style>
