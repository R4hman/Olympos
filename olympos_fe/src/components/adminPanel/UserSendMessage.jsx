import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { theme } from "../../theme";
import { Controller, useForm } from "react-hook-form";
import { sendUserNotification } from "../../services/apiUsers";

const UserSendMessage = ({ setSend }) => {
  const { register, formState, handleSubmit, control, reset } = useForm();
  const { errors } = formState;
  const [msg, setMsg] = useState({
    subject: "",
    msg: "",
  });
  const handleSendMessage = (e) => {
    const newObj = { ...e, ["text"]: e["react-quill"] };
    delete newObj["react-quill"];
    sendUserNotification(newObj).then((res) => {
      setSend((prev) => !prev);
    });

    // reset();
  };
  return (
    <form onSubmit={handleSubmit(handleSendMessage)}>
      <Typography sx={{ textAlign: "center", mb: "1rem" }}>
      Bütün istifadəçilərə mesaj göndər
      </Typography>

      <TextField
        id="outlined-textarea"
        label="Başlıq əlavə et"
        // placeholder="Placeholder"
        error={!!errors?.subject}
        helperText={errors?.subject?.message}
        {...register("subject", {
          required: "xana boş ola bilməz",
        })}
        multiline
        sx={{ width: "300px" }}
      />
      {/* <ReactQuill theme="snow" value={msg} onChange={setMsg} /> */}
      <Controller
        name="react-quill"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <ReactQuill {...field} />}
      />
      <Button
        type="submit"
        sx={{
          backgroundColor: `${theme.palette.primary.main}`,
        }}
      >
        Göndər
      </Button>
    </form>
  );
};

export default UserSendMessage;
