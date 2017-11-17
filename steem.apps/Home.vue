<template>
<div>

<div class="row" v-for="i in Math.ceil(links.length / 2)">
  <div class="col-sm-6" v-for="link in links.slice((i - 1) * 2, i * 2)">
    <div class="card">
      <div class="card-block">
        <h3 class="card-title">{{ link.title }}</h3>
        <p class="card-text">{{ link.text }}</p>
        <a :href="link.url" target="_blank" class="btn btn-primary">Go {{ link.title }}</a>
      </div>
    </div>
  </div>

</div>

<br /><br /><br />


</div>
</template>

<script>
var linkData = [
  {
    title : "Steeme"
    , text : "Useful site to show hidden information. created by @asbear"
    , url : "https://ianpark.github.io/steeme/"

  }
  , {
    title : "Steem Tool"
    , text : "The Steemit tool suite. created by @segyepark"
    , url : "http://tool.steem.world"

  }
  , {
    title : "Steem Us"
    , text : "steemit stats and portals. created by @jungs"
    , url : "http://www.steemus.com"

  }
  , {
    title : "MukSteem"
    , text : "Korean Stimian's Restaurant Collection. created by @lee2"
    , url : "http://muksteem.com"

  }

  , {
    title : "Under Steemed"
    , text : "Undervalued posting excavation site. created by @tabris"
    , url : "https://sydneyitguy.github.io/understeemed"

  }
  , {
    title : "Steem Friend"
    , text : "Who would be best friend of me? created by @jeongmincha"
    , url : "http://steemfriend.com/"

  }
  , {
    title : "Steemit Post Statistics"
    , text : "Steemit Post Statistics site. created by @segyepark"
    , url : "https://iworldpark.github.io/steemit/stat/post/"

  }
  , {
    title : "Steem Now"
    , text : "What if I wonder about my voting power? created by @penguinpablo"
    , url : "https://steemnow.com/"

  }

  , {
    title : "Steem Report"
    , text : "Helping you make sense of Steemit, and your place within it."
    , url : "http://www.steemreports.com/delegation-info/"

  }

  , {
    title : "Cobot"
    , text : "All Coin Ticker. created by @nhj12311"
    , url : "http://cobot.co.kr"

  }



]
module.exports = {
    data: function() {
        return {
            myAccount: '@nhj12311'

            , links : linkData
        }
    }
    , methods : {
			create_account_step1 : function() {
				create_account_step1();
			}


    }
}
</script>
