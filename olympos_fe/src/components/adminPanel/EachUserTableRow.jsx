import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

const EachUserTableRow = ({
  table,
  handleOpenModal,
  deleteLoading,
  deleteData,
}) => {
  return (
    <TableRow>
      {/* <TableCell>{table.id}</TableCell> */}

      <TableCell>{table.first_name}</TableCell>
      <TableCell>{table.last_name}</TableCell>
      <TableCell>{table.email}</TableCell>
      <TableCell>{table.phone_number}</TableCell>
      <TableCell>{table.role}</TableCell>
      {/* <TableCell>{table.user_orders}</TableCell> */}
      <TableCell>{table.createdAt?.slice(0, 10)}</TableCell>

      <TableCell>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // gap: "0.5rem",
          }}
        >
          {/* <Button onClick={() => handleOpenModal(table)}>Edit</Button> */}

          <Button
            onClick={() => deleteData(table._id)}
            disabled={deleteLoading}
          >
            Sil
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default EachUserTableRow;
