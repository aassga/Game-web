<template>
    <div>
        <div v-show="s1" class="TplFloatSet0 TplFloatSet TplFloatPic_1"
            style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
            <div class="dial">
                <span class="fanshui" @click="golinK('fanshui')"></span>
                <span class="youhui" @click="golinK('youhui')"></span>
                <span class="down" @click="golinK('down')"></span>
            </div>
            <div class="zhifu">
                <span class='koukou' @click="$goUserCen('recharge',1)"></span>
                <span class='bank' @click="$goUserCen('recharge',0)"></span>
                <span class='weixin' @click="$goUserCen('recharge',1)"></span>
                <span class='zhifubao' @click="$goUserCen('recharge',2)"></span>
            </div>
            <div class="newclose" @click="s1 = false"></div>
        </div>
        <div v-show="s2" class="TplFloatSet TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
            <a class="kefu" :href="url" target="_blank"></a>
            <a class="kefu1" :href="url" target="_blank"></a>
            <div class="jiance" @click="goQQ"></div>
            <div class="newclose" @click="s2 = false"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            s1: true,
            s2: true,
            url:""
        };
    },
    methods: {
        goQQ() {
            let linajie = 'http://wpa.qq.com/msgrd?v=3&uin=166821111&site=oicqzone.com&menu=yes';
            window.open(linajie);
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
        goLink() {
            if (!localStorage.token || !localStorage.userinfo) {
                this.$router.push('/home/register');
            }
        },
        addWindow (num) { //双副对联模式
            window.addEventListener('scroll', this.$scrollFunc(num))
          },
        golinK(item) {
            if (item == 'fanshui') {
                this.$goUserCen('discounts', 0);
            } else if (item == 'youhui') {
                window.open('#/home/youhui');
            } else {
                window.open('/static/cmgm/html/download/index.html');
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
    created() {}
};
</script>

<style lang="less" scoped>
.TplFloatSet {
    right: 10px;
    width: 158px;
    height: 469px;
    background: url('/static/cmgm/img/mgimg/right.gif') no-repeat left top;
    .kefu{
        height: 77px;
        width: 100%;
        position: absolute;
        top: 146px;
    }
    .kefu1{
        height: 77px;
        width: 100%;
        position: absolute;
        top: 229px;
    }
    div {
        position: absolute;
        width: 100%;
        left: 0;
        &.kefu {
            top: 150px;
            height: 73px;
        }
        &.huiyuan {
            top: 233px;
            height: 70px;
            cursor: pointer;
            overflow: hidden;
        }
        &.dial {
            width: 140px;
            height: 230px;
            top: 80px;
            left: 10px;
            cursor: pointer;
            span:nth-child(1) {
                width: 140px;
                height: 90px;
                display: block;
            }
            span:nth-child(2) {
                width: 140px;
                height: 80px;
                display: block;
            }
            span:nth-child(3) {
                width: 140px;
                height: 70px;
                display: block;
            }
        }
        &.zhifu {
            top: 313px;
            height: 70px;
            cursor: pointer;
            span {
                height: 40px;
                display: block;
                float: left;
            }
            span:nth-child(1) {
                width: 70px;
            }
            span:nth-child(2) {
                width: 70px;
            }
            span:nth-child(3) {
                width: 80px;
            }
            span:last-child {
                width: 70px;
            }
        }
        &.jiance {
            bottom: 24px;
            height: 70px;
            cursor: pointer;
        }
        &.newclose {
            height: 24px;
            bottom: 0;
            cursor: pointer;
        }
    }
}

.TplFloatSet0 {
    left: 10px;
    width: 158px;
    height: 469px;
    background: url('/static/cmgm/img/mgimg/left.gif') no-repeat left top;
}
</style>
