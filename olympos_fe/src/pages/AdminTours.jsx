import { Box, Button } from "@mui/material";
import AdminModal from "../components/reusable/AdminModal";

import useTours from "../features/tours/useTours";
import useDeleteTour from "../features/tours/useDeleteTour";
import useCreateTour from "../features/tours/useCreateTour";
import useEditTour from "../features/tours/useEditTour";
import Inputs from "../components/adminPanel/Inputs";
import ReusableTable from "../components/adminPanel/ReusableTable";
import EachTourTableRow from "../components/adminPanel/EachTourTableRow";
import Loader from "../components/reusable/Loader";
import { useEffect, useState } from "react";
import { fetchTourCategory } from "../services/apiTours";

const AdminTours = () => {
  const { isToursLoading, tours } = useTours("admin");
  const { tourDeleteLoading, deleteTour } = useDeleteTour();
  const [showInput, setShowInput] = useState(false);
  const [tableData, setTableData] = useState(null);
  const { isTourCreating, createTour } = useCreateTour();
  const { editTour, isTourEditing } = useEditTour();
  const [tourCategory, setTourCategory] = useState([]);

  useEffect(() => {
    fetchTourCategory()
      .then((res) => {
        return res;
      })
      .then((data) => {
        if (data.length > 1) {
          setTourCategory(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (isToursLoading || isTourCreating || isTourEditing) return <Loader />;
  if (!tourCategory.length) {
    return;
  }

  const handleOpenModal = (data = null) => {
    if (data) {
      setTableData(data);
    } else {
      setTableData(null);
    }
    setShowInput(true);
  };

  return (
    <Box>
      <Button onClick={() => handleOpenModal()}>Yeni tur yarat</Button>
      {showInput && (
        <AdminModal
          modalWidth={800}
          openOrClose={showInput}
          setTableData={setTableData}
          setShowInput={setShowInput}
        >
          <Inputs
            tableData={tableData}
            setTableData={setTableData}
            setShowInput={setShowInput}
            edit={editTour}
            create={createTour}
          >
            <Inputs.TitleName name="Tour form input" />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
                justifyContent: "center",
              }}
            >
              <Inputs.Name />
              <Inputs.Price />

              <Inputs.DateTour />
              <Inputs.Day />
              <Inputs.Capacity />
              <Inputs.Belongings
                listToMap={["Hotel", "Foto Çəkiliş", "Qidalanma"]}
                name="Tura daxil olacaq"
              />
            </Box>
            <Inputs.Description />
            {/* <Inputs.Belongings listToMap={tourCategory} name="Turun növü" /> */}
            <Inputs.TourCategory categories={tourCategory} />
            <Inputs.Photos />
          </Inputs>
        </AdminModal>
      )}
      <ReusableTable handleOpenModal={handleOpenModal}>
        <ReusableTable.Header
          list={[
            "Photo",
            "Name",
            // "City",
            "Price",
            "Date",
            "Person Count",
            "Confirmed Person Count",
            "Day",
          ]}
        />
        <ReusableTable.Body
          data={tours}
          render={(table, i) => (
            <EachTourTableRow
              key={i + table.id}
              table={table}
              handleOpenModal={handleOpenModal}
              deleteData={deleteTour}
              deleteLoading={tourDeleteLoading}
            />
          )}
        />
      </ReusableTable>
    </Box>
  );
};

export default AdminTours;
