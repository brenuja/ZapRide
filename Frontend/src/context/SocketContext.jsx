import React, { createContext, useEffect} from "react";
import {io} from 'socket.io-client'

export const SocketContext = createContext()


const SocketProvider = ({children}) =>{
    // console.log({io:io,uri:`${import.meta.env.VITE_BASE_URL}`})
    const socket = io(`${import.meta.env.VITE_BASE_URL}`)
    console.log(socket)
      useEffect(() => {
          socket.on('connect', () => {
              console.log('Connected to the server')
      })

      socket.on('disconnect', () =>{
          console.log('Disconnected from the server')
      })

    }, [])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;