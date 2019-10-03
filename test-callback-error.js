'use strict';

// const fun = (done) => {
//     console.log('hola mundo');
//     throw new Error('oh shit');
//     console.log('bye mundo');
//     done();
// };

// try {
//     fun((callbackError) => {
//         if (callbackError) {
//             console.log({ callbackError }):
//         }
//     });
// } catch (caughtError) {
//     console.log({ caughtError });
// }



const fun = (done) => {
    try {
        console.log('hola mundo');
        throw new Error('oh shit');
        console.log('bye mundo');
        done();
    } catch (e) {
        done(e);
    }
};

fun((callbackError) => {
    if (callbackError) {
        console.log({ callbackError });
    }
});