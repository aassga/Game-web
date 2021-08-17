
<template>  
     <div>
        <span :style="systemmessage" v-if=" allUnReadCount > 0">{{allUnReadCount}}</span> 
    </div>  
</template>

<script>
import { postS, getS } from "@/service/public/service.js";
export default {
    props:{
        systemmessage:{
            type:Object, 
            default:function(){
                return {
                    width:' 20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#ff0000',
                    position: 'absolute',
                    left: '47px',
                    top: '-9px',
                    lineHeight:' 20px',
                    textAlign: 'center',
                    display: 'block',
                }
            }
        }
    },
    data(){
        return {
            allUnReadCount:""
        }
    },
    methods:{
    },
    computed:{ 
       showMessage(){
            return this.$store.state.mainState.showMessage;
        }
    },
    watch:{
        'showMessage': {
          handler: function(newval, oldVal) {
               this.allUnReadCount=this.showMessage.allUnReadCount
          },
           deep: true
       } 
    }
}
</script>

<style lang="less" scoped>
</style>
