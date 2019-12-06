const { asyncScheduler, queueScheduler, from, Observable, of, merge } = require('rxjs');
const { observeOn, switchMap, mergeAll } = require('rxjs/operators');

const observable$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9]).pipe(
    observeOn(asyncScheduler),
);

const observable2$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9]).pipe(
    observeOn(asyncScheduler),
    switchMap((val) => {
        // console.log(val);
        if (val !== 3) {
            return of(val * 100);
        }
        return new Observable((subscriber) => {
            for (let i = 0; i < 10000000000; i++) {

            }
            subscriber.next(val * 100);
        });
    }),
);

console.log("Just before the asyncScheduler");

merge(observable2$, observable$, queueScheduler).subscribe((val) => console.log(val))

console.log("Just after the asyncScheduler");