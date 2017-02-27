<template>
  <div>
    <my-header></my-header>
    <div class="my_body">
      <transition name="bounce" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <my-notify></my-notify>
  </div>
</template>

<script>
  import MyHeader from './common/header'
  import util from '../common/util'
  import MyNotify from './common/notify'

  export default {
    name: 'app',
    components: {
      MyHeader,MyNotify
    }
  }
</script>

<style scoped>
.my_body{
  margin: 80px 10px 10px 10px;
}
</style>