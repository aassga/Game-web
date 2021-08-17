<template>
    <div class="qmcp-home-nav">
        <div class="wrapper">
            <div class="nav-caidan">
                <ul>
                    <li v-for="(item,i) in navlist1" class="nav" :class="{navActive:navActive ==i}" :key="i" @click.stop="$goPath('one',item)">
                        <span class="title">{{item.name}}</span>
                        <span class="en">{{item.en}}</span>
                        <div class="sub-nav clearfix" :class="'sub-nav-'+item.en" v-if="item.sub">
                            <div class="sub" v-for="(subitem,i) in item.sub" :key="i" @click.stop="goGame(subitem,item.en)">
                                <i v-if="subitem.hot" class="hot"></i>
                                <a href="javascript:;">
                                    <img :src="subitem.icon" alt="">
                                </a>
                                <span>{{subitem.name}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="logo">
                <a href="javascript:void(0)" @click="goHome">
                    <img src="/static/qmcp/img/logo.png" alt="全名彩票">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store';
export default {
    data() {
        return {
            navlist1: [
                {
                    name: '网站首页',
                    link: '/home',
                    en: 'HOME'
                },
                {
                    name: '购彩大厅',
                    link: '/plays/hall',
                    en: 'LOTTERY',
                    type:'lottery',
                    sub: [
                        {
                            name: '快速赛车',
                            icon: '/static/public/image/lottery/nico/png/12.png',
                            path: '/plays/tradition/12',
                            hot: true,
                            lid:12
                        },
                        {
                            name: '快乐赛车',
                            icon: '/static/public/image/lottery/nico/png/13.png',
                            path: '/plays/tradition/13',
                            hot: true,
                            lid:13
                        },
                        {
                            name: '幸运赛车',
                            icon: '/static/public/image/lottery/nico/png/3630.png',
                            path: '/plays/tradition/3630',
                            hot: true,
                            lid:3630
                        },
                        {
                            name: '北京赛车',
                            icon: '/static/public/image/lottery/nico/png/2.png',
                            path: '/plays/tradition/2',
                            lid:2
                        },
                        {
                            name: '香港赛马',
                            icon: '/static/public/image/lottery/nico/png/10044.png',
                            path: '/plays/tradition/10044',
                            lid:10044
                        },
                        {
                            name: '快速时时彩',
                            icon: '/static/public/image/lottery/nico/png/16.png',
                            path: '/plays/tradition/16',
                            hot: true,
                            lid:16
                        },
                        {
                            name: '三分时时彩',
                            icon: '/static/public/image/lottery/nico/png/17.png',
                            path: '/plays/tradition/17',
                            hot: true,
                            lid:17,
                        },
                        {
                            name: '欢乐生肖',
                            icon: '/static/public/image/lottery/nico/png/4.png',
                            path: '/plays/tradition/4',
                            lid:4
                        },

                        {
                            name: '快速六合彩',
                            icon: '/static/public/image/lottery/nico/png/18.png',
                            path: '/plays/tradition/18',
                            lid:18
                        },
                        {
                            name: '香港六合彩',
                            icon: '/static/public/image/lottery/nico/png/1.png',
                            path: '/plays/tradition/1',
                            hot: true,
                            lid:1
                        },
                        {
                            name: '快速快三',
                            icon: '/static/public/image/lottery/nico/png/27.png',
                            path: '/plays/tradition/27',
                            lid:27
                        },
                        {
                            name: '三分快三',
                            icon: '/static/public/image/lottery/nico/png/3631.png',
                            path: '/plays/tradition/3631',
                            hot: true,
                             lid:3631
                        },
                        {
                            name: '五分快三',
                            icon: '/static/public/image/lottery/nico/png/3632.png',
                            path: '/plays/tradition/3632',
                             lid:3632
                        },
                        {
                            name: '江苏快三',
                            icon: '/static/public/image/lottery/nico/png/9.png',
                            path: '/plays/tradition/9',
                            lid:9
                        },
                        {
                            name: '快乐飞艇',
                            icon: '/static/public/image/lottery/nico/png/10045.png',
                            path: '/plays/tradition/10045',
                            hot: true,
                            lid:10045
                        }
                    ]
                },
                { name: '棋牌游戏', link: '/home/chess?navid=9&id=0', en: 'CHESS' },
                { name: '真人视讯', link: '/home/live', en: 'CASINO' },
                {
                    name: '体育赛事',
                    link: '/home/tiyu',
                    en: 'SPORT',
                },
                { name: '电子游艺', link: '/home/slot?navid=9&id=0', en: 'GAME' },
                { name: '捕鱼达人', link: '/home/fish?navid=9&id=0', en: 'FISHING' },
                { name: '优惠活动', link: '/home/youhui', en: 'ACTIVITY' },
                { name: '在线客服', link: 'service',type:'service', en: 'SERVICE' }
            ]
        };
    },
    methods: {
        goHome() {
            this.$router.push('/');
            this.$store.commit('hsyl/setNav', 0);
        },
        goGame(a,b){
            if(b == 'LOTTERY'){
            if(localStorage.token){
                this.$store.dispatch('lottery/getStopLotteryCheck',a.lid).then(res=>{
                    if(res&&res.length >0 ){
                        this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: res.replace(/，/g,'</br>'),
                        model: 'warn',
                        type:'closeMaret',
                        });
                    }else{
                    window.open(this.$router.resolve(a.path).href)
                    return false
                    }
                })
            }else{
                this.dNotify("请先登录", 'error')
            }
            }else{
                this.$loginGame(a);
            }
        },
    },
    computed: {
        navActive() {
            return this.$store.state.hsyl.navActive;
        }
    },
    store
};
</script>

<style lang="less" scoped>
.sub-nav {
    .sub {
        a {
            img {
                width: 60px !important;
                height: 60px !important;
                border-radius: 50%;
                margin-top: 10px;
            }
        }
    }
}
</style>
