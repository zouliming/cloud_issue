<template>
  <div>
    index view
    <button v-on:click="ajax_test">ajax</button>
  </div>
</template>

<script>
import api from '../api/common'
export default {
  data () {
    return {
    }
  },
  methods: {
    ajax_test () {
      api.login({})
    }
  }
}
</script>