<template>
    <div>
        <ul v-show="s1" class="TplFloatSet0 TplFloatSet TplFloatPic_1"
            style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
            <img src="/static/dalao/img/left.png" alt="">
            <a @click="$goUserCen('recharge',1)" class="wechat" href="javascript:;"></a>
            <a @click="$goUserCen('recharge',1)" class="zhifubao" href="javascript:;"></a>
            <a @click="$goUserCen('recharge',1)" class="qq" href="javascript:;"></a>
            <a href="/static/public/active/jgj/index.html" class="jgj" target="_blank"></a>
            <a class="close" @click="s1=false" href="javascript:;"></a>
        </ul>
        <ul v-show="s2" class="TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
            <img src="/static/dalao/img/right.png" alt="">
            <a class="kefu" :href="url" target="_blank"></a>
            <a class="tousu" href="javascript:;" @click="tousu"></a>
            <a class="close" @click="s2=false" href="javascript:;"></a>
        </ul>
        <a v-show="show_hongbao" @click="goHongbao" href="javascript:;" style="position: fixed; z-index: 1001; left: 0; bottom: 0;">
            <span class="close_btn" @click.stop="show_hongbao=false"
                style="position: absolute;display: inline-block;width: 20px;height: 20px;right: 0;  z-index: 10001;cursor: pointer;"></span>
            <img src="/static/dalao/img/redb.gif" alt="红包雨">
        </a>
    </div>
</template>

<script>
import store from '@/vuex/store';
import data from '../../public/homeMeans/Aside';

export default {
    mixins: [data],
    data() {
        return {
            s1: true,
            s2: true,
            show_hongbao: true,
            url:""
        };
    },
    methods: {
        goHongbao() {
            window.open('/static/dalao/html/active/czjhb/index.html', '_blank');
        },
        getUrl(){
            let service = JSON.parse(localStorage.config).service;
            if (service) {
                let ser = service.find(item => item.status === 'on')
                if (ser) {
                    this.url = ser.url
                }
            }
            this.$store.commit('home/reloadeKefu',false)
        },
        tousu() {
            if (localStorage.token) {
                this.goUserCen('message', 1);
            } else {
                this.$store.commit('alert/showTipModel', {
                    bool: true,
                    title: '请先登录',
                    model: 'warn'
                });
            }
        }
    },
    mounted() {
        this.getUrl();
        this.addWindow(170);
    },
    computed: {
      reloadeKefu () {
        return this.$store.state.home.reloadeKefu
      }
    },
    watch:{
        reloadeKefu:function(val){
          if(val){
            this.getUrl()
          }
        }
    },
    store
};
</script>

<style lang="less" scoped>
.TplFloatSet {
    right: 18px;
    width: 132px;

    .close,
    .kefu,
    .btn_reg,
    .wechat,
    .zhifubao,
    .qq,
    .bank,
    .tousu {
        padding: 15px 50px;
        position: absolute;
        bottom: -2px;
        left: 24px;
    }

    .kefu {
        bottom: 90px;
        height: 120px;
        width: 120px;
        left: 0;
        display: inline-block;
        height: 70px;
    }
    .tousu {
        bottom: 50px;
    }
    .btn_reg {
        bottom: 270px;
    }

    .wechat {
        bottom: 186px;
        width: 120px;
        left: 0;
    }

    .zhifubao {
        bottom: 140px;
        width: 120px;
        left: 0;
    }

    .qq {
        bottom: 97px;
        width: 120px;
        left: 0;
    }

    .bank {
        bottom: 112px;
    }

    .jgj {
        left: 0;
        bottom: 47px;
        width: 127px;
        height: 31px;
    }

    .dzp {
        left: 0;
        bottom: 42px;
        width: 127px;
        height: 31px;
    }
}

.TplFloatSet0 {
    left: 18px;

    a {
        position: absolute;
    }

    .sign-in {
        width: 100%;
        height: 42px;
        top: 75px;
    }
}
</style>
