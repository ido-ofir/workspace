
var moment = require('moment');

function isToday(momentDate) {
    return moment().isSame(momentDate, 'day');
}
function isYesterday(momentDate) {
    return moment().subtract(1, 'days').isSame(momentDate, 'day');
}
function isTwoDaysAgo(momentDate) {
    return moment().subtract(2, 'days').isSame(momentDate, 'day');
}
function isWithinAWeek(momentDate) {
    return momentDate.isAfter(moment().subtract(7, 'days'));
}

moment.smartDate = function(date){
  var m = moment(new Date(date));
  if(isToday(m)) return m.format('HH:mm');
  if(isYesterday(m)) return ('Yesterday ' + m.format('HH:mm'));
  if(isTwoDaysAgo(m)) return ('Two days ago ' + m.format('HH:mm'));
  if(isWithinAWeek(m)) return m.format('dddd HH:mm');
  return m.format('DD/MM/YYYY HH:mm')
}

module.exports = moment;
