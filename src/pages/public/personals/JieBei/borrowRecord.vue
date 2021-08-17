<template>
  <div class="free-money">
    <div class="header"><span @click="goRecord" style="cursor: pointer">借呗记录</span><span v-if="showDetail == false">>借呗详情</span></div>
    <div class="borrow-content">
      <div class="details" v-if="showDetail">
        <div>
          <p v-for="(i,j) in headTitle" :key="j">{{i}}</p>
        </div>
        <ul>
          <li v-for="(k,l) in recordList" :key="l">
            <span>{{$moment.unix(k.date - 0).format("YYYY-MM-DD HH:mm:ss")}}</span>   
            <span>{{k.borrow_amount}}</span>
            <span>{{k.repayment}}</span>
            <span>{{k.unpaid}}</span>
            <span :class="k.statusCode == 0 ? 'blue' : k.statusCode == 1 ? 'green' : k.statusCode == 2 ? 'red' : 'normal'">{{k.status}}</span>
            <span @click="details(k)">详情</span>
          </li>
        </ul>
        <div v-if='showdata' class="nodata">
           <img src="/static/public/image/userImg/no-data.png" alt="">
        </div>
      </div>
      <div class="details2" v-if="type" >
        <div class="norepay">
          <p>未还款</p>
          <p>{{detailsItem.unpaid}}</p>
        </div>
        <div class="someDetail" v-if="showDetail == false">
          <div>
            <p>本期借款</p>
            <p>{{detailsItem.statusCode == 2 ? '0.00' : detailsItem.borrow_amount}}</p>
          </div>
          <div>
            <p>已还款</p>
            <p>{{detailsItem.repayment}}</p>
          </div>
        </div>
        <div class="borrowDetal">
          <div>
            <p>借还时间</p>
            <p>金额</p>
            <p>状态</p>
          </div>
          <ul>
            <li v-for="(i,j) in detailList" :key="j">
              <span>{{$moment.unix(i.date - 0).format("YYYY-MM-DD HH:mm:ss")}}</span>
              <span>{{i.amount}}</span>
              <span :class="i.statusCode == 0 ? 'blue' : i.statusCode == 1 ? 'green' : i.statusCode == 2 ? 'red' : 'normal'">{{i.status}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="details3" v-if="untype">
        <div class="payFinish">
          <div class="finidhShow">
            <p>本期借款</p>
            <p>{{detailsItem.borrow_amount}}</p>
            <p>好借好还,再借不难</p>
            <div><img src="/static/public/image/userImg/finish.png" width="120px"></div>
          </div>
          <div class="finishDetal">
            <div>
              <p>借还时间</p>
              <p>金额</p>
              <p>状态</p>
            </div>
            <ul>
              <li v-for="(i,j) in detailList" :key="j">
                <span>{{$moment.unix(i.date - 0).format("YYYY-MM-DD HH:mm:ss")}}</span>
                <span>{{i.amount}}</span>
                <span :class="i.statusCode == 0 ? 'blue' : i.statusCode == 1 ? 'green' : i.statusCode == 2 ? 'red' : 'normal'">{{i.status}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return{
        type:false,
        untype:false,
        detailsItem:{},
        showDetail:true,
        headTitle:['借款时间','本期借款','已还款','未还款','状态','操作'],
        detailList:[],
        recordList:[],
        showdata:false
      }
    },
    methods: {
      details(item){
        this.showDetail = false;
        if (Number(item.unpaid) === 0 && item.statusCode !== 2 && item.statusCode !== 0) {
            this.untype=true
        }else{
            this.type=true
        }
        this.detailList=item.jiehuanInfo
        this.detailsItem=item
      },
      getRecordList(){
          this.$store.commit("loading", true);
          this.$store
          .dispatch("game/activityJiebeiJieHuanList", {
            page: 1,
            limit: 10000,
          }).then(res=>{
              this.$store.commit("loading", false);
              this.recordList= res.data.data
              if(!this.recordList.length){
                this.showdata=true
              }
          })
      },
      goRecord(){
          this.showDetail=true
          this.untype=false
          this.type=false
      },
    
    },
    created(){
      this.getRecordList()
    }
  }
</script>

<style lang="less" scoped>
  .green{
    color: #12a441!important;
  }
  .blue{
    color: #388bfe!important;
  }
  .red{
    color: #fe4442!important;
  }
  .normal{
    color: #696969!important;
  }
  .free-money{
    .header{
      height: 66px;
      border-bottom: 1px solid #f3f3f3;
      font-size: 1.8em;
      padding-left: 10px;
      color: #696969;
      line-height: 70px;
      font-weight: 400;
      cursor: pointer;
      margin-left:14px;
    }
    .borrow-content{
      background: #fff;
      padding-top: 20px;
      height: 580px;
      .details{
        width: 964px;
        margin: auto;
        background: #fff;
        div{
          display: flex;
          flex-wrap: nowrap;
          border-bottom: 1px solid #F4F4F4;
          border-top: 1px solid #F4F4F4;
          p{
            width: 161px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            color: #696969;
            font-size: 15px;
            &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(4),&:nth-child(5){
              border-left:1px solid #F4F4F4;
            }
            &:last-child{
              border-right:1px solid #F4F4F4;
            }
          }
        }
        ul::-webkit-scrollbar {
          display: none;
        }
        ul{
          height: 505px;
          overflow-y: auto;
          position: relative;
          li{
            line-height: 35px;
            color: #696969;
            display: flex;
            flex-wrap: nowrap;
            border-bottom: 1px solid #F4F4F4;
            span{
              display: inline-block;
              width: 161px;
              height: 35px;
              font-size: 15px;
              text-align: center;
              &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(4),&:nth-child(5){
                border-left:1px solid #F4F4F4;
              }
              &:last-child{
                cursor: pointer;
                color: #FF9146;
                border-right:1px solid #F4F4F4;
              }
            }
          }
        }
        .nodata{
            position: absolute;
            top: 55%;
            left: 57%;
            transform: translate(-50%,-50%);
        }
      }
      .details2{
        width: 964px;
        height: 220px;
        margin: auto;
        background-image: url('/static/public/image/userImg/br_bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;position: relative;
        .norepay{
          width: 200px;
          position: absolute;
          top: 26%;
          left: 50%;
          transform: translate(-50%,-50%);
          p{
            color:#fff;
            font-size: 18px;
            text-align: center;
            line-height: 45px;
            &:last-child{
              font-size: 50px;
            }
          }
        }
        .someDetail{
          position: absolute;
          left: 50%;
          top: 70%;
          transform: translate(-50%,-50%);
          width: 530px;
          height: 80px;
          background: #fffbf5;
          border-radius: 10px;
          display: flex;
          flex-wrap: nowrap;
          div{
            width: 50%;
            text-align: center;
            padding-top: 10px;
            &:first-child{
              p{
                border-right: 1px solid #e7ddcf;
              }
            }
            p{
              color: #d3a780;
              font-size: 18px;
              line-height: 30px;
              &:last-child{
                color: #000;
                font-size: 22px;
              }
            }
          }
        }
        .borrowDetal{
          position: absolute;
          top: 235px;
          background: #fff;
          div{
            display: flex;
            flex-wrap: nowrap;
            border-bottom: 1px solid #F4F4F4;
            border-top: 1px solid #f4f4f4;
            p{
              color: #696969;
              height: 35px;
              width: 320px;
              font-size: 15px;
              line-height: 35px;
              text-align: center;
              &:nth-child(1),&:nth-child(2){
                border-left: 1px solid #F4F4F4;
              }
              &:last-child{
                border-right: 1px solid #F4F4F4;
                border-left: 1px solid #F4F4F4;

              }
            }
          }
          ul{
            height: 315px;
            overflow-y: auto;
            li{
              height: 35px;
              display: flex;
              flex-wrap: nowrap;
              border-bottom: 1px solid #F4F4F4;
              span{
                display: inline-block;
                width: 320px;
                color: #696969;
                line-height: 35px;
                font-size: 15px;
                text-align: center;
                &:nth-child(1),&:nth-child(2){
                  border-left: 1px solid #F4F4F4;
                }
                &:last-child{
                  border-right: 1px solid #F4F4F4;
                  border-left: 1px solid #F4F4F4;
                }
              }
            }
          }
        }
      }
      .details3{
        .payFinish{
          margin: auto;
          width: 964px;
          background: #fff;
          padding-top: 10px;
          position: relative;
          height: 193px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url('/static/public/image/userImg/br_bg.png');
          .finidhShow{
            div{
              position: absolute;
              top: 45px;
              right: 80px;
            }
            
            p{
              text-align: center;
              height: 35px;
              font-size: 15px;
              line-height: 50px;
              margin-top: 12px;
              color: #fff;
              &:first-child{
                font-size: 20px;
              }
              &:nth-child(2){
                font-size: 50px;
              }
              &:nth-child(3){
                color: rgb(134,82,33);
                font-size: 20px;
              }
            }
          }
        }
        .finishDetal{
          margin-top: 60px;
          background: #fff;
          border-top: 1px solid #f4f4f4;
          div{
            display: flex;
            flex-wrap: nowrap;
            border-bottom: 1px solid #F4F4F4;
            p{
              color: #696969;
              height: 35px;
              width: 320px;
              font-size: 15px;
              line-height: 35px;
              text-align: center;
              &:nth-child(1){
                border-left: 1px solid #F4F4F4;
              }
              &:nth-child(2){
                border-right: 1px solid #F4F4F4;
              }
              &:last-child{
                border-right: 1px solid #F4F4F4;
              }
            }
          }
          ul{
            height: 315px;
            overflow-y: auto;
            li{
              height: 35px;
              display: flex;
              flex-wrap: nowrap;
              border-bottom: 1px solid #F4F4F4;
              span{
                display: inline-block;
                width: 320px;
                color: #696969;
                line-height: 35px;
                font-size: 15px;
                text-align: center;
                border-right: 1px solid #F4F4F4;
                &:first-child{
                  border-left: 1px solid #F4F4F4;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
