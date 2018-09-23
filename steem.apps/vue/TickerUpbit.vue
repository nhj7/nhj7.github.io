<template>
  <div>
    <div id="tmp">

    </div>
    <div class="frameWrapper">
      <iframe id="iframeUpbit" name="iframeUpbit" width="100%" frameborder="0" scrolling="no" v-on:load="resizeIframe()" src="./test/test_upbit.html?v=1"></iframe>
    </div>
  </div>

</template>
<script>
function resizeIframe1() {

}

function resizeIframe(){
 //find the height of the internal page

 var the_height=document.getElementById('iframeUpbit').contentWindow.document.body.scrollHeight;
 $("#tmp").text(the_height);
 //change the height of the iframe
 document.getElementById('iframeUpbit').style.height=the_height + "px";

 //document.getElementById('the_iframe').scrolling = "no";
 document.getElementById('iframeUpbit').style.overflow = "hidden";
}

module.exports = {
  name: 'TickerUpbit',
  data: function () {
    return {

    }
  },
  computed: {

  },
  methods: {
    resizeIframe : function(){ resizeIframe(); }
  }
  , mounted : function() {

  }
}
</script>
<style>
.frameWrapper {
  position: relative;
  padding-bottom: 65.25%;
  padding-top: 30px;
  height: 0;

  -webkit-overflow-scrolling:touch;

}
.frameWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

}
</style>
