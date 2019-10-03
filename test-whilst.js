const async = require('async');

var count = 6;

const test = (x) => {
    console.log(x);
    return count < 5;
};

const iter = (callback) => {
    count++;
    callback();
}

async.whilst(
    test,
    iter,
    function (err, n) {
        console.log(err, n)
    }
);