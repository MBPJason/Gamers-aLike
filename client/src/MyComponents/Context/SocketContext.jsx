import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, userId, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(ENDPOINT, { query: { id, userId } });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id, userId]);

  // USER
  // User hops online emit user is online, their rating score and their last played game.
  // User will be place into game rooms of their last played game or their current game to emit on intervals and receive invites . Else they will be place no where.
  // User can send and receive an invite. Update it via back end to both user schemas and emit to user receive
  
  // SESSIONS 
  // Sessions for lobbies are emitted on an interval. They will be based on game rooms and displayed via their documents id or generate a uuid
  // When a user searches for a game session they are to view the sessions in the that game room
  // For Home Screens grab the first 5 owners of games that are the same genre of last game game played or current game.
  // They wil be based ono


  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
