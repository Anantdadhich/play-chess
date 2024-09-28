
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

const ChessPiece = ({ className }:any) => (
  <div className={`absolute opacity-10 ${className}`}>
    ♟
  </div>
);

export const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
     
            <ChessPiece className="text-8xl top-1/4 left-1/4 animate-float" />
            <ChessPiece className="text-7xl top-3/4 right-1/3 animate-float-delayed" />
            <ChessPiece className="text-9xl bottom-1/4 right-1/4 animate-float" />
            <ChessPiece className="text-6xl top-1/2 left-1/3 animate-float-delayed" />
            
         
            <div className="relative z-10 max-w-7xl w-full space-y-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
                    <div className="order-2 md:order-1">
                        <div className="relative group">
                            <img 
                                src="/chess.jpg" 
                                alt="High-quality chess board" 
                                className="rounded-lg shadow-2xl w-full max-w-2xl mx-auto transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-3xl"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 text-center md:text-left space-y-6">
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                            Play chess online on the #2 site
                        </h1>
                        <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                            Join thousands of players from around the world. Challenge your mind and improve your skills on our premium chess platform!
                        </p>
                        <div className="mt-5 sm:mt-8">
                            <Button 
                                onClick={() => navigate("/gaming")}
                                
                            >
                                Play Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

