import { Box, Button, TextField } from "@mui/material";

import { useForm } from "react-hook-form";
import { theme } from "../../theme";

const AdminHotelCreateSpesific = ({ handleHotelSpesific }) => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  return (
    <div>
      <form onSubmit={handleSubmit(handleHotelSpesific)}>
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
            label="Otel spesifikasiya"
            error={!!errors["name"]}
            helperText={errors["name"]?.message}
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
    </div>
  );
};

export default AdminHotelCreateSpesific;
