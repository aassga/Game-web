
const mixin = {
    data: function() {
        return {
            allUnReadCount:10,
        };
    },
    created() {
    },
    methods: {
    },
    computed: {
        showMessage(){
            return this.$store.state.mainState.showMessage;
        }
    },
    watch: {
        'showMessage': {
            handler: function(newval, oldVal) {
                 this.allUnReadCount=this.showMessage.allUnReadCount
            },
           deep: true
        }
    },
    beforeDestroy() {}
};

export default mixin;