import { WebSocket } from "ws"
import { INIT_GAME, MOVE } from "./messages"
import { Game } from "./game"

  export class GameManager{
    private games:Game[]  // array to store the game objects 
    private pendingUsers:WebSocket|null  //waiting for another user to connect then 
    private users:WebSocket[]   //an array to store the no of websockets servers in user form 
    constructor(){
        this.games=[]   //initalise the empty game array
        this.pendingUsers=null
        this.users=[]
    }

    addUser(socket:WebSocket){
     this.users.push(socket)   //adds a new websocket server
     this.addHandler(socket)   //register message listeners
    }
    removeUser(socket:WebSocket){
    this.users=this.users.filter(user =>user !==socket)
    //stop the game here bacuse the user left
    }
    private addHandler(socket:WebSocket){
    socket.on("message", (data)=>{
        const message=JSON.parse(data.toString())
       
        if(message.type===INIT_GAME){
         if(this.pendingUsers){
          const game =new Game(this.pendingUsers,socket)
          this.games.push(game)
          this.pendingUsers=null
         }else{
            this.pendingUsers=socket
         }
        }
       if(message.type===MOVE){
        const game=this.games.find(game=>game.player1===socket ||game.player2===socket)
        if(game){
            game.makeMove(socket,message.payload.move) //this specific user try to move
        }  
    }
    })
    }
  }