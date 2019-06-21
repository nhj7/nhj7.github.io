
<template>
  <div class="container text-warning">
    <h3><p class="text-warning">
      Links
    </p></h3>

    <!-- Default unchecked -->
    <div class="checkbox checkbox-info" >
      <input type="checkbox" id="optinosCheckbox1" value="" v-model="data.isTest" @change="inqryLinks" >
      <label for="optinosCheckbox1">
        Test
      </label>
    </div>

    <div class="row">
      <div class="col-md-12 padding-xs">
        <div class="panel with-nav-tabs panel-info">
          <div class="panel-heading">
            <ul class="nav nav-tabs">
              <li class="dropdown active cursor_hand">
                <a href="#" data-toggle="dropdown">
                  <i id="lu_icon" class="fas" v-bind:class="data.lu_icon"></i>
                  <span id="category_nm">{{data.curCorp}}</span>
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu" role="menu" v-on:click="inqryLinks">
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
                      <td >URL</td>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(item, idx) in data.links" >
                    <tr :key="item.name+1">
                      <td rowspan="2" class="vertical-align-middle">{{ idx+1 }}</td>
                      <td >{{ item.name }}-({{item.type}})</td>                      
                    </tr>
                    <tr :key="item.name+2">                        
                        <td class="left" >
                            <a href="javascript:;" @click="openUrl(item)">{{ filterUrl(item) }}</a>
                            <br />
                            <div v-if="item.input" >
                                <div class="input-group">
                                    <!--span class="input-group-addon info">
                                        {{item.input}}
                                    </span-->
                                    <input data-toggle="tooltip" :title="[[item.input]] +'를 입력해주세요!'" required type="text" v-model="item.inputData" class="form-control " :placeholder="[[item.input]] + '를 입력해주세요'">
                                    <span class="input-group-btn">
                                        <button type="submit" class="btn btn-info " v-on:click="openUrl(item)">Go</button>
                                    </span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </template>


                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    
</div>
</template>
<script>




$(document).ready(function(e) {
    

});

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

function inqryLinks(event) {
  if( event ){
    try{
      console.log("event : ", event);
      console.log("val : ", event.target.childNodes[1].nodeValue);
      data.curCorp = event.target.childNodes[1].nodeValue.trim();        
      data.lu_icon = event.target.childNodes[0].classList[1];
    }catch(e){}
  } 
  data.luDomain = getLuDomain();
  data.links = [];
  localStorage.setItem("apro.Links.curCorp", data.curCorp)
  if( data.curCorp == "OK"){
      data.links = data.ok_links;
  }else if( data.curCorp == "OC" ){
      data.links = data.oc_links;
  }else if( data.curCorp == "AP" ){
      data.links = data.ap_links;
  }

  console.log(data.links);
  //waitingDialog.show("loading "+data.curCorp);
  
  
}

function myCallback() {
  console.log("my.");
}
var data = {
    links : []
    , ok_links: [
        {
            name : "신분증수취"
            , url : "/#/iden?param1={{param1}}"
            , type : "m"
            , input : "접수번호"
            , bind : "{{param1}}"
            , inputData : ""
            , isBase64 : true
        }
        ,{
            name : "테스트11"
            , url : "/#/iden?param1"
            , type : "m"
        }
        ,{
            name : "테스트22"
            , url : "/#/iden?param1"
            , type : "m"
        }
    ]
    , oc_links: [
        {
            name : "신분증수취"
            , url : "/redirect.html?page=iden_cust_requ00&param1={{param1}}"
            , type : "m"
            , input : "접수번호"
            , bind : "{{param1}}"
            , inputData : ""
            , isBase64 : true
        }
        
    ]
    , ap_links: [
        {
            name : "신분증수취"
            , url : "/#/iden_cust_requ00?param1={{param1}}"
            , type : "m"
            , input : "접수번호"
            , bind : "{{param1}}"
            , inputData : ""
            , isBase64 : true
        }
        
    ]
    , lu_list: []
    , curCorp : localStorage.getItem("apro.Links.curCorp") ? localStorage.getItem("apro.Links.curCorp") : 'OK'
    , luDomain : 'oksavingsbank.com'
    , lu_icon : 'fa-university'
    , isTest : false
}
module.exports = {
  name: "Links",
  data: function() {
    return {
      data
    };
  },
  computed: {
   
  },
  filters : {
    
  }
  ,methods: {
    inqryLinks: function(event) {
      inqryLinks(event);
    }, openUrl : function(item){
        openUrl(item);
    }, filterUrl: function (item) {        
        return item.url.replace(item.bind, item.isBase64? btoa(item.inputData) : item.inputData )
    }   
  },
  mounted: function() {
    inqryLinks();    
  }
};
</script>

<style>

</style>
