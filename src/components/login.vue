<template>
  <el-dropdown style="float:right;margin:15px 10px 0 0;" @command="logout">
    <el-button>
      {{user.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState,mapActions } from 'vuex'
  export default {
    data(){
      return{
          user_form:{
            name:''
          }
      }
    },
    methods: {
      ...mapActions(['SIGNIN','SIGNOUT']),
      login_box() {
        this.$prompt('请输入您的姓名', '登录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.user_form.name = value
          this.SIGNIN(this.user_form)
          this.$message({
            type: 'success',
            message: value + ' 欢迎您！'
          });
        }).catch(() => {
              
        });
      },
      logout(){
        this.SIGNOUT()
        this.login_box()
      }
    },
    created(){
      if(!this.user.name){
        this.login_box()
      }
    },
    computed: {
       ...mapState(['user'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>