<template>
    <div>
        <ul id="TplFloatPic_0" class="TplFloatSet TplFloatPic_1" picfloat="left">
            <div id="adleft" style="display:block;" href="javascript:void(0)">
                <img src="/static/839qp/img/left.png" style="width:160px">
            </div>
            <!-- <div class="dz">
                <span @click="$router.push('/home/chess?navid=9&id=0')"></span>
                <span @click="$router.push('/home/slot?navid=9&id=0')"></span>
                <span @click="$router.push('/home/fish?navid=9&id=0')"></span>
            </div> -->
            <div class="hot-qp" @click="$router.push('/home/chess?navid=9&id=0')"></div>
            <div class="hot-yh" @click="$router.push('/home/youhui')"></div>
            <div class="hot-btn" @click="$router.push('/home/slot?navid=9&id=0')">
                <!-- <span @click="$router.push('/home/chess?navid=9&id=10042')"></span>
                <span @click="$router.push('/home/chess?navid=9&id=10612')"></span>
                <span @click="$router.push('/home/chess?navid=9&id=10694')"></span>
                <span @click="$router.push('/home/fish?navid=9&id=10054')"></span>
                <span @click="$router.push('/home/slot?navid=9&id=10022')"></span> -->
            </div>
            <div class="hot-by" @click="$router.push('/home/fish?navid=9&id=0')"></div>
            <div @click="hide1" id="close-left" class="close-btn"></div>
        </ul>
        <ul id="TplFloatPic_1" class="TplFloatSet TplFloatPic_1" picfloat="right">
            <div id="adright" style="display:block;" href="javascript:void(0)"><img src="/static/839qp/img/right.png" style="width:160px"></div>
            <a :href="url" target="_blank" class="kefu-btn"></a>
            <div @click="goView" class="transfer"></div>
            <div class="down" @click="goView1"></div>
            <div class="jiance" @click="goView2"></div>
            <div id="close-right" @click="hide2" class="close-btn1"></div>
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
           this.$router.push('/home/youhui')
        },
        goView1(){
            window.open('/static/839qp/html/download/index.html')
        },
        goView2() {
           window.open('http://4441.com')
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
    width: 160px;
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
        .hot-qp{
            position: absolute;
            width: 140px;
            height: 83px;
            top: 20px;
            left: 12px;
            cursor: pointer;
        }
        .hot-yh{
            position: absolute;
            width: 141px;
            height: 80px;
            top: 119px;
            left: 10px;
            cursor: pointer;
        }
        .hot-btn {
            position: absolute;
            width: 65px;
            height: 40px;
            top: 264px;
            left: 14px;
            cursor: pointer;
        }
        .hot-by {
            position: absolute;
            width: 65px;
            height: 40px;
            top: 264px;
            left: 81px;
            cursor: pointer;
        }

    }
    &#TplFloatPic_1 {
        right: 3px;

        .kefu-btn {
            position: absolute;
            width: 130px;
            height: 35px;
            display: block;
            top: 289px;
            left: 15px;
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
            height: 35px;
            display: block;
            top: 335px;
            left: 15px;
            cursor: pointer;
        }
        .jiebei{
            position: absolute;
            width: 130px;
            height: 35px;
            top: 380px;
            left: 36px;
            cursor: pointer;
        }
        .down{
            position: absolute;
            width: 130px;
            height: 35px;
            top: 382px;
            left: 15px;
            cursor: pointer;
        }
        .jiance{
            position: absolute;
            width: 130px;
            height: 35px;
            top: 426px;
            left: 15px;
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
        width: 140px;
        height: 30px;
        top: 484px;
        left: 11px;
        cursor: pointer;
    }
     .close-btn1 {
        position: absolute;
        width: 140px;
        height: 30px;
        top: 484px;
        right: 11px;
        cursor: pointer;
    }
}
</style>
