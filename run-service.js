'use strict';

const { parentPort, isMainThread } = require('worker_threads');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

parentPort.on('message', async (service) => {
  await execAsync(`sudo service ${service} start`);
  parentPort.postMessage(null);
});
