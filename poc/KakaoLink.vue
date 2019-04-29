<template>
  <div  class="container">
    <div class="row"><br /></div>
    <div class="row">
      KakaoLink
    </div>
    <div class="row"><br /></div>
  	<div class="row">
  		<a id="kakao-link-btn" href="javascript:;" v-on:click="sendLink">
            <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"/>
        </a>
    </div><!-- end row. -->
    <div class="row"><br /></div>
    <div class="row">
      <input class="hidden" id="capture1" type="file" accept="image/*" capture>
      <input class="hidden" id="capture2" type="file" accept="image/*">
      <div class="col-md-12">
        <img id="imgSrc" src="" class="" />
        <br /><br />
        <div class="panel panel-success">
          <div class="panel-heading">
            <h5 class="panel-title">KakaoLink Form</h5>
          </div>
          <div class="panel-body">
            {{ data.ocrResult}}
          </div>
        </div>        
      </div>
    </div>
  </div><!-- end container -->
</template>
<script>
var data = {
  ocrResult : ""
};
module.exports = {
  name: 'search',
  data: function () {
    return {
      data: data
    }
  },
  computed: {
    hasResult: function () {
      return this.posts.length > 0
    }
  }
  ,methods: {
    sendLink : function(){ sendLink(); }
  }
  ,created: function() {
        $.getScript("//developers.kakao.com/sdk/js/kakao.min.js", function(){ Kakao.init('e5c0b17c11fe384ef67a30368cbe297d'); });        
	}
  , mounted:function () {
  }
}


function sendLink() {
      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '딸기 치즈 케익',
          description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
          imageUrl: 'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com'
          }
        },
        social: {
          likeCount: 286,
          commentCount: 45,
          sharedCount: 845
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: 'https://developers.kakao.com',
              webUrl: 'https://developers.kakao.com'
            }
          },
          {
            title: '앱으로 보기',
            link: {
              mobileWebUrl: 'https://developers.kakao.com',
              webUrl: 'https://developers.kakao.com'
            }
          }
        ]
      });
    }

</script>
<style>

img{
  max-width: 100%;
}
.width_70{
  width:65% !important;
}
.width_30{
  width:35% !important;
}

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
