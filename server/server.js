const Server = require('multiplayerjs-server');

const testServer = new Server();

testServer.listen(5432, () => console.log("Server listening on port 5432"));