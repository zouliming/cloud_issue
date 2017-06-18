<template>
  <div>
    <el-dialog title="提示" v-model="dialogVisible" size="tiny" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <span>{{dialogMsg}}</span>
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
        notice_max_num: 10,
        timer_index: '',
        dialogMsg: ''
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
          _this.dialogMsg = data.msg
          _this.dialogVisible = true
          _this.has_unread_msg = true
          _this.timer_index = setInterval(function () {
            if (_this.has_unread_msg) {
              util.showMsgNotification('定时提醒', data.msg);
              _this.notice_max_num--;
              if (_this.notice_max_num <= 0) {
                window.clearInterval(_this.timer_index)
              }
            }
          }, 60000)
        }
        if (data.type == 3) {
          if (_this.$store.state.cards.current_group_id == data.msg.group_id) {
            _this.$store.dispatch('select_card', data.msg.group_id);
          }
          _this.$store.dispatch('set_current_task_id', data.msg.task_id);
        }
        if (data.type == 4) {
          window.location.reload();
        }
      })
    }
  }
</script>