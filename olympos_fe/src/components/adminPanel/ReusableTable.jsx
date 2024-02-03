import {
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Box,
} from "@mui/material";

import { createContext } from "react";

const TableContext = createContext();

const ReusableTable = ({ children, setShowInput, handleOpenModal }) => {
  return (
    <TableContext.Provider value={handleOpenModal}>
      <TableContainer component={Paper}>
        {/* <Table aria-label="simple-table">{children}</Table> */}
        <Table aria-label="simple-table">{children}</Table>
      </TableContainer>
    </TableContext.Provider>
  );
};

const Header = ({ list }) => {
  return (
    <TableHead>
      <TableRow>
        {list.map((col, i) => (
          <TableCell key={col + i}>{col}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
const Body = ({ data, render }) => {
  if (!data.length) return <Box>No data to show at the moment</Box>;

  return <TableBody>{data.map(render)}</TableBody>;
};

ReusableTable.Header = Header;
ReusableTable.Body = Body;

export default ReusableTable;
