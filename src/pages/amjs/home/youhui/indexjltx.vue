<template>
  <section class="content content-bg-page" style=" width:100%; display: block; position: relative;">
    <div class="banner">
        <vp-register class="registerBox"></vp-register>
       <banView :headerImg="headerImg" :picBox='300' isScale='true'></banView>
    </div>
    <div style="height:36px;background:#272727">
      <banLantern :notice='notice' :siteName="'amjs'"></banLantern>
    </div>
    <!-- <banLantern :notice='notice' :siteName="'amjs'"></banLantern> -->
    <div class="content"
         style="background: #272727;padding: 20px 0; text-align: center;, #f3f2ef; margin: 0 auto">
      <div class="promotlist" style="margin: 0 auto;">
        <div style="width: 1200px; margin: 0 auto;">
          <!-- <div class="bannerHead">
            <ul class="bannerUl">
              <li @click="fetchActive(item.id)" :class="{activeItem:activeId === item.id}"
                  v-for="(item,index) in headerList" :key="index">
                <div class="liItem">
                  <a href="javascript:void(0)">
                    <span>{{item.activity_cate_name}}</span>
                  </a>
                </div>
              </li>
            </ul>
          </div> -->
          <div style="padding: 0 23px 20px 22px;box-sizing:border-box">

            <div class="subPage-wrap">
              <div class="subPage-box">
                <div style="" id="ActivityContent">
                  <div>
                    <div v-if="showactivity">
                      <template v-for="(item,index) in showList">
                        <!-- 链接活动 -->
                        <div :key="index" v-if="item.activity_type=='url_activity'" style="margin-bottom: 10px;">
                          <a class="menuHead" style="margin-bottom: 10px;" :id="item.image.pc" href="javascript:void(0)"
                             @click="goUrl(item)">
                            <img :src="item.image.pc" v-if="item.image.pc"/>
                          </a>
                          <div class="Content_box" style="display: none;" :id="'img_'+item.image.pc">
                          </div>
                        </div>
                        <!-- 此处是点击显隐的效果 -->
                        <div :key="index" v-else-if="item.activity_type=='normal_activity'" style="margin-bottom: 10px;">
                          <a class="menuHead" style="margin-bottom: 10px;" :id="item.image.pc" href="javascript:void(0)"
                             @click="bindOpen(item)"><img :src="item.image.pc"/>
                          </a>

                          <div class="Content_box" v-show="targetId===item.id" :id="'img_'+item.image.pc">
                            <div class="promotContent">

                              <img :src="typeof item.description === 'object' && item.description.pc"
                                   alt="加载失败" v-if="item.desc_type=='pic'">

                              <div v-else-if="typeof item.description === 'object' && item.description.pc" @click="register($event)"
                                   v-html="item.description.pc"></div>
                            </div>
                          </div>
                        </div>

                      </template>
                    </div>
                    <div v-if="!showactivity">
                      <p style='text-align:center;padding-top:20px;color:#fff'>"暂无活动，敬请期待！"</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
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
          slot="close"

        >
          <div class="vp-admin-wrap-close-empty">
            <a></a>
          </div>
        </div>
        <div slot="header" class="tishi">
          <span>提示</span>
        </div>
        <div class="agent-con">
          <span class="iconspan"><span class="tispan">精彩活动，敬请期待！</span></span>
          <a class='pay' href="javascript:void (0)" @click="close_messageAlert()">关闭</a>
        </div>
        <div slot="footer"></div>
      </Modal>
    </div>
  </section>
</template>

<script>
import banView from "../../../public/game_new/banView";
import banLantern from "../../../public/game_new/banLantern";
import vpRegister from '../../admin/nregister';
export default {
  data () {
    return {
      headerImg:"/static/amjs/img/money.jpg",
      notice: "/static/jltx/img/notice-icon.png",
      targetId: '',
      activeName: '',
      timer: null,
      ifmodel: false,
      showactivity:true,
      activeId: -1,
      activitylist: [],
      showList: [],
      headerList: [
        {
          activity_cate_name: '所有优惠',
          id: -1
        }
      ]
    }
  },
  components:{
    banView,
    banLantern,
    vpRegister,
  },
  methods: {
    register () {
      if (arguments[0].target.className === 'register') {
        this.$store.commit('jltx/showRegister', true)
        // localStorage.setItem('zhuce', true)
        // window.open('/', '_blank')
      }
    },
    // 获取活动分类、
    async getActiveCate () {
      let res = await this.$http.get(`${this.$HOST_NAME}/site/getActivityCateList?client_type=PC`)
      if (res && res.code == 200) {
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
      if (res && res.code == 200) {
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
       if(this.showList.length>0) this.showactivity=true
      else this.showactivity=false
      // this.$nextTick(() => {
      //   if (document.getElementsByClassName('register')) {
      //     document.getElementsByClassName('register')[0].addEventListener('click', this.register)
      //   }
      // })
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
      if(this.showList.length>0) this.showactivity=true
      else this.showactivity=false
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
  }
}
</script>

<style lang='less' scoped>
  /*导航*/
  .content{
    background: url("/static/jltx/img/new_games/bg.png") 10px -12px no-repeat, #ffffff;
    background-size:100% auto;
    .banner{
      max-width: 1920px;
      height: 300px;
      margin: 0 auto;
      background: url('/static/jltx-new/img/banner/yh.jpg') center top/ cover no-repeat;
      position: relative;
           .registerBox {
        position: absolute;
        top: 25px;
        left: 0;
        right: 0;
    }
   }
  }
  .bannerHead {
    width: 100%;
    height: 50px;
    margin: 0 auto;
    /*padding: 0 50px;*/
    background-color: #444;
    border-radius: 8px 8px 0 0;

    .bannerUl {
      width: 100%;
      height: 100%;
      /*border-bottom: 1px solid #dbdbbd;*/
      /*display: flex;*/
      /*justify-content: space-between;*/
      /*align-items: center;*/

      li {
        float: left;
        text-align: left;
        height: 100%;
        min-width: 100px;
        // background: yellow;
        /*background-color: #0d0d18;*/
        line-height: 50px;
        /*text-align: center;*/
        // border-right:1px solid #666;
        box-sizing: border-box;
        color: #696969;
        font-size: 14px;

        .liItem {
          display: inline-block;
          text-align: center;

          a {
            color: #f13131;
          }

          i {
            width: 30px;
            height: 80px;
            // display: inline-block;
            float: left;
            // background-color: green;
          }

          span {
            float: right;
            color:white
          }
        }
        &:first-child {
          text-align: left;
          margin-left: 22px;
        }
        &:last-child {
          text-align: left;
        }
      }

      li.activeItem {
        // background-color: green;
        /*background-color: #4e0606;*/
        color: #efc77a;
        
        span {
           color: #efc77a;
           border-bottom: 2px solid #efc77a;
        }

        a {
          color: #efc77a;
        }
      }
      li:first-child {
        width: 136px;
      }
      li:last-child {
        border: 0;
      }
    }
  }

/*弹窗*/
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

  .subPage-img {
    width: 1157px;
    margin: 0 auto;
  }

  .subPage-box {
    margin: 0 auto;
  }

  .subPage-box img {
    margin-top: 12px;
    cursor: pointer;
  }

  #ActivityContent {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  #ActivityContent img {
    margin: 15px 0;
  }

  /deep/ .promotContent {
    width: 1155px;
    text-align: left;
    .con_title {
      font-size: 19px;
      line-height: 1.5;
      font-weight: 700;
      margin-top: 12px;
      /*color: rgb(250, 220, 75);*/
    }
    p {
      font-size: 16px;
      line-height: 25px;
      color: white;
      text-align: justify;
    }
    table {
      width: 100%;
      margin: 10px 0;
      border-spacing: 0;
      border-collapse: collapse;
      td {
        border: 1px solid #ccc;
        text-align: center;
        padding: 8px 0;
        font-size: 16px;
        vertical-align: middle;
      }
    }
  }
</style>
