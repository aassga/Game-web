<template>
  <div class="maincontainer" v-if="type === 'no-nav'" :style="styles">
    <div class="main" :style="{width: widths+'px'}">
      <div class="content">
        <div v-if="showactivity">
          <template v-for="(item,index) in showList">
            <!-- 链接活动 -->
            <div :key="index" v-if="item.activity_type=='url_activity'" style="margin-bottom: 10px;">
              <!-- 此时是点击跳转的页面 -->
              <a class="menuHead" style="margin-bottom: 10px;" :id="item.image.pc" href="javascript:void(0)"
                 @click="goUrl(item)">
                 <img :src="item.image.pc" v-if="item.image.pc" alt="" />
              </a>
              <div class="Content_box" style="display: none;" :id="'img_'+item.image.pc">
              </div>
            </div>
            <!-- 此处是点击显隐的效果 -->
            <div :key="index" v-else-if="item.activity_type=='normal_activity'" style="margin-bottom: 10px;">
              <!-- 此时是点击打开详情的页面  -->
              <a class="menuHead" style="margin-bottom: 10px;display: block;" :id="item.image.pc" href="javascript:void(0)"
                 @click="bindOpen(item)">
                <img :src="item.image.pc" v-if="item.image.pc" alt="" />
              </a>
              <div class="Content_box" v-show="targetId===item.id" :id="'img_'+item.image.pc">
                <div class="promotContent">
                  <img :src="typeof item.description === 'object' && item.description.pc"
                       alt="加载失败" v-if="item.desc_type=='pic'">
                  <div v-else-if="typeof item.description === 'object' && item.description.pc"
                       v-html="item.description.pc"></div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div v-if="!showactivity">
          <p style='text-align:center;'>"暂无活动，敬请期待！"</p>
        </div>
      </div>
    </div>

    <Modal
      v-model="ifmodel"
      class-name="agent-transfer"
      width="424"
      :mask-closable="false"
    >
      <div
        class="vp-admin-wrap-close"
        slot="close">
        <div class="vp-admin-wrap-close-empty">
          <a></a>
        </div>
      </div>
      <div slot="header" class="tishi">
        <span>提示</span>
      </div>
      <div class="agent-con">
        <span class="iconspan"><span class="tispan">精彩活动，即将揭晓！</span></span>
        <a class='pay' href="javascript:void (0)" @click="close_messageAlert()">关闭</a>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>

export default {
  name: 'index',
  props: {
    type: {
      type: String,
      default: ''
    },
    widths: {
      type: String,
      default: ''
    },
    styles: {
      type: Object,
      default: function () {
        return {
          paddingTop: '20px',
          // marginTop: '',
          background: ''
        }
      }
    }
  },
  data () {
    return {
      targetId: '',
      activeName: '',
      showactivity: true,
      timer: null,
      ifmodel: false,
      activeId: -1,
      activitylist: [],
      showList: [],
      headerList: [ {
        activity_cate_name: '全部',
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
    },

    // 2019.04.25获取数据,假设获取到所有的活动数据
    async getActivety () {
      // /site/getActivityCateList
      let data = {
        client_type: 'PC'
      }
      if (this.$route.query.preview) {
        data.preview = 1
      }
      let res = await this.$http.post(`${this.$HOST_NAME}/site/getActivityList`, data)
      if (res && res.code === 200) {
        // 过滤掉停用的活动
        this.activitylist = res.data && res.data.filter((item, index) => {
          // if (item.status === 'yes') {
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
          return item
          // }
        })
      }
      this.showList = this.activitylist
      if (this.showList.length > 0) this.showactivity = true
      else this.showactivity = false
    },
    // 切换活动
    fetchActive (activeId) {
      this.activeId = activeId
      if (activeId == -1) {
        this.showList = this.activitylist
      } else {
        this.showList = this.activitylist.filter((item, index) => {
          // if (item.activity_cate_id == activeId) {
          if (item.activity_cate_id.includes(activeId)) {
            return item
          }
        })
      }
      if (this.showList.length > 0) this.showactivity = true
      else this.showactivity = false
    },

    bindOpen (item) {
      if (item.activity_status == 0) {
        this.ifmodel = true
        // this.timer=setInterval(()=>{

        // },1500)
        return false
      } else {
        this.targetId === item.id ? this.targetId = '' : this.targetId = item.id
      }
    },
    goUrl (item) {
      if (item.activity_status == 0) {
        this.ifmodel = true
        // this.timer=setInterval(()=>{

        // },1500)
        return false
      }

      let url = item.url_link && item.url_link.pc
      if (url) {
        // 存在url,要跳转
        window.open(url, '_blank')
      } else {
        window.open('/', '_blank')
        //  window.open(`/static/jltx/html/active/${link}`,"_blank")
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
    // this.$nextTick(()=>{
    //   this.bindOpen();
    // })
  },
  mounted () {

  },
  watch: {},
  components: {}
}
</script>

<style lang="less" scoped>

  .maincontainer {
    /*background: #070c1f url(/static/dqr/img/bg1.jpg) no-repeat!important;*/
    /*background-size: 100% 100%;*/
    /*background-position: top;*/
    /*padding-top: 20px;*/
    .main {
      padding-top: 10px;
      padding-bottom: 20px;
      /*width: 960px;*/
      margin: 0 auto;
    }
    img {
      display: block;
    }
  }

  /deep/ .promotContent {
    /*padding: 10px;*/
    /*color: #000;*/
  }

  /deep/ .promotContent table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100% !important;
    margin: 10px 0;
  }

  /deep/ .promotContent table td {
    border: 1px solid #ccc;
    text-align: center;
    vertical-align: middle;
    padding: 8px 0;
    font-size: 16px;
  }

  /deep/ .promotContent p {
    font-size: 16px;
    line-height: 25px;
    color: #000;
    text-align: justify;
  }

  .promotContent hr {
    height: 1px;
    background-color: rgb(250, 220, 75);
    border: 0;
  }

  /deep/ .promotContent .top_title {
    font-size: 20px;
    font-weight: bold;
    margin: 5px 0;
  }

  /deep/ .promotContent .con_title {
    font-size: 19px;
    margin-top: 12px;
    /*color: rgb(250,220,75);*/
  }

  #yh_pic a img {
    padding: 0 20px;
  }

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
    background: linear-gradient(180deg, #ff3492, #ff1e4f);
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
      background: linear-gradient(180deg, #ff3492, #ff1e4f);
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

</style>
