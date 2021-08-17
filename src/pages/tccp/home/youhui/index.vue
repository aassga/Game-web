<template>
    <div class="wrapper">
        <div class="banner"></div>
        <pub-activity show-banner :banner-style="bannerStyle" :styles="cssStyle" :class-obj="classObj" noTitle="noTitle" widths="1140"
            show-nav :nav-style="navStyle"></pub-activity>
    </div>

</template>

<script>
import Activity from '../../../public/activity/index';
export default {
    name: 'index',
    components: {
        pubActivity: Activity,
    },
    data() {
        return {
            lantern: '',
            bannerStyle: {},
            cssStyle: {
                padding: '20px 20px 20px',
                // background: 'url(/static/tccp/img/bg_activity.jpg)',
                backgroundSize: 'contain',
                maxWidth: '1920px',
                minWidth: '1200px',
                margin: '0 auto',
            },
            navStyle: {
                bannerHead: {
                    width: '1100px',
                    height: '50px',
                    margin: '0 auto',
                    backgroundColor: '#22052b'
                },
                bannerUl: {
                    width: '100%',
                    margin: '0 auto',
                    height: '100%'
                },
                li: {
                    float: 'left',
                    width: 'auto',
                    height: '100%',
                    textAlign: 'center',
                    boxSizing: 'border-box'
                },
                a: {
                    display: 'block',
                    position: 'relative',
                    height: '50px',
                    lineHeight: '50px',
                    fontSize: '14px',
                    margin: '0 8px',
                    padding: '0 20px'
                }
            },
            classObj: {
                tccp: true,
                navWidth: true
            }
        };
    },
    methods: {
    },
    mounted() {
    }
};
</script>
<style lang="less" scoped>
.wrapper {
    background: #280830; 
    .banner {
    max-width: 1920px;
    height: 400px;
    margin: 0 auto;
    background: url('/static/tccp/img/money.jpg') center top/ cover no-repeat;
  }
}
</style>