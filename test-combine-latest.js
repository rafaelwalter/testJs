'use strict';

const rxjs = require('rxjs');

const subject1 = new rxjs.Subject();
const subject2 = new rxjs.Subject();


subject1.next(1);
subject2.next(2);


rxjs.forkJoin([
    subject1.asObservable(),
    subject2.asObservable(),
]).subscribe((result) => {
    console.log(result);
});

subject1.next(1);
subject2.next(2);

subject1.next(1);
