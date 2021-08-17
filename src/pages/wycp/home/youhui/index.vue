<template>
  <pub-activity :styles="cssStyle" widths="960"></pub-activity>
</template>

<script>
import Activity from '../../../public/activity/index'

export default {
  name: 'index',
  components: {
    pubActivity: Activity
  },
  data () {
    return {
      cssStyle: {
        paddingTop: '20px',
        background: '#510802 url(/static/wycp/img/bg_promotions.png) 0 0 no-repeat',
        backgroundSize: '100%',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      },
      contentStyle: {
        border: '1px solid #ccc',
        // background: '#fff1d0',
        marginBottom: '20px',
        borderRadius: '5px',
        padding: '20px 19px',
        minHeight: '480px'
      }
    }
  }
}
</script>
