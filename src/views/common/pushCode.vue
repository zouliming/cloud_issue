<template>
  <div v-if="dialogVisible">
    <el-popover ref="popover1" placement="right" width="400" trigger="click">
      <span>{{branch_name}}</span><br/><br/>
      <el-radio class="radio" v-model="pushData.push_address" label="test1" v-show="testVisible">test1环境</el-radio>
      <el-radio class="radio" v-model="pushData.push_address" label="test2" v-show="testVisible">test2环境</el-radio>
      <el-radio class="radio" v-model="pushData.push_address" label="pre" v-show="preVisible">预发布环境</el-radio>
      <br/><br/>
      <el-button type="primary" @click="pushCode"  :disabled="loading">更新代码</el-button>

      <el-row>
        <el-col :span="24">
          <br/>
          <p>输出结果：</p>
          <div v-html="pushCodeResult" style="height: 200px;overflow: scroll;"  v-loading="loading" element-loading-text="拼命加载中"></div>
        </el-col>
      </el-row>

    </el-popover>

    <el-button type="primary" icon="upload" size="mini" v-popover:popover1 style="margin-left: 40px;" @click="pushCodeResult=''"></el-button>
  </div>
</template>

<script>
  import Api from '../../common/api'

  export default {
    props: ['branch_name', 'card_id'],
    data() {
      return {
        dialogVisible: false,
        testVisible: true,
        preVisible: false,
        pushData: {
          'branch_name': this.branch_name,
          'push_address': 'test1',
          'card_id': this.card_id,
        },
        'pushCodeResult': '',
        'loading' : false
      }
    },
    methods: {
      pushCode() {
        var _this = this
        _this.pushCodeResult = ''
        _this.loading = true
        Api.post('/Pushcode/index', this.pushData, function (res) {
          if (res.status == 0) {
            _this.$message({
              type: 'error',
              message: res.info
            })
            return
          }
          _this.pushCodeResult = res.info
          _this.loading = false
        });
      }
    },
    created() {
      if (this.card_id == 2) {
        this.dialogVisible = true
        this.testVisible = true
        this.preVisible = false
        this.pushData.push_address = 'test1'
      }
      if (this.card_id == 6) {
        this.dialogVisible = true
        this.testVisible = false
        this.preVisible = true
        this.pushData.push_address = 'pre'
      }
    }
  }

</script>