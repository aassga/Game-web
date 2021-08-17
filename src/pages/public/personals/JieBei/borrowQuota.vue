<template>
  <div class="free-money">
    <div class="header">
      <span @click="handleClick(1)"><i :class="{active:showNav == 1}">借呗额度</i></span>
      <span @click="handleClick(2)"><i :class="{active:showNav == 2}">借呗规则</i></span>
    </div>
    <div class="borrow-content">
      <div class="quota" v-if="showNav == 1">
        <div class="title">距离下一等级还需 {{limitData.next_level_bet}} 打码</div>
        <div class="levelTable">
          <div>
            <p v-for="(i,j) in levelArr" :key="j" @click="jiebeiTab(i.tab_name,j)" :class="{changeC:j==jiebeiClass}">{{i.tab_name}}</p>
          </div>
          <div class="someTitle">
            <span>等级</span>
            <span>累计打码</span>
            <span>借款额度</span>
          </div>
          <ul>
            <li v-for="(item,index) in jiebeiQuota" :key="index">
              <span>{{item.level}}</span>
              <span>{{item.betTotal}}</span>
              <span>{{item.jiebei_edu}}</span>
            </li>
          </ul>
         <p v-if='nodata' class="nodata">
           <img src="/static/public/image/userImg/no-data.png" alt="">
        </p>
        </div>
      </div>
      <div class="rule" v-if="showNav == 2">
        <p class="bolder">借呗规则</p>

        <p><span>1.可借款总额</span>=各借呗类型之和。</p> 

        <p>2.各类型借呗等级由各类型的打码决定，投注越多,等级越高,借款额度就越高。如棋牌/电子借呗等级则只计算棋牌/电子的累积有效打码，视讯借呗则只计算视讯的累积有效打码。</p> 
        
        <p><span>3.会员还款时间：</span>最后还款日期为次月3号，超过3号即为逾期。<br> 
          例如：在本月1号借款，最后还款日期为次月3号，超过3号即为逾期。</p> 
        
        <p>4.会员还清借款，5分钟后即可再次借款！</p>
        
        <p>5.会员借款若未还款，则无法再次进行第二次借款！</p>
        
        <p>6.信用就是价值，价值就是金钱！未还清借款金额则无法帐号交易！ </p>
        
        <p>7.<i>{{this.$siteName}}</i>借呗保留对本活动的最终解释权，可随时在无任何告知的情况下停止该活动。</p>
        <br>
        <p class="bolder">逾期还款</p>
        <br>
        <p><span>1.第一次逾期还款还清借款后一个月内不能借款。</span><br>
          例如会员A第一次逾期还款： 1月1号借款，2月3号无还清借款，2月4号才还清借款，视为逾期。此时虽然会员A已还清借款但仍然一个月内不能借款，只有到3月4号才能再次借款。
          注：如当月31号还清借款，下月最多只有30号，则下月可在30号进行再次借款。</p>
        
        <p><span>2.第二次逾期还款还清借款后两个月内不能借款。</span><br>
          例如会员A第二次逾期还款： 3月4号借款，4月3号无还清借款，4月5号才还清借款，第二次逾期。此时虽然会员A已还清借款但由于是第二次逾期还款，则两个月内不能借款，只有到6月5号才能再次借款。</p>
        
        <p><span>3.第三次逾期还款还清借款后六个月内不能借款。</span><br>
          例如会员A第三次逾期还款： 19年6月5号借款，7月3号无还清借款，7月5号才还清借款，第三次逾期。此时虽然会员A已还清借款但由于是第三次逾期还款，则六个月内不能借款，只有到次年20年1月5号才能再次借款。
        </p>
        
        <p><span>4.第四次逾期直接取消借呗资格，还清借款后也不可再次借款。</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return{
        palceHolder:"可还款20000元",
        levelArr:[],
        jiebeiQuota:[],
        showNav:1,
        jiebeiName:"",
        limitData:{},
        nodata:false,
        jiebeiClass:0,
      }
    },
    methods: {
      handleClick(num){
        this.showNav = num;
      },
      jiebeiTab(name,index){
        this.jiebeiClass = index;
        this.jiebeiName = name;
        this.nodata=false
        this.jiebeiQuota=this.levelArr[index].list
        this.limitData= this.levelArr[index]
        if(!this.jiebeiQuota.length){
          this.nodata=true
        }
      },
      getJieBeiEdu(){
        this.$store.commit("loading", true);
        this.$store
        .dispatch("game/activityJiebeiEdu")
        .then(res => {
          if (res.code === 200)
            this.$store.commit("loading", false);
            this.$store.commit("game/setjiebeiQuota", res.data);
            this.levelArr = res.data;
            this.jiebeiQuota = res.data[0].list;
            this.limitData=res.data[0];
            if(!this.jiebeiQuota.length){
               this.nodata=true
            }
        })
        .catch(() => {});
      },
    },
    mounted(){
      this.getJieBeiEdu();
    },
  }
</script>

<style lang="less" scoped>
  .changeC{
    color: #FF6362!important;
  }
  .free-money{
    .header{
      display: flex;
      padding-left: 10px;
      margin-left:14px;
      span{
        display: inline-block;
        height: 66px;
        width: 95px;
        border-bottom: 1px solid #f3f3f3;
        font-size: 18px;
        padding-left: 10px;
        color: #696969;
        line-height: 70px;
        font-weight: 400;
        cursor: pointer;
      }
    }
    .active{
      border-bottom:2px solid #FF6362!important;
      color: #FF6262!important;
    }
    .borrow-content{
      background: #fff;
      padding-top: 5px;
      .borrow-input{
        width:960px;
        height:150px;
        background:#eee;
        border-radius:10px;
        padding:5px 15px 15px 15px;
        margin: auto;
        p{
          color: #000;
          font-size: 16px;
          line-height: 39px;
          border-bottom: 1px solid #fff;
        }
        span{
          font-size: 16px;
        }
        input{
          height: 35px;
          width: 885px;
          border: none;
          background: #eee;
          font-size: 16px;
          margin-top: 11px;
          outline: none;
        }
      }
      .day{
        text-align: right;
        color: #BCBCBC;
        font-size: 16px;
        margin: 15px 34px 15px 0;
      }
      .confirm{
        width:141px;
        margin: auto;
        padding-bottom: 378px;
        button{
          width:141px;
          height:41px;
          background:linear-gradient(0deg,rgba(255,25,79,1),rgba(255,34,134,1));
          border-radius:10px;
          color: #F5F5F5;
          line-height: 41px;
          text-align: center;
          outline: none;
          border: none;
          font-size: 16px;
        }
      }
      .quota{
        .title{
          width:964px;
          height:40px;
          margin:10px auto;
          background:rgba(255,99,98,1);
          border-radius:10px;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          color: #fff;
          border-bottom: 1px solid #F4F4F4;
        }
        .levelTable{
          padding-bottom: 20px;
          .someTitle{
            display: flex;
            flex-wrap: nowrap;
            border-bottom: 1px solid #F4F4F4;
            span{
              display: inline-block;
              width: 321px;
              border-right: 1px solid #F4F4F4;
              height: 35px;
              line-height: 35px;
              text-align: center;
              color: #696969;
              font-size: 15px;
              &:first-child{
                border-left: 1px solid #F4F4F4;
              }
            }
          }
          div{
            display: flex;
            flex-wrap: nowrap;
            width: 964px;
            height: 35px;
            margin: auto;
            background: #fff;
            border-top: 1px solid #F4F4F4;
            p{
              width: 50%;
              color: #696969;
              font-size: 14px;
              line-height: 35px;
              font-size: 15px;
              text-align: center;
              cursor: pointer;
              border-right: 1px solid #F4F4F4;
              &:first-child{
                border-left: 1px solid #F4F4F4;
              }
            }
          }
          ul::-webkit-scrollbar {
            display: none;
          }
          .nodata{
            position: absolute;
            top: 60%;
            left: 57%;
            transform: translate(-50%,-50%);
          }
          ul{
            width: 964px;
            height: 432px;
            margin: auto;
            background: #fff;
            overflow-y: scroll;
            position: relative;
            li{
              display: flex;
              flex-wrap: nowrap;
              border-bottom: 1px solid #F4F4F4;
              span{
                display: inline-block;
                height: 35px;
                line-height: 35px;
                font-size: 15px;
                text-align: center;
                width: 321px;
                &:first-child{
                  border-left: 1px solid #F4F4F4;
                }
                &:last-child{
                  border-right: 1px solid #F4F4F4;
                }
                &:nth-child(2){
                  border-left: 1px solid #F4F4F4;
                  border-right: 1px solid #F4F4F4;
                }
              }
            }
          }
        }
      }
      .rule::-webkit-scrollbar {
        display: none;
      }
      .rule{
        width: 963px;
        margin: auto;
        padding: 5px 0 20px 0;
        height: 580px;
        overflow-y: scroll;
        .bolder{
          font-weight: bold;
          font-size: 16px;
        }
        p{
          color: #696969;
          font-size: 15px;
          line-height: 30px;
          span{
            color: #fe0100;
          }
        }
      }
    }
  }
</style>
