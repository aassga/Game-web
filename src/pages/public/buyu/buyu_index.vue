<template>
    <div class="buyu_container">
        <div><img :src="adImg" class="adImg"></div>
        <div class="buyu_contcontent">
            <ul>
                <li v-for="(item,index) in listData" :key="index" class="buyu-list" :style="{background:item.img_bg }">
                    <div class="item-left">
                        <p><img :src="item.img_left"></p>
                        <p>{{item.name}}</p>
                        <p><img :src="item.login_btn"  @click="$loginGame(item)"></p>
                    </div>
                    <div class="item-right">
                        <p><img :src="item.img_right"></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    
</template>

<script>
import mixin from '../games/public.js';
export default {
    mixins: [mixin],
    props:{
        adImg: {
            type: String
        },
        listData:{
            type:Array
        }
    },
    data () {
        return {
            
        }
    }
}
</script>

<style lang="less" scoped>
    .adImg{
        width: 100%;
    }
    .buyu_contcontent{
        width: 1200px;
        margin: 0 auto;
        padding-top: 20px;
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                display: flex;
                flex-wrap: nowrap;
                width: 48%;
                height: 355px;
                cursor: pointer;
                color: #ffffff;
                background-size: 100% 100%!important;
                margin-bottom: 20px;
                div{
                    transition:All 0.4s ease-in-out;
                    p:nth-child(2){
                        font-size: 20px;
                        font-weight: bold;
                    }
                    &:first-child{
                        p:last-child{
                            margin-top: 70px;
                            margin-left: 30px;
                            transition:opacity 1s;
                            opacity: 0;
                        }
                    }
                    
                }
                &:hover{
                    div:first-child{
                        transform:translate(10px,0);
                    }
                    div:last-child{
                        transform:translate(-10px,0);
                    }
                    div:first-child{
                       p:last-child{
                            opacity:1;
                            transition-duration:1s;
                        } 
                    }
                }
                
                &:nth-child(3){
                    .item-right{
                        img{
                            margin-top: 30px;
                        }
                    }
                }
                &:nth-child(odd){
                    margin-right: 20px;
                    div{
                        &:first-child{
                            width: 35%;
                            padding-top: 15px;
                        }
                        p{
                            text-align: center;
                            margin-top: 15px;
                        }
                        &:last-child{
                            position: relative;
                            right: 30px;
                            width: 65%;
                            p{
                                text-align: center;
                                // img{
                                //     width: 370px;
                                // }
                            }
                        }
                    }
                }
                &:nth-child(even){
                    display: flex;
                    flex-direction: row-reverse;
                    div{
                        width: 50%;
                        &:first-child{
                            padding-top: 15px;
                        }
                        &:last-child{
                            margin-top: 20px;
                            margin-left: 40px;
                            
                        }
                        p{
                            text-align: center;
                            margin-top: 15px;
                        }
                    }
                }
                
            }
        }
        
    }
    
</style>>
