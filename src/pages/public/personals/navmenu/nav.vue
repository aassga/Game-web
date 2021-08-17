<template>
    <div :class="is_agency==1 ? 'message' : 'message1'">
        <ul v-if="$store.state.personal.contentView!='recharge'" :class="$store.state.personal.contentView=='personage'? 'perul':''">
            <li v-for="(item,i) in allList" :key="i" :class="{liActive:i==$store.state.personal.navView}" @click="toggle(i)">
                <span>{{item.name}}</span>
                <div class="showMessg" v-if="$store.state.personal.contentView=='message' && item.message>0">{{item.message}}</div>
            </li>
        </ul>
        <ul v-else>
            <li v-for="(item,i) in allList" :key="i" :class="{liActive:i==$store.state.personal.navView}" @click="toggle2(i,item)">
                <span>{{item.className}}</span>
                <img :src="staticURL+item.labelIcon" alt="" class="iconImg" v-show="item.labelStatus=='on'">
            </li> 
        </ul>
    </div>
</template>

<script>
import store from '@/vuex/store';
export default {
    data() {
        return {
            staticURL:JSON.parse(localStorage.config).statics,
            signData:{},
            allList: [],
            agencyList: [
                { name: '我的收益' },
                { name: '代理报表' },
                { name: '下级报表' },
                { name: '下级开户' },
                { name: '下级列表' },
                { name: '下级财务' },
                { name: '下级人数' }
            ],
            borrowMoneyList:[
                {name:"免息借呗"},
                {name:"我要借款"},
                {name:"我要还款"},
                {name:"借呗额度"},
                {name:"借呗记录"},
            ],
            discountsList: [{ name: '时时返水' }],
            messageList: [{ name: '系统信息', message: '' }, { name: '投诉建议' }, { name: '已发信息', message: '' }],
            personageList: [
                { name: '个人报表' },
                { name: '我的资料' },
                { name: '投注记录' },
                { name: '存款记录' },
                { name: '取款记录' },
                { name: '优惠记录' },
                { name: '代理记录' },
                { name: '其它记录' },
                { name: '帐号安全' }
            ],
            withdrawList: [{ name: '银行卡提款' },{ name: 'USDT提款' }, { name: '绑定银行卡' }, { name: '绑定USDT' },  { name: '提款记录' }],
            is_agency: JSON.parse(localStorage.userinfo).is_agency,
            personal_commission_mode: localStorage.personal_mode,
            withManualdeposit: false
        };
    },
    methods: {
        sortNum(arr) {
            for (var i = 0; i <= arr.length; i++) {
                let oNum = arr[i];
                if (arr[i] > arr[i + 1]) {
                    arr[i] = arr[i + 1];
                    arr[i + 1] = oNum;
                }
            }
            return arr;
        },
        sortNum1(a, b) {
            return a - b;
        },
        onShowSignin() {
            if(this.$store.state.mainState.isGet) {
                
               this.$error('今日已领取,请明日再来')
            }else {
               this.getSignin()
            }
        },
        getSignin() {
            this.$store.dispatch('home/getSignin', {
            type: 'DailySignInList',
            }).then(res => {
            this.signData = res
            this.$store.commit("mainState/signData", res);
            if(this.signData.dailySignIn.gift_money_receive === 'yes') {
                this.$store.commit("mainState/isGet", true);
                this.$error('今日已领取,请明日再来')
            }else {
                if(this.signData.weilingqu === 'yes') {
                  this.$store.commit("mainState/isOpen", true);
                  this.$store.commit("mainState/signMoney", this.signData.dailySignIn.gift_money);
                }
                if(this.signData.msg_tankuang) {
                  if(this.signData.msg_tankuang.includes('绑定银行卡')){
                     this.$error(this.signData.msg_tankuang,2000,true)
                  }else{
                     this.$error(this.signData.msg_tankuang)
                  }
                }else {
                  this.$store.commit("mainState/showDialog", true);
                  this.$store.commit("mainState/signMoney", this.signData.dailySignIn.gift_money);
                }
            }
            }).catch(() => {
            })
        },
        newShowSignin() {
            if(!this.$store.state.mainState.isShowSignin) {
            this.$store.dispatch('home/getSignin', {
                type: 'display',
            }).then( res=>{
                this.$store.commit("mainState/changShowSignin", res.display);
                this.discountsList= [{ name: '时时返水' }]
                this.discountsList.push({ name:'每日签到'})
              })
            }else{
                if(this.$store.state.mainState.isShowSignin=='yes'){
                     this.discountsList= [{ name: '时时返水' }]
                     this.discountsList.push({ name:'每日签到'})
                }
            }
        },
        toggle(i) {
            if (this.contentView == 'agency' && i == 7) {
                window.open('#/agent');
            }else if(this.contentView == 'discounts' && i==1){
                this.onShowSignin()
            } else {
                this.$store.commit('showNav', { child: i });
            }
        },
        async getLogContent(){
            let val = await this.$http.post(`${this.$HOST_NAME}/getPaymentMsgImg`);
            if( val.code==200&&val.data.msg){
                this.$store.state.personal.showRecharge = true;
                this.$store.state.personal.rechargeText = val.data;
                let msg = this.$store.state.personal.rechargeText.msg;
                msg = msg.replace('{payTypeText}', `<span style='color:#058dd7'>${this.$store.state.personal.rechargeText.payTypeText}</span>`);
                msg = msg.replace('{preferentialText}', `<span style='color:#d06901'>${this.$store.state.personal.rechargeText.preferentialText}</span>`);
                msg = msg.replace('{giftMoreText}', `<span style='color:#c21358'>${this.$store.state.personal.rechargeText.giftMoreText}</span>`);
                this.$store.state.personal.rechargeText['msg'] = msg
                this.$store.state.personal.rechargeMsg = this.$store.state.personal.rechargeText['msg'];  
            }
        },
        toggle2(i, item) {
            if (item.classType =='payment'&& this.$websiteName && (['hqyl', 'klk', '478qp', 'blr', 'bet365', 'mgm', 'pjdc', 'qygj', 'tycjt', 'vnso', 'vnst', 'jsyl', 'xpj'].includes(this.$websiteName))) {
                this.getLogContent();
            }
            let onlineId = item.id;
            this.liActive = i;
            if (item.classType=='bank'||item.classType=='paymentServiceLink') {
                this.$store.commit('showContent', { parent: 'recharge' });
                this.$store.commit('showNav', { child: i });
                this.$store.commit('payment', item);
            } else {
                this.$store.commit('showContent', { parent: 'recharge' });
                this.$store.commit('showNav', { child: i });
                this.$store.commit('payment', item);
                let postUrl = '';
                if (item.classType == 'qr_code') {
                    postUrl = '/deposit/qr_code';
                }else if(item.classType =='transfer_bank' || item.classType =='transfer_account'){
                    postUrl = '/deposit/bank';
                }else if(item.classType=='virtual'){
                    postUrl = '/deposit/usdtList';
                }else{
                    postUrl = '/deposit/online';
                }
                let parmers={}
                if(item.classType =='transfer_bank' || item.classType =='transfer_account') parmers={ classId: item.id, devices: 'pc'}
                else if(item.classType=='virtual')  parmers={device: 'pc',classId: item.id}
                else parmers={categoryId: item.id, devices: 'pc'}
                this.$http
                    .post(`${this.$HOST_NAME + postUrl}`,parmers)
                    .then(res => {
                        if (res.code == 200) {
                            res.data.forEach(v => {
                                if (v.bankCode && v.bankCode !== 'null') {
                                    v.bankCode = JSON.parse(v.bankCode);
                                    v.codeShow = true;
                                } else {
                                    v.codeShow = false;
                                }
                            });

                            if (postUrl == '/deposit/online') {
                                let isFormatAmount = '';
                                if (res.data.length > 0) {
                                    // 存在支付方式，才处理
                                    res.data.forEach((item, index) => {
                                        if (item.formatAmount) {
                                            // 存在，需要用到下拉框
                                            // 还需要处理数据
                                            item.priceList = item.formatAmount && item.formatAmount.split(',').sort(this.sortNum1);
                                            item.isFormatAmount = true;
                                        } else {
                                            // 不需要用到下拉框
                                            item.isFormatAmount = false;
                                            item.quick_amount_list=[]
                                            if(item.quick_amount){
                                                if(item.quick_amount.indexOf(',')==-1) item.quick_amount_list[0]= item.quick_amount
                                                else item.quick_amount_list=item.quick_amount.split(',').splice(0,8)
                                            }else{
                                                item.quick_amount_list=[50,100,500,1000,5000]  
                                            } 
                                        }
                                    });
                                }
                            }
                            if(item.classType=='virtual'){
                                 this.$store.commit('usdtData', res.data);
                            }else{
                                 this.$store.commit('paymentDataFc', res.data);
                            }
                        }
                    });
                this.$store.commit('refresh', 1);
            }
        },
        payCategory() {
            if (this.$store.state.personal.contentView != 'recharge') {
                this.allList = this[this.contentView + 'List'];
                if (this.contentView == 'agency') {
                    if (this.personal_commission_mode == 'mode_b') {
                        if (this.$websiteName == 'xpj' && this.allList.indexOf('佣金条款') <= -1) {
                            this.allList.push('佣金条款');
                        }
                    }
                }
                
                
            } else {
                this.getNavDatas();
                if (this.contentView == 'recharge') {
                }
            }
        },
        getNavDatas() {
            this.allList = [];
            this.$http.post(`${this.$HOST_NAME}/deposit/payment/category`, { devices: 'pc' }).then(res => {
                if (res.code == 200) {
                    this.allList = res.data;                    
                    if (this.allList.length > 10) {
                        this.allList = this.allList.splice(0, 10);
                    }
                    if (this.contentView == 'recharge') {
                        this.$store.commit('payment', this.allList[0]);
                        this.$store.commit('paymentAll',this.allList);
                        if (this.$store.state.personal.navView != 0) this.toggle2(1, this.allList[1]);
                        else this.toggle2(0, this.allList[0]);
                    }
                }
            });
        },
    },
    created() {
        this.newShowSignin()
        this.$store.commit("mainState/isGet", false);
        this.payCategory();
        this.messageList[0].message = this.showMessage.systemUnReadCount;
        this.messageList[2].message = this.showMessage.replyUnReadCount;
    },
    components:{
    },
    computed: {
        contentView() {
            return this.$store.state.personal.contentView;
        },
        showMessage() {
            return this.$store.state.mainState.showMessage;
        },
        usdtWithdrawalsRate(){
            return this.$store.state.home.usdtWithdrawalsRate
        }
    },
    watch: {
        contentView: {
            handler: function(val, oldVal) {
                this.payCategory();
            },
            deep: true
        },
        showMessage: {
            handler: function(newval, oldVal) {
                this.messageList[0].message = this.showMessage.systemUnReadCount;
                this.messageList[2].message = this.showMessage.replyUnReadCount;
            },
            deep: true
        },
        usdtWithdrawalsRate:{
            handler:function(val){
                if(val&&val!== '0'){
                    this.withdrawList=[{ name: '银行卡提款' },{ name: 'USDT提款' }, { name: '绑定银行卡' }, { name: '绑定USDT' },  { name: '提款记录' }]
                }else{
                    this.withdrawList=[{ name: '银行卡提款' }, { name: '绑定银行卡' },{ name: '提款记录' }]
                }
            },
            deep:true,
            immediate:true
        }
    },
    store
};
</script>

<style lang="less" scoped>
.message {
    color: #fff;
    font-weight: 200;
    ul {
        li {
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 1.6em;
            cursor: pointer;
            position: relative;
            span {
                padding: 8px 18px;
                border-radius: 10px;
                font-family: 'Microsoft YaHei';
                font-weight: 400;
            }
            .showMessg {
                color: #d12323;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #fff;
                position: absolute;
                right: 25px;
                top: -4px;
                line-height: 20px;
                text-align: center;
                display: block;
            }
            .iconImg{
                display: block;
                position: absolute;
                width: 54px;
                height: 22px;
                right: 4px;
                top:-4px;
            }
        }
        .liActive {
            span {
                background-color: #d12323;
            }
        }
    }
}
.message1 {
    color: #fff;
    font-weight: 200;
    ul {
        .ull {
            li:nth-child(5) {
                display: none;
            }
        }
        li {
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 1.6em;
            position: relative;
            cursor: pointer;
            span {
                padding: 8px 18px;
                border-radius: 10px;
                font-family: 'Microsoft YaHei';
                font-weight: 400;
            }
        }
        // li:nth-child(5){
        //   display:none;
        // }
        .showMessg {
            color: #d12323;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #fff;
            position: absolute;
            right: 25px;
            top: -4px;
            line-height: 20px;
            text-align: center;
            display: block;
        }
        .iconImg{
            display: block;
            position: absolute;
            width: 54px;
            height: 22px;
            right: 4px;
            top:-4px;
        }
        .liActive {
            span {
                background-color: #d12323;
            }
        }
    }
    .perul {
        li:nth-child(7) {
            display: none;
        }
    }
}

</style>
