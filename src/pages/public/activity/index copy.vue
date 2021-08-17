<template>
  <div :class="{tg_youhui:stationName=='tg1'}">
    <!--是否有banner-->
    <div class="banner-bg" v-if="showBanner" :style="bannerStyle"></div>
    <!--    活动导航（外部） 和banner宽度一致-->
    <div class="bannerHead" v-if="showNavOut" :style="navStyle.bannerHead" :class="classObj">
      <ul class="bannerUl" :style="navStyle.bannerUl">
        <li @click="fetchActive(item.id)" :class="{activeItem:activeId === item.id}" :style="navStyle.li"
            v-for="(item,index) in headerList" :key="index">
          <a href="javascript:void(0)" :style="navStyle.a">
            <i :class="{
              'icon-all':item.id === -1,
              'icon-qt': item.activity_cate_name.includes('其'),
              'icon-dz': item.activity_cate_name.includes('电子'),
              'icon-qp': item.activity_cate_name.includes('棋牌'),
              'icon-sx': item.activity_cate_name.includes('视讯'),
              'icon-by': item.activity_cate_name.includes('鱼')
              }"></i>{{item.activity_cate_name}}
          </a>
        </li>
      </ul>
    </div>
    <div class="maincontainer" id="maincontainer" :style="styles" :class="classObj">
      <div class="main clear" :style="{width: widths+'px'}">
        <div class="content" :style="contentStyle">
          <!--活动导航（内部） 和 横幅宽度一致-->
          <div class="bannerHead" v-if="showNav" :style="navStyle.bannerHead">
            <ul class="bannerUl" :style="navStyle.bannerUl">
              <li @click="fetchActive(item.id)" :class="{activeItem:activeId === item.id}" :style="navStyle.li"
                  v-for="(item,index) in headerList" :key="index">
                <div class="liItem">
                  <a href="javascript:void(0)" :style="navStyle.a">
                    {{item.activity_cate_name}}
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <!--  loading start-->
          <Spin size="large" fix v-if="isloading"></Spin>
          <!--  loading end-->
          <template v-if="showactivity">
            <div v-for="(item,index) in showList" :key="index" ref="active-item" class="slider">
              <!-- 体彩天下样式-->
              <template v-if="showLayout === 'has-title'">
                <div class="floor fix" @click="onClick (item, index)">
                  <div class="showDetail fix">
                    <img :src="item.img" v-if="item.img" alt class="ImgLI floorTitleImg defaultImg">
                    <div class="floorRright">
                      <h2>{{item.title1}}</h2>
                      <p>{{item.title2}}</p>
                      <a href="javascript:;">查看详情
                        <i></i>
                      </a>
                    </div>
                  </div>
                  <div class="floorDetail" v-show="targetId === item.id" :id="'img_'+item.img">
                    <div v-if="item.desc_type === 'pic'">
                      <img :src="typeof item.description === 'object' && item.description.pc"
                           alt="加载失败">
                    </div>
                    <div class="content_bg"
                         v-else-if="typeof item.description === 'object' && item.description.pc">
                      <div v-html="item.description.pc"></div>
                    </div>
                  </div>
                </div>
                <div class="floorLine"></div>
              </template>
              <!-- 千赢样式-->
              <template v-else-if="showLayout === 'column'">
                <div @click="onClick (item, index)">
                  <div class="promotion-item">
                    <div class="promotion-info">
                      <div class="pic">
                        <img :src="item.img" alt="">
                      </div>
                      <div class="promotion-intro" v-if="!noTitle">
                        <div class="clear">
                          <h3 class="title">{{item.title1}}</h3>
                          <div class="type-name">{{item.activity_type === 'normal_activity' ?
                            '长期优惠' : '专题优惠'}}
                          </div>
                        </div>
                        <div class="subtitle">{{item.title2}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <!-- 地球人样式-->
              <template v-else-if="showLayout === 'column-img'">
                <div @click="onClick (item, index)">
                  <div class="promotion-item">
                    <div class="promotion-info">
                      <div class="pic">
                        <img :src="item.img" alt="">
                      </div>
                      <div class="promotion-intro" v-if="!noTitle">
                        <div class="clear">
                          <h3 class="title">{{item.title1}}</h3>
                          <div class="type-name">{{item.activity_type === 'normal_activity' ? '长期优惠' : '专题优惠'}}
                          </div>
                        </div>
                        <div class="subtitle">{{item.title2}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <!-- test1-->
              <template v-else-if="showLayout === 'column-img2'">
                <div @click="onClick (item, index)">
                      <div class="pic">
                        <img :src="item.img" alt="">
                      </div>
                </div>
              </template>
              <!-- 老站样式-->
              <div v-else>
                <div :key="index" style="margin-bottom: 20.5px;">
                  <!-- 此时是点击打开详情的页面  -->
                  <a class="menuHead"
                     :style="'margin-bottom:'+classObj.jsyl?'0':10+' px;display: block;'"
                     :id="item.img"
                     href="javascript:void(0)"
                     @click="onClick (item, index)">
                    <img :src="item.img" v-if="item.img" alt=""/>
                  </a>

                  <div class="Content_box" v-show="targetId === item.id" :id="'img_'+item.img">
                    <div class="promotContent">                      
                      <img :src="typeof item.description === 'object' && item.description.pc"
                           alt="加载失败" v-if="item.desc_type === 'pic'">

                      <div v-else-if="typeof item.description === 'object' && item.description.pc"
                           v-html="item.description.pc"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div v-if="!showactivity" style="padding-bottom:33px;padding-top:15px">
            <p style='text-align:center;'>"暂无活动，敬请期待！"</p>
          </div>
        </div>
      </div>
      <!--千赢弹窗详情-->
      <Modal :scrollable=true v-model="showPopout" width="850" class-name="alert-content">
        <div slot="header" class="popHeader" :class="classObj">
          {{title}}
        </div>
        <div slot="close" class="close" @click="showPopout = false; content = ''">
          <span></span>
        </div>
        <div v-html="content" class="context"></div>
      </Modal>
      <!--千赢敬请期待-->
      <Modal v-model="ifmodel" class-name="alert-tip" width="424" :mask-closable="false">
        <div class="vp-admin-wrap-close" :class="classObj" slot="close">
          <div class="vp-admin-wrap-close-empty">
            <a></a>
          </div>
        </div>
        <div slot="header" class="tishi">
          <span>提示</span>
        </div>
        <div class="agent-con">
          <span class="iconspan"><span class="tispan">精彩活动，敬请期待！</span></span>
          <a class='pay' :class="classObj" href="javascript:void (0)" @click="close_messageAlert()">关闭</a>
        </div>
        <div slot="footer"></div>
      </Modal>

    </div>
  </div>
</template>
<script>

export default {
  name: 'index',
  props: {
    stationName:{
      type: String,
      default: ''
    },
    showBanner: {
      type: Boolean,
      default: false
    },
    showNavOut: {
      type: Boolean,
      default: false
    },
    showNav: {
      type: Boolean,
      default: false
    },
    showType: {
      type: String,
      default: ''
    },
    showLayout: {
      type: String,
      default: ''
    },
    widths: {
      type: String,
      default: ''
    },
    noTitle: {
      type: String,
      default: ''
    },
    bannerStyle: {
      type: Object,
      default: function () {
        return {
          width: '1920px'
        }
      }
    },
    navStyle: {
      type: Object,
      default: function () {
        return {
          bannerHead: {
            height: '60px'
          }
        }
      }
    },
    styles: {
      type: Object,
      default: function () {
        return {
          paddingTop: '20px'
        }
      }
    },
    contentStyle: {
      type: Object,
      default: function () {
        return {
          paddingTop: ''
        }
      }
    },
    classObj: {
      type: Object,
      default: function () {
        return {
          scroll: false
        }
      }
    },
    scrollImg: {
      type: Object,
      default: function () {
        return {
          logo: ''
        }
      }
    }
  },
  data () {
    return {
      title: '',
      lantern: '',
      showPopout: false,
      content: '',
      targetId: '',
      activeName: '',
      showactivity: true,
      timer: null,
      ifmodel: false,
      isloading: false,
      activeId: -1,
      activitylist: [],
      showList: [],
      headerList: [{
        activity_cate_name: '所有优惠',
        id: -1
      }]
    }
  },
  methods: {
    // 获取活动分类、
    async getActiveCate () {
      let res = await this.$http.get(`${this.$HOST_NAME}/site/getActivityCateList?client_type=PC`)
      if (res && res.code === 200) {
        // 获取数据成功
        res.data && res.data.forEach((item, index) => {
          this.headerList.push(item)
        })
      }
      this.$nextTick(() => {
        if (!document.getElementById('maincontainer').classList.contains('navWidth')) { // navWidth 存在，就自己定义导航宽度
          let lis = document.querySelectorAll('.bannerUl li')
          for (let i = 0; i < lis.length; i++) {
            lis[i].style.width = 100 / this.headerList.length + '%'
          }
        }
      })
    },

    // 2019.04.25获取数据,假设获取到所有的活动数据
    async getActivety () {
      this.isloading = true
      let data = {
        client_type: 'PC'
      }
      if (this.$route.query.preview) {
        data.preview = 1
      }
      let res = await this.$http.post(`${this.$HOST_NAME}/site/getActivityList`, data)
      if (res && res.code === 200) {
        this.activitylist = res.data.map((item, index) => {
          if (item.description) {
            try {
              item.description = JSON.parse(item.description)
            } catch (e) {
              item.description = null
            }
          }
          if (item.image) {
            try {
              item.image = JSON.parse(item.image)
            } catch (e) {
              item.image = null
            }
          }
          if (item.url_link) {
            try {
              item.url_link = JSON.parse(item.url_link)
            } catch (e) {
              item.url_link = null
            }
          }
          let obj = {}
          obj.title1 = item.title
          obj.title2 = item.child_title
          obj.img = item.image.pc
          obj.id = item.id
          obj.status = item.status
          obj.login = false
          obj.activity_type = item.activity_type
          obj.activity_cate_id = item.activity_cate_id
          obj.description = item.description
          obj.desc_type = item.desc_type
          if (item.activity_status === 0) {
            // 未开始
            obj.type = 'dialog'
          } else if (item.activity_type === 'url_activity') {
            // 单页
            obj.type = 'single'
            obj.param = item.url_link.pc
          } else {
            // 详情
            obj.type = 'content'
            if (item.desc_type === 'pic') {
              obj.param = `<img src="${item.description.pc}" alt="加载失败">`
            } else {
              obj.param = item.description.pc
            }
          }
          return obj
        })
        this.isloading = false
      }
      this.showList = this.activitylist
      if (this.showList.length > 0) this.showactivity = true
      else this.showactivity = false
      /* scrollImg 的logo，无图片，间隔图 */
      this.$nextTick(() => {
        let logos = document.querySelectorAll('.content_bg .logo')
        for (let i = 0; i < logos.length; i++) {
          logos[i].style.backgroundImage = `url(${this.scrollImg.logo})`
        }
        let defaultImgs = document.querySelectorAll('.defaultImg')
        for (let i = 0; i < defaultImgs.length; i++) {
          defaultImgs[i].style.backgroundImage = `url(${this.scrollImg.defaultImg})`
        }
        let floorLines = document.querySelectorAll('.floorLine')
        for (let i = 0; i < floorLines.length; i++) {
          floorLines[i].style.backgroundImage = `url(${this.scrollImg.floorLine})`
        }
      })
    },
    // 切换活动
    fetchActive (activeId) {
      this.activeId = activeId
      if (activeId == -1) {
        this.showList = this.activitylist
      } else {
        this.showList = this.activitylist.filter((item, index) => {
          if (item.activity_cate_id.includes(activeId)) {
            return item
          }
        })
      }
      if (this.showList.length > 0) this.showactivity = true
      else this.showactivity = false
    },
    onClick (item, index) {
      switch (item.type) {
        case 'single':
          window.open(item.param, '_blank')
          break

        case 'content':
          switch (this.showType) {
            case 'scroll':
              this.bindOpenScroll(item, index)
              break
            case 'alert':
              this.showContent(item.title1, item.param)
              break
            default:
              this.bindOpen(item)
              break
          }
          break
        case 'dialog':
          this.ifmodel = true
          break
      }
    },
    openPage (page) {
      window.open(page, '_blank')
    },
    showContent (a, b) {
      this.title = a
      this.showPopout = true
      this.content = b
    },
    bindOpen (item) {
      this.targetId === item.id ? this.targetId = '' : this.targetId = item.id
    },
    bindOpenScroll (item, index) {
      this.targetId === item.id ? this.targetId = '' : this.targetId = item.id
      if (this.targetId) {
        this.$nextTick(() => {
          document.documentElement.scrollTop = document.body.scrollTop = this.$refs['active-item'][index].offsetTop
        })
      }
    },
    goUrl (item) {
      if (item.activity_status == 0) {
        this.ifmodel = true
        return false
      }

      let url = item.url_link && item.url_link.pc
      if (url) {
        // 存在url,要跳转
        window.open(url, '_blank')
      } else {
        window.open('/', '_blank')
      }
    },
    close_messageAlert () {
      this.ifmodel = false
    }

  },
  created: function () {
    this.getActiveCate()
    // 获取数据
    this.getActivety()
  },
  mounted () {

  },
  watch: {},
  components: {}
}
</script>

<style lang="less" scoped>
.tg_youhui{
  background: #eaeaea url("/static/test-1/img/b3.png")repeat-y center top;
  background-size:100% auto;
  .maincontainer{
    background-color: transparent!important;
  }
}
  .bannerHead {
    .bannerUl {
      li {
        a {
          i {
            display: inline-block;
            margin-right: 10px;
            vertical-align: middle;
            font-size: 18px;
            width: 18px;
            height: 19.33px;

            &.icon-all {
              background: url('/static/qygj/img/youhui/icon-all1.png') no-repeat;
              background-size: 100% 100%;
            }

            &.icon-dz {
              background: url('/static/qygj/img/youhui/icon-dz1.png') no-repeat;
              background-size: 100% 100%;
            }

            &.icon-qp {
              background: url('/static/qygj/img/youhui/icon-qp1.png') no-repeat;
              background-size: 100% 100%;
            }

            &.icon-sx {
              background: url('/static/qygj/img/youhui/icon-sx1.png') no-repeat;
              background-size: 100% 100%;
            }

            &.icon-cp {
              background: url('/static/qygj/img/youhui/icon-cp1.png') no-repeat;
              background-size: 100% 100%;
            }
            &.icon-by {
              background: url('/static/qygj/img/youhui/icon-by1.png') no-repeat;
              background-size: 100% 100%;
            }
            &.icon-qt {
              background: url('/static/qygj/img/youhui/icon-qt1.png') no-repeat;
              background-size: 100% 100%;
            }
          }
        }

        &.activeItem {
          a {
            background: url(/static/qygj/img/youhui/item-hover.png) no-repeat center;
            color: #5caaea;

            i {
              background: url("/static/qygj/img/youhui/dz.png");
              background-size: 100% 100%;

              &.icon-all {
                background: url('/static/qygj/img/youhui/icon-all2.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-dz {
                background: url('/static/qygj/img/youhui/icon-dz2.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-qp {
                background: url('/static/qygj/img/youhui/icon-qp2.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-sx {
                background: url('/static/qygj/img/youhui/icon-sx2.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-cp {
                background: url('/static/qygj/img/youhui/icon-cp2.png') no-repeat;
                background-size: 100% 100%;
              }
              &.icon-by {
                background: url('/static/qygj/img/youhui/icon-by2.png') no-repeat;
                background-size: 100% 100%;
              }
              &.icon-qt {
                background: url('/static/qygj/img/youhui/icon-qt2.png') no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
    }
    &.qp478 {
      .bannerUl {
        li {
          a {
            i {
              display: inline-block;
              margin-right: 10px;
              vertical-align: middle;
              font-size: 18px;
              width: 18px;
              height: 19.33px;

              &.icon-all {
                background: url('/static/478qp/img/youhui/icon-all1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-dz {
                background: url('/static/478qp/img/youhui/icon-dz1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-qp {
                background: url('/static/478qp/img/youhui/icon-qp1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-sx {
                background: url('/static/478qp/img/youhui/icon-sx1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-cp {
                background: url('/static/478qp/img/youhui/icon-cp1.png') no-repeat;
                background-size: 100% 100%;
              }
            }
          }

          &.activeItem {
            a {
              background: url(/static/478qp/img/youhui/item-hover.png) no-repeat center;
              color: #cca352!important;

              i {
                background: url("/static/478qp/img/youhui/dz.png");
                background-size: 100% 100%;

                &.icon-all {
                  background: url('/static/478qp/img/youhui/icon-all2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-dz {
                  background: url('/static/478qp/img/youhui/icon-dz2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-qp {
                  background: url('/static/478qp/img/youhui/icon-qp2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-sx {
                  background: url('/static/478qp/img/youhui/icon-sx2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-cp {
                  background: url('/static/478qp/img/youhui/icon-cp2.png') no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
      }
    }
    &.cjw {
      .bannerUl {
        li {
          a {
            i {
              display: inline-block;
              margin-right: 10px;
              vertical-align: middle;
              font-size: 18px;
              width: 18px;
              height: 19.33px;

              &.icon-all {
                background: url('/static/cjw/img/youhui/icon-all1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-dz {
                background: url('/static/cjw/img/youhui/icon-dz1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-qp {
                background: url('/static/cjw/img/youhui/icon-qp1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-sx {
                background: url('/static/cjw/img/youhui/icon-sx1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-cp {
                background: url('/static/cjw/img/youhui/icon-cp1.png') no-repeat;
                background-size: 100% 100%;
              }
            }
          }

          &.activeItem {
            a {
              background: url(/static/cjw/img/youhui/item-hover.png) no-repeat center;
              color: #5caaea!important;

              i {
                background: url("/static/cjw/img/youhui/dz.png");
                background-size: 100% 100%;

                &.icon-all {
                  background: url('/static/cjw/img/youhui/icon-all2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-dz {
                  background: url('/static/cjw/img/youhui/icon-dz2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-qp {
                  background: url('/static/cjw/img/youhui/icon-qp2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-sx {
                  background: url('/static/cjw/img/youhui/icon-sx2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-cp {
                  background: url('/static/cjw/img/youhui/icon-cp2.png') no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
      }
    }
    &.aqvns {
      .bannerUl {
        li {
          a {
            i {
              display: inline-block;
              margin-right: 10px;
              vertical-align: middle;
              font-size: 18px;
              width: 18px;
              height: 19.33px;

              &.icon-all {
                background: url('/static/aqvns/img/youhui/icon-all1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-dz {
                background: url('/static/aqvns/img/youhui/icon-dz1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-qp {
                background: url('/static/aqvns/img/youhui/icon-qp1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-sx {
                background: url('/static/aqvns/img/youhui/icon-sx1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-cp {
                background: url('/static/aqvns/img/youhui/icon-cp1.png') no-repeat;
                background-size: 100% 100%;
              }
            }
          }

          &.activeItem {
            a {
              background: url(/static/aqvns/img/youhui/item-hover.png) no-repeat center;
              color: #5caaea!important;

              i {
                background: url("/static/aqvns/img/youhui/dz.png");
                background-size: 100% 100%;

                &.icon-all {
                  background: url('/static/aqvns/img/youhui/icon-all2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-dz {
                  background: url('/static/aqvns/img/youhui/icon-dz2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-qp {
                  background: url('/static/aqvns/img/youhui/icon-qp2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-sx {
                  background: url('/static/aqvns/img/youhui/icon-sx2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-cp {
                  background: url('/static/aqvns/img/youhui/icon-cp2.png') no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
      }
    }
    &.dalao {
      .bannerUl {
        li {


          &.activeItem {
            a {
              background: url(/static/dalao/img/youhui/item-hover.png) no-repeat center;
              color: #ffd830!important;


            }
          }
        }
      }
    }
    &.cpzj {
      .bannerUl {
        li {


          &.activeItem {
            a {
              background: url(/static/cpzj/img/youhui/item-hover.png) no-repeat center;
              color: #ffd830!important;


            }
          }
        }
      }
    }
    &.amxpjdc {
      .bannerUl {
        li {
          a {
            i {
              display: inline-block;
              margin-right: 10px;
              vertical-align: middle;
              font-size: 18px;
              width: 18px;
              height: 19.33px;

              &.icon-all {
                background: url('/static/amxpjdc/img/youhui/icon-all1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-dz {
                background: url('/static/amxpjdc/img/youhui/icon-dz1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-qp {
                background: url('/static/amxpjdc/img/youhui/icon-qp1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-sx {
                background: url('/static/amxpjdc/img/youhui/icon-sx1.png') no-repeat;
                background-size: 100% 100%;
              }

              &.icon-cp {
                background: url('/static/amxpjdc/img/youhui/icon-cp1.png') no-repeat;
                background-size: 100% 100%;
              }
            }
          }

          &.activeItem {
            a {
              background: url(/static/amxpjdc/img/youhui/item-hover.png) no-repeat center;
              color: #5caaea!important;

              i {
                background: url("/static/amxpjdc/img/youhui/dz.png");
                background-size: 100% 100%;

                &.icon-all {
                  background: url('/static/amxpjdc/img/youhui/icon-all2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-dz {
                  background: url('/static/amxpjdc/img/youhui/icon-dz2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-qp {
                  background: url('/static/amxpjdc/img/youhui/icon-qp2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-sx {
                  background: url('/static/amxpjdc/img/youhui/icon-sx2.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-cp {
                  background: url('/static/amxpjdc/img/youhui/icon-cp2.png') no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
      }
    }
  }

  .maincontainer {
    position: relative;

    &.scroll {
      box-sizing: border-box;
      color: #666;

      .show a i {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
      }

      .floor {
        background: #fff;
        box-shadow: 0 4px 8px #c7c7c7;
        padding: 15px;
      }

      .show {
        display: block;
      }

      .floorLine {
        background-repeat: no-repeat;
        width: 100%;
        height: 15px;
        padding: 0 3px;
        margin-left: -3px;
      }

      .fix:before {
        content: "";
        display: table;
      }

      .fix:after {
        clear: both;
        overflow: hidden;
        content: "";
        display: table;
        outline: none;
      }

      .showDetail {
        cursor: pointer;
      }

      .floor .floorTitleImg {
        float: left;
        width: 680px;
        height: 170px;
      }

      .floor .floorRright {
        float: left;
        width: 290px;
        padding: 0 15px;
        box-sizing: border-box;
      }

      .floor .floorRright h2 {
        font-size: 28px;
        font-weight: 100;
        margin: 0;
        color: #e4393c;
        line-height: 30px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
      }

      .floor .floorRright p {
        font-size: 14px;
        padding: 12px 0;
        height: 72px;
        word-break: break-all;
      }

      .floor .floorRright a {
        font-size: 18px;
        display: block;
        line-height: 40px;
        width: 120px;
        background: #e4393c;
        color: #fff;
        border-radius: 4px;
        text-align: center;
        padding-right: 18px;
        box-sizing: border-box;
      }

      .floor .floorRright a i {
        position: absolute;
        margin-top: 15px;
        margin-left: 8px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 8px solid #f09394;
        transition: 0.1s;
      }

      .floorDetail {
        margin-top: 15px !important;
        border-top: 2px dashed #e6e6e6;
        overflow: hidden;
        width: 970px !important;
        clear: both;
        word-break: break-all;
        overflow-x: auto;

        i {
          color: #f76727;
          font-size: 14px;
        }

        h3 {
          display: block;
          background: #d2dbe0;
          width: 84px;
          text-align: center;
          line-height: 28px;
          font-size: 14px;
          margin-top: 30px;
          margin-bottom: 14px;

          i {
            display: inline-block;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 10px solid #d2dbe0;
            position: absolute;
            margin-left: 14px;
          }
        }

        em {
          margin-right: 15px;
          font-size: 14px;
        }

        .disable {
          background: #d6d6d6;
          color: #999;
        }

        a {
          font-size: 16px;
          color: #fff;
          background: #e4393c;
          border-radius: 4px;
          padding: 7px 18px;
        }
      }

      .tbplus {
        position: relative;
        width: 145px;

        i {
          position: absolute;
          left: 12px;
          bottom: 3px;
          color: #fff;
        }

        ins {
          border-bottom: 1px solid #7fbbdc;
          position: absolute;
          width: 147px;
          -webkit-transform: rotate(15.2deg);
          transform: rotate(15.2deg);
          left: -1px;
          top: 19px;
        }

        em {
          position: absolute;
          right: -10px;
          top: -2px;
          font-size: 14px;
        }
      }

      .floorHide {
        display: none;
      }

      .defaultImg {
        background-repeat: no-repeat;
        background-size: cover;
        background-color: #f3f3f3 !important;
      }

      img {
        vertical-align: middle;
        border: 0;
      }

      ins {
        text-decoration: none;
        margin: 0 4px;
      }

      .red {
        color: #ff0000;
      }

      /deep/ .content_bg {
        width: 100%;
        margin-top: 12px;
        padding: 25px 40px 1px;
        background-color: #f3f3f3;

        .con_title {
          background: #de1644;
          border-radius: 25px;
          padding: 10px 20px;
          margin: 20px 0;
          font-size: 22px;
          color: #fff;
          display: inline-block;
        }

        p {
          font-size: 16px;
        }

        .logo {
          width: 250px;
          height: 85px;
          background-repeat: no-repeat;
          background-size: contain;
          margin: 10px auto;
        }

        table {
          text-align: center;
          table-layout: fixed;
          border-spacing: 0;
          border-collapse: collapse;
          width: 100%;
          margin: 10px 0;
          color: #000;

          tbody .firstRow {
            background-color: #d91a42;
            color: #ffffff;
          }

          th {
            border: 1px solid #e6e6e6;
            height: 40px;
            font-size: 14px;
            background-color: #4393be;
            color: #fff;
            font-weight: 100;
            vertical-align: middle;
          }

          td {
            border: 1px solid #000000;
            height: 40px;
            font-size: 14px;
            vertical-align: middle;
          }
        }

      }

    }

    &.column {
      &.dalao {
        .slider {
          .promotion-item {
            background-color: #810b0b;
            color: #FFFFff;

            .promotion-info {
              .promotion-intro {
                .type-name {
                  background: #400101;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      &.qp478 {
        .slider {
          .promotion-item {
            background-color: #383838;
            color: #ffffff;

            .promotion-info {
              .promotion-intro {
                .type-name {
                  background: #2a2a2a;
                  color: #c9c9c9;
                }
              }
            }
          }
        }
      }
      &.test1 {
        .slider {
          width: 570px;
          height: 210px;
          display: inline-block;
          margin: 0 15px 17px 5px;
          &:hover {
            transform: unset;
          }
        }
        .slider:nth-child(3n) {
          margin-right: 15px;
        }
      }
      &.noTilte {
        .slider {
          margin-right: 20px;

          .promotion-item {
            width: 320px;
            background-color: transparent;

            .promotion-info {
              .pic {
                img {
                  height: 200px;
                }
              }
            }
          }
        }
      }

      .clear::after {
        content: ".";
        clear: both;
        display: block;
        overflow: hidden;
        font-size: 0;
        height: 0;
      }

      .clear {
        zoom: 1;
      }

      .slider {
        float: left;
        position: relative;
        border-radius: 10px;
        margin-right: 40px;
        margin-bottom: 20px;
        cursor: pointer;
        font-family: 'Microsoft Yahei';
        transform: translateY(0);
        transition: transform 500ms;

        &:hover {
          transform: translateY(-5px)
        }

        .promotion-item {
          float: left;
          width: 373px;
          border-radius: 10px;
          color: #333;
          -webkit-box-shadow: 0 0.1rem 0.1rem transparent;
          box-shadow: 0 0.1rem 0.1rem transparent;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-transition: all 0.15s ease-in-out;
          transition: all 0.15s ease-in-out;
          background-color: white;
          box-sizing: border-box;

          .promotion-info {
            position: relative;
            border-radius: 10px;

            .pic {
              position: relative;
              overflow: hidden;

              img {
                height: 215px;
                width: 100%;
                border-radius: 10px 10px 0 0;
              }
            }

            .promotion-intro {
              margin: 15px 30px 5px;
              font-size: 16px;
              /*color: #333;*/
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

              .title {
                float: left;
                font-weight: bold;
              }

              .type-name {
                float: right;
                width: 90px;
                line-height: 24px;
                border-radius: 12px;
                font-size: 16px;
                text-align: center;
                background: #e3eaf1;
                color: #7d8eb6;
              }

              .subtitle {
                margin: 10px 0;
                font-size: 14px;
              }

              .active-time {
                margin-bottom: 15px;
                font-size: 12px;
                color: #999;
              }

            }
          }
        }
      }

      .slider:nth-child(3n) {
        margin-right: 0;
      }

    }
    &.column-img {
      .clear::after {
        content: ".";
        clear: both;
        display: block;
        overflow: hidden;
        font-size: 0;
        height: 0;
      }

      .clear {
        zoom: 1;
      }

      .slider {
        float: left;
        position: relative;
        border-radius: 10px;
        margin-right: 30px;
        margin-bottom: 30px;
        cursor: pointer;
        font-family: 'Microsoft Yahei';
        transform: translateY(0);
        transition: transform 500ms;

        &:hover {
          transform: translateY(-5px)
        }

        .promotion-item {
          float: left;
          width: 380px;
          border-radius: 10px;
          color: #333;
          -webkit-box-shadow: 0 0.1rem 0.1rem transparent;
          box-shadow: 0 0.1rem 0.1rem transparent;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-transition: all 0.15s ease-in-out;
          transition: all 0.15s ease-in-out;
          background-color: transparent;
          box-sizing: border-box;

          .promotion-info {
            position: relative;
            border-radius: 10px;

            .pic {
              position: relative;
              overflow: hidden;

              img {
                height: 286px;
                width: 100%;
                border-radius: 10px;
              }
            }

          }
        }
      }

      .slider:nth-child(3n) {
        margin-right: 0;
      }
    }

    //葡京赌场
    &.pjdc {
      .bannerUl {
        padding-left: 30px;

        li {
          a {
            color: #d8b158;
          }

          &.activeItem {
            a {
              color: #fff33b;
              border-bottom: 2px solid #fff33b;
              background: none;
            }
          }
        }
      }

      background: #2f0906;

      .main {
        padding: 20px 49px;
        background: #2f0906;
        border: 1px solid #46100b;

        .content {
          position: relative;
        }
      }

      img {
        width: 100%;
      }

      /deep/ .promotContent {
        .con_title_top {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          margin: 5px 0;
          padding: 20px 0 10px 0;
          border-bottom: 1px solid rgb(250, 220, 75);
        }

        .con_title {
          font-size: 19px;
          margin-top: 12px;
          color: rgb(250, 220, 75);
          font-weight: bolder;
        }

        p {
          font-size: 16px;
          line-height: 25px;
          color: rgb(235, 235, 235);
          text-align: justify;
        }

        img {
          width: 100%;
        }

        table {
          margin: 10px 0;

          td {
            border: 1px solid rgb(235, 235, 235);
            text-align: center;
            padding: 8px 0;
            font-size: 16px;
            color: rgb(235, 235, 235);
            line-height: 1.428571429;
          }
        }
      }
    }

    &.blr {
      .bannerUl {
        padding-left: 30px;

        li {
          a {
            color: #ffffff;
          }

          &.activeItem {
            a {
              color: #bd985f;
              border-bottom: 2px solid #bd985f;
              background: none;
            }
          }
        }
      }

      .main {
        padding: 0;
      }

      /deep/ .promotContent {
        .con_title {
          font-size: 19px;
          margin-top: 15px;
          margin-bottom: 5px;
          color: rgb(250, 220, 75);
        }

        p {
          font-size: 16px;
          line-height: 25px;
          color: rgb(235, 235, 235);
          text-align: justify;
        }

        img {
          width: 100%;
        }

        table {
          margin: 10px 0;

          td {
            border: 1px solid rgb(235, 235, 235);
            text-align: center;
            padding: 8px 0;
            font-size: 16px;
            color: rgb(235, 235, 235);
            line-height: 1.428571429;
          }
        }
      }
    }

    &.mgm {
      .bannerUl {
        padding-left: 20px;

        li {
          a {
            color: #9075de;
          }

          &.activeItem {
            a {
              color: #ffe71e;
              border-bottom: 2px solid #ffe71e;
              background: none;
            }
          }
        }
      }

      .main {
        padding: 20px 49px;
        background: #1d1534;
        border: 1px solid #3d2b6f;
      }

      /deep/ .promotContent {
        .con_title {
          font-size: 19px;
          margin-top: 15px;
          margin-bottom: 5px;
          color: rgb(250, 220, 75);
        }

        p {
          font-size: 16px;
          line-height: 25px;
          color: rgb(235, 235, 235);
          text-align: justify;
        }

        img {
          width: 100%;
        }

        table {
          margin: 10px 0;

          td {
            border: 1px solid rgb(235, 235, 235);
            text-align: center;
            padding: 8px 0;
            font-size: 16px;
            color: rgb(235, 235, 235);
            line-height: 1.5;
          }
        }
      }
    }

    //qvns
    &.vnso {
      font-family: "Microsoft Yahei";

      .bannerUl {
        padding-left: 20px;

        li {
          a {
            color: #ffffff;
          }

          &.activeItem {
            a {
              color: #d7b24f;
              border-bottom: 2px solid #d7b24f;
              background: none;
            }
          }
        }
      }

      .main {
        padding: 0;
      }

      img {
        width: 100%;
      }

      /deep/ .promotContent {
        .con_title {
          font-size: 19px;
          margin-top: 15px;
          margin-bottom: 5px;
          color: rgb(250, 220, 75);
        }

        p {
          font-size: 16px;
          line-height: 25px;
          color: rgb(235, 235, 235);
          text-align: justify;
        }

        table {
          td {
            border: 1px solid #ffffff;
            text-align: center;
            vertical-align: middle;
            padding: 8px 0;
            font-size: 16px;
            color: #ffffff;
          }
        }
      }
    }

    //test-1
    &.test1 {
      font-family: "Microsoft Yahei";

      .bannerUl {
        li {
          a {
            color: #ffffff;
            &:hover {
              border-color: transparent!important;
              background: #0096fc!important;
              color: #ffffff!important;
            }
          }


          &.activeItem {
            a {
              border-color: transparent!important;
              background: #0096fc!important;
              color: #ffffff!important;
            }
          }
        }
      }

      .main {
        overflow: hidden;
        padding: 0;
        border-radius: 20px;
        background-color: #ffffff;
        box-shadow: 0 6px 21px rgba(168,163,150,.19);
        .content {
          overflow: hidden;
          margin: 0 0 1px 14px;
        }
      }

      img {
        width: 100%;
      }

      /deep/ .promotContent {
        .con_title {
          font-size: 19px;
          margin-top: 15px;
          margin-bottom: 5px;
          color: rgb(250, 220, 75);
        }

        p {
          font-size: 16px;
          line-height: 25px;
          color: rgb(235, 235, 235);
          text-align: justify;
        }

        table {
          td {
            border: 1px solid #ffffff;
            text-align: center;
            vertical-align: middle;
            padding: 8px 0;
            font-size: 16px;
            color: #ffffff;
          }
        }
      }
    }


    &.tycjt {
      background: #1e0103;

      .bannerUl {
        padding-left: 20px;

        li {
          a {
            color: #ffffff;
          }

          &.activeItem {
            a {
              color: #d7ce22;
              border-bottom: 2px solid #d7ce22;
              background: none;
            }
          }
        }
      }

      .main {
        background: rgb(91, 0, 0);
        padding: 0 25px;
      }

      /deep/ .promotContent {
        .con_title {
          font-size: 19px;
          margin-top: 15px;
          margin-bottom: 5px;
          color: rgb(250, 220, 75);
        }

        p {
          font-size: 16px;
          line-height: 25px;
          color: rgb(235, 235, 235);
          text-align: justify;
        }

        img {
          width: 100%;
        }

        table {
          margin: 10px 0;

          td {
            border: 1px solid rgb(235, 235, 235);
            text-align: center;
            padding: 8px 0;
            font-size: 16px;
            color: rgb(235, 235, 235);
            line-height: 1.428571429;
          }
        }
      }
    }
    &.tyc82 {
      background: #1e0103;

      .bannerUl {
        padding-left: 20px;

        li {
          a {
            color: #ffffff;
          }

          &.activeItem {
            a {
              color: #d7ce22;
              border-bottom: 2px solid #d7ce22;
              background: none;
            }
          }
        }
      }

      .main {
        background: rgb(91, 0, 0);
        padding: 0 25px;
      }

      /deep/ .promotContent {
        .con_title {
          font-size: 19px;
          margin-top: 15px;
          margin-bottom: 5px;
          color: rgb(250, 220, 75);
        }

        p {
          font-size: 16px;
          line-height: 25px;
          color: rgb(235, 235, 235);
          text-align: justify;
        }

        img {
          width: 100%;
        }

        table {
          margin: 10px 0;

          td {
            border: 1px solid rgb(235, 235, 235);
            text-align: center;
            padding: 8px 0;
            font-size: 16px;
            color: rgb(235, 235, 235);
            line-height: 1.428571429;
          }
        }
      }
    }
      &.aqvns {
      .bannerUl {
        padding-left: 30px;

        li {
          a {
            color: #ffffff;
          }

          &.activeItem {
            a {
              color: #f7c951;
              border-bottom: 2px solid #f7c951;
              background: none;
            }
          }
        }
      }

      .main {
        background: #1b1b1b;
        padding: 15px 20px;
      }

      img {
        width: 100%;
        margin-top: 15px;
      }

      /deep/ .promotContent {
        .con_title {
          font-size: 19px;
          margin-top: 12px;
          color: rgb(250, 220, 75);
        }

        p {
          font-size: 16px;
          line-height: 25px;
          color: rgb(235, 235, 235);
          text-align: justify;
        }

        img {
          width: 100%;
        }

        table {
          margin: 10px 0;

          td {
            border: 1px solid rgb(235, 235, 235);
            text-align: center;
            padding: 8px 0;
            font-size: 16px;
            color: rgb(235, 235, 235);
          }
        }
      }
    }
    //威尼斯人
    &.vnst {
      .bannerUl {
        padding-left: 30px;

        li {
          a {
            color: #ffffff;
          }

          &.activeItem {
            a {
              color: #f7c951;
              border-bottom: 2px solid #f7c951;
              background: none;
            }
          }
        }
      }

      .main {
        background: #1b1b1b;
        padding: 15px 20px;
      }

      img {
        width: 100%;
        margin-top: 15px;
      }

      /deep/ .promotContent {
        .con_title {
          font-size: 19px;
          margin-top: 12px;
          color: rgb(250, 220, 75);
        }

        p {
          font-size: 16px;
          line-height: 25px;
          color: rgb(235, 235, 235);
          text-align: justify;
        }

        img {
          width: 100%;
        }

        table {
          margin: 10px 0;

          td {
            border: 1px solid rgb(235, 235, 235);
            text-align: center;
            padding: 8px 0;
            font-size: 16px;
            color: rgb(235, 235, 235);
          }
        }
      }
    }
    //威尼斯人
    &.fhcp {
      .bannerUl {
        padding-left: 30px;

        li {
          a {
            color: #ffffff;
          }

          &.activeItem {
            a {
              color: #f7c951;
              border-bottom: 2px solid #f7c951;
              background: none;
            }
          }
        }
      }

      .main {
        background: #1b1b1b;
        padding: 15px 20px;
      }

      img {
        width: 100%;
        margin-top: 15px;
      }

      /deep/ .promotContent {
        .con_title {
          font-size: 19px;
          margin-top: 12px;
          color: rgb(250, 220, 75);
        }

        p {
          font-size: 16px;
          line-height: 25px;
          color: rgb(235, 235, 235);
          text-align: justify;
        }

        img {
          width: 100%;
        }

        table {
          margin: 10px 0;

          td {
            border: 1px solid rgb(235, 235, 235);
            text-align: center;
            padding: 8px 0;
            font-size: 16px;
            color: rgb(235, 235, 235);
          }
        }
      }
    }
    &.hty_new {
      .bannerUl {
        padding-left: 30px;

        li {
          a {
            color: #ffffff;
          }

          &.activeItem {
            a {
              color: #f7c951;
              border-bottom: 2px solid #f7c951;
              background: none;
            }
          }
        }
      }

      .main {
        background: #1b1b1b;
        padding: 15px 20px;
      }

      img {
        width: 100%;
        margin-top: 15px;
      }

      /deep/ .promotContent {
        .con_title {
          font-size: 19px;
          margin-top: 12px;
          color: rgb(250, 220, 75);
        }

        p {
          font-size: 16px;
          line-height: 25px;
          color: rgb(235, 235, 235);
          text-align: justify;
        }

        img {
          width: 100%;
        }

        table {
          margin: 10px 0;

          td {
            border: 1px solid rgb(235, 235, 235);
            text-align: center;
            padding: 8px 0;
            font-size: 16px;
            color: rgb(235, 235, 235);
          }
        }
      }
    }
    //金沙版本
    &.jsyl {
      .bannerUl {
        padding-left: 30px;

        li {
          a {
            color: #443410;
          }

          &.activeItem {
            a {
              color: #bc4200;
              border-bottom: 2px solid #bc4200;
              background: none;
            }
          }
        }
      }

      .menuHead {
        img {
          width: 100%;
        }
      }

      /deep/ .promotContent {
        box-sizing: border-box;
        border: 1px solid #331e00;
        padding: 15px 40px 35px;
        color: #f0c590;

        .con_title {
          display: inline-block;
          padding: 0 16px;
          height: 38px;
          text-align: center;
          line-height: 38px;
          border-radius: 15px;
          color: #6b5630;
          font-size: 23px;
          font-weight: bold;
          margin: 15px 0;
          background: linear-gradient(#f1d2a3, #96600c);
        }

        p {
          color: #f0c590;
          font-size: 18px;
          line-height: 30px;
          padding-left: 10px;
        }

        img {
          width: 100%;
        }

        table {
          td {
            font-size: 17px;
            border: 1px solid #f0c590;
            color: #f0c590;
            padding: 5px;
            line-height: 34px;
          }

          .td_first {
            background: #f0c590;
            color: #7a4800;
          }
        }
      }
    }

    &.jsyl1 {
      .bannerUl {
        padding-left: 30px;

        li {
          a {
            color: #ffffff;
          }

          &.activeItem {
            a {
              color: #f7c951;
              border-bottom: 2px solid #f7c951;
              background: none;
            }
          }
        }
      }

      .main {
        background: #1b1b1b;
        padding: 15px 20px;
      }

      img {
        width: 100%;
        margin-top: 15px;
      }

      /deep/ .promotContent {
        .con_title {
          font-size: 19px;
          margin: 15px 0;
          color: rgb(250, 220, 75);
        }

        p {
          font-size: 16px;
          line-height: 25px;
          color: rgb(235, 235, 235);
          text-align: justify;
        }

        img {
          width: 100%;
        }

        table {
          margin: 10px 0;

          td {
            border: 1px solid rgb(235, 235, 235);
            text-align: center;
            padding: 8px 0;
            font-size: 16px;
            color: rgb(235, 235, 235);
          }
        }
      }
    }

    //bet365版本
    &.betsb {
      .bannerUl {
        padding-left: 30px;

        li {
          a {
            color: #ffffff;
          }

          &.activeItem {
            a {
              color: #10ecb3;
              border-bottom: 2px solid #10ecb3;
              background: none;
            }
          }
        }
      }

      .menuHead {
        width: 1000px;
        height: 115px;
        display: block;

        img {
          width: 100%;
        }
      }

      /deep/ .promotContent {
        // box-sizing: border-box;
        // border: 1px solid #331e00;
        // padding: 15px;
        // color: #f0c590;
        .con_title_top {
          font-size: 20px;
          margin: 5px 0;
          color: rgb(133, 185, 171);
          border-bottom: 1px solid rgb(10, 255, 191);
          padding-bottom: 5px;
          font-weight: 550;
        }

        .con_title {
          font-size: 19px;
          color: rgb(133, 185, 171);
          margin-top: 15px;
          margin-bottom: 5px;
          font-weight: bold;
        }

        p {
          font-size: 16px;
          line-height: 25px;
          color: rgb(235, 235, 235);
        }

        table {
          td {
            font-size: 16px;
            color: rgb(235, 235, 235);
          }
        }
      }
    }

    //////
    &.hsyl {
      /deep/ .promotContent {
        & > div {
          border: 9px solid #4f8ffc;
          padding: 15px;
          background-color: #e5eeff;
        }

        .con_title {
          display: inline-block;
          padding: 10px 25px;
          background: #4d90fb;
          border-radius: 5px;
          box-shadow: 0 2px 1px #6b8cbf;
          color: #eff8f8;
          font-size: 34px;
          margin-top: 15px;
          margin-bottom: 5px;
        }

        p {
          color: #696969;
        }

        table {
          td {
            border: 1px solid #000;
          }
        }
      }
    }

    &.pjyl {
      /deep/ .promotContent {
        .con_title {
          font-size: 24px;
          margin-top: 12px;
          color: #141313;
          font-weight: bold;
        }

        table {
          td {
            border: 2px solid #000;
            text-align: center;
            vertical-align: middle;
            padding: 8px 0;
            font-size: 16px;
            color: #000;
          }
        }
      }
    }

    &.szc {
      /deep/ .promotContent {
        .con_title {
          font-weight: bold;
          color: red;
        }

        table {
          td {
            border: 2px solid #000;
          }
        }
      }
    }

    &.dqr {
      /deep/ .promotContent {
        .con_title {
          font-weight: bold;
          color: #ffffff;
        }

        p {
          color: #ffffff;
        }

        table {
          td {
            border: 1px solid #ffffff;
            color: #ffffff;
          }
        }
      }
    }

    &.eyc {
      /deep/ .promotContent {
        padding: 0 5px;

        .con_title {
          font-weight: bold;
          color: rgb(250, 220, 75);
        }

        p {
          color: #ffffff;
        }

        table {
          td {
            border: 1px solid #ffffff;
            color: #ffffff;
          }
        }
      }
    }

    .main {
      padding-top: 20px;
      padding-bottom: 20px;
      /*width: 960px;*/
      margin: 0 auto;
    }

    img {
      display: block;
    }
  }

  /deep/ .promotContent {
    table {
      border-spacing: 0;
      border-collapse: collapse;
      width: 100% !important;
      margin: 10px 0;

      td {
        border: 1px solid #000;
        text-align: center;
        vertical-align: middle;
        padding: 8px 0;
        font-size: 16px;
        color: #000;
        line-height: 1.5;
      }
    }

    p {
      font-size: 16px;
      line-height: 25px;
      color: #000;
      text-align: justify;
    }

    hr {
      height: 1px;
      background-color: rgb(250, 220, 75);
      border: 0;
    }

    .top_title {
      font-size: 20px;
      font-weight: bold;
      margin: 5px 0;
    }

    .con_title {
      font-size: 19px;
      margin-top: 12px;
      color: #000;
      font-weight: bold;
    }

    .text {
      p {
        position: relative;
        padding-left: 20px;
        .num {
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }

  /*活动尚未开启*/
  /*  /deep/ .ivu-modal-mask {
      z-index: 2000;
    }

    /deep/ .ivu-modal-wrap {
      z-index: 2000;
    }*/
  /deep/ .ivu-modal-wrap {
    margin: 0;
    padding: 0;

    .ivu-modal-content {
      border-radius: 20px;
      margin: 0;
      padding: 0;

      .ivu-modal-close .ivu-icon-ios-close-empty {
        display: none;
      }

      .ivu-modal-header {
        border-bottom: none;
        padding: 0;
      }

      .ivu-modal-body {
        margin: 0;
        padding: 0;
      }

      .ivu-modal-footer {
        border-top: none;
        display: none;
      }
    }
  }

  /*活动未开始提醒弹窗start*/
  /deep/ .alert-tip {
    .ivu-modal {
      top: 50%;
      margin-top: -120px;
      height: 240px;

      .tishi {
        height: 43px;
        line-height: 43px;
        font-size: 18px;
        color: #565656;
        background-color: #e5e5e5;
        border-radius: 6px 6px 0 0;

        span {
          margin-left: 30px;
        }
      }

      .ivu-modal-close {
        right: 0;
        top: 3px;

        .vp-admin-wrap-close {
          width: 60px;
          height: 40px;
          background: #f2f2f2;
          border-bottom-left-radius: 24px;
          border-top-left-radius: 24px;

          &:hover {
            background: linear-gradient(180deg, #ff3492, #ff1e4f);
          }

          &.qygj {
            &:hover {
              background: linear-gradient(180deg, #4fade6, #65e0f4);
            }
          }
          &.xpj80 {
            &:hover {
              background: linear-gradient(180deg, #4fade6, #65e0f4);
            }
          }
          &.test1 {
            &:hover {
              background: linear-gradient(180deg, #4fade6, #65e0f4);
            }
          }
          &.qp478 {
            &:hover {
              background: linear-gradient(180deg, rgb(252, 198, 91), rgb(176, 112, 28));
            }
          }
          .vp-admin-wrap-close-empty {
            position: relative;
            background: #fff;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            font-size: 56px;
            left: 2px;
            top: 2px;
            -moz-transition: all 0.5s ease-in;
            -webkit-transition: all 0.5s ease-in;
            -o-transition: all 0.5s ease-in;
            transition: all 0.5s ease-in;

            a {
              position: absolute;
              top: 9px;
              left: 9px;
              width: 20px;
              height: 20px;
              display: inline-block;
              background: url("/static/public/image/common/vp-common-close.png") #fff;
              background-size: 98% 98%;
              // transform: rotate(0deg);
            }

            &:hover {
              transform: translateX(40%);
              // &::before{
              //   color: #fff;
              // }
            }
          }
        }
      }

      .agent-con {
        position: relative;
        height: 157px;

        .iconspan {
          text-align: center;
          /*margin-left: 82px;*/
          height: 45px;
          line-height: 45px;
          display: block;
          font-size: 16px;
          position: relative;
          margin-top: 40px;

          .tispan {
            margin-left: 10px;
            /*position: absolute;*/
            font-size: 26px;
            color: #1f1f1f;
          }
        }

        .pay {
          display: block;
          position: absolute;
          width: 160px;
          height: 35px;
          background: linear-gradient(180deg, #ff3492, #ff1e4f);
          text-align: center;
          line-height: 35px;
          color: #fff;
          font-size: 18px;
          left: 130px;
          top: 80px;
          border-radius: 10px;

          &.qygj {
            background: linear-gradient(180deg, #4fade6, #65e0f4);
          }
          &.xpj80 {
            background: linear-gradient(180deg, #4fade6, #65e0f4);
          }
          &.test1 {
            background: linear-gradient(180deg, #4fade6, #65e0f4);
          }
          &.qp478 {
            background: linear-gradient(180deg, rgb(252, 198, 91), rgb(176, 112, 28));
          }
          &.aqvns {
            background: linear-gradient(180deg, #4fade6, #65e0f4);
          }
          &.amxpjdc {
            background: linear-gradient(180deg, #4fade6, #65e0f4);
          }
        }

      }
    }
  }

  /*活动未开始提醒弹窗end*/

  /*活动详情弹窗start*/
  /deep/ .alert-content {
    .ivu-modal {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -425px;
      height: 820px;
      margin-top: -410px;

      .ivu-modal-content {
        height: 820px;
      }

      .popHeader {
        /*position: relative;*/
        top: -2px;
        margin: 0;
        padding: 0;
        width: 850px;
        height: 60px;
        line-height: 60px;
        // padding-top: 5px;
        border-radius: 20px 20px 0 0;
        text-align: center;
        color: #fff;
        font-size: 22px;
        font-weight: 700;
        border: none;
        background: linear-gradient(90deg, #9968fd, #fc49af) no-repeat center top;

        &.qygj {
          background: linear-gradient(90deg, #4fade6, #65e0f4);
        }
        &.xpj80 {
          background: linear-gradient(90deg, #4fade6, #65e0f4);
        }
        &.test1 {
          background: linear-gradient(90deg, #4fade6, #65e0f4);
        }
        &.qp478 {
          background: linear-gradient(90deg, rgb(252, 198, 91), rgb(176, 112, 28));
        }
        &.aqvns {
          background: linear-gradient(90deg, #4fade6, #65e0f4);
        }
        &.amxpjdc {
          background: linear-gradient(90deg, #4fade6, #65e0f4);
        }

        .ivu-modal-header-inner {
          color: #fff;
          margin-top: 12px;
          font-size: 22px;
        }
      }

      .ivu-modal-close {
        right: 8px;
        top: 8px;

        .close {
          display: block;
          width: 44px;
          height: 44px;
          line-height: 44px;
          border: 2px solid #fff;
          border-radius: 50%;
          text-align: center;
          font-size: 30px;
          color: #fff;
          cursor: pointer;

          span {
            display: block;
            width: 44px;
            height: 44px;
            line-height: 44px;
            text-align: center;
            border-radius: 50%;
            font-size: 30px;
            color: #fff;
            cursor: pointer;
            background: url(/static/public/image/common/close.png) no-repeat 42% 42%;
            -webkit-transition: all .3s ease-in-out;
            -moz-transition: all .3s ease-in-out;
            -o-transition: all .3s ease-in-out;
            -ms-transition: all .3s ease-in-out;
            transition: all .3s ease-in-out;
          }
        }
      }

      .context {
        font-family: "Microsoft YaHei", Verdana, Arial !important;
        font-size: 14px;
        height: 740px;
        padding: 25px 50px;
        overflow-y: auto;
        color: #383838;

        .red {
          color: #ff0000;
        }

        .con_title {
          font-size: 16px;
          font-weight: bold;
          margin: 8px 0 5px;
        }

        .act-title {
          font-size: 16px;
          font-weight: bold;
          margin: 8px 0 5px;
        }

        p {
          font-size: 14px;
          margin-bottom: 10px;
        }

        .text {
          p {
            position: relative;
            padding-left: 20px;
            .num {
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        }

        .act-text {
          font-size: 14px;
          margin-bottom: 10px;
        }

        table {
          width: 100%;
          margin: 30px 0 20px 0;
          border-collapse: separate;
          border-spacing: 0;
          border-left: 1px solid #bbb;
          border-top: 1px solid #bbb;
          border-radius: 3px;
          color: #333;

          tbody {
            display: table-row-group;
            vertical-align: middle;
            border-color: inherit;

          }

          tr {
            height: 40px;
          }

          th {
            border-right: 1px solid #bbb;
            border-bottom: 1px solid #bbb;
            text-align: center;
            vertical-align: middle;
            font-weight: bold;
            color: #333;
            background: #e3eaf1;
            line-height: 3;
          }

          td {
            border-right: 1px solid #bbb;
            border-bottom: 1px solid #bbb;
            padding: 5px;
            line-height: 2;
            text-align: center;
            vertical-align: middle;
            background: #f3f4f4;
          }
        }

        img {
          width: 100%;
        }

        .act-rule-cont {
          box-sizing: border-box;

          p {
            position: relative;
            padding-left: 20px;

            .num {
              position: absolute;
              top: 0;
              left: 0;
            }

          }

          .cc0 {
            color: #fe4a4a;
          }
        }
      }

    }
  }

  /*活动详情弹窗end*/

  /* .headerp {
     text-align: center;
     margin-top: 20px;
   }*/

  /*  .icon-baojing {
      font-size: 45px;
      color: #f90;
    }*/

  .night {
    background: rgba(18, 21, 66, .8)
  }

  /*loading去掉背景色*/
  .ivu-spin-fix {
    position: relative;
    height: 300px;
    background-color: transparent;
  }
</style>
