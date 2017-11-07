<template>
    <div id="ca_app" class="container" >
<div class="starter-template">
	<h1>Dear Steemit friends. .</h1>
	<p class="lead">
		I will share an easy way to create accounts.<br /> You want to create
		an account and share it with your friends.
	</p>

</div>

<div  class="container">
	<form id="create-form" class="form-signin"
		>
		<h2 class="form-signin-heading">Enter Steemit creator account
			info</h2>
		<label for="creatorAccount" class="sr-only">Creator Account</label> <input
			type="id" id="creatorAccount" class="form-control"
			placeholder="Creator Account" required autofocus> <label
			for="Active Key" class="sr-only">Active Key</label> <input
			type="password" id="inputPassword" class="form-control"
			placeholder="Active Key" required> <br />
		<!--select id="createMethod" class="selectpicker">
		  <option>Fee(6 steem)</option>
		  <option>Delegation(0.2 steem/29 steem)</option>
		</select-->
		
		<br /> <br /> <label for="newAccount" class="sr-only">new
			Account</label> <input type="id" id="newAccount" class="form-control"
			placeholder="New Account" required autofocus> <br />
		<!--button class="btn btn-lg btn-primary btn-block" type="button" v-on:click="create_account_step1(); return false; " >Create Account</button-->
		<button type="button" class="btn btn-lg btn-primary btn-block" v-on:click="create_account_step1; return false; ">Create
			Account</button>
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
	<div class="panel-body" id=textDiv></div>
</div>

created by
<a href="https://steemit.com/@nhj12311" target="_blank">{{myAccount}}</a>
</div>
</template>

<script>


	

	var creator = 'nhj12311';
	var creatorWif = '';

	var newAccountName = '';
	
	
module.exports = {
    data: function() {
        return {
            myAccount: '@nhj12311'
        }
    }
    , methods : {    	
			addTextDiv : function(txt) {
				var div = document.createElement("div");
				div.innerHTML = txt;
				console.log("addTextDiv : " + txt);
				document.getElementById("textDiv").appendChild(div);
			}
			
			, create_account_step1 : function() {
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
			
			, create_account_step2 : function() {
				newAccountName = document.getElementById("newAccount").value;
				var newAccountPassword = steem.formatter.createSuggestedPassword();
				var roles = [ "POSTING", "ACTIVE", "OWNER", "MEMO" ];
		
				var arrPublicKey = steem.auth.generateKeys(newAccountName,
						newAccountPassword, roles);
				var arrPrivateKey = steem.auth.getPrivateKeys(newAccountName,
						newAccountPassword, roles);
		
				var owner = {
					weight_threshold : 1,
					account_auths : [],
					key_auths : [ [ arrPublicKey["OWNER"], 1 ] ]
				};
				var active = {
					weight_threshold : 1,
					account_auths : [],
					key_auths : [ [ arrPublicKey["ACTIVE"], 1 ] ]
				};
				var posting = {
					weight_threshold : 1,
					account_auths : [],
					key_auths : [ [ arrPublicKey["POSTING"], 1 ] ]
				};
		
				steem.api
						.getConfig(function(err, config) {
							if (err) {
								console.log(err, config);
								throw new Error(err);
							}
		
							steem.api
									.getChainProperties(function(err2, chainProps) {
										if (err2) {
											console.log(err2, chainProps);
											throw new Error(err2);
										}
		
										var ratio = config['STEEMIT_CREATE_ACCOUNT_WITH_STEEM_MODIFIER'];
										var fee = dsteem.Asset.from(
												chainProps.account_creation_fee)
												.multiply(ratio);
		
										var feeString = fee.toString();
										var jsonMetadata = '';
		
										steem.broadcast
												.accountCreate(
														creatorWif,
														feeString,
														creator,
														newAccountName,
														owner,
														active,
														posting,
														arrPublicKey["MEMO"],
														jsonMetadata,
														function(err, result) {
		
															console.log("err : " + err,
																	result);
															addTextDiv("-------------------------------------------------------------");
															if (err != null) {
																addTextDiv("Error : "
																		+ err + "["
																		+ result + "]");
															} else {
																addTextDiv("GENERATE PRIVATE KEYS - Please keep the owner key. ");
																addTextDiv(" ");
		
																addTextDiv("<strong>account name : "
																		+ newAccountName
																		+ "<strong>");
																addTextDiv("<strong>Owner Key : "
																		+ arrPrivateKey["OWNER"]
																		+ "<strong>");
															}
															addTextDiv("-------------------------------------------------------------");
															addTextDiv("<br />");
		
														});
		
									});
						});
		
			}
    }
}


</script>
