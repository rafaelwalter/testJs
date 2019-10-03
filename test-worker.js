const { Worker } = require('worker_threads');

/**
 * @description test running multiple threads in parallel with cpu intensive operations
 */

const factory = () => {
    return new Worker(
        `
        const { parentPort } = require('worker_threads');
        
        const exec = (count) => {
            let tot = 0;
            for (let i = 0; i < count * 100000000; i++) {
                tot += i;
            }
            return tot;
        };
    
        parentPort.on('message', ({ count, tid }) => {
            const result = exec(parseInt(count, 10));
            parentPort.postMessage(tid);
        });
        `,
        { eval: 1 },
    );
}

const exec = (count) => {
    let tot = 0;
    for (let i = 0; i < count * 10000000; i++) {
        tot += i;
    }
    return tot;
};

const count = 100;
let threadsN = 7;

const finished = () => {
    if (!--threadsN) process.exit();
}

const threads = Array(threadsN).fill(true).map(factory);
threads.forEach((t) => {
    t.on('message', (tid) => {
        console.timeEnd(tid);
        finished();
    });
});

console.time('mainthread');
threads.forEach((t, i) => {
    const tid = `t${i + 1}`;
    console.time(tid);
    t.postMessage({ count, tid });
    // exec(parseInt(count, 10));
});

exec(parseInt(count, 10));
console.timeEnd('mainthread');
// process.exit();