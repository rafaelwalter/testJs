const dns = require('dns');

dns.lookup('esteticaebioenergetica.firebaseapp.com', (err, adress, family) => {
    console.log(err, adress, family);
})