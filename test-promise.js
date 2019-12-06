const promise = new Promise((res, rej) => {

    try {
        throw new Error('hello world');
    } catch (e) {
        rej(e);
    } finally {
        res('resolved anyway');
    }

    res(123);
    console.log('still executing');
    rej('fail');
});

promise.then((val) => {
    console.log('succeeded', val);
}).catch((err) => {
    console.error('failed', err);
});
