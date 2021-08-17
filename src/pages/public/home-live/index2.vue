<template>
    <div class="live">
        <div><img :src="adImg" class="headImg"></div>
        <div class="buyu_contcontent">
            <ul>
                <li v-for="(item,index) in listData" :key="index" class="buyu-list" :style="{background:item.img_bg }"  @click="$loginGame(item)">
                    <div class="item-left">
                        <p><img :src="item.logo_img"></p>
                        <p>{{item.name}}</p>
                        <p>{{item.title}}</p>
                        <p v-if="item.id!=0"><img :src="item.join_btn"></p>
                    </div>
                    <div class="item-right">
                        <p><img :src="item.model_img"></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import mixin from '../games/public.js'
export default {
    mixins: [mixin],
    props:{
        adImg:{
            type:String
        },
        listData:{
            type:Array
        }
    }
}
</script>

<style lang="less" scoped>
    .headImg{
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
                cursor: pointer;
                color: #ffffff;
                background-size: 100% 100%!important;
                margin:0 20px 20px 0;
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
                div{
                    transition:All 0.4s ease-in-out;
                    &:first-child{
                        width: 35%;
                        padding-top: 30px;
                        line-height: 30px;
                        p:nth-child(2){
                            font-size: 20px;
                            font-weight: bold;
                            color: yellow;
                        }
                        p:last-child{
                            margin: 40px 0 0 30px;
                            transition:opacity 1s;
                            opacity: 0;
                        }
                    }
                    p{
                        text-align: center;
                    }
                    &:last-child{
                        position: relative;
                        right: 30px;
                        width: 65%;
                        p{
                            text-align: center;
                        }
                        img{
                            position: relative;
                            top: -2px;
                        }
                    }
                }
                &:last-child{
                    div:last-child{
                        img{
                            position: relative;
                            // top: 23px;
                        }
                    }
                    
                }
            }
        }
        
    }
    
</style>>