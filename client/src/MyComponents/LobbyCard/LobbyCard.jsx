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
  Button,
  Typography,
} from "@material-ui/core";

// Additional Styling
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function LobbyCard(props) {
  const { slug, gameName, gameBackground, imgStyle, root, rows } = props;

  return (
    <>
      <TableContainer id={slug} >
        <Paper
          component='img'
          src={gameBackground}
          alt={gameName}
          className={imgStyle}
        >
          <Table className={root}>
            <TableHead>
              <TableRow>
                <StyledTableCell align='left'>Restricted</StyledTableCell>
                <StyledTableCell>Requests</StyledTableCell>
                <StyledTableCell align='right'># of People</StyledTableCell>
                <StyledTableCell align='right'>Creator</StyledTableCell>
                <StyledTableCell align='right'>
                  Language Preference
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </Paper>
      </TableContainer>
    </>
  );
}
