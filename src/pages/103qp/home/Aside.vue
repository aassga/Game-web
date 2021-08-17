<template>
    <div>
        <ul id="TplFloatPic_0" class="TplFloatSet TplFloatPic_1" picfloat="left">
            <div id="adleft" style="display:block;" href="javascript:void(0)">
                <img src="/static/103qp/img/left.png">
            </div>
            <!-- <div class="dz">
                <span @click="$router.push('/home/chess?navid=9&id=0')"></span>
                <span @click="$router.push('/home/slot?navid=9&id=0')"></span>
                <span @click="$router.push('/home/fish?navid=9&id=0')"></span>
            </div> -->
            <div class="hot-btn">
                <span @click="$router.push('/home/chess?navid=9&id=10042')"></span>
                <span @click="$router.push('/home/chess?navid=9&id=10612')"></span>
                <span @click="$router.push('/home/chess?navid=9&id=10694')"></span>
                <span @click="$router.push('/home/fish?navid=9&id=10054')"></span>
                <span @click="$router.push('/home/slot?navid=9&id=10022')"></span>
            </div>
            <div @click="hide1" id="close-left" class="close-btn"><img src="/static/103qp/img/close.png" alt=""></div>
        </ul>
        <ul id="TplFloatPic_1" class="TplFloatSet TplFloatPic_1" picfloat="right">
            <div id="adright" style="display:block;" href="javascript:void(0)"><img src="/static/103qp/img/right.png"></div>
            <a :href="url" target="_blank" class="kefu-btn"></a>
            <div class="jiebei" @click="goView"></div>
            <div @click="goView1" class="transfer"></div>
            <div class="jiance" @click="goView2"></div>
            <div id="close-right" @click="hide2" class="close-btn2"><img src="/static/103qp/img/close.png" alt=""></div>
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
           window.open('/static/103qp/html/download/index.html');
        },
        goView1(){
            this.$router.push('home/youhui')
        },
        goView2() {
           window.open('http://103.com')
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
            height: 200px;
            top: 189px;
            left: 29px;
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
            height: 40px;
            display: block;
            top: 239px;
            left: 34px;
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
            width: 130px;
            height: 40px;
            top:  320px;;
            left: 34px;
            cursor: pointer;
        }
        .jiebei{
            position: absolute;
            width: 130px;
            height: 40px;
            top:  280px;;
            left: 34px;
            cursor: pointer;
        }
        .jiance{
            position: absolute;
            width: 130px;
            height: 40px;
            top: 360px;
            left: 34px;
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
        width: 26px;
        height: 26px;
        top: 5px;
        left: 174px;
        cursor: pointer;
    }
     .close-btn2 {
        position: absolute;
        width: 26px;
        height: 26px;
        top: 5px;
        right: 10px;
        cursor: pointer;
    }
}
</style>
