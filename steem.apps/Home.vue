<template>
<div class="">

  <div class="form-group ">
    <div class="row ">
      <div class="col-sm-6 col-sm-offset-2">
        <div class="input-group">
          <span class="input-group-addon info">
            <!--i class="glyphicon glyphicon-user"></i-->
            @
          </span>
          <input data-toggle="tooltip" title="아이디를 입력해주세요!" required @keyup.enter="homeSubmit" v-model="data.acct_nm" id="acct_nm" type="text" class="form-control " name="acct_nm" placeholder="account name">
          <span class="input-group-btn">
            <button type="submit" class="btn btn-info " v-on:click="homeSubmit">Submit</button>
          </span>
        </div>
      </div>
    </div>
    <!-- row -->
  </div>
  <!-- form-group -->

  <div id="acct_info" class="form-group">
    <div class="row">
      <div class="col-sm-3">
        <div class="input-group">
          <span class="input-group-addon white">
          <div class="margin-bottom-sm"><h4><a :href="`https://steemit.com/@${data.inqry_acct}`" target="_blank">@{{data.inqry_acct}}</a> ({{data.reputation}}) </h4></div>
          <div class="strong margin-bottom-xs">{{data.acct_sp_tot | comma }} SP</div>
          <div class="small margin-bottom-sm text-warning ">({{data.acct_sp | comma }} - {{data.acct_sp_delegate | comma}} + {{data.acct_sp_received | comma}} )</div>
          <img :src="`https://steemitimages.com/64x64/https://steemitimages.com/u/${data.inqry_acct}/avatar`" class="img-circle" alt="avatar">
        </span>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="input-group">
          <span class="input-group-addon white">
          <div class="text-info margin-top-md">
            VP ( $ {{data.voting_value}} / {{data.voting_full_value}} )
            Full in {{data.full_in_hour}} hours
          </div>
          <div class="text-info">
            <input id="vp_slider" data-slider-id='data_vp_slider' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="0" data-popup-enabled="true" />
          </div>
          <div class="progress margin-bottom-sm">
            <div id="voting_power" class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" style="width: 0%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
              <span>
                {{data.voting_power}}%
              </span>
        </div>
      </div>
      <div class="text-success">Bandwidth Remaining</div>
      <div class="progress margin-bottom-sm">
        <div id="bandwidth_remaining" class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" style="width: 0%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
          <span>{{data.bandwidth_remaining}}%</span>
        </div>
      </div>
      </span>
    </div>
  </div>
  <!-- col -->

  <div class="col-sm-3">
    <div class="input-group">
      <span class="input-group-addon white">
          <div class="text-info text-left margin-top-xs margin-bottom-xs well">
            <div class="margin-bottom-xs" >CREATED : {{ data.created }} {{ calc_created_days }}</div>
            <div class="margin-bottom-xs" >POSTS : {{ data.post_count | comma }}</div>
            <div class="margin-bottom-xs" >KRW/USD ￦ {{data.krw_usd | comma}} </div>
            <div class="margin-bottom-xs" >STEEM:SBD {{ Math.floor(data.upbit_krw_sbd/data.upbit_krw_steem*1000)/1000.0 }} : 1 </div>
            <div v-bind:class="inc_color_steem" >STEEM  $ {{ Math.floor(data.upbit_krw_steem / data.krw_usd * 100)/100.0 }} ( {{ data.upbit_krw_steem_change>0?'+':'' }} {{ data.upbit_krw_steem_change| inc_round }}%, ￦ {{data.upbit_krw_steem | comma}} ) </div>
            <div v-bind:class="inc_color_sbd" >SBD $ {{ Math.floor(data.upbit_krw_sbd / data.krw_usd * 100)/100.0 }} ( {{ data.upbit_krw_sbd_change>0?'+':'' }} {{ data.upbit_krw_sbd_change | inc_round}}%, ￦ {{data.upbit_krw_sbd | comma}}) </div>
          </div>
        </span>
    </div>
  </div>
  <!-- col -->
</div>
<!-- row -->

<hr class="margin-top-xs margin-bottom-xs" />

<div class="row">
  <div class="col-md-12 padding-xs">
    <div class="panel with-nav-tabs panel-info">
      <div class="panel-heading">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#tab_feed" data-toggle="tab"><i class="text-info glyphicon glyphicon-home"></i> Feed</a></li>
          <li><a href="#tab_post" data-toggle="tab"><i class="text-info glyphicon glyphicon-list-alt"></i> Post</a></li>
          <li><a href="#tab_comments" data-toggle="tab"><i class="text-info glyphicon glyphicon-share-alt"></i> Comments</a></li>
          <li><a href="#tab_replies" data-toggle="tab"><i class="text-info glyphicon glyphicon glyphicon-circle-arrow-left"></i> Replies</a></li>
          <li class="dropdown">
            <a href="#" data-toggle="dropdown"><i class="text-info glyphicon glyphicon-th"></i> ETC <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="#tab_mute" data-toggle="tab"><i class="text-info glyphicon glyphicon-remove"></i> Mute</a></li>
              <li><a href="#tab_delegate" data-toggle="tab"><i class="text-info glyphicon glyphicon-gift"></i> Delegate</a></li>
            </ul>
          </li>

          <li class="dropdown">
            <a href="#" data-toggle="dropdown"><i class="text-info glyphicon glyphicon-link"></i> Links <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="#tab4" data-toggle="tab">Steemd.com</a></li>
              <li><a href="#tab5" data-toggle="tab">SteemDB.com</a></li>
              <li><a href="#tab5" data-toggle="tab">Steem Tracked</a></li>
              <li><a href="#tab5" data-toggle="tab">Steem Followers</a></li>
              <li><a href="#tab5" data-toggle="tab">Potential Reward</a></li>
              <li><a href="#tab5" data-toggle="tab">Steem Whale</a></li>
              <li><a href="#tab5" data-toggle="tab">Steemit Board</a></li>
              <li><a href="#tab5" data-toggle="tab">Steem Reports</a></li>
            </ul>
          </li>
        </ul>

      </div>
      <div class="panel-body padding-xs">
        <div class="tab-content">
          <div class="tab-pane fade in active" id="tab_feed">
            <div id="tab_feed_spinner" class="text-center"><i class="text-info glyphicon glyphicon-repeat fast-right-spinner"></i></div>
            <table id="tab_feed_table" class="table table-hover text-center hidden">
              <tbody>
                <tr v-for="(item, idx) in data.feedList" v-on:click="viewPost(item)" data-html="true" data-toggle="modal" data-target="#postModal">
                  <td class="text-left padding-xs">
                    <div class="col-md-2 padding-xs margin-bottom-xs" v-if="item.images && item.images.length > 0">
                      <div class="image">
                        <img class="padding-xs doorImg" :src="`https://steemitimages.com/600x800/${item.images[1]}`" alt="door">
                        <div class="text">
                          <img :src="`https://steemitimages.com/32x32/https://steemitimages.com/u/${item.author}/avatar`" class="img-circle" alt="avatar">
                        </div>
                      </div>
                    </div>
                    <div class="text-center col-md-2 padding-xs" v-else>
                      <img :src="`https://steemitimages.com/64x64/https://steemitimages.com/u/${item.author}/avatar`" class="img-circle" alt="avatar">
                    </div>
                    <div class="col-md-10 padding-xs">
                      <div class="margin-bottom-xs">
                        <a href="javascript:;" target="_blank"><b>{{ item.title }}</b></a>
                      </div>
                      <div class="text-left margin-bottom-sm text-justify post-preview" v-html="item.text.length > 88 ? item.text.substring(0, 88)+'...' :item.text">

                      </div>
                      <div>
                        <i class="text-warning glyphicon glyphicon-upload"></i> $ {{item.payout_val}} <i class="margin-left-md margin-right-md">|</i>
                        <i class="text-warning glyphicon glyphicon-chevron-up"></i> {{item.active_votes.length}} <i class="margin-left-md margin-right-md">|</i>
                        <i class="text-warning glyphicon glyphicon-comment"></i> {{item.children}}
                      </div>
                    </div>

                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    <button type="submit" class="btn btn-info " v-on:click="inqryFeedMoreInfo">Read More <span id="tab_feed_more_spinner" class="text-info glyphicon glyphicon-repeat fast-right-spinner hidden"></span></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane fade" id="tab_post">
            <div id="tab_post_spinner" class="text-center"><i class="text-info glyphicon glyphicon-repeat fast-right-spinner"></i></div>
            <table id="tab_post_table" class="table table-hover text-center hidden">
              <tbody>
                <tr v-for="(item, idx) in data.postList" v-on:click="viewPost(item)" data-html="true" data-toggle="modal" data-target="#postModal">
                  <td class="text-left padding-xs">
                    <div class="col-md-2 padding-xs margin-bottom-xs" v-if="item.images && item.images.length > 0">
                      <img class="col-xs-12 padding-xs" :src="`${item.images[1]}`" alt="door">
                    </div>
                    <div class="col-md-2 padding-xs text-center text-middle" v-else>
                      no image
                    </div>
                    <div class="col-md-9 padding-xs">
                      <div class="margin-bottom-xs">
                        <a href="javascript:;" ><b>{{ item.title }}</b></a>
                      </div>
                      <div class="margin-bottom-xs">
                        {{ item.text.length > 90 ? item.text.substring(0, 90)+'...' :item.text }}
                      </div>
                      <div>
                        <i class="text-warning glyphicon glyphicon-upload"></i> $ {{item.payout_val}} <i class="margin-left-md margin-right-md">|</i>
                        <i class="text-warning glyphicon glyphicon-chevron-up"></i> {{item.active_votes.length}} <i class="margin-left-md margin-right-md">|</i>
                        <i class="text-warning glyphicon glyphicon-comment"></i> {{item.children}}
                      </div>
                    </div>

                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    <button type="submit" class="btn btn-info " v-on:click="inqryPostMoreInfo">Read More <span id="tab_post_more_spinner" class="text-info glyphicon glyphicon-repeat fast-right-spinner hidden"></span></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane fade" id="tab_mute">
            <table class="table table-striped table-hover text-center">
              <thead class="alert alert-success">
                <tr>
                  <td>NO</td>
                  <td>Muter</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in data.muterList" v-on:click="clickVotingRateRow(item.account)">
                  <td>{{ idx+1 }}</td>
                  <td>
                    {{ item.account }}
                    <a :href="`https://steemit.com/@${item.account}`" target="_blank">
                      <span class="glyphicon glyphicon-share"></span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
          <div class="tab-pane fade" id="tab_comments">
            <div id="tab_comments_spinner" class="text-center"><i class="text-info glyphicon glyphicon-repeat fast-right-spinner"></i></div>
            <table id="tab_comments_table" class="table table-striped table-hover table_fixed hidden">

              <tbody>
                <tr v-for="(item, idx) in data.commentsList" v-on:click="" data-html="true">
                  <td>
                    <b>
                      <a :href="`https://steemit.com/@${item.parent_author}`" target="_blank">
                        <img :src="`https://steemitimages.com/32x32/https://steemitimages.com/u/${item.parent_author}/avatar`" class="img-circle" alt="avatar">
                        &nbsp;{{item.parent_author}}
                      </a><br />
                      <a :href="`https://steemit.com${item.url}`" target="_blank">RE : {{ item.root_title }}</a>
                    </b>
                    <br />
                    <span v-html="markdown_filter(item.body)" v-on:click="window.open('https://steemit.com'+item.url)"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane fade" id="tab_replies">
            <div id="tab_replies_spinner" class="text-center"><span class="text-info glyphicon glyphicon-repeat fast-right-spinner"></span></div>
            <table id="tab_replies_table" class="table table-striped table-hover table_fixed hidden">
              <tbody>
                <tr v-for="(item, idx) in data.repliesList" v-on:click="">
                  <td>
                    <b>
                      <a :href="`https://steemit.com/@${item.author}`" target="_blank">
                        <img :src="`https://steemitimages.com/32x32/https://steemitimages.com/u/${item.author}/avatar`" class="img-circle" alt="avatar">
                        &nbsp;{{item.author}}
                      </a><br />
                      <a :href="`https://steemit.com${item.url}`" target="_blank">RE : {{ item.root_title }}</a>
                    </b>
                    <br />
                    <span v-html="markdown_filter(item.body)" v-on:click="window.open('https://steemit.com'+item.url)"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane fade" id="tab_delegate">
            delegate
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

<!-- Modal -->
<div id="postModal" class="modal fade padding-xs" role="dialog">
  <div class="modal-dialog modal-lg margin-zero center">

    <!-- Modal content-->
    <div class="modal-content ">
      <div class="modal-header fixed" data-dismiss="modal" v-on:click="closePostModal">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <div class="panel panel-success">
          <div class="panel-heading">
            <h4>{{data.post.title}} - @{{data.post.author}}</h4>
            <span id="tab_modal_post_spinner" class="text-info glyphicon glyphicon-repeat fast-right-spinner"></span>
          </div>
        </div>
      </div>
      <div class="modal-body" v-html="data.post.html">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" v-on:click="closePostModal" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>


<div class="panel panel-success hidden">
  <div class="panel-heading">
    <h5 class="panel-title">Result</h5>
  </div>
  <div class="panel-body" id="textDiv"><span v-html="data.busy_msg"></span></div>
</div>


<br />

<div class="hidden">
  <center>
    <img src="./asset/img/busy.png" /><br /> 내겐 얼마나 보팅을 해줄까?<br />
    <button type="submit" class="btn btn-primary " v-on:click="getBusyVotingPower">Calc @busy.org</button>
    <br />
  </center>
</div>

</div>
</template>

<style>
.post-preview{
  word-break: break-all;
}
.youtube_div{
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}
.youtube_iframe{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.image {
  position: relative;
}
.doorImg{
  display: block;
  max-width: 100%;
  max-height: 400px;
  margin:auto;
}
.image .text {
  position: absolute;
  top: -1px;
  left: -1px;
}
.modal-body {
  max-height: calc(100vh - 210px);
  overflow-y: auto;
  font-size:1.1em;
  word-break: break-all;
  padding:5px;
}
.modal-body>p {
  margin: 0px auto;
  max-width: none;
  text-align: justify;
  margin-bottom: 1em;
  word-break: break-all;
}
.modal-body>img, .modal-body>*>img, .modal-body>*>*>img, .modal-body>*>*>*>img {
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: none;
}


/* irrelevant styling */

.table>tbody>tr>td {
  padding: 2px;
}

.table_fixed {
  table-layout: fixed;
}

.table_fixed td {
  overflow: auto;
  text-overflow: ellipsis;
}

.glyphicon.fast-right-spinner {
  -webkit-animation: glyphicon-spin-r 1s infinite linear;
  animation: glyphicon-spin-r 1s infinite linear;
}

@-webkit-keyframes glyphicon-spin-r {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}

@keyframes glyphicon-spin-r {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}

#data_vp_slider .slider-selection {
  background: #69A9EC;
}

.slider {
  width: 100% !important;
}


.panel.with-nav-tabs .panel-heading {
  padding: 5px 5px 0 5px;
}

.panel.with-nav-tabs .nav-tabs {
  border-bottom: none;
}

.panel.with-nav-tabs .nav-justified {
  margin-bottom: -1px;
}

/********************************************************************/

/*** PANEL DEFAULT ***/

.with-nav-tabs.panel-default .nav-tabs>li>a,
.with-nav-tabs.panel-default .nav-tabs>li>a:hover,
.with-nav-tabs.panel-default .nav-tabs>li>a:focus {
  color: #777;
}

.with-nav-tabs.panel-default .nav-tabs>.open>a,
.with-nav-tabs.panel-default .nav-tabs>.open>a:hover,
.with-nav-tabs.panel-default .nav-tabs>.open>a:focus,
.with-nav-tabs.panel-default .nav-tabs>li>a:hover,
.with-nav-tabs.panel-default .nav-tabs>li>a:focus {
  color: #777;
  background-color: #ddd;
  border-color: transparent;
}

.with-nav-tabs.panel-default .nav-tabs>li.active>a,
.with-nav-tabs.panel-default .nav-tabs>li.active>a:hover,
.with-nav-tabs.panel-default .nav-tabs>li.active>a:focus {
  color: #555;
  background-color: #fff;
  border-color: #ddd;
  border-bottom-color: transparent;
}

.with-nav-tabs.panel-default .nav-tabs>li.dropdown .dropdown-menu {
  background-color: #f5f5f5;
  border-color: #ddd;
}

.with-nav-tabs.panel-default .nav-tabs>li.dropdown .dropdown-menu>li>a {
  color: #777;
}

.with-nav-tabs.panel-default .nav-tabs>li.dropdown .dropdown-menu>li>a:hover,
.with-nav-tabs.panel-default .nav-tabs>li.dropdown .dropdown-menu>li>a:focus {
  background-color: #ddd;
}

.with-nav-tabs.panel-default .nav-tabs>li.dropdown .dropdown-menu>.active>a,
.with-nav-tabs.panel-default .nav-tabs>li.dropdown .dropdown-menu>.active>a:hover,
.with-nav-tabs.panel-default .nav-tabs>li.dropdown .dropdown-menu>.active>a:focus {
  color: #fff;
  background-color: #555;
}

/********************************************************************/

/*** PANEL PRIMARY ***/

.with-nav-tabs.panel-primary .nav-tabs>li>a,
.with-nav-tabs.panel-primary .nav-tabs>li>a:hover,
.with-nav-tabs.panel-primary .nav-tabs>li>a:focus {
  color: #fff;
}

.with-nav-tabs.panel-primary .nav-tabs>.open>a,
.with-nav-tabs.panel-primary .nav-tabs>.open>a:hover,
.with-nav-tabs.panel-primary .nav-tabs>.open>a:focus,
.with-nav-tabs.panel-primary .nav-tabs>li>a:hover,
.with-nav-tabs.panel-primary .nav-tabs>li>a:focus {
  color: #fff;
  background-color: #3071a9;
  border-color: transparent;
}

.with-nav-tabs.panel-primary .nav-tabs>li.active>a,
.with-nav-tabs.panel-primary .nav-tabs>li.active>a:hover,
.with-nav-tabs.panel-primary .nav-tabs>li.active>a:focus {
  color: #428bca;
  background-color: #fff;
  border-color: #428bca;
  border-bottom-color: transparent;
}

.with-nav-tabs.panel-primary .nav-tabs>li.dropdown .dropdown-menu {
  background-color: #428bca;
  border-color: #3071a9;
}

.with-nav-tabs.panel-primary .nav-tabs>li.dropdown .dropdown-menu>li>a {
  color: #fff;
}

.with-nav-tabs.panel-primary .nav-tabs>li.dropdown .dropdown-menu>li>a:hover,
.with-nav-tabs.panel-primary .nav-tabs>li.dropdown .dropdown-menu>li>a:focus {
  background-color: #3071a9;
}

.with-nav-tabs.panel-primary .nav-tabs>li.dropdown .dropdown-menu>.active>a,
.with-nav-tabs.panel-primary .nav-tabs>li.dropdown .dropdown-menu>.active>a:hover,
.with-nav-tabs.panel-primary .nav-tabs>li.dropdown .dropdown-menu>.active>a:focus {
  background-color: #4a9fe9;
}

/********************************************************************/

/*** PANEL SUCCESS ***/

.with-nav-tabs.panel-success .nav-tabs>li>a,
.with-nav-tabs.panel-success .nav-tabs>li>a:hover,
.with-nav-tabs.panel-success .nav-tabs>li>a:focus {
  color: #3c763d;
}

.with-nav-tabs.panel-success .nav-tabs>.open>a,
.with-nav-tabs.panel-success .nav-tabs>.open>a:hover,
.with-nav-tabs.panel-success .nav-tabs>.open>a:focus,
.with-nav-tabs.panel-success .nav-tabs>li>a:hover,
.with-nav-tabs.panel-success .nav-tabs>li>a:focus {
  color: #3c763d;
  background-color: #d6e9c6;
  border-color: transparent;
}

.with-nav-tabs.panel-success .nav-tabs>li.active>a,
.with-nav-tabs.panel-success .nav-tabs>li.active>a:hover,
.with-nav-tabs.panel-success .nav-tabs>li.active>a:focus {
  color: #3c763d;
  background-color: #fff;
  border-color: #d6e9c6;
  border-bottom-color: transparent;
}

.with-nav-tabs.panel-success .nav-tabs>li.dropdown .dropdown-menu {
  background-color: #dff0d8;
  border-color: #d6e9c6;
}

.with-nav-tabs.panel-success .nav-tabs>li.dropdown .dropdown-menu>li>a {
  color: #3c763d;
}

.with-nav-tabs.panel-success .nav-tabs>li.dropdown .dropdown-menu>li>a:hover,
.with-nav-tabs.panel-success .nav-tabs>li.dropdown .dropdown-menu>li>a:focus {
  background-color: #d6e9c6;
}

.with-nav-tabs.panel-success .nav-tabs>li.dropdown .dropdown-menu>.active>a,
.with-nav-tabs.panel-success .nav-tabs>li.dropdown .dropdown-menu>.active>a:hover,
.with-nav-tabs.panel-success .nav-tabs>li.dropdown .dropdown-menu>.active>a:focus {
  color: #fff;
  background-color: #3c763d;
}

/********************************************************************/

/*** PANEL INFO ***/

.with-nav-tabs.panel-info .nav-tabs>li>a,
.with-nav-tabs.panel-info .nav-tabs>li>a:hover,
.with-nav-tabs.panel-info .nav-tabs>li>a:focus {
  color: #31708f;
}

.with-nav-tabs.panel-info .nav-tabs>.open>a,
.with-nav-tabs.panel-info .nav-tabs>.open>a:hover,
.with-nav-tabs.panel-info .nav-tabs>.open>a:focus,
.with-nav-tabs.panel-info .nav-tabs>li>a:hover,
.with-nav-tabs.panel-info .nav-tabs>li>a:focus {
  color: #31708f;
  background-color: #bce8f1;
  border-color: transparent;
}

.with-nav-tabs.panel-info .nav-tabs>li.active>a,
.with-nav-tabs.panel-info .nav-tabs>li.active>a:hover,
.with-nav-tabs.panel-info .nav-tabs>li.active>a:focus {
  color: #31708f;
  background-color: #fff;
  border-color: #bce8f1;
  border-bottom-color: transparent;
}

.with-nav-tabs.panel-info .nav-tabs>li.dropdown .dropdown-menu {
  background-color: #d9edf7;
  border-color: #bce8f1;
}

.with-nav-tabs.panel-info .nav-tabs>li.dropdown .dropdown-menu>li>a {
  color: #31708f;
}

.with-nav-tabs.panel-info .nav-tabs>li.dropdown .dropdown-menu>li>a:hover,
.with-nav-tabs.panel-info .nav-tabs>li.dropdown .dropdown-menu>li>a:focus {
  background-color: #bce8f1;
}

.with-nav-tabs.panel-info .nav-tabs>li.dropdown .dropdown-menu>.active>a,
.with-nav-tabs.panel-info .nav-tabs>li.dropdown .dropdown-menu>.active>a:hover,
.with-nav-tabs.panel-info .nav-tabs>li.dropdown .dropdown-menu>.active>a:focus {
  color: #fff;
  background-color: #31708f;
}

/********************************************************************/

/*** PANEL WARNING ***/

.with-nav-tabs.panel-warning .nav-tabs>li>a,
.with-nav-tabs.panel-warning .nav-tabs>li>a:hover,
.with-nav-tabs.panel-warning .nav-tabs>li>a:focus {
  color: #8a6d3b;
}

.with-nav-tabs.panel-warning .nav-tabs>.open>a,
.with-nav-tabs.panel-warning .nav-tabs>.open>a:hover,
.with-nav-tabs.panel-warning .nav-tabs>.open>a:focus,
.with-nav-tabs.panel-warning .nav-tabs>li>a:hover,
.with-nav-tabs.panel-warning .nav-tabs>li>a:focus {
  color: #8a6d3b;
  background-color: #faebcc;
  border-color: transparent;
}

.with-nav-tabs.panel-warning .nav-tabs>li.active>a,
.with-nav-tabs.panel-warning .nav-tabs>li.active>a:hover,
.with-nav-tabs.panel-warning .nav-tabs>li.active>a:focus {
  color: #8a6d3b;
  background-color: #fff;
  border-color: #faebcc;
  border-bottom-color: transparent;
}

.with-nav-tabs.panel-warning .nav-tabs>li.dropdown .dropdown-menu {
  background-color: #fcf8e3;
  border-color: #faebcc;
}

.with-nav-tabs.panel-warning .nav-tabs>li.dropdown .dropdown-menu>li>a {
  color: #8a6d3b;
}

.with-nav-tabs.panel-warning .nav-tabs>li.dropdown .dropdown-menu>li>a:hover,
.with-nav-tabs.panel-warning .nav-tabs>li.dropdown .dropdown-menu>li>a:focus {
  background-color: #faebcc;
}

.with-nav-tabs.panel-warning .nav-tabs>li.dropdown .dropdown-menu>.active>a,
.with-nav-tabs.panel-warning .nav-tabs>li.dropdown .dropdown-menu>.active>a:hover,
.with-nav-tabs.panel-warning .nav-tabs>li.dropdown .dropdown-menu>.active>a:focus {
  color: #fff;
  background-color: #8a6d3b;
}

/********************************************************************/

/*** PANEL DANGER ***/

.with-nav-tabs.panel-danger .nav-tabs>li>a,
.with-nav-tabs.panel-danger .nav-tabs>li>a:hover,
.with-nav-tabs.panel-danger .nav-tabs>li>a:focus {
  color: #a94442;
}

.with-nav-tabs.panel-danger .nav-tabs>.open>a,
.with-nav-tabs.panel-danger .nav-tabs>.open>a:hover,
.with-nav-tabs.panel-danger .nav-tabs>.open>a:focus,
.with-nav-tabs.panel-danger .nav-tabs>li>a:hover,
.with-nav-tabs.panel-danger .nav-tabs>li>a:focus {
  color: #a94442;
  background-color: #ebccd1;
  border-color: transparent;
}

.with-nav-tabs.panel-danger .nav-tabs>li.active>a,
.with-nav-tabs.panel-danger .nav-tabs>li.active>a:hover,
.with-nav-tabs.panel-danger .nav-tabs>li.active>a:focus {
  color: #a94442;
  background-color: #fff;
  border-color: #ebccd1;
  border-bottom-color: transparent;
}

.with-nav-tabs.panel-danger .nav-tabs>li.dropdown .dropdown-menu {
  background-color: #f2dede;
  /* bg color */
  border-color: #ebccd1;
  /* border color */
}

.with-nav-tabs.panel-danger .nav-tabs>li.dropdown .dropdown-menu>li>a {
  color: #a94442;
  /* normal text color */
}

.with-nav-tabs.panel-danger .nav-tabs>li.dropdown .dropdown-menu>li>a:hover,
.with-nav-tabs.panel-danger .nav-tabs>li.dropdown .dropdown-menu>li>a:focus {
  background-color: #ebccd1;
  /* hover bg color */
}

.with-nav-tabs.panel-danger .nav-tabs>li.dropdown .dropdown-menu>.active>a,
.with-nav-tabs.panel-danger .nav-tabs>li.dropdown .dropdown-menu>.active>a:hover,
.with-nav-tabs.panel-danger .nav-tabs>li.dropdown .dropdown-menu>.active>a:focus {
  color: #fff;
  /* active text color */
  background-color: #a94442;
  /* active bg color */
}
</style>

<script>
function getCurrentMedianHistoryPrice() {
  var deferred = $.Deferred();
  //console.error(deferred);
  steem.api.getCurrentMedianHistoryPrice(function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise();
}

function getRewardFund() {
  var deferred = $.Deferred();
  //console.error(deferred);
  //steem.api.getRewardFundAsync("post")
  steem.api.getRewardFund("post", function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise();
}

function getDynamicGlobalProperties() {
  var deferred = $.Deferred();
  //console.error(deferred);
  //steem.api.getRewardFundAsync("post")
  steem.api.getDynamicGlobalProperties(function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise();
}

// steem.api.getAccounts
function getAccounts(arr_acct_nm) {
  var deferred = $.Deferred();
  //console.error(deferred);
  //steem.api.getRewardFundAsync("post")
  steem.api.getAccounts(arr_acct_nm, function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise();
}

function _inqryAccountInfo(marketInfo, rewardFund, gprops, acctInfo) {

  try {

    //var acctInfo = await steem.api.getAccountsAsync( [ data.acct_nm ] );
    if (acctInfo.length == 0) {
      return;
    }
    waitingDialog.hide();
    //var gprops = await steem.api.getDynamicGlobalPropertiesAsync();
    var steemPower = gprops.total_vesting_fund_steem.replace(" STEEM", "") / gprops.total_vesting_shares.replace(" VESTS", "");
    data.post_count = acctInfo[0].post_count;
    //console.log(gprops, acctInfo, steemPower);
    data.created = moment(acctInfo[0].created).format('YYYY-MM-DD');
    var userTotalVest = parseInt(acctInfo[0].vesting_shares.replace(" VESTS", "")) -
      parseInt(acctInfo[0].delegated_vesting_shares.replace(" VESTS", "")) +
      parseInt(acctInfo[0].received_vesting_shares.replace(" VESTS", ""));
    data.acct_sp_tot = Math.floor(userTotalVest * steemPower);
    data.acct_sp = Math.floor(parseInt(acctInfo[0].vesting_shares.replace(" VESTS", "")) * steemPower);
    data.acct_sp_delegate = Math.floor(parseInt(acctInfo[0].delegated_vesting_shares.replace(" VESTS", "")) * steemPower);
    data.acct_sp_received = Math.floor(parseInt(acctInfo[0].received_vesting_shares.replace(" VESTS", "")) * steemPower);

    var secondsago = (new Date - new Date(acctInfo[0].last_vote_time + "Z")) / 1000;
    var vpow = acctInfo[0].voting_power + (10000 * secondsago / 432000);
    vpow = Math.min(vpow / 100, 100).toFixed(2);

    const STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS = 60 * 60 * 24 * 7;
    let vestingShares = parseFloat(acctInfo[0].vesting_shares.replace(" VESTS", ""))
    let receivedVestingShares = parseFloat(acctInfo[0].received_vesting_shares.replace(" VESTS", ""))
    let totalVestingShares = parseFloat(gprops.total_vesting_shares.replace(" VESTS", ""))
    let max_virtual_bandwidth = parseInt(gprops.max_virtual_bandwidth, 10)
    let average_bandwidth = parseInt(acctInfo[0].average_bandwidth, 10)

    let delta_time = (new Date - new Date(acctInfo[0].last_bandwidth_update + "Z")) / 1000

    let bandwidthAllocated = (max_virtual_bandwidth * (vestingShares + receivedVestingShares) / totalVestingShares)
    bandwidthAllocated = Math.round(bandwidthAllocated / 1000000);

    let new_bandwidth = 0
    if (delta_time < STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS) {
      new_bandwidth = (((STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS - delta_time) * average_bandwidth) / STEEMIT_BANDWIDTH_AVERAGE_WINDOW_SECONDS)
    }
    new_bandwidth = Math.round(new_bandwidth / 1000000);
    let bandwidth_remaining = 100 - (100 * new_bandwidth / bandwidthAllocated);
    bandwidth_remaining = bandwidth_remaining.toFixed(2);
    //console.log("current bandwidth used", new_bandwidth);
    //console.log("current bandwidth allocated", bandwidthAllocated);
    //console.log("bandwidth % used", 100 * new_bandwidth / bandwidthAllocated);
    //console.log("bandwidth % remaining", bandwidth_remaining);


    data.bandwidth_remaining = bandwidth_remaining;
    // max(log10(abs(reputation))-9,0)*((reputation>= 0)?1:-1)*9+25
    var reputation = Math.max(Math.log10(Math.abs(acctInfo[0].reputation)) - 9, 0) * ((acctInfo[0].reputation >= 0) ? 1 : -1) * 9 + 25;

    //data.reputation = steem.formatter.reputation(acctInfo[0].reputation);
    data.reputation = reputation.toFixed(2);


    //$('#vp_slider').slider('value', parseInt(vpow));
    //$('#vp_slider').val( parseInt(vpow));
    //$('#vp_slider').bootstrapSlider('setValue', parseInt(vpow));
    //$("#vp_slider").attr('data-slider-value', parseInt(vpow));
    //$("#vp_slider").bootstrapSlider('refresh');

    $("#vp_slider").bootstrapSlider('setValue', vpow);
    //$("#vp_slider").slider('setValue', vpow);

    $("#voting_power").css("width", vpow + "%");
    data.voting_power = vpow;
    //setVpSlider( parseInt(vpow)  );
    $("#bandwidth_remaining").css("width", bandwidth_remaining + "%");
    //var rewardFund = await steem.api.getRewardFundAsync("post");

    data.reward_balance = rewardFund.reward_balance.replace(" STEEM", "");
    data.recent_claims = rewardFund.recent_claims;
    //var marketInfo = await steem.api.getCurrentMedianHistoryPriceAsync();
    data.base = marketInfo.base.replace(" SBD", "");
    data.quote = marketInfo.quote.replace(" STEEM", "");
    data.steem_power = steemPower;
    //var a = gprops.total_vesting_fund_steem.replace(" STEEM", "") / gprops.total_vesting_shares.replace(" VESTS", "");

    calcVotingValue();


  } catch (err) {

  } finally {
    $("#acct_info").removeClass("hidden");
    waitingDialog.hide();

    //$("#acct_nm").focus();
  }

}

function calcVotingValue(value) {
  if (!data.steem_power || !data.acct_sp_tot || data.acct_sp_tot <= 0) {
    return;
  }
  var n = 100;
  var r = data.acct_sp_tot / data.steem_power;
  var p = 1e4;

  value = value ? value : data.voting_power;

  var m = parseInt(100 * (value) * (100 * n) / p);
  m = parseInt((m + 49) / 50);

  var m_full = parseInt(100 * 100 * (100 * n) / p);
  m_full = parseInt((m_full + 49) / 50);

  var i = data.reward_balance / data.recent_claims;
  var l = parseInt(r * m * 100) * i * (data.base / data.quote);
  var l_full = parseInt(r * m_full * 100) * i * (data.base / data.quote);

  data.voting_value = l.toFixed(2);
  data.voting_full_value = l_full.toFixed(2);
  console.log("voting value : ", l, l.toFixed(2), value);

  data.full_in_hour = parseInt((100 - data.voting_power) / 20 * 24);


}

function homeSubmit() {

  data.muterList = [];
  data.postList = [];
  data.commentsList = [];
  data.repliesList = [];
  data.feedList = [];
  inqryFeedInfo();
  inqryAccountInfo();


  inqryMuteInfo();
  inqryPostInfo();
  inqryCommentsInfo();
  inqryRepliesInfo();


}


async function inqryRepliesInfo() {
  try {
    if (!data.acct_nm) {
      return;
    }
    var tab_spinner_id = "tab_replies_spinner";
    var tab_table_id = "tab_replies_table";
    $("#" + tab_spinner_id).removeClass("hidden");
    $("#" + tab_table_id).addClass("hidden");

    var author = data.acct_nm;
    var result = await steem.api.getRepliesByLastUpdateAsync(author, '', 30);
    //console.log(result);
    for (var i = 0; i < result.length; i++) {
      data.repliesList.push(result[i]);
    }
  } catch (err) {
    console.error("inqryRepliesInfo", err);
  } finally {
    $("#" + tab_spinner_id).addClass("hidden");
    $("#" + tab_table_id).removeClass("hidden");
  }
}

async function inqryCommentsInfo() {
  try {
    if (!data.acct_nm) {
      return;
    }
    var tab_spinner_id = "tab_comments_spinner";
    var tab_table_id = "tab_comments_table";
    $("#" + tab_spinner_id).removeClass("hidden");
    $("#" + tab_table_id).addClass("hidden");

    var author = data.acct_nm;
    var result = await steem.api.getDiscussionsByCommentsAsync({
      start_author: author,
      limit: 30
    });
    //console.log(result);
    for (var i = 0; i < result.length; i++) {
      data.commentsList.push(result[i]);
    }
  } catch (err) {
    console.error("inqryCommentsInfo", err);
  } finally {
    $("#" + tab_spinner_id).addClass("hidden");
    $("#" + tab_table_id).removeClass("hidden");
  }
}
var converter = new showdown.Converter({
  'tables': true,
  'strikethrough': true,
  'simpleLineBreaks': true
});

function changeYouTubeTag(html) {
  html = html.replace(/https:\/\/www.youtube.com\/([\w]*)/gi, '<p><div class="youtube_div"><iframe class="youtube_iframe" wdith="100%" src="https:\/\/www.youtube.com\/embed\/$1"><\/iframe></div><\/p\>');
  return html.replace(/https:\/\/youtu.be\/([\w]*)/gi, '<p><div class="youtube_div"><iframe class="youtube_iframe" wdith="100%" src="https:\/\/www.youtube.com\/embed\/$1"><\/iframe></div><\/p\>');
}

var urlRegex = /(\(.*?)?\b(?![^<]*>|[^<>]*<\/(?!(?:p|pre)>))((?:https?|ftp|file):\/\/[-a-z0-9+&@#\/%?=~_()|!:,.;]*[-a-z0-9+&@#\/%=~_()|])/ig;
function replaceURLWithHTMLLinks(text) {
    return text.replace(urlRegex, function(match, lParens, url) {
        var rParens = '';
        lParens = lParens || '';
        var lParenCounter = /\(/g;
        while (lParenCounter.exec(lParens)) {
            var m;
            if (m = /(.*)(\.\).*)/.exec(url) ||
                    /(.*)(\).*)/.exec(url)) {
                url = m[1];
                rParens = m[2] + rParens;
            }
        }
        return lParens + "<a href='" + url + "'>" + url + "</a>" + rParens;
    });
}

function replaceAtMentionsWithLinks ( text ) {
    return text.replace(/(?![^<a]*>|[^<a>]*<\/(?!(?:p|pre)>))@([a-z\d_]+)/ig, '<a href="https://steemit.com/@$1">@$1</a>');
}

function replaceTagLink ( html ) {
  html = html.replace(/(^|\s)(#[-a-z\d]+)/gi, tag => {
      if (/#[\d]+$/.test(tag)) return tag; // Don't allow numbers to be tags
      const space = /^\s/.test(tag) ? tag[0] : '';
      const tag2 = tag.trim().substring(1);
      const tagLower = tag2.toLowerCase();
      console.log(tag);
      //if (!true) return tag;
      return space + "<a href='https://steemit.com/created/"+tagLower+"'>" + tag + "</a>";
  });
  return html;
}

function replaceMentionLink ( html ) {
  html = html.replace(
          /(^|[^a-zA-Z0-9_!#$%&*@＠\/]|(^|[^a-zA-Z0-9_+~.-\/#]))[@＠]([a-z][-\.a-z\d]+[a-z\d])/gi,
          (match, preceeding1, preceeding2, user) => {
              const userLower = user.toLowerCase();
              //const valid = validate_account_name(userLower) == null;
              const valid = true;
              //if (valid && usertags) usertags.add(userLower);
              const preceedings = (preceeding1 || '') + (preceeding2 || ''); // include the preceeding matches if they exist
              //if (!mutate) return `${preceedings}${user}`;
              return preceedings + '<a href="https://steemi.com/@' + userLower + '">@' + user + '</a>';
          }
      );
    return html;
}

function imageSetting(html) {
  var html_change = html;
  html_change = html_change.replace(/<em>/ig,"").replace(/<\/em>/ig,"");
  var regex = /(<([^>]+)>)/ig
  var result = html_change.replace(regex, "");
  regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/ig;
  var arrMatch = result.match(regex);
  //console.log(arrMatch);
  if (arrMatch != null) {
    for (var i = 0; i < arrMatch.length; i++) {
      re = new RegExp(arrMatch[i], "g");
      html_change = html_change.replace(re, "<img src='" + arrMatch[i] + "'/>");
      if (i != arrMatch.lenght - 1) {
        for (var j = i + 1; j < arrMatch.length; j++) {
          if (arrMatch[j] == arrMatch[i]) {
            arrMatch.splice(j, 1);
          }
        }
      }
    }
  }
  regex = /(https?:\/\/.steemitimages)/ig;
  arrMatch = result.match(regex);
  if (arrMatch != null) {
    for (var i = 0; i < arrMatch.length; i++) {
      re = new RegExp(arrMatch[i], "g");
      html_change = html_change.replace(re, "<img src='" + arrMatch[i] + "'/>");
      if (i != arrMatch.lenght - 1) {
        for (var j = i + 1; j < arrMatch.length; j++) {
          if (arrMatch[j] == arrMatch[i]) {
            arrMatch.splice(j, 1);
          }
        }
      }
    }
  }
  return html_change;
}

htmlEscapeToText = function(text) {
  return text.replace(/\&\#[0-9]*;|&amp;/g, function(escapeCode) {
    if (escapeCode.match(/amp/)) {
      return '&';
    }
    return String.fromCharCode(escapeCode.match(/[0-9]+/));
  });
}
// return a custom renderer for marked.
render_plain = function() {
  var render = new marked.Renderer();
  // render just the text of a link
  render.link = function(href, title, text) {
    return text;
  };
  // render just the text of a paragraph
  render.paragraph = function(text) {
    return htmlEscapeToText(text) + '\r\n';
  };
  // render just the text of a heading element, but indecate level
  render.heading = function(text, level) {
    return text;
  };

  // render nothing for images
  render.image = function(href, title, text) {
    return '';
  };
  render.strong = function(text) {
    return text;
  };
  return render;
}

function setContentMore(obj) {
  var payout_val = (parseFloat(obj.total_payout_value.replace(" SBD", "")) + parseFloat(obj.curator_payout_value.replace(" SBD", "")) + parseFloat(obj.pending_payout_value.replace(" SBD", ""))).toFixed(2);

  var tooltip = 'votes : ' + obj.net_votes;
  tooltip += '<br />comment : ' + obj.children;
  tooltip += '<br />created : ' + obj.created;
  obj.tooltip = tooltip;
  obj.payout_val = payout_val;
  /*
  obj.text = marked(obj.body, {
    renderer: render_plain()
  });
  */
  //console.error(converter);
  //obj.html2 = marked(obj.body).replace(/\n/, "<br />");
  obj.html = converter.makeHtml(obj.body);
  obj.html = changeYouTubeTag(imageSetting(obj.html));
  obj.html = replaceURLWithHTMLLinks(obj.html);
  obj.html = replaceTagLink(obj.html);
  obj.html = replaceMentionLink(obj.html);
  //var html = $.parseHTML( obj.html );
  //console.error(html, $(html).find("iframe"));
  obj.text = obj.html.replace(/<\/?[^>]+(>|$)/g, "");
  var pattern = new RegExp(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/);
  obj.images = obj.html.match(pattern);
  /*
  if( obj.images && obj.images.length > 0 ){
    obj.doorImg = $( obj.images[0] ).src;
  }
  */
  //console.log(obj);
  return obj;
}

async function inqryPostMoreInfo() {
  try {
    if (!data.acct_nm) {
      return;
    }
    $("#tab_post_more_spinner").removeClass("hidden");
    var author = data.acct_nm;
    var result = await steem.api.getDiscussionsByAuthorBeforeDateAsync(author, data.postList[data.postList.length - 1].permlink, '2100-01-01T00:00:00', 100);
    for (var i = 1; i < result.length; i++) {
      setContentMore(result[i]);
      data.postList.push(result[i]);
    }
    $("#tab_post_more_spinner").addClass("hidden");
  } catch (err) {
    console.error("inqryPostMoreInfo", err);
  } finally {
    $("#tab_post_more_spinner").addClass("hidden");
  }
}

async function inqryFeedMoreInfo() {
  try {
    if (!data.acct_nm) {
      return;
    }
    $("#tab_feed_more_spinner").removeClass("hidden");
    var author = data.acct_nm;
    var result = await steem.api.getDiscussionsByFeedAsync({
      tag: author,
      start_author: data.feedList[data.feedList.length - 1].author,
      start_permlink: data.feedList[data.feedList.length - 1].permlink,
      limit: 31
    });
    console.error("inqryFeedMoreInfo", result);
    for (var i = 1; i < result.length; i++) {
      setContentMore(result[i]);
      data.feedList.push(result[i]);
    }
    $("#tab_feed_more_spinner").addClass("hidden");
  } catch (err) {
    console.error("inqryFeedMoreInfo", err);
  } finally {
    $("#tab_feed_more_spinner").addClass("hidden");
  }
}

async function inqryFeedInfo() {
  try {
    if (!data.acct_nm) {
      return;
    }
    var tab_spinner_id = "tab_feed_spinner";
    var tab_table_id = "tab_feed_table";
    $("#" + tab_spinner_id).removeClass("hidden");
    $("#" + tab_table_id).addClass("hidden");
    var author = data.acct_nm;
    var result = await steem.api.getDiscussionsByFeedAsync({
      tag: author,
      limit: 30
    });
    //console.log("inqryFeedInfo", result);
    for (let i = 0; i < result.length; i++) {
      setContentMore(result[i]);
      data.feedList.push(result[i]);
    }
    $("#" + tab_spinner_id).addClass("hidden");
    $("#" + tab_table_id).removeClass("hidden");
  } catch (err) {
    console.error("inqryFeedInfo", err);
  } finally {
    //console.error("home", home);
    //app.$forceUpdate();
  }
}

async function inqryPostInfo() {
  try {
    if (!data.acct_nm) {
      return;
    }

    $("#tab_post_spinner").removeClass("hidden");
    $("#tab_post_table").addClass("hidden");

    var author = data.acct_nm;
    var result = await steem.api.getDiscussionsByAuthorBeforeDateAsync(author, null, '2100-01-01T00:00:00', 30);
    for (var i = 0; i < result.length; i++) {
      setContentMore(result[i]);
      data.postList.push(result[i]);
    }
    $("#tab_post_spinner").addClass("hidden");
    $("#tab_post_table").removeClass("hidden");
  } catch (err) {
    console.error("inqryPostInfo", err);
  } finally {

  }
}

function inqryMuteInfo() {
  try {
    if (!data.acct_nm) {
      return;
    }
    var follower = data.acct_nm;
    var startFollowing = '';
    //var followType = 'blog';
    var followType = 'ignore';
    var limit = 999;

    steem.api.getFollowing(follower, startFollowing, followType, limit, function(err, result) {
      //console.log(err, result);
      if (!err) {

      } else {
        console.error("steem.api.getFollowing", err);
      }
    });
    var following = data.acct_nm;
    var startFollower = '';
    followType = 'ignore';
    steem.api.getFollowers(following, startFollower, followType, limit, function(err, result) {
      //console.log(err, result);
      if (!err) {
        for (var i = 0; i < result.length; i++) {
          data.muterList.push({
            account: result[i].follower
          });
        }
      } else {
        console.error("steem.api.getFollowers", err);
      }
    });

  } catch (err) {
    console.error("inqryMuteInfo", err);
  } finally {

  }
}

function inqryAccountInfo() {
  try {
    if (!data.acct_nm) {
      return;
    }
    waitingDialog.show('Collecting steem infomation...', {
      progressType: 'info'
    });
    var combinedPromise = $.when(
      getCurrentMedianHistoryPrice(), getRewardFund("poste"), getDynamicGlobalProperties(), getAccounts([data.acct_nm])
    );
    combinedPromise.fail(function(f1Val, f2Val, f3Val, f4Val) {
      waitingDialog.hide();
      alert('Steem Node Error!');
      console.error('fail!', f1Val, f2Val, f3Val, f4Val);
    });
    localStorage.setItem('steem.id', data.acct_nm);
    data.inqry_acct = data.acct_nm;
    // 함수는 getData와 getLocation이 둘 다 해결됐을 때 호출될 것이다.
    combinedPromise.done(function(marketInfo, rewardFund, gprops, acctInfo) {
      console.log("We get data: ", marketInfo, rewardFund, gprops, acctInfo);
      _inqryAccountInfo(marketInfo, rewardFund, gprops, acctInfo);
    });
  } catch (err) {
    console.error("error!", err);
  } finally {

  }
}

function setVpSlider(initValue) {
  var slider = $('#vp_slider').bootstrapSlider({
    //var slider = $('#vp_slider').slider({
    formatter: function(value) {
      $("#voting_power").css("width", value + "%");
      data.voting_power = value;
      calcVotingValue();
      return value + ' %';
    },
    change: function(event, ui) {
      console.log("has changed");
    },
    value: initValue,
    min: 0,
    max: 100,
    step: 1,
    width: '100%',
    ticks_tooltip: true
    //, data-popup-enabled="true"
    //, tooltip : 'always'

  });
  // .find(".slider-handle min-slider-handle round")
  var round_div = $(slider.bootstrapSlider('getElement')).find(".slider-handle.min-slider-handle.round");
  round_div.on('touchstart', () => {
    slider.bootstrapSlider('showTooltip');
  });
  round_div.on('touchend', () => {
    slider.bootstrapSlider('hideTooltip');
  });
}

function getExternalApi(url, fromNames, toNames) {
  $.ajax({
    url: url,
    dataType: 'json',
    type: 'get',
    data: '',
    success: function(response) {
      if (Array.isArray(fromNames)) {
        for (let i = 0; i < fromNames.length; i++) {
          data[toNames[i]] = response[0][fromNames[i]];
        }
      } else {
        data[toNames] = response[0][fromNames];
      }
      //console.error(response);
    },
    fail: function(err) {
      console.error(err);
    }
  });
}

function viewPost(item) {
  //console.log("scrollTop!!!");
  data.post = item;
  app.$nextTick(function(){
    $(".modal-body").find("a").each(
      function(){
        $(this).attr("target","_blank");
      }
    );
    $('.modal-body>*>img').waitForImages(function() {
      //console.error('All images have loaded.');
      $("#tab_modal_post_spinner").removeClass("hidden");
    }, function(loaded, count, success) {
      console.error(loaded + ' of ' + count + ' images has ' + (success ? 'loaded' : 'failed to load') +  '.');
    });

    $('.modal-body>*>img').waitForImages(true).done(function() {
      //console.error('All images have loaded222.');
      $("#tab_modal_post_spinner").addClass("hidden");
    });

    $('.modal-body>*>img').waitForImages().progress(function(loaded, count, success) {
      console.error(loaded + ' of ' + count + ' images has ' + (success ? 'loaded' : 'failed to load') +  '.');
    });



  });
}

var data = {
  acct_nm: '',
  inqry_acct: '',
  busy_msg: '',
  acct_sp_tot: 0,
  acct_sp: 0,
  acct_sp_delegate: 0,
  acct_sp_received: 0,
  voting_power: 0,
  bandwidth_remaining: 0,
  reputation: 0,
  voting_value: 0,
  voting_full_value: 0,
  reward_balance: 0,
  recent_claims: 0,
  base: 0,
  quote: 0,
  steem_power: 0,
  full_in_hour: 0,
  krw_usd: 0,
  upbit_krw_sbd: 0,
  upbit_krw_sbd_change: 0,
  upbit_krw_steem: 0,
  upbit_krw_steem_change: 0,
  post_count: 0,
  created: '',
  muterList: [],
  postList: [],
  feedList: [],
  commentsList: [],
  repliesList: [],
  post: {}

};
//var data2 = data.clone();
var home = module.exports = {
  data: function() {
    return {
      data: data
    }
  },
  methods: {
    getBusyVotingPower: function() {
      getBusyVotingPower();
    },
    inqryAccountInfo: function() {
      inqryAccountInfo();
    },
    getCurrentMedianHistoryPriceAsync: function() {
      getCurrentMedianHistoryPriceAsync();
    },
    homeSubmit: function() {
      homeSubmit();
    },
    markdown_filter: function(body) {
      return marked(body);
    },
    inqryPostMoreInfo: function() {
      inqryPostMoreInfo();
    },
    viewPost: function(item) {
      viewPost(item);
    },
    closePostModal: function() {
      $(".modal-body").scrollTop(0);
    },
    inqryFeedMoreInfo: function() {
      inqryFeedMoreInfo();
    }
  },
  created: function() {
    var steem_id = localStorage.getItem('steem.id');
    if (!steem_id) {
      $("#acct_info").addClass("hidden");
      //console.log("eeeeeeeeeeeeee");
    }
  },
  filters: {
    comma: function(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    inc_round: function(value) {
      if (!value) return value;
      var newValue = Math.floor(parseFloat(value) * 10000);
      if (newValue == 0) return 0;
      return newValue / 100.0;
    }
  },
  computed: {
    inc_color_steem: function() {
      return [
        (this.data.upbit_krw_steem_change > 0) ? 'text-danger' : 'text-primary', 'margin-bottom-xs'
        //this.data.upbit_krw_steem_change
      ]
    },
    inc_color_sbd: function() {
      return [
        (this.data.upbit_krw_sbd_change > 0) ? 'text-danger' : 'text-primary'
        //this.data.upbit_krw_steem_change
      ]
    },
    calc_created_days: function() {
      if (!this.data.created) return '';
      return ' | ' + comma(moment().diff(moment(this.data.created), 'day')) + ' days';
    }
  }

  ,
  mounted: function() {
    // get krw/usd
    getExternalApi(
      'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD', 'basePrice', 'krw_usd'
    );
    // get upbit steem
    getSteemPrice();
    setInterval(getSteemPrice, 19000);
    // get upbit sbd
    getSBDPrice();
    setInterval(getSBDPrice, 20000);

    setVpSlider(0);

    var steem_id = localStorage.getItem('steem.id');
    if (steem_id) {
      data.acct_nm = steem_id;
      homeSubmit();
    } else {
      $("#acct_info").addClass("hidden");
    }

    $('#postModal').on('shown.bs.modal', function(e) {
      $(".modal-body").scrollTop(0);
    });

    $('#postModal').on('hidden.bs.modal', function(e) {
      $(".modal-body").scrollTop(0);
    })
  }
}

getSteemPrice = () => {
  getExternalApi(
    'https://crix-api-endpoint.upbit.com/v1/crix/candles/days?code=CRIX.UPBIT.KRW-STEEM&count=1', ['tradePrice', 'signedChangeRate'], ['upbit_krw_steem', 'upbit_krw_steem_change']
  )
}

getSBDPrice = () => {
  getExternalApi(
    'https://crix-api-endpoint.upbit.com/v1/crix/candles/days?code=CRIX.UPBIT.KRW-SBD&count=1', ['tradePrice', 'signedChangeRate'], ['upbit_krw_sbd', 'upbit_krw_sbd_change']
  )
}

// Delay between 2 votes is 12 hours
const delay = parseInt(43200);
// Amount required to get the minimum upvote (1%) is 20000000 VESTS ~ 2 Dolphins ~ 10 000 SP
const minVests = 20000000;
// Amount required to get 100% upvote is 4000000000000 VESTS ~ 2 000 Whales ~ 2 000 000 000 SP
const maxVests = 4000000000000;
// Don't upvote user beyond 10000000000000 VESTS
const limitVests = 10000000000000;
// Don't upvote more than 25%
const maxUpvote = 2500;

function calculateVotingPower(followers_mvest) {

  let votingPower = 0;
  try {
    votingPower = followers_mvest >= minVests ? parseFloat(10000 / maxVests * followers_mvest) : 0;
    votingPower = votingPower > 10000 ? 10000 : parseFloat(votingPower);
    votingPower = (votingPower > 0 && votingPower < 6) ? 6 : parseInt(votingPower);
    if (maxUpvote) {
      votingPower = votingPower > maxUpvote ? maxUpvote : votingPower;
    }
    if (limitVests && followers_mvest >= limitVests) {
      votingPower = 0;
    }
  } catch (e) {
    console.log(e);
  }
  console.log("votingPower : " + votingPower);
  if (votingPower > 0) {
    votingPower = votingPower / 100.0;
  }
  return votingPower;
}

async function getSteemPower(callback) {
  var result = await steem.api.getDynamicGlobalPropertiesAsync();
  var steemPower = result.total_vesting_fund_steem.replace(" STEEM", "") / result.total_vesting_shares.replace(" VESTS", "");
  //callback(steemPower);
  return steemPower;
}

async function cb_requestWS(res) {
  //alert("콜백이 실행이 되는군....");

  var body = JSON.parse(res.body);
  const followers_mvest = body[0].followers_mvest;
  console.log("followers_mvest : " + followers_mvest);
  var votingPower = calculateVotingPower(followers_mvest);

  var steemPower;
  var result;
  steemPower = await getSteemPower();



  result = await steem.api.getAccountsAsync(["busy.org", data.acct_nm]);
  var userTotalVest = parseInt(result[0].vesting_shares.replace(" VESTS", "")) -
    parseInt(result[0].delegated_vesting_shares.replace(" VESTS", "")) +
    parseInt(result[0].received_vesting_shares.replace(" VESTS", ""));
  var accountSP = userTotalVest * steemPower;
  console.log("busy.org의 스파는...? ", Math.floor(accountSP));

  var followersSP = followers_mvest * steemPower;
  console.log("나의 팔로우의 스파는?", Math.floor(followersSP));
  var minSP = minVests * steemPower;
  var maxSP = maxVests * steemPower;

  var msg = "<a>@" + data.acct_nm + "</a>님께서는 <a>@busy.org</a>에게 " + votingPower + "% 의 파워로 보팅 받으실 수 있습니다.";
  msg += "<br/><br/><a>@busy.org</a> 스팀파워 : " + comma(Math.floor(accountSP));
  msg += "<br/> 내 팔로워 스파 총합은? : " + comma(Math.floor(followersSP));
  //msg += "<br/> 최소 팔로우 스파 총합은? : " + Math.floor(minSP);
  //msg += "<br/> 최대 팔로우 스파 총합은? : " + Math.floor(maxSP);


  data.busy_msg = msg;

  waitingDialog.hide();
}

function getBusyVotingPower() {
  if ($('#acct_nm').val().length == 0) {
    $('#acct_nm').tooltip('show');
    return;
  }

  localStorage.setItem('steem.id', data.acct_nm);

  if (requestIO({
      cmd: "proxy",
      url: "https://steemdb.com/api/accounts?account=" + data.acct_nm
    }, cb_requestWS)) {
    waitingDialog.show('Calculate the voting power of @busy.org', {
      progressType: 'primary'
    });
  } else {
    data.busy_msg = "현재 서비스가 원활하지 않습니다.잠시 후에 재시도 해주세요.";
  }
}
</script>
