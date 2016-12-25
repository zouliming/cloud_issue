
import Vue from 'vue'

const SOCKET_URL = 'ws://118.244.224.156:2346'
var ws = new WebSocket(SOCKET_URL)

Vue.prototype.socket_send = function (msg) {
  ws.send('all:'+msg);
}

Vue.prototype.socket_message = function (callback) {
  ws.onmessage = function (evt) {
    var received_msg = evt.data;
    console.log(received_msg)
    callback(received_msg)
  }
}


