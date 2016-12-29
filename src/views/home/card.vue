<template>
  <div>
   <card-box :group_id="group_id"></card-box> 
  </div>
</template>

<script>
import Vue from 'vue'
import CardBox from './card_box'

export default {
  data () {
    return {
      group_id:this.$route.params.group_id
    }
  },
  methods: {
   
  },
  components: {
    'card-box': CardBox
  }
}
</script>

<style scoped>
  
</style>