<template>
  <div class="lottery-wrap">
    <div class="title">
      <label v-if="ifAnimateBt">{{showIssue}}</label>
      <label v-if="!ifAnimateBt&&!special">{{(+showIssue+1)}}</label>
      <label v-if="!ifAnimateBt&&special">{{'0'+(+showIssue+1)}}</label> 期
      <span>
                <span v-if="ifAnimateBt">开奖结果</span>
                <span v-if="!ifAnimateBt">正在开奖</span>
                <i @click="goto({'path':`/trend/${$route.meta.id}`})" class="orange  iconfont icon-curve">
                  <span class="iconfont_tip_text" >开奖走势</span>
                </i>
                <i @click="gotoLive" class="iconfont icon-pc-live" v-if="![3630,13,12].includes($route.meta.id)">
                   <span class="iconfont_tip_text1" >开奖直播</span>
                </i>
                 <i @click="goto({'path':`/rules/${$route.meta.series}`,query:{id:$route.meta.id}})"
                   class="iconfont icon-rule" style="position:relative">
                  <span class="iconfont_tip_text2" >玩法规则</span>   
                  <div class="rule-circle" v-if="month&&$route.meta.id==12"></div>
                </i>
                 <i @click="openWindow"
                   class="ivu-icon ivu-icon-clipboard" v-if='[3630,13,12].includes($route.meta.id)' style="font-size:18px">
                  <span class="iconfont_tip_text2" >查询赛果</span>
                </i>
      </span>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['ifAnimateBt', 'lastIssue'],
    data () {
      return {
        showIssue: '',
        month:false,
        special:false,
      }
    },
    methods: {
      goto (router) {
        let routeData = this.$router.resolve(router)
        window.open(routeData.href, '_blank')
      },
      gotoLive () {
        let code = '';
        switch(this.$route.meta.id){
          case 1:
            code = '6hc';
            break;
          case 2:
            code = 'pk10';
            break;
          case 3:
            code = 'xyft';
            break;
          case 4:
            code = 'shishicai';
            break;
          case 5:
            code = 'gdkl10';
            break; 
          case 6:
            code = 'xync';
            break;
          case 7:
            code = 'gd11x5';
            break;        
          case 9:
            code = 'jsk3';
            break;
          case 12:
            code = 'kssc';
            break;
          case 13:
            code = 'sfsc';
            break;      
          case 14:
            code = 'xjssc';
            break;  
          case 15:
            code = 'tjssc';
            break;    
          case 16:
            code = 'ksssc'
            break;
          case 17:
            code = 'sfssc'
            break; 
          case 18:
            code = 'kslhc'
            break;
          case 19:
            code = 'wflhc'
            break;        
          case 21:
            code = 'jx11x5'
            break; 
          case 27:
            code = 'ksk3'
            break;
          case 3630:
            code = 'wfsc'
            break;  
          case 3631:
            code = 'sfk3'
            break;
          case 3632:
            code = 'wfk3'
            break;
          case 10044:
            code = 'hksm'
            break;
          case 10045:
            code = 'klft'
            break;  
          default:
            code = '';
            break;
        }
        if(code!=''){
          window.open('https://kjzb6.com/'+ code +'/shipin');
        }else{
          // this.$emit('LotteryAnimateFc', true)
          window.open('https://kjzb6.com/');
        }
      },
      openWindow(){
          window.open('https://kjzb6.com/pk10/kaijiang/index.html')
      },
    },
    mounted () {
      if (this.$route.meta.code != 'bjsc' && this.$route.meta.code != 'bjpcdd' && this.$route.meta.id != 1) {
        this.showIssue = this.lastIssue && this.lastIssue.toString().substring(4, this.lastIssue.length);
        this.special=true
      } else {
        this.showIssue = this.lastIssue;
      }
    },
    created () {
        let date=new Date()
        let month=date.getMonth()+1;
        if(month<11) this.month=true
        else this.month=false
    },
    watch: {
      lastIssue: {
        handler: function (val, oldVal) {
          if (this.$route.meta.code != 'bjsc' && this.$route.meta.code != 'bjpcdd' && this.$route.meta.id != 1) {
            this.showIssue = this.lastIssue && this.lastIssue.toString().substring(4, this.lastIssue.length);
            this.special=true
          } else {
            this.showIssue = this.lastIssue;
          }
        },
        deep: true
      }
    },
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
      .rule-circle{
          width: 10px;
          height: 10px;
          background-color: red;
          position: absolute;
          left: 8px;
          top: -4px;
          border-radius:50%; 
      }
</style>
