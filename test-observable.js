'use strict';

const { Observable } = require('rxjs');

const obs = new Observable((subscriber) => {
    subscriber.next('hola');
    subscriber.next('hola2');

    subscriber.complete();
});

obs.subscribe((x) => console.log(1, x));