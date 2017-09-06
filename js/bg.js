var hosts = ["120.77.52.35","120.77.62.218","120.77.51.128","120.25.208.208","120.25.166.217","112.74.208.58","120.25.192.93","120.25.229.58","120.76.139.16","112.74.79.176"]
//背景消息监听
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse){
//    console.log(JSON.stringify(msg));
    var result = "no";
    if (msg["action"] == "close"){
           chrome.tabs.getSelected(function(tab){
                    console.log(tab);
                    chrome.tabs.remove(tab.id);
                console.log("over_close:" + tab.id);
            });
    }else if( msg["action"] == "page"){
      chrome.tabs.query({active:true},function(tab){
            console.log(tab[0].url);
            if (tab[0].url.indexOf("weixin.sogou.com/weixin") !=-1){
                sendMsg(tab[0].id,{"action":"ok"});
                result = "yes";
                var _host = hosts[Math.floor(Math.random() * 9)];
                console.log(_host);
                var config = {
                    mode: "pac_script",
                    pacScript: {
                      data: "var FindProxyForURL = function(url, host) {return 'PROXY "+_host+":7070';}"
                    }
                 };
                 chrome.proxy.settings.set({value:config,scope:'regular'},function(e){console.log(e);});

            }
    });
//        for (var index in msg["data"]){
//        var val = {"data":JSON.stringify(msg["data"][index])};
//            console.log(val);
//            $.post("http://localhost:9090/uuid",val,function(result){
//                console.log(result);
//            });
//        }
    }
    sendResponse({"action":result});
});
//页面导航完成页面加载事件监听
chrome.webNavigation.onCompleted.addListener(function(tab){
   console.log(tab)
   if (tab.url.indexOf("qq.com/s?src=") !=-1){
        chrome.tabs.remove(tab.tabId);
        console.log("over_close:" + tab.tabId);
   }
});

//向页面发送消息
function sendMsg(tabid,msg){
    console.log(tabid + ":send_content_msg:");
    console.log(JSON.stringify(msg));
    chrome.tabs.sendMessage(tabid,msg,{},function(response){});
}



