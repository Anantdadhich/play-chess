"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const gamemanager_1 = require("./gamemanager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new gamemanager_1.GameManager();
wss.on('connection', function connection(socket) {
    gameManager.addUser(socket);
    socket.on("disconnect", () => {
        gameManager.removeUser(socket);
    });
});