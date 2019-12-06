const counter = require('./test-imports1');

console.log(counter.getTotal());

counter.increment();

console.log(counter.getTotal());

counter.increment();

console.log(counter.getTotal());
