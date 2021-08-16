import React, { useContext, useEffect, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useSocket } from "./SocketContext";
import { userSessionId } from "./UserContext";

const SessionContext = React.createContext({
  lobby: String,
  filters: Object,
  host: Object,
  users: Map,
});

export function SessionInfo() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }) {
  const socket = useSocket();
  const [lobby, setLobby] = useLocalStorage("current-lobby");
  const [filters, setFilters] = useState("");
  const [users, setUsers] = useState();
  const [host, setHost] = useState("");

  const leaveLobby = () => {
    setHost(null);
    setLobby(null);
    setFilters(null);
    setUsers(null);
  };

  useEffect(() => {
    if (lobby !== undefined || null) {
      socket.emit("checkLobby", lobby);
    }
  }, [socket]);

  useEffect(() => {
    // Socket Listeners
    socket.on("setHost", (host) => {
      setHost(host);
    });
    
    socket.on("setLobby", ({ lobby, filters, users }) => {
      setLobby(lobby);
      setFilters(filters);
      setUsers(users);
    });
    
    socket.on("userJoined", (user) => {
      if (host === userSessionId) {
        socket.emit("sendInfo", {
          newUser: user,
          lobby: lobby,
          filters: filters,
          users: users,
        });
      }

      if (!users.has(user.id)) {
        setUsers(new Map(users.set(user.id, user)));
      }
    });

    socket.on("userLeft", (user) => {
      setUsers(new Map(users.delete(user.id)))
    })
  }, []);

  return (
    <SessionContext.Provider
      value={{
        lobby,
        filters,
        users,
        host,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
