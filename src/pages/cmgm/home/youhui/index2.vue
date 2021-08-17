<template>
    <vp-you-hui v-if="activitylist.length" :activitylist="activitylist" :className="className" :styleObj="styleObj" :activeType="activeType" :headerList="headerList"></vp-you-hui>
    <div v-else class="loadingBox">
         <p style='text-align:center;'>优惠活动加载中。。。</p>
    </div>
</template>
<script>
import vpYouHui from "../../../public/youhui/index"
export default {
    data(){
        return {
            activeType:"authDefined",
          activitylist:[],
          headerList:[
            {
                activity_cate_name: '全部',
                id: -1
            }
          ],
          styleObj:{
                width:1000,
                outBackground:"url(/static/public/image/common/bg.jpg) ",
                innerBackground:"#2d1e17",
                contentPadding:'20px 30px',
                contentBgc:'#eee'


          },
          className:"bannerHead"
        }
    },
    methods:{
        // 获取分类
        async getActiveCate () {
            let res = await this.$http.get(`${this.$HOST_NAME}/site/getActivityCateList?client_type=PC`)
            if (res && res.code == 200) {
                // 获取数据成功
                res.data && res.data.forEach((item, index) => {
                this.headerList.push(item)
                })
                
                
                
                this.getActivety()

            }
        },
        // 2019.04.25获取数据,假设获取到所有的活动数据
        async getActivety () {
            // /site/getActivityCateList
            let res = await this.$http.post(`${this.$HOST_NAME}/site/getActivityList`, {
                // type: 'popups',
                // // desc_client_type: 'html'
                client_type: 'PC'

            })
            if (res && res.code == 200) {
                this.activitylist = res.data && res.data.filter((item, index) => {
                    if (item.status === 'yes') {
                        if (item.description) {
                        try {
                            item.description = JSON.parse(item.description)
                        } catch (e) {
                            item.description = null
                        }
                        }
                        if (item.image) {
                        try {
                            item.image = JSON.parse(item.image)
                        } catch (e) {
                            item.image = null
                        }
                        }
                        if (item.url_link) {
                        try {
                            item.url_link = JSON.parse(item.url_link)
                        } catch (e) {
                            item.url_link = null
                        }
                        }
                        return item
                    }
                })
            }else {
            }

        },
    },
    created(){
        this.getActiveCate()
        // 获取数据
    },
    components:{
        vpYouHui
    }
}
</script>
<style lang="less" scoped>
    .loadingBox{
        width:100%;
        padding:20px 0;
        p{
            line-height: 30px;
            color:#fff;
            font-size:20px;
        }
    }
</style>