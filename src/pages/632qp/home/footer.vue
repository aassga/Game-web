<template>
  <div id="footer-bg" class="clear">
    <div class="footer">
        <div class="footer-detail" :style="{background: 'url(' + footerBg + ')  no-repeat center top',backgroundColor:footbgcolor,backgroundSize:'cover'}" :class="{night:colorbool}">
            <div class="foot_links">
                <ul class="wp flex">
                    <li class="introduce-cont">
                        <h3 class="footer-link-title">乐游棋牌</h3>
                        <div>
                          <a href="javascript:void(0);"  @click="goHelp('/home/about/'+ index)" v-for="(item,index) in aItems" :key="index">{{item.item}}</a>
                        </div>
                    </li>
                    <li class="support-browser-cont">
                        <h3 class="footer-link-title browser-title">支持浏览器</h3>
                        <div>
                            <img src="/static/632qp/img/home/image_2019_02_14T08_53_01_247Z.png" alt="" width="100">
                        </div>
                    </li>
                    <li class="regulatory-authority">
                        <h3 class="footer-link-title">监管机构</h3>
                        <div>
                            <img src="/static/632qp/img/home/image_2019_02_14T08_52_29_378Z.png" alt="" width="60">
                        </div>
                    </li>
                    <li class="platform-cont">
                        <h3 class="footer-link-title">合作伙伴</h3>
                        <div>
                            <img src="/static/632qp/img/footer_bg.png" alt="" width="100%">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="copyright">
                <div class="wp">
                    <div>
                        版权为乐游棋牌 所有 © 2020
                    </div>
                </div>
            </div>
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
        footerBg:"/static/632qp/img/home/image_2019_02_14T08_56_54_932Z.png",
        footbgcolor:'',
        newmodal:{
          title:"来自乐游棋牌的消息",
          bgcolor:{
               background: 'linear-gradient(to right, #65e0f4, #4fade6)'
          }
        }

      }
    },
    methods: {
      goHelp (link) {
        this.$router.push(link);
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
      // modeldetail(){
      //   return this.$store.state.alert.newtip
      // }
    },
    watch:{
       colorbool(newbool,oldbool){
          if(newbool==true){
            this.footerBg ='/static/632qp/img/index-main-bg-n.jpg'
          }else{
            this.footerBg = "/static/632qp/img/home/image_2019_02_14T08_56_54_932Z.png"
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
           background:url(/static/632qp/img/index-main-bg-n.jpg) no-repeat center top;
      }
  }

</style>
