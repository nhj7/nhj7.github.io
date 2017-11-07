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
		action="javascript:create_account_step1();">
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
		<!--button class="btn btn-lg btn-primary btn-block" type="button" onclick="create_account_step1(); return false; " >Create Account</button-->
		<button class="btn btn-lg btn-primary btn-block" type="submit">Create
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
module.exports = {
    data: function() {
        return {
            myAccount: 'world'
        }
    }
}
</script>

<style>
.hello {
    background-color: #ffe;
}
</style>