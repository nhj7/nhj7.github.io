$(function() {
  function e() {
    ($("input[name='frm_steempower']").val() < 0 || $("input[name='frm_steempower']").val() > 1e7) && $("input[name='frm_steempower']").val(1e7), ($("input[name='frm_votingpower']").val() < 0 || $("input[name='frm_votingpower']").val() > 100) && $("input[name='frm_votingpower']").val(100), ($("input[name='frm_voteweight']").val() < 0 || $("input[name='frm_voteweight']").val() > 100) && $("input[name='frm_voteweight']").val(100);
    var e = $("input[name='frm_steempower']").val(),
      t = $("input[name='frm_votingpower']").val(),
      n = $("input[name='frm_voteweight']").val(),
      r = e / a,
      m = parseInt(100 * t * (100 * n) / p);
    m = parseInt((m + 49) / 50);
    var l = parseInt(r * m * 100) * i * o;
    $("#vote_value").text(l.toFixed(2)), $("#vote_value").hide().fadeIn("fast")
  }

  function t() {
    steem.api.getRewardFund("post", function(e, t) {
      n = t.reward_balance, r = t.recent_claims, i = n.replace(" STEEM", "") / r, $("#reward_balance").text(parseInt(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")), $("#recent_claims").text(parseInt(r / 1e9).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "B")
    }), steem.api.getCurrentMedianHistoryPrice(function(e, t) {
      o = t.base.replace(" SBD", "") / t.quote.replace(" STEEM", ""), $("#steem_price_sbd").text("$" + o.toFixed(2))
    }), setTimeout(t, 1e4)
  }
  var a, n, r, i, o, p = 1e4;
  steem.api.setOptions({
    url: "https://api.steemit.com"
  }), t();
  var m = setInterval(function() {
    void 0 !== o && (clearInterval(m), steem.api.getDynamicGlobalProperties(function(t, n) {
      a = n.total_vesting_fund_steem.replace(" STEEM", "") / n.total_vesting_shares.replace(" VESTS", ""), e()
    }))
  }, 200);
  $("#form_calc").on("submit", function(t) {
    e(), t.preventDefault()
  })
});
