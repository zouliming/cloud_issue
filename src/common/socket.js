
import Vue from 'vue'

const SOCKET_URL = 'ws://118.244.224.156:2346'
var ws = new WebSocket(SOCKET_URL)
ws.onopen = function () {
  // Web Socket 已连接上，使用 send() 方法发送数据
};

Vue.prototype.socket_send = function (msg) {
  if (ws.readyState === 1) {
    ws.send(msg);
  }
}

Vue.prototype.socket_message = function (callback) {
  ws.onmessage = function (evt) {
    var data = evt.data;
    data = JSON.parse(data)
    console.log(data)
    callback(data)
  }
}


