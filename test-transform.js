const { Transform } = require('stream');

const myTransform = new Transform({
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    chunk |= 0;

    throw new Error('hola');

    // Transform the chunk into something else.
    const data = chunk.toString(16);

    // Push the data onto the readable queue.
    callback(null, '0'.repeat(data.length % 2) + data);
  }
});

myTransform.setEncoding('ascii');
myTransform.on('data', (chunk) => console.log(chunk));

myTransform.write(1);