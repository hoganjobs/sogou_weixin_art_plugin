//选项页的功能逻辑代码在下面，通常用来做些配置，这些配置值将给到插件用户做选择

(function(){
console.log("in_options.html");
$("#enterbtn").click(function(){
    console.log("in_enter_function");
    save_args();
});
$("#closebtn").click(function(){
    console.log("in_close_function");
    window.close();
});
var plugin_host = localStorage.plugin_host;
plugin_host = plugin_host ? plugin_host:"http://192.168.1.202:9090";
var auth_host = localStorage.auth_host;
auth_host = auth_host ? auth_host : "http://dev.admin.puzhizhuhai.com";

$("#plugin_host").val(plugin_host);
$("#auth_host").val(auth_host);
})();

function save_args(){
    //保存用户设置的参数
    var plugin_host = $("#plugin_host").val();
    if(plugin_host == ""){
        console.log("plugin_host is null.");
        return;
    }
    var auth_host = $("#auth_host").val();
    if(auth_host == ""){
        console.log("auth_host is null.");
        return;
    }
    localStorage.plugin_host = plugin_host;
    localStorage.auth_host = auth_host;

    chrome.notifications.create(
            "插件配置成功",
            {
            "type":"list",
            "iconUrl":"images/msg.png",
            "title":"插件配置成功",
            "message": "msg",
            "items":[
            {"title":"插件服务器:","message":localStorage.plugin_host},
            {"title":"鉴权服务器:","message":localStorage.auth_host}
            ],
            },function(notificationid){
                console.log("notfication:" + notificationid);
            }
            );

    console.log(localStorage.plugin_host);
    console.log(localStorage.auth_host);
}

