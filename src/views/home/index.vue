<template>
  <div>
    <div class="ui four column grid">
      <div class="column" v-for="group in groups">
        <a class="ui fluid card" :href="/index/+group.group_id ">
          <div class="content">
            <div class="header"> {{group.group_name}} <i class="remove icon my_del_group" v-on:click.prevent="del_group(group)"></i></div>
            <div class="meta">
              <span class="category">描述</span>
            </div>
            <div class="description">
              <p></p>
            </div>
          </div>
          <div class="extra content">
            <div class="right floated author">
              fangxingguang
            </div>
          </div>
        </a>
      </div>
      <div class="my_add_group"><i class="el-icon-plus" @click="add_group_box"></i></div>
    </div>

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
  import Vue from 'vue'
  import Api from '../../common/api'

  export default {
    data() {
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
      },
      del_group(group) {
        var _this = this
        Api.post('/Group/delete', {'group_id':group.group_id}, function (res) {
          _this.select_group()
        });
      }
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
</style>