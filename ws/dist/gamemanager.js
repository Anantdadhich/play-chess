"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const game_1 = require("./game");
class GameManager {
    constructor() {
        this.games = []; //initalise the empty game array
        this.pendingUsers = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket); //adds a new websocket server
        this.addHandler(socket); //register message listeners
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
        //stop the game here bacuse the user left
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUsers) {
                    const game = new game_1.Game(this.pendingUsers, socket);
                    this.games.push(game);
                    this.pendingUsers = null;
                }
                else {
                    this.pendingUsers = socket;
                }
            }
            if (message.type === messages_1.MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.payload.move); //this specific user try to move
                }
            }
        });
    }
}
exports.GameManager = GameManager;
