const moment = require('moment');

var date = moment();
date.add(10, 'months')

console.log(date.format('MMM Do YYYY'));
console.log(date.format('h:m a'));