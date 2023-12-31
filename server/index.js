const express = require("express");
const { createWebSocketServer } = require('./modules/websocket');
const settings = require('./modules/settings');

// Create an Express app
const app = express();

// app.use(express.static("../client/dist"));

const server = app.listen(settings.listenPort, () => {
    console.log(`Server listening on port ${settings.listenPort}`);
});

createWebSocketServer(server);