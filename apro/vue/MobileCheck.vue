
<template>
  <div class="container text-warning">
    <h3><p class="text-warning">
      Apro live update Check
    </p></h3>

    <!-- Default unchecked -->
    <div class="checkbox checkbox-info" >
      <input type="checkbox" id="optinosCheckbox1" value="" v-model="data.isTest" @change="inqryLiveupdateVersion" >
      <label for="optinosCheckbox1">
        Test
      </label>
    </div>

    <div class="row">
      <div class="col-md-12 padding-xs">
        <div class="panel with-nav-tabs panel-info">
          <div class="panel-heading">
            <ul class="nav nav-tabs">
              <li class="dropdown active">
                <a href="#" data-toggle="dropdown">
                  <i id="lu_icon" class="fas" v-bind:class="data.lu_icon"></i>
                  <span id="category_nm">{{data.curCorp}}</span>
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu" role="menu" v-on:click="inqryLiveupdateVersion">
                  <li >
                    <a href="#tab_liveupdate" data-toggle="tab">
                      <i class="fas fa-university"></i> OK
                    </a>
                  </li>
                  <li >
                    <a href="#tab_liveupdate" data-toggle="tab">
                      <i class="fas fa-running"></i> AP
                    </a>
                  </li>
                  <li >
                    <a href="#tab_liveupdate" data-toggle="tab">
                      <i class="fas fa-building"></i> OC
                    </a>
                  </li>
                </ul>
              </li>
              
              
              

            </ul>
          </div>
          <div class="panel-body padding-xs">
            <div class="tab-content">
              <div class="tab-pane fade in active" id="tab_liveupdate">
                <table class="table table-striped table-hover text-center">
                  <thead class="alert alert-warning">
                    <tr>
                      <td >NO</td>
                      <td >Live Update Version</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, idx) in data.lu_list.slice().reverse()" v-bind:key="item">
                      <td >{{ idx+1 }}</td>
                      <td >
                        {{ item }}
                        &nbsp;&nbsp;
                        <a :href="`https://${data.luDomain}/liveupdate/${item}.zip`" title="Update Zip">
                          <span class="text-warning glyphicon glyphicon-share"></span>
                        </a>
                        &nbsp;&nbsp;
                        <a :href="`https://${data.luDomain}/liveupdate/${item}-full.zip`" title="Full Zip">
                          <span class="text-danger glyphicon glyphicon-share"></span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="myDiv">
        <link href="http://10.99.4.132:5500/apro/liveupdate.json" />

    </div>
</div>
</template>
<script>

function jsonpCallback(data){
    console.error(data);
}

function testIframe(){
    JsonpHttpRequest("http://10.99.4.132:5500/apro/liveupdate.json", "www")
}

function JsonpHttpRequest(url, callback) {
    var e = document.createElement('script');
    e.src = url;
    document.body.appendChild(e); // fyi remove this element later /assign temp class ..then .remove it later
    //insetead of this you may also create function with  callback value and  use it instead
    window[callback] = (data) => {
        console.log(data);  // heres you data
    }
}



$(document).ready(function(e) {
    

});
function myJsonMethod(data) {
            //data = JSON.parse(data):
            alert(data);
    }


function getLuDomain(){  
  console.log("getLuDomain.",data.curCorp);
  var luDomain = data.isTest?"test-m.":"m.";
  //console.log("getLuDomain.",data.curCorp);
  if( data.curCorp == "OK"){
      luDomain+="oksavingsbank.com";
  }else if(data.curCorp == "AP"){
      luDomain+="rushncash.com";
  }else if( data.curCorp == "OC" ){
      luDomain+="okaycapital.co.kr";
  }else {
    luDomain+="oksavingsbank.com";
  }
  luDomain += (data.isTest?":8082":"");
  return luDomain;
}

function inqryLiveupdateVersion(event) {
  if( event ){
    try{
      console.log("event : ", event);
      console.log("val : ", event.target.childNodes[1].nodeValue);
      data.curCorp = event.target.childNodes[1].nodeValue.trim();        
      data.lu_icon = event.target.childNodes[0].classList[1];
    }catch(e){}
  } 
  data.luDomain = getLuDomain(); 
  data.lu_list = [];
  waitingDialog.show("loading "+data.curCorp);
  var url = "https://"+data.luDomain+"/liveupdate/liveupdate.json";
  $.getJSON((data.isTest?"":"https://cors-anywhere.herokuapp.com/") + url, function(jsonData) {
    //alert('fake AJAX! ' + data);
    data.lu_list = jsonData;
    waitingDialog.hide();
  }).error(function(jqxhr, textStatus, error) {
    console.error( "error : ",jqxhr, textStatus, error );
    data.lu_list = [{}];
    waitingDialog.hide();
  })
}

function myCallback() {
  console.log("my.");
}
var data = {
    posts: [],
    lu_list: []
    , curCorp : 'OK'
    , luDomain : 'oksavingsbank.com'
    , lu_icon : 'fa-university'
    , isTest : false
}
module.exports = {
  name: "MobileCheck",
  data: function() {
    return {
      data
    };
  },
  computed: {
    hasResult: function() {
      return this.posts.length > 0;
    }
  },
  methods: {
    inqryLiveupdateVersion: function(event) {
      inqryLiveupdateVersion(event);
    }
    , testIframe : function(){
        testIframe();
    }, jsonpCallback : function(data){
        jsonpCallback(data);
    }    
  },
  mounted: function() {
    inqryLiveupdateVersion();
    testIframe();
  }
};
</script>

<style>
.panel.with-nav-tabs .panel-heading {
  padding: 5px 5px 0 5px;
}

.panel.with-nav-tabs .nav-tabs {
  border-bottom: none;
}

.panel.with-nav-tabs .nav-justified {
  margin-bottom: -1px;
}

/********************************************************************/

/*** PANEL DEFAULT ***/

.with-nav-tabs.panel-default .nav-tabs > li > a,
.with-nav-tabs.panel-default .nav-tabs > li > a:hover,
.with-nav-tabs.panel-default .nav-tabs > li > a:focus {
  color: #777;
}

.with-nav-tabs.panel-default .nav-tabs > .open > a,
.with-nav-tabs.panel-default .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-default .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-default .nav-tabs > li > a:hover,
.with-nav-tabs.panel-default .nav-tabs > li > a:focus {
  color: #777;
  background-color: #ddd;
  border-color: transparent;
}

.with-nav-tabs.panel-default .nav-tabs > li.active > a,
.with-nav-tabs.panel-default .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-default .nav-tabs > li.active > a:focus {
  color: #555;
  background-color: #fff;
  border-color: #ddd;
  border-bottom-color: transparent;
}

.with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu {
  background-color: #f5f5f5;
  border-color: #ddd;
}

.with-nav-tabs.panel-default .nav-tabs > li.dropdown .dropdown-menu > li > a {
  color: #777;
}

.with-nav-tabs.panel-default
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > li
  > a:hover,
.with-nav-tabs.panel-default
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > li
  > a:focus {
  background-color: #ddd;
}

.with-nav-tabs.panel-default
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a,
.with-nav-tabs.panel-default
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a:hover,
.with-nav-tabs.panel-default
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a:focus {
  color: #fff;
  background-color: #555;
}

/********************************************************************/

/*** PANEL PRIMARY ***/

.with-nav-tabs.panel-primary .nav-tabs > li > a,
.with-nav-tabs.panel-primary .nav-tabs > li > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > li > a:focus {
  color: #fff;
}

.with-nav-tabs.panel-primary .nav-tabs > .open > a,
.with-nav-tabs.panel-primary .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-primary .nav-tabs > li > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > li > a:focus {
  color: #fff;
  background-color: #3071a9;
  border-color: transparent;
}

.with-nav-tabs.panel-primary .nav-tabs > li.active > a,
.with-nav-tabs.panel-primary .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-primary .nav-tabs > li.active > a:focus {
  color: #428bca;
  background-color: #fff;
  border-color: #428bca;
  border-bottom-color: transparent;
}

.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu {
  background-color: #428bca;
  border-color: #3071a9;
}

.with-nav-tabs.panel-primary .nav-tabs > li.dropdown .dropdown-menu > li > a {
  color: #fff;
}

.with-nav-tabs.panel-primary
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > li
  > a:hover,
.with-nav-tabs.panel-primary
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > li
  > a:focus {
  background-color: #3071a9;
}

.with-nav-tabs.panel-primary
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a,
.with-nav-tabs.panel-primary
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a:hover,
.with-nav-tabs.panel-primary
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a:focus {
  background-color: #4a9fe9;
}

/********************************************************************/

/*** PANEL SUCCESS ***/

.with-nav-tabs.panel-success .nav-tabs > li > a,
.with-nav-tabs.panel-success .nav-tabs > li > a:hover,
.with-nav-tabs.panel-success .nav-tabs > li > a:focus {
  color: #3c763d;
}

.with-nav-tabs.panel-success .nav-tabs > .open > a,
.with-nav-tabs.panel-success .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-success .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-success .nav-tabs > li > a:hover,
.with-nav-tabs.panel-success .nav-tabs > li > a:focus {
  color: #3c763d;
  background-color: #d6e9c6;
  border-color: transparent;
}

.with-nav-tabs.panel-success .nav-tabs > li.active > a,
.with-nav-tabs.panel-success .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-success .nav-tabs > li.active > a:focus {
  color: #3c763d;
  background-color: #fff;
  border-color: #d6e9c6;
  border-bottom-color: transparent;
}

.with-nav-tabs.panel-success .nav-tabs > li.dropdown .dropdown-menu {
  background-color: #dff0d8;
  border-color: #d6e9c6;
}

.with-nav-tabs.panel-success .nav-tabs > li.dropdown .dropdown-menu > li > a {
  color: #3c763d;
}

.with-nav-tabs.panel-success
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > li
  > a:hover,
.with-nav-tabs.panel-success
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > li
  > a:focus {
  background-color: #d6e9c6;
}

.with-nav-tabs.panel-success
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a,
.with-nav-tabs.panel-success
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a:hover,
.with-nav-tabs.panel-success
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a:focus {
  color: #fff;
  background-color: #3c763d;
}

/********************************************************************/

/*** PANEL INFO ***/

.with-nav-tabs.panel-info .nav-tabs > li > a,
.with-nav-tabs.panel-info .nav-tabs > li > a:hover,
.with-nav-tabs.panel-info .nav-tabs > li > a:focus {
  color: #31708f;
}

.with-nav-tabs.panel-info .nav-tabs > .open > a,
.with-nav-tabs.panel-info .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-info .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-info .nav-tabs > li > a:hover,
.with-nav-tabs.panel-info .nav-tabs > li > a:focus {
  color: #31708f;
  background-color: #bce8f1;
  border-color: transparent;
}

.with-nav-tabs.panel-info .nav-tabs > li.active > a,
.with-nav-tabs.panel-info .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-info .nav-tabs > li.active > a:focus {
  color: #31708f;
  background-color: #fff;
  border-color: #bce8f1;
  border-bottom-color: transparent;
}

.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu {
  background-color: #d9edf7;
  border-color: #bce8f1;
}

.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > li > a {
  color: #31708f;
}

.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > li > a:hover,
.with-nav-tabs.panel-info
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > li
  > a:focus {
  background-color: #bce8f1;
}

.with-nav-tabs.panel-info .nav-tabs > li.dropdown .dropdown-menu > .active > a,
.with-nav-tabs.panel-info
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a:hover,
.with-nav-tabs.panel-info
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a:focus {
  color: #fff;
  background-color: #31708f;
}

/********************************************************************/

/*** PANEL WARNING ***/

.with-nav-tabs.panel-warning .nav-tabs > li > a,
.with-nav-tabs.panel-warning .nav-tabs > li > a:hover,
.with-nav-tabs.panel-warning .nav-tabs > li > a:focus {
  color: #8a6d3b;
}

.with-nav-tabs.panel-warning .nav-tabs > .open > a,
.with-nav-tabs.panel-warning .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-warning .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-warning .nav-tabs > li > a:hover,
.with-nav-tabs.panel-warning .nav-tabs > li > a:focus {
  color: #8a6d3b;
  background-color: #faebcc;
  border-color: transparent;
}

.with-nav-tabs.panel-warning .nav-tabs > li.active > a,
.with-nav-tabs.panel-warning .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-warning .nav-tabs > li.active > a:focus {
  color: #8a6d3b;
  background-color: #fff;
  border-color: #faebcc;
  border-bottom-color: transparent;
}

.with-nav-tabs.panel-warning .nav-tabs > li.dropdown .dropdown-menu {
  background-color: #fcf8e3;
  border-color: #faebcc;
}

.with-nav-tabs.panel-warning .nav-tabs > li.dropdown .dropdown-menu > li > a {
  color: #8a6d3b;
}

.with-nav-tabs.panel-warning
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > li
  > a:hover,
.with-nav-tabs.panel-warning
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > li
  > a:focus {
  background-color: #faebcc;
}

.with-nav-tabs.panel-warning
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a,
.with-nav-tabs.panel-warning
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a:hover,
.with-nav-tabs.panel-warning
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a:focus {
  color: #fff;
  background-color: #8a6d3b;
}

/********************************************************************/

/*** PANEL DANGER ***/

.with-nav-tabs.panel-danger .nav-tabs > li > a,
.with-nav-tabs.panel-danger .nav-tabs > li > a:hover,
.with-nav-tabs.panel-danger .nav-tabs > li > a:focus {
  color: #a94442;
}

.with-nav-tabs.panel-danger .nav-tabs > .open > a,
.with-nav-tabs.panel-danger .nav-tabs > .open > a:hover,
.with-nav-tabs.panel-danger .nav-tabs > .open > a:focus,
.with-nav-tabs.panel-danger .nav-tabs > li > a:hover,
.with-nav-tabs.panel-danger .nav-tabs > li > a:focus {
  color: #a94442;
  background-color: #ebccd1;
  border-color: transparent;
}

.with-nav-tabs.panel-danger .nav-tabs > li.active > a,
.with-nav-tabs.panel-danger .nav-tabs > li.active > a:hover,
.with-nav-tabs.panel-danger .nav-tabs > li.active > a:focus {
  color: #a94442;
  background-color: #fff;
  border-color: #ebccd1;
  border-bottom-color: transparent;
}

.with-nav-tabs.panel-danger .nav-tabs > li.dropdown .dropdown-menu {
  background-color: #f2dede;
  /* bg color */
  border-color: #ebccd1;
  /* border color */
}

.with-nav-tabs.panel-danger .nav-tabs > li.dropdown .dropdown-menu > li > a {
  color: #a94442;
  /* normal text color */
}

.with-nav-tabs.panel-danger
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > li
  > a:hover,
.with-nav-tabs.panel-danger
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > li
  > a:focus {
  background-color: #ebccd1;
  /* hover bg color */
}

.with-nav-tabs.panel-danger
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a,
.with-nav-tabs.panel-danger
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a:hover,
.with-nav-tabs.panel-danger
  .nav-tabs
  > li.dropdown
  .dropdown-menu
  > .active
  > a:focus {
  color: #fff;
  /* active text color */
  background-color: #a94442;
  /* active bg color */
}
</style>

<style>
body {
  padding-top: 50px;
}
.dropdown.dropdown-lg .dropdown-menu {
  margin-top: -1px;
  padding: 6px 20px;
}
.input-group-btn .btn-group {
  display: flex !important;
}
.btn-group .btn {
  border-radius: 0;
  margin-left: -1px;
}
.btn-group .btn:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.btn-group .form-horizontal .btn[type="submit"] {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.form-horizontal .form-group {
  margin-left: 0;
  margin-right: 0;
}
.form-group .form-control:last-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

@media screen and (min-width: 768px) {
  #adv-search {
    width: 500px;
    margin: 0 auto;
  }
  .dropdown.dropdown-lg {
    position: static !important;
  }
  .dropdown.dropdown-lg .dropdown-menu {
    min-width: 500px;
  }
}
</style>
