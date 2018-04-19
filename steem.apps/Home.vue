<template>

<div class="">

  <div class="form-group ">
    <div class="row ">
      <div class="col-sm-6 col-sm-offset-2">
        <div class="input-group">
          <span class="input-group-addon primary">
            <!--i class="glyphicon glyphicon-user"></i-->
            @
          </span>
          <input data-toggle="tooltip" title="아이디를 입력해주세요!" required @keyup.enter="inqryAccountInfo" v-model="data.acct_nm" id="acct_nm" type="text" class="form-control " name="acct_nm" placeholder="account name">
          <span class="input-group-btn">
            <button type="submit" class="btn btn-primary " v-on:click="inqryAccountInfo">Submit</button>
          </span>
        </div>
      </div>
    </div> <!-- row -->
  </div><!-- form-group -->

<div id="acct_info" class="form-group">
  <div class="row">
    <div class="col-sm-3">
      <div class="input-group">
        <span class="input-group-addon white">
          <div class="margin-bottom-sm"><h4><a :href="`https://steemit.com/@${data.inqry_acct}`" target="_blank">@{{data.inqry_acct}}</a> ({{data.reputation}}) </h4></div>
          <div class="strong margin-bottom-xs">{{data.acct_sp_tot | comma }} SP</div>
          <div class="small margin-bottom-sm text-warning ">({{data.acct_sp | comma }} - {{data.acct_sp_delegate | comma}} + {{data.acct_sp_received | comma}} )</div>
          <img :src="`https://steemitimages.com/64x64/https://steemitimages.com/u/${data.inqry_acct}/avatar`" class="img-circle" alt="avatar">
        </span>
      </div>
    </div>

    <div class="col-sm-4">
      <div class="input-group">
        <span class="input-group-addon white">
          <div class="text-info margin-top-md">
            VP ( $ {{data.voting_value}} / {{data.voting_full_value}} )
            Full in {{data.full_in_hour}} hours
          </div>
          <div class="text-info">
            <input id="vp_slider" data-slider-id='data_vp_slider' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="0" data-popup-enabled="true" />
          </div>
          <div class="progress margin-bottom-sm">
            <div id="voting_power" class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" style="width: 0%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
              <span>
                {{data.voting_power}}%
              </span>
            </div>
          </div>



          <div class="text-success">Bandwidth Remaining</div>
          <div class="progress margin-bottom-sm">
            <div id="bandwidth_remaining" class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" style="width: 0%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
              <span>{{data.bandwidth_remaining}}%</span>
            </div>
          </div>
        </span>
      </div>
    </div> <!-- col -->

    <div class="col-sm-3">
      <div class="input-group">
        <span class="input-group-addon white">
          <div class="text-info text-left margin-top-xs">
            <div class="margin-bottom-xs" >POSTS : {{ data.post_count | comma }}</div>
            <div class="margin-bottom-xs" >KRW/USD ￦ {{data.krw_usd | comma}} </div>
            <div v-bind:class="inc_color_steem" >STEEM ￦ {{data.upbit_krw_steem | comma}} ( {{ data.upbit_krw_steem_change>0?'+':'' }} {{ data.upbit_krw_steem_change| inc_round }}%) </div>
            <div v-bind:class="inc_color_sbd" >SBD ￦ {{data.upbit_krw_sbd | comma}} ( {{ data.upbit_krw_steem_change>0?'+':'' }} {{ data.upbit_krw_sbd_change | inc_round}}%) </div>
          </div>

        </span>
      </div>
    </div> <!-- col -->

    <!--div class="col-sm-4">
      <div class="input-group">
        <span class="input-group-addon white">
          ffff
        </span>
      </div>
    </div--><!-- / col -->

  </div> <!-- row -->
<hr />
</div>



<div class="panel panel-success hidden">
	<div class="panel-heading">
		<h5 class="panel-title">Result</h5>
	</div>
	<div class="panel-body" id="textDiv"><span v-html="data.busy_msg"></span></div>
</div>


<br />

<div class="hidden">
  <center>
    <img src="./asset/img/busy.png" /><br />
    내겐 얼마나 보팅을 해줄까?<br />
    <button type="submit" class="btn btn-primary " v-on:click="getBusyVotingPower">Calc @busy.org</button>
    <br />
  </center>
</div>

</div>
</template>

<style>
#data_vp_slider .slider-selection {
  background: #69A9EC;
}
.slider {
    width: 100% !important;
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

async function getSteemPower(callback){
  var result = await steem.api.getDynamicGlobalPropertiesAsync();
  var steemPower = result.total_vesting_fund_steem.replace(" STEEM", "") / result.total_vesting_shares.replace(" VESTS", "");
  //callback(steemPower);
  return steemPower;
}

async function cb_requestWS( res ){
  //alert("콜백이 실행이 되는군....");

  var body = JSON.parse( res.body );
  const followers_mvest = body[0].followers_mvest;
  console.log("followers_mvest : " + followers_mvest);
  var votingPower = calculateVotingPower(followers_mvest);

  var steemPower;
  var result;
  steemPower = await getSteemPower();



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

  localStorage.setItem('steem.id', data.acct_nm);

  if(requestIO( { cmd : "proxy" , url : "https://steemdb.com/api/accounts?account=" + data.acct_nm }, cb_requestWS )){
    waitingDialog.show('Calculate the voting power of @busy.org', { progressType: 'primary'});
  }else{
    data.busy_msg = "현재 서비스가 원활하지 않습니다.잠시 후에 재시도 해주세요.";
  }
}

function getCurrentMedianHistoryPrice(){
  var deferred = $.Deferred();
  //console.error(deferred);
  steem.api.getCurrentMedianHistoryPrice(function(err, result){
    if(err){
      deferred.reject(err);
    }else{
      deferred.resolve(result);
    }
  });
  return deferred.promise();
}

function getRewardFund(){
  var deferred = $.Deferred();
  //console.error(deferred);
  //steem.api.getRewardFundAsync("post")
  steem.api.getRewardFund("post",function(err, result){
    if(err){
      deferred.reject(err);
    }else{
      deferred.resolve(result);
    }
  });
  return deferred.promise();
}

function getDynamicGlobalProperties(){
  var deferred = $.Deferred();
  //console.error(deferred);
  //steem.api.getRewardFundAsync("post")
  steem.api.getDynamicGlobalProperties(function(err, result){
    if(err){
      deferred.reject(err);
    }else{
      deferred.resolve(result);
    }
  });
  return deferred.promise();
}

// steem.api.getAccounts
function getAccounts( arr_acct_nm ){
  var deferred = $.Deferred();
  //console.error(deferred);
  //steem.api.getRewardFundAsync("post")
  steem.api.getAccounts( arr_acct_nm, function(err, result){
    if(err){
      deferred.reject(err);
    }else{
      deferred.resolve(result);
    }
  });
  return deferred.promise();
}

function _inqryAccountInfo(marketInfo, rewardFund, gprops, acctInfo){

  try{

    //var acctInfo = await steem.api.getAccountsAsync( [ data.acct_nm ] );
    if( acctInfo.length == 0  ){
      return;
    }


    waitingDialog.hide();

    //var gprops = await steem.api.getDynamicGlobalPropertiesAsync();
    var steemPower = gprops.total_vesting_fund_steem.replace(" STEEM", "") / gprops.total_vesting_shares.replace(" VESTS", "");
    data.post_count = acctInfo[0].post_count;
    //console.log(gprops, acctInfo, steemPower);
    var userTotalVest = parseInt(acctInfo[0].vesting_shares.replace(" VESTS", ""))
    - parseInt(acctInfo[0].delegated_vesting_shares.replace(" VESTS", ""))
    + parseInt(acctInfo[0].received_vesting_shares.replace(" VESTS", ""));
    data.acct_sp_tot = Math.floor(userTotalVest * steemPower);
    data.acct_sp = Math.floor(parseInt(acctInfo[0].vesting_shares.replace(" VESTS", "")) * steemPower);
    data.acct_sp_delegate = Math.floor(parseInt(acctInfo[0].delegated_vesting_shares.replace(" VESTS", "")) * steemPower);
    data.acct_sp_received = Math.floor(parseInt(acctInfo[0].received_vesting_shares.replace(" VESTS", "")) * steemPower);

    var secondsago = (new Date - new Date(acctInfo[0].last_vote_time + "Z")) / 1000;
    var vpow = acctInfo[0].voting_power + (10000 * secondsago / 432000);
    vpow = Math.min(vpow / 100, 100).toFixed(2);

    const STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS = 60 * 60 * 24 * 7;
    let vestingShares = parseFloat(acctInfo[0].vesting_shares.replace(" VESTS", ""))
    let receivedVestingShares = parseFloat(acctInfo[0].received_vesting_shares.replace(" VESTS", ""))
    let totalVestingShares = parseFloat(gprops.total_vesting_shares.replace(" VESTS", ""))
    let max_virtual_bandwidth = parseInt(gprops.max_virtual_bandwidth, 10)
    let average_bandwidth = parseInt(acctInfo[0].average_bandwidth, 10)

    let delta_time = (new Date - new Date(acctInfo[0].last_bandwidth_update + "Z")) / 1000

    let bandwidthAllocated = (max_virtual_bandwidth  * (vestingShares + receivedVestingShares) / totalVestingShares)
    bandwidthAllocated = Math.round(bandwidthAllocated / 1000000);

    let new_bandwidth = 0
    if (delta_time < STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS) {
      new_bandwidth = (((STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS - delta_time)*average_bandwidth)/STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS)
    }
    new_bandwidth = Math.round(new_bandwidth / 1000000);
    let bandwidth_remaining = 100 - (100 * new_bandwidth / bandwidthAllocated);
    bandwidth_remaining = bandwidth_remaining.toFixed(2);
    //console.log("current bandwidth used", new_bandwidth);
    //console.log("current bandwidth allocated", bandwidthAllocated);
    //console.log("bandwidth % used", 100 * new_bandwidth / bandwidthAllocated);
    //console.log("bandwidth % remaining", bandwidth_remaining);


    data.bandwidth_remaining = bandwidth_remaining;
    // max(log10(abs(reputation))-9,0)*((reputation>= 0)?1:-1)*9+25
    var reputation = Math.max(Math.log10(Math.abs(acctInfo[0].reputation))-9,0)*((acctInfo[0].reputation>= 0)?1:-1)*9+25;

    //data.reputation = steem.formatter.reputation(acctInfo[0].reputation);
    data.reputation = reputation.toFixed(1);


    //$('#vp_slider').slider('value', parseInt(vpow));
    //$('#vp_slider').val( parseInt(vpow));
    //$('#vp_slider').bootstrapSlider('setValue', parseInt(vpow));
    //$("#vp_slider").attr('data-slider-value', parseInt(vpow));
    //$("#vp_slider").bootstrapSlider('refresh');

    $("#vp_slider").bootstrapSlider('setValue', vpow);
    //$("#vp_slider").slider('setValue', vpow);

    $("#voting_power").css("width", vpow+"%");
    data.voting_power = vpow;
    //setVpSlider( parseInt(vpow)  );
    $("#bandwidth_remaining").css("width", bandwidth_remaining+"%");
    //var rewardFund = await steem.api.getRewardFundAsync("post");

    data.reward_balance = rewardFund.reward_balance.replace(" STEEM", "");
    data.recent_claims = rewardFund.recent_claims;
    //var marketInfo = await steem.api.getCurrentMedianHistoryPriceAsync();
    data.base = marketInfo.base.replace(" SBD", "");
    data.quote = marketInfo.quote.replace(" STEEM", "");
    data.steem_power = steemPower;
    //var a = gprops.total_vesting_fund_steem.replace(" STEEM", "") / gprops.total_vesting_shares.replace(" VESTS", "");

    calcVotingValue();


  }catch(err){

  }finally{
    $("#acct_info").removeClass("hidden");
    waitingDialog.hide();
    //$("#acct_nm").focus();
  }

}

function calcVotingValue( value ){
  var n = 100;
  var r = data.acct_sp_tot / data.steem_power;
  var p = 1e4;

  value = value ? value : data.voting_power;

  var m = parseInt(100 * ( value) * (100 * n) / p);
  m = parseInt((m + 49) / 50);

  var m_full = parseInt(100 * 100 * (100 * n) / p);
  m_full = parseInt((m_full + 49) / 50);

  var i = data.reward_balance / data.recent_claims;
  var l = parseInt(r * m * 100) * i * (data.base / data.quote);
  var l_full = parseInt(r * m_full * 100) * i * (data.base / data.quote);

  data.voting_value = l.toFixed(2);
  data.voting_full_value = l_full.toFixed(2);
  console.log("voting value : ", l, l.toFixed(2));

  data.full_in_hour = parseInt( (100 - data.voting_power) / 20 * 24 );


}

function inqryAccountInfo(){
  try{
    if( !data.acct_nm ){
      return;
    }
    waitingDialog.show('계정정보를 조회하고 있습니다.', { progressType: 'primary'});
    var combinedPromise = $.when(
      getCurrentMedianHistoryPrice()
      , getRewardFund("poste")
      , getDynamicGlobalProperties()
      , getAccounts([data.acct_nm])
    );
    combinedPromise.fail(function(f1Val, f2Val, f3Val, f4Val) {
        waitingDialog.hide();
        alert('Steem Node Error!');
        console.error('fail!', f1Val, f2Val, f3Val, f4Val);
    });
    localStorage.setItem('steem.id', data.acct_nm);
    data.inqry_acct = data.acct_nm;
    // 함수는 getData와 getLocation이 둘 다 해결됐을 때 호출될 것이다.
    combinedPromise.done(function(marketInfo, rewardFund, gprops, acctInfo){
      console.log("We get data: " , marketInfo, rewardFund, gprops, acctInfo);
      _inqryAccountInfo(marketInfo, rewardFund, gprops, acctInfo);
    });
  }catch(err){
    console.error("error!", err);
  }finally{

  }
}

function setVpSlider( initValue ){
  var slider = $('#vp_slider').bootstrapSlider({
  //var slider = $('#vp_slider').slider({
    formatter: function(value) {
      $("#voting_power").css("width", value+"%");
      data.voting_power = value;
      calcVotingValue();
      return value + ' %';
    }
    , change: function(event, ui) {
      console.log("has changed");
    }
    , value : initValue
    , min : 0
    , max : 100
    , step : 1
    , width: '100%'
    , ticks_tooltip : true
    //, data-popup-enabled="true"
    //, tooltip : 'always'

  });
  // .find(".slider-handle min-slider-handle round")
  var round_div = $(slider.bootstrapSlider('getElement')).find(".slider-handle.min-slider-handle.round");
  round_div.on( 'touchstart', ()=>{ slider.bootstrapSlider('showTooltip'); });
  round_div.on( 'touchend', ()=>{ slider.bootstrapSlider('hideTooltip'); });
}

function getExternalApi(url, fromNames, toNames){
  $.ajax({
      url:url,
      dataType:'json',
      type: 'get',
      data: '',
      success:function(response){
        if( Array.isArray(fromNames) ){
          for(let i = 0; i < fromNames.length;i++){
            data[toNames[i]] = response[0][fromNames[i]];
          }
        }else{
          data[toNames] = response[0][fromNames];
        }
        //console.error(response);
      }
      , fail : function(err){
        console.error(err);
      }
  });
}

var data = {
  acct_nm: ''
  , inqry_acct : ''
  , busy_msg : ''
  , acct_sp_tot : 0
  , acct_sp : 0
  , acct_sp_delegate : 0
  , acct_sp_received : 0
  , voting_power : 0
  , bandwidth_remaining : 0
  , reputation : 0
  , voting_value : 0
  , voting_full_value : 0
  , reward_balance : 0
  , recent_claims : 0
  , base : 0
  , quote : 0
  , steem_power : 0
  , full_in_hour : 0
  , krw_usd : 0
  , upbit_krw_sbd : 0
  , upbit_krw_sbd_change : 0
  , upbit_krw_steem : 0
  , upbit_krw_steem_change : 0
  , post_count : 0
};
//var data2 = data.clone();
var home = module.exports = {
  data: function() {
    return {
      data: data
    }
  }
  , methods: {
    getBusyVotingPower : function(){
      getBusyVotingPower();
    }
    , inqryAccountInfo : function(){
      inqryAccountInfo();
    }
    , getCurrentMedianHistoryPriceAsync : function(){
      getCurrentMedianHistoryPriceAsync();
    }
  }
  , created : function(){
    var steem_id = localStorage.getItem('steem.id');
    if( !steem_id ){
      $("#acct_info").addClass("hidden");
      //console.log("eeeeeeeeeeeeee");
    }
  }
  ,filters: {
      comma : function (value) {
        if( !value ) return value;
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      , inc_round : function ( value ){
        if( !value ) return value;
        var newValue = Math.floor(parseFloat(value) * 10000);
        if( newValue == 0 ) return 0;
        return newValue / 100.0;
      }
    }
  ,computed: {
    inc_color_steem: function (  ) {
      return [
        ( this.data.upbit_krw_steem_change > 0 ) ?  'text-danger' : 'text-primary'
        , 'margin-bottom-xs'
        //this.data.upbit_krw_steem_change
      ]
    }
    , inc_color_sbd: function (  ) {
      return [
        ( this.data.upbit_krw_sbd_change > 0 ) ?  'text-danger' : 'text-primary'
        //this.data.upbit_krw_steem_change
      ]
    }
  }

  , mounted: function() {
    // get krw/usd
    getExternalApi(
      'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD'
      , 'basePrice'
      , 'krw_usd'
    );
    // get upbit steem
    getSteemPrice();
    setInterval(getSteemPrice, 19000);
    // get upbit sbd
    getSBDPrice();
    setInterval(getSBDPrice, 20000);

    var steem_id = localStorage.getItem('steem.id');
    if( steem_id ){
        data.acct_nm = steem_id;
        inqryAccountInfo();
    }else{
      $("#acct_info").addClass("hidden");
    }
    setVpSlider(0);
  }
}

getSteemPrice = () => {getExternalApi(
  'https://crix-api-endpoint.upbit.com/v1/crix/candles/days?code=CRIX.UPBIT.KRW-STEEM&count=1'
  , ['tradePrice', 'signedChangeRate']
  , ['upbit_krw_steem', 'upbit_krw_steem_change']
)}

getSBDPrice = () => {getExternalApi(
  'https://crix-api-endpoint.upbit.com/v1/crix/candles/days?code=CRIX.UPBIT.KRW-SBD&count=1'
  , ['tradePrice', 'signedChangeRate']
  , ['upbit_krw_sbd', 'upbit_krw_sbd_change']
)}
</script>
