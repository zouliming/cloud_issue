<template>
  <div class="header el-menu--dark">
    <el-row>
      <el-col :span="3">
        <img src="../assets/logo.png" class="logo">
      </el-col>
      <el-col :span="17">
        <el-menu theme="dark" :default-active="$route.path" class="my-el-menu" mode="horizontal" router>
          <el-menu-item index="/">任务流</el-menu-item>
          <el-menu-item index="/user">用户</el-menu-item>
          <el-menu-item v-bind:index="'/index/'+group.group_id" v-for="group in groups">
          {{group.group_name}}
          </el-menu-item>
        </el-menu>
        <div class="my_add_group"><i class="el-icon-plus" @click="add_group_box"></i></div>
      </el-col>
      <el-col :span="4">
        <my-login></my-login>
      </el-col>
    </el-row>

    <el-dialog :title="GroupBoxTtile" v-model="GroupBoxVisible" size="tiny">
      <span>
                <el-form :model="group_form" ref="group_form" label-width="100px" :rules="rules">
                    <el-form-item label="组名称" prop="group_name">
                        <el-input v-model="group_form.group_name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="add_group">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  import MyLogin from './login'
  import Api from '../common/api'

  export default {
    name: 'header',
    data: function () {
      return {
        groups: [],
        GroupBoxVisible: false,//编辑界面显是否显示
        GroupBoxTtile: '编辑',//编辑界面标题
        group_form: {
          group_id: '',
          group_name: ''
        },
        rules: {
          group_name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ]
        }
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
      },
      add_group_box() {
        this.group_form = {
          group_id: '',
          group_name: ''
        }
        this.GroupBoxVisible = true
        this.GroupBoxTtile = '添加'
        this.$nextTick(function () {
          this.$refs.group_form.resetFields();
        })
      },
      add_group() {
        var _this = this
        Api.post('/Group/add', this.group_form, function (res) {
          _this.groups.push({
            group_id: res.group_id,
            group_name: res.group_name
          });
          _this.GroupBoxVisible = false
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