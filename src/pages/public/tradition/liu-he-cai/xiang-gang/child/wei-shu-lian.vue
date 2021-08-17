<template>
  <div class="lottery-content-all-wrap">
    <form ref="formDynamic">
      <div class="lottery-content-all-left">
        <div class="he-xiao-header-wrap">
          <div :key="index" v-for="(item,index) in navigation.list" class="he-xiao-header-item">
            <span :class="{'active':item.title==navigation.navSelect}" @click="navSelectFc(item)">{{item.title}}</span>
          </div>
        </div>
        <div class="decial-1 alignItems">
          <div :key="indexOut" v-for="(itemOut,indexOut) in listTop" class="decial-1-item">
            <div class="all-item">
              <!-- <el-checkbox-group v-model="checkList">
                <div @click="cbClick(itemOut,itemInner)" :key="indexInner"
                     v-for="(itemInner,indexInner) in itemOut.mess" class="box he-xiao-cheacBox">
                  <span :class="{'active':itemInner.active}" class="theBall">{{itemInner.ball}}</span>
                  <span :class="{'active':itemInner.active}" class="price">{{itemInner.price}}</span>
                  <el-checkbox @click.native.stop="''" @change="checkboxChange($event,itemInner)"
                               :disabled="disabledCheckBox" :label="itemInner"></el-checkbox>
                  <div :style="{'background':itemThird.color}" class="number" :key="indexThird"
                       v-for="(itemThird,indexThird) in itemInner.list">
                    {{itemThird.ball}}
                  </div>
                </div>
              </el-checkbox-group> -->


              <div >
                  <div @click="cbClick(itemOut,itemInner,$event)" :key="indexInner"
                      v-for="(itemInner,indexInner) in itemOut.mess" class="box he-xiao-cheacBox" style="background-color:#fff;">
                    
                    <span :class="{'active':itemInner.active}" class="theBall">{{itemInner.ball}}</span>
                    <span :class="{'active':itemInner.active}" class="price">{{itemInner.price}}</span>
                    <label :for="Math.random(1,10)+'hexiao'" class="inputBox" :class="{checkedInp:itemInner.active,disabledInp:!isopen}">
                      <input type="checkbox" :id="Math.random(1,10)+'hexiao'" v-model="itemInner.active" :value="itemInner.active" class="selectInp" :disabled="itemInner.active">
                    </label>
                    
                    <div :style="{'background':itemThird.color}" class="number" :key="indexThird"
                        v-for="(itemThird,indexThird) in itemInner.list">
                      {{itemThird.ball}}
                    </div>
                  </div>
              </div>





            </div>

          </div>
        </div>
        <!-- <vp-history ref="vpHistory"></vp-history> -->
      </div>
      <div class="lottery-content-all-right">
        <vp-fast-and-submit v-on:range-say="rangeChange" v-on:submit-Input-say="fastInput"
                            v-on:submit-resetAll="resetAll" v-on:submit-review="review" :totalCount="totalCount"
                            :selectFast="selectFast" :saveSelectMoney="saveSelectMoney" :rangleType="rangleType" :confirmbet="confirmbet">
        </vp-fast-and-submit>
      </div>
    </form>
    <Modal :scrollable=true title="投注信息" v-model="modal" class-name="vp-betting-warp" width="584" height="400"
           @on-ok="submit">
      <!-- @on-cancel="cancel" -->

      <vp-betting ref="betting"></vp-betting>
       <div slot="footer">
          <Button type="text" size="large" @click="modal=false">取消</Button>
          <Button type="primary" size="large" @click="submit">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import vpBetting from '../../../components/betting/betting'
  import vpFastAndSubmit from '../../../components/fast-and-submit/submit'
  import UserService from '@/service/public/UserService.js'
  import LotterySev from '@/pages/public/tradition/data/LotterySev.js'
  import store from '@/vuex/store'
  import data from '@/pages/public/tradition/data/liu-he-cai'
  import vpHistory from '../../../components/history/history'

  export default {
    props: {
      childNeedMess: {
        type: Object
      },
      isopen: {
        type: Boolean
      },
      oddsListPar: {
        type: Object
      }
    },
    data () {
      return {
        confirmbet:true,
        modal: false,
        rangleType: '六合彩',
        oddsList: '',
        animaList: '',
        checkList: [],
        disabledCheckBox: false,
        totalCount: {
          number: 0,
          total: 0
        },
        saveSelectMoney: {
          money: ''
        },
        selectFast: {
          list: [
            {price: 10, active: false},
            {price: 20, active: false},
            {price: 50, active: false},
            {price: 100, active: false},
            {price: 500, active: false},
            {price: 1000, active: false}
          ],
          select: ''
        },
        submitList: [],
        navigation: {
          navSelect: '二尾连中',
          list: [
            {title: '二尾连中'},
            {title: '三尾连中'},
            {title: '四尾连中'},
            {title: '二尾连不中'},
            {title: '三尾连不中'},
            {title: '四尾连不中'}
          ]
        },
        listTop: [
          {
            title: '尾数连', checkbox: '',
            mess: [
              {
                list: [
                  { ball: '01', color: '' },
                  { ball: '11', color: '' },
                  { ball: '21', color: '' },
                  { ball: '31', color: '' },
                  { ball: '41', color: '' }
                ],
                code: '', title: '尾数连', ball: '1尾', id: '尾数连01', model: '', price: '0.0', active: false
              },
              {
                list: [
                  { ball: '02', color: '' },
                  { ball: '12', color: '' },
                  { ball: '22', color: '' },
                  { ball: '32', color: '' },
                  { ball: '42', color: '' }
                ],
                code: '', title: '尾数连', ball: '2尾', id: '尾数连02', model: '', price: '0.0', active: false
              },
              {
                list: [
                  { ball: '03', color: '' },
                  { ball: '13', color: '' },
                  { ball: '23', color: '' },
                  { ball: '33', color: '' },
                  { ball: '43', color: '' }
                ],
                code: '', title: '尾数连', ball: '3尾', id: '尾数连03', model: '', price: '0.0', active: false
              },
              {
                list: [
                  { ball: '04', color: '' },
                  { ball: '14', color: '' },
                  { ball: '24', color: '' },
                  { ball: '34', color: '' },
                  { ball: '44', color: '' }
                ],
                code: '', title: '尾数连', ball: '4尾', id: '尾数连04', model: '', price: '0.0', active: false
              },
              {
                list: [
                  { ball: '05', color: '' },
                  { ball: '15', color: '' },
                  { ball: '25', color: '' },
                  { ball: '35', color: '' },
                  { ball: '45', color: '' }
                ],
                code: '', title: '尾数连', ball: '5尾', id: '尾数连05', model: '', price: '0.0', active: false
              }
            ]
          },
          {
            title: '尾数连', checkbox: '',
            mess: [
              {
                list: [
                  { ball: '06', color: '' },
                  { ball: '16', color: '' },
                  { ball: '26', color: '' },
                  { ball: '36', color: '' },
                  { ball: '46', color: '' }
                ],
                code: '', title: '尾数连', ball: '6尾', id: '尾数连06', model: '', price: '0.0', active: false
              },
              {
                list: [
                  { ball: '07', color: '' },
                  { ball: '17', color: '' },
                  { ball: '27', color: '' },
                  { ball: '37', color: '' },
                  { ball: '47', color: '' }
                ],
                code: '', title: '尾数连', ball: '7尾', id: '尾数连07', model: '', price: '0.0', active: false
              },
              {
                list: [
                  { ball: '08', color: '' },
                  { ball: '18', color: '' },
                  { ball: '28', color: '' },
                  { ball: '38', color: '' },
                  { ball: '48', color: '' }
                ],
                code: '', title: '尾数连', ball: '8尾', id: '尾数连08', model: '', price: '0.0', active: false
              },
              {
                list: [
                  { ball: '09', color: '' },
                  { ball: '19', color: '' },
                  { ball: '29', color: '' },
                  { ball: '39', color: '' },
                  { ball: '49', color: '' }
                ],
                code: '', title: '尾数连', ball: '9尾', id: '尾数连09', model: '', price: '0.0', active: false
              },
              {
                list: [
                  { ball: '10', color: '' },
                  { ball: '20', color: '' },
                  { ball: '30', color: '' },
                  { ball: '40', color: '' }
                ],
                code: '', title: '尾数连', ball: '0尾', id: '尾数连10', model: '', price: '0.0', active: false
              }
            ]
          }
        ]
      }
    },
    methods: {
      //切换合肖方式
      navSelectFc (item) {
        this.navigation.navSelect = item.title
        this.checkList = []
        this.resetAll()
        this.getOdds()
      },
      // 点击选外面选中
      cbClick (datasOut, datasInt,$event) {
         if(!this.isopen){
          // alert("封盘了")
          return false;
        }

        if (!this.checkList.length) {
          datasInt.active = true
          this.checkList.push(datasInt)
        } else {
          //先去掉点击一样的
          datasInt.active = !datasInt.active
          let staue = true
          this.checkList.forEach((item, v) => {
            if (item.id == datasInt.id) {
              this.checkList.splice(v, 1)
              staue = false
              this.calculationTotal()
            }
          })
          if (!staue) return false
          if (datasInt.active) {
            this.checkList.push(datasInt)
            this.palert(datasInt,$event)
            this.calculationTotal()
          }
        }
      },
            // 提示框
      palert(datasInt,$event){
        if (this.navigation.navSelect == '二尾连中' || this.navigation.navSelect == '二尾连不中') {
          if (this.checkList.length > 2) {
            this.$store.commit('alert/showTipModel', {
              bool: true,
              title: '不能超过2个尾数!!',
              model: 'warn'
            })
            this.checkList.splice(2, 1)
            datasInt.active=!datasInt.active;
            return false
          }
        }
        if (this.navigation.navSelect == '三尾连中' || this.navigation.navSelect == '三尾连不中') {
          if (this.checkList.length > 3) {
            this.$store.commit('alert/showTipModel', {
              bool: true,
              title: '不能超过3个尾数!!',
              model: 'warn'
            })
            this.checkList.splice(3, 1)
            datasInt.active=!datasInt.active;
            return false
          }
        }
        if (this.navigation.navSelect == '四尾连中' || this.navigation.navSelect == '四尾连不中') {
          if (this.checkList.length > 4) {
            this.$store.commit('alert/showTipModel', {
              bool: true,
              title: '不能超过4个尾数!!',
              model: 'warn'
            })
            this.checkList.splice(4, 1)
            datasInt.active=!datasInt.active;
            return false
          }
        }



        // 公共加选中为了后面提交验证
        // this.listTop.forEach((outItem, v) => {
        //   outItem.mess &&
        //   outItem.mess.forEach((inItem, v) => {
        //     if (inItem.ball == datasInt.ball) {
        //       inItem.active = $event
        //     }
        //     // if(this.saveSelectMoney.money&&inItem.active){
        //     //      inItem.model=this.saveSelectMoney.money;
        //     // }
        //   })
        // })



        this.calculationTotal()
      },




      // 选中取消checkbox
      checkboxChange ($event, datas) {
        this.listTop.forEach((outItem, v) => {
          outItem.mess &&
          outItem.mess.forEach((inItem, v) => {
            if (inItem.ball == datas.ball) {
              inItem.active = $event
            }
          })
        })
        this.calculationTotal()
      },
      //快速替换填金额
      fastInput (type) {
        if (!this.isopen) return false
        this.calculationTotal()
      },
      //计算全部金额
      calculationTotal () {
        // 计算总数
        let number = 0
        let total = 0
        if (
          this.navigation.navSelect == '二尾连中' ||
          this.navigation.navSelect == '二肖尾不中'
        ) {
          this.listTop.forEach((outItem, v) => {
            outItem.mess &&
            outItem.mess.forEach((inItem, v) => {
              if (inItem.active) {
                number += 1
              }
            })
          })
          let save = number * (number - 1)
          save > 1 ? (number = save / 2) : (number = 0)
          if (this.saveSelectMoney.money) {
            total = number * +this.saveSelectMoney.money
          }
        }
        if (
          this.navigation.navSelect == '三尾连中' ||
          this.navigation.navSelect == '三肖尾不中'
        ) {
          this.listTop.forEach((outItem, v) => {
            outItem.mess &&
            outItem.mess.forEach((inItem, v) => {
              if (inItem.active) {
                number += 1
              }
            })
          })
          let save = number * (number - 1) * (number - 2)
          save >= 6 ? (number = save / 6) : (number = 0)
          if (this.saveSelectMoney.money) {
            total = number * +this.saveSelectMoney.money
          }
        }
        if (
          this.navigation.navSelect == '四尾连中' ||
          this.navigation.navSelect == '四尾连不中'
        ) {
          this.listTop.forEach((outItem, v) => {
            outItem.mess &&
            outItem.mess.forEach((inItem, v) => {
              if (inItem.active) {
                number += 1
              }
            })
          })
          let save = number * (number - 1) * (number - 2) * (number - 3)
          save >= 24 ? (number = save / 24) : (number = 0)
          if (this.saveSelectMoney.money) {
            total = number * +this.saveSelectMoney.money
          }
        }
        this.totalCount.number = number
        this.totalCount.total = total
      },
      //获取赔率信息
      async getOdds () {
        if (!this.oddsList) {
          this.oddsList = this.oddsListPar
          this.oddsBelong()
        } else {
          this.oddsBelong()
        }
      },
      //分发赔率
      async oddsBelong () {
        this.listTop.forEach((outItem, v) => {
          outItem.mess &&
          outItem.mess.forEach((inItem, v) => {
            let numString = ''
            if (this.navigation.navSelect == '二尾连中') {
              numString = '20254'
              inItem.title = '二尾连中'
            }
            if (this.navigation.navSelect == '三尾连中') {
              numString = '20255'
              inItem.title = '三尾连中'
            }
            if (this.navigation.navSelect == '四尾连中') {
              numString = '20256'
              inItem.title = '四尾连中'
            }
            if (this.navigation.navSelect == '二尾连不中') {
              numString = '20257'
              inItem.title = '二尾连不中'
            }
            if (this.navigation.navSelect == '三尾连不中') {
              numString = '20258'
              inItem.title = '三尾连不中'
            }
            if (this.navigation.navSelect == '四尾连不中') {
              numString = '20259'
              inItem.title = '四尾连不中'
            }
            //   保存提交code
            inItem.code = numString
            inItem.price = this.oddsList[
            '' + numString + '_' + inItem.ball + ''
              ].odds
            inItem.fsrate = this.oddsList[
            '' + numString + '_' + inItem.ball + ''
              ].fsrate
          })
        })
      },

      //分发生肖颜色
      animCorBelong () {
        let red = [
          1,
          7,
          13,
          19,
          23,
          29,
          35,
          45,
          2,
          8,
          12,
          18,
          24,
          30,
          34,
          40,
          46
        ]
        let blue = [3, 9, 15, 25, 31, 37, 41, 47, 4, 10, 14, 20, 26, 36, 42, 48]
        let green = [
          5,
          11,
          17,
          21,
          27,
          33,
          39,
          43,
          6,
          16,
          22,
          28,
          32,
          38,
          44,
          49
        ]
        this.listTop.forEach(outItem => {
          outItem &&
          outItem.mess.forEach(innerItem => {
            innerItem.list.forEach(thirdItem => {
              if (red.includes(+thirdItem.ball)) {
                thirdItem.color = '#BC2A1B'
              }
              if (blue.includes(+thirdItem.ball)) {
                thirdItem.color = '#1C8CE2'
              }
              if (green.includes(+thirdItem.ball)) {
                thirdItem.color = '#49BB27'
              }
            })
          })
        })
      },
      // 该变赔率和返水
      rangeChange () {},
      // 重置所有信息
      resetAll () {
        this.listTop.forEach((outItem, v) => {
          outItem.checkbox = ''
          outItem.mess &&
          outItem.mess.forEach((inItem, v) => {
            inItem.active = false
            inItem.model = ''
          })
        })
        //清空提交
        this.submitList = [] //提交清空
        this.checkList = []
        this.selectFast.list.forEach((item, v) => {
          item.active = false
        })
        this.totalCount.number = 0
        this.totalCount.total = 0
        this.saveSelectMoney.money = '' //清空输入钱
        this.seletPriceStaue = ''
      },
      // 提交前检查，展示
      review () {
        if (!this.isopen) return false
        if (!this.saveSelectMoney.money) {
          // this.$error('请选择下注金额')
          this.$store.commit('alert/showTipModel', {
            bool: true,
            title: '请选择下注金额!!',
            model: 'warn'
          })
          return false
        }
        if (
          (this.navigation.navSelect == '二尾连中' &&
            this.checkList.length < 2) ||
          (this.navigation.navSelect == '二尾连不中' && this.checkList.length < 2)
        ) {
          this.$store.commit('alert/showTipModel', {
            bool: true,
            title: '至少选2个尾!!',
            model: 'warn'
          })
          return false
        }
        if (
          (this.navigation.navSelect == '三尾连中' &&
            this.checkList.length < 3) ||
          (this.navigation.navSelect == '三尾连不中' && this.checkList.length < 3)
        ) {
          this.$store.commit('alert/showTipModel', {
            bool: true,
            title: '至少选3个尾!!',
            model: 'warn'
          })
          return false
        }
        if (
          (this.navigation.navSelect == '四尾连中' &&
            this.checkList.length < 4) ||
          (this.navigation.navSelect == '四尾连不中' && this.checkList.length < 4)
        ) {
          this.$store.commit('alert/showTipModel', {
            bool: true,
            title: '至少选4个尾!!',
            model: 'warn'
          })
          return false
        }

        let ballString = ''
        let minPrice = 0
        this.submitList = []
        let pricelist = []
        this.listTop.forEach((outItem, v) => {
          outItem.mess &&
          outItem.mess.forEach((inItem, v) => {
            if (inItem.active) {
              pricelist.push(+inItem.price)
              this.submitList.push(inItem)
              ballString += inItem.ball + ',';
              // +inItem.price > minPrice
              //   ? (minPrice = +inItem.price)
              //   : (minPrice = minPrice)
            }
          })
        })
        minPrice=Math.min.apply(null, pricelist);
        // if (+this.saveSelectMoney.money < 10) {
        //   this.$store.commit("alert/showTipModel", {
        //     bool: true,
        //     title: "下注金额不可小於最低限度:10!!",
        //     model: "warn"
        //   });
        //   return false;
        // }

        if (this.submitList.length) {
          this.modal = true
        } else {
          this.$store.commit('alert/showTipModel', {
            bool: true,
            title: '请选择并输金额!',
            model: 'warn'
          })
          return false
        }
        this.$refs.betting.getList(
          [
            {
              title: this.navigation.navSelect,
              ball: ballString.substring(0, ballString.length - 1),
              model: this.saveSelectMoney.money,
              price: minPrice
            }
          ],
          this.totalCount,
          this.childNeedMess
        )
      },
      // 封盘
      disabled () {
        this.$nextTick(() => {
          for (let i = 0; 0 < this.$refs.formDynamic.length; i++) {
            if (i == this.$refs.formDynamic.length - 1) return false
            this.$refs.formDynamic[i].setAttribute('disabled', true)
            this.$refs.formDynamic[i].style.cursor = 'not-allowed'
          }
        })
        this.modal = false
        this.disabledCheckBox = true
        this.resetAll()
      },
      // 开盘
      abled () {
        this.$nextTick(() => {
          for (let i = 0; 0 < this.$refs.formDynamic.length; i++) {
            if (i == this.$refs.formDynamic.length - 1) return false
            this.$refs.formDynamic[i].removeAttribute('disabled', false)
            this.$refs.formDynamic[i].style.cursor = 'text'
          }
        })
        this.disabledCheckBox = false
      },
      //正式提交
      async submit () {
        if (!this.isopen) return false
         let {showerr,showbalance}=this.$refs.betting
        if(this.$refs.betting.submitList.length==0){
           this.dNotify('请选择并输金额!', 'error')
           return false
        }
        let isLottery=this.$refs.betting.submitList.every(function(item){
             return item.active==false
        })
        let isModel = this.$refs.betting.submitList.some(function(item){
               if(item.active){
                   return  +item.model<1 
               }
        })
        if(isLottery||isModel){
            this.dNotify('请选择并输金额!', 'error')
            return false
        }
         if(!showerr){
          if(showbalance){
              this.dNotify('注单总额超出余额 请调整注单金额再下注', 'error')
              return false
          }else{
              let {lotteryBetMax,lotteryBetMin}=JSON.parse(localStorage.config).limit
              let message="超出单注限额！单注最高:"+lotteryBetMax +"单注最低:"+lotteryBetMin
              this.dNotify(message, 'error')
              return false
          }
        }
        let submitArr = []
        this.submitList.forEach(item => {
          let finalModel = this.$refs.betting.submitList[0].model
          submitArr.push({
            code: item.ball,
            playway: item.code,
            odds: +item.price,
            money: finalModel,
            ball: item.title,
            attach: ''
          })
        })
        if (!localStorage.token) {
          this.dNotify('您未登录', 'error')
          // this.$store.commit("alert/showLogin", true);
          return false
        }
        if(!this.confirmbet){
        this.dNotify('请勿重复投注', 'error')
        return false
      }
        this.confirmbet=false
        let res = await this.$http.post(`${this.$HOST_NAME}/lottery/submit`, {
          lotteryId: this.$route.meta.id,
          issue: this.childNeedMess.issue,
          code: JSON.stringify(submitArr),
          rebate: this.rebate
        })
        if (res && res.code == 200) {
          this.modal=false
          this.confirmbet=true
          this.dNotify(res.data, 'success')
          this.resetAll()
          UserService.vpGetBasicInfo.call(this)
        } else {
          this.confirmbet=true
          this.dNotify(res.message, 'error')
        }
      },
      //发送走势数据
      getTrend (trend) {
        // this.$nextTick(()=>{
        //     this.$refs['vpHistory'].getData(trend.list);
        // })
      }
    },
    // 听封盘
    watch: {
      isopen (isopen) {
        if (isopen) {
          this.abled()
        } else {
          this.disabled()
        }
      },
      oddsListPar: {
        handler: function (val, oldVal) {
          this.getOdds()
        },
        deep: true
      },
       modal(newval,oldval){
        if(newval==false&&oldval==true){
            this.calculationTotal()
        }
      }
    },
    created: function () {
      if (this.isopen) {
        this.abled()
      } else {
        this.disabled()
      }
      this.animCorBelong()
      if (JSON.stringify(this.oddsListPar) != '{}') {
        this.getOdds()
      }
    },
    mounted () {},
    components: {
      vpBetting,
      vpFastAndSubmit,
      vpHistory
    },
    store
  }
</script>
<style lang="less" scoped>
  @import "../../../../../../assets/less/public/var.less";
  /deep/ .ivu-modal{
     margin:0
  }

  .inputBox{
    width: 15px;
    height: 15px;
    // background-color: red;
    background: url(/static/public/image/lottery/input1.png);
    background-size: 100% 100%;
    position: relative;
    float:left;
    cursor: pointer;
    margin-top: 9px;
    margin-right:20px;
    input{
      vertical-align: middle;
      /* display: inline-block; */
      position: absolute;
      width: 16px;
      height: 16px;
      z-index: -1;
    }
    &:hover{
      border:1px solid rgba(188,42,27);
      border-radius: 2px;
    }
  }
  .checkedInp{
    background: url(/static/public/image/lottery/input2.png);
    background-size: 100% 100%;
  }
  .disabledInp{
    background: url(/static/public/image/lottery/input3.png);
    background-size: 100% 100%;
    cursor:not-allowed;
    input{
      cursor:not-allowed;
    }
  }





  .lottery-content-all-wrap {
    padding: 20px 0 20px 25px;
    display: flex;

    .lottery-content-all-left {
      width: @container-left-width;
      float: left;

      .he-xiao-header-wrap {
        width: 100%;
        height: 48px;
        border: 1px solid @theme-border-color;
        padding: 10px 48px;

        .he-xiao-header-item {
          float: left;
          margin-right: 29px;

          span {
            font-size: 14px;
            line-height: 24px;
            cursor: pointer;
            padding: 6px 11px;
            color: #888888;
            border-radius: 2px;

            &.active {
              background: #0093d9;
              color: #fff;
            }
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .alignItems {
        display: flex;
        align-items: stretch;
      }

      .decial-1 {
        &-item {
          border: 1px solid @theme-border-color;
          border-left: 0;
          width: 50%;
          float: left;

          &:last-child {
            border-right: 1px solid @theme-border-color;
          }

          &:first-child {
            border-left: 1px solid @theme-border-color;
          }

          .all-item {
            padding-top: 5px;
            padding-bottom: 5px;

            .box {
              cursor: pointer;
              padding: 10px 0 10px 45px;
              text-align: center;
              position: relative;
              line-height: 32px;
              width: 100%;

              .theBall {
                width: 47px;
                height: 34px;
                font-size: 18px;
                float: left;
                letter-spacing: 2px;
                display: inline-block;
                background: #f8f5f5;
                line-height: 34px;
                text-align: center;
                color: #666666;
                border: 1px solid #ececec;
                margin-right: 18px;
                border-radius: 16px;

                &.active {
                  // background: #FF5C5C;
                  // color: #fff;
                }
              }

              .price {
                color: #888;
                line-height: 32px;
                font-size: 16px;
                margin-right: 18px;
                float: left;
                min-width: 32px;

                &.active {
                  // color: #FF5C5C;
                  // opacity: 1;
                }
              }

              .el-checkbox {
                float: left;
                margin-right: 25px;
              }

              .number {
                float: left;
                width: 32px;
                height: 32px;
                text-align: center;
                border-radius: 50%;
                margin-left: 10px;
                color: #fff;
                font-size: 18px;
                border: 1px solid #ececec;
              }

              &:first-child {
                padding-top: 15px;
              }

              &:last-child {
                padding-bottom: 15px;
              }
            }
          }
        }
      }
    }

    .lottery-content-all-right {
      width: @container-right-width;
      float: left;
      padding: 10px 0 0 30px;
    }
  }
</style>
