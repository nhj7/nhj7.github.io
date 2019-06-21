try{
if(typeof adn_load_flag=="undefined") var adn_load_flag=false;
/*if(typeof adn_flag=="undefined") var adn_flag=false;*/
if(typeof adn_status=="undefined") var adn_status=0;
if(typeof adn_send=="undefined") var adn_send=0;
if(typeof log_status=="undefined")var log_status=false;
adn_status++;

if(!document.getElementById("adn_container")){
var _adn_tmp_div=document.createElement("DIV");
_adn_tmp_div.setAttribute("id", "adn_container");
_adn_tmp_div.setAttribute("style", "display:none");
document.getElementsByTagName("body")[0].appendChild(_adn_tmp_div);
}
  
var _adn_r=document.referrer;
var _adn_l=document.location;
var _adn_h=document.location.hostname;
var _adn_t=Math.round((new Date()).getTime() / 1000);
var _adn_p=(document.location.protocol=="https:") ? "https://" : "http://";
var _adn_id="";
var _adn_cinfo="";
var _adn_uid="";

function _getParameterByName(name, url) {
if (!url) url = window.location.href;
name = name.replace(/[\[\]]/g, "\\$&");
var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
results = regex.exec(url);
if(!results) return null;
if(!results[2]) return '';
return decodeURIComponent(results[2].replace(/\+/g, " "));
}
window.onload = function()
{    
	if(location.pathname=="/shop/shopbrand.html")
	{
		try {
			var adn_searh_txt = "";
			var frm = document.getElementsByName('form_search');
			//console.log("frm.length==>"+frm.length);
			if(frm.length>0)
			{
				adn_searh_txt = frm[0].prize1.value;
			}
			//console.log("adn_searh_txt==>"+adn_searh_txt);
			if($(".item-wrap > .item-cont").length > 0)
			{
				//console.log("저장==>"+adn_searh_txt);
				fn_adn_shop_search(adn_searh_txt);
			}
		}catch (exception){}
	}
	else if(location.pathname=="/m/search.html")
	{
		try {
			var adn_searh_txt = "";
			var frm = document.getElementsByName('search');
			//console.log("frm.length==>"+frm.length);
			if(frm.length>0)
			{
				adn_searh_txt = frm[0].s.value;
			}
			//console.log("adn_searh_txt==>"+adn_searh_txt);
			if($(".listPic").length > 0)
			{
				//console.log("저장==>"+adn_searh_txt);
				fn_adn_shop_search(adn_searh_txt);
			}
		}catch (exception){}
	}
	else if(location.pathname=="/product/search.html")
	{
		try {
			var adn_searh_txt = "";
			adn_searh_txt = _getParameterByName("keyword", document.location.href);
	
			//console.log("adn_searh_txt==>"+adn_searh_txt);
			if($(".prdImg").length > 0)
			{
				//console.log("저장==>"+adn_searh_txt);
				fn_adn_shop_search(adn_searh_txt);
			}
		}catch (exception){}
	}
	else if(location.pathname=="/shop/goods/goods_search.php")
	{
		try {
			var adn_searh_txt = "";
			var frm = document.getElementsByName('frmList');
			//console.log("frm.length==>"+frm.length);
			if(frm.length>0)
			{
				adn_searh_txt = frm[0].sword.value;
			}
			//console.log("adn_searh_txt==>"+adn_searh_txt);
			if($("#mlist").length > 0)
			{
				//console.log("저장==>"+adn_searh_txt);
				fn_adn_shop_search(adn_searh_txt);
			}
		}catch (exception){}
	}
};

function fn_adn_shop_search(k) {
	var adn_search_chk = false;
	var adn_search_info = "";
	var last_adn_search = "";
	
	try {
		var adn_search_val = localStorage.getItem('adn_shop_search');
		//console.log(adn_search_val);	
		
		if (typeof(adn_search_val) != "undefined" && adn_search_val != null)
		{
			var adn_search_arr = adn_search_val.split("^@^");
			for (var i = 0; i < adn_search_arr.length; i++) {
				if (adn_search_arr[i] != "") 
				{
					if (adn_search_arr[i] == k) 
					{
						last_adn_search = k;
						adn_search_chk = true
					} else adn_search_chk = false;
					if (!adn_search_chk) 
					{
						if (adn_search_info != "") adn_search_info += "^@^" + adn_search_arr[i];
						else adn_search_info += adn_search_arr[i]
					}
				}
				if (i > 10) break
			}
		}
		if (last_adn_search != "") {
			if (adn_search_info != "") adn_search_info = last_adn_search + "^@^" + adn_search_info;
			else adn_search_info = last_adn_search
		} else {
			if (adn_search_info != "") adn_search_info = k + "^@^" + adn_search_info;
			else adn_search_info = k
		}
		localStorage.setItem('adn_shop_search', adn_search_info);
	}catch (exception){}
}

try {
if(_adn_r.indexOf("naver.com") != -1) {
var q = _getParameterByName("query", _adn_r);
if(q){
var _adn_k=function(){try{/*var q=$('#q').val();*/if(q!=''){q=q.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g,"");q=encodeURIComponent(q);if(q!=''){var u='http://kn.acrosspf.com/adn_k.ad?k='+q;$.ajax({type:'get',url:u,data:{todo:"jsonp"},dataType:"jsonp",crossDomain:true,cache:false,success:function(d){}});}}}catch(e){}};
$( document ).ready(_adn_k);
}

}else if(_adn_r.indexOf("daum.net") != -1) {
var q = _getParameterByName("q", _adn_r);
if(q){
var _adn_k=function(){try{/*var q=$('#q').val();*/if(q!=''){q=q.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g,"");q=encodeURIComponent(q);if(q!=''){var u='http://kn.acrosspf.com/adn_k.ad?k='+q;$.ajax({type:'get',url:u,data:{todo:"jsonp"},dataType:"jsonp",crossDomain:true,cache:false,success:function(d){}});}}}catch(e){}};
$( document ).ready(_adn_k);
}
}else if(_adn_r.indexOf("nate.com") != -1) {
var q = _getParameterByName("q", _adn_r);
if(q){
var _adn_k=function(){try{/*var q=$('#q').val();*/if(q!=''){q=q.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g,"");q=encodeURIComponent(q);if(q!=''){var u='http://kn.acrosspf.com/adn_k.ad?k='+q;$.ajax({type:'get',url:u,data:{todo:"jsonp"},dataType:"jsonp",crossDomain:true,cache:false,success:function(d){}});}}}catch(e){}};
$( document ).ready(_adn_k);
}
}else if(_adn_r.indexOf("google.co.kr") != -1) {
var q = _getParameterByName("q", _adn_r);
if(q){
var _adn_k=function(){try{/*var q=$('#q').val();*/if(q!=''){q=q.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g,"");q=encodeURIComponent(q);if(q!=''){var u='http://kn.acrosspf.com/adn_k.ad?k='+q;$.ajax({type:'get',url:u,data:{todo:"jsonp"},dataType:"jsonp",crossDomain:true,cache:false,success:function(d){}});}}}catch(e){}};
$( document ).ready(_adn_k);
}
}else if(_adn_r.indexOf("zum.com") != -1) {
var q = _getParameterByName("query", _adn_r);
if(q){
var _adn_k=function(){try{/*var q=$('#q').val();*/if(q!=''){q=q.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g,"");q=encodeURIComponent(q);if(q!=''){var u='http://kn.acrosspf.com/adn_k.ad?k='+q;$.ajax({type:'get',url:u,data:{todo:"jsonp"},dataType:"jsonp",crossDomain:true,cache:false,success:function(d){}});}}}catch(e){}};
$( document ).ready(_adn_k);
}
}
} catch (exception){}

function tag_param(){if(adn_send<adn_status){_adn_uid=_getCookie("adn_uid"); if(_adn_uid==""){ _setCookie("adn_uid", adn_uid, 30); _adn_uid = adn_uid; }for(var k in adn_param){if(adn_param.hasOwnProperty(k)){for(var p in adn_param[k]){if(adn_param[k].hasOwnProperty(p)){tagINFO(adn_param[k][p]["ut"], adn_param[k][p]["ui"], adn_param[k][p]["uo"], adn_param[k][p]["up"], adn_param[k][p]["items"]);}}}}}}

var c=document.createElement("script");
c.type="text/javascript";
c.charset='UTF-8';
c.defer=true;
if(c.readyState){c.onreadystatechange=function(){if(c.readyState=="loaded" || c.readyState=="complete"){c.onreadystatechange=null;adn_load_flag=true;tag_param();}}
}else{c.onload=function(){adn_load_flag=true;tag_param();}}
c.src=_adn_p+'kn.acrosspf.com/adn_check.ad';
document.getElementsByTagName("head")[0].appendChild(c);
c.onerror=function(){adn_load_flag=false;}
  

function _getCookie(a){var b=a + "=";var x=0;while(x <= document.cookie.length){var y=(x + b.length);if(document.cookie.substring(x, y)==b){if((endOfCookie=document.cookie.indexOf(";", y))==-1){endOfCookie=document.cookie.length;}return unescape(document.cookie.substring(y, endOfCookie));}x=document.cookie.indexOf(" ", x) + 1;if(x==0){break;}}return "";}
function _setCookie(a, b, c){var d=new Date();d.setTime(d.getTime() + (1000 * 60 * 60 * 24 * c));document.cookie=a + "=" + b + ";path=/;expires=" + d.toGMTString() + ";";}
function _adn_h_setCookie(a, b, c){var d=new Date();d.setTime(d.getTime() + (1000 * 60 * 60 * c ));document.cookie=a + "=" + b + ";path=/;expires=" + d.toGMTString() + ";";}
function _adn_obj(){var a="adn_wrap_" + Math.floor(Math.random()*99999999999);var b=document.createElement("DIV");b.setAttribute("id", a);b.setAttribute("style", "display:none");document.getElementById("adn_container").appendChild(b);return a;}
function _adn_frm_send(c, d){
try{
var a=document.createElement("iframe");
a.frameBorder="0";
a.scrolling="no";
a.width="0px";
a.height="0px";
a.setAttribute("src", d);
document.getElementById(c).appendChild(a);
}catch (exception){}
}
function fn_adn_items_cookies(items) {
try {
var items_chk = false;
var items_info = "";
var last_items = "";
var a = _getCookie("adn_items");
var items_arr = a.split("^");
for (var i = 0; i < items_arr.length; i++) {
if (items_arr[i] != "") {
b = items_arr[i].split("|");
if (b[0] == items) {
b[1] = parseInt(b[1]) + 1;
last_items = b[0] + "|" + b[1];
items_chk = true
} else items_chk = false;
if (!items_chk) {
if (items_info != "") items_info += "^" + b[0] + "|" + b[1];
else items_info += b[0] + "|" + b[1]
}
}
if (i > 100) break
}
if (last_items != "") {
if (items_info != "") items_info = last_items + "^" + items_info;
else items_info = last_items
} else {
if (items_info != "") items_info = items + "|" + 1 + "^" + items_info;
else items_info = items + "|" + 1
}
_setCookie("adn_items", items_info, 30);
return items_info
} catch (e) {}
}


function tagINFO(t,u,o,p,obj)
{
if(typeof t=="undefined") t="Home";
if(typeof o=="undefined") o="";
if(typeof p=="undefined") p="";
if(typeof adn_ui != "undefined"){
if(adn_ui==u){
try {
_setCookie("_adn_ck_", encodeURIComponent(u + "|" + adn_ci + "|" + adn_gi + "|" + adn_ii + "|" + adn_pi + "|" + adn_ki + "|" + adn_wd), 31);
_adn_cinfo=encodeURIComponent(u + "|" + adn_ci + "|" + adn_gi + "|" + adn_ii + "|" + adn_pi + "|" + adn_ki + "|" + adn_wd);
} catch (exception){}
var _adn_inflow = false;
try {
if(_adn_r!="")
{
if(_adn_r.indexOf("acrosspf.com") != -1) {
var a=_getCookie("_adn_flow_ck_");
if(a == "")
{
if(_adn_inflow==false){
_adn_h_setCookie("_adn_flow_ck_", "1", 3);

var c=_adn_p + "kn.acrosspf.com/log/inflow.ad?ui=" + u + "&ci=" + adn_ci + "&gi=" + adn_gi + "&ii=" + adn_ii + "&pi=" + adn_pi + "&ts=" + Math.floor(Math.random()*99999999999);
_adn_inflow = true;
var a=_adn_obj();
_adn_frm_send(a, c);
}}}}} catch (exception){}
try {
var b=unescape(a).split("|");
var c=_adn_p + "kn.acrosspf.com/adn_tracking.ad?c_id=" + u + "&c_camp=" + adn_ci + "&c_group" + adn_gi + "&c_items=" + adn_ii + "&c_papers=" + adn_pi + "&c_kwd=" + encodeURIComponent(adn_ki) + "&ref=" + encodeURIComponent(_adn_r) + "&loc=" + encodeURIComponent(document.location) + "&domain=" + encodeURIComponent(_adn_h) + "&ts=" + _adn_t + "&ll=1";
_adn_id=adn_ui;
if(log_status==false)
{
var a=_adn_obj();
/*_adn_frm_send(a, c);*/
log_status=true;
}
} catch (exception){}}}
else
{
var a=_getCookie("_adn_ck_");
if(a != ""){
try {
var b=unescape(a).split("|");
_adn_cinfo=a

var c=_adn_p + "kn.acrosspf.com/adn_tracking.ad?c_id=" + b[0] + "&c_camp=" + b[1] + "&c_group" + b[2] + "&c_items=" + b[3] + "&c_papers=" + b[4] + "&c_kwd=" + encodeURIComponent(b[5]) + "&ref=" + encodeURIComponent(_adn_r) + "&loc=" + encodeURIComponent(document.location) + "&domain=" + encodeURIComponent(_adn_h) + "&ts=" + _adn_t + "&ll=1";
_adn_id=b[0];
if(log_status==false)
{
var a=_adn_obj();
/*_adn_frm_send(a, c);*/
log_status=true;
}} catch (exception){}}}
var items_data="";
for (var k in obj){
if( obj.hasOwnProperty(k) ){
items_data += obj[k]["i"]+"^"+obj[k]["s"];
if(typeof obj[k]["c"] !== "undefined") items_data += "^"+obj[k]["c"];
if(typeof obj[k]["q"] !== "undefined") items_data += "^"+obj[k]["q"];
items_data = items_data.replace(/\t/g, '');
}
items_data += "@@";}
var b=_adn_p+"kn.acrosspf.com/ads.ad?u="+u+"&t="+t+"&o="+o+"&p="+p+"&i="+encodeURIComponent(items_data)+"&r="+Math.floor(Math.random()*99999999999);
var a=_adn_obj();
_adn_frm_send(a, b);
if(t=="Purchase"){
var g=""; if(_adn_id) { g=1; } else { g=0;} var a=_getCookie("_adn_ck_");if(a != ""){ _adn_cinfo=a; }
var purchase_items_data="";
try{
for (var k in adn_order_items_param){
if( adn_order_items_param.hasOwnProperty(k) ){
purchase_items_data += adn_order_items_param[k][0]["items"][0]["i"]+"^"+adn_order_items_param[k][0]["items"][0]["a"]+"^"+adn_order_items_param[k][0]["items"][0]["p"].replace(/,/g, '');
purchase_items_data = purchase_items_data.replace(/\t/g, '');
}
purchase_items_data += "#";}
//console.log(purchase_items_data);
}catch(e){}
var b=_adn_p+"kn.acrosspf.com/adn_order.ad?u="+u+"&o="+o+"&p="+p+"&g="+g+"&c="+_adn_cinfo+"&i="+encodeURIComponent(purchase_items_data)+"&r="+Math.floor(Math.random()*99999999999);
var u=_adn_obj();
_adn_frm_send(u, b);
}else if(t=="Complete"){
var c=_adn_obj();
var g="";
if(_adn_id) {
g=1;
var b=_adn_p+"kn.acrosspf.com/adn_complete.ad?u="+u+"&o="+o+"&c="+_adn_cinfo+"&g="+g+"&r="+Math.floor(Math.random()*99999999999);
_adn_frm_send(c, b);
}else{
g=0;
var e=_getCookie("_adn_ck_");
if(e != ""){
try {
var f=unescape(e).split("|");
var b=_adn_p + "kn.acrosspf.com/adn_complete.ad?u="+u+"&o="+o+"&g=&c="+e+"&r="+Math.floor(Math.random()*99999999999);
_adn_frm_send(c, b);
} catch (exception){}
}
}
}else if(t=="Item"){
var adn_panel_cnt = "0";
try{
adn_panel_cnt = adn_panel_param.length;
} catch (exception){}
try{
adn_panel_cnt = adn_mobile_panel_param.length;
} catch (exception){}

var items_data="";
if(adn_panel_cnt==0)
{
for (var k in obj){
if( obj.hasOwnProperty(k) ){
//items_data += obj[k]["i"]+"^";
fn_adn_items_cookies(obj[k]["i"]);
//var b=_adn_p+"kn.acrosspf.com/adn_items.ad?u="+u+"&uid="+_adn_uid+"&items="+obj[k]["i"]+"&r="+Math.floor(Math.random()*99999999999);var u=_adn_obj();_adn_frm_send(u, b);
break;
}
}
}
}
adn_send++;
}

function adn_btn_ok(u, o){
var b=document.referrer;
try {
if(_adn_id){var d=_adn_p + "kn.acrosspf.com/adn_complete.ad?u="+u+"&o="+o+"&g=1&c="+_adn_cinfo+"&r="+Math.floor(Math.random()*99999999999);
} else {var e=_getCookie("_adn_ck_");
if(e != ""){
try {var f=unescape(e).split("|");var d=_adn_p + "kn.acrosspf.com/adn_complete.ad?u="+u+"&o="+o+"&g=&c="+e+"&r="+Math.floor(Math.random()*99999999999);} catch (exception){}
}}
if (typeof(d) != "undefined" && d != null){
	var a=_adn_obj();
	_adn_frm_send(a, d);}
} catch (exception){}}

} catch( ee ) { console.error(ee) }