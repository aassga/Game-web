<template>
  <div class="tiyu_content">
      <div><img :src="headImg" class="headImg"></div>
      <div class="tiyu_list">
          <ul>
              <li v-for="(item,index) in listData" :key="index" :style="{background:item.bg_img}" >
                  <div class="players"><img :src="item.players_img"></div>
                  <div class="joinBtn"><img :src="item.jion_btn" @click="$loginGame(item)"></div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import data from "../games/public.js";
export default {
    mixins: [data],
    props:{
        headImg:{
            type:String
        },
        listData:{
            type:Array
        }
    },
    data () {
        return {}
    }
}
</script>

<style lang="less" scoped>
    .headImg{
        width: 100%;
    }
    .tiyu_list{
        width: 1200px;
        margin: 0 auto;
        padding-top: 40px;
        li{
            display: flex;
            height: 495px;
            margin-top: 20px;
            &:hover{
                div:first-child img{
                    transform:translate(50px,0);
                }
            }
            div{
                width: 50%;
                position: relative;
                &:first-child{
                    img{
                        position: absolute;
                        height: 483px;
                        left: 0;
                        top: -34px;
                        transition:All 0.4s ease-in-out;
                    }
                }
                &:last-child{
                    img{
                        position: absolute;
                        bottom: 105px;
                        right: 199px;
                        cursor: pointer;
                    }
                    
                }
            }
            &:nth-child(2),&:nth-child(3){
                display: flex;
                flex-direction: row-reverse; 
                div{
                    &:last-child{
                        img{
                            position: absolute;
                            bottom: 82px;
                            right: 135px;
                            cursor: pointer;
                        }
                        
                    }
                }
                
            }
            // &:nth-child(2){
            //     div{
            //         width: 50%;
            //         position: relative;
            //         &:first-child{
            //             img{
            //                 position: absolute;
            //                 left: 0;
            //                 height: 545px;
            //                 top: -97px;
            //                 transition:All 0.4s ease-in-out;
            //             }
            //         }
            //     }
            // }
            // &:nth-child(3){
            //     div{
            //         width: 50%;
            //         position: relative;
            //         &:first-child{
            //             img{
            //                 position: absolute;
            //                 left: 0;
            //                 top: -71px;
            //                 transition:All 0.4s ease-in-out;
            //             }
            //         }
            //     }
            // }
        }
    }
</style>>
