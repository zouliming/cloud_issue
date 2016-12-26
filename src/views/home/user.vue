<template>
  <div>
    <br/>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-button icon="plus" @click="add_user_box">添加用户</el-button>
          </div>
          <el-table :data="users" border style="width: 100%">
<el-table-column prop="user_name" label="用户名">
</el-table-column>
<el-table-column prop="user_email" label="邮箱">
</el-table-column>
<el-table-column prop="user_create_time" label="创建时间">
</el-table-column>
<el-table-column inline-template :context="_self" fixed="right" label="操作" width="100">
  <span>
                  <el-button type="text" size="small" @click="update_user_box(row)">编辑</el-button>
                  <el-button type="text" size="small" @click="del_user(row)">删除</el-button>
                </span>
</el-table-column>
</el-table>
</el-card>

</el-col>
<el-col :span="2">&nbsp;</el-col>
</el-row>

<!--编辑窗-->
<el-dialog :title="UserBoxTitle" v-model="UserBoxVisible" size="tiny" @close="clear_validate">
  <span>
      <el-form :model="user_form" ref="user_form" label-width="80px" :rules="user_rules">
          <el-form-item label="用户名" prop="user_name">
              <el-input v-model="user_form.user_name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="user_email">
              <el-input v-model="user_form.user_email"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="add_user">立即创建</el-button>
          </el-form-item>
      </el-form>
  </span>
</el-dialog>

</div>
</template>

<script>
  import Api from '../../common/api'

  export default {
    data() {
      return {
        UserBoxTitle: '添加',
        UserBoxVisible: false,
        user_form: {
          user_id: '',
          user_name: '',
          user_email: '',
          user_create_time: ''
        },
        user_rules: {
          user_name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ]
        },
        users: []
      }
    },
    created() {
      this.select_user()
    },
    methods: {
      add_user_box() {
        this.user_form = {
          user_id: '',
          user_name: '',
          user_email: '',
          user_create_time: ''
        }
        this.UserBoxVisible = true
        this.UserBoxTitle = '添加'
      },
      add_user() {
        var _this = this
        this.$refs.user_form.validate((valid) => {
          if (valid) {
            if (this.user_form.user_id == '') {
              Api.post('/User/add', this.user_form, function (res) {
                _this.UserBoxVisible = false
                _this.select_user()
              });
            } else {
              Api.post('/User/update', this.user_form, function (res) {
                _this.UserBoxVisible = false
                _this.select_user()
              });
            }
          } else {
            return false;
          }
        });

      },
      update_user_box(user) {
        this.user_form = JSON.parse(JSON.stringify(user))
        this.UserBoxVisible = true
        this.UserBoxTitle = '编辑'
      },
      select_user() {
        var _this = this
        Api.get('/User/select', function (res) {
          _this.users = res;
        });
      },
      del_user(user) {
        var _this = this
        this.$confirm('确认操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.post('/User/delete', { user_id: user.user_id }, function (res) {
            _this.$message({
              type: 'success',
              message: '删除成功!'
            })
            _this.users.splice(_this.users.indexOf(user), 1)
          })
        }).catch(() => {

        });
      },
      clear_validate(){
        this.$refs.user_form.resetFields();
      }
    }
  }
</script>