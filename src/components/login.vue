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

</div>

</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Api from '../common/api'

  export default {
    data() {
      return {
       
      }
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
    },
    computed: {
       ...mapState(['user'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>