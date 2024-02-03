import toast from "react-hot-toast";
import { getCookie } from "../helper/setCookie";
const baseUrl = import.meta.env.VITE_BASE_URL;

export async function fetchOrdersApi() {
  const token = getCookie("token");
  if (token && token.length > 1) {
    const res = await fetch(`${baseUrl}/admin/orders`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    return data;
  }
}

export const deleteOrderApi = (id) => {
  const token = getCookie("token");
  fetch(`${baseUrl}/admin/orders/confirmation/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const createTourOrderApi = async (newOrder) => {
  const token = getCookie("token");
  try {
    const res = await fetch(`${baseUrl}/user/tour/create-reserv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify(newOrder),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const createHotelOrderApi = async (newOrder) => {
  const token = getCookie("token");
  try {
    const res = await fetch(`${baseUrl}/user/hotel/create-reserv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify(newOrder),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const submitOrder = (data) => {
  const token = getCookie("token");
  fetch(`${baseUrl}/admin/orders/confirmation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.statusCode === 200) {
        toast.success(data.message);
        window.location.reload();
      }
      if (data.statusCode === 400) {
        toast.error(data.message);
        // window.location.reload();
      }
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const editUserOrder = (data, id) => {
  const token = getCookie("token");
  fetch(`${baseUrl}/admin/orders/confirmation/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err.message);
      return err;
    });
};

export const editOrderApi = async (editOrder, id) => {
  const token = getCookie("token");
  try {
    const data = await fetch(`${baseUrl}/admin/orders/confirmation/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editOrder),
    });
    const res = await data.json();
    if (res.statusCode === 400) {
      toast.error(res.message);
      throw new Error(res.message);
    }
    if (res.statusCode === 200) {
      toast.success(res.message);
      window.location.reload();
    }

    return res;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const deleteUserOrder = (id) => {
  const token = getCookie("token");
  fetch(`${baseUrl}/user/profile/myorders/delete-reserv/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("silinen data: ", data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
