<template>
    <div>
        <ul id="TplFloatPic_0" class="TplFloatSet" picfloat="left">
            <a id="adleft" style="display:block;" href="javascript:void(0)">
                <img src="/static/amvnsr/img/left.gif">
            </a>
            <div @click="goView('/home/jiebei')" class="jiebei"></div>
            <div @click="goView('/home/youhui')" class="hot-btn"></div>
            <div @click="hide1" id="close-left" class="close-btn"></div>
        </ul>
        <ul id="TplFloatPic_1" class="TplFloatSet" picfloat="right">
            <a id="adright" style="display:block;" href="javascript:void(0)"><img src="/static/amvnsr/img/right.gif"></a>
            <a :href="url" target="_blank" class="kefu-btn"></a>
            <div @click="goView('/home/register/agent')" class="register-btn"></div>
            <div @click="$goUserCen('recharge',0)" class="transfer"></div>
            <a class="download" href="/static/amvnsr/html/download/index.html" target="_blank"></a>
            <div class="codebox">
                <div ref="qr-code"></div>
            </div>
            <div id="close-right" @click="hide2" class="close-btn"></div>
        </ul>
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
            url:''
        };
    },
    methods: {
        hide1() {
            $('#TplFloatPic_0').hide();
        },
        hide2() {
            $('#TplFloatPic_1').hide();
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
        goView(link) {
            if (link == '/home/jiebei') {
                window.open('/static/amvnsr/html/active/jiebei/index.html');
                return false;
            }
            this.$router.push(link);
        }
    },
    mounted() {
        this.getUrl()
        this.$addWindow();
        this.createDownloadQRCode({
            el: this.$refs['qr-code'],
            url: window.location.origin + '/m#/download',
            size: 100
        });
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
    position: absolute;
    top: 160px;
    z-index: 1000;
    width: 117px;
    cursor: pointer;

    &#TplFloatPic_0 {
        left: 3px;

        .jiebei {
            position: absolute;
            width: 133px;
            height: 108px;
            top: 0;
            left: 5px;
        }

        .hot-btn {
            position: absolute;
            width: 140px;
            height: 252px;
            top: 107px;
            left: 0;
        }
    }
    &#TplFloatPic_1 {
        right: 28px;

        .kefu-btn {
            position: absolute;
            width: 140px;
            height: 70px;
            top: 0;
            left: 0;
        }
        .register-btn {
            position: absolute;
            width: 140px;
            height: 86px;
            top: 70px;
            left: 0;
        }
        .transfer {
            position: absolute;
            top: 157px;
            width: 133px;
            height: 54px;
            left: 4px;
        }

        .download {
            display: block;
            width: 142px;
            height: 26px;
            position: absolute;
            top: 212px;
        }
        .codebox {
            display: block;
            width: 108px;
            height: 108px;
            background: #fff;
            padding: 4px;
            position: absolute;
            left: 61%;
            transform: translateX(-50%);
            bottom: 32px;
            text-align: center;
        }
    }

    .close-btn {
        position: absolute;
        width: 137px;
        height: 27px;
        top: 357px;
        left: 2px;
    }
}
</style>
