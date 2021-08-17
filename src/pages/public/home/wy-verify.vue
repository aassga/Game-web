<template>
    <div id="slideVerify">
        <!-- <div class="loadInit" v-if="loadEnd">
            <img src="/static/public/image/paycheck/loading.gif" class="loadingImg" width="74px">
            <img src="/static/public/image/paycheck/default.png" width="620px">
        </div> -->
        
    </div>
</template>
<script>
    import { postS, getS } from '@/service/public/service.js'
    export default {
        data() {
            return {
                loadEnd:true,
            }
        },
        created() {},
        mounted() {
            this.getWyCode();
        },
        methods: {
            async getWyCode(){
               this.initCheck(this.$store.state.home.wyToken)
            },
            initCheck(id){
                let userName = this.$store.state.home.safeName;
                let captchaIns;
                let that = this;
                initNECaptcha({
                    element: '#slideVerify',
                    captchaId: id,
                    mode: 'embed',
                    width: '620px',
                    protocol:"https",
                    enableClose:true,
                    
                    // 二次校验
                    onVerify: function (err, data){
                        let checkApi = {
                            userName:userName,
                            NECaptchaValidate:data.validate,
                            device:'pc'
                        }
                        if (err) return
                        if(data){
                            // 验证通过
                            postS(`checkWYCode`,checkApi).then(res=>{
                                if (res.code === 200) {
                                    setTimeout(()=>{
                                        that.$store.commit('home/safeStatus', false)
                                        if(that.$store.state.home.isLoginorRegister=='login'){
                                            that.$store.commit('home/safeLogin', 'login')
                                        }else if(that.$store.state.home.isLoginorRegister=='register'){
                                            that.$store.commit('home/safeLogin', 'register')
                                        }
                                    },1000)
                                } else {
                                    captchaIns.refresh();
                                }
                            })
                        }
                    }
                    
                }, function (instance) {
                    // 初始化成功后得到验证实例instance，可以调用实例的方法
                    that.loadEnd = false;
                    captchaIns = instance
                }, function (err) {
                    // 初始化失败后触发该函数，err对象描述当前错误信息
                })
            }
        }
    }
</script>
<style lang="less" scoped>
#slideVerify{
    padding-top: 30px;
    .loadInit{
        width: 620px;
        height: 320px;
        margin: 0 auto;
        position: relative;
        .loadingImg{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }
}


</style>