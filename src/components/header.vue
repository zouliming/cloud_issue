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
        <el-dropdown style="float:right;margin:15px 10px 0 0;">
          <el-button>
            超级管理员<i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'header'
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