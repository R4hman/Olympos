import { Box, Button, TextField } from "@mui/material";

import { useForm } from "react-hook-form";
import { theme } from "../theme";
import { createTourCategory } from "../services/apiTours";
import AdminCreateHotelSpesific from "../components/adminPanel/AdminCreateHotelSpesific";
import { createHotelSpecific } from "../services/apiHotels";

const AdminCategory = () => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const handleTourCategory = (obj) => {
    reset();
    createTourCategory(obj);
  };
  const handleHotelSpesific = (obj) => {
    createHotelSpecific(obj);
    // reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleTourCategory)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            // backgroundColor: "red",
            height: "30vh",
            justifyContent: "center",
            border: "1px solid",
            gap: "1rem",
          }}
        >
          <TextField
            id="name"
            label="Tur kateqoriya"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name", {
              required: "xana boş ola bilməz",
            })}
          />
          <Button
            sx={{
              backgroundColor: `${theme.palette.primary.main}`,
              color: "white",
            }}
            type="submit"
          >
            Təsdiqlə
          </Button>
        </Box>
      </form>
      <AdminCreateHotelSpesific handleHotelSpesific={handleHotelSpesific} />
    </div>
  );
};

export default AdminCategory;
