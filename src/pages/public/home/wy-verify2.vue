<template>
    <div id="captcha"></div>
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
                    element: '#captcha',
                    captchaId: id,
                    mode: 'embed',
                    width: '320px',
                    protocol:"https",
                    enableClose:true,
                    feedbackEnable:false,
                    // 二次校验
                    onVerify: function (err, data){
                        let checkApi = {
                            userName:that.$store.state.home.safeName,
                            NECaptchaValidate:data.validate,
                            device:'pc'
                        }
                        if (err) return
                        if(data){
                            // 验证通过
                            postS(`checkWYCode`,checkApi).then(res=>{
                                console.log(res)
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
#captcha{
    padding-top: 15px;
}
</style>