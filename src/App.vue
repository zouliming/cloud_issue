<template>
  <div id="app">
    <my-header></my-header>

    <my-menu></my-menu>

    <div style="margin-left:220px;margin-top:20px;">
      <router-view></router-view>
    </div>
    
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './components/header'
import MyFooter from './components/footer'
import MyMenu from './components/menu'

export default {
  name: 'app',
  components: {
    MyHeader, MyFooter, MyMenu
  }
}
</script>

<style>
body{
  margin:0;
  padding:0;
  height:100%;
  overflow:hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
