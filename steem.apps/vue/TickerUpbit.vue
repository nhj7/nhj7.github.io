<template>
  <div>
    <iframe id="iframeUpbit" width="100%" frameborder="0" scrolling="no" v-on:load="resizeIframe()" src="./test/test_upbit.html?v=1"></iframe>
  </div>
</template>
<script>
function resizeIframe() {

  $('#iframeUpbit').iFrameResize({log:true, checkOrigin:false, inPageLinks:true, sizeWidth:true});
  /*
  var obj = document.getElementById("iframeUpbit");
  console.log(obj, obj.contentWindow.document.body.scrollHeight)
  //obj.style.height = 0;
  obj.style.height = obj.contentWindow.document.body.scrollHeight+'px';
  */
  
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
    resizeIframe : function(obj){ resizeIframe(obj); }
  }
}
</script>
</script>
