<template>

<div>

{{ data.toDay }}

<div class="form-group">
  <div class="row">
    <div class="col-sm-4 col-sm-offset-4">
      <div class="input-group">
        <span class="input-group-addon primary">
          <!--i class="glyphicon glyphicon-user"></i-->
          @
        </span>
        <input data-toggle="tooltip" title="아이디를 입력해주세요!" required @keyup.enter="inqryVoteRating" v-model="data.acct_nm" id="acct_nm" type="text" class="form-control " name="acct_nm" placeholder="account name">
        <span class="input-group-btn">
          <button type="submit" class="btn btn-primary " v-on:click="inqryVoteRating">Submit</button>
        </span>
      </div>
    </div>
  </div> <!-- row -->
</div><!-- form-group -->

<div id="chart_div" style="width: 100%; height: 100%;"></div>


</div>





</template>

<style>

</style>



<script>
var vueData = {
  nm: 'VoteRating'
  , acct_nm : ''
  , toDay : ''
  , chart_id : 'chart_div'
};

async function inqryVoteRating(){
  localStorage.setItem('steem.id', vueData.acct_nm);
  var result = await steem.api.getAccountsAsync( [ vueData.acct_nm ] );

  console.log(result);

  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawTrendlines);
}

function drawTrendlines() {
  var data = new google.visualization.DataTable();
  data.addColumn('timeofday', 'Time of Day');
  data.addColumn('number', 'Motivation Level');
  data.addColumn('number', 'Energy Level');

  data.addRows([
    [{v: [8, 0, 0], f: '8 am'}, 1, .25],
    [{v: [9, 0, 0], f: '9 am'}, 2, .5],
    [{v: [10, 0, 0], f:'10 am'}, 3, 1],
    [{v: [11, 0, 0], f: '11 am'}, 4, 2.25],
    [{v: [12, 0, 0], f: '12 pm'}, 5, 2.25],
    [{v: [13, 0, 0], f: '1 pm'}, 6, 3],
    [{v: [14, 0, 0], f: '2 pm'}, 7, 4],
    [{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
    [{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
    [{v: [17, 0, 0], f: '5 pm'}, 10, 10],
  ]);

  var options = {
    title: 'Motivation and Energy Level Throughout the Day',
    trendlines: {
      0: {type: 'linear', lineWidth: 5, opacity: .3},
      1: {type: 'exponential', lineWidth: 10, opacity: .3}
    },
    hAxis: {
      title: 'Time of Day',
      format: 'h:mm a',
      viewWindow: {
        min: [7, 30, 0],
        max: [17, 30, 0]
      }
    },
    vAxis: {
      title: 'Rating (scale of 1-10)'
    }
  };

  var chart = new google.visualization.ColumnChart(document.getElementById(vueData.chart_id));
  chart.draw(data, options);
}
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work',     11],
    ['Eat',      2],
    ['Commute',  2],
    ['Watch TV', 2],
    ['Sleep',    7]
  ]);

  var options = {
    title: 'Whale Vote Rating',
    is3D: true,
  };

  var chart = new google.visualization.PieChart(document.getElementById(vueData.chart_id));
  chart.draw(data, options);
}



var home = module.exports = {
  data: function() {
    return {
      data: vueData
    }
  },
  methods: {
    inqryVoteRating : function(){
      inqryVoteRating();
    }
    , drawChart : function(){
      drawChart();
    }

  },
  mounted: function() {
    vueData.acct_nm = localStorage.getItem('steem.id');

    //drawChart();
  }
}
</script>
