import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, userId, cGame, LP, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (userId !== undefined) {
      // const newSocket = io(ENDPOINT, { query: { id, userId } });
      // setSocket(newSocket);

      // setTimeout(() => {
      //   newSocket.on("online", ({ cGame, LP }) => {
      //     console.log({})
      //   });
      // }, 3000);
    } else {
      return;
    }
  }, [id, userId, socket, cGame]);

  /** USER
   * User hops online emit user is online, their rating score and their last played game.
   * User will be place into game rooms of their last played game or their current game to emit on intervals and receive invites . Else they will be place no where.
   * User can send and receive an invite. Update it via back end to both user schemas and emit to user receive
   * Recommend game based on top five multiplayer list and user last played or current played list
   */

  /** SESSIONS
   * Sessions for lobbies are emitted on an interval. They will be based on game rooms and displayed via their documents id or generate a uuid
   * When a user searches for a game session they are to view the sessions in the that game room
   * For Home Screens grab the first 5 owners of games that are the same genre of last game game played or current game.
   * They wil be based on rating scores and how well they match from the algorithm
   */

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
