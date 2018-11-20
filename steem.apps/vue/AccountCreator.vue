<template>
    <div id="ca_app" class="container" >
<div class="starter-template">
	<!--p class="lead">
		I will share an easy way to create accounts. You want to create
		an account and share it with your friends. To create an account, you need {{DATA.feeString}}.

    Your newly created account will contain {{DATA.feeString}}. The creation fee is zero.

	</p-->
  <p class="lead">
		To create an account, you need {{DATA.feeString}}.
    Your newly created account will contain {{DATA.feeString}}.
	</p>
  <!--p class="lead">
    This error message indicates that the active privte key is invalid. Please check the active private key.
    [ Expected version 128, instead got 0 ]
  </p-->
</div>
<div  class="container">
	<form autocomplete="off" id="create-form" class="form-signin" action="javascript:;" v-on:submit="create_account_step1"
		>
    <div class="input-group" href="#" data-toggle="tooltip" title="You must have a steemit account.">
      <div class="checkbox">
        <label>
          <input v-on:click="chkHasAccout" id="chkHasAccout" type="checkbox" name="chkHasAccout" value=""> Generated using private active key
        </label>
      </div>
    </div>
    <div id="account_div" class="hidden">
      <div class="input-group" >
        <span class="input-group-addon" href="#" data-toggle="tooltip" title="input your account."><i class="glyphicon glyphicon-user"></i></span>
    		<label for="creatorAccount" class="sr-only">Creator Account</label>
        <input autocapitalize="off" autocomplete="off" type="text" id="creatorAccount" class="form-control" placeholder="your account" >
      </div>
      <div class="input-group">
        <span class="input-group-addon" href="#" data-toggle="tooltip" title="input your private active key."><i class="glyphicon glyphicon-lock"></i></span>
        <label for="Active Key" class="sr-only">Active Key</label>
        <input autocapitalize="off" autocomplete="off" type="password" id="inputPassword" class="form-control" placeholder="your private active key" >
      </div>
    </div>

    <div id="email_div" class="">
      <div class="input-group">
        <span class="input-group-addon" href="#" data-toggle="tooltip" title="input your email"><i class="glyphicon glyphicon-user"></i></span>
    		<label for="email" class="sr-only">email</label>
        <input autocapitalize="off" autocomplete="off" type="text" id="email" class="form-control" placeholder="your email" required>
      </div>
      <div class="input-group">
        <span class="input-group-addon" href="#" data-toggle="tooltip" title="input your exchange steem memo"><i class="glyphicon glyphicon-lock"></i></span>
        <label for="exchange memo" class="sr-only">exchange memo</label>
        <input autocapitalize="off" autocomplete="off" type="text" id="exchange_memo" class="form-control" placeholder="your exchange steem memo" required>
      </div>
    </div>

		<br />
    <div class="input-group">
      <span class="input-group-addon" href="#" data-toggle="tooltip" title="input new account name"><i class="glyphicon glyphicon-user"></i></span>
      <label for="newAccount" class="sr-only">new Account</label>
      <input type="id" id="newAccount" class="form-control" placeholder="New Account Name" required>
    </div>
    <br />
		<!--button class="btn btn-lg btn-primary btn-block" type="button" v-on:click="create_account_step1(); return false; " >Create Account</button-->
		<button type="submit" class="btn btn-sm btn-info btn-block">Check and Create Account</button>
	</form>

</div>
<!-- /container -->
<br />
<div class="panel panel-danger">
	<div class="panel-heading">
		<h3 class="panel-title">Result</h3>
	</div>
	<div class="panel-body" id="textDiv"></div>
</div>

</div>
</template>

<script>
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

	var creator = 'nhj12311';
	var creatorWif = '';

	var newAccountName = '';

  function chkHasAccout(){
    if( $("#chkHasAccout").is(':checked') ){
      $("#email_div").addClass("hidden")
      $("#account_div").removeClass("hidden")

      $("#creatorAccount").attr("required", "true");
      $("#inputPassword").attr("required", "true");

      $("#email").removeAttr("required");
      $("#exchange_memo").removeAttr("required");
    }else{
      $("#account_div").addClass("hidden")
      $("#email_div").removeClass("hidden")

      $("#email").attr("required", "true");
      $("#exchange_memo").attr("required", "true");

      $("#creatorAccount").removeAttr("required");
      $("#inputPassword").removeAttr("required");

    }
  }

  function isTouchDevice(){
    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
  }

	function addTextDiv(txt) {
				var div = document.createElement("div");
				div.innerHTML = txt;
				console.log("addTextDiv : " + txt);
        $("#textDiv").html("");
				document.getElementById("textDiv").appendChild(div);
			}

	function create_account_step1() {

        if( !$("#chkHasAccout").is(':checked') ){
          if( !isEmail($("#email").val() )){
            alert("email format is incorrect.");
            $("#email").focus();
            return;
          }
        }
				creator = document.getElementById("creatorAccount").value;
				creatorWif = document.getElementById("inputPassword").value;
				newAccountName = document.getElementById("newAccount").value;

				console.log("newAccountName : " + newAccountName);

        var rsltValidAcctNm = steem.utils.validateAccountName(newAccountName);
        if( rsltValidAcctNm ){
            addTextDiv("Erorr : " + rsltValidAcctNm );
            return;
        }

				//addTextDiv("password : "+ newAccountPassword);
        waitingDialog.show('loading...', { progressType: 'primary'});

				steem.api.getAccounts([ newAccountName ], function(err, result) {
					console.log(err, result);

					if (result[0] == null  ) {
            if( $("#chkHasAccout").is(':checked') ){
              create_account_step2();
            }else{
              var sendTxt = "send " + DATA.feeString + " to @steem.apps, memo : <br />";
              var send_memo = ' { "account":"'+newAccountName+'", "email":"'+$("#email").val()+'", "addr_memo" : "'+$("#exchange_memo").val()+'" } ';
              sendTxt += send_memo;
              sendTxt += '<button href="#" data-toggle="tooltip" title="copied" id="btnCopy" type="button" class="btn btn-sm btn-info" data-clipboard-text=\''+send_memo+'\'  >copy</button>';
              sendTxt += ' <a target="_blank" href="https://steemconnect.com/sign/transfer?to=steem.apps&amount='+DATA.feeString+'&memo='+encodeURIComponent(send_memo)+'" > ';
              sendTxt += ' <button id="btnSendSc" type="button" class="btn btn-sm btn-info">send steemconnect</button></a>';
              addTextDiv(sendTxt);
              new ClipboardJS('.btn');
              $('#btnCopy').tooltip( {trigger: 'click'});
              $('#btnCopy').on('click', function(){  setTimeout( ()=>$('#btnCopy').tooltip('hide') ,1000); });
              $('#btnCopy').on('touchend', function(){ $('#btnCopy').tooltip('show'); setTimeout( ()=>$('#btnCopy').tooltip('hide') ,1000); });
              $("#btnSendSc").on('click', () => {
                var sendSc = $("<a>");
                sendSc.attr("target","_blank");
                sendSc.attr("href","https://steemconnect.com/sign/transfer?to=steem.apps&amount="+DATA.feeString+"&memo="+send_memo);
              });
              waitingDialog.hide();
              //copyClipboard(send_memo);
            }
					} else {
						addTextDiv("Erorr : Exsits Account [" + newAccountName + "]");
            waitingDialog.hide();
					}
				});

			}
  function copyClipboard(obj){
    var value;
    if(  typeof obj == 'string'){
      value = obj;
    }else{
        value = $(obj).data('clipboard-text');
    }
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(value).select();
    document.execCommand("copy");
    document.execCommand("Copy");
    $temp.remove();
    alert('copied to clipboard : '+value);
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
        waitingDialog.hide();
  			console.log(err, config);
  			throw new Error(err);
		  }
		  steem.api.getChainProperties(function(err2, chainProps) {
			if(err2){
        waitingDialog.hide();
			  console.log(err2, chainProps);
			  throw new Error(err2);
			}

			var ratio = config['STEEM_CREATE_ACCOUNT_WITH_STEEM_MODIFIER'];
      ratio = 1;
			//var fee = dsteem.Asset.from(chainProps.account_creation_fee).multiply(ratio);
      var fee = chainProps.account_creation_fee.split(" ")[0] * (ratio);

			var feeString = fee.toFixed(3) + " "+ chainProps.account_creation_fee.split(" ")[1];
			var jsonMetadata = '';

			steem.broadcast.accountCreate(creatorWif, feeString, creator,
						newAccountName, owner, active, posting, arrPublicKey["MEMO"],
						jsonMetadata, function(err, result) {
        waitingDialog.hide();
			  console.log("err : "+err, result);
        var resultMsg = "";
			  resultMsg += ("---------------------------------------------------------<br />");
			  if( err != null){
				  resultMsg += ("Error : " + err + "["+result+"]<br />");
			  }else{
  				resultMsg += ("GENERATE PRIVATE KEYS - Please keep the owner key. <br />");
  				resultMsg += (" <br />");
  				resultMsg += ("<strong>account name : " + newAccountName + "<strong><br />");
  				resultMsg += ("<strong>Owner Key : " + arrPrivateKey["OWNER"] + "<strong><br />");
			  }
				resultMsg += ("---------------------------------------------------------<br />");
				resultMsg += ("<br />");
        addTextDiv(resultMsg);
			});
		  });
		});

	}
var DATA = {
  feeString : ""
}
function getCreateAccountFee(){
  waitingDialog.show('Calculate create account fee.', { progressType: 'primary'});
  steem.api.getConfig(function(err, config) {
    if(err){
      waitingDialog.hide();
      console.log(err, config);
      throw new Error(err);
    }
    console.log(err, config);
    steem.api.getChainProperties(function(err2, chainProps) {
      if(err2){
        waitingDialog.hide();
        console.log(err2, chainProps);
        throw new Error(err2);
      }
      console.log(err2, chainProps);
      var ratio = config['STEEM_CREATE_ACCOUNT_WITH_STEEM_MODIFIER'];
      ratio = 1;
      //var fee = dsteem.Asset.from(chainProps.account_creation_fee).multiply(ratio);
      var fee = (chainProps.account_creation_fee.replace(" STEEM","")) * (ratio);

      var feeString = fee.toString()+".000 STEEM"
      DATA.feeString = feeString;
      waitingDialog.hide();
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
      , chkHasAccout : function(){ chkHasAccout(); }
      , copyClipboard : function(obj){ copyClipboard(obj); }

    }
    , mounted : function(){
      $('[data-toggle="tooltip"]').tooltip();
      getCreateAccountFee();

    }
}


</script>
