
<template>
  <div class="container">
    <p class="text-warning"><h3>Apro Mobile Check</h3></p>
    <div class="row">
      <div class="col-md-12 padding-xs">
        <div class="panel with-nav-tabs panel-info">
          <div class="panel-heading">
            <ul class="nav nav-tabs">
              <li class="dropdown active">
                <a href="#" data-toggle="dropdown">
                  <i id="category_glyphicon" class="text-info glyphicon glyphicon-home"></i>
                  <span id="category_nm">{{data.curCorp}}</span>
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu" role="menu" v-on:click="inqryLiveupdateVersion">
                  <li >
                    <a href="#tab_liveupdate" data-toggle="tab">
                      <i class="text-info glyphicon glyphicon-home"></i> OK
                    </a>
                  </li>
                  <li >
                    <a href="#tab_liveupdate" data-toggle="tab">
                      <i class="text-info glyphicon glyphicon-home"></i> AP
                    </a>
                  </li>
                  <li >
                    <a href="#tab_liveupdate" data-toggle="tab">
                      <i class="text-info glyphicon glyphicon-home"></i> OC
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
                  <thead class="alert alert-success">
                    <tr>
                      <td>NO</td>
                      <td>Liveupdate Version</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, idx) in data.lu_list.slice().reverse()" v-bind:key="item">
                      <td>{{ idx+1 }}</td>
                      <td>
                        {{ item }}
                        &nbsp;&nbsp;
                        <a :href="`https://m.oksavingsbank.com/liveupdate/${item}.zip`" >
                          <span class="glyphicon glyphicon-share"></span>
                        </a>
                        &nbsp;&nbsp;
                        <a :href="`https://m.oksavingsbank.com/liveupdate/${item}-full.zip`" >
                          <span class="glyphicon glyphicon-share"></span>
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
    <div id="someDiv"></div>
  </div>
</template>
<script>
$(document).ready(function(e) {});

var okDomain = "oksavingsbank.com";
var apDomain = "rushncash.com";
var ocDomain = "okaycapital.co.kr";

function getLuDomain(){  
  console.log("getDomain.",data.curCorp);
  if( data.curCorp == "OK"){
      return okDomain;
  }else if(data.curCorp == "AP"){
      return apDomain;
  }else if( data.curCorp == "OC" ){
      return ocDomain;
  }else{
      return okDomain;
  }
}

function inqryLiveupdateVersion(event) {
  if( event ){
    console.log("event : ", event);
    console.log("val : ", event.target.childNodes[1].nodeValue);
    data.curCorp = event.target.childNodes[1].nodeValue.trim();
    data.luDomain = getLuDomain();
    console.log("data : ", data);
  }  
  data.lu_list = [];
  waitingDialog.show();
  var url = "https://m."+data.luDomain+"/liveupdate/liveupdate.json";
  $.getJSON("https://jsonp.afeld.me/?callback=?&url=" + url, function(jsonData) {
    //alert('fake AJAX! ' + data);
    data.lu_list = jsonData;
    waitingDialog.hide();
  });
}

function myCallback() {
  console.log("my.");
}
var data = {
    posts: [],
    lu_list: []
    , curCorp : 'OK'
    , luDomain : 'oksavingsbank.com'
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
  },
  mounted: function() {
    inqryLiveupdateVersion();
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
