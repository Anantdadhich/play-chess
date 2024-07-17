import { Chess, Color, PieceSymbol, Square } from "chess.js"
import React, { useState } from "react";
import { MOVE } from "../Screens/GamingPage";


export const Chessboard = ({chess,setBoard,board,socket}:{
  chess:Chess;
  setBoard: React.Dispatch<React.SetStateAction<({    //for updateing the board state
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]>>;
  board:({
    square:Square;    //we define the 2d array of squares 
    type:PieceSymbol;      //the symbol ike king etc
    color:Color;
  }|null)[][];
  socket:WebSocket;
}) => {
  const [from ,setform]=useState<Square |null>(null)   //is used to track the square when the piece is moved

  return (
    <div className="text-white-200">
        {board.map((row,i)=>{
            return <div  key={i} className="flex">
               {row.map((square,j)=>{
                const squarerepresentation=String.fromCharCode(97+(j%8))+""+(8-i)as Square   //is calculated using ASCII values to convert column indices 
                return <div onClick={()=>{
                  if(!from){
                    setform(squarerepresentation)
                  }
                  else{
                
                    socket.send(JSON.stringify({
                      type:MOVE,
                      payload:{
                        move:{
                          from,
                          to:squarerepresentation
                        }
                      }
                    }))
                    setform(null)
                    chess.move({
                      from,
                      to:squarerepresentation
                    })
                    setBoard(chess.board())
                    console.log({
                      from,
                      to:squarerepresentation
                    })
                  }
                }}
                key={j} className={`w-16 h-16  ${(i+j) %2===0? 'bg-green-400':'bg-slate-400'} `}>
                  <div className="w-full justify-center flex h-full ">
                    <div className="h-full flex flex-col justify-center">
                       {square ? <img className="w-4" src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} copy`}.png`} /> : null} 
                    </div>
                </div>
             </div>
               })}
            </div>
        })}
    </div>
  )
}


