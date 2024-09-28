import { Chess, Color, PieceSymbol, Square } from "chess.js"
import React, { useState } from "react";
import { MOVE } from "../Screens/GamingPage";

export const Chessboard = ({chess, setBoard, board, socket}: {
  chess: Chess;
  setBoard: React.Dispatch<React.SetStateAction<({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][]>>;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  const [hoveredSquare, setHoveredSquare] = useState<Square | null>(null);

  const handleSquareClick = (squareRepresentation: Square) => {
    if (!from) {
      setFrom(squareRepresentation);
    } else {
      socket.send(JSON.stringify({
        type: MOVE,
        payload: {
          move: {
            from,
            to: squareRepresentation
          }
        }
      }));
      setFrom(null);
      chess.move({
        from,
        to: squareRepresentation
      });
      setBoard(chess.board());
    }
  };

  return (
    <div className="inline-block bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-8 gap-0.5">
        {board.map((row, i) => (
          row.map((square, j) => {
            const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
            const isLightSquare = (i + j) % 2 === 0;
            const isSelected = from === squareRepresentation;
            const isHovered = hoveredSquare === squareRepresentation;

            return (
              <div 
                key={`${i}-${j}`}
                onClick={() => handleSquareClick(squareRepresentation)}
                onMouseEnter={() => setHoveredSquare(squareRepresentation)}
                onMouseLeave={() => setHoveredSquare(null)}
                className={`
                  w-16 h-16 flex items-center justify-center
                  ${isLightSquare ? 'bg-amber-200' : 'bg-amber-800'}
                  ${isSelected ? 'ring-4 ring-blue-500' : ''}
                  ${isHovered && !isSelected ? 'ring-2 ring-yellow-400' : ''}
                  transition-all duration-150 ease-in-out
                `}
              >
                {square && (
                  <img 
                    src={`/${square.color === "b" ? square.type : `${square.type.toUpperCase()} copy`}.png`}
                    alt={`${square.color} ${square.type}`}
                    className="w-12 h-12 object-contain transition-transform duration-150 ease-in-out transform hover:scale-110"
                  />
                )}
                {(i === 7 || j === 0) && (
                  <span className={`absolute ${j === 0 ? 'top-0 left-0' : 'bottom-0 right-0'} m-1 text-xs font-semibold ${isLightSquare ? 'text-amber-800' : 'text-amber-200'}`}>
                    {j === 0 ? 8 - i : String.fromCharCode(97 + j)}
                  </span>
                )}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
};