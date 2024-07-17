import { WebSocketServer } from "ws";
import { GameManager } from "./gamemanager";


const wss =new WebSocketServer({port:8080})

const gameManager=new GameManager();

wss.on('connection',function connection(socket){
    gameManager.addUser(socket)

    socket.on("disconnect",()=>{
     gameManager.removeUser(socket)
    })

})