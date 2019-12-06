const moment = require('moment');

console.log(moment(new Date().toISOString()).isValid());
console.log(moment(Date.now()).isValid());
console.log(moment(new Date()).isValid());
