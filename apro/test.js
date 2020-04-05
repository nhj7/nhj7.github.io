
(function (){
    try{
        var scripts = document.getElementsByTagName('script');
        var scriptUrl = (scripts[scripts.length-1].src);
        if( scriptUrl.indexOf("test.js") == -1 ) {  // 적용 시 app.js로 변경.
            console.log("11", scriptUrl);
            return;
        }
        var parameters = (scriptUrl.slice(scriptUrl.indexOf('?') + 1, scriptUrl.length)).split('&');
        var scriptParam = {};
        parameters.reduce(( scriptParam, cur, i ) => {        
            var tmp = cur.split("=");
            scriptParam[tmp[0]] = tmp[1];
            return scriptParam;
        } , scriptParam);
        console.log("scriptParam",scriptParam, scriptParam['v']);
        if(scriptParam['v'])
            sessionStorage.setItem('appVer', scriptParam['v']);
    }catch(e){ console.error(e); }
})();