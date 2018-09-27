function comma(x) {
  if( !x ) return x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getTimeBeforeFull(votingPower) {
  var fullInString;
  var remainingPowerToGet = 100.0 - votingPower / 100;
  // 1% every 72minutes
  var minutesNeeded = remainingPowerToGet * 72;
  if (minutesNeeded === 0) {
      fullInString = "Already full!";
  } else {
      var fullInDays = parseInt(minutesNeeded / 1440);
      var fullInHours = parseInt((minutesNeeded - fullInDays * 1440) / 60);
      var fullInMinutes = parseInt((minutesNeeded - fullInDays * 1440 - fullInHours * 60));

      fullInString = (fullInDays === 0 ? '' : fullInDays + (fullInDays > 1 ? ' days ' : 'day ')) +
          (fullInHours === 0 ? '' : fullInHours + (fullInHours > 1 ? ' hours ' : 'hour ')) +
          (fullInMinutes === 0 ? '' : fullInMinutes + (fullInMinutes > 1 ? ' minutes ' : 'minute'));
  }
  return fullInString;
}
