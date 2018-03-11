<template>

<div>
<div>
  <center>
    <img src="./asset/img/busy.png" /><br />
    내겐 얼마나 보팅을 해줄까?<br /><br />
  </center>
</div>
<div class="form-group">
  <div class="row">
    <div class="col-sm-4 col-sm-offset-4">
      <div class="input-group">
        <span class="input-group-addon primary">
          <!--i class="glyphicon glyphicon-user"></i-->
          @
        </span>
        <input data-toggle="tooltip" title="아이디를 입력해주세요!" required @keyup.enter="getBusyVotingPower" v-model="data.acct_nm" id="acct_nm" type="text" class="form-control " name="acct_nm" placeholder="steemit account name">
        <span class="input-group-btn">
          <button type="submit" class="btn btn-primary " v-on:click="getBusyVotingPower">Submit</button>
        </span>

      </div>
    </div>
  </div> <!-- row -->
</div><!-- form-group -->

<div class="panel panel-success">
	<div class="panel-heading">
		<h5 class="panel-title">Result</h5>
	</div>
	<div class="panel-body" id="textDiv"><span v-html="data.busy_msg"></span></div>
</div>


<br />

</div>
</template>

<style>
.input-group-addon.primary {
  color: rgb(255, 255, 255);
  background-color: rgb(50, 118, 177);
  border-color: rgb(40, 94, 142);
}
.input-group-addon.success {
  color: rgb(255, 255, 255);
  background-color: rgb(92, 184, 92);
  border-color: rgb(76, 174, 76);
}
.input-group-addon.info {
  color: rgb(255, 255, 255);
  background-color: rgb(57, 179, 215);
  border-color: rgb(38, 154, 188);
}
.input-group-addon.warning {
  color: rgb(255, 255, 255);
  background-color: rgb(240, 173, 78);
  border-color: rgb(238, 162, 54);
}
.input-group-addon.danger {
  color: rgb(255, 255, 255);
  background-color: rgb(217, 83, 79);
  border-color: rgb(212, 63, 58);
}
</style>

<script>
// Delay between 2 votes is 12 hours
const delay = parseInt(43200);
// Amount required to get the minimum upvote (1%) is 20000000 VESTS ~ 2 Dolphins ~ 10 000 SP
const minVests = 20000000;
// Amount required to get 100% upvote is 4000000000000 VESTS ~ 2 000 Whales ~ 2 000 000 000 SP
const maxVests = 4000000000000;
// Don't upvote user beyond 10000000000000 VESTS
const limitVests = 10000000000000;
// Don't upvote more than 25%
const maxUpvote = 2500;
function calculateVotingPower(followers_mvest){

  let votingPower = 0;
  try {
    votingPower = followers_mvest >= minVests ? parseFloat(10000 / maxVests * followers_mvest) : 0;
    votingPower = votingPower > 10000 ? 10000 : parseFloat(votingPower);
    votingPower = (votingPower > 0 && votingPower < 6) ? 6 : parseInt(votingPower);
    if (maxUpvote) {
      votingPower = votingPower > maxUpvote ? maxUpvote : votingPower;
    }
    if (limitVests && followers_mvest >= limitVests) {
      votingPower = 0;
    }
  } catch (e) {
    console.log(e);
  }
  console.log( "votingPower : " + votingPower );
  if( votingPower > 0 ){
      votingPower = votingPower / 100.0;
  }
  return votingPower;
}

async function cb_requestWS( res ){
  //alert("콜백이 실행이 되는군....");
  var body = JSON.parse( res.body );
  const followers_mvest = body[0].followers_mvest;
  console.log("followers_mvest : " + followers_mvest);
  var votingPower = calculateVotingPower(followers_mvest);

  var steemPower;
  var result = await steem.api.getDynamicGlobalPropertiesAsync();
  steemPower = result.total_vesting_fund_steem.replace(" STEEM", "") / result.total_vesting_shares.replace(" VESTS", "");

  result = await steem.api.getAccountsAsync( ["busy.org", data.acct_nm ] );
  var userTotalVest = parseInt(result[0].vesting_shares.replace(" VESTS", ""))
  - parseInt(result[0].delegated_vesting_shares.replace(" VESTS", ""))
  + parseInt(result[0].received_vesting_shares.replace(" VESTS", ""));
  var accountSP = userTotalVest * steemPower;
  console.log("busy.org의 스파는...? ", Math.floor(accountSP));

  var followersSP = followers_mvest * steemPower;
  console.log("나의 팔로우의 스파는?", Math.floor(followersSP));
  var minSP = minVests * steemPower;
  var maxSP = maxVests * steemPower;

  var msg = "<a>@"+data.acct_nm+"</a>님께서는 <a>@busy.org</a>에게 " + votingPower + "% 의 파워로 보팅 받으실 수 있습니다.";
  msg += "<br/><br/><a>@busy.org</a> 스팀파워 : " + comma(Math.floor(accountSP));
  msg += "<br/> 내 팔로워 스파 총합은? : " + comma(Math.floor(followersSP));
  //msg += "<br/> 최소 팔로우 스파 총합은? : " + Math.floor(minSP);
  //msg += "<br/> 최대 팔로우 스파 총합은? : " + Math.floor(maxSP);


  data.busy_msg =  msg;

  waitingDialog.hide();
}
function getBusyVotingPower() {
  if($('#acct_nm').val().length == 0 ) {
    $('#acct_nm').tooltip('show');
    return;
  }

  if(requestWS( { cmd : "proxy" , url : "https://steemdb.com/api/accounts?account=" + data.acct_nm }, cb_requestWS )){
    waitingDialog.show('Calculate the voting power of @busy.org', { progressType: 'primary'});
  }
}

var data = {
  acct_nm: ''
  , busy_msg : ''
};
var home = module.exports = {

  data: function() {
    return {
      data: data
    }
  },
  methods: {
    getBusyVotingPower : function(){
      getBusyVotingPower();
    }
  },
  mounted: function() {

  }
}
</script>
