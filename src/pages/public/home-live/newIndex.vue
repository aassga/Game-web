<template>
  <div class="live">
    <div class="shixun">
          <div class="shiqie">
            <ul>
              <li v-for="(item,i) in liveData" :key="i" @click="gogame(i)" :class='{cur:item.index==num}'>
                <div class="lit"><img :src="item.img" alt=""></div>
                <div class="liw">{{item.name}}</div>
              </li>
            </ul>
          </div>
          <div class="cl"></div>
          <div class="shinei">
              <Carousel v-model="value3">
                  <Carousel-item v-for="(item, i) in liveContentData" :key="i" class="myItems sxnei dn" :class="item.className">
                      <div class="sxjie">
                        <div class="sxti">
                          <img :src="item.img" alt="">
                        </div>
                        <div class="sxwen">
                           <span>{{item.text1}}</span>
                          <br> <span>{{item.text2}}</span>
                          <br> <span v-if="item.text3">{{item.text3}}</span>
                          <br> <span v-if="item.text4">{{item.text4}}</span>
                        </div>
                        <div class="sxting">
                          <ul>
                            <li v-for="(innerItem,index) in item.list" :key="index">
                              <a href="javascript:;">
                                <div class="tim">
                                  <img :src="innerItem.src" alt="">
                                </div>
                                <div class="tiw">{{innerItem.name}}</div>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="liji" @click="getItemId(item)"><a href="javascript:;" class=""><img src="/static/public/image/game/live/liji.png" alt=""></a></div>
                      </div>
                  </Carousel-item>
              </Carousel>
          </div>
      </div>
  </div>
</template>

<script>
  import mixin from '../games/public.js'
  export default {
    mixins: [mixin],
    data () {
      return {
        value3: 0,
        num:0,
        liveData:[
          {img:'/static/public/image/game/live/sx1.png',name:'AG视讯',id:31,index:0},
          {img:'/static/public/image/game/live/sx2.png',name:'BBIN视讯',id:32,index:1},
          {img:'/static/public/image/game/live/sx3.png',name:'BG视讯',id:3180,index:2},
          {img:'/static/public/image/game/live/sx4.png',name:'DG视讯',id:42,index:3},
          {img:'/static/public/image/game/live/sx5.png',name:'DS视讯',id:34,index:4},
          {img:'/static/public/image/game/live/sx6.png',name:'LEBO视讯',id:44,index:5},
          {img:'/static/public/image/game/live/sx7.png',name:'OG视讯',id:48,index:6},
          {img:'/static/public/image/game/live/sx8.png',name:'EBET视讯',id:43,index:7},
          {img:'/static/public/image/game/live/sx9.png',name:'LMG视讯',id:45,index:8},
          {img:'/static/public/image/game/live/sx10.png',name:'AB视讯',id:46,index:9},
          {img:'/static/public/image/game/live/sx11.png',name:'SA视讯',id:49,index:10},
          {img:'/static/public/image/game/live/sx12.png',name:'VR彩票',id:30,index:11},
          
        ],
        liveContentData:[
          {
            img:'/static/public/image/game/live/sxt1.png',
            className:'sxbg1',
            text1:'引领业界先锋，权威认证！',
            text2:'美女主播搭配惹火荷官',
            text3:'您非玩不可的唯一选择！',
            id:31,
            list:[
              {
                src:'/static/public/image/game/live/tim1.png',
                name:'旗舰厅'
              },
              {
                src:'/static/public/image/game/live/tim2.png',
                name:'国际厅'
              },{
                src:'/static/public/image/game/live/tim3.png',
                name:'竞咪'
              },{
                src:'/static/public/image/game/live/tim4.png',
                name:'百家乐'
              },{
                src:'/static/public/image/game/live/tim5.png',
                name:'骰宝'
              },{
                src:'/static/public/image/game/live/tim6.png',
                name:'龙虎'
              },{
                src:'/static/public/image/game/live/tim7.png',
                name:'轮盘'
              }
            ]
          },
          {
            img:'/static/public/image/game/live/sxt2.png',
            className:'sxbg2',
            text1:'亚洲首选真人娱乐品牌',
            text2:'具备全方位、最多元游戏种类玩法',
            text3:'鱼虾螃、色碟、走地百家乐',
            text4:'创新丰富主题、您非玩不可的唯一选择！',
            id:32,
            list:[
              {
                src:'/static/public/image/game/live/tim1.png',
                name:'旗舰厅'
              },
              {
                src:'/static/public/image/game/live/tim2.png',
                name:'国际厅'
              },{
                src:'/static/public/image/game/live/tim3.png',
                name:'竞咪'
              },{
                src:'/static/public/image/game/live/tim4.png',
                name:'百家乐'
              },{
                src:'/static/public/image/game/live/tim5.png',
                name:'骰宝'
              },{
                src:'/static/public/image/game/live/tim6.png',
                name:'龙虎'
              },{
                src:'/static/public/image/game/live/tim7.png',
                name:'轮盘'
              }
            ]
          },
          {
            img:'/static/public/image/game/live/sxt3.png',
            className:'sxbg3',
            text1:'业界独创「多彩百家乐」一枝独秀',
            text2:'并搭配最热门的亮丽主播，共咪百家乐无限畅游',
            text3:'让您体验绝佳乐趣！',
            id:3180,
            list:[
              {
                src:'/static/public/image/game/live/tim1.png',
                name:'旗舰厅'
              },
              {
                src:'/static/public/image/game/live/tim2.png',
                name:'国际厅'
              },{
                src:'/static/public/image/game/live/tim3.png',
                name:'竞咪'
              },{
                src:'/static/public/image/game/live/tim4.png',
                name:'百家乐'
              },{
                src:'/static/public/image/game/live/tim5.png',
                name:'骰宝'
              },{
                src:'/static/public/image/game/live/tim6.png',
                name:'龙虎'
              },{
                src:'/static/public/image/game/live/tim7.png',
                name:'轮盘'
              }
            ]
            
          },
          {
            img:'/static/public/image/game/live/sxt4.png',
            className:'sxbg4',
            text1:'目不暇给的实境赌场环境，精采乐趣不停歇',
            text2:'每月DG梦女郎在游戏中与您共伴',
            text3:'保证让您流连忘返、爱不释手！',
            id:42,
            list:[
              {
                src:'/static/public/image/game/live/tim1.png',
                name:'旗舰厅'
              },
              {
                src:'/static/public/image/game/live/tim2.png',
                name:'国际厅'
              },{
                src:'/static/public/image/game/live/tim3.png',
                name:'竞咪'
              },{
                src:'/static/public/image/game/live/tim4.png',
                name:'百家乐'
              },{
                src:'/static/public/image/game/live/tim5.png',
                name:'骰宝'
              },{
                src:'/static/public/image/game/live/tim6.png',
                name:'龙虎'
              },{
                src:'/static/public/image/game/live/tim7.png',
                name:'轮盘'
              }
            ]
            
          },
          {
            img:'/static/public/image/game/live/sxt5.png',
            className:'sxbg5',
            text1:'高端娱乐、重磅来袭',
            text2:'多国荷官美女如云',
            text3:'快来共赌亲临现场的实境体验！',
            id:34,
            list:[
              {
                src:'/static/public/image/game/live/tim1.png',
                name:'旗舰厅'
              },
              {
                src:'/static/public/image/game/live/tim2.png',
                name:'国际厅'
              },{
                src:'/static/public/image/game/live/tim3.png',
                name:'竞咪'
              },{
                src:'/static/public/image/game/live/tim4.png',
                name:'百家乐'
              },{
                src:'/static/public/image/game/live/tim5.png',
                name:'骰宝'
              },{
                src:'/static/public/image/game/live/tim6.png',
                name:'龙虎'
              },{
                src:'/static/public/image/game/live/tim7.png',
                name:'轮盘'
              }
            ]
            
          },
          {
            img:'/static/public/image/game/live/sxt6.png',
            className:'sxbg6',
            text1:'娱乐热潮，颠峰再现',
            text2:'风情万种、百变性感荷官',
            text3:'时尚简约风格，钜资打造高科技赌场！',
            id:44,
            list:[
              {
                src:'/static/public/image/game/live/tim1.png',
                name:'旗舰厅'
              },
              {
                src:'/static/public/image/game/live/tim2.png',
                name:'国际厅'
              },{
                src:'/static/public/image/game/live/tim3.png',
                name:'竞咪'
              },{
                src:'/static/public/image/game/live/tim4.png',
                name:'百家乐'
              },{
                src:'/static/public/image/game/live/tim5.png',
                name:'骰宝'
              },{
                src:'/static/public/image/game/live/tim6.png',
                name:'龙虎'
              },{
                src:'/static/public/image/game/live/tim7.png',
                name:'轮盘'
              }
            ]
            
          },
          {
            img:'/static/public/image/game/live/sxt7.png',
            className:'sxbg7',
            text1:'现场美女荷官如云、游戏娱乐选择众多，提供您数种真人娱乐游戏',
            text2:'让您随时置身如现场亲临，分分秒秒感受现场发牌真实性',
            text3:'专业唯一，尽在OG',
            id:48,
            list:[
              {
                src:'/static/public/image/game/live/tim1.png',
                name:'旗舰厅'
              },
              {
                src:'/static/public/image/game/live/tim2.png',
                name:'国际厅'
              },{
                src:'/static/public/image/game/live/tim3.png',
                name:'竞咪'
              },{
                src:'/static/public/image/game/live/tim4.png',
                name:'百家乐'
              },{
                src:'/static/public/image/game/live/tim5.png',
                name:'骰宝'
              },{
                src:'/static/public/image/game/live/tim6.png',
                name:'龙虎'
              },{
                src:'/static/public/image/game/live/tim7.png',
                name:'轮盘'
              }
            ]
            
          },
          {
            img:'/static/public/image/game/live/sxt8.png',
            className:'sxbg8',
            text1:'多样化的娱乐选择，让您足不出户也能体会现场的娱乐享受',
            text2:'游戏种类繁多，绝不容您错过， E路畅通，享受EBET带给您的视讯娱乐快感',
            id:43,
            list:[
              {
                src:'/static/public/image/game/live/tim1.png',
                name:'旗舰厅'
              },
              {
                src:'/static/public/image/game/live/tim2.png',
                name:'国际厅'
              },{
                src:'/static/public/image/game/live/tim3.png',
                name:'竞咪'
              },{
                src:'/static/public/image/game/live/tim4.png',
                name:'百家乐'
              },{
                src:'/static/public/image/game/live/tim5.png',
                name:'骰宝'
              },{
                src:'/static/public/image/game/live/tim6.png',
                name:'龙虎'
              },{
                src:'/static/public/image/game/live/tim7.png',
                name:'轮盘'
              }
            ]
            
          },
          {
            img:'/static/public/image/game/live/sxt9.png',
            className:'sxbg9',
            text1:'在线会员众多，让您拥有高品质的游戏娱乐环境，身如其境',
            text2:'游戏选择更是多样化，荷官现牌发牌供您选择',
            text3:'尊爵非凡、如临现场!',
            id:45,
            list:[
              {
                src:'/static/public/image/game/live/tim1.png',
                name:'旗舰厅'
              },
              {
                src:'/static/public/image/game/live/tim2.png',
                name:'国际厅'
              },{
                src:'/static/public/image/game/live/tim3.png',
                name:'竞咪'
              },{
                src:'/static/public/image/game/live/tim4.png',
                name:'百家乐'
              },{
                src:'/static/public/image/game/live/tim5.png',
                name:'骰宝'
              },{
                src:'/static/public/image/game/live/tim6.png',
                name:'龙虎'
              },{
                src:'/static/public/image/game/live/tim7.png',
                name:'轮盘'
              }
            ]
            
          },
          {
            img:'/static/public/image/game/live/sxt10.png',
            className:'sxbg10',
            text1:'让您感受”人在网络，行走天下”的视讯娱乐快感',
            text2:'360度视觉享受，美女荷官面对面为您发牌',
            text3:'让您行世界之旅，游戏还能交朋友',
            id:46,
            list:[
              {
                src:'/static/public/image/game/live/tim1.png',
                name:'旗舰厅'
              },
              {
                src:'/static/public/image/game/live/tim2.png',
                name:'国际厅'
              },{
                src:'/static/public/image/game/live/tim3.png',
                name:'竞咪'
              },{
                src:'/static/public/image/game/live/tim4.png',
                name:'百家乐'
              },{
                src:'/static/public/image/game/live/tim5.png',
                name:'骰宝'
              },{
                src:'/static/public/image/game/live/tim6.png',
                name:'龙虎'
              },{
                src:'/static/public/image/game/live/tim7.png',
                name:'轮盘'
              }
            ]
            
          },
          {
            img:'/static/public/image/game/live/sxt11.png',
            className:'sxbg11',
            text1:'提供您如临现场的视觉娱乐享受，您可尽情随时下注',
            text2:'真人美女为您现场发牌，让你带走属于您的成功和财富',
            text3:'不是试运气，财富本来就属于您！',
            id:49,
            list:[
              {
                src:'/static/public/image/game/live/tim1.png',
                name:'旗舰厅'
              },
              {
                src:'/static/public/image/game/live/tim2.png',
                name:'国际厅'
              },{
                src:'/static/public/image/game/live/tim3.png',
                name:'竞咪'
              },{
                src:'/static/public/image/game/live/tim4.png',
                name:'百家乐'
              },{
                src:'/static/public/image/game/live/tim5.png',
                name:'骰宝'
              },{
                src:'/static/public/image/game/live/tim6.png',
                name:'龙虎'
              },{
                src:'/static/public/image/game/live/tim7.png',
                name:'轮盘'
              }
            ]
            
          },
          {
            img:'/static/public/image/game/live/sxt12.png',
            className:'sxbg12',
            text1:'非凡游戏体验，搭配快速紧凑的游戏',
            text2:'令您每分每秒精采刺激，激情不断！',
            // text3:'独有的包桌与咪牌百家乐让您感觉身临其境！',
            id:30,
            list:[
              {
                src:'/static/public/image/game/live/tim1.png',
                name:'旗舰厅'
              },
              {
                src:'/static/public/image/game/live/tim2.png',
                name:'国际厅'
              },{
                src:'/static/public/image/game/live/tim3.png',
                name:'竞咪'
              },{
                src:'/static/public/image/game/live/tim4.png',
                name:'百家乐'
              },{
                src:'/static/public/image/game/live/tim5.png',
                name:'骰宝'
              },{
                src:'/static/public/image/game/live/tim6.png',
                name:'龙虎'
              },{
                src:'/static/public/image/game/live/tim7.png',
                name:'轮盘'
              }
            ]
            
          },
        ]
      }
    },
    methods: {
      gogame(i){
        this.value3 = i;
        this.num = i;
      }
    },
    created: function () {
    },
    mounted () {
      
    },
    watch: {},
    components: {
      // vpHomeLive
    }
  }


</script>

<style lang="less" scoped>
 

  .shixun {
    width: 980px;
    margin: 0 auto;
    background: #6a3d00;
    // padding:0 35px;
}
.shiqie {
    height: 130px;
    background: #603600;
    box-sizing: inherit;
    ul{
      padding: 13px;
      padding-top: 16px;
      .cur {
          color: #311000;
          background: url(/static/public/image/game/live/libg2.png) no-repeat center top;
      }
      li {
          float: left;
          color: #fff;
          cursor: pointer;
          margin: 5px 7px;
          background: url(/static/public/image/game/live/libg1.png) no-repeat center top;
          height: 40px;
          width: 145px;
          padding-bottom: 4px;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -webkit-align-items: center;
          -ms-flex-align: center;
          align-items: center;
          .liw {
            font-size: 18px;
            padding-left: 4px;
          }
          .lit img {
            display: block;
          }
      }
      // li:first-child{
      //     color: #311000;
      //     background: url(/static/public/image/game/live/libg2.png) no-repeat center top;
      // }
      li:hover{
          background: url(/static/public/image/game/live/libg2.png) no-repeat center top;
          color:#311000;
      }
    }
}
.cl {
    clear: both;
}
.shinei {
    height: 662px;
    padding:0 35px;
    /deep/ .ivu-carousel{

      .ivu-carousel-arrow.left,.ivu-carousel-arrow.right{
        display:none;
      }

      .ivu-carousel-dots{
        display:none;
      }
  }
}
.sxbg1 {
    background: url(/static/public/image/game/live/sxbg1.png) no-repeat 404px bottom;
}
.sxbg2 {
    background: url(/static/public/image/game/live/sxbg2.png) no-repeat 401px bottom;
}
.sxbg3 {
    background: url(/static/public/image/game/live/sxbg3.png) no-repeat 406px bottom;
}
.sxbg4 {
    background: url(/static/public/image/game/live/sxbg4.png) no-repeat 404px bottom;
}
.sxbg5 {
    background: url(/static/public/image/game/live/sxbg5.png) no-repeat 404px bottom;
}
.sxbg6 {
    background: url(/static/public/image/game/live/sxbg6.png) no-repeat 405px bottom;
}
.sxbg7 {
    background: url(/static/public/image/game/live/sxbg7.png) no-repeat 404px bottom;
}
.sxbg8 {
    background: url(/static/public/image/game/live/sxbg8.png) no-repeat 404px bottom;
}
.sxbg9 {
    background: url(/static/public/image/game/live/sxbg9.png) no-repeat 404px bottom;
}
.sxbg10 {
    background: url(/static/public/image/game/live/sxbg10.png) no-repeat 404px bottom;
}
.sxbg11 {
    background: url(/static/public/image/game/live/sxbg11.png) no-repeat 404px bottom;
}
.sxbg12 {
    background: url(/static/public/image/game/live/sxbg12.png) no-repeat 404px bottom;
}
.sxnei {
    margin: 0px auto;
    height: 640px!important;
}

.sxjie {
    width: 476px;
    padding-top: 55px;
}
.sxwen {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    padding-top: 20px;
    height: 136px;
}
.sxting {
    height: 205px;
    width: 370px;
    li {
    float: left;
    height: 92px;
    padding-right: 38px;
    a {
      display: block;
      color: #f9da5e;
      .tim {
          height: 53px;
          overflow: hidden;
          img {
            border: none;
            vertical-align: middle;
        }
      }
      .tiw {
          text-align: center;
          line-height: 38px;
      }
    }
  }
}
.liji{
  transition: all linear .3s;
}
.liji:hover{
  opacity: .8;
}




</style>
