<template>
    <div>
        <!-- <vp-home-header></vp-home-header>
        <vp-nav></vp-nav>
        <vp-header-pic :headerImg="headerImg"></vp-header-pic>
        <vpqipai></vpqipai>
        <vpFooter></vpFooter> -->
    </div>
</template>
<script>
import vpHeaderPic from '../headerPic';
import vpqipai from '../../../public/qipai/478qp.vue';
import vpHomeHeader from '../header.vue';
import vpNav from '../nav.vue';
import vpFooter from '../footer';
export default {
    data() {
        return {
            headerImg: '/static/478qp/img/banner/banner_chess.png'
        };
    },
    methods: {},
    created() {},
    mounted() {},
    watch: {},
    components: {
        vpqipai,
        vpHeaderPic,
        vpHomeHeader,
        vpNav,
        vpFooter
    },
    computed: {}
};
</script>
