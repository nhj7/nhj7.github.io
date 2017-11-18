<template>
<div>

<div class="row" v-for="i in Math.ceil(links.length / 2)">
  <div class="col-sm-6" v-for="link in links.slice((i - 1) * 2, i * 2)">
    <div class="card">
      <div class="card-block">
        <h3 class="card-title">{{ link.title }}</h3>
        <p class="card-text">{{ link.text }} created by <a href="#" v-on:click="goCreator(link)">@{{ link.creator }}</a></p>
        <a v-on:click="goClick(link)" target="_blank" class="btn btn-primary">Go {{ link.title }}</a>
        <label style="width:1em;"></label>
        <span class="glyphicon glyphicon-heart" aria-hidden="true"></span>
        ({{ link.clickCount }})
      </div>
    </div>
  </div>

</div>

<br /><br />

<a v-on:click="resetCount" target="_blank" class="btn btn-danger">Reset</a>

<br />


</div>
</template>

<script>
var linkData = [
  {
    title : "Steeme"
    , text : "Useful site to show hidden information."
    , url : "https://ianpark.github.io/steeme/"
    , creator : "asbear"
  }
  , {
    title : "Steem Tool"
    , text : "The Steemit tool suite."
    , url : "http://tool.steem.world"
    , creator : "segyepark"
  }
  , {
    title : "Steem Us"
    , text : "steemit stats and portals."
    , url : "http://www.steemus.com"
    , creator : "jungs"
  }
  , {
    title : "MukSteem"
    , text : "Korean Stimian's Restaurant Collection."
    , url : "http://muksteem.com"
    , creator : "lee2"
  }

  , {
    title : "Under Steemed"
    , text : "Undervalued posting excavation site."
    , url : "https://sydneyitguy.github.io/understeemed"
    , creator : "tabris"
  }
  , {
    title : "Steem Friend"
    , text : "Who would be best friend of me?"
    , url : "http://steemfriend.com/"
    , creator : "jeongmincha"
  }
  , {
    title : "Steemit Post Statistics"
    , text : "Steemit Post Statistics site."
    , url : "https://iworldpark.github.io/steemit/stat/post/"
    , creator : "segyepark"
  }
  , {
    title : "Steem Now"
    , text : "What if I wonder about my voting power? "
    , url : "https://steemnow.com/"
    , creator : "penguinpablo"
  }

  , {
    title : "Steem Report"
    , text : "Helping you make sense of Steemit, and your place within it."
    , url : "http://www.steemreports.com/delegation-info/"
    , creator : "steemreports"
  }

  , {
    title : "Cobot"
    , text : "All Coin Ticker. "
    , url : "http://cobot.co.kr"
    , creator : "nhj12311"
  }
];

var linkDataDummy = linkData.slice(0);

function init(){
  for(var i = 0; i < linkData.length;i++){
    linkData[i] = linkDataDummy[i];
    //console.log("localStorage.getItem : "+localStorage.getItem(linkData[i].url));
    if( localStorage.getItem(linkData[i].url) == undefined ){
      localStorage.setItem(linkData[i].url, 0 );
    }
    linkData[i].clickCount = localStorage.getItem(linkData[i].url);
  }
}

function sortLinks(){
    linkData.sort( (a, b) => parseInt(a.clickCount) < parseInt(b.clickCount) );
}

init();
sortLinks();

var home = module.exports = {
    name : "Home"
    , data : function () {
      return {
        myAccount: '@nhj12311'
        , links : linkData
      }
    }
    , methods : {
			goClick : function( link ) {
				//console.log(link.url);
        localStorage.setItem(link.url, ++link.clickCount);
        sortLinks();
        window.open(link.url);
			}
      , goCreator : function (link) {
        window.open("http://steemit.com/@"+link.creator);
      }
      , resetCount : function(){
        init();
        var links = this.$data.links;
        for(var i = 0; i < links.length;i++){
          localStorage.setItem(linkData[i].url, 0 );
          linkData[i].clickCount = 0;
        }
      }
    }

    , mounted : function(){

    }
}
</script>
