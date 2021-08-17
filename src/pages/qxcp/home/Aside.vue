<template>
    <div>
        <ul id="TplFloatPic_0" class="TplFloatSet TplFloatPic_1" picfloat="left">
            <div id="adleft" style="display:block;" href="javascript:void(0)">
                <img src="/static/qxcp/img/left.png">
            </div>
            <div class="dz">
                <span @click="$router.push('/home/chess?navid=9&id=0')"></span>
                <span @click="$router.push('/home/slot?navid=9&id=0')"></span>
                <span @click="$router.push('/home/fish?navid=9&id=0')"></span>
            </div>
            <div class="hot-btn">
                <span @click="$router.push('/home/chess?navid=9&id=10042')"></span>
                <span @click="$router.push('/home/chess?navid=9&id=10612')"></span>
                <span @click="$router.push('/home/chess?navid=9&id=10694')"></span>
                <span @click="$router.push('/home/slot?navid=9&id=10022')"></span>
                <span @click="$router.push('/home/fish?navid=9&id=0')"></span>
            </div>
            <div @click="hide1" id="close-left" class="close-btn"></div>
        </ul>
        <ul id="TplFloatPic_1" class="TplFloatSet TplFloatPic_1" picfloat="right">
            <div id="adright" style="display:block;" href="javascript:void(0)"><img src="/static/qxcp/img/right.png"></div>
            <a :href="url" target="_blank" class="kefu-btn"></a>
            <div @click="$goUserCen('recharge',0)" class="transfer"></div>
            <div class="jiebei" @click="goView"></div>
            <div class="jiance" @click="goView2"></div>
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
            url:""
        };
    },
    methods: {
        gocp(){
            window.open("#/plays/hall");
        },
        hide1() {
            $('#TplFloatPic_0').hide();
        },
        hide2() {
            $('#TplFloatPic_1').hide();
        },
        goView() {
           //window.open('/static/qxcp/html/active/jiebei/index.html');
           if(localStorage.token){
                    if(this.$store.state.game.jieBeiData.show){
                     this.$goUserCen('borrowMoney',0)
                    }else{
                     this.$goUserCen('recharge',0)
                   }
                  }else{
                  this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '请先登录',
                    model: 'error',
                    leftspan: true
                });
         }
        },
        goView2() {
           window.open('http://817.cc/')
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
    top: 170px;
    z-index: 1000;
    width: 175px;
    transition:all ease .3s;
    &#TplFloatPic_0 {
        left: 3px;

        .jiebei {
            position: absolute;
            width: 133px;
            height: 108px;
            top: 0;
            left: 5px;
        }
        .dz{
            width: 140px;
            position: absolute;
            height: 25px;
            left:19px;
            top:31px;
            cursor: pointer;
            span{
                width: 46px;
                height: 25px;
                display: block;
                float: left;
            }
        }
        .hot-btn {
            position: absolute;
            width: 140px;
            height: 187px;
            top: 183px;
            left: 19px;
            cursor: pointer;
            span{
                display: block;
                height: 40px;
            }
        }
    }
    &#TplFloatPic_1 {
        right: 3px;

        .kefu-btn {
            position: absolute;
            width: 130px;
            height: 70px;
            display: block;
            top: 65px;
            left: 26px;
            cursor: pointer;
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
            top: 142px;
            width: 133px;
            height: 54px;
            left: 24px;
            cursor: pointer;
        }
        .jiebei{
            position: absolute;
            width: 130px;
            height: 40px;
            top: 300px;
            left: 24px;
            cursor: pointer;
        }
        .jiance{
            position: absolute;
            width: 130px;
            height: 40px;
            top: 340px;
            left: 24px;
            cursor: pointer;
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
        width: 115px;
        height: 35px;
        top: 381px;
        left: 28px;
        cursor: pointer;
    }
}
</style>
