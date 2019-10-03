'use strict';

const fs = require('fs');

const stream = fs.createWriteStream('stream-output.txt');

stream.write(Buffer.from(new String('hola')));

stream.end();