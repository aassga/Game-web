const mixin={
    methods: {
        // 常规用途弹框
        alertBox(tipMsg,type){
            
            let alertType=this.$alertType;
            switch(alertType){
                case 1:
                    // 常用弹框
                    this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: tipMsg,
                        model: type
                    });
                    break;
                case 2:
                    // 不常见 第二个弹框
                    this.dNotify(tipMsg, type)
                    break;
                case 3:
                    // qygj,特殊弹框
                    this.$store.commit('alert/newshowtip',{
                        bool:true,
                        title:tipMsg,
                        model:'',
                        leftspan:true
                    })
                    break;
                default:
                    // 常用弹框 默认
                    this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: tipMsg,
                        model: type
                    });
                    break;
            }
        }
    },
}


export default mixin