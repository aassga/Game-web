<template>
    <div class="internerBank">
        <!-- 头部 -->
        <div class="header">
            <ul>
                <li>
                    <img src="/static/public/image/userImg/wangyin-pay@3x.png" alt="">
                    <span>人工入款</span>
                </li>
            </ul>
        </div>

        <div v-if="hasServiceInfo">
            <!-- 警告信息 -->
            <div class="warning-wrap" v-if="this.$store.state.mainState.flag">
                <div class="warning">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-user-sound"></use>
                    </svg>
                    <span>{{notice}}</span>
                </div>
            </div>
            <div class="userListContianer">
                <div class="userTitle"><img src="/static/public/image/userImg/title.png" width="100%"></div>
                <div class="userList">
                    <ul>
                        <li v-for="(v,i) in serviceData" :key="i">
                            <div class="userPhoto"><img :src="v.headImg" width="119px"></div>
                            <div class="userName">
                                <span>{{v.nickname | getName}}</span>
                                <span><img v-for="(j,i) in serviceStar" :key="i" :src="j" width="23px"></span>
                                <span>该通道支持<a @click="toggle2(v.nickname)" >{{v.nickname | getName1}}充值</a></span>
                            </div>
                            <div class="manualBtn">
                                <a @click="toKefu(v.aisleId)"><img src="/static/public/image/userImg/btn.png" width="129px"></a>
                            </div>
                            <span class="discount">惠1%</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 内容 -->
            <!-- <div class="content_manual">
                <ul class="serviceContainer">
                    <li class="serviceItem" v-for="item in serviceData" :key="item.id">
                        <i class="workerIcon">
                            <img class="icon_ico" :src="item.headImg" alt="">
                            <img v-if="parseFloat(item.rank) > 4.5" src="/static/public/image/userImg/hot.png" alt="" class="hot">
                            <img v-else src="/static/public/image/userImg/recommend.png" alt="" class="hot">
                        </i>
                        <div class="workerInfo">
                            <div class="baseInfo">
                                <span class="name">{{item.username}}</span>
                                <span class="dealNo">成交单量: {{item.orderCount}}</span>
                            </div>
                            <div class="stars">
                                <i class="star" />
                                <i class="star" />
                                <i class="star" />
                                <i class="star" />
                                <i v-if="parseFloat(item.rank) > 4.5" class="star" />
                                <i v-else class="halt_star" />
                                <span class="score">{{item.rank}}</span>
                            </div>
                            <div class="paymentWays">
                                <i class="union_pay" />
                                <i class="alipay" />
                                <i class="wechat_pay" />
                            </div>
                        </div>
                        <span class="rechargeBtn" @click="toKefu(item.customerUuid)">充值</span>
                    </li>
                </ul>
            </div> -->
        </div>

        <div v-else class="noService">
            <span>暂无人工入款客服!</span>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store';
import UserService from '@/service/public/UserService.js';
import axios from 'axios';

export default {
    data() {
        return {
            notice: '公司银行帐号随时更换! 请每次存款都至 [汇款提交] 进行操作。 入款至已过期帐号，公司无法查收，恕不负责!', //顶部公告
            serviceData: [],
            hasServiceInfo: false,
            link: '',
            allList:[],
            serviceStar:["/static/public/image/userImg/star.png","/static/public/image/userImg/star.png","/static/public/image/userImg/star.png","/static/public/image/userImg/star.png","/static/public/image/userImg/star.png"]
        };
    },
    methods: {
        //获取客服连接和token
        getKefuLink() {
            this.$http.post(`${this.$HOST_NAME}/paymentServiceLink`, { port: 1, siteId:JSON.parse(localStorage.config).siteId,hierarchyId:JSON.parse(localStorage.userinfo).agencyInfo.levelId}).then(res => {
                if (res.code == 200) {
                    this.link = res.data.link;
                    this.getServiceList(res.data.token);
                }
            });
        },
        // 获取侧边栏数据
        getNavDatas() {
            this.$http.post(`${this.$HOST_NAME}/deposit/payment/category`, { devices: 'pc' }).then(res => {
                if (res.code == 200) {
                    this.allList = res.data;
                }
            });
            
        },
        // 跳转支付
        toggle2(name) {
            let goName = name.split('-')[0];
            let thisA = [];
            let index = 0;
            for (let i = 0; i < this.allList.length; i++) {
                switch (goName) {
                    case "支付宝":
                        if(this.allList[i].className == '支付宝转卡'){
                            thisA = this.allList[i]
                        }
                        index = 2;
                        break;
                    case "微信":
                        if(this.allList[i].className == '微信转账'){
                            thisA = this.allList[i]
                        }
                        index = 4;
                        break;
                    case "网银":
                        if(this.allList[i].className == '网银转账'){
                            thisA = this.allList[i]
                        }
                        index = 0;
                        break;
                    case "云闪付":
                        if(this.allList[i].className == '银联支付'){
                            thisA = this.allList[i]
                        }
                        index = 6;
                        break;
                }
            }
            
            if (thisA.classType=='bank'||thisA.classType=='paymentServiceLink') {
                this.$store.commit('showContent', { parent: 'recharge' });
                this.$store.commit('showNav', { child: index });
                this.$store.commit('payment', thisA);
            } else {
                this.$store.commit('showContent', { parent: 'recharge' });
                this.$store.commit('showNav', { child: index });
                this.$store.commit('payment', thisA);
                let postUrl = '';
                if (thisA.classType == 'qr_code') {
                    postUrl = '/deposit/qr_code';
                }else if(thisA.classType =='transfer_bank'){
                    postUrl = '/deposit/bank';
                } else{
                    postUrl = '/deposit/online';
                }
                let parmers={}
                if(thisA.classType =='transfer_bank') parmers={ classId: thisA.id, devices: 'pc'}
                else parmers={categoryId: thisA.id, devices: 'pc'}
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
                                    // res.data.forEach((item, index) => {
                                    //     if (item.formatAmount) {
                                    //         // 存在，需要用到下拉框
                                    //         // 还需要处理数据
                                    //         item.priceList = item.formatAmount && item.formatAmount.split(',').sort(this.sortNum1);
                                    //         item.isFormatAmount = true;
                                    //     } else {
                                    //         // 不需要用到下拉框
                                    //         item.isFormatAmount = false;
                                    //         item.quick_amount_list=[]
                                    //         if(item.quick_amount){
                                    //             if(item.quick_amount.indexOf(',')==-1) item.quick_amount_list[0]= item.quick_amount
                                    //             else item.quick_amount_list=item.quick_amount.split(',').splice(0,8)
                                    //         }else{
                                    //             item.quick_amount_list=[50,100,500,1000,5000]  
                                    //         } 
                                    //     }
                                    // });
                                }
                            }
                            this.$store.commit('paymentDataFc', res.data);
                        }
                    });
                this.$store.commit('refresh', 1);
            }
        },
        // 获取用户
        getServiceList(token){
            const service = axios.create({
                headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
                timeout: 10000, // 请求超时时间
                withCredentials:true  //指示是否跨站点访问控制请求
             });
             service.post('https://api.n9011.com/web/service/payServiceList',{token,hierarchyId:JSON.parse(localStorage.userinfo).agencyInfo.levelId})
             .then(res=>{
                if(res.data.code===0){
                    if (res.data.data) {
                        this.hasServiceInfo = true;
                        res.data.data.forEach(v => {
                            this.serviceData.push(v)
                        });
                    }else{
                        this.hasServiceInfo = false;
                    }
                    
                    // if (res.data.data.length =0 ) {
                    //     this.hasServiceInfo = false;
                    // } else {
                    //     this.hasServiceInfo = true;
                    //     this.serviceData = res.data.data;
                    //     res.data.data.forEach(v => {
                    //     });
                    // }
                } else{
                    this.hasServiceInfo = false;
                }
             })
        },
        //跳转充值客服
        async toKefu(uuid) {
            this.$http.post(`${this.$HOST_NAME}/paymentServiceCustomer`)
            .then(res=>{
                  if(res.code==200){
                       window.open(res.data.data.url+'&port=1&type=0&key='+res.data.data.key+'&customerUuid='+uuid);
                  }else{
                       this.$error(res.message, 3000);
                  }
            })
        }
    },
    filters:{
        getName(name){
            return name.split('-')[1]
        },
        getName1(name){
            return name.split('-')[0]
        }
    },
    created() {
        this.getKefuLink();
        this.getNavDatas();
    },
    destroyed() {
        this.$store.commit('loading', false);
    },
    store
};
</script>

<style lang="less" scoped>
.internerBank {
    padding: 0 14px;
    .header {
        border-bottom: 1px solid #f3f3f3;
        height: 56px;
        color: #696969;
        line-height: 75px;
        padding-top: 10px;
        ul {
            li {
                width: 126px;
                font-size: 16px;
                height: 40px;
                float: left;
                line-height: 40px;
                text-align: center;
                border-right: 1px solid #dbdbdb;
                img {
                    width: 24px;
                    vertical-align: middle;
                    margin-right: 5px;
                }
                span {
                    vertical-align: middle;
                }
            }
        }
    }
    .warning-wrap {
        background-color: #fff;
        padding: 20px 30px 0 30px;
        .warning {
            height: 40px;
            line-height: 40px;
            color: #ff3333;
            background-color: #f9f9f9;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 1.4em;
            border: 1px solid #dbdbdb;
            border-radius: 5px;
            .icon {
                width: 17px;
                height: 17px;
                fill: #979797;
                overflow: hidden;
                margin-left: 12px;
                margin-right: 5px;
                vertical-align: middle;
            }
        }
    }
    .userListContianer{
        height: 500px;
        .userTitle{
            width: 940px;
            margin: 20px auto; 
        }
        .userList::-webkit-scrollbar {
            display: none;
        }
        .userList{
            height: 330px;
            width: 940px;
            margin: 0 auto;
            overflow: scroll;
            padding-top: 10px;
            ul{
                height: 300px;
                display: flex;
                flex-wrap: wrap;
                li{
                    width: 460px;
                    height: 123px;
                    display: flex;
                    background-image: url('/static/public/image/userImg/bg.png');
                    background-repeat: no-repeat;
                    background-size: 100%;
                    position: relative;
                    margin-bottom: 20px;
                    .discount{
                        display: inline-block;
                        width: 64px;
                        height: 30px;
                        background-image: url(/static/public/image/userImg/send.png);
                        background-size: 100%;
                        background-repeat: no-repeat;
                        color: #fff;
                        font-size: 12px;
                        text-align: center;
                        line-height: 28px;
                        position: absolute;
                        top: -5px;
                        right: 45px;
                    }
                    &:nth-child(odd){
                        margin-right: 20px;
                    }
                    
                    .userPhoto{
                        width: 105px;
                        height: 105px;
                        margin: 6px;
                        border-radius: 50%;
                        overflow: hidden;
                    }
                    .userName{
                        width:200px;
                        margin-top: 10px;
                        span{
                            display: inline-block;
                            width: 100%;
                            height: 30px;
                            line-height: 30px;
                            padding-left: 10px;
                            &:first-child{
                                font-size: 24px;
                            }
                            &:nth-child(2){
                                margin: 10px 0 5px 0;
                                img{
                                    margin-right: 10px;
                                }   
                            }
                            &:last-child{
                                font-size: 16px;
                            }
                        }
                    }
                    .manualBtn{
                        width: 130px;
                        a{
                            width: 130px;
                            height: 60px;
                            display: inline-block;
                            margin: 40px auto;
                        }
                    }
                }
            }
        }
    }
    /* 人工入款 */
    .content_manual {
        .serviceContainer {
            max-height: 470px;
            overflow-y: auto;
            margin: 40px 0 0 30px;
            display: flex;
            flex-wrap: wrap;

            .serviceItem {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 8px;
                margin-bottom: 20px;
                width: 400px;
                height: 100px;
                border-radius: 16px;
                border: 1px solid rgba(187, 190, 196, 0.5);
                border-right: none;

                &:nth-child(even) {
                    margin-left: 20px;
                }

                .workerIcon {
                    width: 84px;
                    height: 84px;
                    border-radius: 16px;
                    position: relative;
                    margin-right: 10px;

                    .icon_ico {
                        width: 100%;
                        height: 100%;
                        border-radius: 16px;
                    }

                    .hot {
                        position: absolute;
                        top: -8px;
                        left: 2px;
                        width: 18px;
                        height: 34px;
                    }
                }
                .workerInfo {
                    flex: 1;

                    .baseInfo {
                        margin-bottom: 10px;
                        .name {
                            display: inline-block;
                            height: 20px;
                            line-height: 20px;
                            font-size: 15px;
                            font-family: PingFang SC;
                            font-weight: 500;
                            color: #121212;
                            margin-right: 20px;
                            letter-spacing: 2px;
                        }
                        .dealNo {
                            display: inline-block;
                            height: 20px;
                            line-height: 20px;
                            font-size: 10px;
                            font-family: PingFang SC;
                            font-weight: 500;
                            color: #999;
                        }
                    }
                    .stars {
                        i {
                            display: inline-block;
                            width: 15px;
                            height: 15px;
                            margin-right: 6px;

                            &.star {
                                background: url(/static/public/image/userImg/star.png) no-repeat center;
                                background-size: contain;
                            }
                            &.halt_star {
                                background: url(/static/public/image/userImg/half_star.png) no-repeat center;
                                background-size: contain;
                            }
                        }

                        .score {
                            font-size: 15px;
                            font-family: PingFang SC;
                            font-weight: 500;
                            color: #ff7e00;
                            display: inline-block;
                            margin-left: 5px;
                        }
                    }
                    .paymentWays {
                        margin-top: 12px;
                        display: flex;
                        align-items: center;

                        i {
                            display: inline-block;
                            &.union_pay {
                                width: 23px;
                                height: 13px;
                                background: url(/static/public/image/userImg/union_pay.png) no-repeat center;
                                background-size: contain;
                                margin-right: 18px;
                            }
                            &.alipay {
                                width: 18px;
                                height: 18px;
                                background: url(/static/public/image/userImg/alipay.png) no-repeat center;
                                background-size: contain;
                                margin-right: 18px;
                            }
                            &.wechat_pay {
                                width: 20px;
                                height: 16px;
                                background: url(/static/public/image/userImg/wechat.png) no-repeat center;
                                background-size: contain;
                            }
                        }
                    }
                }
                .rechargeBtn {
                    width: 90px;
                    height: 100%;
                    text-align: center;
                    line-height: 100px;
                    background: linear-gradient(to bottom, #ff1e4f, #ff3492);
                    border-top-right-radius: 16px;
                    border-bottom-right-radius: 16px;
                    font-size: 18px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
    }

    // 暂无客服数据
    .noService {
        padding: 40px 13px;
        font-size: 16px;
        height: 360px;
        text-align: center;
    }
}
</style>