export default {
    //桌面通知
    showMsgNotification(title, msg, icon) {
        var options = {
            body: msg,
            icon: icon || "image_url"
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
                setTimeout(function () {
                    //instance.close();
                    alert('有新消息啦');
                }, 3000)
                console.log(instance.body)
            };
            instance.onclose = function () {
                // Something to do  
            };
            console.log(instance)
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
