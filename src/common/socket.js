
import Vue from 'vue'
import store from '../vuex/store'

const SOCKET_URL = 'ws://118.244.224.156:2346'
var ws = new WebSocket(SOCKET_URL)
ws.onopen = function () {
  // Web Socket 已连接上，使用 send() 方法发送数据
  ws.send(store.state.user.user_id+':login');
};

Vue.prototype.socket_send = function (msg) {
  ws.send('all:' + msg);
}

Vue.prototype.socket_message = function (callback) {
  ws.onmessage = function (evt) {
    var received_msg = evt.data;
    console.log(received_msg)
    callback(received_msg)
  }
}


