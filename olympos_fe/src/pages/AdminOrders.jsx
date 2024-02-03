import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

import useOrders from "../features/orders/useOrder";
import Loader from "../components/reusable/Loader";
import UserProfile from "../components/reusable/UserProfile";

import OrderComponent from "../components/OrderComponent";

const Orders = () => {
  const { isOrdersLoading, orders } = useOrders();

  const [sort, setSort] = useState("");

  const handleSortOrder = (event) => {
    setSort(event.target.value);
  };

  if (isOrdersLoading || orders.statusCode === 403) {
    return <Loader />;
  }

  let unConfirmedOrders = orders.filter((order) => !order.ordered);
  let allOrders = orders;

  if (sort) {
    const [field, direction] = sort.split("-");
    const toMultiply = direction === "asc" ? 1 : -1;
    if (field === "orderDate") {
      unConfirmedOrders = unConfirmedOrders?.sort((a, b) => {
        (new Date(a[field]) - new Date(b[field])) * toMultiply;
      });
      allOrders = orders.sort(
        (a, b) => (new Date(a[field]) - new Date(b[field])) * toMultiply
      );
    }
    unConfirmedOrders = unConfirmedOrders?.sort((a, b) => {
      (a[field] - b[field]) * toMultiply;
    });
    allOrders = orders.sort((a, b) => (a[field] - b[field]) * toMultiply);
  }

  return (
    <Box>
      <Box sx={{}}>
        <UserProfile
          sx={{ backgroundColor: "green" }}
          tabsData={[
            {
              label: "Hamısı",
              content: <OrderComponent ordered data={allOrders} />,
            },
            {
              label: "Təsdiq olunmayanlar",
              content: (
                <OrderComponent label="unconfirmed" data={unConfirmedOrders} />
              ),
            },
          ]}
        >
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sortlaşdır</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sortlaşdır"
                onChange={handleSortOrder}
              >
                <MenuItem value="orderDate-asc">Yaxın tarixə görə</MenuItem>
                <MenuItem value="orderDate-desc">Uzaq tarixə görə</MenuItem>
                <MenuItem value="price-asc">Aşağı qiymət</MenuItem>
                <MenuItem value="price-desc">Yuxarı qiymət</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </UserProfile>
      </Box>
    </Box>
  );
};

export default Orders;
