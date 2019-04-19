<template>
  <div id="RecoveryManaDiv">
    <div class="form-group ">
      <div class="row ">
        <div class="col-sm-6 col-sm-offset-2">
          <div class="input-group">
            <span class="input-group-addon info">
              <!--i class="glyphicon glyphicon-user"></i-->
              @
            </span>
            <input data-toggle="tooltip" title="아이디를 입력해주세요!" required @keyup.enter=";" v-model="data.acct_nm" id="acct_nm" type="text" class="form-control " name="acct_nm" placeholder="account name">

          </div>
        </div>
      </div>
      <!-- row -->

      <div class="row ">
        <div class="col-sm-6 col-sm-offset-2">
          <div class="input-group">
            <span class="input-group-addon info">
              <!--i class="glyphicon glyphicon-user"></i-->
              Posting Key
            </span>
            <input data-toggle="tooltip" title="포스팅 키를 입력해주세요!" required v-on:keyup.enter=";" v-model="data.posting_key" id="posting_key" type="text" class="form-control " name="posting_key" placeholder="private posting key">
            <span class="input-group-btn">
              <button type="submit" class="btn btn-info " v-on:click="recoveryMana">Recovery!</button>
            </span>
            <span class="input-group-addon">

            </span>
          </div>
        </div>
      </div>
      <!-- row -->

    </div>
    <!-- form-group -->
  </div>
</template>
<script>
var data = {
  acct_nm : 'steem.apps2'
  , posting_key : '5Jvc2R7cEruYYfktCcpGEe1KNUZQC1jhFDvwrm7tGWiYTYP4Sfr'
  , isEn : false

};

function recoveryMana(){
  console.log('recoveryMana start.');

  //steem.api.setOptions({url: 'https://api.steemitstage.com/'});
  //steem.api.setOptions({url: 'https://api.steem.house/'});
  steem.api.setOptions({url: 'https://api.steemitdev.com'});
  // const arrNode = [
  //   'https://api.steemit.com'
  //   ,'https://steemd.dist.one'
  //   //,'https://rpc.dist.one'
  //   ,'https://steemd-int.steemit.com'
  //   ,'https://steemd.steemitstage.com'
  //   ,'https://api.steemitstage.com'
  //   //,'https://steemd.pevo.science'
  // ];
  //
  var wif = data.posting_key;
  var author = data.acct_nm;
  var parentAuthor = 'nhj12311';
  var parentPermlink = '4cldle-api';
  var permlink = steem.formatter.commentPermlink(parentAuthor.replace(/./gi,"-"), parentPermlink);
  var title = "";
  var body = '마나 복구용 자동 댓글입니다.';
  var jsonMetadata = {
    "app" : "steem.apps/0.1"
    , "format" : "markdown"

  };

  steem.broadcast.vote(wif, author, parentAuthor, parentPermlink, 100, function(err, result) { console.info(err, result); });

  console.log("comment", wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata );
  steem.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata,
    function(err, result ){
      console.log(err, result);
    }
  );


}

function getTimeBeforeFull(votingPower) {
  var fullInString;
  var remainingPowerToGet = 100.0 - votingPower / 100;
  // 1% every 72minutes
  var minutesNeeded = remainingPowerToGet * 72;
  if (minutesNeeded === 0) {
      fullInString = "Already full!";
  } else {
      var fullInDays = parseInt(minutesNeeded / 1440);
      var fullInHours = parseInt((minutesNeeded - fullInDays * 1440) / 60);
      var fullInMinutes = parseInt((minutesNeeded - fullInDays * 1440 - fullInHours * 60));

      fullInString = (fullInDays === 0 ? '' : fullInDays + (fullInDays > 1 ? ' days ' : 'day ')) +
          (fullInHours === 0 ? '' : fullInHours + (fullInHours > 1 ? ' hours ' : 'hour ')) +
          (fullInMinutes === 0 ? '' : fullInMinutes + (fullInMinutes > 1 ? ' minutes ' : 'minute'));
  }
  return fullInString;
}



module.exports = {
  name: 'RecoveryMana',
  data: function () {
    return {
      data : data
    }
  },
  computed: {

  },filters: {
    comma: function(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    inc_round: function(value) {
      if (!value) return value;
      var newValue = Math.floor(parseFloat(value) * 10000);
      if (newValue == 0) return 0;
      return newValue / 100.0;
    }
  },methods: {
    recoveryMana : function(){recoveryMana();}
  }
  , created: function() {


    console.log('created', null);

  }, mounted : function() {
    console.log('mounted');

    console.log(steem);
    let name = 'nhj12311';
    let param={"jsonrpc":"2.0","id":1,"method":"rc_api.find_rc_accounts","params":{"accounts":[name]}};
    $.ajax({
        url: "https://api.steemitstage.com/",
        type: "POST",
        data: JSON.stringify(param),
        success: function(response){
          console.log(response);
          const STEEM_RC_MANA_REGENERATION_SECONDS =432000;
          const estimated_max = parseFloat(response.result.rc_accounts["0"].max_rc);
          const current_mana = parseFloat(response.result.rc_accounts["0"].rc_manabar.current_mana);
          const last_update_time = parseFloat(response.result.rc_accounts["0"].rc_manabar.last_update_time);
          const diff_in_seconds = Math.round(Date.now()/1000-last_update_time);
          let estimated_mana = (current_mana + diff_in_seconds * estimated_max / STEEM_RC_MANA_REGENERATION_SECONDS);
          if (estimated_mana > estimated_max)
              estimated_mana = estimated_max;

          const estimated_pct = estimated_mana / estimated_max * 100;
          const res= {"current_mana": current_mana, "last_update_time": last_update_time,
                  "estimated_mana": estimated_mana, "estimated_max": estimated_max, "estimated_pct": estimated_pct.toFixed(2),"fullin":getTimeBeforeFull(estimated_pct*100)};
          console.log(res);
        },
        error:function(e){
          console.log(e);
        }
      });
  }
  /*
  , watch: {

    'data.tickerList' : {
      handler: function (val, oldVal) {
        console.log('a thing changed', val, oldVal)
      },
      deep: true
    }
  }
  */

}
</script>
<style>
</style>
