<template>
  <div>
    <div class="promotions">
      <div class="content">
        <div class="sidenav">
          <div class="t">优惠活动</div>
          <ul class="bannerUl">
            <li @click="fetchActive(item.id)" :class="{activeItem:activeId == item.id}"
                v-for="(item,index) in headerList" :key="index">
              <span class="hr"></span>
              <a href="javascript:void(0)">
                <i :class="{
              'icon-all':item.id === -1,
              'icon-qt': item.activity_cate_name.includes('其'),
              'icon-dz': item.activity_cate_name.includes('电子'),
              'icon-qp': item.activity_cate_name.includes('棋牌'),
              'icon-by': item.activity_cate_name.includes('捕鱼'),
              'icon-sx': item.activity_cate_name.includes('视讯')
              }"></i>{{item.activity_cate_name}}
              </a>
            </li>
          </ul>

        </div>
        <div class="promo-all right">
          <div class="list">
            <Spin size="large" fix v-if="isloading"></Spin>
            <div v-if="showactivity">
              <div class="promo" v-for="(item,i) in showList" :key="i" @click="onClick(item)">
                <div class="promo-title">{{item.title1}}</div>
                <div class="promo-box">
                  <div class="promo-img">
                    <a href="javascript:void (0)">
                      <span class="promo-mask"></span>
                      <img :src="item.img" alt="" width="437">
                      <div class="promoh">
                        <span>了解详情</span>
                      </div>
                    </a>
                  </div>
                  <div class="promo-info">
                    <div class="t cout_down">{{item.activity_type === 'normal_activity' ? '长期优惠' : '专题优惠'}}</div>
                    <div class="clear"></div>
                    <p>{{item.title2}}</p>
                    <p class="date">活动时间：以官方通知为准</p>
                  </div>
                </div>
                <div class="clear"></div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>

    <Modal :scrollable=true :title="title" ok-text="关闭" v-model="showPopout" width="850" height="820"
           class="vp-popout-box">
      <div class="popout-box">
        <div class="close" @click="showPopout = false; content = ''">
          <span></span>
        </div>
        <div v-html="content" class="context"></div>
      </div>
    </Modal>
    <Modal v-model="ifmodel" class-name="agent-transfer" width="424" :mask-closable="false">
      <div class="vp-admin-wrap-close" slot="close">
        <div class="vp-admin-wrap-close-empty">
          <a></a>
        </div>
      </div>
      <div slot="header" class="tishi">
        <span>提示</span>
      </div>
      <div class="agent-con">
        <span class="iconspan"><span class="tispan">精彩活动,敬请期待!</span></span>
        <a class='pay' href="javascript:void (0)" @click="close_messageAlert()">关闭</a>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import vpHomeHeader from '../header.vue'
import vpNav from '../nav.vue'
import vpFooter from '../footer'

export default {
  name: 'index',
  components: {
    vpHomeHeader,
    vpNav,
    vpFooter
  },
  data () {
    return {
      title: '',
      targetId: '',
      activeName: '',
      showPopout: false,
      content: '',
      isloading: false,
      timer: null,
      ifmodel: false,
      showactivity: true,
      activeId: -1,
      activitylist: [],
      showList: [],
      headerList: [
        {
          activity_cate_name: '全部优惠',
          id: -1
        }
      ]
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
    },

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
    },
    // 切换活动
    fetchActive (activeId) {
      this.activeId = activeId
      if (activeId === -1) {
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
    onClick (item) {
      switch (item.type) {
        case 'single':
          window.open(item.param, '_blank')
          break

        case 'content':
          this.showContent(item.title1, item.param)
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
  computed: {
    colorbool () {
      return this.$store.state.mainState.color
    }
  }
}
</script>

<style lang="less" scoped>
  .promotions {
    background: #1e1e1e;
    padding: 20px 0 20px;
    .content:after{
      clear:both;
      content:'';
      display: block;
    }
    .content {
      width: 1200px;
      background: #323232;
      margin: 0 auto;

      .sidenav {
        width: 255px;
        float: left;
        min-height: 370px;
        background: #323232;
        border-top-left-radius: 4px;
        -webkit-border-top-left-radius: 4px;

        .t {
          font-size: 16px;
          color: #cccccc;
          text-align: center;
          height: 65px;
          line-height: 65px;
          background: #3c3c3c;
          border-top-left-radius: 4px;
          -webkit-border-top-left-radius: 4px;
        }

        ul {
          li {
            width: 100%;
            height: 60px;
            position: relative;
            background: url('/static/478qp/img/youhui/icon-arrow.png') no-repeat 228px center;

            .hr {
              display: none;
              width: 4px;
              background: #323232;
              position: absolute;
              height: 100%;
              top: 0;
              left: 4px;
            }

            a {
              width: 243px;
              height: 60px;
              margin-left: 12px;
              border-bottom: 1px solid #232323;
              display: block;
              font-size: 15px;
              color: #ccc;
              line-height: 60px;

              i {
                width: 24px;
                height: 24px;
                margin: 18px 25px 0 17px;
                display: block;
                float: left;

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
                &.icon-by {
                  background: url('/static/478qp/img/youhui/icon-by1.png') no-repeat;
                  background-size: 100% 100%;
                }
                &.icon-sx {
                  background: url('/static/478qp/img/youhui/icon-sx1.png') no-repeat;
                  background-size: 100% 100%;
                }

                &.icon-qt {
                  background: url('/static/478qp/img/youhui/icon-qt1.png') no-repeat;
                  background-size: 100% 100%;
                }
              }
            }

            &:hover {
              background: url('/static/478qp/img/youhui/icon-arrowh.png') no-repeat 228px center #282828;
              border-bottom: 1px solid #323232;

              a {
                color: #f8ad32;;

                i {
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
                  &.icon-by {
                    background: url('/static/478qp/img/youhui/icon-by2.png') no-repeat;
                    background-size: 100% 100%;
                  }
                  &.icon-sx {
                    background: url('/static/478qp/img/youhui/icon-sx2.png') no-repeat;
                    background-size: 100% 100%;
                  }

                  &.icon-qt{
                    background: url('/static/478qp/img/youhui/icon-qt2.png') no-repeat;
                    background-size: 100% 100%;
                  }
                }
              }
            }

            &.activeItem {
              background: url('/static/478qp/img/youhui/icon-arrowh.png') no-repeat 228px center #282828;
              border-bottom: 1px solid #323232;

              .hr {
                display: block;
              }

              a {
                color: #f8ad32;;

                i {
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
                  &.icon-by {
                    background: url('/static/478qp/img/youhui/icon-by2.png') no-repeat;
                    background-size: 100% 100%;
                  }
                  &.icon-sx {
                    background: url('/static/478qp/img/youhui/icon-sx2.png') no-repeat;
                    background-size: 100% 100%;
                  }

                  &.icon-qt {
                    background: url('/static/478qp/img/youhui/icon-qt2.png') no-repeat;
                    background-size: 100% 100%;
                  }
                }
              }
            }
          }
        }
      }

      .promo-all {
        width: 945px;
        background: #282828;
        float: left;
        height: 100%;
        min-height: 480px;
        box-shadow: 2px 0px 10px #222 inset;
        padding: 44px 94px 80px;

        .list {
          .promo {
            margin-bottom: 20px;

            .promo-title {
              font-size: 16px;
              color: #d1d1d1;
              margin-bottom: 10px;
            }

            .promo-box {
              width: 757px;
              height: 142px;
              background: #1e1e1e;
              position: relative;

              .promo-img {
                float: left;
                width: 437px;
                height: 140px;
                border: 1px solid transparent;
                position: relative;
                background: url(/static/478qp/img/youhui/default-img.png) no-repeat 50% #1e1e1e;
                overflow: hidden;

                .promo-mask {
                  display: none;
                  width: 437px;
                  height: 142px;
                  position: absolute;
                  top: -1px;
                  left: -1px;
                  background: url(/static/478qp/img/youhui/mask.png) repeat;
                }

                img {
                  position: absolute;
                  top: 13px;
                  left: -1px;
                  width: 437px;
                  height: 114px;
                  display: block;
                }

                .promoh {
                  display: none;
                  width: 100%;
                  height: 138px;
                  border: 1px solid #996b3d;
                  background: url(/static/478qp/img/youhui/trans1.png) repeat;
                  position: absolute;
                  top: 0;
                  left: 0;
                  padding-top: 50px;

                  span {
                    color: #fff;
                    background: url(/static/478qp/img/youhui/btn1.png) no-repeat;
                    width: 120px;
                    height: 37px;
                    margin: 0 auto;
                    text-align: center;
                    line-height: 37px;
                    display: block;
                    font-size: 14px;
                  }
                }

                &:hover {
                  .promoh {
                    display: block;
                  }
                }
              }
              .promo-info {
                float: left;
                padding: 20px 16px 15px;
                width: 320px;
                position: relative;
                height: 142px;
                .t {
                  float: left;
                  font-size: 13px;
                  color: #cca353;
                  text-align: center;
                  line-height: 28px;
                  border: 1px solid #c7a24e;
                  padding: 0 12px;
                  border-radius: 3px;
                  -webkit-border-radius: 3px;
                  margin-bottom: 12px;
                }
                .clear {
                  clear: both;
                }
                p {
                  font-size: 12px;
                  color: #808080;
                  line-height: 18px;
                  &.date {
                    font-size: 12px;
                    color: #ccc;
                    position: absolute;
                    left: 16px;
                    bottom: 10px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  /*活动导航*/


  /*提示未开始*/
  /deep/ .ivu-modal-mask {
    z-index: 2000;
  }

  /deep/ .ivu-modal-wrap {
    z-index: 2000;
  }

  /deep/ .ivu-modal-close {
    right: 0;
  }

  /deep/ .ivu-modal-footer {
    border-top: none;
    display: none;
  }

  /deep/ .ivu-modal {
    top: 50%;
    margin-top: -159px;
    height: 318px;
  }

  /deep/ .ivu-modal-header {
    border-bottom: none;
    padding: 0;
  }

  /deep/ .ivu-modal-close .ivu-icon-ios-close-empty {
    display: none;
  }

  /deep/ .ivu-modal-body {
    padding: 0;
  }

  /deep/ .ivu-modal-close {
    top: 3px;
  }

  .headerp {
    text-align: center;
    margin-top: 20px;
  }

  .tishi {
    height: 43px;
    line-height: 43px;
    font-size: 18px;
    color: 565656;
    background-color: #e5e5e5;
    border-radius: 6px 6px 0 0;

    span {
      margin-left: 30px;
    }
  }

  .agent-con {
    position: relative;
    height: 157px;

  }

  .icon-baojing {
    font-size: 45px;
    color: #f90;
  }

  .iconspan {
    margin-left: 82px;
    height: 45px;
    line-height: 45px;
    display: block;
    font-size: 16px;
    position: relative;
    margin-top: 40px;

    .tispan {
      margin-left: 10px;
      position: absolute;
      font-size: 26px;
      color: #1f1f1f;
    }
  }

  .pay {
    display: block;
    position: absolute;
    width: 160px;
    height: 35px;
    background: linear-gradient(180deg, rgb(252, 198, 91), rgb(176, 112, 28));
    text-align: center;
    line-height: 35px;
    color: #fff;
    font-size: 18px;
    left: 130px;
    top: 80px;
    border-radius: 10px;
  }

  .vp-admin-wrap-close {
    width: 60px;
    height: 40px;
    background: #f2f2f2;
    border-bottom-left-radius: 24px;
    border-top-left-radius: 24px;

    &:hover {
      background: linear-gradient(180deg, rgb(252, 198, 91), rgb(176, 112, 28));
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


  .vp-popout-box {
    border-radius: 20px;
    background-color: #fff;

    /deep/ .ivu-modal {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -425px;
      margin-top: -410px;
    }

    /deep/ .ivu-modal-close {
      display: none;
    }

    .close {
      display: block;
      position: absolute;
      top: 8px;
      right: 8px;
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
        background: url(/static/478qp/img/youhui/close.png) no-repeat 42% 42%;
        -webkit-transition: all .3s ease-in-out;
        -moz-transition: all .3s ease-in-out;
        -o-transition: all .3s ease-in-out;
        -ms-transition: all .3s ease-in-out;
        transition: all .3s ease-in-out;
      }
    }

    /deep/ .context {
      font-family: "Microsoft YaHei", Verdana, Arial !important;
      font-size: 14px;
      height: 740px;
      padding: 25px 50px;
      overflow-y: auto;
      img {
        width: 100%;
      }
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

      .img {
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

    /deep/ .ivu-modal-header {
      position: relative;
      top: -2px;
      margin: 0;
      padding: 0;
      width: 850px;
      height: 60px;
      border-radius: 20px 20px 0 0;
      text-align: center;
      color: #fff;
      border: none;
      background: linear-gradient(90deg, rgb(252, 198, 91), rgb(176, 112, 28)) no-repeat center top;

      .ivu-modal-header-inner {
        color: #fff;
        margin-top: 12px;
        font-size: 22px;
      }
    }

    /deep/ .ivu-modal-footer {
      display: none;

      .ivu-btn-text {
        display: none;
      }

      .ivu-btn-primary {

      }
    }

    .popout-box {
      min-height: 427px;
      font-family: "Microsoft YaHei";
      font-size: 24px;
      line-height: 1.5;
      color: #383838;
      height: 760px;
    }

  }

  /deep/ .ivu-modal-content {
    border-radius: 20px;
    margin: 0;
    padding: 0;
  }

  /deep/ .ivu-modal-body {
    margin: 0;
    padding: 0;

  }

  /deep/ .ivu-modal-wrap {
    margin: 0;
    padding: 0;
  }

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
