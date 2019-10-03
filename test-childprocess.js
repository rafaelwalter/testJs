'use strict';

const { promisify } = require('util');
const { exec } = require('child_process');

const execAsync = promisify(exec);

const run = async () => {
  const isNode12 = process.version.startsWith('v12');

  if (!isNode12) {
    console.error('Not on node 12');

    const cmd = 'pwd'

    const { stdout, stderr } = await execAsync(cmd);

    console.log('\n\tresult:');
    console.log(stdout, stderr);
  }
};

run();
