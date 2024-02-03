import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";

const columnStyle = { textAlign: "center" };

const EachTourTableRow = ({
  table,
  handleOpenModal,
  deleteLoading,
  deleteData,
}) => {
  return (
    <TableRow key={table?.id}>
      {/* <TableCell>{table.id}</TableCell> */}
      <TableCell>
        <Box sx={{ width: "100px", height: "100px" }}>
          <img
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            src={table?.photo}
            alt="hotel picture"
          />
        </Box>
      </TableCell>
      <TableCell>{table?.name}</TableCell>
      {/* <TableCell>{table.location}</TableCell> */}
      <TableCell sx={columnStyle}>{table?.price}</TableCell>
      {/* <TableCell>{table.country}</TableCell> */}
      <TableCell>{table?.tour_date?.slice(0, 10)}</TableCell>
      {/* <TableCell>{table.description}</TableCell> */}
      <TableCell sx={columnStyle}>{table?.person_count}</TableCell>
      <TableCell sx={columnStyle}>{table?.confirmed_person_count}</TableCell>
      <TableCell sx={columnStyle}>{table?.tour_day}</TableCell>
      <TableCell>
        <Typography
          sx={{
            width: "200px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {table?.position && table?.position}
        </Typography>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // gap: "0.5rem",
          }}
        >
          <Button onClick={() => handleOpenModal(table)}>Düzəliş et</Button>
          <Button
            onClick={() => deleteData(table?.id)}
            disabled={deleteLoading}
          >
            Sil
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default EachTourTableRow;
