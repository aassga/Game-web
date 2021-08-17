<template>
    <div class="wrapper">
        <ul>
            <li
                v-for="(item,i) in buyuData"
                :key="i"
                @click="getItemId(item)"
            >
                <div class="cover_hover"></div>
                <div
                    class="cover"
                    :style="{backgroundImage: 'url(' + item.img + ')'}"
                ></div>
            </li>
        </ul>
        <ol>
            <li v-for="(item, index) in list" :key="index" :style="{backgroundImage: 'url(' + item.img + ')'}" @click="getItemId(item)"></li>
        </ol>
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
            list:[
                {
                classId: 42,
                className: "开元棋牌",
                code: "1",
                devices: "ios,h5,pc,android",
                id: 3605,
                name: "百人牛牛",
                platform: "chess",
                sequence: 20,
                special_setting: '{"platform":"KY_CHESS", "gameName":"1"}',
                status: "yes",
                tag: "HOT",
                show: true,
                img: "/static/public/image/qipai/img2/icon/8.png"
                },
                {
                classId: 42,
                className: "开元棋牌",
                code: "1",
                devices: "ios,h5,pc,android",
                id: 254,
                name: "极速炸金花",
                platform: "chess",
                sequence: 20,
                special_setting: '{"platform":"KY_CHESS", "gameName":"1"}',
                status: "yes",
                tag: "HOT",
                show: true,
                img: "/static/public/image/qipai/img2/icon/6.png"
                },
                {
                classId: 42,
                className: "开元棋牌",
                code: "1",
                devices: "ios,h5,pc,android",
                id: 244,
                name: "斗地主",
                platform: "chess",
                sequence: 20,
                special_setting: '{"platform":"KY_CHESS", "gameName":"1"}',
                status: "yes",
                tag: "HOT",
                show: true,
                img: "/static/public/image/qipai/img2/icon/1.png"
                },
                {
                classId: 42,
                className: "开元棋牌",
                code: "1",
                devices: "ios,h5,pc,android",
                id: 247,
                name: "德州扑克",
                platform: "chess",
                sequence: 20,
                special_setting: '{"platform":"KY_CHESS", "gameName":"1"}',
                status: "yes",
                tag: "HOT",
                show: true,
                img: "/static/public/image/qipai/img2/icon/3.png"
                },
                {
                classId: 42,
                className: "开元棋牌",
                code: "1",
                devices: "ios,h5,pc,android",
                id: 256,
                name: "十三水",
                platform: "chess",
                sequence: 20,
                special_setting: '{"platform":"KY_CHESS", "gameName":"1"}',
                status: "yes",
                tag: "HOT",
                show: true,
                img: "/static/public/image/qipai/img2/icon/7.png"
                },
                {
                classId: 42,
                className: "开元棋牌",
                code: "1",
                devices: "ios,h5,pc,android",
                id: 246,
                name: "炸金花",
                platform: "chess",
                sequence: 20,
                special_setting: '{"platform":"KY_CHESS", "gameName":"1"}',
                status: "yes",
                tag: "HOT",
                show: true,
                img: "/static/public/image/qipai/img2/icon/2.png"
                },
                {
                classId: 42,
                className: "开元棋牌",
                code: "1",
                devices: "ios,h5,pc,android",
                id: 251,
                name: "21点",
                platform: "chess",
                sequence: 20,
                special_setting: '{"platform":"KY_CHESS", "gameName":"1"}',
                status: "yes",
                tag: "HOT",
                show: true,
                img: "/static/public/image/qipai/img2/icon/5.png"
                },
                {
                classId: 42,
                className: "开元棋牌",
                code: "1",
                devices: "ios,h5,pc,android",
                id: 248,
                name: "二八杠",
                platform: "chess",
                sequence: 20,
                special_setting: '{"platform":"KY_CHESS", "gameName":"1"}',
                status: "yes",
                tag: "HOT",
                show: true,
                img: "/static/public/image/qipai/img2/icon/4.png"
                }
            ]    
        };
    },
    created() {
        this.getQiPai();
    },
    methods: {
        async getQiPai() {
            let qipai = JSON.parse(sessionStorage.qipai)
            qipai.forEach(item => {
                this.idlist.push(item.id);
            });
            this.idlist.forEach(element => {
                switch (element) {
                    case 10042:
                        this.qipaigame = {
                            name: "开元棋牌",
                            img: "/static/public/image/qipai/img2/1KY.png",
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
                            img: "/static/public/image/qipai/img2/2VG.png",
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
                            img: "/static/public/image/qipai/img2/4LY.png",
                            content: "经典玩法 玩法丰富",
                            platform: "LY_CHESS",
                            gameName: "0",
                            id: 10613
                        };
                        this.buyuData.push(this.qipaigame);
                        break;
                    case 10636:
                        this.qipaigame = {
                            name: "大战棋牌",
                            img: "/static/public/image/qipai/img2/5DZ.png",
                            content: "经典玩法 玩法丰富",
                            platform: "DZ_CHESS",
                            gameName: "1000",
                            id: 10693
                        };
                        this.buyuData.push(this.qipaigame);
                        break;
                    
                    case 10694:
                        this.qipaigame = {
                            name: "天游棋牌",
                            img: "/static/public/image/qipai/img2/6TH.png",
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
                            img: "/static/public/image/qipai/img2/3FG.png",
                            path: "FG_CHESS",
                            id: 10733,
                            };
                            this.buyuData.push(this.qipaiitem)
                            break
                    
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.wrapper {
    width: 1200px;
    ul:after {
        clear: both;
        content: "";
        display: block;
    }
    ul {
        margin-top: 580px;
        margin-left: 100px;
        width: 1200px;
        height: 735px;
        overflow: hidden;
        li {
            width: 242px;
            height: auto;
            margin:0 10px 10px 0;
            display: inline-block;
            position: relative;
            text-align: center;
            cursor:pointer;
            // margin-left: 10px;
            .cover_hover {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 359px;
                z-index: 20;
                cursor: pointer;
            }
            .cover {
                width: 100%;
                height: 359px;
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
            
        }
        li:last-child {
            margin-left: 0px!important;
        }
    }
    ol{
        margin-top: 90px;
        margin-left: 100px;
        width: 1200px;
        li{
            width: 120px;
            height: 120px;
            display: inline-block;
            cursor:pointer;
            transition: all .3s;
        }
        li:hover{
            transform:scale(1.1)
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

