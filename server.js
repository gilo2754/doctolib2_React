const serve = require('serve');
const server = serve('build', { port: process.env.PORT || 3000 });
