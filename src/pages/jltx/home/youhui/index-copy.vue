<template>
    <div>
        <vpHomeHeader />
        <vp-nav />
        <pub-activity show-banner :banner-style="bannerStyle" show-nav-out :nav-style="navStyle" show-type="alert" show-layout="column"
            :styles="cssStyle" :class-obj="classObj" widths="1200"></pub-activity>
        <vpFooter></vpFooter>
    </div>
</template>

<script>
import Activity from '../../../public/activity/index';
import vpHomeHeader from '../header.vue';
import vpNav from '../nav.vue';
import vpFooter from '../footer';
export default {
    name: 'index',
    components: {
        pubActivity: Activity,
        vpHomeHeader,
        vpNav,
        vpFooter
    },
    data() {
        return {
            clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            bannerStyle: {
                width: '100%',
                height: '300px',
                background: 'url(/static/478qp/img/banner_activity.png) no-repeat top',
                position: 'relative',
                margin: '0 auto',
                backgroundSize: 'cover'
            },
            navStyle: {
                bannerHead: {
                    width: '100%',
                    height: '60px',
                    margin: '0 auto',
                    backgroundColor: '#0f0f0f'
                },
                bannerUl: {
                    width: '1200px',
                    margin: '0 auto',
                    height: '100%'
                },
                li: {
                    float: 'left',
                    height: '100%',
                    textAlign: 'center',
                    boxSizing: 'border-box'
                },
                a: {
                    display: 'block',
                    position: 'relative',
                    height: '60px',
                    lineHeight: '60px',
                    fontSize: '16px',
                    color: '#999',
                    transition: '.3s'
                }
            },
            cssStyle: {
                background: '#1e1e1e',
                margin: '0 auto',
                width: '100%'
            },
            classObj: {
                column: true,
                qp478: true
            }
        };
    },
    created() {
        if (this.clientwidth > 1920) {
            this.bannerStyle.height = (300 * this.clientwidth) / 1920 + 'px';
        }
    }
};
</script>
