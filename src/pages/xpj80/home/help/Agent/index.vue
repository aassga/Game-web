<template>
  <div class="container">
    <div class="header">
      <img src="/static/xpj80/img/agent/banner.jpg" alt="">
    </div>
    <div class="content">
      <div class="help">
        <p class="navTitle">{{navTitle}}</p>
        <div>
            <swiper :options="swiperOption" ref="mySwiper">
              <div class="swiper-slide" v-for="(item, index) in childNavList" :key="index">
                <img :src="item.imgSrc" alt="">
              </div>
<!--              <div class="swiper-slide"><img src="/static/xpj80/img/agent/register.png" alt=""></div>-->
<!--              <div class="swiper-slide"><img src="/static/xpj80/img/agent/goAgency.png" alt=""></div>-->
<!--              <div class="swiper-slide"><img src="/static/xpj80/img/agent/invitation.png" alt=""></div>-->
<!--              <div class="swiper-slide"><img src="/static/xpj80/img/agent/Manage.png" alt=""></div>-->
<!--              <div class="swiper-slide"><img src="/static/xpj80/img/agent/ViewNumber.png" alt=""></div>-->
<!--              <div class="swiper-slide"><img src="/static/xpj80/img/agent/report.png" alt=""></div>-->
<!--              <div class="swiper-slide"><img src="/static/xpj80/img/agent/finance.png" alt=""></div>-->
<!--              <div class="swiper-slide"><img src="/static/xpj80/img/agent/income.png" alt=""></div>-->
<!--              <div class="swiper-slide"><img src="/static/xpj80/img/agent/viewXiaji.png" alt=""></div>-->
<!--              <div class="swiper-slide"><img src="/static/xpj80/img/agent/summary.png" alt=""></div>-->
              <!-- 如果需要导航按钮 -->
              <!--            <div class="swiper-button-prev" slot="button-prev"></div>-->
              <!--            <div class="swiper-button-next" slot="button-next"></div>-->
            </swiper>
            <!-- 如果需要分页器 -->
            <!--          <div class="swiper-pagination"></div>-->

            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev1" slot="button-prev"></div>
            <div class="swiper-button-next1" slot="button-next"></div>

            <!-- 如果需要滚动条 -->
            <!--          <div class="swiper-scrollbar"></div>-->
          </div>

      </div>

    </div>

  </div>
</template>

<script>
// xpj80/index.js 全局引入了swiper，所以这里直接使用就行了
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'agent',
  // components: {
  //   swiper,
  //   swiperSlide
  // },
  data () {
    return {
      index: '',
      navTitle: '注册帐号',
      childNavList: [
        {text: '1:如何让邀请注册帐号', imgSrc: '/static/xpj80/img/agent/register.png', title: '注册帐号'},
        {text: '2:如何进入代理中心', imgSrc: '/static/xpj80/img/agent/goAgency.png', title: '进入代理中心'},
        {text: '3:如何生成链接', imgSrc: '/static/xpj80/img/agent/invitation.png', title: '生成邀链接'},
        {text: '4:如何管理链接', imgSrc: '/static/xpj80/img/agent/Manage.png', title: '管理邀链接'},
        {text: '5:如何查看下级人数', imgSrc: '/static/xpj80/img/agent/ViewNumber.png', title: '查看下级人数'},
        {text: '6:如何查看下级列表', imgSrc: '/static/xpj80/img/agent/report.png', title: '查看下级列表'},
        {text: '7:如何查看下级财务', imgSrc: '/static/xpj80/img/agent/finance.png', title: '查看下级财务'},
        {text: '8:如何查看代理收益', imgSrc: '/static/xpj80/img/agent/income.png', title: '查看代理受益'},
        {text: '9:如何查看下级报表', imgSrc: '/static/xpj80/img/agent/viewXiaji.png', title: '查看下级报表'},
        {text: '10:如何查看报表总汇', imgSrc: '/static/xpj80/img/agent/summary.png', title: '查看报表总汇'}
      ],
      swiperOption: {
        initialSlide: 0, // 设定初始化时slide的索引
        direction: 'horizontal', // Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
        // loop: true, // 无限滚动
        // speed: 1000, // 滑动速度
        navigation: {
          nextEl: '.swiper-button-next1',
          prevEl: '.swiper-button-prev1'
        },
        on: {
          slideChange: () => {
            // let swiper = this.$refs.mySwiper.swiper
            this.index = this.swiper.activeIndex //获取当前索引
            this.navTitle = this.childNavList[this.index].title
          }
        },
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true,
        //   clickableClass: 'my-pagination-clickable'
        // },
        // paginationClickable: true,
        centeredSlides: true,
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // spaceBetween: 0,
        observeParents: true,
        observe: true,
        // autoplay: true,
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
    // this.swiper.slideTo(3, 1000, false)

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
    background: url("/static/xpj80/img/agent/bg1.jpg") 0 0 no-repeat,
                url("/static/xpj80/img/agent/bg2.jpg") 0 592px no-repeat,
                url("/static/xpj80/img/agent/bg3.jpg") 0 1258px no-repeat,
                url("/static/xpj80/img/agent/bg4.jpg") 0 1827px no-repeat;

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
       /*margin: 20px auto;*/
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
       background-image: url("/static/xpj80/img/agent/right1.png");
       right: -60px;
       left: auto;
       &.swiper-button-disabled {
         background-image: url("/static/xpj80/img/agent/right2.png");
       }
     }
     .swiper-button-prev1 {
       background-image: url("/static/xpj80/img/agent/left1.png");
       left: -60px;
       right: auto;
       &.swiper-button-disabled {
         background-image: url("/static/xpj80/img/agent/left2.png");
       }
     }
   }
  }
}
</style>
