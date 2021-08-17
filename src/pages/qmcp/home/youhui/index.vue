<template>
  <pub-activity :styles="cssStyle" widths="1010" :contentStyle="contentStyle"></pub-activity>
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
        background: '#bf3131',
        // backgroundSize: '100% 100%',
        backgroundPosition: 'center top'
      },
      contentStyle: {
        border: '1px solid #fff1d0',
        background: '#fff1d0',
        marginBottom: '20px',
        borderRadius: '5px',
        padding: '0 24px',
        minHeight: '480px'
      }

    }
  }
}
</script>
