const http = require('http'); //Header file (Module)
const app = require('./app'); //Header file (Module)

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log("App is running on port " + port);
});