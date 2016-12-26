export default {
    //桌面通知
    showMsgNotification(title, msg, icon) {
        var options = {
            body: msg,
            icon: icon || "data:image/png;base64,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"
        };
        var Notification = window.Notification || window.mozNotification || window.webkitNotification;
        if (Notification && Notification.permission === "granted") {
            var instance = new Notification(title, options);
            instance.onclick = function () {
                // Something to do  
            };
            instance.onerror = function () {
                // Something to do  
            };
            instance.onshow = function () {
                // Something to do  
                //                          setTimeout(instance.close, 3000);  
                // setTimeout(function () {
                //     //instance.close();
                //     alert('有新消息啦');
                // }, 3000)
                // console.log(instance.body)
            };
            instance.onclose = function () {
                // Something to do  
            };
            //console.log(instance)
        } else if (Notification && Notification.permission !== "denied") {
            Notification.requestPermission(function (status) {
                if (Notification.permission !== status) {
                    Notification.permission = status;
                }
                // If the user said okay  
                if (status === "granted") {
                    var instance = new Notification(title, options);
                    instance.onclick = function () {
                        // Something to do  
                    };
                    instance.onerror = function () {
                        // Something to do  
                    };
                    instance.onshow = function () {
                        // Something to do  
                        //setTimeout(instance.close, 3000);
                    };
                    instance.onclose = function () {
                        // Something to do  
                    };
                } else {
                    return false
                }
            });
        } else {
            return false;
        }
    }
}
