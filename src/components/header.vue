<template>
  <div class="header el-menu--dark">
    <el-row>
      <el-col :span="3">
        <img src="../assets/logo.png" class="logo">
      </el-col>
      <el-col :span="17">
        <el-menu theme="dark" :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/index">任务流</el-menu-item>
          <el-menu-item index="/user">用户</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <my-login></my-login>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import MyLogin from './login'

export default {
  name: 'header',
  components: {
    'my-login': MyLogin
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    height: 40px;
    margin: 10px;
  }
  
  .el-menu--horizontal .el-menu-item.is-active {
    background-color: rgba(0, 0, 0, .2);
  }
  
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    transition: right 218ms ease;
  }
</style>