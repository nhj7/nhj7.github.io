<template>

<div id="votingStatDiv" ref="votingStatDiv">

  <div class="form-group ">
    <div class="row ">
      <div class="col-sm-6 col-sm-offset-2">
        <div class="input-group">
          <span class="input-group-addon info">
            <!--i class="glyphicon glyphicon-user"></i-->
            @
          </span>
          <input data-toggle="tooltip" title="아이디를 입력해주세요!" required @keyup.enter="inqryVotingStatistics" v-model="data.acct_nm" id="acct_nm" type="text" class="form-control " name="acct_nm" placeholder="account name">
          <span class="input-group-btn">
            <button type="submit" class="btn btn-info " v-on:click="inqryVotingStatistics">Submit</button>
          </span>
        </div>
      </div>
    </div> <!-- row -->
  </div><!-- form-group -->


<div class="form-group">


  </div> <!-- row -->
  <div class="row">
    <div class="col-sm-6">
      <div class="row">
        <div class="input-group">
          <div id="spanVotingRateChart" class="input-group-addon white">

          </div>

        </div>
      </div>
      <div class="row">
        <hr />
          <div id="votingRateList" class="hidden" >
            <h4>{{ data.votingRateListLabel }} ({{ data.votingRateList.length}})</h4>
            <table class="table table-striped table-hover text-center">
              <thead>
                <tr>
                  <td>NO</td>
                  <td>ACCOUNT</td>
                  <td>SP</td>
                  <td>CNT</td>
                  <td>WEIGHT</td>
                </tr>
              </thead>
              <tbody>
                <tr :key="idx" v-for="(item, idx) in data.votingRateList" v-on:click="clickVotingRateRow(item.account)">
                  <td>{{ idx+1 }}</td>
                  <td>
                    {{ item.account.substring(1) }}
                    <a :href="`https://steemit.com/${item.account}`" target="_blank">
                      <span class="glyphicon glyphicon-share"></span>
                    </a>
                  </td>
                  <td>{{ comma(item.sp) }}</td>
                  <td>{{ item.info.count }}</td>
                  <td>{{ comma(item.info.totWeigt / 100.0) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        <hr />
      </div>
    </div> <!-- col -->

    <div class="col-sm-6">
      <div class="row">
        <div class="input-group">
          <div id="spanVotingPairChart" class="input-group-addon white">

          </div>
        </div>
      </div>
      <div class="row hidden">
        <hr />
          hellow~
        <hr />
      </div>
    </div> <!-- col -->
  </div><!-- row -->
</div><!-- form-group -->
</template>
<style>
</style>
<script>
var data = {
  nm: 'VoteRating'
  , acct_nm : ''
  , toDay : ''
  , chart_id : 'chart_div'
  , votingStat : {}
  , votingRateList : []
};

function initChart(parent, id, data, options){
  $("#"+id).remove();
  var votingRateCanvas = $("<canvas>", { id : id });
  $("#"+parent).empty();
  $("#"+parent).append(votingRateCanvas);
  //alert();
  var ctx = document.getElementById(id).getContext('2d');
  var newChart = new Chart(ctx , {
      type: 'doughnut'
      , data: data
      , options : options
  });
  return newChart;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


var arrRangeSp = [ 0, 1000, 5000, 10000 ];
async function inqryVotingStatistics(){
  try{
    if( !data.acct_nm ){
      return;
    }

    data.acct_nm = data.acct_nm.trim();
    localStorage.setItem('steem.id', data.acct_nm);
    $('#votingRateList').addClass("hidden");

    waitingDialog.show('Collecting voting information...', { progressType: 'primary'});
    const lmtCnt = 10000;
    let idxHist = -1;
    let arrVoter = new Array();
    let arrAuthor = new Array();
    var gprops = await steem.api.getDynamicGlobalPropertiesAsync();
    var steemPower = gprops.total_vesting_fund_steem.replace(" STEEM", "") / gprops.total_vesting_shares.replace(" VESTS", "");
    do{
      console.log(idxHist, lmtCnt);
      var result = await steem.api.getAccountHistoryAsync(data.acct_nm, idxHist, lmtCnt);
      //console.log(result);
      var totDoVotingVal = {};
      var totRcvVotingVal = {};
      for(var i = 0; i < result.length;i++){

        if( result[i][1].op[0] == 'vote' ){
          var t = result[i][1].timestamp.replace("T"," ").split(/[- :]/);
          var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
          var offset = d.getTimezoneOffset() / 60;
          var hours = d.getHours();
          d.setHours(hours - offset);

          /*

          console.log("date : "+(result[i][1].timestamp), d);
          console.log("num : "+result[i][0]);
          console.log("type : "+result[i][1].op[0]);
          console.log("info : "+JSON.stringify(result[i][1].op[1]));

          */

          arrVoter.push(result[i][1].op[1].voter);
          arrAuthor.push(result[i][1].op[1].author);
          let author = "@"+result[i][1].op[1].author;
          let voter = "@"+result[i][1].op[1].voter;
          try{
            if( result[i][1].op[1].voter == data.acct_nm){
              if( !totDoVotingVal[author] ) {
                totDoVotingVal[author] = { totWeigt : 0, count : 0, votingList : [] };
              }
              totDoVotingVal[author].totWeigt += result[i][1].op[1].weight;
              totDoVotingVal[author].count++;
              totDoVotingVal[author].votingList.push( (result[i][1].op[1]) );
            }else{
              if( !totRcvVotingVal[voter] ) {
                totRcvVotingVal[voter] = { totWeigt : 0, count : 0 , votingList : []};
              }
              totRcvVotingVal[voter].totWeigt += result[i][1].op[1].weight;
              totRcvVotingVal[voter].count++;
              totRcvVotingVal[voter].votingList.push( (result[i][1].op[1]) );
            }
          }catch(e){
            console.error(result[i][1].op[1], totRcvVotingVal);
            console.error(e.message);
            throw e;
          }


        }
      }
      idxHist = result[0][0]-1;
    }while( result.length == lmtCnt)

    console.error("totRcvVotingVal", totRcvVotingVal);
    console.error("totDoVotingVal", totDoVotingVal);
    var arrUniqueAuthor = arrAuthor.filter(onlyUnique);
    //console.error("arrVoter after fileter.", arrVoter.length, arrVoter);
    //console.error("arrVoterObj", arrVoterObj);


    var objRangeGrp = {};
    for(let i = 0; i < arrRangeSp.length;i++){
      objRangeGrp[arrRangeSp[i]] = { totWeigt : 0, count : 0, voteList : [] };
    }

    waitingDialog.show('Collecting accounts information...', { progressType: 'info'});

    var accounts = await steem.api.getAccountsAsync(arrUniqueAuthor);
    for(let i = 0; i < accounts.length;i++){
      let name = "@"+accounts[i].name;
      var userTotalVest = parseInt(accounts[i].vesting_shares.replace(" VESTS", ""))
      - parseInt(accounts[i].delegated_vesting_shares.replace(" VESTS", ""))
      + parseInt(accounts[i].received_vesting_shares.replace(" VESTS", ""));
      let acct_sp_tot = Math.floor(userTotalVest * steemPower);
      accounts[i].acct_sp_tot = acct_sp_tot;
      for(let spIdx = arrRangeSp.length; spIdx >= 0;spIdx--){
        //console.error(acct_sp_tot, arrRangeSp[spIdx]);
        if( acct_sp_tot >= arrRangeSp[spIdx] ){
          //objRangeGrp[arrRangeSp[spIdx]].push( accounts[i].name );
          if( !totDoVotingVal[name] ){
            continue;
          }
          try{
              objRangeGrp[arrRangeSp[spIdx]].totWeigt += totDoVotingVal[name].totWeigt;
          }catch(e){
            alert(name);
          }

          objRangeGrp[arrRangeSp[spIdx]].count++;
          objRangeGrp[arrRangeSp[spIdx]].voteList.push(
            {account : name, sp : acct_sp_tot, info : totDoVotingVal[name] }
          );
          break;
        }
      }
    }
    //console.error("accounts", accounts);
    console.error("objRangeGrp", objRangeGrp);

    data.votingStat = objRangeGrp;
    //console.error("objRangeGrp[0]", objRangeGrp[0]);
    //console.error("objRangeGrp[0]", objRangeGrp[0].voteList[0].info);

    waitingDialog.hide();


    //<span id="spanVotingRateChart" class="input-group-addon white">
    var votingRateChart = initChart( 'spanVotingRateChart', 'votingRateChart'
    , {
        labels: ["0~1000", "1001~5000", "5001~10000", "10001~"],
        datasets: [
          {
            label: ""
            //backgroundColor: ["silver","skyblue","green","red"],
            , backgroundColor: ["#edebea","#c1d9ff","#75abff","#287bff"]
            , data: [ Math.abs(objRangeGrp[0].totWeigt) ,Math.abs(objRangeGrp[1000].totWeigt),Math.abs(objRangeGrp[5000].totWeigt), Math.abs(objRangeGrp[10000].totWeigt) ]
          }
        ]
      }
      ,{
          title: {
            display: true,
            text: '@'+data.acct_nm + ' Voting Rate'
          }
          , animation: {
                animateScale: true,
                animateRotate: true
          }
          , responsive: true
          , maintainAspectRatio: false
          , pieceLabel: {
            render: 'percentage',
            fontColor: function (data) {
              var rgb = hexToRgb(data.dataset.backgroundColor[data.index]);
              var threshold = 140;
              var luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
              return luminance > threshold ? 'black' : 'white';
            },
            precision: 2
          }
        }
    );

    $("#votingRateChart").click(
        function(evt){
            var activePoints = votingRateChart.getElementsAtEvent (evt);
            console.log(activePoints, activePoints[0].label, activePoints[0].value);
            if(activePoints.length > 0)
            {
              //get the internal index of slice in pie chart
              var clickedElementindex = activePoints[0]["_index"];

              //get specific label by index
              var label = votingRateChart.data.labels[clickedElementindex];

              //get value by index
              var value = votingRateChart.data.datasets[0].data[clickedElementindex];
              console.log(clickedElementindex, label, value );
              /* other stuff that requires slice's label and value */

              data.votingRateListLabel = label + ' list';

              data.votingRateList = data.votingStat[arrRangeSp[clickedElementindex]].voteList;

              $('#votingRateList').removeClass("hidden");
           }
        }
    );

    return;

    initChart( 'spanVotingPairChart', 'votingPairChart'
    , {
        labels: ["0~1000", "1001~5000", "5001~10000", "10001~"],
        datasets: [
          {
            label: ""
            //backgroundColor: ["silver","skyblue","green","red"],
            , backgroundColor: ["#edebea","#c1d9ff","#75abff","#287bff"]
            , data: [10,15,15,30]
          }
        ]
      }
      ,{
          title: {
            display: true,
            text: 'Voting Pair'
          }
          , animation: {
                animateScale: true,
                animateRotate: true
          }
          , responsive: true
          , maintainAspectRatio: false
          , pieceLabel: {
            render: 'percentage',
            fontColor: function (data) {
              var rgb = hexToRgb(data.dataset.backgroundColor[data.index]);
              var threshold = 140;
              var luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
              return luminance > threshold ? 'black' : 'white';
            },
            precision: 2
          }
        }
    );
  }catch(err){

    console.error("inqryVoteRating Error!", err);

    alert(err.message);
  }finally{
    waitingDialog.hide();
  }
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}



var home = module.exports = {
  data: function() {
    return {
      data: data
    }
  },
  methods: {
    inqryVotingStatistics : function(){
      inqryVotingStatistics();
    }
    , drawChart : function(){
      drawChart();
    }
    , clickVotingRateRow : function( name ){
      data.acct_nm = name.substring(1);
      $(window).scrollTop(0);
      //window.scroll({top: 0,left: 0,behavior: 'smooth'});
    }
  },
  mounted: function() {
    data.acct_nm = localStorage.getItem('steem.id');
    //inqryVotingStatistics();
    //drawChart();
  }
}
</script>
