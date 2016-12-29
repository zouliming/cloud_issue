<template>
  <div>
  </div>
</template>

<script>
  import util from '../../common/util'
  import socket from '../../common/socket'

  export default {
    created() {
      var _this = this;
      //发送身份  接收消息回调
      socket.init(this.$store.state.user.user.user_id, function (data) {
        if (data.type == 1) {
          util.showMsgNotification('系统消息', data.msg)
        }
        if (data.type == 2) {
          alert(data.msg)
        }
        if (data.type == 3) {
          _this.$store.dispatch('select_card', data.msg.group_id);
        }
      })
    }
  }
</script>