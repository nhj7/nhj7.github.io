<template>
    <div id="ca_app" class="container" >
<div class="starter-template">
	<p class="lead">
		I will share an easy way to create accounts. You want to create
		an account and share it with your friends. To create an account, you need {{DATA.feeString}}.

    Your newly created account will contain {{DATA.feeString}}. The creation fee is zero.

	</p>
  <p class="lead">
    This error message indicates that the active privte key is invalid. Please check the active private key.
    [ Expected version 128, instead got 0 ]
  </p>
</div>
<div  class="container">
	<form id="create-form" class="form-signin" action="javascript:;" v-on:submit="create_account_step1"
		>
		<h2 class="form-signin-heading">Enter Steemit creator account
			info</h2>
		<label for="creatorAccount" class="sr-only">Creator Account</label> <input
			type="id" id="creatorAccount" class="form-control"
			placeholder="Creator Account" required autofocus> <label
			for="Active Key" class="sr-only">Active Key</label> <input
			type="password" id="inputPassword" class="form-control"
			placeholder="Active Private Key" required>
		<br /> <label for="newAccount" class="sr-only">new
			Account</label> <input type="id" id="newAccount" class="form-control"
			placeholder="New Account Name" required autofocus> <br />
		<!--button class="btn btn-lg btn-primary btn-block" type="button" v-on:click="create_account_step1(); return false; " >Create Account</button-->
		<button type="submit" class="btn btn-lg btn-primary btn-block">Check and Create Account.</button>
	</form>

</div>
<!-- /container -->
<br />
<br />
<h3></h3>

<div class="panel panel-danger">
	<div class="panel-heading">
		<h3 class="panel-title">Result</h3>
	</div>
	<div class="panel-body" id="textDiv"></div>
</div>

</div>
</template>

<script>
	var creator = 'nhj12311';
	var creatorWif = '';

	var newAccountName = '';

	function addTextDiv(txt) {
				var div = document.createElement("div");
				div.innerHTML = txt;
				console.log("addTextDiv : " + txt);
				document.getElementById("textDiv").appendChild(div);
			}

	function create_account_step1() {
				creator = document.getElementById("creatorAccount").value;
				creatorWif = document.getElementById("inputPassword").value;
				newAccountName = document.getElementById("newAccount").value;

				console.log("newAccountName : " + newAccountName);

				//addTextDiv("password : "+ newAccountPassword);

				steem.api.getAccounts([ newAccountName ], function(err, result) {
					console.log(err, result);

					if (result[0] == null) {
						create_account_step2();

					} else {
						addTextDiv("Erorr : Exsits Account [" + newAccountName + "]");
					}
				});

			}
  var feeString;
	function create_account_step2(){
		newAccountName = document.getElementById("newAccount").value;
		var newAccountPassword = steem.formatter.createSuggestedPassword();
		var roles = ["POSTING", "ACTIVE", "OWNER", "MEMO"];

		var arrPublicKey = steem.auth.generateKeys(newAccountName, newAccountPassword, roles);
		var arrPrivateKey = steem.auth.getPrivateKeys(newAccountName, newAccountPassword, roles);



		var owner = {
			weight_threshold: 1,
			account_auths: [],
			key_auths: [[ arrPublicKey["OWNER"] , 1]]
		};
		var active = {
			weight_threshold: 1,
			account_auths: [],
			key_auths: [[arrPublicKey["ACTIVE"], 1]]
		};
		var posting = {
			weight_threshold: 1,
			account_auths: [],
			key_auths: [[arrPublicKey["POSTING"], 1]]
		};

		steem.api.getConfig(function(err, config) {
		  if(err){
			console.log(err, config);
			throw new Error(err);
		  }

		  steem.api.getChainProperties(function(err2, chainProps) {
			if(err2){
			  console.log(err2, chainProps);
			  throw new Error(err2);
			}

			var ratio = config['STEEM_CREATE_ACCOUNT_WITH_STEEM_MODIFIER'];
			var fee = dsteem.Asset.from(chainProps.account_creation_fee).multiply(ratio);

			var feeString = fee.toString();
			var jsonMetadata = '';

			steem.broadcast.accountCreate(creatorWif, feeString, creator,
						newAccountName, owner, active, posting, arrPublicKey["MEMO"],
						jsonMetadata, function(err, result) {

			  console.log("err : "+err, result);
			  addTextDiv("-------------------------------------------------------------");
			  if( err != null){
				addTextDiv("Error : " + err + "["+result+"]");
			  }else{
				addTextDiv("GENERATE PRIVATE KEYS - Please keep the owner key. ");
				addTextDiv(" ");


				addTextDiv("<strong>account name : " + newAccountName + "<strong>");
				addTextDiv("<strong>Owner Key : " + arrPrivateKey["OWNER"] + "<strong>");
			  }
				addTextDiv("-------------------------------------------------------------");
				addTextDiv("<br />");

			});

		  });
		});

	}
var DATA = {
  feeString : ""
}
function getCreateAccountFee(){
  steem.api.getConfig(function(err, config) {
    if(err){
      console.log(err, config);
      throw new Error(err);
    }
    console.log(err, config);
    steem.api.getChainProperties(function(err2, chainProps) {
      if(err2){
        console.log(err2, chainProps);
        throw new Error(err2);
      }
      console.log(err2, chainProps);
      var ratio = config['STEEM_CREATE_ACCOUNT_WITH_STEEM_MODIFIER'];
      var fee = dsteem.Asset.from(chainProps.account_creation_fee).multiply(ratio);

      var feeString = fee.toString();
      DATA.feeString = feeString;
    });
  });
}
module.exports = {
    data: function() {
        return {
            myAccount: '@nhj12311'
            , DATA : DATA
        }
    }
    , methods : {
			create_account_step1 : function() {
				create_account_step1();
			}
    }
    , mounted : function(){
        getCreateAccountFee();
    }
}


</script>
