
import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Chessboard } from "../components/Chessboard"
import { useSocket } from "../hooks/UseSocket"
import { Chess } from "chess.js"
export const INIT_GAME="init_game"
export const MOVE="move"
export const GAME_OVER="game_over"

 export const GamingPage = () => {
    const socket=useSocket();
     const [chess,setchess]=useState(new Chess())
     const [board,setboard]=useState(chess.board())
     const [started,setstarted]=useState(false)
    useEffect(()=>{   //runs after the compo render
       if(!socket){    //check if socket is available
        return
       }

       socket.onmessage=(event)=>{
         const message=JSON.parse(event.data)
         console.log(message)

         switch(message.type){
          case INIT_GAME:
           
            setboard(chess.board())
            setstarted(true)
            console.log("init game")
            break;
             case MOVE:
              const move=message.payload
              chess.move(move)
              setboard(chess.board())
            console.log("move")
              break;
           case GAME_OVER:
            console.log("game over")
            break;
         }
       }
    },[socket])
    if(!socket) return <div>loading</div>
  return (
    <div className="flex justify-center">
     <div className="pt-8 max-w-screen-lg w-full ">
        <div className="grid grid-cols-6 gap-4 w-full ">
            <div className="col-span-4 w-full flex justify-center">
                <Chessboard board={board} setBoard={setboard} chess={chess} socket={socket}></Chessboard>
            </div>
            <div className="col-span-2 w-full flex justify-center bg-slate-800">
               <div className="pt-8">
                { !started&&
                   <Button onClick={()=>{
                socket.send(JSON.stringify( {
                    type:INIT_GAME
                } ))
              }}>Play</Button>
                }
               </div>
            </div>
        </div>
     </div>
    </div>
  )
}


