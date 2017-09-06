
//当页面被浏览器匹配后，触发消息监听；
chrome.extension.onMessage.addListener(
  function(msg, sender, sendResponse) {
    console.log(JSON.stringify(msg));
     if (msg["action"] == "ok"){
           goNext();
    }else{
        procNextRequest();
    }
});

function goNext(){
    console.log("star...nextpage");
    $("#sogou_next")[0].click();
}

function procNextRequest(){
    console.log("procNext start.");
    setTimeout(function(){
       sendMsg({"action":"page","data":"isnextpage"});
    },15000);
    console.log("procNext end.");
}

//处理当前页文章
function procCurr(){

    var curr_page = [];
    console.log("procCurr start.");
    $("#main div.news-box ul li").each(function(index){
        console.log(index);
        try{
        var url = $(this).find("div h3 a")[0].href;
        $(this).find("div h3 a")[0].click();
        console.log(url);
        }catch(e){
            var url = $(this).find("div a")[0].href;
        $(this).find("div a")[0].click();
        console.log(url);
        }
    }
    );
    console.log("procCurr end.");
}

//发送消息给后台
function sendMsg(msg){
  chrome.extension.sendMessage(msg, function(response) {
      console.log(response);
      if (response["action"] == "no"){
        procNextRequest();
      }
  });
}
    procCurr();
    procNextRequest();


