<template>
    <div class="tiyu_cont" :class="{night:colorbool}">
        <vp-home-header></vp-home-header>
        <vp-nav></vp-nav>
        <vp-header-pic :headerImg="headerImg"></vp-header-pic>
        <div class="page-body">
            <div class="content">
                <div class="sports sports1" v-for="(sport,sportindex) in tiyulist" :key="sportindex" :class="sport.class">
                    
                    <div class="sport-img" :style="{background:sport.bgImage}">
                        <div class="trans">
                            <a href="javascript:void(0)" class="gold-button" @click="trustLogin(sport)">进入游戏</a>
                        </div>
                    </div>
                    <h4>{{sport.name}}</h4>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
        <vpFooter></vpFooter>
    </div>

</template>
<script>
import data from '../../../public/games/public.js';
import vpHeaderPic from '../headerPic';
import vpHomeHeader from '../header.vue';
import vpNav from '../nav.vue';
import vpFooter from '../footer';
export default {
    mixins: [data],
    data() {
        return {
            headerImg: '/static/478qp/img/banner/sports-banner.jpg',
            tiyulist: [
                {
                    name: '沙巴体育',
                    id: '38',
                    platform: 'sport',
                    bgImage: 'url(/static/478qp/img/sports/sport2.jpg)',
                    class: 'sports2'
                },
                {
                    name: 'IM体育',
                    id: '11368',
                    platform: 'sport',
                    bgImage: 'url(/static/478qp/img/sports/sport5.jpg)',
                    class: ''
                },
                {
                    name: '皇冠体育',
                    id: '39',
                    bgImage: 'url(/static/478qp/img/sports/sport1.jpg)',
                    class: ''
                },
                
                
                // {
                //     name: 'BBIN体育',
                //     id: '41',
                //     platform: 'sport',
                //     bgImage: 'url(/static/478qp/img/sports/sport3.jpg)',
                //     class: ''
                // },
                // {
                //     name: 'AG体育',
                //     id: '40',
                //     bgImage: 'url(/static/478qp/img/sports/sport4.jpg)',
                //     class: 'sports2'
                // }
            ]
        };
    },
    methods: {},
    created() {},
    mounted() {},
    watch: {},
    components: {
        vpHeaderPic,
        vpHomeHeader,
        vpNav,
        vpFooter
    },
    computed: {
        colorbool() {
            return this.$store.state.mainState.color;
        }
    }
};
</script>

<style lang="less" scoped>
.page-body {
    background: #1e1e1e;
    padding-top: 20px;
    min-height: 400px;
    .content {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        .sports {
            width: 594px;
            height: 300px;
            text-align: center;
            float: left;
            margin-top: 30px;
            h4 {
                font-size: 18px;
                color: #fff;
                font-weight: normal;
                text-align: center;
                margin: 0;
            }
            .sport-img {
                width: 100%;
                position: relative;
                margin-bottom:20px;
                height: 260px;
                .trans {
                    width: 594px;
                    height: 260px;
                    border: 1px solid #996b3d;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: url('/static/478qp/img/sports/trans.png');
                    display: none;
                    .gold-button {
                        font-size: 16px;
                        background: url(/static/478qp/img/sports/button.png) no-repeat;
                        width: 156px;
                        color: #fff;
                        display: inline-block;
                        line-height: 36px;
                        text-align: center;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
            }
            .sport-img:hover .trans {
                display: block;
            }
            .clear {
                clear: both;
            }
        }
        .sports2 {
            margin-left: 12px;
        }
    }
}
</style>
