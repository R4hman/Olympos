import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import React, { memo, useState } from "react";

import { theme } from "../../theme";
import { getCookie } from "../../helper/setCookie";
import { createUserReview, editUserReview } from "../../services/apiUsers";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddReviews = ({
  type,
  id,
  editOrCreate,
  staleEditVal,
  setCrudEventHappened,
}) => {
  const { register, formState, handleSubmit, control, reset } = useForm({
    defaultValues:
      editOrCreate === "create"
        ? {
            rating: "5",
            title: "",
            description: "",
          }
        : {
            rating: staleEditVal?.rating,
            title: staleEditVal?.title,
            description: staleEditVal?.description,
            // rating: "5",
            // title: "",
            // description: "",
          },
  });
  const navigate = useNavigate();
  const { errors } = formState;

  const handleAddReview = (data) => {
    // e.preventDefault();
    data.rating = +data.rating;

    const obj = {
      [`${type === "tour" ? "tourId" : "hotelId"}`]: id,
      ...data,
    };
    if (editOrCreate === "create") {
      createUserReview(obj).then((res) => {
        // setCrudEventHappened((prev) => !prev);
        navigate(0);
      });
    } else {
      editUserReview(obj).then((res) => {
        // setCrudEventHappened((prev) => !prev);
        navigate(0);
      });
    }
    // reset();
  };

  return (
    <Box
      sx={{
        // backgroundColor: "red",
        display: "flex",
        // alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: "2rem 0",
      }}
    >
      <Typography sx={{ marginBottom: "2rem" }}>
        {editOrCreate === "create" ? "Rəy bildir" : "Rəyə düzəliş et"}
      </Typography>

      <form onSubmit={handleSubmit(handleAddReview)}>
        <Box
          sx={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "flex-start",
            gap: "2rem",
            maxWidth: "calc(4rem + 600px)",
            flexDirection: "column",
          }}
        >
          <Box>
            <Typography component="legend">Qiymətləndir</Typography>

            <Controller
              control={control}
              name="rating"
              rules={{ required: true }}
              render={({ field }) => <Rating {...field} />}
            />
          </Box>
          <TextField
            id="outlined-textarea"
            label="Başlıq əlavə et"
            // placeholder="Placeholder"
            error={!!errors?.title}
            helperText={errors?.title?.message}
            {...register("title", {
              required: "xana boş ola bilməz",
            })}
            multiline
            sx={{ width: "300px" }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Rəyi daxil et"
            multiline
            error={!!errors?.description}
            helperText={errors?.description?.message}
            {...register("description", {
              required: "xana boş ola bilməz",
            })}
            rows={4}
            // defaultValue="Default Value"
            sx={{ width: "300px" }}
          />
        </Box>
        <Button
          sx={{
            backgroundColor: `${theme.palette.primary.main}`,
            mt: "1rem",
            textTransform: "capitalize",
            color: "black",
            "&:hover": {
              backgroundColor: `${theme.palette.primary.main}`,
              scale: "1.05",
              transform: "translate-all ease-in-out",
            },
          }}
          type="submit"
        >
          Göndər
        </Button>
      </form>
    </Box>
  );
};

export default AddReviews;
