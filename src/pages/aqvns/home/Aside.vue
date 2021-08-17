<template>
    <div>
        <ul id="TplFloatPic_0" class="TplFloatSet TplFloatPic_1" picfloat="left">
            <a id="adleft" style="display:block;" href="javascript:void(0)">
                <img src="/static/aqvns/img/left.png">
            </a>
            <div @click="goView('/home/live')" class="jiebei"></div>
            <div @click="goView('/home/slot?navid=9&id=10022')" class="hot-btn"></div>
            <div @click="goView('/home/chess?navid=9&id=10042')" class="game"></div>
            <div @click="goView('/home/fish?navid=9&id=10021')" class="game2"></div>
            <div @click="hide1" id="close-left" class="close-btn"></div>
        </ul>
        <ul id="TplFloatPic_1" class="TplFloatSet TplFloatPic_1" picfloat="right">
            <a id="adright" style="display:block;" href="javascript:void(0)"><img src="/static/aqvns/img/right.png"></a>
            <a :href="url" target="_blank" class="kefu-btn"></a>
            <div @click="rightBtn('1')" class="register-btn"></div>
            <div @click="rightBtn('2')" class="transfer"></div>
            <a class="download"  @click="rightBtn('3')"></a>
            <!-- <div class="codebox">
                <div ref="qr-code"></div>
            </div> -->
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
        rightBtn(i){
            switch (i) {
                case '1':
                    window.open('/static/aqvns/html/download/index.html')
                    break;
                case '2':
                    this.$router.push('/home/youhui')
                    break;
                case '3':
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
                    break;
            }
        },
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
                window.open('/static/aqvns/html/active/jiebei/index.html');
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
    width: 200px;
    cursor: pointer;

    &#TplFloatPic_0 {
        left: 3px;
        
        .jiebei {
            position: absolute;
            width: 170px;
            height: 50px;
            top: 185px;
            left: 15px;
        }
        .game{
            position: absolute;
             width: 170px;
            height: 50px;
            top: 258px;
            left: 15px;
        }
        .game2{
            position: absolute;
             width: 170px;
            height: 50px;
            top: 325px;
            left: 15px;
        }
        .hot-btn {
            position: absolute;
            width: 170px;
            height: 50px;
            top: 398px;
            left: 15px;
        }
    }
    &#TplFloatPic_1 {
        right: 3px;
        
        .kefu-btn {
            position: absolute;
            width: 170px;
            height: 50px;
            top: 184px;
            left: 14px;
        }
        .register-btn {
            position: absolute;
            width: 170px;
            height: 50px;
            top: 256px;
             left: 14px;
        }
        .transfer {
            position: absolute;
            top: 325px;
            width: 170px;
            height: 50px;
            left: 14px;
        }

        .download {
            display: block;
            width: 170px;
            height: 50px;
            position: absolute;
            top: 400px;
            left: 14px;
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
        width: 40px;
        height: 25px;
        top: 448px;
        left: 79px;
    }
}
</style>
