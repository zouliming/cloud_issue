<template>
  <div>
    <my-header></my-header>
    <div class="my_body">
      <transition name="bounce" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import MyHeader from './common/header'
  import util from '../common/util'

  export default {
    name: 'app',
    components: {
      MyHeader
    },
    created() {
      this.socket_message(function(received_msg){
        util.showMsgNotification('系统消息', received_msg)
      })
    }
  }
</script>

<style scoped>
.my_body{
    position: fixed;
    top: 64px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    transition: all 218ms ease;
    padding: 10px;
}
</style>