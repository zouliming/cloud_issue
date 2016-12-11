<template>
  <div>
    page2 view
    <button @click="notice">通知</button>
  </div>
</template>

<script>
import Vue from 'vue'
import util from '../common/util'

export default {
  data () {
    return {
    }
  },
  methods: {
    notice(){
      util.showMsgNotification('标题','内容');
    }
  }
}
</script>
