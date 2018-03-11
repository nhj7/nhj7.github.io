<template>

<div>
<div class="form-group">
  <div class="row">
    <div class="col-sm-4 col-sm-offset-4">
      <div class="input-group">
        <span class="input-group-addon primary">
          <!--i class="glyphicon glyphicon-user"></i-->
          @
        </span>
        <input @keyup.enter="getBusyVotingPower" v-model="data.acct_nm" id="acct_nm" type="text" class="form-control " name="acct_nm" placeholder="steemit account name">
        <span class="input-group-btn">
          <button type="submit" class="btn btn-primary " v-on:click="getBusyVotingPower">Submit</button>
        </span>

      </div>
    </div>
  </div> <!-- row -->
</div><!-- form-group -->

{{ data.busy_msg }}

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

function cb_requestWS( res ){
  //alert("콜백이 실행이 되는군....");
  var body = JSON.parse( res.body );
  const followers_mvest = body[0].followers_mvest;
  console.log("followers_mvest : " + followers_mvest);
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

  data.busy_msg = "@"+data.acct_nm+"님께서는 @busy.org에게 " + votingPower + "% 의 파워로 보팅 받으실 수 있습니다." ;

  waitingDialog.hide();
}
function getBusyVotingPower() {
  if(requestWS( { cmd : "proxy" , url : "https://steemdb.com/api/accounts?account=" + data.acct_nm }, cb_requestWS )){
    waitingDialog.show('Calculate the voting power of @busy.org', { progressType: 'primary'});
  }
}
var data = {
  acct_nm: 'nhj12311'
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
