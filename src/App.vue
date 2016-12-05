<template>
  <div id="app">
    <my-header></my-header>

    <!--<my-menu></my-menu>-->

    <div class="my_body">
      <router-view></router-view>
    </div>
    
    <!--<my-footer></my-footer>-->
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
*{
  margin:0;
  padding:0;
}
*,:after,:before{box-sizing:border-box}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.my_body{
    position: fixed;
    top: 64px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    transition: all 218ms ease;
    padding:10px;
}
</style>
