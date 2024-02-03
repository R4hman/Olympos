import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { theme } from "../theme";
import toast from "react-hot-toast";
import { useEditOrder } from "../features/orders/useEditOrder";
import useDeleteOrder from "../features/orders/useDeleteOrder";
import AdminModal from "./reusable/AdminModal";
import Inputs from "../components/adminPanel/Inputs";
import { editUserOrder, submitOrder } from "../services/apiOrders";
import ReusableButton from "../components/reusable/ReusableButton";
import { useNavigate } from "react-router-dom";

const OrderComponent = ({ data, ordered, label = "confirmed" }) => {
  const {
    isOrderEditing,
    editOrder,
    error: editError,
    isError,
  } = useEditOrder();
  const { orderDeleteLoading, deleteOrder } = useDeleteOrder();
  const [showInput, setShowInput] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [count, setCount] = useState();

  const navigate = useNavigate();

  // tesdiqleye basanda run olan funksiya
  const handleSubmitOrder = (id, count) => {
    submitOrder({
      _id: id,
    }).then((res) => console.log("post message", res));

    toast.success("Sifariş təsdiqləndi");
    window.location.reload();
  };

  //duzelish et-e basanda run olan funksiya
  const handleOpenModal = (data = null) => {
    if (data) {
      setCount(data.confirmed_person_count);
      setTableData(data);
    }
    setShowInput(true);
  };

  const handleUpdateOrder = () => {
    const newObj = { ...tableData, confirmed_person_count: +count };
    editOrder({ newObj });
    setShowInput(false);
  };
  const handleCancelOrder = (index) => {
    // const [order] = orders.filter((order) => order.id === index);
    deleteOrder(index);
  };

  if (isError) {
    return <div>{editError.message}</div>;
  }

  return (
    <Box>
      {showInput && (
        <AdminModal
          openOrClose={showInput}
          setTableData={setTableData}
          setShowInput={setShowInput}
        >
          {/* <Inputs
            tableData={tableData}
            setTableData={setTableData}
            setShowInput={setShowInput}
            // edit={editUserOrder}
            edit={editOrder}
            // create={createOrder}
          >
            <Inputs.TitleName name="Sifariş form input" />
            <Inputs.OrderDate />
            <Inputs.Count />
          </Inputs> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Sifariş düzəlişi</Typography>
            <TextField
              onChange={(e) => setCount(e.target.value)}
              defaultValue={count}
              type="number"
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                inputProps: {
                  max: 100,
                  min: 1,
                },
              }}
            />
            <ReusableButton
              onClick={handleUpdateOrder}
              // size={100}
              color="white"
              width={"100%"}
              bgColor={theme.palette.primary.main}
            >
              Düzəliş et
            </ReusableButton>
          </Box>
        </AdminModal>
      )}

      <Box>
        {data.length ? (
          data.map((item, i) => (
            <Box
              key={item._id + i}
              sx={{
                backgroundColor: "#ccc",
                padding: "1rem",
                mb: "1rem ",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>
                {item.userId?.first_name} {item.userId?.last_name} adlı
                istifadəçi {item?.confirmed_person_count}{" "}
                {item.tourId ? "yerlik " : ""}
                {item?.tourId?.name || item?.hotelId?.name} sifariş etdi
              </Typography>
              <Box
                // sx={
                //   item?.ordered
                //     ? { display: "none" }
                //     : { display: "flex", gap: "1rem", alignItems: "center" }
                // }
                sx={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Typography>{item?.userId?.phone_number}</Typography>
                  {label === "unconfirmed" && (
                    <Button
                      sx={{
                        backgroundColor: "#59A96A",
                        color: "white",
                        textTransform: "capitalize",

                        "&:hover": {
                          backgroundColor: "#59A96A",
                        },
                      }}
                      onClick={() =>
                        handleSubmitOrder(item._id, item.confirmed_person_count)
                      }
                    >
                      Təsdiqlə
                    </Button>
                  )}
                </Box>

                {item?.tourId && (
                  <Button
                    sx={{
                      backgroundColor: theme.palette.primary.dark,
                      color: "white",
                      textTransform: "capitalize",

                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                    onClick={() => handleOpenModal(item)}
                  >
                    Düzəliş et
                  </Button>
                )}
                <Button
                  sx={{
                    backgroundColor: theme.palette.error.main,
                    color: "white",
                    textTransform: "capitalize",

                    "&:hover": {
                      backgroundColor: theme.palette.error.main,
                    },
                  }}
                  onClick={() => handleCancelOrder(item._id)}
                >
                  Ləğv et
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>Sifariş qeydə alınmayıb</Typography>
        )}
      </Box>
    </Box>
  );
};

export default OrderComponent;
