<template>
  <div class="container">
    <div class="header">
      <img src="/static/cjw/img/agent/banner.jpg" alt="">
    </div>
    <div class="content">
      <div class="help">
        <p class="navTitle">{{navTitle}}</p>
        <div>
            <swiper :options="swiperOption" ref="mySwiper">
              <div class="swiper-slide" v-for="(item, index) in childNavList" :key="index">
                <img :src="item.imgSrc" alt="">
              </div>

            </swiper>
            <div class="swiper-button-prev1" slot="button-prev"></div>
            <div class="swiper-button-next1" slot="button-next"></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'agent',
  data () {
    return {
      index: '',
      navTitle: '注册帐号',
      childNavList: [
        {text: '1:如何让邀请注册帐号', imgSrc: '/static/cjw/img/agent/register.png', title: '注册帐号'},
        {text: '2:如何进入代理中心', imgSrc: '/static/cjw/img/agent/goAgency.png', title: '进入代理中心'},
        {text: '3:如何生成链接', imgSrc: '/static/cjw/img/agent/invitation.png', title: '生成邀链接'},
        {text: '4:如何管理链接', imgSrc: '/static/cjw/img/agent/Manage.png', title: '管理邀链接'},
        {text: '5:如何查看下级人数', imgSrc: '/static/cjw/img/agent/ViewNumber.png', title: '查看下级人数'},
        {text: '6:如何查看下级列表', imgSrc: '/static/cjw/img/agent/report.png', title: '查看下级列表'},
        {text: '7:如何查看下级财务', imgSrc: '/static/cjw/img/agent/finance.png', title: '查看下级财务'},
        {text: '8:如何查看代理收益', imgSrc: '/static/cjw/img/agent/income.png', title: '查看代理受益'},
        {text: '9:如何查看下级报表', imgSrc: '/static/cjw/img/agent/viewXiaji.png', title: '查看下级报表'},
        {text: '10:如何查看报表总汇', imgSrc: '/static/cjw/img/agent/summary.png', title: '查看报表总汇'}
      ],
      swiperOption: {
        initialSlide: 0, // 设定初始化时slide的索引
        direction: 'horizontal', // Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
        navigation: {
          nextEl: '.swiper-button-next1',
          prevEl: '.swiper-button-prev1'
        },
        on: {
          slideChange: () => {
            this.index = this.swiper.activeIndex //获取当前索引
            this.navTitle = this.childNavList[this.index].title
          }
        },
        centeredSlides: true,
        notNextTick: true,
        observeParents: true,
        observe: true,
        mousewheelControl: true
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },

  mounted () {
  }
}
</script>

<style  type="text/less" lang="less" scoped>
.container {
  width: 1920px;
  margin: 0 auto;
  .header {
    width: 1920px;
    height: 702px;
  }
  .content {
    position: relative;
    width: 1920px;
    height: 2614px;
    background: url("/static/cjw/img/agent/bg1.jpg") 0 0 no-repeat,
                url("/static/cjw/img/agent/bg2.jpg") 0 592px no-repeat,
                url("/static/cjw/img/agent/bg3.jpg") 0 1258px no-repeat,
                url("/static/cjw/img/agent/bg4.jpg") 0 1827px no-repeat;

   .help {
     .navTitle {
       color: #333333;
       font-size: 20px;
       margin-bottom: 10px;
     }
     position: absolute;
     left: 515px;
     bottom: 140px;
     .swiper-container {
       width: 889px;
       height: 459px;
     }
     .swiper-button-prev1, .swiper-button-next1 {
       position: absolute;
       top: 50%;
       width: 50px;
       height: 50px;
       margin-top: -25px;
       z-index: 10;
       cursor: pointer;
       background-size: 50px 50px;
       background-position: center;
       background-repeat: no-repeat;
       outline:0 none !important;//去掉自定义的按钮选中时蓝色的边框
     }
     .swiper-button-next1 {
       background-image: url("/static/cjw/img/agent/right1.png");
       right: -60px;
       left: auto;
       &.swiper-button-disabled {
         background-image: url("/static/cjw/img/agent/right2.png");
       }
     }
     .swiper-button-prev1 {
       background-image: url("/static/cjw/img/agent/left1.png");
       left: -60px;
       right: auto;
       &.swiper-button-disabled {
         background-image: url("/static/cjw/img/agent/left2.png");
       }
     }
   }
  }
}
</style>
