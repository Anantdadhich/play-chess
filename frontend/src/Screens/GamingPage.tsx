import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Chessboard } from "../components/Chessboard"
import { useSocket } from "../hooks/UseSocket"
import { Chess } from "chess.js"
export const INIT_GAME="init_game"
export const MOVE="move"
export const GAME_OVER="game_over"

export const GamingPage = () => {
    const socket = useSocket();
    //@ts-ignore
    const [chess, setchess] = useState(new Chess())
    const [board, setboard] = useState(chess.board())
    const [started, setstarted] = useState(false)
    const [whitePlayer, setWhitePlayer] = useState("Player 1")
    const [blackPlayer, setBlackPlayer] = useState("Player 2")

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            console.log(message)

            switch(message.type) {
                case INIT_GAME:
                    setboard(chess.board())
                    setstarted(true)
                   
                    setWhitePlayer(message.whitePlayer || "Player 1")
                    setBlackPlayer(message.blackPlayer || "Player 2")
                    console.log("init game")
                    break;
                case MOVE:
                    const move = message.payload
                    chess.move(move)
                    setboard(chess.board())
                    console.log("move")
                    break;
                case GAME_OVER:
                    console.log("game over")
                    break;
            }
        }
    }, [socket])

    if (!socket) return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                    <div className="lg:col-span-4 bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="mb-4 flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
                                <p className="text-white font-semibold">{blackPlayer}</p>
                            </div>
                            <div className={`px-3 py-1 rounded ${chess.turn() === 'b' ? 'bg-indigo-600' : 'bg-gray-700'}`}>
                                {chess.turn() === 'b' ? "Current Turn" : ""}
                            </div>
                        </div>
                        <Chessboard board={board} setBoard={setboard} chess={chess} socket={socket} />
                        <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-white rounded-full"></div>
                                <p className="text-white font-semibold">{whitePlayer}</p>
                            </div>
                            <div className={`px-3 py-1 rounded ${chess.turn() === 'w' ? 'bg-indigo-600' : 'bg-gray-700'}`}>
                                {chess.turn() === 'w' ? "Current Turn" : ""}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-full">
                            <h2 className="text-2xl font-semibold text-white mb-4">Game Controls</h2>
                            {!started ? (
                                <div className="flex flex-col items-center">
                                    <p className="text-gray-300 mb-4">Ready to challenge your mind?</p>
                                    <Button 
                                        onClick={() => {
                                            socket.send(JSON.stringify({ type: INIT_GAME }))
                                        }}
                                    >
                                        Start New Game
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-gray-700 rounded-md p-4">
                                        <h3 className="text-xl font-semibold text-white mb-2">Current Turn</h3>
                                        <p className="text-indigo-300 text-lg">
                                            {chess.turn() === 'w' ? 'White' : 'Black'}
                                        </p>
                                    </div>
                                    <div className="bg-gray-700 rounded-md p-4">
                                        <h3 className="text-xl font-semibold text-white mb-2">Players</h3>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <div className="w-4 h-4 bg-white rounded-full"></div>
                                            <p className="text-white">White: {whitePlayer}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
                                            <p className="text-white">Black: {blackPlayer}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}