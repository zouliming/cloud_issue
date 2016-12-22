<template>
  <section class="login_body">
    <el-form :model="login_form" :rules="rules" ref="login_form" label-position="left" label-width="0px" class="login-box">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="user_name">
        <el-input type="text" v-model="login_form.user_name" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
<el-button type="primary" style="width:100%;" @click.native.prevent="login">登录</el-button>
</el-form-item>
</el-form>
</section>

</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Api from '../common/api'

  export default {
    data() {
      return {
        login_form: {
          user_name: ''
        },
        rules: {
          user_name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ]
        }
      };
    },
    methods: {
       ...mapActions(['SIGNIN']),
      login(ev) {
        var _this = this;
        this.$refs.login_form.validate((valid) => {
          if (valid) {
            var _this = this
            Api.post('/Login/index', this.login_form, function (res) {
              if (res.status) {
                _this.login_box_show = false
                _this.SIGNIN(res.info)
                _this.$message({
                  type: 'success',
                  message: _this.login_form.user_name + ' 欢迎您！'
                });
                _this.$router.replace('/');
              } else {
                _this.$message.error(res.info);
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
	.login_body {
		margin: 0px;
		padding: 0px;
		background: #1F2D3D;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		font-weight: 400;
		-webkit-font-smoothing: antialiased;
    overflow: hidden;
    height:100% ;
    width:100%;
	} 
  .login-box {
    padding: 20px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 120px auto;
    width: 400px;
    border: 2px solid #8492A6;
  }
  
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
 
</style>