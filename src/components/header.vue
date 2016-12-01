<template>
  <div class="header el-menu--dark" >
    <el-row>
      <el-col :span="3">
        <img src="../assets/logo.png" class="logo">
      </el-col>
      <el-col :span="17">
        <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="/page2">第二页</el-menu-item>
           <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="4">
        
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
  .logo{
    height:40px;
    margin:10px;
  }
</style>
