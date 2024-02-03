import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({ columns, rows }) {
  let data = rows?.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
