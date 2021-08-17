<template>
    <div class="wrapper">
        <div class="name"><img src="/static/qxcp/img/qipaiName.png" width="200px" alt=""></div>
        <ul>
            <li
                v-for="(item,i) in buyuData"
                :key="i"
                :style="{marginLeft: mleft+'px'}"
            >
                <div class="cover_hover"></div>
                <div class="cover" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
                <p @click="$loginGame(item)"><a class="btn">开始游戏</a></p>
                <p @click="$loginGame(item)"><a class="btn_ag" href="javascript:void(0)">游戏说明</a></p>
            </li>
        </ul>
    </div>
</template>
<script>
import store from "@/vuex/store";
import { _SetGet, _SetPost } from "@/service/public/service.js";
import mixin from "../games/public.js";
export default {
    mixins: [mixin],
    data() {
        return {
            buyuData: [],
            idlist: [],
            qipaigame: {},
            mleft:0    
        };
    },
    created() {
        this.getQiPai();
    },
    methods: {
        async getQiPai() {
            let qipai = JSON.parse(localStorage.gameList);
            if(qipai[1].list.length==3){
                this.mleft = 25
            }else if(qipai[1].list.length==4){
                this.mleft = 20
            }else if(qipai[1].list.length>=5){
                this.mleft = 10
            }

            qipai[1].list.forEach(item => {
                this.idlist.push(item.id);
            });
            this.idlist.forEach(element => {
                switch (element) {
                    case 10042:
                        this.qipaigame = {
                            name: "开元棋牌",
                            img: "/static/public/image/qipai/10042.png",
                            content: "经典玩法 玩法丰富",
                            platform: "KY_CHESS",
                            gameName: "0",
                            id: 243
                        };
                        this.buyuData.push(this.qipaigame);
                        break;
                    case 10041:
                        this.qipaigame = {
                            name: "VG棋牌",
                            img: "/static/public/image/qipai/10041.png",
                            content: "经典玩法 玩法丰富",
                            platform: "VG_CHESS",
                            gameName: "1000",
                            id: 10091
                        };
                        this.buyuData.push(this.qipaigame);
                        break;
                    case 10612:
                        this.qipaigame = {
                            name: "乐游棋牌",
                            img: "/static/public/image/qipai/10612.png",
                            content: "经典玩法 玩法丰富",
                            platform: "LY_CHESS",
                            gameName: "0",
                            id: 10613
                        };
                        this.buyuData.push(this.qipaigame);
                        break;
                    
                    case 10694:
                        this.qipaigame = {
                            name: "天游棋牌",
                            img: "/static/public/image/qipai/10694.png",
                            content: "经典玩法 玩法丰富",
                            platform: "TH_CHESS",
                            gameName: "1000",
                            id: 10695
                        };
                        this.buyuData.push(this.qipaigame);
                        break;
                    case 10732:
                        this.qipaiitem = {
                            name: "FG棋牌",
                            img: "/static/public/image/qipai/10732.png",
                            path: "FG_CHESS",
                            id: 10733,
                            };
                            this.buyuData.push(this.qipaiitem)
                            break;
                    case 11881:
                        this.qipaiitem = {
                            name: "AK棋牌",
                            img: "/static/public/image/qipai/11881.png",
                            path: "AK_CHESS",
                            id: 11882,
                            };
                            this.buyuData.push(this.qipaiitem)
                            break;
                    case 11828:
                        this.qipaiitem = {
                            name: "凯旋棋牌",
                            img: "/static/public/image/qipai/11828.png",
                            path: "FG_CHESS",
                            id: 11829,
                            };
                            this.buyuData.push(this.qipaiitem)
                            break;
                    case 11857:
                        this.qipaiitem = {
                            name: "新世界棋牌",
                            img: "/static/public/image/qipai/11857.png",
                            path: "FG_CHESS",
                            id: 11858,
                            };
                            this.buyuData.push(this.qipaiitem)
                            break;
                    case 11759:
                        this.qipaiitem = {
                            name: "大富翁棋牌",
                            img: "/static/public/image/qipai/11759.png",
                            path: "FG_CHESS",
                            id: 11760,
                            };
                            this.buyuData.push(this.qipaiitem)
                            break;
                    case 11775:
                        this.qipaiitem = {
                            name: "MT棋牌",
                            img: "/static/public/image/qipai/11775.png",
                            path: "MT_CHESS",
                            id: 12044,
                            };
                            this.buyuData.push(this.qipaiitem)
                            break;
                    
                }

            });
        }
    }
};
</script>
<style lang="less" scoped>
.wrapper {
    width: 100%;
    .name{
        width: 1000px;
        margin:0 auto;
        height: 190px;
        line-height: 300px;
    }
    ul:after {
        clear: both;
        content: "";
        display: block;
    }
    ul {
        width: 1000px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        li {
            width: 190px;
            height: auto;
            position: relative;
            text-align: center;
            margin-bottom: 20px;
            .cover_hover {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 304px;
                z-index: 20;
                cursor: pointer;
            }
            .cover {
                width: 100%;
                height: 304px;
                background-position: center center;
                background-repeat: no-repeat;
                transition: all 0.3s ease-in;
                z-index: 10;
                background-size: cover;
                border-radius: 6px;
            }

            .cover_hover:hover + .cover {
                transform: rotateY(180deg);
            }
            .cover_hover:hover ~ .title {
                animation: titleSlide 0.3s linear;
            }

            .title {
                position: absolute;
                left: 40px;
                top: 30px;
                color: #fff;
                text-align: left;

                h2 {
                    font-size: 24px;
                    line-height: 2;
                }

                h3 {
                    font-size: 14px;
                    line-height: 1.5;
                    font-weight: normal;
                }
            }
            p {
                margin-top: 20px;
                &:last-child{
                    margin-top: 10px;
                }
                a {
                    display: inline-block;
                    width: 190px;
                    height: 54px;
                    line-height: 54px;
                    text-align: center;
                    color: #fff;
                    font-size: 22px;
                    box-sizing: border-box;
                    border: 2px solid #fd7328;
                    background: #fd7328;
                    border-radius: 6px;
                }

                .btn_ag {
                    color: #fff;
                    border-color: #fff;
                    background: transparent;
                }

                .btn_ag:hover {
                    color: #fff;
                    border-color: #fd7328!important;
                    background: #fd7328!important;
                }
            }
        }
        li:last-child {
            // margin-left: 0px!important;
        }
    }
}
@keyframes titleSlide {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    50% {
        transform: translateY(20px);
        opacity: 0;
    }
    51% {
        transform: translateY(-20px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>

