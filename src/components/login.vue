<template>
  <div>
    <el-dropdown style="float:right;margin:15px 10px 0 0;" @command="logout">
<el-button>
  {{user.user_name}}<i class="el-icon-caret-bottom el-icon--right"></i>
</el-button>
<el-dropdown-menu slot="dropdown">
  <el-dropdown-item>退出</el-dropdown-item>
</el-dropdown-menu>
</el-dropdown>

<el-dialog title="登录" v-model="login_box_show" size="tiny" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
  <p>请输入您的用户名</p><br/>
  <p>
    <el-input v-model="user_form.user_name">
    </el-input>
  </p>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="login">确 定</el-button>
  </span>
</el-dialog>

</div>

</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Api from '../common/api'

  export default {
    data() {
      return {
        login_box_show: false,
        user_form: {
          user_name: ''
        }
      }
    },
    methods: {
      ...mapActions(['SIGNIN','SIGNOUT']),
      login() {
        var _this = this
        Api.post('/Login/index', this.user_form, function (res) {
          if (res.status) {
            _this.login_box_show = false
            _this.SIGNIN(res.info)
            _this.$message({
              type: 'success',
              message: _this.user_form.user_name + ' 欢迎您！'
            });
            _this.$router.push('/index')
          } else {
            _this.$message.error(res.info);
          }
        });
      },
      logout() {
        this.SIGNOUT()
        this.login_box_show = true
      }
    },
    created() {
      if (!this.user) {
        this.login_box_show = true
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