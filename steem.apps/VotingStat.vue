<template>

<div>

  <div class="form-group ">
    <div class="row ">
      <div class="col-sm-6 col-sm-offset-2">
        <div class="input-group">
          <span class="input-group-addon primary">
            <!--i class="glyphicon glyphicon-user"></i-->
            @
          </span>
          <input data-toggle="tooltip" title="아이디를 입력해주세요!" required @keyup.enter="inqryVotingStatistics" v-model="data.acct_nm" id="acct_nm" type="text" class="form-control " name="acct_nm" placeholder="account name">
          <span class="input-group-btn">
            <button type="submit" class="btn btn-primary " v-on:click="inqryVotingStatistics">Submit</button>
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
      <div class="row hidden">
        <hr />
          hellow~
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




</div>





</template>

<style>

</style>



<script>
var data = {
  nm: 'VoteRating'
  , acct_nm : ''
  , toDay : ''
  , chart_id : 'chart_div'
};

function initChart(parent, id, data, options){
  $("#"+id).remove();
  var votingRateCanvas = $("<canvas>", { id : id });
  $("#"+parent).empty();
  $("#"+parent).append(votingRateCanvas);
  //alert();
  var ctx = document.getElementById(id).getContext('2d');
  new Chart(ctx , {
      type: 'doughnut'
      , data: data
      , options : options
  });
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

let votingStat;

async function inqryVotingStatistics(){
  try{
    if( !data.acct_nm ){
      return;
    }
    waitingDialog.show('Calculating Vote Statistics...', { progressType: 'primary'});
    const lmtCnt = 10000;
    let idxHist = -1;
    let arrVoter = new Array();
    let arrAuthor = new Array();
    var gprops = await steem.api.getDynamicGlobalPropertiesAsync();
    var steemPower = gprops.total_vesting_fund_steem.replace(" STEEM", "") / gprops.total_vesting_shares.replace(" VESTS", "");
    do{
      console.log(idxHist, lmtCnt);
      var result = await steem.api.getAccountHistoryAsync(data.acct_nm, idxHist, lmtCnt);
      console.log(result.length, result[0][0] + '~' + result[result.length-1][0]);
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

          if( result[i][1].op[1].voter == data.acct_nm){
            if( !totDoVotingVal[result[i][1].op[1].author] ) {
              totDoVotingVal[result[i][1].op[1].author] = { totWeigt : 0, count : 0, votingList : [] };
            }
            totDoVotingVal[result[i][1].op[1].author].totWeigt += result[i][1].op[1].weight;
            totDoVotingVal[result[i][1].op[1].author].count++;
            totDoVotingVal[result[i][1].op[1].author].votingList.push( (result[i][1].op[1]) );
          }else{
            if( !totRcvVotingVal[result[i][1].op[1].voter] ) {
              totRcvVotingVal[result[i][1].op[1].voter] = { totWeigt : 0, count : 0 , votingList : []};
            }
            totRcvVotingVal[result[i][1].op[1].voter].totWeigt += result[i][1].op[1].weight;
            totRcvVotingVal[result[i][1].op[1].voter].count++;
            totRcvVotingVal[result[i][1].op[1].voter].votingList.push( (result[i][1].op[1]) );
          }
        }
      }
      idxHist = result[0][0]-1;
    }while( result.length == lmtCnt)

    //console.error("totRcvVotingVal", totRcvVotingVal);
    //console.error("totDoVotingVal", totDoVotingVal);
    var arrUniqueAuthor = arrAuthor.filter(onlyUnique);
    //console.error("arrVoter after fileter.", arrVoter.length, arrVoter);
    //console.error("arrVoterObj", arrVoterObj);

    var arrRangeSp = [ 0, 1000, 5000, 10000 ];
    var objRangeGrp = {};
    for(let i = 0; i < arrRangeSp.length;i++){
      objRangeGrp[arrRangeSp[i]] = { totWeigt : 0, count : 0, voteList : [] };
    }
    var accounts = await steem.api.getAccountsAsync(arrUniqueAuthor);
    for(let i = 0; i < accounts.length;i++){
      var userTotalVest = parseInt(accounts[i].vesting_shares.replace(" VESTS", ""))
      - parseInt(accounts[i].delegated_vesting_shares.replace(" VESTS", ""))
      + parseInt(accounts[i].received_vesting_shares.replace(" VESTS", ""));
      let acct_sp_tot = Math.floor(userTotalVest * steemPower);
      accounts[i].acct_sp_tot = acct_sp_tot;
      for(let spIdx = arrRangeSp.length; spIdx >= 0;spIdx--){
        //console.error(acct_sp_tot, arrRangeSp[spIdx]);
        if( acct_sp_tot >= arrRangeSp[spIdx] ){
          //objRangeGrp[arrRangeSp[spIdx]].push( accounts[i].name );
          objRangeGrp[arrRangeSp[spIdx]].totWeigt += totDoVotingVal[accounts[i].name].totWeigt;
          objRangeGrp[arrRangeSp[spIdx]].count++;
          objRangeGrp[arrRangeSp[spIdx]].voteList.push(
            {account : accounts[i].name, info : totDoVotingVal[accounts[i].name] }
          );
          break;
        }
      }
    }
    //console.error("accounts", accounts);
    console.error("objRangeGrp", objRangeGrp);
    //console.error("objRangeGrp[0]", objRangeGrp[0]);
    //console.error("objRangeGrp[0]", objRangeGrp[0].voteList[0].info);

    waitingDialog.hide();


    //<span id="spanVotingRateChart" class="input-group-addon white">
    initChart( 'spanVotingRateChart', 'votingRateChart'
    , {
        labels: ["0~1000", "1001~5000", "5001~10000", "10001~"],
        datasets: [
          {
            label: ""
            //backgroundColor: ["silver","skyblue","green","red"],
            , backgroundColor: ["#edebea","#c1d9ff","#75abff","#287bff"]
            , data: [ objRangeGrp[0].totWeigt ,objRangeGrp[1000].totWeigt,objRangeGrp[5000].totWeigt, objRangeGrp[10000].totWeigt ]
          }
        ]
      }
      ,{
          title: {
            display: true,
            text: 'Voting Rate'
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

  },
  mounted: function() {
    data.acct_nm = localStorage.getItem('steem.id');
    inqryVotingStatistics();
    //drawChart();
  }
}
</script>
