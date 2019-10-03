'use strict';

const async = require('async');

/**
 * @description test memory usage of async.waterfall when calling callback before finishing tasks
 */

const exec = callback => async.waterfall([
  () => callback(),
  ...Array(1000).fill(true).map(() => x => x()),
], callback);

let i = 0;

const callback = () => {
  if (!(i % 10)) {
    const { heapUsed } = process.memoryUsage();
    console.log(i, Math.round(heapUsed / 1024), 'kb');
  }

  if (i < 100) {
    i += 1;
    setTimeout(() => exec(callback));
    // exec(callback);
  }
};

exec(callback);
