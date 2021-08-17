<template>
  <div class="container">
    <Spin size="large" fix v-if="isLoading"></Spin>
    <div class="cp-container-wrap">
      <vp-activity :text="activityText"></vp-activity>
      <div class=" lottery-header-item">
        <vp-lottery-logo v-on:plays-say="playsChoose" :childNeedMess=childNeedMess></vp-lottery-logo>
        <vp-timer :childNeedMess='childNeedMess' v-on:child-say="timeout" ref="timer"></vp-timer>
        <div class="item item3">

          <div class="lottery-wrap" v-if='ifshowLottery'>
            <vp-Prize-Header v-on:LotteryAnimateFc='LotteryAnimateFc' :ifAnimateBt='ifAnimateBt'
                             :lastIssue='lastIssue'></vp-Prize-Header>
            <!-- <div class="showIssue" v-if="($route.meta.id==3630||$route.meta.id==13||$route.meta.id==12) && lasthistorylotteryname!==''" style="color:#000"><span style="color:#000">开奖来源  【{{lasthistorylotteryname}}】</span>{{lasthistorypentime}}  {{lasthistoryissue}}期</div> -->
            <div class="lottery-openNumber-center">
              <div class="openNumber">
                <ul :class="{'list clear-fix': true}"
                   style="transform-style: preserve-3d;overflow:hidden">
                    <li v-for="i in 10" 
                    :class="getNumClass(i,numArr[i-1],lastArr[i-1])"
                    :key="i">
                    {{+i>9?i:'0'+i}}
                    </li>
                </ul>
              </div>
            </div>

            <div class="symbol">
              <div :class="{'active':!+item&&item.length>1}" :key='index' v-for="(item,index) in savelotteryIndex"
                   class="text">{{item||''}}
              </div>
            </div>
          </div>

        </div>
      </div>
      <vp-navigation v-on:tsferTrend=tsferTrend :navObj="navObj"></vp-navigation>
      <transition name="fade" mode="out-in">
        <vp-pk-lia-mian-pan ref="content" :oddsListPar="oddsListPar" :isopen="isopen" :childNeedMess="childNeedMess"
                            v-if="navObj.model === '两面盘'"></vp-pk-lia-mian-pan>
        <vp-pk-pai-ming-one-to-ten ref="content" :oddsListPar="oddsListPar" :isopen="isopen"
                                   :childNeedMess="childNeedMess"
                                   v-if="navObj.model === '排名1~10'"></vp-pk-pai-ming-one-to-ten>
        <vp-pk-g-y-zu-he ref="content" :oddsListPar="oddsListPar" :isopen="isopen" :childNeedMess="childNeedMess"
                         v-if="navObj.model === '冠、亚军组合'"></vp-pk-g-y-zu-he>
        <vp-pk-three-to-Six ref="content" :oddsListPar="oddsListPar" :isopen="isopen" :childNeedMess="childNeedMess"
                            v-if="navObj.model === '三、四、五、六名'"></vp-pk-three-to-Six>
        <vp-pk-seven-to-ten ref="content" :oddsListPar="oddsListPar" :isopen="isopen" :childNeedMess="childNeedMess"
                            v-if="navObj.model === '七、八、九、十名'"></vp-pk-seven-to-ten>
        <vp-pk-zu-he ref="content" :oddsListPar="oddsListPar" :isopen="isopen" :childNeedMess="childNeedMess"
                     v-if="navObj.model === '快捷'"></vp-pk-zu-he>
      </transition>
    </div>
    <messageAlert></messageAlert>
    <!-- <vp-lottery-animate v-on:LotteryAnimateFc='LotteryAnimateFc' v-show="LotteryAnimateStaue"></vp-lottery-animate> -->
  </div>
</template>

<script>

  import vpPkLiaMianPan from './child/liang-mian-pan'
  import vpPkPaiMingOneToTen from './child/pai-ming-one-to-ten'
  import vpPkGYZuHe from './child/g-y-zu-he'
  import vpPkThreeToSix from './child/three-to-six'
  import vpPkSevenToTen from './child/seven-to-ten'
  import vpPkZuHe from './child/zu-he'
  import data from '@/pages/public/tradition/data'
  import messageAlert from '../../components/messageAlert/messageAlert.vue'
  export default {
    mixins: [data],
    data () {
      return {
        childNeedMess: {
          title: '北京赛车',
          issue: '',
          id: '',
          total: '44',
          plays: '传统玩法',
          code: '',
          series: ''
        },
        navObj: {
          model: '两面盘',
          list: [
            {title: '两面盘'},
            {title: '排名1~10'},
            {title: '冠、亚军组合'},
            {title: '三、四、五、六名'},
            {title: '七、八、九、十名'},
            {title: '快捷'}
          ]
        },
        lotteryDatasShow: ['', '', '', '', '', '', '', '', '', ''],
        lotteryDatasShowLength: 10,
        lotteryDatasSave: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        numArr: [2, 1, 3, 5, 4, 6, 7, 8, 9, 10],
        lastArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        animationStatus:"",
        activeArr:[],
        moving:false,
        open:false,
        isAimate:false,
        // lasthistoryissue:"",
        // lasthistorylotteryname:"",
        // lasthistorypentime:"",
      }
    },
    methods: {
      animationTask(){
         this.moving = true
         this.animationStatus = 'num-animation-active'
         const arr = JSON.parse(JSON.stringify(this.numArr));
         const count = Math.floor(Math.random() * 100) % 3
           if (count) {
              const oldIndex = (Math.floor(Math.random() * 100) % 5) + 5
              const newIndex = Math.floor(Math.random() * 100) % (oldIndex - 3)
              const num = arr.splice(oldIndex, 1)[0]
              arr.splice(newIndex, 0, num)
              this.lastArr = this.numArr
              this.numArr = arr
              this.activeArr = [num]
           } else {
              const oldIndex1 = (Math.floor(Math.random() * 100) % 4) + 6
              const oldIndex2 = Math.floor(Math.random() * 100) % 4
              const temp = Math.ceil((oldIndex1 - oldIndex2) / 2) - 1
              const newIndex1 = oldIndex1 - temp
              const newIndex2 = oldIndex2 + temp
              const num1 = arr.splice(oldIndex1, 1)[0]
              arr.splice(newIndex1, 0, num1)
              const num2 = arr.splice(oldIndex2, 1)[0]
              arr.splice(newIndex2, 0, num2)
              this.lastArr = this.numArr
              this.numArr = arr
              this.activeArr = [num1, num2]
           }
      },
      getNumClass(i,now,old){
          const arr =['num-item']
          arr.push('num-animation-' + (this.numArr.indexOf(i) + 1))
          arr.push(this.animationStatus || "num-animation")
          arr.push("pkActive"+i)
          if (this.open) arr.push('num-animation-open')
          if (this.activeArr.includes(i)) {
          arr.push('active-moving')
          if (now < old) arr.push('num-animation-left')
          if (now > old) arr.push('num-animation-right')
         }
          return arr
      },
    },
    components: {
      vpPkLiaMianPan,
      vpPkPaiMingOneToTen,
      vpPkGYZuHe,
      vpPkThreeToSix,
      vpPkSevenToTen,
      vpPkZuHe,
      messageAlert
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../../assets/less/public/var.less';

  @lotteryHeight: 30px; //开奖号高度

  .container {
    height: 100%;

    .cp-container-wrap {
      width: 100%;

      .lottery-header-item {
        .item {
          &.item3 {
            .lottery-wrap {
              .showIssue{
                 padding-left: 36px;
                 font-size:15px;
              }
              .lottery-openNumber-center {
                padding: 5px 0;
                 
                 .openNumber{
                     width: 350px;
                     height: 30px;
                     margin-right: 5px;
                    .list{
                        position: relative;
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                    }
                 }
                 .num-item{
                       display:block;
                       width: @lotteryHeight;
                       height: @lotteryHeight;
                       font-size: 18px;
                       line-height: 30px;
                       border-radius: 0;
                       color: #fff;
                       text-align: center;
                       margin-left: 5px;
                 }
                    .num-animation {
                      float: none !important;
                      position: absolute;
                      // top: 0.04rem;
                      margin: 0 !important;
                    }
                     .num-animation-active {
                        float: none !important;
                        position: absolute;
                        // top: 0.04rem;
                        margin: 0 !important;
                        transition: left 2s cubic-bezier(0.5, 0, 0.5, 1);
                      }
                      .active-moving {
                            z-index: 420 !important;
                      }
                         .num-item:before {
                            content: '';
                            display: block;
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(0, 0, 0, 0);
                            z-index: -1 !important;
                            // border-radius: 0.04rem;
                            transform: scale(0);
                        }
                       .num-animation-open:before {
                          background-color: #efefef;
                          z-index: 420 !important;
                          transform: scale(1.2);
                          transition: all 400ms;
                        }
                         .num-animation-left {
                         }

                         .num-animation-right {
                         }
                         .num-animation-1 {
                             left:5px;
                         }
                         .num-animation-2 {
                             left: 40px;
                         }
                         .num-animation-3 {
                             left: 75px;
                         }
                         .num-animation-4 {
                             left: 110px;
                         }
                         .num-animation-5 {
                             left: 145px;
                         }
                          .num-animation-6 {
                             left: 180px;
                         }
                         .num-animation-7 {
                             left: 215px;
                         }
                         .num-animation-8 {
                             left: 250px;
                         }
                         .num-animation-9 {
                             left: 285px;
                         }
                           .num-animation-10 {
                             left: 320px;
                         }
                    .pkActive1 {
                      background: #FAA000;
                    }

                    .pkActive2 {
                      background: #0171D3;
                    }

                    .pkActive3 {
                      background: #666669;
                    }

                    .pkActive4 {
                      background: #FC7103;
                    }

                    .pkActive5 {
                      background: #00A39F;
                    }

                    .pkActive6 {
                      background: #5034F7;
                    }

                    .pkActive7 {
                      background: #DCB600;
                    }

                    .pkActive8 {
                      background: #8B858F;
                    }

                    .pkActive9 {
                      background: #970101;
                    }

                    .pkActive10 {
                      background: #05A102;
                    }
              }
              .issymbol{
                padding-top:5px; 
              }
            }
          }
        }

      }
    }
  }
</style>
