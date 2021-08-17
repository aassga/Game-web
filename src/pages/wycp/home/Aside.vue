<template>
    <div>
        <ul v-show="s1" class="TplFloatSet0 TplFloatSet TplFloatPic_1"
            style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
            <img src="/static/wycp/img/left.png" alt="">
            <a @click="$goUserCen('recharge',1)" class="wechat" href="javascript:;"></a>
            <a @click="$goUserCen('recharge',1)" class="zhifubao" href="javascript:;"></a>
            <!-- <a @click="$goUserCen('recharge',1)" class="qq" href="javascript:;"></a> -->
            <a href="/static/public/active/jgj/index.html" class="jgj" target="_blank"></a>
            <a href="/static/wycp/html/active/czjhb/index.html" class="dzp"></a>
            <a class="close" @click="s1=false" href="javascript:;"></a>
        </ul>

        <ul v-show="s2" class="TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
            <img src="/static/wycp/img/right.png" alt="">
            <a class="kefu" :href="url" target="_blank"></a>
            <a href="javascript:;" @click="gomessge" class="tousu"></a>
            <a class="close" @click="s2=false" href="javascript:;"></a>
        </ul>

        <a v-show="show_hongbao" target="_blank" href="/static/wycp/html/active/czjhb/index.html"
            style="position: fixed; z-index: 1001; left: 0; bottom: 0;">
            <span class="close_btn" @click.stop="show_hongbao=false"
                style="position: absolute;display: inline-block;width: 20px;height: 20px;right: 0;  z-index: 10001;cursor: pointer;"></span>
            <img src="/static/wycp/img/redb.gif" alt="红包雨">
        </a>
    </div>
</template>

<script>
import store from '@/vuex/store';
import $ from 'jquery';

export default {
    data() {
        return {
            s1: true,
            s2: true,
            show_hongbao: true,
            url:""
        };
    },
    methods: {
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
        gomessge() {
            if (localStorage.token) {
                this.$goUserCen('message', 1);
            } else {
                this.$store.commit('alert/showTipModel', {
                    bool: true,
                    title: '请先登录',
                    model: 'warn'
                });
            }
        }
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
    mounted() {
        this.getUrl();
        this.$addWindow(170);
    },
    store
};
</script>

<style lang="less" scoped>
.TplFloatSet {
    cursor: pointer;
    right: 10px;
    width: 127px;

    a {
        width: 100%;
        position: absolute;
        left: 0;
    }

    .wechat {
        height: 30px;
        top: 120px;
    }

    .zhifubao {
        height: 30px;
        top: 155px;
    }

    .qq {
        height: 30px;
        top: 195px;
    }

    .jgj {
        bottom: 95px;
        height: 31px;
    }

    .dzp {
        bottom: 50px;
        height: 31px;
    }

    .close {
        width: 75%;
        height: 30px;
        bottom: 2px;
        left: 17px;
    }

    .kefu {
        bottom: 95px;
        height: 33px;
    }

    .tousu {
        bottom: 58px;
        height: 30px;
    }
}

.TplFloatSet0 {
    left: 18px;

    .sign-in {
        height: 42px;
        top: 75px;
    }
}
</style>
