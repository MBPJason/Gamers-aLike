import React from "react";

// Core Components and Sections
import { Grid, Paper, Typography } from "@material-ui/core";
import Header from "../../MyComponents/Header/Header";
import LobbyTable from "../../MyComponents/LobbyTable/LobbyTable";

export default function LobbyPage() {

    // ===================
    // Test Data
    // ===================
    // All this data in the arrays will be pulled in through context
  const data = [
    {
      gameName: "Starcraft 2",
      gameSlug: "300482",
      gameBackground:
        "https://images.blz-contentstack.com/v3/assets/blt2ef8b4fee426fd3e/bltf647443249f7b7e0/5f468c730cfe4555ebb3a6df/Wallpaper-5-1920.jpg",
    },
  ];

  const Lobbies = [
    {
      Restricted: true,
      Requests: "Looking for 5 to start up a game",
      Players: "3/5", // TODO: Needs to be dynamically updated
      Creator: "MasterChief",
      Language: "English",
      lobbyID: "OH1H3HA8AN9U",
    },
    {
      Restricted: true,
      Requests: "Looking for 6 to start up a game",
      Players: "2/7", // TODO: Needs to be dynamically updated
      Creator: "CmdrShepard",
      Language: "English",
      lobbyID: "OH19KMD3WN9U",
    },
    {
      Restricted: false,
      Requests: "Looking for 4 to start up a game",
      Players: "3/5", // TODO: Needs to be dynamically updated
      Creator: "MasterChief",
      Language: "English",
      lobbyID: "OH1H73P2WN9U",
    },
    {
      Restricted: true,
      Requests: "Looking for 3 to start up a game",
      Players: "1/4", // TODO: Needs to be dynamically updated
      Creator: "DeezNuts",
      Language: "English",
      lobbyID: "OHPS6N48HWN9U",
    },
    {
      Restricted: false,
      Requests: "Looking for 9 to start up a game",
      Players: "3/10", // TODO: Needs to be dynamically updated
      Creator: "NoobSlayer",
      Language: "English",
      lobbyID: "OH1H3492KL9U",
    },
    {
      Restricted: true,
      Requests: "Looking for 5 to start up a game",
      Players: "3/5", // TODO: Needs to be dynamically updated
      Creator: "MasterChief",
      Language: "English",
      lobbyID: "OH1H3HA8AN9U",
    },
    {
      Restricted: true,
      Requests: "Looking for 6 to start up a game",
      Players: "2/7", // TODO: Needs to be dynamically updated
      Creator: "CmdrShepard",
      Language: "English",
      lobbyID: "OH19KMD3WN9U",
    },
    {
      Restricted: false,
      Requests: "Looking for 4 to start up a game",
      Players: "3/5", // TODO: Needs to be dynamically updated
      Creator: "MasterChief",
      Language: "English",
      lobbyID: "OH1H73P2WN9U",
    },
    {
      Restricted: true,
      Requests: "Looking for 3 to start up a game",
      Players: "1/4", // TODO: Needs to be dynamically updated
      Creator: "DeezNuts",
      Language: "English",
      lobbyID: "OHPS6N48HWN9U",
    },
    {
      Restricted: false,
      Requests: "Looking for 9 to start up a game",
      Players: "3/10", // TODO: Needs to be dynamically updated
      Creator: "NoobSlayer",
      Language: "English",
      lobbyID: "OH1H3492KL9U",
    },
    {
      Restricted: true,
      Requests: "Looking for 5 to start up a game",
      Players: "3/5", // TODO: Needs to be dynamically updated
      Creator: "MasterChief",
      Language: "English",
      lobbyID: "OH1H3HA8AN9U",
    },
    {
      Restricted: true,
      Requests: "Looking for 6 to start up a game",
      Players: "2/7", // TODO: Needs to be dynamically updated
      Creator: "CmdrShepard",
      Language: "English",
      lobbyID: "OH19KMD3WN9U",
    },
    {
      Restricted: false,
      Requests: "Looking for 4 to start up a game",
      Players: "3/5", // TODO: Needs to be dynamically updated
      Creator: "MasterChief",
      Language: "English",
      lobbyID: "OH1H73P2WN9U",
    },
    {
      Restricted: true,
      Requests: "Looking for 3 to start up a game",
      Players: "1/4", // TODO: Needs to be dynamically updated
      Creator: "DeezNuts",
      Language: "English",
      lobbyID: "OHPS6N48HWN9U",
    },
    {
      Restricted: false,
      Requests: "Looking for 9 to start up a game",
      Players: "3/10", // TODO: Needs to be dynamically updated
      Creator: "NoobSlayer",
      Language: "English",
      lobbyID: "OH1H3492KL9U",
    },
  ];

  const Lobby = (
    <>
      <Grid container justify='center' alignItems='stretch' spacing={1} style={{height: '100vh'}}>
        {data.map(({ gameName, gameSlug, gameBackground }) => (
          <Grid item xs={12}>
            <LobbyTable
              key={gameName}
              gameName={gameName}
              slug={gameSlug}
              gameBackground={gameBackground}
              lobbies={Lobbies}
              size={"medium"}
              main={true}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
  return (
    <>
      <Header content={Lobby}/>
    </>
  );
}
