import React from "react"


export const Button = ({onClick,children}:{onClick:()=>void ,children:React.ReactNode}) => {

  return <button onClick={onClick}  className="w-full md:w-auto px-8 py-3 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          {children}
                </button>
}


