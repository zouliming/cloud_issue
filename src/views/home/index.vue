<template>
  <div>
    <div class="ui four column grid">
      <div class="column" v-for="group in groups">
        <router-link v-bind:to="'/index/'+group.group_id" class="ui fluid card">
          <div class="content">
            <div class="header"> {{group.group_name}} <i class="remove icon my_del_group" v-on:click.prevent="del_group(group)"></i></div>
            <div class="meta">
              <span class="category">{{group.group_des}} </span>
            </div>
            <div class="description">
              <p></p>
            </div>
          </div>
          <div class="extra content">
            <div class="left floated author">
              创建人：{{group.user_name}}
            </div>
            <div class="right floated author">
              <button class="ui circular write icon button" v-on:click.prevent="update_group_box(group)" v-bind:class="user.user_id == group.user_id?'teal':''">
                <i class="write icon"></i>
              </button>
            </div>
          </div>
        </router-link>
      </div>
      <div class="my_add_group"><i class="el-icon-plus" @click="add_group_box"></i></div>
    </div>

    <el-dialog :title="GroupBoxTtile" v-model="GroupBoxVisible" size="tiny">
      <span>
      <el-form :model="group_form" ref="group_form" label-width="100px" :rules="rules">
          <el-form-item label="组名称" prop="group_name">
              <el-input v-model="group_form.group_name"></el-input>
          </el-form-item>
          <el-form-item label="组描述">
             <el-input type="textarea" v-model="group_form.group_des"></el-input>
          </el-form-item>
          <el-form-item label="参与者">
            <el-select v-model="group_form.group_parter" multiple placeholder="请选择">
              <el-option
                v-for="user in users"
                :label="user.user_name"
                :value="user.user_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="add_group">提交</el-button>
          </el-form-item>
      </el-form>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Api from '../../common/api'
  import { mapState} from 'vuex'

  export default {
    data() {
      return {
        groups: [],
        GroupBoxVisible: false,//编辑界面显是否显示
        GroupBoxTtile: '编辑',//编辑界面标题
        group_form: {
          group_id: '',
          group_name: '',
          group_des: '',
          group_parter: []
        },
        rules: {
          group_name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ]
        },
        users: []
      }
    },
    created() {
      this.select_group()
      this.select_user()
    },
    computed:{
       ...mapState(['user'])
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
          group_name: '',
          group_des: '',
          group_parter: []
        }
        this.GroupBoxVisible = true
        this.GroupBoxTtile = '添加项目'
        this.$nextTick(function () {
          this.$refs.group_form.resetFields();
        })
      },
      add_group() {
        var _this = this
        if (_this.group_form.group_id == '') {
          Api.post('/Group/add',this.group_form, function (res) {
            _this.groups.push(res)
            _this.GroupBoxVisible = false
          });
        } else {
          Api.post('/Group/update', this.group_form, function (res) {
            _this.select_group()
            _this.GroupBoxVisible = false
          });
        }

      },
      del_group(group) {
        var _this = this
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.post('/Group/delete', { 'group_id': group.group_id }, function (res) {
            _this.select_group()
            _this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        }).catch(() => {

        });
      },
      update_group_box(group) {
        if(this.user.user_id != group.user_id){
          this.$message({
              type: 'error',
              message: '只有创建人才能编辑哦!'
            });
            return
        }
        this.group_form = {
          group_id: group.group_id,
          group_name: group.group_name,
          group_des: group.group_des,
          group_parter: group.group_parter
        }
        this.GroupBoxVisible = true
        this.GroupBoxTtile = '编辑项目'
        this.$nextTick(function () {
          this.$refs.group_form.resetFields();
        })
      },
      select_user() {
        var _this = this
        Api.get('/User/select', function (res) {
          _this.users = res;
        });
      },
    },
    components: {
    }
  }
</script>

<style scoped>
  .my_add_group{
    line-height: 140px;
    font-size: 20px;
  }
  .my_del_group{
    float: right;
    margin-right: -15px;
    margin-top: -5px;
    font-size: 12px;
    color: #8492a6;
    height: 30px;
    width: 30px;
  }
  .el-icon-plus{
    cursor: pointer;
  }
</style>