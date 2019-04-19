
<template>

<div id="search">
  <div  class="container">
  	<div class="row"> 
  		<div class="col-md-12">
              <div class="input-group" id="adv-search">
                  <input type="text" class="form-control" placeholder="Search for steemit" />
                  <div class="input-group-btn">
                      <div class="btn-group" role="group">
                          <div class="dropdown dropdown-lg">
                              <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button>
                              <div class="dropdown-menu dropdown-menu-right" role="menu">
                                  <form class="form-horizontal" role="form">
                                    <div class="form-group">
                                      <label for="filter">Filter by</label>
                                      <select class="form-control">
                                          <option value="0" selected>All Snippets</option>
                                          <option value="1">Featured</option>
                                          <option value="2">Most popular</option>
                                          <option value="3">Top rated</option>
                                          <option value="4">Most commented</option>
                                      </select>
                                    </div>
                                    <div class="form-group">
                                      <label for="contain">Author</label>
                                      <input class="form-control" type="text" />
                                    </div>
                                    <div class="form-group">
                                      <label for="contain">Contains the words</label>
                                      <input class="form-control" type="text" />
                                    </div>
                                    <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                  </form>
                              </div>
                          </div>
                          <button type="button" class="btn btn-primary" v-on:click="searchTerm"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                      </div>
                  </div>
              </div>
            </div>
          </div>
  	</div>
  </div>





</template>
<script>
$(document).ready(function(e){
    $('.search-panel .dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		var param = $(this).attr("href").replace("#","");
		var concept = $(this).text();
		$('.search-panel span#search_concept').text(concept);
		$('.input-group #search_param').val(param);
	});
});

Vue.prototype.$http = axios

module.exports = {
  name: 'search',
  data: function () {
    return {
      posts: []
    }
  },
  computed: {
    hasResult: function () {
      return this.posts.length > 0
    }
  },
  methods: {
    searchTerm: function () {
      // using JSONPlaceholder
      var baseURI = 'https://www.google.co.kr/search?newwindow=1&ei=iKgGWuPSB4nq8AXVyryYBg&q=site%3Asteemit.com+%EC%8B%AC%EC%8B%AC%ED%92%80%EC%9D%B4&oq=site%3A&gs_l=mobile-gws-serp.3.2.35i39k1l3j0l2.1976.6230.0.8334.13.10.2.0.0.0.134.994.1j8.9.0....0...1.1.64.mobile-gws-serp..3.8.686.3..0i131k1.91.6K4jmL9FzBg.js';
      this.$http.get(`${baseURI}`)
      .then((result) => {
        console.log(result)
        this.posts = result.data
      })
    }
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
