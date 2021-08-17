<template>
    <div class="wrapper">
        <!-- 除首页外的banner -->
        <section class="banner-cpyx">
            <banView :headerImg="headBg"></banView>
        </section>

        <!-- 公告跑马灯 -->
        <div class="notice">
            <div class="w1000">
                <span>最新公告</span>
                <marquee v-if="lantern" align="middle" direction="left" loop="-1" scrollamount="3" onmouseout="this.start()"
                    onmouseover="this.stop()">
                    <a href="javascript:;" v-html="lantern"></a>
                </marquee>
            </div>
        </div>

        <pub-activity show-banner :banner-style="bannerStyle" :styles="cssStyle" :class-obj="classObj" noTitle="noTitle" widths="1140"
            show-nav :nav-style="navStyle"></pub-activity>
    </div>

</template>

<script>
import Activity from '../../../public/activity/index';
import banView from "../../../public/game_new/banView";

export default {
    name: 'index',
    components: {
        pubActivity: Activity,
        banView
    },
    data() {
        return {
            headBg: '/static/vns81/img/money.jpg',
            lantern: '',
            bannerStyle: {},
            cssStyle: {
                padding: '20px 20px 20px',
                background: 'url(/static/vns81/img/bg_activity.jpg)',
                backgroundSize: 'contain',
                maxWidth: '1920px',
                minWidth: '1200px',
                margin: '0 auto'
            },
            navStyle: {
                bannerHead: {
                    width: '1100px',
                    height: '50px',
                    margin: '0 auto',
                    backgroundColor: '#1b1b1b'
                },
                bannerUl: {
                    width: '100%',
                    margin: '0 auto',
                    height: '100%'
                },
                li: {
                    float: 'left',
                    width: 'auto',
                    height: '100%',
                    textAlign: 'center',
                    boxSizing: 'border-box'
                },
                a: {
                    display: 'block',
                    position: 'relative',
                    height: '50px',
                    lineHeight: '50px',
                    fontSize: '14px',
                    margin: '0 8px',
                    padding: '0 20px'
                }
            },
            classObj: {
                vnst: true,
                navWidth: true
            }
        };
    },
    methods: {
        // 新文字走马灯接口
        async getLantern() {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
                type: 'lantern',
                client_type: 'PC'
            });
            if (res && res.code == 200) {
                if (res.data.data.length) {
                    this.lantern = res.data.data[0] && res.data.data[0].description;
                } else {
                    return false;
                }
            }
            // 参数： type: lantern 走马灯
            // 参数： type: popups 弹窗
            // 参数： type: notice 提示
        }
    },
    mounted() {
        this.getLantern();
    }
};
</script>
<style lang="less" scoped>
.wrapper {
    .notice {
        height: 36px;
        line-height: 36px;
        width: 100%;
        margin-top: 0px;
        background: url(/static/vns81/img/noticebg.png) repeat-x;

        .w1000 {
            width: 1040px;
            height: 100%;
            margin: auto;
            span {
                font-size: 12px;
                background: url(/static/vns81/img/notice.png) left center no-repeat;
                padding-left: 30px;
                width: 128px;
                float: left;
                display: block;
                height: 36px;
                line-height: 37px;
                color: #e0bf55;

                i {
                    font-style: normal;
                }
            }

            marquee {
                float: right;
                width: 860px;
                margin-right: 10px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                a {
                    color: #fff;
                }
            }
        }
    }
}
</style>