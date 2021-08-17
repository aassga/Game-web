<template>
    <div>
        <ul id="TplFloatPic_0" class="TplFloatSet TplFloatPic_1" picfloat="left" v-if="s1">
            <div id="adleft" style="display:block;" href="javascript:void(0)">
                <img src="/static/tccp/img/left.png" style="width:223px">
            </div>
            <div class="close1" @click="s1=false"><img src="/static/tccp/img/close.png" alt=""></div>
            <div class="left qp1" @click="toLive('bg')"></div>
            <div class="left qp2" @click="toLive('dg')"></div>
            <div class="left qp3" @click="toLive('ag')"></div>
            <div class="left qp4" @click="toLive('bbin')"></div>
            <div class="left qp5" @click="toLive('wm')"></div>
        </ul>
        <ul id="TplFloatPic_1" class="TplFloatSet TplFloatPic_1" picfloat="right" v-if="s2">
            <div id="adright" style="display:block;" href="javascript:void(0)"><img src="/static/tccp/img/right.png" style="width:223px"></div>
            <div class="close2" @click="s2=false"><img src="/static/tccp/img/close.png" alt=""></div>
            <a :href="url" target="_blank" class="right by1"></a>
            <div class="right by2" @click="$router.push('/home/youhui')"></div>
            <a class="right by3" href="/static/tccp/html/download/index.html" target="_blank"></a>
            <a class="right by4" href="http://741.com" target="_blank"></a>
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
            url:"",
            liveData:[
                {
                    id: 31,
                    name: "AG视讯",
                },
                 {
                    id: 32,
                    name: "BBIN视讯",
                },
                  {
                    id: 42,
                    name: "DG视讯",
                },
                  {
                    id: 3180,
                    name: "BG视讯",
                },
                  {
                    id: 12035,
                    name: "WM视讯",
                }
            ]
        };
    },
    methods: {
        // getLiveData(){
        //     this.liveData = JSON.parse(localStorage.getItem('live_game_new'));
        // },
        toLive(val){
            switch (val) {
                case "bg":
                    this.$loginGame(this.liveData[3])
                    break;
                case "dg":
                    this.$loginGame(this.liveData[2])
                    break;
                case "ag":
                    this.$loginGame(this.liveData[0])
                    break;
                case "bbin":
                    this.$loginGame(this.liveData[1])
                    break;
                case "wm":
                    this.$loginGame(this.liveData[4])
                    break;
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
        goView() {
        //    window.open('/static/jsyl/html/active/jiebei/index.html');
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
        // this.getLiveData();
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
    width: 223px;
    transition:all ease .3s;
    &#TplFloatPic_0 {
        left: 10px;
        .left{
            width: 150px;
            height: 50px;
            position: absolute;
            left: 38px;
            cursor: pointer;
        }
        .qp1{
           top:83px;
        }
        .qp2{
           height: 60px;
           top:133px;
        }
        .qp3{
           height: 60px;
           top:193px;
        }
        .qp4{
           height: 60px;
           top:251px;
        }
        .qp5{
           height: 60px; 
           top:311px;
        }
        .close1{
            width: 26px;
            height: 26px;
            position: absolute;
            left: 209px;
            top: -20px;
            cursor: pointer;
        }
    }
    &#TplFloatPic_1 {
        right: 10px;
        .right{
            width: 150px;
            height: 50px;
            position: absolute;
            right: 37px;
            cursor: pointer;
            display: block;
        }
        .by1{
           top:140px;
        }
        .by2{
           height: 60px; 
           top:190px;
        }
        .by3{
           height: 60px;
           top:250px;
        }
        .by4{
           height: 60px;
           top:310px;
        }
        .close2{
            width: 26px;
            height: 26px;
            position: absolute;
            right: -8px;
            top: -20px;
            cursor: pointer;
        }
    }
}
</style>
