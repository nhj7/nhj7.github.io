<template>
  <div id="coinTickerDiv">
    <div id="divButton">
      <!--span class="glyphicon glyphicon-text-color"></span-->
      <button v-on:click="setColor('black')">Black</button>
      <button v-on:click="setColor('gray')">Gray</button>
      <button v-on:click="setColor('silver')">Silver</button>
    </div>
    <div id='msg'>
    </div>
    <div class="divTicker">
      <table id="table_ticker" class="table table-hover text-center">
        <thead>
        <tr>
          <!--td>NO</td-->
          <td v-on:click="data.isEn = !data.isEn;  localStorage.setItem('Ticker.isEn', data.isEn) " >
            {{ data.isEn?"영문명":"한글명"}}
          </td>
          <td v-on:click="setTickerOrder('curPrice')" >
            현재가
            <span v-if="data.tickerOrder.curPrice=='A'" class="glyphicon glyphicon-arrow-up"></span>
            <span v-if="data.tickerOrder.curPrice=='D'" class="glyphicon glyphicon-arrow-down"></span>
          </td>
          <td v-on:click="setTickerOrder('chRate')">
            전일대비
            <span v-if="data.tickerOrder.chRate=='A'" class="glyphicon glyphicon-arrow-up"></span>
            <span v-if="data.tickerOrder.chRate=='D'" class="glyphicon glyphicon-arrow-down"></span>
          </td>
          <td v-on:click="setTickerOrder('vol')" >
            거래대금
            <span v-if="data.tickerOrder.vol=='A'" class="glyphicon glyphicon-arrow-up"></span>
            <span v-if="data.tickerOrder.vol=='D'" class="glyphicon glyphicon-arrow-down"></span>
          </td>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in data.tickerList" v-bind:class="item.korean_name=='스팀'?'classSTEEM':''" >
            <!--td>{{ idx+1 }}</td-->
            <td>{{ data.isEn?item.en_name:item.korean_name }}</td>
            <td>{{ item.curPrice | comma }}</td>
            <td>{{ item.chRate | comma }}</td>
            <td>{{ comma((     item.vol>1000000 ? ( item.vol / 1000000 ) : item.vol ).toFixed(0)) + (item.vol>1000000 ? "백만" : "")  }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>
<script>

function setTickerOrder(varNm){
  var oldVal = data.tickerOrder[varNm];
  data.tickerOrder = {};
  if( oldVal == "D")
   data.tickerOrder[varNm] = "A"
  else if( oldVal == "A" )
    data.tickerOrder[varNm] = ""
  else
    data.tickerOrder[varNm] = "D"

  localStorage.setItem("tickerOrder", JSON.stringify(data.tickerOrder));

  setOrderList(varNm, data.tickerOrder[varNm] );
}
function setColor(color){
  localStorage.setItem("test_upbit_color", color);
  $("#coinTickerDiv").css("color", color);
}

function setUpbitData(){
  $.ajax({
    url: "https://api.upbit.com/v1/market/all",
    dataType: "json"
  }).done(function(markets){
    //$("#tmp").html( JSON.stringify(markets) );

    //console.log('arr_krw_markets : ', JSON.stringify(markets));

    let arr_krw_markets = "";
    let arr_korean_name = [];
    let arr_en_name = [];
    for(var i = 0; i < markets.length;i++){
      if( markets[i].market.indexOf("KRW") > -1 ){
        arr_krw_markets += markets[i].market+(",");
        arr_korean_name.push(markets[i].korean_name.replace("코인","").replace("토큰",""));
        arr_en_name.push(markets[i].english_name)
      }
    }
    arr_krw_markets = arr_krw_markets.substring(0, arr_krw_markets.length-1);
    //console.log('arr_krw_markets : ', arr_krw_markets);
    //$("#tmp").html( arr_krw_markets );
    $.ajax({
      url: "https://api.upbit.com/v1/ticker?markets=" +arr_krw_markets,
      dataType: "json"
    }).done(function(tickers){
      //$("#table_ticker > tbody > tr").remove();
      //alert($("#table_ticker > tbody > tr").length);
      $("#table_ticker").fadeOut("slow");
      data.tickerList = [];
      for(let i = 0;i < tickers.length;i++){
        let ticker = {  no : i + 1
          , korean_name : arr_korean_name[i]
          , en_name : arr_en_name[i]
          , curPrice : (tickers[i].trade_price)
          , chRate : ((tickers[i].signed_change_rate*100).toFixed(2))
          , vol : tickers[i].acc_trade_price_24h
        };
        data.tickerList.push(ticker);
      } // end for...

      for(let i in data.tickerList[0] ){
        //console.log("i : ", i);
        if( data.tickerOrder[ i ] != null ){
          setOrderList(i, data.tickerOrder[ i ] );
        }
      }

      //console.log(data.tickerList.length);
      $("#table_ticker").fadeIn("slow");
    })  //done(function(tickers){
  }) // end done(function(markets){
  .fail(function(){
    //alert("업비트 API 접근 중 에러.")}
    data.msg = ( "API 접근 중 에러." );
  })
  setTimeout(setUpbitData, 13000);
}

function setOrderList(varNm, sortCd){
  data.tickerList.sort(function(a, b){
    if( sortCd == "A" )
      return a[varNm] - b[varNm];
    else if( sortCd == "D" ){
      return b[varNm] - a[varNm];
    }else{
      return a.no - b.no;
    }
  });
}

var data = {
  tickerList : []
  , msg : ''
  , tickerOrder : {
    chRate : ''
  }
  , isEn : false
};
module.exports = {
  name: 'TickerUpbit',
  data: function () {
    return {
      data : data
    }
  },
  computed: {

  },filters: {
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
  },methods: {
    setUpbitData : function(){ setUpbitData(); }
    , setColor : function(color){setColor(color);}
    , setTickerOrder : function(varNm){ setTickerOrder(varNm) }
  }
  , created: function() {
    console.log('created', null);
  }, mounted : function() {
    console.log('mounted');
    var color = localStorage.getItem("test_upbit_color");
    if( color ) $("#coinTickerDiv").css("color", color);
    var tickerOrder = localStorage.getItem("tickerOrder");
    if( tickerOrder ){
      data.tickerOrder = JSON.parse(tickerOrder);
    }
    //console.log(localStorage.getItem('Ticker.isEn'))
    data.isEn = localStorage.getItem('Ticker.isEn')=="true";
    setUpbitData();
  }
  /*
  , watch: {

    'data.tickerList' : {
      handler: function (val, oldVal) {
        console.log('a thing changed', val, oldVal)
      },
      deep: true
    }
  }
  */

}

function setColor(color){
  localStorage.setItem("test_upbit_color", color);
  $("#coinTickerDiv").css("color", color);
}
</script>
<style>
#coinTickerDiv{
  color:silver;
}
.classSTEEM{
  /*background-color: #EFFBFB;*/

}
</style>
