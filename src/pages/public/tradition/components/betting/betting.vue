<template>
  <div>
    <div class="vp-lottery-betting-style">

      <div class="vp-betting-header">
        <div>{{title}}</div>
        <div>第 <span>{{issue.toString().length>8 ? issue.toString().slice(4) : issue}}</span> 期</div>
        <div v-if="showerr">共计￥ <span>{{totalCount.total}}/{{totalCount.number}}</span> 注</div>
        <div v-else><span>{{showbalance?'超出余额'+userinfo.balance:'超出注单限额'}}</span></div>
      </div>

      <div class="vp-betting-container">
        <!-- <table>
            <tr>
                <td>玩法</td><td>玩法</td><td>玩法</td>
            </tr>
        </table> -->
        <div class="betting-container-header">
          <div class="title">玩法</div>
          <div class="title">内容</div>
          <div class="title">赔率</div>
          <div class="title">单注金额（元）</div>
          <div class="title" v-if="showque">确定</div>
        </div>

        <div class="vp-overfloat-out">
          <div class="vp-overfloat-in">
            <div class="betting" :key="outIndex" v-for="(outItem,outIndex) in submitList" v-if="showdatas">
              <div class="text">{{outItem.title.includes("正码特") ? outItem.title.replace("正码特","特码特"):outItem.title}}</div>
              <div class="text" v-html="outItem.ball"></div>
              <div class="text">{{outItem.price}}</div>
              <div class="text">
                <!-- {{(outItem.model*totalCount.db*totalCount.ratio).toFixed(2)}} -->
                  <!-- <Input type="text" v-model="outItem.model" class="betinput" style="width:70px"> -->
                  <!-- outItem.model=outItem.model&&outItem.model.replace(/[^\d\,]/g,'') -->
                   <Input type="text" v-model="outItem.model" placeholder=""  style="width:80px" size="small" @on-change="Verifyinput(outItem)"  :class="getErrClass(outItem)" :maxlength="maxlength" :key="outIndex"></Input>
              </div>
              <!-- <div v-if="$route.meta.series=='lhc'" class="text">
                   <Input type="text" v-model="outItem.model" placeholder=""  style="width:80px" size="small"  @on-change="Verifyinput(outItem)" :class="{errinput:outItem.errMessg}" ></Input>
              </div> -->
              <div class="text" v-if="showque">
                <!-- <span @click="outItem.active=!outItem.active"> <Radio v-model="outItem.active"></Radio></span> -->
                  <Checkbox v-model="outItem.active" @on-change="selectRadio"></Checkbox>
              </div>
            </div>
            <div class="detail" v-if="issuedetail.length>0">
                  <!-- <Poptip trigger="hover" :content="lotteryissue" placement="bottom-start">
                         <span style="font-size:14px;color:#2d8cf0">查看明细</span>
                  </Poptip> -->
                  <p @mouseover="changeSrc1" @mouseout="changeSrc2">查看明细</p>
            </div>
          </div>
        </div>
      </div>
      <div class="explainDiv" ref="explainDiv" @mouseover="changeSrc1" @mouseout="changeSrc2"> 
              <span v-for="(issue,issndex) in issuedetail" :key="issndex"><span style="color:#2d8cf0">{{issndex <9 ? (issndex==9 ? '0'+issndex :'0'+(issndex+1)) : (issndex+1) }}:</span>{{issue.ball}}</span>
      </div>
    </div>
  </div>
</template>
<script>
 import {Checkbox} from "iview"
  export default {
    props: {
      list: {
        type: Array
      }
    },
    data () {
      return {
        message: {},
        submitList: [
          {title: '玩法'},
          {title: '内容'},
          {title: '注数'},
          {title: '倍数'},
          {title: '单注金额（元）'}
        ],
        totalCount: {
           total:"",
        },
        issuedetail:[],
        errclass:[],
        title: '',
        issue: '',
        showerr:true,
        showque:true,
        showdatas:true,
        lotteryissue:"01:1,2,3  02:1,5,6",
        showbalance:false,
        maxlength:JSON.parse(localStorage.config).limit.lotteryBetMax.toString().length
      }
    },
    methods: {
      getList (list, totalCount, childNeedMess,issuedetail) {
        if(issuedetail){
             this.issuedetail=issuedetail
        }
        if(list.length==1){
            this.showque=false
        }else{
             this.showque=true
        }
        this.showerr=true
        this.submitList = list
        this.totalCount = totalCount
        localStorage.setItem('totalCount', JSON.stringify(totalCount))
        this.title = childNeedMess.title
        this.issue = childNeedMess.issue;
             this.submitList.forEach(element => {
                    element.active=true
             });
      },
      selectRadio(val){
          this.sumLottery()
          this.$emit('bet-ball-list', this.submitList)
      },
      sumLottery(){
         var num=0,total=0
         this.submitList.forEach(element => {
                if(element.active){
                     num++
                     total= +element.model+total
                 }
         });
       this.totalCount.total=total;
       this.totalCount.number=num
     },
     Verifyinput(outItem){ 
       if(!this.dInvalidMoneynew(outItem.model)){
                   outItem.model=''
                this.showdatas=false
                setTimeout(()=>{ 
                  this.showdatas=true 
              })
         }else{
             if(+outItem.model>+(JSON.parse(localStorage.config).limit.lotteryBetMax)){
                if(outItem.active){
                   this.showerr=false
                }
             }else{
                this.showerr=true
             }
         }
          
         if(this.$route.meta.series =='lhc'&& this.issuedetail.length>0){
             this.totalCount.total= this.totalCount.number*outItem.model
         }else{
             this.sumLottery() 
         }
     },
     getErrClass(outItem){
          const arr=[]
          if(outItem.active){
            if(+outItem.model>+(JSON.parse(localStorage.config).limit.lotteryBetMax)){
              arr.push("errinput")
              this.showerr=false
             }
          }
          if(+outItem.model<1){
              arr.push("errinput")
          }
          if(+this.totalCount.total>+this.userinfo.balance){
              this.showerr=false
              this.showbalance=true
              arr.push("errinput")
          }else{
              this.showbalance=false
          }
          return arr
     },
     changeSrc1(){
        this.$refs.explainDiv.style.display="block"
     },
     changeSrc2(){
        this.$refs.explainDiv.style.display="none"
     }
    },
    watch: {
      total:function(val,oldval){
          if(+this.totalCount.total>+this.userinfo.balance){
              this.showerr=false
              this.showbalance=true
          }else{
              this.showerr=true
              this.showbalance=false
          }
      }
    },
    computed: {
        userinfo() {
          return this.$store.state.mainState.userinfo;
        },
        total(){
           return this.totalCount.total
        },
    },
    created: function () {
         
    },
    mounted () {
    },
    components: {
      Checkbox,
    },
  }
</script>
<style lang="less" scoped>
     /deep/ .ivu-checkbox-wrapper{
          margin-right: 0px;
     }
     /deep/ .ivu-input{
        text-align: center
     }
     
      .explainDiv{
             display: none;
             position: absolute;
             background-color: #fff;
						 box-shadow: 0 1px 6px rgba(0,0,0,.2);
						 border-radius:5px;
						 padding:6px 10px;
             z-index:3;
             top:210px;
             max-width: 544px;
             max-height: 110px;
             overflow-y: auto;
             span{
               font-size: 14px;
               display: inline-block;
               margin-left:5px; 
             }
       }
      .vp-betting-container{
         position: relative;
      }
      .detail{
             padding:6px 0 0 5px;
          p{
            font-size:14px;
            color:#2d8cf0;
            width: 80px;
            cursor: pointer;
         }
       }
      // .detail:hover .explainDiv{
      //       display:block;
      //       color: #ff5c5c;
		  // }
      .errinput{
          border:  1px solid  #ff5c5c;
          border-radius:4px;
             /deep/.ivu-input{
                border:none;
                outline: 0;
                box-shadow: 0 0 0 0;
            } 
            /deep/ .ivu-input:focus {
                border:none;
                outline: 0;
                box-shadow: 0 0 0 0;
            }
            /deep/ .ivu-input:hover {
                  border:none;
              }
            
      }
</style>

