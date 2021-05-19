import React from "react";

// Stylesheets
import { withStyles } from "@material-ui/core/styles";

// Core Components
import {
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@material-ui/core";

// Icons
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

// Additional Styling
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    color: "antiquewhite",
    backdropFilter: "blur(1px) opacity(0.9)",
  },
}))(TableCell);

export default function LobbyTable(props) {
  const {
    slug,
    gameName,
    gameBackground,
    imgStyle,
    root,
    lobbies,
    size,
    main,
    tableRowHover,
  } = props;

  // TODO: NEED AN ONCLICK FUNCTION TO DIRECT PEOPLE TO LOBBIES

  const dataRows = (
    <>
      {lobbies.map(
        ({ Restricted, Requests, Players, Creator, Language, lobbyID }) => (
          <TableRow
            key={lobbyID}
            id={lobbyID}
            hover
            className={tableRowHover}
            tabIndex={-1}
          >
            <StyledTableCell align='left'>
              {Restricted ? <LockIcon /> : <LockOpenIcon />}
            </StyledTableCell>
            <StyledTableCell component='th' scope='row'>
              {Requests}
            </StyledTableCell>
            <StyledTableCell align='right'>{Players}</StyledTableCell>
            {main && (
              <>
                <StyledTableCell align='right'>{Creator}</StyledTableCell>
                <StyledTableCell align='right'>{Language}</StyledTableCell>
              </>
            )}
          </TableRow>
        )
      )}
    </>
  );

  return (
    <>
      {main && (
        <>
          <Typography variant='h2'>{gameName} Lobbies</Typography>
        </>
      )}
      <TableContainer component={Paper} id={slug}>
        <Table className={root} size={size}>
          <TableHead>
            <TableRow>
              <StyledTableCell align='left'>Restricted</StyledTableCell>
              <StyledTableCell>Requests</StyledTableCell>
              <StyledTableCell align='right'># of People</StyledTableCell>
              {main && (
                <>
                  <StyledTableCell align='right'>Creator</StyledTableCell>
                  <StyledTableCell align='right'>Language</StyledTableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody
            style={{ backgroundImage: "url(" + gameBackground + ")" }}
            className={imgStyle}
          >
            {dataRows}
          </TableBody>
        </Table>
      </TableContainer>
      {!main && (
        <>
          <Typography variant='h5'>{gameName} Lobbies</Typography>
        </>
      )}
    </>
  );
}
