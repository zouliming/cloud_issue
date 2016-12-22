<template>
  <div class="header el-menu--dark">
    <el-row>
      <el-col :span="3">
        <img src="../../assets/logo.png" class="logo">
      </el-col>
      <el-col :span="17">
        <el-menu theme="dark" :default-active="$route.path" class="my-el-menu" mode="horizontal" router>
          <el-menu-item index="/">项目</el-menu-item>
          <el-menu-item index="/user">用户</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <el-dropdown style="float:right;margin:15px 10px 0 0;" @command="logout">
<el-button>
  {{user.user_name}}<i class="el-icon-caret-bottom el-icon--right"></i>
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
  import Api from '../../common/api'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'header',
    data: function () {
      return {
       
      }
    },
    computed: {
       ...mapState(['user'])
    },
    methods: {
      ...mapActions(['SIGNOUT']),
      logout() {
        var _this = this
        Api.post('/Login/logout', {}, function (res) {
          if (res.status) {
            _this.SIGNOUT()
            _this.$router.replace('/login');
          } else {
            _this.$message.error(res.info);
          }
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
  
  .my-el-menu {
    display: inline-block;
  }
  
  .my_add_group {
    display: inline-block;
    height: 55px;
    line-height: 55px;
    overflow: auto;
  }
  
  .my_add_group i {
    font-size: 14px;
    color: #ddd;
    cursor: pointer;
  }
  
  .my_add_group i:hover {
    color: #20a0ff;
  }
</style>