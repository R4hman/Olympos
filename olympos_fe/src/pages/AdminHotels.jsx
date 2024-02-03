import { Box, Button } from "@mui/material";
import useHotels from "../features/hotels/useHotels";
import useDeleteHotel from "../features/hotels/useDeleteHotel";
import { useEffect, useState } from "react";
import Loader from "../components/reusable/Loader";
import AdminModal from "../components/reusable/AdminModal";
import Inputs from "../components/adminPanel/Inputs";
import { useCreateHotel } from "../features/hotels/useCreateHotel";
import { useEditHotel } from "../features/hotels/useEditHotel";
import DataTable from "../components/adminPanel/DataTable";
import { fetchHotelIncludings } from "../services/apiHotels";

const AdminHotels = () => {
  const columns = [
    {
      field: "photos",
      headerName: "Photos",
      width: 110,
      renderCell: ({ row }) => {
        return <img src={row.photos[0]} />;
      },
    },
    { field: "country", headerName: "Country", width: 130 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "city", headerName: "City", width: 130 },
    {
      field: "location",
      headerName: "Location",
      // type: "number",
      width: 270,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 90,
    },

    {
      field: "description",
      headerName: "Description",
      width: 90,
    },
    // {
    //   field: "map",
    //   headerName: "Map",
    //   width: 70,
    // },

    {
      field: "start_date",
      headerName: "Start Date",
      width: 110,
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 110,
    },
    {
      field: "DeleteButton",
      sortable: false,
      align: "center",
      width: 100,
      renderCell: ({ row: { id } }) => {
        return <Button onClick={() => deleteHotel(id)}>Sil</Button>;
      },
    },
    {
      field: "EditButton",
      sortable: false,
      align: "center",
      width: 100,
      renderCell: ({ row }) => {
        return <Button onClick={() => handleOpenModal(row)}>Düzəliş et</Button>;
      },
    },
  ];

  const { isHotelsLoading, hotels = [] } = useHotels();
  const { hotelDeleteLoading, deleteHotel } = useDeleteHotel();
  const [showInput, setShowInput] = useState(false);
  const [tableData, setTableData] = useState(null);
  const { createHotel, isHotelCreating } = useCreateHotel();
  const { editHotel, isHotelEditing } = useEditHotel();
  const [hotelIncludings, setHotelIncludings] = useState([]);

  useEffect(() => {
    if (!isHotelsLoading) {
      fetchHotelIncludings().then((res) => {
        setHotelIncludings(res.map((r) => r.name));
      });
    }
  }, [isHotelsLoading]);

  if (isHotelsLoading) return <Loader />;

  function handleOpenModal(data = null) {
    if (data) {
      setTableData(data);
    } else {
      setTableData(null);
    }
    setShowInput(true);
  }

  return (
    <Box>
      <Button onClick={() => handleOpenModal()}>Yeni otel yarat</Button>
      {showInput && (
        <AdminModal
          openOrClose={showInput}
          setTableData={setTableData}
          setShowInput={setShowInput}
          modalWidth={800}
        >
          <Inputs
            tableData={tableData}
            setTableData={setTableData}
            setShowInput={setShowInput}
            edit={editHotel}
            create={createHotel}
          >
            <Inputs.TitleName name="Hotel form input" />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
                alignItems: "center",
                mb: "0.5rem",
              }}
            >
              <Inputs.Name />
              <Inputs.Price />

              <Inputs.Location />
              <Inputs.Country />
              <Inputs.Date />
              <Inputs.City />
              <Inputs.Position />
              <Inputs.Belongings
                listToMap={hotelIncludings}
                name="Hotelə daxil olacaq"
              />
            </Box>
            <Inputs.Description />
            <Inputs.Photos type={10} />
          </Inputs>
        </AdminModal>
      )}
      <DataTable rows={hotels} columns={columns} />
    </Box>
  );
};

export default AdminHotels;
