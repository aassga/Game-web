<template>
    <div class="game-wrap">
        <vp-home-header></vp-home-header>
        <vp-nav></vp-nav>
        <div class="geme_cont">
            <div class="carouse t-default" style="cursor:pointer ">
                <Carousel autoplay loop :style="{height:carheight +'px',overflow:'hidden'}" :autoplay-speed="autoplaySpeed" :dots="dots">
                    <Carousel-item v-for="(item, i) in carouselData" :key="i" class="myItems">
                        <a :href="item.targets" target="_blank" v-if="item.targets !=='#'">
                            <div
                                :style="{background: 'url(' + item.img + ')  no-repeat center top',backgroundSize:'cover',height: carheight +'px'}">
                            </div>
                        </a>
                        <div :style="{background: 'url(' + item.img + ')  no-repeat center top',backgroundSize:'cover',height: carheight +'px'}"
                            v-else></div>
                    </Carousel-item>
                </Carousel>
            </div>
            <div class="feature">
                <div class="content">
                    <div class="col col1">
                        <div class="prize">
                            <div class="jackpot-count" data-provider="AG">
                                <div>CNY</div>
                                <div class="jackpot-number">
                                    <span>{{jackpotNum1.toString().substring(0,3)}},{{jackpotNum1.toString().substring(3,6)}},{{jackpotNum1.toString().substring(6,9)}}.{{jackpotNum1.toString().substring(9,11)}}</span>

                                </div>
                            </div>
                        </div>
                        <p>AG电游总奖池</p>
                    </div>
                    <div class="col col2">
                        <div class="prize">
                            <div class="jackpot-count" data-provider="PT">
                                <div>CNY</div>
                                <div class="jackpot-number">
                                    <span>{{jackpotNum2.toString().substring(0,3)}},{{jackpotNum2.toString().substring(3,6)}},{{jackpotNum2.toString().substring(6,9)}}.{{jackpotNum2.toString().substring(9,11)}}</span>
                                </div>
                            </div>
                        </div>
                        <p>DT电游总奖池</p>
                    </div>
                    <div class="col col3">
                        <div class="prize">
                            <div class="jackpot-count" data-provider="MG">
                                <div>CNY</div>
                                <div class="jackpot-number">
                                    <span>{{jackpotNum3.toString().substring(0,3)}},{{jackpotNum3.toString().substring(3,6)}},{{jackpotNum3.toString().substring(6,9)}}.{{jackpotNum3.toString().substring(9,11)}}</span>

                                </div>
                            </div>
                        </div>
                        <p>MG电游总奖池</p>
                    </div>
                </div>
            </div>
            <vp-Games></vp-Games>
        </div>
        <vpFooter></vpFooter>
    </div>
</template>
<script>
import vpGames from '../../../public/games/478index.vue';
import vpHeaderPic from '../headerPic';
import vpHomeHeader from '../header.vue';
import vpNav from '../nav.vue';
import vpFooter from '../footer';
export default {
    data() {
        return {
            clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            headerImg: '/static/478qp/img/carouel/dz.jpg',
            carheight: 300,
            carouselData: [
                { img: '/static/478qp/img/banner/banner1.jpg', targets: '#' },
                { img: '/static/478qp/img/banner/banner2.jpg', targets: '#' }
            ],
            autoplaySpeed: 3000,
            dots: 'none',
            jackpotNum1: 41126438900,
            jackpotNum2: 90166438200,
            jackpotNum3: 81522438000,
            setInter1: null,
            setInter2: null,
            setInter3: null
        };
    },
    methods: {
        jackpotFc1() {
            clearInterval(this.setInter1);
            this.setInter1 = setInterval(() => {
                this.jackpotNum1 = this.jackpotNum1 + 18.66;
            }, 90);
        },
        jackpotFc2() {
            clearInterval(this.setInter2);
            this.setInter2 = setInterval(() => {
                this.jackpotNum2 = this.jackpotNum2 + 28.96;
            }, 50);
        },
        jackpotFc3() {
            clearInterval(this.setInter3);
            this.setInter3 = setInterval(() => {
                this.jackpotNum3 = this.jackpotNum3 + 38.36;
            }, 10);
        }
    },
    created() {
        if (this.clientwidth > 1920) {
            this.carheight = (300 * this.clientwidth) / 1920;
        }
    },
    mounted() {
        clearInterval(this.setInter1);
        clearInterval(this.setInter2);
        clearInterval(this.setInter3);
        this.jackpotFc1();
        this.jackpotFc2();
        this.jackpotFc3();
    },
    watch: {},
    components: {
        vpGames,
        vpHeaderPic,
        vpHomeHeader,
        vpNav,
        vpFooter
    },
    computed: {}
};
</script>

<style lang="less" scoped>
.geme_cont {
    background: url('/static/478qp/img/computer/bg1.jpg') no-repeat center top #1e1e1e;
    width: 100%;
    padding: 0 0 10px;
    position: relative;
    min-height: 590px;
    .feature {
        background: url('/static/478qp/img/computer/feature.jpg') no-repeat center top #1e1e1e;
        width: 100%;
        height: 120px;
        .content {
            width: 1220px;
            margin: 0 auto;
        }
        .col {
            float: left;
            width: 312px;
            text-align: center;
            padding-top: 27px;
            .prize {
                height: 24px;
                text-align: center;
                color: #999;
                font-size: 26px;
                text-shadow: 2px 6px 5px #000;
                padding-left: 40px;
                .jackpot-count {
                    & > div {
                        float: left;
                    }
                    .jackpot-number {
                        margin-left: 9px;
                        span {
                            letter-spacing: -1px;
                            color: #fff;
                        }
                    }
                }
                .jackpot-count:after {
                    clear: both;
                    content: '';
                    display: block;
                }
            }
            p {
                font-size: 16px;
                color: #ffcc66;
                margin: 15px 0 0;
                text-shadow: 2px 6px 5px #000;
            }
        }
        .col1 {
            margin-left: 104px;
        }
        .col2 {
            margin-left: 36px;
        }
        .col3 {
            margin-left: 22px;
        }
    }
}
</style>
