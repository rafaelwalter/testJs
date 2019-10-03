'use strict';

const { of, throwError, Subject, empty } = require('rxjs');
const { switchMap, catchError, concatMap } = require('rxjs/operators');

const subject = new Subject();

const observable = subject.asObservable().pipe(
    concatMap(() => {
        // throw 'js throw';
        return throwError('rx throw').pipe(
            catchError((catchedErr1) => {
                // console.log({ catchedErr1 });
                return [];
                // return empty();
            }),
        );
        // return of('hola que tal');
    }),

    catchError((catchedErr) => {
        console.log({ catchedErr2 });
        return empty();
        // return [];
        // return of(null);
    }),
);

// callbacks
const success = ok => console.log({ success });
const error = err => console.error({ err });
const complete = ok => console.log({ complete });

// subscription
observable.subscribe(success, error, complete);

console.time('empty');
// start
for (let i = 0; i < 10000; i += 1) {
    subject.next();
}
console.timeEnd('empty');