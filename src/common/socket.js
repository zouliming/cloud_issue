
import Vue from 'vue'
import store from '../vuex/store'

const SOCKET_URL = 'ws://118.244.224.156:2346'
var ws = new WebSocket(SOCKET_URL)
ws.onopen = function () {
  // Web Socket 已连接上，使用 send() 方法发送数据
  ws.send(store.state.user.user_id);
};

Vue.prototype.socket_message = function (callback) {
  ws.onmessage = function (evt) {
    var data = evt.data;
    data = JSON.parse(data)
    console.log(data)
    callback(data)
  }
}


