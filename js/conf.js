function get_args(){
    var plugin_host = localStorage.plugin_host;
    plugin_host = plugin_host ? plugin_host:"http://192.168.1.202:9090";
    var auth_host = localStorage.auth_host;
    auth_host = auth_host ? auth_host : "http://dev.admin.puzhizhuhai.com";
    console.log(plugin_host);
    console.log(auth_host);
    return {"plugin_host":plugin_host,"auth_host":auth_host};
}

