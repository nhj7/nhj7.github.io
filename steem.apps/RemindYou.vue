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
  </div>




</template>
<script>
  function RemindYou(){
    $("#toggleBarBtn").click();

    var accountName = $("#accountName").val();
    localStorage.setItem("accountName",accountName);
    steem.api.getDiscussionsByVotes({author : accountName , limit:10}, function(err, result) {
      console.log(err, result);

    });

    var result = steem.api.getAccountVotes( { voter:accountName , limit:10}, function(err, result) {
      console.log(err, result);
      $("#toggleBarBtn").click();
    });
    //setTimeout( () => { RemindYou(); } , 1000 );
  }

  function init(){
    var accountName = localStorage.getItem("accountName");
    console.log("accountName : " + accountName);
    $("#accountName").val( accountName );

  }

  module.exports = {
    methods : {
			RemindYou : function() {
				RemindYou();
			}
    }
    , mounted : function() {
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
</style>
