<template>
  <div>
    <my-header></my-header>
    <div class="my_body">
       <transition name="bounce">
         <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import MyHeader from '../components/header'

export default {
  name: 'app',
  components: {
    MyHeader
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
    overflow: hidden;
    transition: all 218ms ease;
}
</style>
