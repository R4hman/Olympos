import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { sendEmailFromClient } from "../../services/apiUsers";
import toast from "react-hot-toast";

const SendEmailFromClient = ({ sxButtonSubscribe }) => {
  const { register, formState, handleSubmit, control, reset } = useForm();
  const { errors } = formState;

  const handleSendMessage = (obj) => {
    sendEmailFromClient(obj).then((res) => {
      if ((res.statusCode + "").startsWith("4")) {
        toast.error(res.message);
      } else {
        toast.success("Subscribed");
      }
    });

    reset();
  };
  return (
    <Stack direction="row" spacing={2}>
      <form onSubmit={handleSubmit(handleSendMessage)}>
        <TextField
          error={!!errors?.email}
          helperText={errors?.email?.message}
          {...register("email", {
            required: "xana boş ola bilməz",
          })}
          label="Your email address here"
          sx={{ backgroundColor: "white", maxWidth: "473px", height: "56px" }}
        />

        <Button type="submit" sx={sxButtonSubscribe}>
          Abunə ol!
        </Button>
      </form>
    </Stack>
  );
};

export default SendEmailFromClient;
