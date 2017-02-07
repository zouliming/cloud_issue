<template>
  <div>
    <el-dialog title="提示" v-model="dialogVisible" size="tiny" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <span>你有新的任务啦！</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogClose">我知道了</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import util from '../../common/util'
  import socket from '../../common/socket'

  export default {
    data() {
      return {
        dialogVisible: false,
        has_unread_msg: false,
        timer_index: ''
      };
    },
    methods: {
      dialogClose() {
        this.dialogVisible = false
        this.has_unread_msg = false
        window.clearInterval(this.timer_index)
      }
    },
    created() {
      var _this = this
      //发送身份  接收消息回调
      socket.init(this.$store.state.user.user.user_id, function (data) {
        if (data.type == 1) {
          util.showMsgNotification('系统消息', data.msg)
        }
        if (data.type == 2) {
          _this.dialogVisible = true
          _this.has_unread_msg = true
          _this.timer_index = setInterval(function () {
            if (_this.has_unread_msg) {
              util.showMsgNotification('定时提醒', data.msg)
            }
          }, 60000)
        }
        if (data.type == 3) {
          if (_this.$store.state.cards.current_group_id == data.msg.group_id) {
            _this.$store.dispatch('select_card', data.msg.group_id);
          }
          _this.$store.dispatch('set_current_task_id', data.msg.task_id);
        }
      })
    }
  }
</script>