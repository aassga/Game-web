<template>
  <div id="footer-bg" class="clear">
    <div class="foo">
            <div><img src="/static/amhg/img/foo.png" alt=""></div>
            <div>
              <ul>
                <li @click="$store.state.home.showLoginLog = true">
                  <span><img src="/static/amhg/img/kai.svg" alt=""></span>
                  <span>真钱开户</span>
                  <span>开设账户申请即可获得首存礼金，并尊享网站的其他优惠及抽奖</span>
                </li>
                <li class="lines"></li>
                <li @click="goHelp(4)">
                  <span><img src="/static/amhg/img/he.svg" alt=""></span>
                  <span>合作加盟</span>
                  <span>高返利，高收益的合作模式让您轻松赚取巨额佣金，与我们共同成长</span>
                </li>
                <li class="lines"></li>
                <li @click="$router.push('/home/youhui')">
                  <span><img src="/static/amhg/img/you.svg" alt=""></span>
                  <span>优惠活动</span>
                  <span>优惠活动多样化,美女/大保健/机票/酒店/高额彩金等多重优惠，等您来拿！</span>
                </li>
                <li class="lines"></li>
                <li @click="service()">
                  <span><img src="/static/amhg/img/lian.svg" alt=""></span>
                  <span>联系我们</span>
                  <span>客服提供7*24全天候周到服务免费回拨服务无需支付长途及市话费用，欢迎使用</span>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li @click="goHelp(0)">关于我们</li>
                <li @click="goHelp(1)">联系我们</li>
                <li @click="goHelp(2)">存款帮助</li>
                <li @click="goHelp(3)">取款帮助</li>
                <li @click="goHelp(4)">合作伙伴</li>
              </ul>
              <p>© 2008-2028 . All rights Reserved</p>
            </div>
          </div>
     <new-modal :newmodal="newmodal"></new-modal>
</div>
</template>

<script>
  import store from '@/vuex/store'
  import newModal from '../../public/home/newmodal.vue'

  export default {
    data () {
      return {
         aItems: [
          {item: '关于我们'},
          {item: '联系我们'},
          {item: '存款帮助'},
          {item: '取款帮助'},
          {item: '合作伙伴'}
        ],
        curId:0,
        show_mobile: true,
        animatedStaues: false,
        footerBg:"/static/amhg/img/home/image_2019_02_14T08_56_54_932Z.png",
        footbgcolor:'',
        newmodal:{
          title:"来自澳门皇冠的消息",
          bgcolor:{
               background: 'linear-gradient(to right, #c2a775, #d3bc8f)'
          }
        }

      }
    },
    methods: {
      service (){
        let service = JSON.parse(localStorage.config).service;
          if (service) {
            let ser = service.find(item => item.status === "on");
            if (ser) {
              window.open(ser.url);
            }
          }
      },
      goHelp (linkNumber) {
        this.$router.push(`/home/about/${linkNumber}`).catch(err => {});
      },
      initColor(){
        let routerSrc  = this.$store.state.mainState.routeSrc;
          if(routerSrc === "/home/live"){
              this.footbgcolor = "#eaeaea"
          }
          else if(routerSrc==="/home"){
              this.footbgcolor = '#e3eaf0'
          }
          else if(routerSrc === "/home/buyu"){
              this.footbgcolor = "#eaeaea"
          }
          else if(routerSrc === '/home/tiyu'){
              this.footbgcolor = '#f3f2ef'
          }
          else if(routerSrc.includes('/home/games')){
              this.footbgcolor = '#eaeaea'
          }
          else if(routerSrc.includes('/home/qipai')){
              this.footbgcolor = '#eaeaea'
          }
          else if(routerSrc === '/home/register'){
              this.footbgcolor = '#fff'
          }
          else if(routerSrc === '/home/youhui'){
              this.footbgcolor = 'rgb(227, 234, 241)'
          }
          else if(routerSrc.includes('/home/about')){
              this.footbgcolor = '#f3f4f5'
          }
      }
    },
    computed: {
      // 是否提示信息
      tipDatas () {
        return this.$store.state.alert.tipModel
      },
      colorbool(){
        return this.$store.state.mainState.color
      },
    },
    watch:{
       colorbool(newbool,oldbool){
          if(newbool==true){
            this.footerBg ='/static/amhg/img/index-main-bg-n.jpg'
          }else{
            this.footerBg = "/static/amhg/img/home/image_2019_02_14T08_56_54_932Z.png"
          }
       },
       $route(to,from){
          this.initColor()
       }
    },
    mounted () {
      this.initColor()
    },
    created(){
      this.$store.commit("mainState/getRoute",this.$route.path)
    },
    components:{
        newModal
    },
    store
  }
</script>

<style lang="less" scoped>
.foo{
          width: 100%;
          background: #fff;
          div{
            &:first-child{
              width: 1200px;
              margin: 0 auto;
              padding-top: 40px;
              padding-bottom: 20px;
            }
            &:nth-child(2){
              width: 1200px;
              margin: 0 auto;
              padding-top: 50px;
              border-top:1px solid#e6e6e6; 
              border-bottom:1px solid#e6e6e6; 
              ul{
                display: flex;
                .lines{
                  height: 155px;
                  width: 1px;
                  background: #e6e6e6;
                  margin: 25px 20px 0 15px;
                }
                li{
                  width: 280px;
                  height: 235px;
                  cursor: pointer;
                  &:last-child{
                    border: none;
                  }
                  span{
                    display: block;
                    text-align: center;
                    &:first-child{
                      // height: 44px;
                      // width: 44px;
                      margin-bottom: 35px;
                      img{
                        width: 44px;
                      }
                    }
                    &:nth-child(2){
                      color: #444952;
                      font-size: 18px;
                      margin-bottom: 10px;
                    }
                    &:last-child{
                      color: #000;
                      font-size: 14px;
                      line-height: 20px;
                    }
                  }
                }
              }
            }
            &:last-child{
              ul{
                width: 845px;
                display: flex;
                margin: 40px auto;
                li{
                  width: 167px;
                  height: 30px;
                  line-height: 30px;
                  color: #494e58;
                  font-size: 14px;
                  text-align: center;
                  cursor: pointer;
                }
              }
              p{
                width: 1200px;
                margin: 0 auto;
                text-align: center;
                color: #000;
                font-size: 12px;
              }
            }
          }
        }
  .clear{
      zoom: 1;
      // max-width:1920px;
      // min-width:1200px;
      width:100%;
      margin:auto;
      .footer-detail{
          position: relative;
          height: 311px;
          padding: 55px 0 0;
          color: #fff;
          .foot_links{
            .wp{
              width:1200px;
              margin:0 auto;
              li{
                flex: 0 0 15%;
                .footer-link-title{
                    margin-bottom: 25px;
                    font-size: 18px;
                    font-weight: bold;
                }
                div{
                   a{
                      display: block;
                      padding-left: 7px;
                      line-height: 2;
                      text-align: left;
                      font-size: 14px;
                      color: #fff;
                  }
                }
              }
              li:nth-child(4){
                flex: 0 0 55%;
                .footer-link-title{
                    margin-bottom: 25px;
                    font-size: 18px;
                    font-weight: bold;
                }
              }
            }
            .flex{
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;
            }
          }
          .copyright{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: rgba(0, 0, 0, .1);
            .wp{
              width: 1200px;
              margin: 0 auto;
              div{
                font-size: 14px;
                color: #fff;
                text-align: center;
                line-height: 50px;
                img{
                  border: 0;
                  vertical-align: middle;
                }
              }
            }
          }
      }
      .night{
           background:url(/static/amhg/img/index-main-bg-n.jpg) no-repeat center top;
      }
  }

</style>
