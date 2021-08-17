<template>
    <div>
        <div class="vp-lottery-rules-wrap">
            <div class="vp-lottery-rules-side">
                <div class="rules-side-header">彩票规则</div>
                <ul :class="this.$websiteName&&(['amxpjdc'].includes(this.$websiteName))?'newrules-ul':'rules-ul'">
                    <li @click="sideSelectFc(item)" :class="{'active':item.title==sideSelect}" v-for="(item,index) in sideNav" :key="index"
                        v-if="item.childList.length>0">
                        <a>{{item.title}}</a>
                    </li>
                </ul>
            </div>
            <div class="vp-lottery-rules-container">
                <router-view :sideNav="sideNav" :key="$route.fullPath + '-' + h"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sideNav: [
                // {title:"体育赛事",router:'/rules/gameReport',id:'999'},
                // {title: '时时彩', router: '/rules/ssc', id: '4'},
                // {title: '六合彩', router: '/rules/lhc', id: '1'},
                // {title: 'PC蛋蛋', router: '/rules/pcdd', id: '10'},
                // {title: '快3', router: '/rules/k3', id: '9'},
                // {title: '11选5', router: '/rules/cp11x5', id: '24'},
                // {title: 'PK10', router: '/rules/pk10', id: '12'},
                // {title: '快乐十分', router: '/rules/klsf', id: '5'},
                // {title: '低频彩', router: '/rules/sd', id: '29'}
            ],
            sideSelect: "",
            personalBool: this.$store.state.personal.isPersonal,
            rulesUrl: ""
        };
    },
    methods: {
        setArrFirst(arr, property, value) {
            var chooseIndex;    //选中元素在数组中的索引
            var areBothObj = arr.every(function (item, index, array) {    //判断数组中的元素是否都为对象，都是对象则返回true
                return item instanceof Object;
            });
            if (areBothObj) {
                arr.forEach(function (item, index, array) {    //遍历数组，找到符合条件的元素索引
                    if (item[property] == value) {
                        chooseIndex = index;
                    }
                });
            } else {
                return false;
            }
            var choosed = arr.splice(chooseIndex, 1);    //将选中元素从原数组中剔除
            var newArr = choosed.concat(arr);    //合并选中元素和剔除了选中元素的原数组
            return newArr;
        },
        sideSelectFc(item) {
            this.sideSelect = item.title;
            this.$router.push({
                path: item.router,
                query: {
                    id: item.id
                }
            });
            this.rulesUrl = this.$route.fullPath;
        },
        async getDatas() {
            let res = await this.$http.get(
                `${this.$HOST_NAME}/lottery/getIssuesV4`,
                {}
            );
            if (res && res.code == 200) {
                let gameList = res.data;
                this.sideNav.forEach(item => {
                    if (item.router == this.$route.path) {
                        this.sideSelect = item.title;
                    }
                });
                document.querySelector("body").style.background = "#F4F4F4";
                this.sideSelect = this.$route.meta.name;
                var lhList = [];
                var ssList = [];
                var pcList = [];
                var ksList = [];
                var sxList = [];
                var pkList = [];
                var klList = [];
                var dpList = [];
                gameList.forEach((gameItem, gameIndex) => {
                    if (gameItem.lotteryName.includes("时时彩")||gameItem.lotteryName.includes("欢乐生肖")) {
                        ssList.push(gameItem);
                    }
                    if (gameItem.lotteryName.includes("六合彩")) {
                        lhList.push(gameItem);
                    }
                    if (gameItem.lotteryName.includes("PC蛋蛋")) {
                        pcList.push(gameItem);
                    }
                    if (gameItem.lotteryName.includes("快3")) {
                        ksList.push(gameItem);
                    }
                    if (gameItem.lotteryName.includes("11选5")) {
                        sxList.push(gameItem);
                    }
                    if (
                        gameItem.lotteryName.includes("赛车") ||
                        gameItem.lotteryName.includes("幸运飞艇") ||
                        gameItem.lotteryName.includes("香港赛马") ||
                        gameItem.lotteryName.includes("快乐飞艇") ||
                        gameItem.lotteryName.includes("北京赛车") ||
                        gameItem.lotteryName.includes("快速赛车") ||
                        gameItem.lotteryName.includes("快乐赛车") ||
                        gameItem.lotteryName.includes("幸运赛车")
                    ) {
                        pkList.push(gameItem);
                    }
                    if (
                        gameItem.lotteryName.includes("快乐十分") ||
                        gameItem.lotteryName.includes("幸运农场")
                    ) {
                        klList.push(gameItem);
                    }
                    if (
                        gameItem.lotteryName.includes("福彩3D") ||
                        gameItem.lotteryName.includes("排列3") ||
                        gameItem.lotteryName.includes("上海时时乐")
                    ) {
                        dpList.push(gameItem);
                    }
                });
                ssList = this.setArrFirst(ssList, 'lotteryId', 4)
                lhList = this.setArrFirst(lhList, 'lotteryId', 18)
                pkList = this.setArrFirst(pkList, 'lotteryId', 12)
                pcList = this.setArrFirst(pcList, 'lotteryId', 10)
                ksList = this.setArrFirst(ksList, 'lotteryId', 27)
                klList = this.setArrFirst(klList, 'lotteryId', 5)
                dpList = this.setArrFirst(dpList, 'lotteryId', 29)
                sxList = this.setArrFirst(sxList, 'lotteryId', 7)
                this.sideNav.push(
                    { title: "时时彩", router: "/rules/ssc", id: "4", childList: ssList },
                    {
                        title: "六合彩",
                        router: "/rules/lhc",
                        id: "18",
                        childList: lhList
                    },
                    {
                        title: "PC蛋蛋",
                        router: "/rules/pcdd",
                        id: "10",
                        childList: pcList
                    },
                    { title: "快3", router: "/rules/k3", id: "27", childList: ksList },
                    {
                        title: "11选5",
                        router: "/rules/cp11x5",
                        id: "7",
                        childList: sxList
                    },
                    { title: "PK10", router: "/rules/pk10", id: "12", childList: pkList },
                    {
                        title: "快乐十分",
                        router: "/rules/klsf",
                        id: "5",
                        childList: klList
                    },
                    { title: "低频彩", router: "/rules/sd", id: "29", childList: dpList }
                );
            }
        }
    },
    watch: {
        "$store.state.personal.isPersonal": function (newVal, oldVal) {
            if (newVal == false) {
                this.$router.push(this.rulesUrl);
            }
        }
    },
    created() {
        this.getDatas();
        this.rulesUrl = this.$route.fullPath;
    },
    computed: {
        h() {
            return this.sideNav.length !== 0 && this.sideNav[0].title
        }
    },
    mounted() {

    },
    beforeDestroy() {
        document.querySelector("body").style.background = "#F9F9F9";
    },
    components: {}
};
</script>

<style lang="less" scoped rel="stylesheet/less">
.vp-lottery-rules-wrap {
    width: 1350px;
    margin: 0 auto;
}

.vp-lottery-rules-side {
    width: 300px;
    float: left;
    min-height: 900px;
    margin-right: 30px;
    background-color: #fff;

    .rules-side-header {
        height: 80px;
        padding-left: 47px;
        background: #fafafa;
        line-height: 80px;
        color: #666666;
        font-size: 24px;
        border-bottom: 0;
    }

    .rules-ul {
        width: 100%;
        height: 300px;

        li {
            height: 60px;
            line-height: 60px;
            width: 100%;
            font-size: 18px;
            color: #666;
            padding-left: 70px;
            border-left: 5px solid #fff;
            cursor: pointer;

            a {
                color: #666;
            }

            &:hover {
                color: #ff6600;
                border-left: 5px solid #ff6600;
            }

            &.active {
                background: #ff6600;
                border-left: 5px solid #ff6600;

                a {
                    color: #fff;
                }
            }
        }
    }
     .newrules-ul {
        width: 100%;
        height: 300px;

        li {
            height: 60px;
            line-height: 60px;
            width: 100%;
            font-size: 18px;
            color: #666;
            padding-left: 70px;
            border-left: 5px solid #fff;
            cursor: pointer;

            a {
                color: #666;
            }

            &:hover {
                color: #a1bdf0;
                border-left: 5px solid #a1bdf0;
            }

            &.active {
                background: #f6fafe;
                border-left: 5px solid #a1bdf0;

                a {
                    color: #a1bdf0;
                }
            }
        }
    }
}

.vp-lottery-rules-container {
    float: left;
    width: 1015px;
    min-height: 900px;
    background: #fff;
}

.rules-container-header {
    height: 63px;
    border-bottom: 1px solid #e4e0e0;
    padding: 0 10px;

    ul {
        li {
            float: left;
            padding: 0 20px;
            cursor: pointer;
            font-size: 16px;

            a {
                color: #666;
                line-height: 60px;
            }

            &:hover {
                //  border-bottom: 3px solid #FF6600;
                a {
                    color: #ff6600;
                    // line-height: 60px;
                }
            }

            &.active {
                border-bottom: 3px solid #ff6600;

                a {
                    color: #ff6600;
                    line-height: 60px;
                }
            }
        }
    }
}

.rules-container-text {
    padding: 25px 30px;
    font-size: 14px;
    line-height: 30px;
    color: #444444;
    text-align: justify;
}
</style>
