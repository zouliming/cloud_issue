<template>
  <div class="header el-menu--dark">
    <el-row>
      <el-col :span="3">
        <img src="../assets/logo.png" class="logo">
      </el-col>
      <el-col :span="17">
        <el-menu theme="dark" :default-active="$route.path" class="my-el-menu" mode="horizontal" router>
          <el-menu-item index="/index">任务流</el-menu-item>
          <el-menu-item index="/user">用户</el-menu-item>
        </el-menu>
        <div class="my_add_group"><i class="el-icon-plus"></i></div>
      </el-col>
      <el-col :span="4">
        <my-login></my-login>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import MyLogin from './login'
  import Api from '../common/api'
  
  export default {
    name: 'header',
    data: function () {
      return {
        groups: []
      }
    },
    components: {
      'my-login': MyLogin
    },
    created() {
      this.select_group()
    },
    methods: {
      select_group() {
        var _this = this
        Api.get('/Group/select', function (res) {
          _this.groups = res;
        });
      }
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
  .my-el-menu{
    display: inline-block;
  }
  .my_add_group{
    display: inline-block;
    height: 55px;
    line-height: 55px;
    overflow: auto;
  }
  .my_add_group i{
    font-size: 14px;
    color: #ddd;
    cursor: pointer;
  }
  .my_add_group i:hover{
    color: #20a0ff;
  }
</style>