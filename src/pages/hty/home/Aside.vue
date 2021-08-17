<template>
    <div>
        <ul id="TplFloatPic_0" class="TplFloatSet TplFloatPic_1" picfloat="left">
            <div id="adleft" style="display:block;" href="javascript:void(0)">
                <img src="/static/hty/img/right.png">
            </div>
             <a :href="url" target="_blank" class="kefu-btn"></a>
            <div @click="goyh" class="transfer"></div>
            <div class="jiebei" @click="goView"></div>
            <div class="jiance" @click="goView2"></div>
           
            <div @click="hide1" id="close-left" class="close-btn"><img src="/static/hty/img/close.png"></div>
        </ul>
        <ul id="TplFloatPic_1" class="TplFloatSet TplFloatPic_1" picfloat="right">
            <div id="adright" style="display:block;" href="javascript:void(0)"><img src="/static/hty/img/left.png"></div>
             <div class="hot-btn">
                <span @click="$router.push('/home/chess?navid=9&id=10042')"></span>
                <span @click="$router.push('/home/chess?navid=9&id=10612')" style="margin-top:5px"></span>
                <span @click="$router.push('/home/chess?navid=9&id=10694')" style="margin-top:5px"></span>
                <span @click="$router.push('/home/fish?navid=9&id=10021')" style="margin-top:5px"></span>
                <!-- <span @click="$router.push('/home/fish?navid=9&id=0')"></span> -->
            </div>
            <div id="close-right" @click="hide2" class="close-btn1"><img src="/static/hty/img/close.png"></div>
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
        goyh(){
           this.$router.push('/home/youhui')
        },
        toJgj(){
            window.open('/static/public/active/jgj/index.html');
        },
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
           window.open('/static/hty/html/download/index.html');
        //    if(localStorage.token){
        //             if(this.$store.state.game.jieBeiData.show){
        //              this.$goUserCen('borrowMoney',0)
        //             }else{
        //              this.$goUserCen('recharge',0)
        //            }
        //           }else{
        //           this.$store.commit('alert/newshowtip', {
        //             bool: true,
        //             title: '请先登录',
        //             model: 'error',
        //             leftspan: true
        //         });
        //  }
        },
        goView2() {
           window.open('http://391129.com')
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
    width: 200px;
    transition:all ease .3s;
    &#TplFloatPic_0 {
         left: -20px;
          .kefu-btn {
            position: absolute;
            width: 140px;
            height: 50px;
            display: block;
            top: 114px;
            left: 36px;
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
            width: 140px;
            height: 50px;
            display: block;
            top: 170px;
            left: 36px;
            cursor: pointer;
        }
        .jiebei{
           position: absolute;
            width: 140px;
            height: 50px;
            display: block;
            top: 220px;
            left: 36px;
            cursor: pointer;
        }
        .jiance{
          position: absolute;
            width: 140px;
            height: 50px;
            display: block;
            top: 290px;
            left: 36px;
            cursor: pointer;
        }
    }
    &#TplFloatPic_1 {
        right: -6px;
          .hot-btn {
            position: absolute;
            width: 117px;
            height: 166px;
            top: 145px;
            right: 38px;
            cursor: pointer;
            span{
                display: block;
                height: 36px;
            }
        }
       
       
    }

    .close-btn {
        position: absolute;
        width: 26px;
        height: 26px;
        top: -2px;
        left: 176px;
        cursor: pointer;
    }
     .close-btn1 {
        position: absolute;
        width: 26px;
        height: 26px;
        top: -14px;
        right: 5px;
        cursor: pointer;
    }
}
</style>
