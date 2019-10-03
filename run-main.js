'use strict';

const async = require('async');
const { spawn } = require('child_process');
const { Worker, isMainThread } = require('worker_threads');

const cwd = process.cwd();
const serviceScript = `${cwd}/run-service.js`;

const run = async () => {
  console.log('worked');
};

const mongodbWorker = new Worker(serviceScript);
const redisWorker = new Worker(serviceScript);

async.parallel({
  mongo: next => mongodbWorker.on('message', () => mongodbWorker.terminate(next)),
  redis: next => redisWorker.on('message', () => redisWorker.terminate(next)),
}, run);

mongodbWorker.postMessage('mongod');
redisWorker.postMessage('redis-server');
