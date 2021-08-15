import React, { useContext, useEffect, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useSocket } from "./SocketContext";
import { userSessionId } from "./UserContext";

const SessionContext = React.createContext({
  lobby: String,
  filters: Object,
  host: Object,
  users: Array,
});

export function SessionInfo() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }) {
  const socket = useSocket();
  const [lobby, setLobby] = useLocalStorage("current-lobby");
  const [filters, setFilters] = useState("");
  const [users, setUsers] = useLocalStorage([]);
  const [host, setHost] = useState("");

  const leaveLobby = () => {
    setHost("");
    setLobby(lobby);
    setFilters(filters);
    setUsers(users);
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
    socket.on("userJoined", () => {});
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
