<template>
    <div>
        <!-- <ul class="qy-service TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
            <li class="service">
                <a>
                </a>
            </li>

            <li class="cs-mail">
                <div>
                </div>
                <div class="shrink">
                    8jjqpts@gmail.com
                </div>
            </li>

            <li class="Agency" @click="$router.push('/home/about/partners')">
                <div>
                </div>
            </li>
            
             <li class="xl" @click="goxl">
                <div>
                </div>
            </li>

            <li class="download" @click="goDownload">
                <div>
                </div>
            </li>

            <li class="cs-goTop" @click="goTop">
                <div>
                </div>
            </li>

        </ul> -->
        <div class="aside">
            <div v-for="(item,index) in asideLink" :key="index" @click="golink(index)">
            <p><img :src="item.icon"></p>
            <p>
                <span>{{item.name}}</span>
                <span>{{item.mark}}</span>
            </p>
            </div>
        </div>
    </div>

</template>

<script>
import UserService from '@/service/public/UserService.js';
import store from '@/vuex/store';
export default {
    data() {
        return {
            showNew2019: true,
            url:"",
            asideLink:[
                {name:'在线客服',mark:'解决各种问题',icon:'/static/jltx/img/1.png'},
                {name:'原生APP',mark:'从容尽显',icon:'/static/jltx/img/2.png'},
                // {name:'免息借呗',mark:'秒放款0利息',icon:'/static/jltx/img/3.png'},
                {name:'优惠活动',mark:'领取每日福利',icon:'/static/jltx/img/4.png'},
            ]
        };
    },
    methods: {
        golink(i){
            switch (i) {
            case 0:
                let service = JSON.parse(localStorage.config).service;
                if (service) {
                let ser = service.find(item => item.status === 'on')
                if (ser) {
                    window.open(ser.url);
                }
                }
                break;
            case 1:
                window.open('/static/jltx/html/download/index.html');
                break;
            // case 2:
            //     // 借呗
            //     if(localStorage.token){
            //     if(this.$store.state.game.jieBeiData.show){
            //         this.$goUserCen('borrowMoney',0)
            //     }else{
            //         this.$goUserCen('recharge',0)
            //     }
            //     }else{
            //     this.$store.commit('alert/newshowtip', {
            //         bool: true,
            //         title: '请先登录',
            //         model: 'error',
            //         leftspan: true
            //     });
            //     }
            //     break;
            case 2:
                this.$router.push('/home/youhui')
                break;
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
        },
        goDownload() {
            window.open('/static/jltx/html/download/index.html');
        },
        goResiter() {
            this.$router.push('/home/register');
        },
        goxl(){
           window.open('http://y4478.com')
        },
        goTop() {
            let curr_top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            let time_id = setInterval(() => {
                curr_top -= 40;

                document.documentElement.scrollTop = curr_top;

                document.body.scrollTop = curr_top;

                if (curr_top <= 0) {
                    clearInterval(time_id);
                }
            }, 10);
        },
        scrollFunc(){
            var nodeitem = document.getElementsByClassName('aside');
            
            window.onscroll = function(){
                var t = document.documentElement.scrollTop||document.body.scrollTop;
                if(t>0){
                    nodeitem[0].style.top = t + 200 + 'px';
                }
                if(t==0){
                    nodeitem[0].style.top = t + 200 + 'px'
                }
            }
        },
        addWindow(){
            window.addEventListener('scroll', this.scrollFunc())
        }
    },
    mounted() {
        this.getUrl()
        this.addWindow()
    },
    store
};
</script>

<style lang="less" scoped>
.aside{
    position:absolute;
    top:200px;
    right: 0;
    z-index:1000;
    width: 120px;
    height: 300px;
    transition:all ease .3s;
    div{
      z-index: 9;
      position: absolute;
      right: 0;
      width: 60px;
      height: 60px;
      border-radius: 6px 0 0 6px;
      color: #fff;
      overflow: hidden;
      font-size: 15px;
    //   box-shadow: 0 2px 5px 0 rgba(0,180,255,.3);
      background: linear-gradient(90deg,#1f2021,#37383a);
      transition:width .4s;
      -moz-transition:width .4s; /* Firefox 4 */
      -webkit-transition:width .4s; /* Safari and Chrome */
      -o-transition:width .4s; /* Opera */
      cursor: pointer;
      display: flex;
      p{
        &:first-child{
          line-height: 60px;
          img{
            vertical-align: middle;
            margin-left: 15px;
          }
        }
        &:last-child{
          span{
            display: inline-block;
            height: 30px;
            line-height: 46px;
            padding-left: 16px;
            overflow: hidden;
            font-size: 15px;
            color: #ffffff;
            &:last-child{
              color: #a6a6a6;
              font-size: 12px;
              height: 20px;
              line-height: 19px;
            }
          }
        }
        
      }
      &:nth-child(1){
        top: 0px;
      }
      &:nth-child(2){
        top: 68px;
      }
      &:nth-child(3){
        top: 136px;
      }
      &:nth-child(4){
        top: 202px;
      }
      &:nth-child(1):hover{
        width: 152px; 
      }
      &:nth-child(2):hover{
        width: 152px; 
      }
      &:nth-child(3):hover{
        width: 152px; 
      }
      &:nth-child(4):hover{
        width: 152px; 
      }
    }
  }
.qy-service {
    right: 20px;

    li {
        position: relative;
        width: 65px;
        height: 65px;
        margin-bottom: 5px;
        border-radius: 5px;
        cursor: pointer;

        div {
            background-size: 100% 100%;
            height: 65px;
            width: 65px;
        }

        p {
            font-size: 14px;
            text-align: center;
            line-height: 1;
            color: inherit;
        }
    }

    li:hover {
        border: 1px solid #813a14;
    }

    .service {
        div {
            background: url('/static/jltx/img/thirdparty/kefu.png');
        }
    }
    .by-service {
        div {
            background: url(/static/jltx/img/thirdparty/by-kefu.png);
        }
    }

    .cs-mail {
        div {
            background: url('/static/jltx/img/thirdparty/tousu.png');
        }
        .shrink {
            right: 70px;
            background: linear-gradient(#ffe3bd, #fdca8e);
            position: absolute;
            top: 0px;
            width: 150px;
            height: 62px;
            line-height: 62px;
            text-align: center;
            display: none;
            color: #333;
        }
    }

    .cs-mail:hover {
        .shrink {
            display: block;
        }
    }
    .Agency {
        div {
            background: url(/static/jltx/img/thirdparty/daili.png);
        }
    }
    .xl {
        div {
            background: url(/static/jltx/img/thirdparty/xl.png);
        }
    }
    .jiebei {
        div {
            background: url('/static/jltx/img/thirdparty/jiebei.png');
        }
    }

    .gold_housekeeper {
        div {
            background: url('/static/jltx/img/thirdparty/jinguanjia.png');
        }
    }

    .download {
        div {
            background: url('/static/jltx/img/thirdparty/download.png');
        }
    }

    .cs-goTop {
        div {
            background: url('/static/jltx/img/thirdparty/zhiding.png');
        }
    }
}
.new2019 {
    position: fixed;
    z-index: 9999;
    right: 20px;
    bottom: 30px;
    cursor: pointer;
    width: 230px;
    height: 230px;
    background-image: url('/static/jltx/img/new2019.gif');

    .clBtn {
        background: url('/static/jltx/img/new2019_close.png');
        z-index: 99999;
        position: absolute;
        width: 23px;
        height: 23px;
        top: 0px;
        right: 0px;
        display: none;
    }
    &:hover .clBtn {
        display: block;
    }
}
</style>