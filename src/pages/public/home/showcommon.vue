<template>
     <div>
        <div class="newBox" v-show="tipDatas.bool" @mouseover="focusData()">
            <div :class="[classType,'pop-img']">
                <div class="top_img">
                    <img :src="'/static/public/image/modal_top/'+showtype.topImg+'.png'" alt="">
                </div>
                <div id="show_box" ref="searchBar">
                    <ul id="show_textBox" ref="textBoxBar" :style="{height: ulHeight}">
                        <li v-for="(item,index) in dataList" :key="index" class="">
                            <p>{{(index+1)+" . "+item.description}}</p>
                            <div class="border_line"></div>
                        </li>
                    </ul>
                </div>
                <div :class="['close']" @click="tipDatas.bool=false">
                    <img :src="'/static/public/image/modal_top/'+showtype.closeImg +'.png'" alt="">
                </div>
                <div class="btnBox">
                    <div class="border_line"></div>
                    <div class="pop_btnBox">
                        <span class="show_num">{{thisPage+"/"+totalPage}} 页</span>
                        <button class="btn_sty shang" @click="goPrev()" @mouseover="mOver(1)" @mouseout="mOut(1)" :style="{'color':colorPrev}">上一页</button>
                        <button class="btn_sty xia" @click="goNext()" @mouseover="mOver(2)" @mouseout="mOut(2)" :style="{'color':colorNext}">下一页</button>
                    </div>
                </div> 
            </div>
        </div>
     </div>
</template>
<script>
import { _SetGet, _SetPost, postS, getS} from '@/service/public/service.js';
export default {
    props:{
        showtype:{
            type:Object
        }
    },
    data(){
       return{
        popoutObj:{
          client_type:"PC"
        },
        dataList:[],
        thisPage:1,
        totalPage:1,
        lanternData:{},
        colorPrev:'',//上一页改变的颜色
        colorNext:'',//下一页改变的颜色
        classType:'',//特殊样式
        ulHeight:null,
       }
    },
    methods:{
        //获取初页数据
        async getAllDatas(){    
            // let res = JSON.parse(sessionStorage.lanterndata)
            // if(res.data.length){
            //     this.dataList = res.data
            // }
            let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
                type: "lantern",
                client_type: "PC",
                limit:1000,
                page:1
            });
            if (res && res.code === 200) {
                this.lanternData = res.data;
                if(this.lanternData.data.length){
                    this.dataList=this.lanternData.data
                } 
            }   
        },
        //上一页
        goPrev(){
            let box= this.$refs.searchBar;
            let boxHeight = this.$refs.searchBar.clientHeight; //视口的高度
            if(this.thisPage>1&&this.totalPage>1){
                this.thisPage--;
                if(this.thisPage==1){
                    this.$refs.searchBar.scrollTo(0,0)
                }else{
                    this.$refs.searchBar.scrollTo(0,((this.thisPage-1)*boxHeight))
                }
            }else{
                return false
            }
        },
        //下一页
        goNext(){
            let box= this.$refs.searchBar;
            let boxHeight = this.$refs.searchBar.clientHeight; //视口的高度
            if(this.thisPage<this.totalPage&&this.totalPage>1){
                this.thisPage++;
                if(this.thisPage==1){
                    this.$refs.searchBar.scrollTo(0,0)  
                }else{
                    this.$refs.searchBar.scrollTo(0,((this.thisPage-1)*boxHeight))
                }    
            }else{
                return false
            }
        },
        //监听滚动
        handleScroll() {
            let height = this.$refs.textBoxBar.offsetHeight; // 文档的总高度
            let boxTop = this.$refs.searchBar.scrollTop;//滚动条的滚动距离
            let boxHeight = this.$refs.searchBar.clientHeight; //视口的高度
            if(height/boxHeight<1){
                this.totalPage=1;
            }else{
                this.totalPage=Math.ceil(height/boxHeight)
            }
            if(boxTop==0){
                this.thisPage=1
            }else{
                this.thisPage=Math.ceil(boxTop/boxHeight)+1
            }
        },
        mOver(i){
            if(i==1){
                this.colorPrev=this.showtype.textColor
            }else{
                this.colorNext=this.showtype.textColor 
            }
        },
        mOut(i){
            if(i==1){
                this.colorPrev=''
            }else{
                this.colorNext=''
            }
        },
        focusData(){
            if(this.onFocusData){
               return false
            }else{
                this.onFocusData=false;
                let height = this.$refs.textBoxBar.offsetHeight;
                let boxHeight = this.$refs.searchBar.clientHeight;
                if(height/boxHeight<=1){
                    this.totalPage=1;
                }else{
                    this.totalPage=Math.ceil(height/boxHeight)
                }
                this.ulHeight=this.totalPage*boxHeight+'px';
            }
        }
    },
    created(){
        this.getAllDatas();
    },
    mounted(){
        if(this.showtype.classType){
            this.classType=this.showtype.classType
        }
        this.$nextTick(function(){
            this.$refs.searchBar.addEventListener('scroll',this.handleScroll); 
        })

    },
    //是否展示公告列表
    computed: {
        tipDatas() {
            return this.$store.state.alert.showtextip;
        }
    }
}
</script>
<style lang="less" scoped>
        .newBox{
            width:100%;
            height: 100%;
            background-color: rgba(0,0,0,.6);
            position:fixed;
            left:0;
            top:0;
            right:0;
            bottom:0;
            margin:auto;
            z-index:10001;
            display: flex;
            justify-content:center;
            align-items:center;
            @media (max-width: 1680px){
                .pop-img{
                    transform: scale(0.9);
                    width: 752px;
                    height: 612px;
                    border-radius: 16px;
                    background-color: #fff;
                    position:relative;
                    overflow: hidden;
                    .top_img{
                        width: 100%;
                        height: 64px;
                        img{
                            width: 100%;
                            height: 64px;
                        }
                    }
                    #show_box{
                        width:100%;
                        height:476px;
                        overflow: auto;
                        #show_textBox{
                            padding:0px 24px 0 30px;
                            li{
                                p{
                                    padding: 0;
                                    margin: 0;
                                    font-size:17px;
                                    font-family:Microsoft YaHei;
                                    font-weight:400;
                                    color:rgba(51,51,51,1);
                                    line-height:28px;
                                }
                                .border_line{
                                    width: 100%;
                                    height: 2px;
                                    background:#E7E7E7;
                                    margin: 13px 0;
                                }
                            }
                            li:last-child{
                                .border_line{
                                    opacity: 0;
                                    margin-bottom:0; 
                                }
                            }
                        }
                    }
                    .btnBox{
                        width:100%;
                        height:72px;
                        padding: 0 24px;
                        .border_line{
                            width: 100%;
                            height: 1px;
                            background:#E7E7E7;
                        }
                        .pop_btnBox{
                            position: absolute;
                            left: 50%;
                            bottom: 0;
                            transform: translateX(-50%);
                            height: 72px;
                            padding: 16px 0 24px 0;
                            span{
                                color: #444444;
                                height: 32px;
                                line-height: 32px;
                                font-size: 15px;
                            }
                            .btn_sty{
                                outline:none;
                                font-size: 15px;
                                width: 72px;
                                height: 32px;
                                line-height: 32px;
                                border:1px solid rgba(197,197,197,1);
                                background-color: #fff;
                                border-radius:5px;
                                color: #444444;
                                
                            }
                            .shang{
                                margin-left: 16px;
                                margin-right: 16px;
                            }  
                        }
                    }
                    .close{
                        width: 34px;
                        height: 34px;
                        position: absolute;
                        cursor: pointer;
                        right: 16px;
                        top: 15px;
                        img{
                            width: 34px;
                            height: 34px; 
                        }
                        &:hover{
                            opacity: 0.8;
                        }
                    }
                }
            } /*>=1024的设备*/
            @media (min-width: 1680px) {
                .pop-img{
                    transform: scale(0.9);
                    width: 932px;
                    height: 758px;
                    border-radius: 20px;
                    background-color: #fff;
                    position:relative;
                    overflow: hidden;
                    .top_img{
                        width: 932px;
                        height: 80px;
                        img{
                            width: 932px;
                            height: 80px;
                        }
                    }
                    #show_box{
                        width:932px;
                        height:588px;
                        overflow: auto;
                        #show_textBox{
                            padding:0px 40px 0 46px;
                            li{
                                p{
                                    padding: 0;
                                    margin: 0;
                                    font-size:18px;
                                    font-family:Microsoft YaHei;
                                    font-weight:400;
                                    color:rgba(51,51,51,1);
                                    line-height:28px;
                                }
                                .border_line{
                                    width: 100%;
                                    height: 2px;
                                    background:#E7E7E7;
                                    margin: 13px 0;
                                }
                            }
                            li:last-child{
                                .border_line{
                                    opacity: 0;
                                    margin-bottom:0; 
                                }
                            }
                        }
                    }
                    .btnBox{
                        width:932px;
                        height:90px;
                        padding: 0 46px;
                        .border_line{
                            width: 100%;
                            height: 1px;
                            background:#E7E7E7;
                        }
                        .pop_btnBox{
                            position: absolute;
                            left: 50%;
                            bottom: 0;
                            transform: translateX(-50%);
                            height: 90px;
                            padding: 20px 0 30px 0;
                            span{
                                color: #444444;
                                height: 40px;
                                line-height: 40px;
                                font-size: 16px;
                            }
                            .btn_sty{
                                outline:none;
                                font-size: 16px;
                                width: 90px;
                                height: 40px;
                                line-height: 40px;
                                border:1px solid rgba(197,197,197,1);
                                background-color: #fff;
                                border-radius:5px;
                                color: #444444;
                                
                            }
                            .shang{
                                margin-left: 20px;
                                margin-right: 20px;
                            }  
                        }
                    }
                    .close{
                        width: 42px;
                        height: 42px;
                        position: absolute;
                        cursor: pointer;
                        right: 20px;
                        top: 18px;
                        img{
                            width: 42px;
                            height: 42px; 
                        }
                        &:hover{
                            opacity: 0.8;
                        }
                    }
                }
            }  
          //蓝色的主题
            .blueType{
                background-color: #131F3F;
                #show_box{
                    width:100%;
                    overflow: auto;
                    #show_textBox{
                        li{
                            p{
                                color:#5380D4;
                            }
                            .border_line{
                                background-color:#1E3064;
                            }
                        }
                    }
                }
                #show_box::-webkit-scrollbar {/*滚动条整体样式*/
                    width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
                    height: 0px;
                }
                #show_box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                    background: #5380D4;
                }
                #show_box::-webkit-scrollbar-track {/*滚动条里面轨道*/
                    background-color:#1E3064;
                }
                .btnBox{
                    .border_line{
                        background-color:#1E3064;
                    }
                    .pop_btnBox{
                        .show_num{
                            color: #34528C;
                        }
                        .btn_sty{
                            background-color:#131F3F;
                            border: 1px solid #1E3064;
                            color: #34528C;
                        }
                    }
                }
            }
            .blackType{
                background-color: #15151C;
                #show_box{
                    width:100%;
                    overflow: auto;
                    #show_textBox{
                        li{
                            p{
                                color:#A7A7AF;
                            }
                            .border_line{
                                background-color:#1C1D25;
                            }
                        }
                    }
                }
                #show_box::-webkit-scrollbar {/*滚动条整体样式*/
                    width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
                    height: 0px;
                }
                #show_box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                    background: #5380D4;
                }
                #show_box::-webkit-scrollbar-track {/*滚动条里面轨道*/
                    background-color:#1E3064;
                }
                .btnBox{
                    .border_line{
                         background-color:#1C1D25;
                    }
                    .pop_btnBox{
                        .show_num{
                            color: #747474;
                        }
                        .btn_sty{
                            background-color:#15151C;
                            border: 1px solid #393939;
                            color: #747474;
                        }
                    }
                }
            }
    
        }

</style>
