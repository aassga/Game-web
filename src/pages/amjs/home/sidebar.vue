<template>
    <div class="gywm_meun">
        <div class="kjs">
        </div>
        <ul>
            <li v-for="(item,index) in footList" :key="index">
                <a href="javascript:void(0)" @click="goto(item.link)">
                    {{item.name}}
                </a>
            </li>

        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            footList: [
                { name: '关于我们', link: '/home/about/guanyu' },
                { name: '取款帮助', link: '/home/about/qukuan' },
                { name: '存款帮助', link: '/home/about/cunkuan' },
                { name: '代理教程', link: '/home/agent' },
                { name: '联系我们', link: '/home/about/lianxi' },
                { name: '常见问题', link: '/home/about/question' },
                { name: '责任博彩', link: '/home/about/lottery' }
            ]
        };
    },
    methods: {
        goto(link) {
            this.$router.push({ path: link });
        }
    }
};
</script>
<style lang="less" scoped>
.gywm_meun {
    position: relative;
    background: url(/static/amjs/img/s_title.jpg) no-repeat center top;
    width: 210px;
    height: 448px;
    float: left;
    margin-right: 18px;
    margin-top: 35px;
    .kjs {
        width: 100%;
        color: #fff;
        text-align: center;
        height: 50px;
        top: 0px;
        position: absolute;
    }
    .kjs:before{
        content: '';
        width: 210px;
        display: block;
        height: 60px;
        background: url(/static/amjs/img/s_title.png) no-repeat center top;
        border-bottom: 1px solid #393939;
    }

    ul {
        margin-top: 70px;
    }
    li {
        width: 210px;
        height: 43px;
        color: #dfdfdf;
        line-height: 43px;
        text-align: left;
        text-indent: 20px;
        font-size: 14px;
        a {
            color: #dfdfdf;
            line-height: 43px;
            height: 43px;
            display: block;
            border-bottom: 1px solid #393939;
        }
        a:after{
                content: '';
                float: right;
                width: 16px;
                height: 11px;
                display: block;
                margin-top: 16px;
                background: url(/static/amjs/img/icon_arrow.png) no-repeat center top;
                margin-right: 15px;
        }
    }

   
    li:hover a {
        color: #f8e678;
    }
     li:hover a:hover:after{
       background: url(/static/amjs/img/icon_arrow.png) no-repeat center bottom;
    }
}
</style>