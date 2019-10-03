'use strict';

const _ = require('lodash');

const a = { prop: { batata: 1 } };
const b = { prop: 'mundo' };

const result = _.mergeWith(a, b, (x, y) => y);

console.log(result);
