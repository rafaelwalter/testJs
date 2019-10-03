'use strict';

class MyArray {
    constructor () {
        this._data = {};
        this._length = 0;
    }

    get length() {
        return this._length;
    }

    set length(len) {
        if (len < this._length) {
            const current = this._length;
            for (let i = len; i < current; i += 1) {
                this.pop();
            }
        } else {
            for (let i = this._length; i < len; i += 1) {
                this.push(undefined);
            }
        }
    }

    splice(index) {
        if (index < this._length) {
            for (let i = index; i < this._length - 1; i += 1) {
                this._data[i] = this._data[i + 1];
            }

            this.pop();
        }
    }

    push(...args) {
        args.forEach((element) => {
            this._data[this._length] = element;
            this._length += 1;
        });
    }

    concat(...args) {
        args.forEach((element) => {
            this.push(...element);
        });
    }

    pop() {
        this._length -= 1;

        // immutability
        // const { [this._length]: last, ...rest } = this._data;
        // this._data = rest;

        // mutability
        const last = this._data[this._length];
        delete this._data[this._length];
        return last;
    }

    forEach(callback) {
        for (let i = 0; i < this._length; i += 1) {
            callback(this._data[i], i);
        }
    }

    async asyncForEach(callback) {
        for (let i = 0; i < this._length; i += 1) {
            await callback(this._data[i], i);
        }
    }
}

const array = new MyArray();

array.push(1,2,3,4,5,6,7,8,9,10)

array.pop()

array.concat([10,11,12], [13,14,15])

array.splice(1);

array.length = 20;

// console.log(array);

// array.asyncForEach(async (item) => {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             console.log(item);
//             res();
//         }, 500)
//     })
// });