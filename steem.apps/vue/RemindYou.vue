<template>
<div>

  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="input-group" id="adv-search">
          <span class="input-group-addon">@</span>
          <input id="accountName" type="text" class="form-control" placeholder="Remind You" />
          <div class="input-group-btn">
            <div class="btn-group" role="group">
              <div class="dropdown dropdown-lg">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button>
                <div class="dropdown-menu dropdown-menu-right" role="menu">
                  <form class="form-horizontal" role="form">
                    <div class="form-group">
                      <label for="filter">Filter by</label>
                      <select class="form-control">
                        <option value="30" selected>30 Days</option>
                        <option value="15">15 Days</option>
                        <option value="7">7 Days</option>
                        <!--option value="3">Top rated</option>
                        <option value="4">Most commented</option-->
                      </select>
                    </div>
                    <!--div class="form-group">
                      <label for="contain">Author</label>
                      <input class="form-control" type="text" />
                    </div>
                    <div class="form-group">
                      <label for="contain">Contains the words</label>
                      <input class="form-control" type="text" />
                    </div-->
                    <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                  </form>
                </div>
              </div>
              <button type="button" v-on:click="RemindYou" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br /><br />

    <!-- post -->

    <div class="container">
      <div class="row">
        <!-- for each start -->

        <div class="row">
          <div class="col-xs-12 col-sm-3 col-md-3">
            <a href="#">
                <img src="https://steemitimages.com/0x0/https://steemitimages.com/DQmQpbti4ggmThWqp4tDwFYXPes8ys9iFAEdFktsXWviVr8/image.png" class="img-responsive img-box img-thumbnail">
            </a>
          </div>
          <div class="col-xs-12 col-sm-9 col-md-9">
            <div class="list-group">
              <div class="list-group-item">
                <div class="row-picture">
                  <a href="#" title="sintret">
                      <img class="circle img-thumbnail img-box" src="https://steemitimages.com/u/nhj12311/avatar" alt="sintret">
                  </a>
                </div>
                <div class="row-content">
                  <div class="list-group-item-heading">
                    <small><a href="#" title="sintret">@nhj12311</a>(62) </small>
                  </div>
                  <small>
                      <i class="glyphicon glyphicon-time"></i> 1 days ago in kr-dev
                      <br>
                      <span class="explore"><a href="#"><i class="glyphicon glyphicon-chevron-up"></i> 20 votes | <i class="glyphicon glyphicon-comment"></i> 6</a></span>
                  </small>
                </div>
              </div>
            </div>
            <h4><a href="#">[개발] 자바스크립트 크롬의 불안정한 배열 정렬 문제 - Javascript chrome-v8 Unstable sorting problem</a></h4>
            <p>최근 내 개인 프로젝트 내에 이것저것 기능을 추가하며 공부까지 겸하고 있는데 자바스크립트의 Array.sort를 사용하다가 멘탈에 금이가는 걸 겪으며 해결했던 걸 정리해본다. 앞으로 개발쪽의 글은 1차적으로 개인적인 공부를 하며 정리 하는 목표와 2차적으로 이글을 보는 개발자에게 도움이 되었으면 한다</p>
          </div>
        </div>

        <hr>
        <!-- item -->

        <div class="row">
          <div class="col-xs-12 col-sm-3 col-md-3">
            <a href="#">
                <img src="https://steemitimages.com/0x0/http://pds2.egloos.com/pds/1/200512/01/24/a0012724_17453484.jpg" class="img-responsive img-box img-thumbnail">
            </a>
          </div>
          <div class="col-xs-12 col-sm-9 col-md-9">
            <div class="list-group">
              <div class="list-group-item">
                <div class="row-picture">
                  <a href="#" title="sintret">
                      <img class="circle img-thumbnail img-box" src="https://steemitimages.com/u/nhj12311/avatar" alt="sintret">
                  </a>
                </div>
                <div class="row-content">
                  <div class="list-group-item-heading">
                    <small><a href="#" title="sintret">@nhj12311</a>(62) </small>
                  </div>
                  <small>
                      <i class="glyphicon glyphicon-time"></i> 1 days ago in kr-dev
                      <br>
                      <span class="explore"><a href="#"><i class="glyphicon glyphicon-chevron-up"></i> 20 votes | <i class="glyphicon glyphicon-comment"></i> 6</a></span>
                  </small>
                </div>
              </div>
            </div>
            <h4><a href="#">[개발] 자바스크립트 크롬의 불안정한 배열 정렬 문제 - Javascript chrome-v8 Unstable sorting problem</a></h4>
            <p>최근 내 개인 프로젝트 내에 이것저것 기능을 추가하며 공부까지 겸하고 있는데 자바스크립트의 Array.sort를 사용하다가 멘탈에 금이가는 걸 겪으며 해결했던 걸 정리해본다. 앞으로 개발쪽의 글은 1차적으로 개인적인 공부를 하며 정리 하는 목표와 2차적으로 이글을 보는 개발자에게 도움이 되었으면 한다</p>
          </div>
        </div>

        <hr>
        <!-- item -->

        <!-- for each end -->

      </div>
    </div>





  </div>
</template>
<script>
function RemindYou() {
  $("#toggleBarBtn").click();

  var accountName = $("#accountName").val();
  localStorage.setItem("accountName", accountName);
  steem.api.getDiscussionsByVotes({
    author: accountName,
    limit: 10
  }, function(err, result) {
    console.log(err, result);

  });

  var result = steem.api.getAccountVotes(accountName, function(err, result) {
    console.log(err, result);
    $("#toggleBarBtn").click();
  });
  //setTimeout( () => { RemindYou(); } , 1000 );
}

function init() {
  var accountName = localStorage.getItem("accountName");
  console.log("accountName : " + accountName);
  $("#accountName").val(accountName);

}

// function getSPFollower(name) {
//   var spv;
//   var steemPower;
//
//   steem.api.getDynamicGlobalProperties(function(err, result) {
//     spv = result.total_vesting_fund_steem.replace(" STEEM", "") / result.total_vesting_shares.replace(" VESTS", "");
//     steemPower = spv;
//     console.log("spv : "+spv);
//     console.log("steemPower : "+steemPower);
//   });
//
//   var followers = [];
//   var totalSP = 0.0;
//   steem.api.getFollowCount(name, function(err, result) {
//
//     var follower_count = result.follower_count - 100 ;
//     console.log("follower_count : "+ follower_count);
//     steem.api.getFollowers(name, 0, 'blog', 1050, function(err, result) {
//       console.log(result);
//       console.log("result.length : "+result.length);
//       for (var j = 0; j < result.length; j++) {
//         followers[j] = result[j]['follower'];
//       }
//       steem.api.getAccounts(followers, function(err, res) {
//         for (var j = 0; j < result.length; j++) {
//           userTotalVest = parseInt(res[j].vesting_shares.replace(" VESTS", ""))
//           - parseInt(res[j].delegated_vesting_shares.replace(" VESTS", ""))
//           + parseInt(res[j].received_vesting_shares.replace(" VESTS", ""));
//
//           accountSP = userTotalVest * steemPower;
//           console.log(res[j].name, accountSP);
//
//           totalSP += accountSP;
//         }
//
//         console.log('Total Follower SP:', totalSP);
//
//       });
//     });
//   });
// }

// async function getSPFollower2( name ){
//   try{
//     var spv;
//     var steemPower;
//     var result = await steem.api.getDynamicGlobalPropertiesAsync();
//     spv = result.total_vesting_fund_steem.replace(" STEEM", "") / result.total_vesting_shares.replace(" VESTS", "");
//     steemPower = spv;
//     console.log("spv : "+spv);
//     console.log("steemPower : "+steemPower);
//
//     result = await steem.api.getAccountsAsync( [name] );
//     console.log("getAccountsAsync");
//     console.log(result);
//
//     var followers = [];
//     result = await steem.api.getFollowCountAsync(name);
//     console.log("getFollowCountAsync");
//     console.log(result.length);
//     let vmaxLmt = 1000;
//     const maxLmt = 1000;
//     const follower_count = result.follower_count;
//     var followers = [];
//     let totalSP = 0.0;
//     let totalVest = 0.0;
//     for(var i = 0 ; !result.length || vmaxLmt == result.length ; i = result[result.length - 1].follower ){
//       console.log("i : " + i + ", maxLmt : " + vmaxLmt );
//       result = await steem.api.getFollowersAsync(name, i, 'blog', maxLmt );
//       if( i != 0 ){
//         if( result.length == 1 ) { break; }
//         result.splice(0, 1);
//         vmaxLmt = 999;
//       }
//       console.log(result);
//       for (var j = 0; j < result.length; j++) {
//         followers[j] = result[j]['follower'];
//       }
//       var arrAcct = await steem.api.getAccountsAsync(followers);
//       for (var j = 0; j < arrAcct.length; j++) {
//         userTotalVest = parseInt(arrAcct[j].vesting_shares.replace(" VESTS", ""))
//         //- parseInt(arrAcct[j].delegated_vesting_shares.replace(" VESTS", ""))
//         + parseInt(arrAcct[j].received_vesting_shares.replace(" VESTS", ""));
//
//         accountSP = userTotalVest * steemPower;
//         console.log(arrAcct[j].name, accountSP);
//         totalVest += userTotalVest;
//         totalSP += accountSP;
//       }
//
//     } // end for.
//
//     console.log("totalSP : " + totalSP);
//     console.log("totalVest : " + totalVest);
//     const delay = parseInt(43200);
//     // Amount required to get the minimum upvote (1%) is 20000000 VESTS ~ 2 Dolphins ~ 10 000 SP
//     const minVests = 20000000;
//     // Amount required to get 100% upvote is 4000000000000 VESTS ~ 2 000 Whales ~ 2 000 000 000 SP
//     const maxVests = 4000000000000;
//     // Don't upvote user beyond 10000000000000 VESTS
//     const limitVests = 10000000000000;
//     // Don't upvote more than 25%
//     const maxUpvote = 2500;
//
//   }catch(err){
//     console.error(err, "존나 계산하다가 에러남.");
//   }finally{
//     waitingDialog.hide();
//   }
//
//
// }

module.exports = {
  methods: {
    RemindYou: function() {
      RemindYou();
    }
  },
  mounted: function() {
    init();
  }

}
</script>

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

.list-group {
  border-radius: 0;
}

.list-group .list-group-item {
  background-color: transparent;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  padding: 0 16px;
}

.list-group .list-group-item .row-picture,
.list-group .list-group-item .row-action-primary {
  
  display: inline-block;
  padding-right: 16px;
  padding-top: 8px;
}

.list-group .list-group-item .row-picture img,
.list-group .list-group-item .row-action-primary img,
.list-group .list-group-item .row-picture i,
.list-group .list-group-item .row-action-primary i,
.list-group .list-group-item .row-picture label,
.list-group .list-group-item .row-action-primary label {
  display: block;
  width: 56px;
  height: 56px;
}

.list-group .list-group-item .row-picture img,
.list-group .list-group-item .row-action-primary img {
  background: rgba(0, 0, 0, 0.1);
  padding: 1px;
}

.list-group .list-group-item .row-picture img.circle,
.list-group .list-group-item .row-action-primary img.circle {
  border-radius: 100%;
}

.list-group .list-group-item .row-picture i,
.list-group .list-group-item .row-action-primary i {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 100%;
  text-align: center;
  line-height: 56px;
  font-size: 20px;
  color: white;
}

.list-group .list-group-item .row-picture label,
.list-group .list-group-item .row-action-primary label {
  margin-left: 7px;
  margin-right: -7px;
  margin-top: 5px;
  margin-bottom: -5px;
}

.list-group .list-group-item .row-content {
  display: inline-block;
  width: calc(100% - 92px);
  min-height: 66px;
}

.list-group .list-group-item .row-content .action-secondary {
  position: absolute;
  right: 16px;
  top: 16px;
}

.list-group .list-group-item .row-content .action-secondary i {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.list-group .list-group-item .row-content .action-secondary~* {
  max-width: calc(100% - 30px);
}

.list-group .list-group-item .row-content .least-content {
  position: absolute;
  right: 16px;
  top: 0px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
}

.list-group .list-group-item .list-group-item-heading {
  color: rgba(0, 0, 0, 0.77);
  font-size: 20px;
  line-height: 29px;
}

.list-group .list-group-separator {
  clear: both;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 10px;
}

.list-group .list-group-separator:before {
  content: "";
  width: calc(100% - 90px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  float: right;
}

.bg-profile {
  background-color: #3498DB !important;
  height: 150px;
  z-index: 1;
}

.bg-bottom {
  height: 100px;
  margin-left: 30px;
}

.img-profile {
  display: inline-block !important;
  background-color: #fff;
  border-radius: 6px;
  margin-top: -50%;
  padding: 1px;
  vertical-align: bottom;
  border: 2px solid #fff;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  z-index: 2;
}

.row-float {
  margin-top: -40px;
}

.explore a {
  color: green;
  font-size: 13px;
  font-weight: 600
}

.twitter a {
  color: #4099FF
}

.img-box {
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23);
  border-radius: 2px;
  border: 0;
}
</style>
