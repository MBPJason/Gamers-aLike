import React, {useContext, useEffect, useState} from 'react'
import io from "socket.io-client"
const baseURL = 'http://localhost:3000'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({ id, userId, children}) {
    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io(
            baseURL,
            { query: {id, userId}}
        )
        setSocket(newSocket)

        return () => newSocket.close()
    }, [id, userId])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

