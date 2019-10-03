const array = Array(100000).fill(true).map((value, index) => index); // [0,1,2,3]

console.time('obj');
const obj = {};
array.forEach(i => obj[i] = true); // O(n)
// array.filter(e => obj[e]); // O(n)

for (let i = 0; i <= array.length; i += 1) {
    if (obj[i]) {
        break;
    }
}

console.timeEnd('obj');

console.time('set');
const set = new Set(array);
// array.filter(e => set.has(e)); // O(n)

for (let i = 0; i <= array.length; i += 1) {
    if (set.has(i)) {
        break;
    }
}
console.timeEnd('set');

console.time('array');
// array.filter(e => array.some(i => i === e)); // O(n*n)

batata:

for (let i = 0; i <= array.length; i += 1) {
    for (let y = 0; y <= array.length; y += 1) {
        if (i === y) {
            continue batata;
        }
    }
}

console.timeEnd('array');
