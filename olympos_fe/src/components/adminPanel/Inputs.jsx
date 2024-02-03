import {
  Button,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { FlexBetween, theme } from "../../theme";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { createContext, useContext, useEffect, useState } from "react";
import DropzoneComponent from "../DropzoneComponent";
import TourSelections from "./TourSelections";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useCreateHotel } from "../../features/hotels/useCreateHotel";
import { useEditHotel } from "../../features/hotels/useEditHotel";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchClientTourCategory } from "../../services/apiTours";

const tourSpesifics = ["Breakfast", "Hotel", "Nutrition", "Photo shooting"];

const quillStyle = {
  "& .ql-snow .ql-stroke": {
    stroke: "white",
    backgroundColor: "red",
    height: "200px",
  },
};

const InputContext = createContext();

const Inputs = ({
  children,
  tableData,
  setTableData,
  setShowInput,
  edit,
  create,
}) => {
  const [image, setImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [spesifics, setSpesifics] = useState([]);
  const [cat, setCat] = useState(null);
  const [description, setDescription] = useState("");
  const [catList, setCatList] = useState([]);
  // const [is, setis] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchClientTourCategory().then((category) => setCatList(category));
  }, []);

  const { register, handleSubmit, reset, formState, getValues, control } =
    useForm({
      defaultValues: tableData ? tableData : "",
    });
  const { errors } = formState;

  function onSubmit(data) {
    if (data.confirmed_person_count) {
      const Obj = { ...data };
    }

    let { pictureURL, price, ...rest } = data;

    price = Number(price);

    const newObj = {
      ...rest,
      price,
    };

    // create tour object
    if (cat) {
      newObj.category = cat;
      newObj["confirmed_person_count"] = 0;
      (newObj.nutrition = spesifics.includes("Qidalanma")
        ? "daxildir"
        : "daxil deyil"),
        (newObj.hotel = spesifics.includes("Hotel")
          ? "daxildir"
          : "daxil deyil"),
        (newObj.photo_shooting = spesifics.includes("Foto Çəkiliş")
          ? "daxildir"
          : "daxil deyil");
      newObj.person_count = Number(data.person_count);
      if (selectedImages[0]) {
        newObj.photo = selectedImages[0];
      }
      newObj["tour_day"] = Number(data.tour_day);
      newObj.specifics = spesifics;

      delete newObj.photos;
      delete newObj.reviews;
      delete newObj.specifics;
    }
    // create hotel object
    else {
      // if (selectedImages) {
      // }
      newObj.photos = selectedImages;
      newObj.specifics = spesifics;
      delete newObj.photo;
    }

    delete newObj.confirmed_person_count;
    delete newObj.createdAt;
    delete newObj.updatedAt;
    delete newObj.reviews;

    const formData = new FormData();

    for (let [key, values] of Object.entries(newObj)) {
      if (key === "photos" && values) {
        values.forEach((img) => formData.append("photos", img));
      } else if (key === "photo" && values) {
        formData.append("photo", values);
      } else {
        formData.append(key, values);
      }
    }

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    tableData
      ? edit(
          { formData },
          {
            onSuccess: (data) => {
              reset();
            },
          }
        )
      : create(formData, {
          onSuccess: (data) => {
            // reset();
          },
          onError: (data) => {
            toast.error(data.message[0]);
          },
        });
    setShowInput(false);
    setTableData(null);
    // navigate(0);
  }

  return (
    <InputContext.Provider
      value={{
        errors,
        register,
        control,
        spesifics,
        setSpesifics,
        selectedImages,
        setSelectedImages,
        cat,
        setCat,
        description,
        setDescription,
        tableData,
      }}
    >
      <form
        // style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box>{children}</Box>
        <Button
          sx={{
            width: "100%",
            mt: "1rem",
            backgroundColor: theme.palette.primary.main,
            color: "white",
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
          type="submit"
        >
          {tableData ? "Edit" : "Create"}
        </Button>
      </form>
    </InputContext.Provider>
  );
};

const TitleName = ({ name }) => {
  return (
    <Typography sx={{ textAlign: "center", mb: "0.5rem" }}>{name}</Typography>
  );
};

const Name = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="name"
      label="Ad"
      error={!!errors.name}
      helperText={errors.name?.message}
      {...register("name", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const Location = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="location"
      label="Yer"
      error={!!errors.location}
      helperText={errors.location?.message}
      {...register("location", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const Country = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="country"
      label="Ölkə"
      error={!!errors.country}
      helperText={errors.country?.message}
      {...register("country", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const Price = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="price"
      label="Qiymət"
      error={!!errors.price}
      helperText={errors.price?.message}
      {...register("price", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const Day = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="tour_day"
      label="gün"
      error={!!errors.tour_day}
      helperText={errors.tour_day?.message}
      {...register("tour_day", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const Count = () => {
  const { errors, register } = useContext(InputContext);
  const [count, setCount] = useState("");

  const handleChange = (val) => {};

  return (
    <TextField
      onChange={handleChange}
      defaultValue={count}
      id="confirmed_person_count"
      label="say"
      error={!!errors.confirmed_person_count}
      helperText={errors.confirmed_person_count?.message}
      {...register("confirmed_person_count", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const Capacity = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="person_count"
      label="Tutum"
      error={!!errors["person_count"]}
      helperText={errors["person_count"]?.message}
      {...register("person_count", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const Date = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        flexWrap: "wrap",

        // width: "fit-content",
      }}
    >
      <TextField
        id="
      start_date
      "
        label="Başlanğıc Tarix"
        error={!!errors.start_date}
        helperText={errors.start_date?.message}
        {...register("start_date", {
          required: "xana boş ola bilməz",
        })}
      />
      <TextField
        id="
      end_date
      "
        label="Son tarix"
        error={!!errors.end_date}
        helperText={errors.end_date?.message}
        {...register("end_date", {
          required: "xana boş ola bilməz",
        })}
      />
    </Box>
  );
};
const DateTour = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <Box sx={{ width: "fit-content" }}>
      <TextField
        sx={{}}
        id="
      tour_date
      "
        label="Tarix"
        error={!!errors.tour_date}
        helperText={errors.tour_date?.message}
        {...register("tour_date", {
          required: "xana boş ola bilməz",
        })}
      />
    </Box>
  );
};
const OrderDate = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="orderDate"
      label="sifariş tarixi"
      error={!!errors.orderDate}
      helperText={errors.orderDate?.message}
      {...register("orderDate", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const Description = () => {
  const { errors, register, description, setDescription, control } =
    useContext(InputContext);

  return (
    <Controller
      name="description"
      control={control}
      rules={{ required: true }}
      render={({ field }) => <ReactQuill {...field} />}
    />
    // <ReactQuill theme="snow" value={description} onChange={setDescription} />
  );
};

const City = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="city"
      label="City"
      error={!!errors.city}
      helperText={errors.city?.message}
      {...register("city", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};

const Position = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      label="Xəritəni daxil edin"
      id="map"
      error={!!errors.position}
      helperText={errors.position?.message}
      {...register("map", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const Belongings = ({ listToMap, name }) => {
  const { spesifics, setSpesifics, control } = useContext(InputContext);

  return (
    <TourSelections
      // spesifics={spesifics}
      // spesifics={value}
      spesifics={spesifics}
      // defaultValue={spesifics}
      setSpesifics={setSpesifics}
      listToMap={listToMap}
      name={name}
    />
  );
};

const TourCategory = ({ categories }) => {
  const { cat, setCat } = useContext(InputContext);

  const handleCat = (event) => {
    setCat(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id="demo-select-small-label" sx={{ ml: "1.5rem" }}>
        Seç
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={cat}
        defaultValue={cat}
        label="Sort by price"
        onChange={handleCat}
      >
        {categories.map((category, i) => (
          <MenuItem key={category._id + i * 77} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Photos = ({ type = 1 }) => {
  const { setSelectedImages, selectedImages, control, tableData } =
    useContext(InputContext);

  // let images;

  // if (tableData) {
  //   images = tableData.photo ? tableData.photo : tableData.photos;
  // }

  return (
    <Box border="1px solid black" borderRadius="5px" mt="1rem" p="1rem">
      {/* <Controller
        control={control}
        name="photos"
        render={({ field }) => (
          <DropzoneComponent
            maxFiles={type}
            initialFiles={selectedImages ? selectedImages : field.value}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            onChange={field.onChange}
            onBlur={field.onBlur}
            selected={field.value}
          />
        )}
      /> */}
      {tableData?.photo ? (
        <div>
          <img
            style={{ width: "130px", height: "100px", objectFit: "cover" }}
            src={tableData.photo}
            alt="tour foto"
          />
        </div>
      ) : tableData?.photos ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {tableData.photos.slice(0, 5).map((photo) => (
            <img
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
              key={photo}
              src={photo}
              alt="hotel photo"
            />
          ))}
        </Box>
      ) : null}
      <DropzoneComponent
        maxFiles={type}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />
    </Box>
  );
};

const FirstName = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="first_name"
      label="Userin adı"
      error={!!errors.first_name}
      helperText={errors.first_name?.message}
      {...register("first_name", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const LastName = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="last_name"
      label="Userin soyadı"
      error={!!errors.last_name}
      helperText={errors.last_name?.message}
      {...register("last_name", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const PhoneNumber = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="phone_number"
      label="Userin əlaqə nömrəsi"
      error={!!errors.phone_number}
      helperText={errors.phone_number?.message}
      {...register("phone_number", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const Email = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="email"
      label="Userin email addressi"
      error={!!errors.email}
      helperText={errors.email?.message}
      {...register("email", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const Role = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="role"
      label="User rolu"
      error={!!errors.role}
      helperText={errors.role?.message}
      {...register("role", {
        required: "xana boş ola bilməz",
      })}
    />
  );
};
const UserOrders = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="user_orders"
      label="User sifarişləri"
      error={!!errors.user_orders}
      helperText={errors.user_orders?.message}
      {...register("user_orders")}
    />
  );
};
const Category = () => {
  const { errors, register } = useContext(InputContext);

  return (
    <TextField
      id="category"
      label="Kateqoriya"
      error={!!errors.category}
      helperText={errors.category?.message}
      {...register("category")}
    />
  );
};

Inputs.TitleName = TitleName;
Inputs.Name = Name;
Inputs.Description = Description;
Inputs.Date = Date;
Inputs.DateTour = DateTour;
Inputs.OrderDate = OrderDate;
Inputs.Location = Location;
Inputs.Country = Country;
Inputs.Price = Price;
Inputs.Day = Day;
Inputs.Count = Count;
Inputs.Capacity = Capacity;
Inputs.City = City;
Inputs.Position = Position;
Inputs.Belongings = Belongings;
Inputs.TourCategory = TourCategory;
Inputs.Photos = Photos;
Inputs.FirstName = FirstName;
Inputs.LastName = LastName;
Inputs.Email = Email;
Inputs.PhoneNumber = PhoneNumber;
Inputs.Role = Role;
Inputs.UserOrders = UserOrders;
Inputs.Category = Category;
// Inputs.CreatedAt = CreatedAt;

export default Inputs;
