<template>
  <div>
    <br/>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
        
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-button icon="plus">添加用户</el-button>
          </div>
          <el-table :data="tableData3" border>
            <el-table-column inline-template label="用户名">
              <div @click="update_user">{{ row.date }}</div>
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="address" label="邮箱" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="address" label="关注流程" show-overflow-tooltip>
            </el-table-column>
            <el-table-column :context="_self" inline-template label="操作">
              <div>
                <el-button size="small" type="danger" @click="handleDelete($index, row)">
                  删除
                </el-button>
              </div>
            </el-table-column>
          </el-table>
        </el-card>

      </el-col>
      <el-col :span="2">&nbsp;</el-col>
    </el-row>

    page2 view
    <button @click="notice">通知</button>
  </div>
</template>

<script>
import Vue from 'vue'
import util from '../../common/util'

export default {
  data () {
         return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
  },
  methods: {
    notice(){
      util.showMsgNotification('标题','内容');
    },
    update_user(row){
        console.log(row);
    }
  }
}
</script>