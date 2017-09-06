//popup 页逻辑处理演示，您可以发送消息给到背景页
chrome.runtime.sendMessage({"action":"popup","data":{"message":"我来自popup,刚才有用户看我了。"}}, function(response){
    document.write(response);
});