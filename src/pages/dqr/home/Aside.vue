<template>
    <div>
        <ul id="TplFloatPic_0" class="TplFloatSet TplFloatPic_1" picfloat="left">
            <div id="adleft" style="display:block;" href="javascript:void(0)">
                <img src="../../../../static/dqr/aside/left.png">
            </div>
            <!-- <div class="jgj" @click="toJgj"></div>
            <div class="dz">
                <span @click="$router.push('/home/slot?navid=9&id=0')"></span>
                <span @click="$router.push('/home/chess?navid=9&id=0')"></span>
                <span @click="gocp"></span>
            </div> -->
            <div class="hot-btn">
                <span @click="$router.push('/home/chess?navid=9&id=10042')"></span>
                <span @click="$router.push('/home/chess?navid=9&id=10612')"></span>
                <span @click="$router.push('/home/fish?navid=9&id=10054')"></span>
                <span @click="$router.push('/home/slot?navid=9&id=10015')"></span>
                <span @click="$router.push('/home/slot?navid=9&id=10022')"></span>
            </div>
            <div @click="hide1" id="close-left" class="close-btn"><img src="/static/dqr/img/close.png" alt=""></div>
        </ul>
        <ul id="TplFloatPic_1" class="TplFloatSet TplFloatPic_1" picfloat="right">
            <div id="adright" style="display:block;" href="javascript:void(0)"><img src="/static/dqr/img/right.png"></div>
            <a :href="url" target="_blank" class="kefu-btn"></a>
            <div @click="goView" class="transfer"></div>
            <div class="jiance" @click="goView1(1)"></div>
            <div class="jiance2" @click="goView1(2)"></div>
            <div class="download" @click="goMessage"></div>
            <div id="close-right" @click="hide2" class="close-btn1"><img src="/static/dqr/img/close.png" alt=""></div>
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
        goView1(i){
            if (i == 1) {
                window.open("http://4494.com/");
            }else{
                this.$router.push('/home/youhui')
            }

        },
        toJgj(){
            window.open('/static/public/active/jgj/index.html');
        },
        toService(){
            if(localStorage.token){
                this.$goUserCen('recharge',0)
            }else{
                let service = JSON.parse(localStorage.config).service;
                if (service) {
                    let ser = service.find(item => item.status === 'on')
                    if (ser) {
                        window.open(ser.url);
                    }
                }

            }
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
        gocp(){
            window.open("#/plays/hall");
        },

        hide1() {
            $('#TplFloatPic_0').hide();
        },
        hide2() {
            $('#TplFloatPic_1').hide();
        },
        goMessage(){
            if(localStorage.token){
            // if(this.$store.state.game.jieBeiData.show){
            //     this.$goUserCen('borrowMoney',0)
            // }else{
            //     this.$goUserCen('recharge',0)
            // }
                this.$goUserCen('message',0)
            }else{
                this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '请先登录',
                    model: 'error',
                    leftspan: true
                });
            }
        },
        goView() {
          window.open('/static/dqr/html/download/index.html');
        // if(localStorage.token){
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
           window.open('http://285.cc')
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
    top: 175px;
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
        .jgj{
            width: 140px;
            height: 113px;
            position: absolute;
            top: 60px;
            left: 18px;
            cursor: pointer;
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
            width: 145px;
            position: absolute;
            height: 250px;
            left: 27px;
            top: 168px;
            cursor: pointer;
            span{
                display: block;
                height: 50px;
            }
        }
    }
    &#TplFloatPic_1 {
        right: 3px;

        .kefu-btn {
            position: absolute;
            width: 147px;
            height: 45px;
            top: 165px;
            left: 27px;
            cursor: pointer;
        }
        .register-btn {
            position: absolute;
            width: 147px;
            height: 86px;
            top: 70px;
            left: 0;
        }
        .transfer {
            position: absolute;
             width: 147px;
            height: 45px;
            top: 215px;
            left: 27px;
            cursor: pointer;
        }
        .jiebei{
            position: absolute;
             width: 147px;
            height: 45px;
            top: 264px;
            left: 27px;
            cursor: pointer;
        }
        .jiance{
            position: absolute;
            width: 147px;
            height: 45px;
            top: 264px;
            left: 27px;
            cursor: pointer;
        }
        .jiance2{
            position: absolute;
            width: 147px;
            height: 45px;
            top: 320px;
            left: 27px;
            cursor: pointer;
        }
        .download {
            display: block;
            width: 147px;
            height: 45px;
            top: 366px;
            left: 27px;
            cursor: pointer;
            position: absolute;
        }
    }

    .close-btn {
        position: absolute;
        width: 26px;
        height: 26px;
        top: 20px;
        left: 173px;
        cursor: pointer;
    }
     .close-btn1 {
        position: absolute;
        width: 26px;
        height: 26px;
        top: 20px;
        right: 5px;
        cursor: pointer;
    }
}
</style>
