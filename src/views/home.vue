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

<style>
.my_body{
    position: fixed;
    top: 64px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    transition: all 218ms ease;
    padding: 10px;
}
</style>