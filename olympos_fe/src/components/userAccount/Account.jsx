import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AdminModal from "../../components/reusable/AdminModal";
import { FlexBetween, theme } from "../../theme";
import { editUserProfile } from "../../services/apiAuth";
import toast from "react-hot-toast";
import UploadAndDisplayImage from "./UploadPhoto";
import DropzoneComponent from "../DropzoneComponent";

const Account = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);
  const [inputs, setInputs] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    phone_number: user?.phone_number,
    old_password: "",
    new_password: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const tablet = useMediaQuery("(max-width: 600px)");

  const handleAccountModal = (field) => {
    setOpenModal(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // change user profile photo
  const handleUserImgSubmit = () => {
    const formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("phone_number", user.phone_number);
    formData.append("profile_photo", selectedImages[0]);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    editUserProfile(formData).then((data) =>
      console.log("data: " + data.statusCode)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenModal(false);
    const formData = new FormData();
    let newObj = {};
    newObj = { ...inputs };
    // if (!inputs.new_password && !inputs.old_password) {
    //   delete newObj.new_password;
    //   delete newObj.old_password;
    // }
    formData.append("first_name", newObj.first_name);
    formData.append("last_name", newObj.last_name);
    formData.append("email", newObj.email);
    formData.append("phone_number", newObj.phone_number);
    if (newObj.new_password && newObj.old_password) {
      formData.append("new_password", newObj.new_password);
      formData.append("old_password", newObj.old_password);
    }

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    editUserProfile(formData).then((res) => {
      if (res.statusCode === 401) {
        toast.error(res.message);
      }
    });
  };

  return (
    <Box
      sx={{ backgroundColor: "white", padding: "2rem", borderRadius: "10px" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: tablet ? "column" : "row",
          gap: "5rem",
        }}
      >
        <Box sx={{ width: "200px" }}>
          <UploadAndDisplayImage user={inputs} />
          <DropzoneComponent
            maxFiles={1}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
          {selectedImages.length ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: "1rem",
              }}
            >
              <Button
                sx={{
                  background: `${theme.palette.primary.main}`,
                  color: "white",
                  textTransform: "capitalize",
                }}
                onClick={handleUserImgSubmit}
                type="submit"
              >
                Şəkili dəyiş
              </Button>
            </Box>
          ) : (
            <span></span>
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          <FlexBetween sx={{ mb: "3rem" }}>
            <Stack>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                First Name
              </Typography>
              <Typography variant="subtitle1">
                {user?.first_name || ""}
              </Typography>
            </Stack>
            <Button onClick={() => handleAccountModal("name")}>Change</Button>
          </FlexBetween>
          <FlexBetween sx={{ mb: "3rem" }}>
            <Stack>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                Last Name
              </Typography>
              <Typography variant="subtitle1">
                {user?.last_name || ""}
              </Typography>
            </Stack>
            <Button onClick={() => handleAccountModal("name")}>Change</Button>
          </FlexBetween>
          <FlexBetween sx={{ mb: "3rem" }}>
            <Stack>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                Email
              </Typography>
              <Typography variant="subtitle1">{user?.email || ""}</Typography>
            </Stack>
            <Button onClick={() => handleAccountModal("email")}>Change</Button>
          </FlexBetween>
          <FlexBetween sx={{ mb: "3rem" }}>
            <Stack>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                Phone Number
              </Typography>
              <Typography variant="subtitle1">
                {user?.phone_number || ""}
              </Typography>
            </Stack>
            <Button onClick={() => handleAccountModal("phoneNumber")}>
              Change
            </Button>
          </FlexBetween>
        </Box>
      </Box>
      <AdminModal
        tableIsExist={false}
        setShowInput={setOpenModal}
        openOrClose={openModal}
      >
        <Typography
          sx={{
            fontSize: "20px",
            textAlign: "center",
            mb: "1rem",
          }}
        >
          Məlumatları dəyişdir
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            value={inputs.first_name}
            onChange={handleChange}
            name="first_name"
            label="Ad"
            required
          />
          <TextField
            value={inputs.last_name}
            onChange={handleChange}
            name="last_name"
            label="Soyad"
            required
          />
          <TextField
            value={inputs.email}
            onChange={handleChange}
            name="email"
            label="Email"
            required
          />
          <TextField
            value={inputs.phone_number}
            onChange={handleChange}
            name="phone_number"
            label="Telefon"
            required
          />
          <TextField
            type="password"
            value={inputs.old_password}
            onChange={handleChange}
            name="old_password"
            label="Köhnə parol"
          />
          <TextField
            type="password"
            value={inputs.new_password}
            onChange={handleChange}
            name="new_password"
            label="Yeni parol"
          />

          <Button
            type="submit"
            sx={{
              backgroundColor: `${theme.palette.primary.main}`,
              width: "100%",
              mt: "1rem",
            }}
          >
            Təsdiq et
          </Button>
        </form>
      </AdminModal>
    </Box>
  );
};

export default Account;
