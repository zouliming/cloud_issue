
import Vue from 'vue'
const SOCKET_URL = 'ws://118.244.224.156:2346'

export default {
    init: function (init_send_msg, received_fun) {
        console.log(SOCKET_URL)
        var ws = new WebSocket(SOCKET_URL)
        ws.onopen = function () {
            // Web Socket 已连接上，使用 send() 方法发送数据
            console.log('socket open')
            ws.send(init_send_msg);

            ws.onmessage = function (evt) {
                var data = evt.data;
                data = JSON.parse(data)
                console.log(data)
                received_fun(data)
            }
        };
    },
    send(msg) {
        ws.send(msg);
    }
}


